import h from "./hyperscript";
import { dict } from "./reactive";
import { setAttributes } from "./hyperscript";
import { SimpleNamespace } from "./namespace";
import { ROUTER_KEY, randomUUID, PrivateGlobalDict } from ".";

// Global Components
export const globalComponents = {};
// const uniqueID = () => Math.random().toString(36).substring(2);

function uniqueID(reDraw) {
  let key = null;
  do {
    key = randomUUID();
  } while (globalComponents.hasOwnProperty(key) && key === null);
  globalComponents[key] = reDraw;
  return key;
}

// Toggle Class
const toggleAdmin = (elem, key, value) => {
  if (value !== null) {
    elem.classList.toggle(key, value);
  } else {
    elem.classList.toggle(key);
  }
};

// Add Class
const addClassAdmin = (elem, value = null) => {
  value
    .trim()
    .split(" ")
    .forEach((cls) => {
      elem.classList.add(cls);
    });
};

// Style
const styleAdmin = (elem, value) => {
  elem.style.cssText = value;
};

// Mount-to-Root
export function mountToRoot(root, vnode) {
  let parentNode = root;
  if ("string" === typeof root) {
    parentNode = document.querySelector(root);
  }
  parentNode.replaceWith(vnode);
  return parentNode;
}

// Init Data | {@ Needs The Props Part @}
function initData(schema) {
  const data = dict(schema.data || {});
  return data;
}
function initProps(schema) {
  const inputProps = schema.props || {};
  if (schema.props) {
    delete schema.props;
  }
  const propKeys = Object.keys(inputProps);
  const input = {};
  propKeys.forEach((key) => {
    if (typeof inputProps[key] === "function") {
      input[key] = inputProps[key]();
    } else {
      input[key] = inputProps[key];
    }
  });
  const props = {
    keys: propKeys,
    form: input,
  };
  // Check Data
  function createProps(kwargs) {
    const globalKeys = new Set();
    if (schema.data) {
      Object.keys(schema.data).forEach((key) => {
        if (schema.data[key] instanceof SimpleNamespace) {
          globalKeys.add(schema.data[key].key);
        }
      });
    }
    if (kwargs) {
      Object.keys(kwargs).forEach((key) => {
        if (kwargs[key] instanceof SimpleNamespace) {
          globalKeys.add(kwargs[key].key);
        } else if (key.startsWith("$")) {
          switch (key) {
            case "$sync":
              schema.sync = { ...schema.sync, ...kwargs.$sync };
              break;
            case "$slot":
              schema.slot = { ...schema.slot, ...kwargs.$slot };
              break;
            case "$attrs":
              schema.attrs = { ...schema.attrs, ...kwargs.$attrs };
              break;
            case "$methods":
              schema.methods = { ...schema.methods, ...kwargs.$methods };
              break;
            case "$mounted":
              schema.mounted = kwargs.$mounted;
              break;
          }
        } else {
          const isValid = props.keys.includes(key);
          if (isValid) {
            props.form[key] = kwargs[key];
          }
        }
      });
    }
    schema.data = { ...schema.data, ...props.form };
    const definedFollow = schema.follow || [];
    schema.follow = new Set([...definedFollow, ...globalKeys]);
  }
  return createProps;
}

function GroupComponents(...items) {
  return [[], ...items.map((item) => () => item)];
}

