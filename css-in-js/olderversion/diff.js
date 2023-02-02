// Diff
function diff(oldNode, newNode) {
  if (!oldNode) {
    return newNode;
  }

  if (!newNode) {
    oldNode.remove();
    return null;
  }

  if (oldNode.key !== newNode.key) {
    oldNode.replaceWith(newNode);
    return newNode;
  }

  if (changed(oldNode, newNode)) {
    oldNode.replaceWith(newNode);
    return newNode;
  }

  if (oldNode.tagName !== newNode.tagName) {
    oldNode.replaceWith(newNode);
    return newNode;
  }

  let oldAttrs = oldNode.attributes;
  let newAttrs = newNode.attributes;
  let attrs = diffAttrs(oldAttrs, newAttrs);

  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    oldNode.setAttribute(attr.name, attr.value);
  }

  diffChildren(oldNode, newNode);
  return oldNode;
}

// Utils
function changed(oldNode, newNode) {
  return oldNode.textContent !== newNode.textContent;
}

function diffAttrs(oldAttrs, newAttrs) {
  let attrs = [];

  if (oldAttrs) {
    for (let i = 0; i < newAttrs.length; i++) {
      let newAttr = newAttrs[i];
      let oldAttr = oldAttrs.getNamedItem(newAttr.name);
      if (!oldAttr || oldAttr.value !== newAttr.value) {
        attrs.push({
          name: newAttr.name,
          value: newAttr.value,
        });
      }
    }
  }
  return attrs;
}

function diffChildren(oldNode, newNode) {
  let oldChildren = Array.from(oldNode.childNodes);
  let newChildren = Array.from(newNode.childNodes);

  for (let i = 0; i < newChildren.length || i < oldChildren.length; i++) {
    let newChild = newChildren[i];
    let oldChild = oldChildren[i];
    let node = diff(oldChild, newChild);
    if (node && !oldNode.contains(node)) {
      oldNode.appendChild(node);
    }
  }
}

export default diff;
