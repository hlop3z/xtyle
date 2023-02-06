# **`$store`** and **`xtyle.dict`**

Creating and using **`reactive`** data.

!!! warning "tag"

    **Having** a **`tag`** creates an **`element`** and **NOT** having a **`tag`** creates a **`document-fragment`**.

    To make the **component** **`reactive`** to the **global `$store`** you **must use** a **`tag`**

## Example (**$Store**)

```js
// Xtyle App
const app = xtyle.app({
  // ...
  val: {
    counter: {
      count: 0,
    },
  },
  // ...
});

// xtyle.dom
export default {
  tag: "button",
  follow: ["counter"] // This makes the component reactive to `counter` changes
  slot: {
    default() {
      const { counter } = this.$store;
      const { count } = counter.state;
      return `Count is: ${count}`;
    },
  },
};
```

## Example `Reactive` (**Dict**)

```js
// xtyle.dict
const counter = xtyle.dict({
  count: 0,
});

// xtyle.dom
export default {
  tag: "button",
  data: {
    counter, // This makes the component reactive to `counter` changes
  },
  attrs: {
    "x-on:click": () => {
      counter.state = (draft) => (draft.count += 1);
    },
  },
  slot: {
    default() {
      const { count } = counter.state;
      return `Count is: ${count}`;
    },
  },
};
```
