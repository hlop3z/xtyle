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

function diff(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false;
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!diff(obj1[key], obj2[key])) return false;
  }
  return true;
}

function HTMLNodeVars(tag, attrs, children, text = null) {
  return { tag, attrs, children, text };
}

function parseAttrs(attrs) {
  const __attrs__ = [];
  for (const key in attrs) {
    if (key.startsWith("@")) {
      __attrs__.push({
        type: "addEventListener",
        key: key.substring(1),
        value: attrs[key],
      });
    } else if (key.startsWith("x-")) {
      __attrs__.push({
        type: "customDirective",
        key: key.substring(2),
        value: attrs[key],
      });
    } else if (key.startsWith(":")) {
      __attrs__.push({
        type: "customValue",
        key: key.substring(1),
        value: attrs[key],
      });
    } else {
      __attrs__.push({ type: "setAttribute", key: key, value: attrs[key] });
    }
  }
  return __attrs__;
}

function parseChildren(children) {
  const __child__ = [];
  let _children = children;
  if (typeof children === "string") {
    _children = [children];
  }
  if (!children) {
    _children = [children];
  }
  _children.forEach((child) => {
    if (Array.isArray(child)) {
      __child__.push(HTMLNodeVars(child[0], child[1], parseChildren(child[2])));
    } else {
      __child__.push(HTMLNodeVars("#text", {}, null, child));
    }
  });
  return __child__;
}

function createElement(list) {
  const [tag, attrs, children] = list;
  const __attrs__ = parseAttrs(attrs);
  const __child__ = parseChildren(children);
  return { tag, attrs: __attrs__, children: __child__ };
}

function mountToRoot(root, velement) {
  if ("string" === typeof root) {
    const parentNode = document.querySelector(root);
    parentNode.appendChild(velement.render());
  } else {
    root.appendChild(velement.render());
  }
}

class VirtualDom {
  constructor(tag, attrs, children) {
    // HTML-Node (Setup)
    this.tag = tag;
    this.attrs = Array.isArray(attrs) ? attrs : [];
    this.children = children;

    // HTML-Element (Root & Self)
    this.root = null;
    this.$el = document.createElement(this.tag);
    this.$dict = {};
    this.$init = false;
  }

  mount(root = null) {
    if (this.root) {
      mountToRoot(this.root, this);
    } else {
      this.root = root;
      mountToRoot(root, this);
    }
  }

  unmount() {
    this.$el.remove();
  }

  redraw() {
    if (this.root) {
      // Re-Build
      const vdom = this.$view();
      this.children = vdom.children;
      this.attrs = vdom.attrs;
      // Re-Render
      this.render();
    }
  }

  _attachProps() {
    this.attrs.forEach((attr) => {
      // this.$el.setAttribute(key, value);
      if (["addEventListener", "setAttribute"].includes(attr.type)) {
        if (attr.type === "setAttribute") {
          this.$el[attr.type](attr.key, attr.value);
        } else {
          if (ALL_EVENTS.includes(attr.key)) {
            this.$el[attr.type](attr.key, attr.value);
          } else {
            // Custom "@"
            // console.log(attr.key);
          }
        }
      } else {
        // Custom "x-"
        if (attr.type === "customValue") {
          // this.$dict[attr.key] = attr.value;
          this.$dict.set(attr.key, attr.value);
        }
      }
    });
  }

  _resetElement() {
    while (this.$el.firstChild) {
      this.$el.removeChild(this.$el.firstChild);
    }
  }

  _attachChildren() {
    for (const child of this.children) {
      if (child instanceof VirtualDom) {
        this.$el.appendChild(child.render());
      } else {
        this.$el.appendChild(document.createTextNode(child));
      }
    }
  }

  render() {
    //console.log("re-render");
    this._attachProps();
    this._resetElement();
    this._attachChildren();
    return this.$el;
  }
}

function initVirtualDom(tag, attrs, children) {
  return new VirtualDom(tag, attrs, children);
}

function createVirtualDom(vdomObject) {
  const { tag, attrs, children, text } = vdomObject;
  if (tag === "#text") {
    return text;
  } else {
    if (Array.isArray(children)) {
      return initVirtualDom(tag, attrs, children.map(createVirtualDom));
    } else {
      return initVirtualDom(tag, attrs, children);
    }
  }
}

const CORE = {
  h: createElement,
  vdom: createVirtualDom,
};

export default CORE;
