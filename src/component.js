import reactive from "./reactive.js";
import diff from "./diff.js";
import h from "./hyperscript.js";

function mountToRoot(root, velement) {
  if ("string" === typeof root) {
    const parentNode = document.querySelector(root);
    const vnode = velement.render();
    velement.$el = vnode;
    parentNode.appendChild(vnode);
  } else {
    const vnode = velement.render();
    velement.$el = vnode;
    root.appendChild(vnode);
  }
}

export class Component {
  constructor(setup) {
    // Core
    this.$el = null;
    this.$root = null;
    this.$parent = null;

    // Attach Component
    const { admin, component, internalObject, init } = setup;

    // BIND To Each Other
    this.__dict__ = admin;
    admin.vdom = this;

    // Create Internal Object
    Object.defineProperty(internalObject, "$el", {
      get: () => {
        return this.$el;
      },
    });
    Object.defineProperty(internalObject, "$parent", {
      get: () => {
        return this.$parent;
      },
    });
    Object.defineProperty(internalObject, "$gui", {
      get: () => {
        return window.$____XPRIVATEDICTX____$.components;
      },
    });
    Object.defineProperty(internalObject, "$ui", {
      get: () => {
        return window.$____XPRIVATEDICTX____$;
      },
    });

    // Attach Sync To Parent
    Object.keys(component.sync).forEach((childKey) => {
      const parentKey = component.sync[childKey];
      Object.defineProperty(internalObject, childKey, {
        get: () => {
          return this.$parent.data[parentKey];
        },
        set: (value) => {
          this.$parent.data = (draft) => {
            draft[parentKey] = value;
          };
        },
      });
    });

    // EMIT from Child to Parent
    internalObject.$emit = (action, value = null) => {
      if (this.$parent) {
        if (action.startsWith("update:")) {
          const [ignore, key] = action.split(":");
          this.$parent.data = (draft) => {
            draft[key] = value;
          };
        } else if (action.startsWith("update")) {
          this.$parent.data = (draft) => {
            Object.keys(value).forEach((key) => {
              draft[key] = value[key];
            });
          };
        } else {
          const { getInternalObject } = this.$parent;
          if (getInternalObject[action]) {
            getInternalObject[action](value);
          }
        }
      }
    };

    // Attach Method & View
    component.methods(internalObject);
    this.view = component.view(internalObject);
    this.getInternalObject = internalObject;

    // Run Init - Should Run (Once ONLY)
    init(() => {
      // Attach Global Reactives
      const globalKeys = component.follow ? component.follow : [];
      if (globalKeys.length > 0) {
        window.addEventListener("xtyleGlobalsUpdate", (event) => {
          const { namespace } = event.detail;
          if (globalKeys.includes(namespace)) {
            this.render();
          }
        });
      }
    });

    // Run Mounted
    const mounted = component.mounted.bind(internalObject);
    mounted();
  }

  get data() {
    return this.__dict__.state;
  }

  set data(method) {
    return this.__dict__.update(method);
  }

  render() {
    let newData = h(...this.view())(this);
    const current = diff(this.$el, newData);
    this.$el = current;
    return current;
  }

  mount(root = null) {
    /**
     * Mount { Virtual-DOM } to { document.<node> }
     * @param  {String | Object} root A String for { querySelector } or an { Element-Object }
     */
    if (this.$root) {
      mountToRoot(this.$root, this);
    } else {
      this.$root = root;
      mountToRoot(root, this);
    }
  }

  unmount() {
    /**
     * Un-Mount { Virtual-DOM } from { document.<node> }
     */
    this.$el.remove();
  }
}

const checkTypeName = {
  [String]: "String",
  [Number]: "Number",
  [Function]: "Function",
  [Array]: "Array",
  [null]: "NULL",
  [Object]: "Object",
  [undefined]: "UNDEFINED",
};

