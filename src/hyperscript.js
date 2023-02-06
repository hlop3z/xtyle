import { PrivateGlobalDict } from ".";
import { Component } from "./vnode";

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

export function setAttributes(vdom, attributes, vnode = null) {
  if (attributes) {
    for (let attr in attributes) {
      if (attr.startsWith("x-") || attr.startsWith("@")) {
        /* Custom Directive | Attribute */
        if (vnode) {
          setDirective(vnode, attr, attributes[attr]);
        } else {
          setDirective(vdom, attr, attributes[attr]);
        }
      } else if (attr === "class") {
        /* Class(es) | Attribute */
        const value = attributes[attr];
        if (Array.isArray(value)) {
          const nestedValue = value
            .map((item) =>
              typeof item === "string"
                ? item.replace(/\s/g, " ")
                : collectCSS(item)
            )
            .join(" ");
          vdom.setAttribute(attr, nestedValue);
        } else if (typeof value === "object" && value !== null) {
          vdom.setAttribute(attr, collectCSS(value));
        } else {
          vdom.setAttribute(attr, value.replace(/\s/g, " "));
        }
      } else {
        /* Regular | Attribute */
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

export default hyperScript;
