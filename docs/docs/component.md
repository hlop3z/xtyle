# Reusable **Component**(s)

Create **reusable** components

## Component | **Setup**

```js title="component.js"
export default xtyle.dom({
  tag: "string", // (1)
  props: {}, // (2)
  data: {}, // (3)
  sync: {}, // (4)
  follow: [], // (5)
  methods: {}, // (6)
  slots: [], // (7)
  slot: {
    default() {}, // (8)
  },
  attrs: {}, // (9)
  css: {}, // (10)
  style: {}, // (11)
  // Events
  init() {}, // (12)
  mounted() {}, // (13)
});
```

1. HTML element **&lt;tag&gt;**
2. **Argumnets** to be passed to the component
3. Component's **Reactive-Data**
4. Sync **Values** with parent. Binds **`{ componentKey : parentKey }`**
5. List all **`vars`** that the component should **follow** and **react** to **changes**
6. Component's internal **`methods`**
7. List of **`slots`** you will like to create. If **`none`** is defined, the **`default`** slot will be rendered.
8. Each **`function`** will be representing a **`slot`**
9. HTML (**`slot`**) element **`attributes`**
10. HTML (**`slot`**) element **`class`(es)**
11. HTML (**`slot`**) element **`style`(s)**
12. Runs **Onces** as long as the component is **not `re-render`** by the **`parent`**
13. Runs when **Mounted & Updated**

| Property      | Type          | Description                                                                           |
| ------------- | ------------- | ------------------------------------------------------------------------------------- |
| **`tag`**     | String        | HTML element **&lt;tag&gt;**                                                          |
| **`props`**   | Object        | **Argumnets** to be passed to the component                                           |
| **`data`**    | Object        | Component's **Reactive-Data**                                                         |
| **`sync`**    | Object        | Sync **Values** with parent. Binds **`{ componentKey : parentKey }`**                 |
| **`follow`**  | Array(String) | List all **`vars`** that the component should **follow** and **react** to **changes** |
| **`methods`** | Object        | Component's internal **`methods`**                                                    |
| **`slots`**   | Array(String) | List of **`slots`** you will like to create                                           |
| **`slot`**    | Object        | Each **`slot`** must be a **`function`**                                              |
| **`attrs`**   | Object        | HTML (**`slot`**) element **`attributes`**                                            |
| **`css`**     | Object        | HTML (**`slot`**) element **`class`(es)**                                             |
| **`style`**   | Object        | HTML (**`slot`**) element **`style`(s)**                                              |

## Component | **Events**

| Property      | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| **`init`**    | Runs **Onces** as long as the component is **not `re-render`** by the **`parent`** |
| **`mounted`** | Runs when **Mounted & Updated**                                                    |

## **Re**writable

!!! warning "props"

    **`Props`** are **rewritable** by default. But you can also change configurations from the pre-defined component(s).

    - **`$sync`**
    - **`$slot`**
    - **`$attrs`**
    - **`$methods`**
    - **`$mounted`**

```js
myComponent({
  $sync: {},
  $slot: {},
  $attrs: {},
  $methods: {},
  $mounted() {},
  titlePROP: "Hello World",
});
```

### Internal **`Code`**

```js
switch (key) {
  case "$sync":
    schema.sync = { ...schema.sync, ...kwargs.$sync };
    break;
  case "$slot":
    schema.slot = { ...schema.slot, ...kwargs.$slot };
    break;
  case "$attrs":
    schema.attrs = { ...schema.attrs, ...kwargs.$attrs };
    break;
  case "$methods":
    schema.methods = { ...schema.methods, ...kwargs.$methods };
    break;
  case "$mounted":
    schema.mounted = kwargs.$mounted;
    break;
}
```