const checkType = (value) => {
  if (typeof value === "string") {
    return { name: checkTypeName[String], type: String };
  } else if (typeof value === "number") {
    return { name: checkTypeName[Number], type: Number };
  } else if (typeof value === "function") {
    return { name: checkTypeName[Function], type: Function };
  } else if (typeof value === "object") {
    if (Array.isArray(value)) {
      return { name: checkTypeName[Array], type: Array };
    } else if (value === null) {
      return { name: checkTypeName[null], type: null };
    } else {
      return { name: checkTypeName[Object], type: Object };
    }
  } else {
    return { name: checkTypeName[Function], type: undefined };
  }
};

function createProps(component, userInput) {
  const inputObject = userInput ? userInput : {};
  const componentObject = {};
  const propsKeys = Object.keys(component.props);
  propsKeys.forEach((item) => {
    let value = inputObject[item];
    const currentTypes = component.props[item].type;
    const expectedType = checkTypeName[currentTypes];
    if (value) {
      if (currentTypes === String) {
        value = value.toString();
      }
      const inputType = checkType(value);
      const isValid = currentTypes === inputType.type;
      if (!isValid) {
        if (["Function", "Object", "Array"].includes(expectedType)) {
          value = component.props[item].default();
        } else {
          value = component.props[item].default;
        }
        console.error(
          `prop: { ${item} } is not of the value { ${expectedType} }`
        );
      }
    } else {
      if (["Function", "Object", "Array"].includes(expectedType)) {
        value = component.props[item].default();
      } else {
        value = component.props[item].default;
      }
    }
    componentObject[item] = value;
  });
  // Create New Object
  return Object.assign({}, { ...component.data, ...componentObject });
}

function methodBind(element, vnode) {
  Object.keys(element.methods).forEach((item) => {
    const method = element.methods[item];
    vnode[item] = method.bind(vnode);
  });
  return vnode;
}

function viewBind(element, vnode) {
  return element.view.bind(vnode);
}

function ComponentBase(options) {
  const element = {
    follow: options.follow || [],
    sync: options.sync || {},
    props: options.props || {},
    data: options.data || {},
    methods: options.methods || {},
    view: options.view || function () {},
    components: options.components || {},
    mounted: options.mounted || function () {},
    init: options.init || function () {},
  };

  // INIT
  const elementProps = {};

  // Props & Data (KEYS)
  elementProps.__keys__ = Array.from(
    new Set([...Object.keys(element.props), ...Object.keys(element.data)])
  );
  elementProps.__methods__ = Array.from(new Set(Object.keys(element.methods)));

  // Building Tools
  elementProps.props = (props) => createProps(element, props);
  elementProps.methods = (vnode) => methodBind(element, vnode);
  elementProps.view = (vnode) => viewBind(element, vnode);
  elementProps.follow = element.follow;
  elementProps.sync = element.sync;
  elementProps.mounted = element.mounted;
  elementProps.init = element.init;
  return elementProps;
}

function defineComponent(setup) {
  const component = ComponentBase(setup);
  let init = false;

  // Real Component
  function createComponent(inputProps) {
    const componentProps = inputProps ? inputProps : {};
    const props = component.props(componentProps);
    const admin = reactive.model(props);

    // Create Internal Reactives
    const internalObject = {};

    // Proxy
    function setProperty(key) {
      Object.defineProperty(internalObject, key, {
        get: function () {
          return admin.state[key];
        },
        set: function (value) {
          admin.update((draft) => (draft[key] = value));
        },
      });
    }

    // Attach Props & Data (Keys)
    component.__keys__.forEach((key) => {
      setProperty(key);
    });

    // Attach Slots
    internalObject.$slot = (key, opts) => {
      if (componentProps.$slot[key]) {
        return componentProps.$slot[key](opts);
      } else {
        return null;
      }
    };

    // Attach Update Method
    internalObject.$update = (method) => admin.update(method);

    const runOnce = (method) => {
      if (init === false) {
        init = true;
        method();
        component.init.bind(internalObject)();
      }
    };
    // Virtual-DOM
    return new Component({ component, internalObject, admin, init: runOnce });
  }
  return createComponent;
}

export function buildComponents(components) {
  const componentLib = {};
  components.forEach((item) => {
    componentLib[item.name] = defineComponent(item);
  });
  return componentLib;
}

export default defineComponent;
