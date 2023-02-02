import reactive from "./reactive.js";

/*
    create
    read
    update
    delete
    ------------------------------
    const root = new AVLTree()

    root.create(1, "One")
    console.log(root.read(1))

    root.create(2, "Two")
    console.log(root.read(2))

    root.update(2, "my data")
    console.log(root.read(2))

    root.delete(2)
    console.log(root.read(2))
*/
/*
    create
    read
    update
    delete
    ------------------------------
    const root = new AVLTree()

    root.create(1, "One")
    console.log(root.read(1))

    root.create(2, "Two")
    console.log(root.read(2))

    root.update(2, "my data")
    console.log(root.read(2))

    root.delete(2)
    console.log(root.read(2))
*/
/*
    create
    read
    update
    delete
    ------------------------------
    const root = new AVLTree()

    root.create(1, "One")
    console.log(root.read(1))

    root.create(2, "Two")
    console.log(root.read(2))

    root.update(2, "my data")
    console.log(root.read(2))

    root.delete(2)
    console.log(root.read(2))
*/
const GLOBAL_EVENT = "xtyleGlobalsUpdate";

class AVLNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
class AVLTree {
  constructor() {
    this.root = null;
    this.__keys__ = new Set();
  }

  get keys() {
    return Array.from(this.__keys__);
  }

  create(key, value) {
    this.root = this._insert(key, value, this.root);
    this.__keys__.add(key);
    return this;
  }

  _insert(key, value, node) {
    if (!node) {
      return new AVLNode(key, value);
    }
    if (key < node.key) {
      node.left = this._insert(key, value, node.left);
    } else {
      node.right = this._insert(key, value, node.right);
    }
    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right));
    const balance = this._getBalance(node);
    if (balance > 1 && key < node.left.key) {
      return this._rotateRight(node);
    }
    if (balance < -1 && key > node.right.key) {
      return this._rotateLeft(node);
    }
    if (balance > 1 && key > node.left.key) {
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }
    if (balance < -1 && key < node.right.key) {
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }
    return node;
  }

  read(key) {
    return this._find(key, this.root);
  }

  _find(key, node) {
    if (!node) {
      return null;
    }
    if (key === node.key) {
      return node.value;
    }
    if (key < node.key) {
      return this._find(key, node.left);
    }
    return this._find(key, node.right);
  }

  _height(node) {
    if (!node) {
      return 0;
    }
    return node.height;
  }

  _getBalance(node) {
    if (!node) {
      return 0;
    }
    return this._height(node.left) - this._height(node.right);
  }

  _rotateRight(node) {
    const { left } = node;
    const leftRight = left.right;
    left.right = node;
    node.left = leftRight;
    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right));
    left.height =
      1 + Math.max(this._height(left.left), this._height(left.right));
    return left;
  }

  _rotateLeft(node) {
    const { right } = node;
    const rightLeft = right.left;
    right.left = node;
    node.right = rightLeft;
    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right));
    right.height =
      1 + Math.max(this._height(right.left), this._height(right.right));
    return right;
  }

  update(key, value) {
    let current = this.root;
    while (current) {
      if (key === current.key) {
        current.value = value;
        return true;
      }
      if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  delete(key) {
    this.root = this._delete(key, this.root);
  }

  _delete(key, node) {
    if (!node) {
      return null;
    }
    if (key < node.key) {
      node.left = this._delete(key, node.left);
    } else if (key > node.key) {
      node.right = this._delete(key, node.right);
    } else {
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      const minNode = this._findMinNode(node.right);
      node.key = minNode.key;
      node.value = minNode.value;
      node.right = this._delete(minNode.key, node.right);
    }
    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right));
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) {
      return this._rotateRight(node);
    }
    if (balance > 1 && this._getBalance(node.left) < 0) {
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }
    if (balance < -1 && this._getBalance(node.right) <= 0) {
      return this._rotateLeft(node);
    }
    if (balance < -1 && this._getBalance(node.right) > 0) {
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }
    return node;
  }

  _findMinNode(node) {
    if (!node.left) {
      return node;
    }
    return this._findMinNode(node.left);
  }
}

export const reactiveTree = new AVLTree();

function setProperty(target, key) {
  Object.defineProperty(target, key, {
    get: function () {
      return target.$____state____$[key];
    },
    set: function (value) {
      target.$____update____$((draft) => (draft[key] = value));
    },
  });
}

class SimpleNamespace {
  constructor(namespace, kwargs) {
    const objKeys = Object.keys(kwargs);
    const $namespace = namespace.toLowerCase();
    this.$____namespace____$ = $namespace;
    this.$____dict____$ = kwargs;
    this.$____keys____$ = objKeys;

    // Create Tree
    reactiveTree.create($namespace, kwargs);

    // Init Values
    objKeys.forEach((key) => {
      setProperty(this, key);
    });

    // ReDraw Current
  }

  $redraw() {
    const { redraw } = window.$____XPRIVATEDICTX____$.router;
    if (redraw) {
      redraw();
    }
  }

  get $update() {
    return this.$____update____$;
  }

  get $store() {
    return reactiveTree;
  }

  get $____state____$() {
    return reactiveTree.read(this.$____namespace____$);
  }

  $____update____$(method) {
    const { data, update } = reactive.produce(this.$____dict____$, method);
    if (update) {
      const namespace = this.$____namespace____$;
      this.$____dict____$ = data;
      reactiveTree.update(namespace, data);
      let event = new CustomEvent(GLOBAL_EVENT, {
        detail: { namespace: namespace },
      });
      window.dispatchEvent(event);
    }
  }
}

function createSimpleNamespace(namespace, kwargs) {
  return new SimpleNamespace(namespace, kwargs);
}

export default createSimpleNamespace;
