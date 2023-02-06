You can create your own **`directives`**

## Creating

```js
// Xtyle App
const app = xtyle.app({
  // ...
  directives: {
    css(vnode, value) {
      // IF (VDom) => is a Component
      // IF NOT    => is a HTML <Element>
      const element = vnode.vdom ? vnode.vdom : vnode;

      // Change Color
      element.style.backgroundColor = value.color;
    },
  },
  // ...
});
```

**Imaginary** Usage

```html
<div x-css="{ color: 'black' }"></div>
```

**Real** Usage

```js
const HyperScript = [
  "div",
  {
    "x-css": { color: "black" },
  },
  [
    /* children */
  ],
];
```

## Built-In

!!! tip

    There are **two (2) built-in `directives`**

```js
// xtyle.dom
export default {
  // Attr(s) required the { self } value to access the Component
  attrs: {
    "x-on:click": () => console.log("Clicked"),
    "x-ripple": { center: false, circle: true, color: "red" },
  },
};
```

!!! tip "Using @"

    You can use **`@`** instead of **`x-on:`**

```js
// xtyle.dom
export default {
  attrs: {
    "@click": () => console.log("Clicked"),
  },
};
```

!!! warning "Using @"

    You can **`NOT`** use **`@`** instead of **`x-on:`** when using **`JSX`**

```js
// xtyle.dom
export default {
  slot: {
    default() {
      const Good = <button x-on:click="Will Work"> </button>;
      const Bad = <button @click="Will NOT Work"> </button>;
    },
  },
};
```
