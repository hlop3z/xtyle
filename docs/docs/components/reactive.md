A **simple** but **`reactive`** component.

!!! info "self | this"

    When **defining** a component, if using **`events`** inside the definition, you must use **`self`** to access the properties.

    In the **slot(s)** and **methods** you must use **`this`**

```js
// xtyle.dom
export default {
  tag: "button",
  data: {
    count: 0,
  },
  // Attr(s) required the { self } value to access the Component
  attrs: {
    "x-on:click": (self) => self.state.add(),
  },
  // Method(s) use { this } to access the Component
  methods: {
    add() {
      this.state = (draft) => (draft.count += 1);
    },
  },
  // Slot(s) use { this } to access the Component
  slot: {
    default() {
      return `Count is: ${this.state.count}`;
    },
  },
};
```