export class Component {
  constructor(schema, parent = {}, init = true) {
    // Create Root
    let rootElement = document.createDocumentFragment();
    this.isFragment = true;

    if (schema.tag) {
      rootElement = document.createElement(schema.tag);
      this.isFragment = false;
    }

    // Slots & Data
    const theSlots = schema.slots || [];
    const theElems = schema.slot || {};
    const theAttrs = schema.attrs || {};
    const theClass = schema.css || {};
    const theStyle = schema.style || {};
    const theMethods = schema.methods || {};
    const theSync = schema.sync || {};
    const theData = initData(schema);
    const theMount = schema.mounted || function () {};
    const theInit = schema.init || function () {};
    const toFollow = schema.follow;

    const theAdmin = {
      vdom: rootElement,
      keys: [],
      slot: {},
      data: theData,
      sync: theSync,
    };

    // Class Setup
    this.$setup = theAdmin;
    this.parent = parent;
    this.sync = {};
    this.init = init;
    this.$uuid = {};
    this.ctx = {};

    // Bind Methods
    Object.entries(theMethods).forEach(([key, method]) => {
      theData.$methods[key] = method.bind(this);
    });

    //setAttributes
    const builtAttrs = {};
    if (!this.isFragment) {
      Object.keys(theAttrs).forEach((key) => {
        if (key.startsWith("x-on:")) {
          builtAttrs[key] = (e) => theAttrs[key](this, e);
        } else if (key.startsWith("@")) {
          builtAttrs["x-on:" + key.slice(1)] = (e) => theAttrs[key](this, e);
        } else {
          builtAttrs[key] = theAttrs[key];
        }
      });
      setAttributes(rootElement, builtAttrs, this);
    }

    // Re-Render
    const reDraw = () => {
      Object.keys(this.$uuid).forEach((key) => {
        delete globalComponents[key];
      });
      const state = { ...schema, data: theData.state };
      const vdom = new Component(state, parent, init);
      vdom.$setup.data.$original = theData.$original;
      return vdom;
    };

    const reRender = () => {
      const newDom = reDraw();
      if (this.isFragment) {
        if (this.parent.vdom) {
          this.parent.vdom.replaceChildren(newDom.vdom);
          theAdmin.vdom = newDom.vdom;
        }
      } else {
        theAdmin.vdom.replaceWith(newDom.vdom);
        theAdmin.vdom = newDom.vdom;
      }
    };

    // VDom
    theData.$vdom = this;
    theData.$render = reRender;
    this.render = reRender;

    // VDom
    this.$route = [
      "div",
      {
        id: ROUTER_KEY,
      },
      [],
    ];

    // Sync to Parent
    const vdom = this;
    const syncers = this.$setup.sync;
    Object.entries(syncers).forEach(([childKey, parentKey]) => {
      Object.defineProperty(vdom.sync, childKey, {
        get() {
          if (vdom.parent) {
            return vdom.parent.state[parentKey];
          }
          return null;
        },
        set(value) {
          vdom.parent.state = (draft) => {
            draft[parentKey] = value;
          };
        },
      });
    });

    // INIT Slots
    if (theSlots.length === 0) {
      const slot = "default";
      if (theElems[slot]) {
        const vnode = theElems[slot].bind(this)();
        if (vnode) {
          theAdmin.keys.push("default");
          if (typeof vnode === "string") {
            theAdmin.slot[slot] = document.createTextNode(vnode);
          } else if (typeof vnode === "function") {
            const current = vnode()(this);
            theAdmin.slot[slot] = current.vdom;
          } else if (vnode instanceof Component) {
            theAdmin.slot[slot] = vnode.vdom;
          } else if (vnode instanceof Node) {
            theAdmin.slot[slot] = vnode;
          } else {
            theAdmin.slot[slot] = h(vnode);
          }
        }
      }
    } else {
      theSlots.forEach((slot) => {
        const setup = theElems[slot];
        if (setup) {
          const vnode = setup.bind(this)();
          if (vnode) {
            theAdmin.keys.push(slot);
            if (typeof vnode === "function") {
              const current = vnode()(this);
              theAdmin.slot[slot] = current.vdom;
            } else if (vnode instanceof Component) {
              theAdmin.slot[slot] = vnode.vdom;
            } else if (vnode instanceof Node) {
              theAdmin.slot[slot] = vnode;
            } else {
              const instance = h(vnode, this);
              theAdmin.slot[slot] = instance;
            }
          }
        }
      });
    }

    // Append to Root
    if (theAdmin.vdom) {
      theAdmin.keys.forEach((key) => {
        const vnode = theAdmin.slot[key];
        const style = theStyle[key];
        const cssClass = theClass[key];
        // Set Classes
        if (style) {
          styleAdmin(vnode, style);
        }
        if (cssClass) {
          addClassAdmin(vnode, cssClass);
        }
        // Virtual-DOM
        theAdmin.vdom.appendChild(vnode);
      });
    }

    // Set Mount
    theAdmin.mount = (root) => {
      const parentNode = mountToRoot(root, theAdmin.vdom);
    };

    // Init & Mount ("This")
    if (this.init) {
      theInit.bind(this)();
    }
    theMount.bind(this)();

    // Unique ID
    const ID = uniqueID({
      follows: toFollow,
      method: reRender,
    });

    this.$id = ID;
    this.$uuid[ID] = reRender;
  }

  get keys() {
    return this.$setup.keys;
  }
  get slot() {
    return this.$setup.slot;
  }
  get vdom() {
    return this.$setup.vdom;
  }
  get mount() {
    return this.$setup.mount;
  }

  // Tools
  get $router() {
    return PrivateGlobalDict.router;
  }
  get $ui() {
    return PrivateGlobalDict;
  }
  get $gui() {
    return PrivateGlobalDict.components;
  }
  get $store() {
    return PrivateGlobalDict.val;
  }
  get $ctx() {
    return PrivateGlobalDict.ctx;
  }
  get $methods() {
    return PrivateGlobalDict.methods;
  }
  get $custom() {
    return PrivateGlobalDict.globalVarsCustom;
  }
  $use(...components) {
    return GroupComponents(...components);
  }
  $reset() {
    return this.$setup.data.reset();
  }
  set state(method) {
    return this.$setup.data.update(method);
  }
  get state() {
    // Data & Methods
    const data = this.$setup.data.state;
    const methods = this.$setup.data.$methods;
    const admin = { ...data, ...methods, sync: this.sync };
    return admin;
  }

  // { Toggle } Siblings
  toggle(el, key, value = null) {
    const elem = this.slot[el];
    toggleAdmin(elem, key, value);
  }

  // { Toggle } Parent / Self
  $toggle(key, value = null) {
    toggleAdmin(this.vdom, key, value);
  }

  // { Emit } from Child to Parent
  $emit(action, value = null) {
    if (this.state[action]) {
      this.state[action](value);
    } else if (this.parent) {
      if (action.startsWith("update:")) {
        const [ignore, key] = action.split(":");
        this.parent.state = (draft) => {
          draft[key] = value;
        };
      } else if (action.startsWith("update")) {
        this.parent.state = (draft) => {
          Object.keys(value).forEach((key) => {
            draft[key] = value[key];
          });
        };
      } else {
        if (this.parent.state[action]) {
          this.parent.state[action](value);
        }
      }
    }
  }
}

export default function createElement($schema) {
  return function component(kwargs) {
    const schema = Object.assign({}, $schema);
    initProps(schema)(kwargs);
    return (parent, init = true) => new Component(schema, parent, init);
  };
}
