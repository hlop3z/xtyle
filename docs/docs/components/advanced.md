You can control **`siblings`** by accessing them via their **`slot` name**.

```js
// xtyle.dom
export default {
  slots: ["main", "extra"],
  // Slot(s) use { this } to access the Component
  slot: {
    main() {
      const hideSibling = () => (this.slot.extra.style.display = "none");
      return [
        "button",
        {
          "x-on:click": hideSibling,
        },
        "Hide Extra",
      ];
    },
    extra() {
      return ["h1", {}, "Extra Slot"];
    },
  },
};
```

You can control **`siblings`** by calling them via their **`slot` name** using the **`toggle`** to toggle between **`class`(es)**.

```js
// Inject CSS for (Demo Purposes)
xtyle.inject({
  id: "demo-test",
  code: ".hide{ display: none; }",
});

// xtyle.dom
export default {
  slots: ["main", "extra"],
  slot: {
    main() {
      const toggleSibling = () => this.toggle("extra", "hide");
      return [
        "button",
        {
          "x-on:click": toggleSibling,
        },
        "Hide Extra",
      ];
    },
    extra() {
      return ["h1", {}, "Extra Slot"];
    },
  },
};
```
