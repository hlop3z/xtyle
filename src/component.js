import reactive from "./reactive.js";
import VDom from "./virtual-dom.js";

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

function coreBind(element, vnode) {
  vnode.____VIEW____ = element.view.bind(vnode);
  return vnode;
}

function ComponentBase(options) {
  const element = {
    props: options.props || {},
    data: options.data || {},
    methods: options.methods || {},
    view: options.view || function () {},
    components: options.components || {},
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
  elementProps.events = (vnode) => coreBind(element, vnode);
  return elementProps;
}

function defineComponent(setup) {
  const component = ComponentBase(setup);

  // Real Component
  function Component(componentProps) {
    const props = component.props(componentProps);
    const data = reactive.model(props);

    // Create Internal Reactives
    const internalObject = {};

    // Proxy
    function setProperty(key) {
      Object.defineProperty(internalObject, key, {
        get: function () {
          return data.state[key];
        },
        set: function (value) {
          data.update((draft) => (draft[key] = value));
        },
      });
    }

    // Props & Data (Keys)
    component.__keys__.forEach((key) => {
      setProperty(key);
    });

    Object.defineProperty(internalObject, "$el", {
      get: function () {
        if (data.vdom) {
          return data.vdom.self.$el;
        }
        return null;
      },
    });

    // Attach Update Method
    internalObject.$update = (method) => data.update(method);

    // Attach Component
    component.methods(internalObject);
    component.events(internalObject);

    // Virtual-DOM
    const vdom = VDom(internalObject.____VIEW____());
    vdom.$data = data;
    data.vdom = {
      view: () => vdom.update(...internalObject.____VIEW____()),
      self: vdom,
    };

    return vdom;
  }
  return Component;
}

function mountComponent(root, componentSchema) {
  const view = defineComponent(componentSchema);
  const vdom = view();
  vdom.mount(root);
  return vdom;
}

function mountRouter(setup) {
  const options = setup ? setup : {};
  let root = options.root ? options.root : "#app";
  let history = options.history ? options.history : false;
  let routes = options.routes ? options.routes : {};
  let vdom = null;
  let route = null;

  const Page404 = {
    props: {
      title: {
        type: String,
        default: "Oops!",
      },
    },
    view() {
      return [
        "div",
        {
          style: "text-align: center",
        },
        [
          [
            "h1",
            {
              style: "font-size: 8.5em",
            },
            [this.title],
          ],
          ["h3", {}, "404 | Page not Found."],
        ],
      ];
    },
  };

  if (!history) {
    if (!window.location.hash) window.location.hash = "/";
  }

  // Router Go
  const navigate = (path) => {
    const event = window.event;
    if (event) {
      try {
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation();
        }
      } catch (e) {
        e;
      }
    }
    if (history) {
      window.history.pushState({}, "", path);
    } else {
      window.location.hash = path;
    }
    handleLocation();
  };

  async function handleLocation() {
    const path = history
      ? window.location.pathname
      : window.location.hash.slice(1);
    route = routes[path] || routes[404] || Page404;

    if (vdom) {
      vdom.unmount();
    }
    vdom = mountComponent(root, route);
  }

  function reDraw() {
    if (vdom) {
      vdom.unmount();
    }
    vdom = mountComponent(root, route);
  }

  window.onpopstate = handleLocation;
  window.$________________PRIVATEDICT________________$ = {
    navigate,
    redraw: reDraw,
  };

  handleLocation();
}

export default {
  h: defineComponent,
  mount: mountComponent,
  router: mountRouter,
  redraw: () => window.$________________PRIVATEDICT________________$.redraw(),
  go: (path) =>
    window.$________________PRIVATEDICT________________$.navigate(path),
  reactive: function (data) {
    if (data) {
      const model = reactive.model(data);

      // Activate ReDraw
      model.redraw = true;

      // Create Internal Reactives
      const internalObject = {};

      // Proxy
      function setProperty(key) {
        Object.defineProperty(internalObject, key, {
          get: function () {
            return model.state[key];
          },
          set: function (value) {
            model.update((draft) => (draft[key] = value));
          },
        });
      }
      Object.keys(data).forEach((key) => {
        setProperty(key);
      });

      return internalObject;
    }
    return {};
  },
};
