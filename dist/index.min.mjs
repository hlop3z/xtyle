/*! @License MIT | Copyright (c) 2023 hlop3z */

// src/reactive.js
function deepMerge(target, ...sources) {
  sources.forEach((source) => {
    for (let key in source) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  });
  return target;
}
function mergeObjects(obj1, obj2, avoidModification = false) {
  if (avoidModification) {
    return deepMerge(Object.assign({}, obj1), obj2);
  } else {
    return deepMerge(obj1, obj2);
  }
}
function compare(obj1, obj2) {
  if (obj1 === obj2)
    return true;
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null)
    return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length)
    return false;
  for (const key of keys1) {
    if (!keys2.includes(key))
      return false;
    if (!compare(obj1[key], obj2[key]))
      return false;
  }
  return true;
}
function produce(current, method) {
  const original = JSON.parse(JSON.stringify(current));
  const draft = Object.assign({}, current);
  method(draft);
  const next = mergeObjects(current, draft, true);
  let update = compare(current, draft);
  if (update) {
    update = JSON.stringify(original) === JSON.stringify(draft);
  }
  return { data: next, update: !update };
}
var Dict = class {
  constructor(reactObject) {
    this.$original = reactObject;
    this.$current = reactObject;
    this.$render = null;
    this.$parent = null;
    this.$methods = {};
    this.$vdom = null;
  }
  get state() {
    return this.$current;
  }
  set state(method) {
    this.update(method);
  }
  update(method) {
    const { data, update } = produce(this.$current, method);
    if (update) {
      this.$current = data;
      if (this.$render) {
        this.$render();
      }
    }
    return update;
  }
  reset() {
    this.$current = Object.assign({}, this.$original);
    if (this.$render) {
      this.$render();
    }
  }
};
function dict(originalData) {
  return new Dict(originalData);
}
var reactive_default = {
  produce,
  compare,
  merge: mergeObjects
};

// src/namespace.js
var GLOBAL_EVENT = "xtyleGlobalsUpdate";
var globalVars = {
  __keys__: /* @__PURE__ */ new Set()
};
function dispatchUpdate(namespace2) {
  let event = new CustomEvent(GLOBAL_EVENT, {
    detail: { namespace: namespace2 }
  });
  window.dispatchEvent(event);
}
window.addEventListener(GLOBAL_EVENT, (event) => {
  const { namespace: namespace2 } = event.detail;
  Object.keys(globalComponents).forEach((key) => {
    const { follows, method } = globalComponents[key];
    if (follows.has(namespace2)) {
      method();
    }
  });
});
var SimpleNamespace = class {
  constructor(name, reactObject) {
    if (globalVars.hasOwnProperty(name)) {
      console.error(`${name} | has already been declared`);
    } else {
      const defaultValue = { ...reactObject };
      this.$original = defaultValue;
      this.$current = defaultValue;
      this.$namespace = name;
      this.$methods = {};
      Object.keys(defaultValue).forEach((key) => {
        if (typeof defaultValue[key] === "function") {
          this.$methods[key] = defaultValue[key].bind(this);
        }
      });
      const dict3 = this;
      globalVars.__keys__.add(name);
      Object.defineProperty(globalVars, name, {
        get: () => {
          return dict3;
        }
      });
    }
  }
  get key() {
    return this.$namespace;
  }
  get state() {
    return { ...this.$current, ...this.$methods };
  }
  set state(method) {
    this.update(method);
  }
  update(method) {
    const { data, update } = reactive_default.produce(this.$current, method);
    if (update) {
      this.$current = data;
      dispatchUpdate(this.$namespace);
    }
    return update;
  }
  reset() {
    this.$current = this.$original;
    dispatchUpdate(this.$namespace);
  }
};
function namespace(name, originalData) {
  return new SimpleNamespace(name, originalData);
}
function uniqueID() {
  let key = null;
  do {
    key = randomUUID();
  } while (globalVars.hasOwnProperty(key) && key === null);
  return key;
}
function dict2(originalData) {
  const ID = uniqueID();
  return new SimpleNamespace(ID, originalData);
}
var namespace_default = namespace;

