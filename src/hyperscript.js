import { Component } from "./component.js";

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

function h(tagName, attributes, children) {
  if (!tagName) return () => null;
  if (tagName === "template") return h(...children[0]);
  const node = document.createElement(tagName);
  function WrappParent(parent = null) {
    const dictSync = {};
    for (let attr in attributes) {
      if (attr === "show") {
        if (attributes[attr] === false) {
          node.hidden = true;
          return node;
        }
      }
      if (attr !== "key" && attr !== "show") {
        if (attr.startsWith("x-on:")) {
          let eventType = attr.slice(5);
          if (ALL_EVENTS.includes(eventType)) {
            node.addEventListener(eventType, attributes[attr]);
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

function createFragment(item) {
  if (typeof item !== "string" && item) {
    const [tag, attributes, children] = item;
    const node = document.createElement(tag);
    if (attributes) {
      for (let attr in attributes) {
        if (attr === "show") {
          if (attributes[attr] === false) {
            node.hidden = true;
            return node;
          }
        }
        if (attr !== "key" && attr !== "show") {
          if (attr.startsWith("x-on:")) {
            let eventType = attr.slice(5);
            if (ALL_EVENTS.includes(eventType)) {
              node.addEventListener(eventType, attributes[attr]);
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
    children.forEach((child) => {
      node.appendChild(createFragment(child));
    });
    return node;
  } else {
    return document.createTextNode(item);
  }
}

export function fragment(...items) {
  return items.map((item) => createFragment(item));
}
