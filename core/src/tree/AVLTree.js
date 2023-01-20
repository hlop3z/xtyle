class AVLNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
/*
    find
    insert
    update
    delete
  */
class AVLTree {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    this.root = this._insert(key, value, this.root);
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

  find(key) {
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
    } else {
      return this._find(key, node.right);
    }
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
    const left = node.left;
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
    const right = node.right;
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

export default AVLTree;