// src/vnode.js
var globalComponents = {};
function uniqueID2(reDraw) {
  let key = null;
  do {
    key = randomUUID();
  } while (globalComponents.hasOwnProperty(key) && key === null);
  globalComponents[key] = reDraw;
  return key;
}
var toggleAdmin = (elem, key, value) => {
  if (value !== null) {
    elem.classList.toggle(key, value);
  } else {
    elem.classList.toggle(key);
  }
};
var addClassAdmin = (elem, value = null) => {
  value.trim().split(" ").forEach((cls) => {
    elem.classList.add(cls);
  });
};
var styleAdmin = (elem, value) => {
  elem.style.cssText = value;
};
function mountToRoot(root, vnode) {
  let parentNode = root;
  if ("string" === typeof root) {
    parentNode = document.querySelector(root);
  }
  parentNode.replaceWith(vnode);
  return parentNode;
}
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
    form: input
  };
  function createProps(kwargs) {
    const globalKeys = /* @__PURE__ */ new Set();
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
            case "$created":
              schema.created = kwargs.$created;
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
    schema.follow = /* @__PURE__ */ new Set([...definedFollow, ...globalKeys]);
  }
  return createProps;
}
function GroupComponents(...items) {
  return [[], ...items.map((item) => () => item)];
}
var Component = class {
  constructor(schema, parent = {}, init = true) {
    let rootElement = document.createDocumentFragment();
    this.isFragment = true;
    if (schema.tag) {
      rootElement = document.createElement(schema.tag);
      this.isFragment = false;
    }
    const theSlots = schema.slots || [];
    const theElems = schema.slot || {};
    const theAttrs = schema.attrs || {};
    const theClass = schema.css || {};
    const theStyle = schema.style || {};
    const theMethods = schema.methods || {};
    const theSync = schema.sync || {};
    const theData = initData(schema);
    const theMount = schema.mounted || function() {
    };
    const theCreation = schema.created || function() {
    };
    const theInit = schema.init || function() {
    };
    const toFollow = schema.follow;
    const theAdmin = {
      vdom: rootElement,
      keys: [],
      slot: {},
      data: theData,
      sync: theSync
    };
    this.$setup = theAdmin;
    this.parent = parent;
    this.sync = {};
    this.init = init;
    this.$uuid = {};
    this.ctx = {};
    Object.entries(theMethods).forEach(([key, method]) => {
      theData.$methods[key] = method.bind(this);
    });
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
    const reDraw = () => {
      Object.keys(this.$uuid).forEach((key) => {
        delete globalComponents[key];
      });
      const state = { ...schema, data: theData.state };
      const vdom2 = new Component(state, parent, init);
      vdom2.$setup.data.$original = theData.$original;
      return vdom2;
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
    theData.$vdom = this;
    theData.$render = reRender;
    this.render = reRender;
    this.$route = [
      "div",
      {
        id: ROUTER_KEY
      },
      []
    ];
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
        }
      });
    });
    theCreation.bind(this)();
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
            theAdmin.slot[slot] = hyperscript_default(vnode);
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
              const instance = hyperscript_default(vnode, this);
              theAdmin.slot[slot] = instance;
            }
          }
        }
      });
    }
    if (theAdmin.vdom) {
      theAdmin.keys.forEach((key) => {
        const vnode = theAdmin.slot[key];
        const style = theStyle[key];
        const cssClass2 = theClass[key];
        if (style) {
          styleAdmin(vnode, style);
        }
        if (cssClass2) {
          addClassAdmin(vnode, cssClass2);
        }
        theAdmin.vdom.appendChild(vnode);
      });
    }
    theAdmin.mount = (root) => {
      const parentNode = mountToRoot(root, theAdmin.vdom);
    };
    if (this.init) {
      theInit.bind(this)();
    }
    theMount.bind(this)();
    const ID = uniqueID2({
      follows: toFollow,
      method: reRender
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
};
function createElement($schema) {
  return function component(kwargs) {
    const schema = Object.assign({}, $schema);
    initProps(schema)(kwargs);
    return (parent, init = true) => new Component(schema, parent, init);
  };
}

// src/hyperscript.js
function setDirective(node, key, value) {
  const directives = PrivateGlobalDict.directives;
  if (key.startsWith("@")) {
    key = "x-on:" + key.slice(1);
  }
  const cleanName = key.slice(2);
  if (cleanName.startsWith("on:")) {
    const eventType = cleanName.split(":")[1];
    directives.on(node, eventType, value);
  } else {
    const found = directives[cleanName];
    if (found) {
      found(node, value);
    }
  }
}
function collectCSS(kwargs) {
  const items = [];
  Object.entries(kwargs).forEach(([key, value]) => {
    if (value) {
      items.push(key.replace(/\s/g, " "));
    }
  });
  return items.join(" ");
}
function setAttributes(vdom, attributes, vnode = null) {
  if (attributes) {
    for (let attr in attributes) {
      if (attr.startsWith("x-") || attr.startsWith("@")) {
        if (vnode) {
          setDirective(vnode, attr, attributes[attr]);
        } else {
          setDirective(vdom, attr, attributes[attr]);
        }
      } else if (attr === "class") {
        const value = attributes[attr];
        if (Array.isArray(value)) {
          const nestedValue = value.map(
            (item) => typeof item === "string" ? item.replace(/\s/g, " ") : collectCSS(item)
          ).join(" ");
          vdom.setAttribute(attr, nestedValue);
        } else if (typeof value === "object" && value !== null) {
          vdom.setAttribute(attr, collectCSS(value));
        } else {
          vdom.setAttribute(attr, value.replace(/\s/g, " "));
        }
      } else {
        vdom.setAttribute(attr, attributes[attr]);
      }
    }
  }
}
function hyperScript(hscript, parent = null) {
  let [tag, attributes, children] = hscript;
  let node = null;
  if (Array.isArray(tag)) {
    node = document.createDocumentFragment();
    attributes = {};
    children = hscript;
  } else if (tag === "template") {
    node = document.createDocumentFragment();
  } else {
    node = document.createElement(tag);
  }
  setAttributes(node, attributes);
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    children.forEach((child) => {
      if (typeof child === "function") {
        const current = child(parent);
        if (parent) {
          Object.keys(current.$uuid).forEach((key) => {
            parent.$uuid[key] = current.$uuid[key];
          });
        }
        node.appendChild(current.vdom);
      } else if (child instanceof Component) {
        if (child.parent && Object.keys(child.parent).length > 0) {
          Object.keys(child.$uuid).forEach((key) => {
            child.parent.$uuid[key] = child.$uuid[key];
          });
        }
        node.appendChild(child.vdom);
      } else if (child instanceof Node) {
        node.appendChild(child);
      } else if (Array.isArray(child)) {
        const current = child[0];
        if (typeof current === "string") {
          node.appendChild(hyperScript(child));
        } else {
          child.map((xchild) => node.appendChild(hyperScript(xchild)));
        }
      } else {
        if (typeof child === "string") {
          node.appendChild(document.createTextNode(child.toString()));
        } else {
          node.appendChild(document.createTextNode(JSON.stringify(child)));
        }
      }
    });
  }
  return node;
}
var hyperscript_default = hyperScript;

