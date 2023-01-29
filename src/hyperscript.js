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
  const node = document.createElement(tagName);

  function WrappParent(parent = null) {
    // Attributes
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
          // SET -> Events
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
          // SET -> Attrs
          node.setAttribute(attr, attributes[attr]);
        }
      }
    }

    // Children
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
          node.appendChild(h(...child)());
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
