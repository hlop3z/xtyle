const ALL_DIRECTIVES = {
  if: (vdom, attr) => {
    const watchKey = vdom.attrs[attr];
    if (["true", "false", true, false].includes(watchKey)) {
      if (["true", true].includes(watchKey)) {
        vdom.$render = true;
      } else if (["false", false].includes(watchKey)) {
        vdom.$render = false;
      }
    } else {
      if (vdom.parent) {
        if (vdom.parent.$data) {
          vdom.$render = vdom.parent.$data.state[watchKey];
        }
      }
    }
  },
};

const ALL_EVENTS = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "contextmenu",
  "mouseout",
  "mousewheel",
  "mouseover",
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
  "submit",
  "resize",
  "scroll",
  "load",
  "unload",
  "hashchange",
];

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

class VirtualDom {
  constructor(tag, attrs, children, parent) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.parent = parent;
    this.root = null;
    this.$el = null;
    this.$data = null;
    this.$watch = {};
    this.$render = true;
  }
  get state() {
    if (this.$data) {
      return this.$data.state;
    }
    return {};
  }

  set state(method) {
    if (this.$data) {
      this.$data.update(method);
    }
  }

  update(tag, attrs, children) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    const newDom = this.render();
    if (this.$el.parentNode) {
      this.$el.parentNode.replaceChild(newDom, this.$el);
    }
    this.$el = newDom;
  }

  render() {
    let el = document.createElement(this.tag);
    let mount = null;
    let unmount = null;

    if (this.attrs["x-show"] === false) {
      el.hidden = true;
      return el;
    }
    if (this.attrs["x-if"] === false) {
      el.hidden = true;
      return el;
    }

    for (let attr in this.attrs) {
      if (attr.startsWith("@")) {
        let eventType = attr.slice(1);
        // SET -> Events
        if (ALL_EVENTS.includes(eventType)) {
          el.addEventListener(eventType, this.attrs[attr]);
        } else {
          if (eventType === "mounted") {
            mount = this.attrs[attr];
          }
          if (this.$el && eventType === "unmounted") {
            unmount = this.attrs[attr];
          }
        }
        el.addEventListener(eventType, this.attrs[attr]);
      } else if (attr.startsWith(":")) {
        // SET -> Bind-Two-Ways
        let childAttr = attr.slice(1);
        let parentKey = this.attrs[attr];
        this.$watch[childAttr] = parentKey;
        if (childAttr === "class") {
          try {
            const found = this.parent.$data.state[parentKey];
            const theClass = found ? found : null;
            if (theClass) {
              el.setAttribute("class", theClass);
            }
          } catch (e) {
            e;
          }
        }
      } else if (attr.startsWith("x-")) {
        // SET -> Directives
        let attrName = attr.slice(2);
        const directive = ALL_DIRECTIVES[attrName];
        if (directive) {
          directive(this, attr);
        }
      } else {
        // SET -> Attributes
        el.setAttribute(attr, this.attrs[attr]);
      }
    }

    // Append-Children
    if (!Array.isArray(this.children)) {
      this.children = [this.children];
    }
    for (let child of this.children) {
      if (Array.isArray(child)) {
        let childEl = new VirtualDom(...child, this).render();
        childEl.$el = childEl;
        el.appendChild(childEl.$el);
      } else if (child instanceof VirtualDom) {
        if (child) child.parent = this;
        child.$el = child.render();
        if (child.$render) {
          el.appendChild(child.$el);
        }
      } else {
        el.appendChild(document.createTextNode(child));
      }
    }

    // UnMount & Mount
    if (unmount) {
      unmount(el);
    }
    if (mount) {
      mount(el);
    }
    // Return VElement
    return el;
  }

  mount(root = null) {
    /**
     * Mount { Virtual-DOM } to { document.<node> }
     * @param  {String | Object} root A String for { querySelector } or an { Element-Object }
     */
    if (this.root) {
      mountToRoot(this.root, this);
    } else {
      this.root = root;
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

function createVirtualDom(setup) {
  return new VirtualDom(...setup, null);
}

export default createVirtualDom;