// src/ripple.js
var prefixCSS = "gui-design";
function inject(props) {
  const ID = props.id;
  const stringTemplate = props.code;
  function getStyle(id) {
    const found = window.document.querySelectorAll(`[${prefixCSS}="${id}"]`);
    if (found.length > 0) {
      return found[0];
    } else {
      const style = window.document.createElement("style");
      style.setAttribute(prefixCSS, id);
      window.document.head.append(style);
      return style;
    }
  }
  function removeSpace(text) {
    return text.replace(/\s\s+/g, " ").replace(/\r?\n|\r/g, "").trim();
  }
  const elem = getStyle(ID);
  elem.textContent = removeSpace(stringTemplate);
}
var cssClass = {
  container: "ripple-effect__container",
  animation: "ripple-effect__animation",
  enter: "ripple-effect__animation--enter",
  visible: "ripple-effect__animation--visible",
  start: "ripple-effect__animation--start",
  end: "ripple-effect__animation--end",
  style: `.ripple-effect__animation,.ripple-effect__container{color:inherit;position:absolute;top:0;left:0;pointer-events:none;overflow:hidden}.ripple-effect__container{border-radius:inherit;width:100%;height:100%;z-index:0;contain:strict}.ripple-effect__animation{border-radius:50%;background:currentColor;opacity:0;will-change:transform,opacity}.ripple-effect__animation--enter{transition:none}.ripple-effect__animation--start{transition:transform .25s cubic-bezier(.4, 0, .2, 1),opacity .1s cubic-bezier(.4, 0, .2, 1)}.ripple-effect__animation--end{transition:opacity .3s cubic-bezier(.4, 0, .2, 1)}`
};
inject({
  id: "ripple-effect",
  code: cssClass.style
});
function transform(el, value) {
  el.style["transform"] = value;
  el.style["webkitTransform"] = value;
}
function opacity(el, value) {
  el.style["opacity"] = value.toString();
}
function isTouchEvent(e) {
  return e.constructor.name === "TouchEvent";
}
var calculate = (e, el, value = {}) => {
  const offset = el.getBoundingClientRect();
  const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
  const localX = target.clientX - offset.left;
  const localY = target.clientY - offset.top;
  let radius = 0;
  let scale = 0.3;
  if (el._ripple && el._ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x2 = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return { radius, scale, x: x2, y, centerX, centerY };
};
var ripples = {
  /* eslint-disable max-statements */
  show(e, el, value = {}) {
    if (!el._ripple || !el._ripple.enabled) {
      return;
    }
    const container = document.createElement("span");
    const animation = document.createElement("span");
    container.appendChild(animation);
    container.className = cssClass.container;
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const { radius, scale, x: x2, y, centerX, centerY } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = cssClass.animation;
    animation.style.width = size;
    animation.style.height = size;
    if (el._ripple && el._ripple.color) {
      animation.style.color = el._ripple.color;
    }
    el.appendChild(container);
    const computed = window.getComputedStyle(el);
    if (computed && computed.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add(cssClass.enter);
    animation.classList.add(cssClass.visible);
    transform(
      animation,
      `translate(${x2}, ${y}) scale3d(${scale},${scale},${scale})`
    );
    opacity(animation, 0);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove(cssClass.enter);
      animation.classList.add(cssClass.start);
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      opacity(animation, 0.25);
    }, 0);
  },
  hide(el) {
    if (!el || !el._ripple || !el._ripple.enabled)
      return;
    const ripples2 = el.getElementsByClassName(cssClass.animation);
    if (ripples2.length === 0)
      return;
    const animation = ripples2[ripples2.length - 1];
    if (animation.dataset.isHiding)
      return;
    else
      animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove(cssClass.start);
      animation.classList.add(cssClass.end);
      opacity(animation, 0);
      setTimeout(() => {
        const ripples3 = el.getElementsByClassName(cssClass.animation);
        if (ripples3.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        animation.parentNode && el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!element || !element._ripple || element._ripple.touched)
    return;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch)
      return;
  }
  value.center = element._ripple.centered;
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  ripples.show(e, element, value);
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!element)
    return;
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function startListeners(el, setup, wasEnabled) {
  const enabled = isRippleEnabled(setup);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple || {};
  el._ripple.enabled = enabled;
  const value = setup || {};
  if (value.center) {
    el._ripple.centered = true;
  }
  if (value.class) {
    el._ripple.class = setup.class;
  }
  if (value.circle) {
    el._ripple.circle = setup.circle;
  }
  if (value.color) {
    el._ripple.color = setup.color;
  }
  if (enabled && !wasEnabled) {
    el.addEventListener("touchstart", rippleShow, { passive: true });
    el.addEventListener("touchend", rippleHide, { passive: true });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("dragstart", rippleHide, { passive: true });
  } else if (!enabled && wasEnabled) {
    stopListeners(el);
  }
}
function stopListeners(el) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleHide);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("dragstart", rippleHide);
}
var ripple_default = (el, setup) => startListeners(el, setup, false);

