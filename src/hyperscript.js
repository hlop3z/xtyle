import { PrivateDict } from ".";

function setDirective(node, key, value) {
  const directives = PrivateDict.directives;
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
      items.push(key);
    }
  });
  return items.join(" ");
}

export function setAttributes(vdom, attributes, vnode = null) {
  if (attributes) {
    for (let attr in attributes) {
      if (attr.startsWith("x-")) {
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
            .map((item) => (typeof item === "string" ? item : collectCSS(item)))
            .join(" ");
          vdom.setAttribute(attr, nestedValue);
        } else if (typeof value === "object" && value !== null) {
          vdom.setAttribute(attr, collectCSS(value));
        } else {
          vdom.setAttribute(attr, value);
        }
      } else {
        /* Regular | Attribute */
        vdom.setAttribute(attr, attributes[attr]);
      }
    }
  }
}

function hyperScript(hscript, parent = null) {
  const [tag, attributes, children] = hscript;
  const node = document.createElement(tag);

  // Set Attributes
  setAttributes(node, attributes);

  // Set Children
  if (children) {
    children.forEach((child) => {
      if (typeof child === "function") {
        const current = child(parent);
        if (parent) {
          Object.keys(current.$uuid).forEach((key) => {
            parent.$uuid[key] = current.$uuid[key];
          });
        }
        node.appendChild(current.vdom);
      } else if (Array.isArray(child)) {
        const current = child[0];
        if (typeof current === "string") {
          // Single Children
          node.appendChild(hyperScript(child));
        } else {
          // Multi Children
          child.map((xchild) => node.appendChild(hyperScript(xchild)));
        }
      } else {
        // Text Children
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
