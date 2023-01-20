import AVLTree from "./AVLTree.js";

class TreeNode {
  constructor(root, name) {
    this.__name__ = name;
    this.__root__ = root;
  }
  get value() {
    return this.__root__.find(this.__name__);
  }
  set value(value) {
    return this.__root__.update(this.__name__, value);
  }
  get method() {
    return this.__root__.find(this.__name__);
  }
}

class Tree {
  constructor() {
    this.__root__ = new AVLTree();
    this.__keys__ = new Set();
    this.__items__ = {};
  }
  init(value) {
    const ID = this.size + 1;
    this.__keys__.add(ID);
    this.__root__.insert(ID, value);
    this.__items__[ID] = new TreeNode(this.__root__, ID);
    return this.__items__[ID];
  }
  get keys() {
    return Array.from(this.__keys__);
  }
  get size() {
    return this.__keys__.size;
  }
  get items() {
    return this.__items__;
  }
  find(key) {
    return this.__items__[key];
  }
}

export default function createTree() {
  return new Tree();
}

/*
// Creating an instance of the AVLTree class

const VirtualDOM = Tree();
const createTree = VirtualDOM.init(() => new Tree());

const childDom = createTree.method();
console.log(childDom);
console.log(VirtualDOM.keys);
*/
