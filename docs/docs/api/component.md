# **Component** | API

```js
export default {
  follow: [],
  sync: {},
  props: {},
  data: {},
  methods: {},
  view: () => ["div", {}, ["Hello World"]],
};
```

## Component | **Setup**

| Property      | Type          | Description                                                                           |
| ------------- | ------------- | ------------------------------------------------------------------------------------- |
| **`follow`**  | Array(String) | List ALL **`vars`** that the component should **Follow** and **React** to **Changes** |
| **`sync`**    | Object        | Sync Values with Parent. Binds **`{ componentKey : parentKey }`**                     |
| **`props`**   | Object        | **Argumnets** to be Passed to the Component                                           |
| **`data`**    | Object        | Component's **Reactive-Data**                                                         |
| **`methods`** | Object        | Component's Internal **Methods**                                                      |
| **`view`**    | Function      | **HyperScript** Format                                                                |

## Component | **Props**

- **`String`**
- **`Number`**
- **`Array`**
- **`Object`**
- **`Function`**

## Component | **Events**

| Property      | Description                     |
| ------------- | ------------------------------- |
| **`mounted`** | Runs when **Mounted & Updated** |
| **`init`**    | Runs **Only Onces**             |

```js
export default {
  mounted: () => {},
  init: () => {},
  view: () => ["div", {}, ["Hello World"]],
};
```

## Component | **Core**

| Property      | Description        |
| ------------- | ------------------ |
| **`$el`**     | HTML Element       |
| **`$parent`** | Virtual DOM Parent |
| **`$gui`**    | Global Components  |
| **`$ui`**     | Global Tools       |

```js
export default {
  mounted: () => {
    console.log(this.$el);
    console.log(this.$parent);
    console.log(this.$gui);
    console.log(this.$ui);
  },
  view: () => ["div", {}, ["Hello World"]],
};
```
