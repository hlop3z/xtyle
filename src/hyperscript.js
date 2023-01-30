import { Component } from "./component.js";
import ripple from "./ripple.js";

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
  "hashchange",
];

function setAttributes(node, attributes) {
  if (attributes) {
    for (let attr in attributes) {
      if (attr === "show") {
        if (attributes[attr] === false) {
          node.hidden = true;
          return true;
        }
      }
      if (attr !== "key" && attr !== "show") {
        if (attr.startsWith("x-")) {
          if (attr.startsWith("x-on:")) {
            let eventType = attr.slice(5);
            if (ALL_EVENTS.includes(eventType)) {
              node.addEventListener(eventType, attributes[attr]);
            }
          } else {
            if ("x-ripple") {
              const _config = attributes[attr];
              let config = {};
              if (_config) {
                config = new Function("return " + _config)();
              }
              ripple(node, config);
            }
          }
        } else if (attr === "class") {
          if (Array.isArray(attributes[attr])) {
            node.setAttribute(attr, attributes[attr].join(" "));
          } else {
            if (attributes[attr]) {
              node.setAttribute(attr, attributes[attr]);
            }
          }
        } else {
          node.setAttribute(attr, attributes[attr]);
        }
      }
    }
  }
}

function h(tagName, attributes, children) {
  if (!tagName) return () => null;
  if (tagName === "template") return h(...children[0]);
  const node = document.createElement(tagName);
  function WrappParent(parent = null) {
    // Set Attributes
    const empty = setAttributes(node, attributes);
    if (empty) {
      return node;
    }
    if (!Array.isArray(children)) {
      children = [children];
    }
    children.forEach((child) => {
      if (child) {
        if (child instanceof Component) {
          child.$root = node;
          child.$parent = parent;
          const vnode = child.render();
          if (vnode) {
            node.appendChild(vnode);
          }
        } else if (typeof child === "object") {
          if (child[0] === "template") {
            fragment(...child[2]).forEach((fragmented) => {
              node.appendChild(fragmented);
            });
          } else {
            node.appendChild(h(...child)());
          }
        } else {
          node.appendChild(document.createTextNode(child));
        }
      }
    });
    return node;
  }
  return WrappParent;
}

export default h;

// Fragments
function createFragment(item) {
  if (typeof item !== "string" && item) {
    const [tag, attributes, children] = item;
    const node = document.createElement(tag);
    // Set Attributes
    const empty = setAttributes(node, attributes);
    if (empty) {
      return node;
    }
    children.forEach((child) => {
      node.appendChild(createFragment(child));
    });
    return node;
  } else {
    return document.createTextNode(item);
  }
}

function fragment(...items) {
  return items.map((item) => createFragment(item));
}

// Singleton
function createSingletonElement(root, uniqueID) {
  let count = 0;
  let current = null;
  let rootElement = null;
  if (typeof root === "string") {
    rootElement = document.getElementById(root);
  } else {
    rootElement = root;
  }
  const foundEditor = document.getElementById(uniqueID);
  if (!foundEditor) {
    count += 1;
    const newEditor = document.createElement("div");
    newEditor.setAttribute("id", uniqueID);
    rootElement.appendChild(newEditor);
    current = newEditor;
  } else {
    current = foundEditor;
  }
  return { el: current, init: foundEditor ? true : false };
}

function attachToBody(uniqueID) {
  const element = document.getElementById(uniqueID);
  if (!element) {
    const newEditor = document.createElement("div");
    newEditor.setAttribute("id", uniqueID);
    document.body.appendChild(newEditor);
  }
}

const createFromHyperList = (hscript) => {
  const [tag, attributes, children] = hscript;
  const node = document.createElement(tag);

  // Set Attributes
  const empty = setAttributes(node, attributes);
  if (empty) {
    return node;
  }

  children.forEach((child) => {
    if (Array.isArray(child)) {
      node.appendChild(createFromHyperList(child));
    } else {
      node.appendChild(document.createTextNode(child));
    }
  });

  return node;
};

export const element = {
  create: createSingletonElement,
  attach: attachToBody,
  h: createFromHyperList,
};