// src/allEvents.js
var allEvents_default = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "contextmenu",
  "mouseout",
  "mousewheel",
  "mouseover",
  "mouseenter",
  "touchstart",
  "touchend",
  "touchmove",
  "touchcancel",
  "keydown",
  "keyup",
  "keypress",
  "focus",
  "blur",
  "change",
  "input",
  "submit",
  "resize",
  "scroll",
  "hashchange"
];

// src/xhr.js
function makeXHRRequest(method, url, data, withCredentials = false, middleware = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (withCredentials) {
      xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    if (middleware) {
      middleware(xhr);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.send(data ? JSON.stringify(data) : null);
  });
}
function XHR(args = {}) {
  return makeXHRRequest(
    args.method.toUpperCase(),
    args.url,
    args.data || null,
    args.withCredentials,
    args.middleware || null
  );
}

// src/index.js
var ROUTER_KEY = "______xtyle-view-display-active-element______";
function camelCase(text) {
  return text.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    (e, r) => 0 == +e ? "" : 0 === r ? e.toLowerCase() : e.toUpperCase()
  ).replace(/[^\w]+/g, "");
}
function mountRemoveFirstChild(root, vnode) {
  let parentNode = root;
  if ("string" === typeof root) {
    parentNode = document.querySelector(root);
  }
  if (parentNode && vnode) {
    while (parentNode.firstChild) {
      parentNode.firstChild.remove();
    }
    parentNode.appendChild(vnode);
  }
  return parentNode;
}
window.x = function x(...args) {
  const [tag, attrs, ...children] = args;
  return [tag, attrs ? attrs : {}, children];
};
var randomUUID = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
  /[018]/g,
  (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);
var PrivateGlobalDict = {
  directives: {
    on(vnode, key, value) {
      const current = vnode.vdom ? vnode.vdom : vnode;
      if (allEvents_default.includes(key)) {
        current.addEventListener(key, value);
      }
    },
    ripple(vnode, value) {
      const current = vnode.vdom ? vnode.vdom : vnode;
      ripple_default(current, value);
    }
  },
  components: {},
  methods: {},
  ctx: {},
  val: globalVars,
  router: null,
  globalVarsCustom: {}
};
function fixURL(path) {
  path = "/" + path.replace(/^\/|\/$/g, "") + "/";
  return path;
}
function extractSearchParams(_path) {
  const searchParams = new URLSearchParams(_path);
  const obj = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
function extractPathArgs(_template, _path) {
  const template = fixURL(_template);
  const path = fixURL(_path);
  let regexp = new RegExp(template.replace(/{(.*?)}/g, "([^/]+)"));
  let match = path.match(regexp);
  let params = {};
  if (match) {
    const found = template.match(/{(.*?)}/g);
    if (found) {
      found.forEach((key, i) => {
        params[key.slice(1, -1)] = match[i + 1];
      });
    }
  }
  return params;
}
function validPath(_template, _path) {
  const template = fixURL(_template);
  const path = fixURL(_path);
  let regexp = new RegExp("^" + template.replace(/{(.*?)}/g, "([^/]+)") + "$");
  return regexp.test(path);
}
function getPathRoute(routes, currentPath) {
  const found = Object.keys(routes).filter(
    (route) => validPath(route, currentPath)
  );
  if (found.length > 0) {
    return found[0];
  }
  return "404";
}
var Page404 = createElement({
  props: {
    title: "Oops"
  },
  slot: {
    default() {
      const { title } = this.state;
      return [
        "div",
        {
          style: "text-align: center"
        },
        [
          [
            "h1",
            {
              style: "font-size: 8.5em"
            },
            [title]
          ],
          ["h3", {}, ["404 | Page not Found."]]
        ]
      ];
    }
  }
});
function mergePlugins(obj1, obj2) {
  for (let key in obj2) {
    obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ? mergePlugins(obj1[key], obj2[key]) : obj1[key] = obj2[key];
  }
  return obj1;
}
var injectCSS = (options) => {
  if (options.code) {
    inject({
      id: options.name || randomUUID(),
      code: options.code
    });
  }
};
var App = class {
  constructor(setup) {
    this.$setup = setup ? setup : {};
  }
  use(plugin, options = {}) {
    if (plugin.install) {
      const mixin = (options2) => {
        this.$setup = mergePlugins(this.$setup, options2);
      };
      plugin.install(
        {
          mixin,
          css: injectCSS
        },
        options
      );
    }
  }
  mount(root = "#app") {
    const options = this.$setup;
    let history = options.history ? options.history : false;
    let reactive = options.reactive ? options.reactive : true;
    let routes = options.routes ? options.routes : {};
    let AppComponent = options.app ? createElement(options.app) : null;
    let appComponents = options.components ? options.components : [];
    let appMethods = options.methods ? options.methods : {};
    let appStatic = options.ctx ? options.ctx : {};
    let appVars = options.val ? options.val : {};
    let appDirectives = options.directives ? options.directives : {};
    let vdom = null;
    let currentView = null;
    let routerPath = null;
    let currentPath = null;
    let pathParams = {};
    let searchQuery = {};
    if (!history) {
      if (!window.location.hash)
        window.location.hash = "/";
    }
    Object.entries(routes).forEach(([key, component]) => {
      routes[key] = createElement(component);
    });
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
      routerHandler();
      window.onpopstate = routerHandler;
    };
    async function routerHandler() {
      currentPath = history ? window.location.pathname : window.location.hash.slice(1);
      const splitPath = currentPath.split("?");
      routerPath = getPathRoute(routes, splitPath[0]);
      pathParams = extractPathArgs(routerPath, splitPath[0]);
      if (splitPath.length > 1) {
        searchQuery = extractSearchParams("?" + splitPath[1]);
      }
      currentView = routes[routerPath] || routes[404] || Page404;
      PrivateGlobalDict.router = {
        route: routerPath,
        path: currentPath,
        args: pathParams,
        query: searchQuery,
        go(path) {
          navigate(path);
        }
      };
      if (reactive) {
        vdom = AppComponent()();
        mountRemoveFirstChild(root, vdom.vdom);
      } else if (!vdom) {
        vdom = AppComponent()();
        vdom.mount(root);
      }
      if (currentView) {
        const routerElement = document.querySelector("#" + ROUTER_KEY);
        const routerView = currentView()();
        mountToRoot(routerElement, routerView.vdom);
      }
    }
    const allComponents = {};
    appComponents.map((item) => {
      allComponents[camelCase(item.name)] = createElement(item);
    });
    PrivateGlobalDict.components = allComponents;
    Object.keys(appVars).forEach((key) => {
      namespace_default(key, appVars[key]);
    });
    PrivateGlobalDict.ctx = Object.freeze(appStatic);
    PrivateGlobalDict.directives = {
      ...appDirectives,
      ...PrivateGlobalDict.directives
    };
    Object.keys(appMethods).forEach((key) => {
      appMethods[key] = appMethods[key].bind(PrivateGlobalDict);
    });
    PrivateGlobalDict.methods = Object.freeze(appMethods);
    PrivateGlobalDict.globalVarsCustom = options.custom || {};
    routerHandler();
    window.redraw = routerHandler;
  }
};
function createApp(setup) {
  return new App(setup);
}
var src_default = {
  h: hyperscript_default,
  dom: createElement,
  ...reactive_default,
  namespace: namespace_default,
  dict: dict2,
  inject,
  app: createApp,
  uuid: randomUUID,
  request: XHR
};
export {
  PrivateGlobalDict,
  ROUTER_KEY,
  src_default as default,
  randomUUID
};
