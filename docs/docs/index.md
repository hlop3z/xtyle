# Welcome to **Xtyle**

A **minimalistic** framework. This framework is heavily inspired by 5 tools.

!!! tip "Frameworks (3)"

    -  React
    -  Vue
    -  Mithril

!!! tip "Tools (2)"

    -  Immer (**Produce**)
    -  Material Design (**Ripple**) | **`x-ripple`**

    **JSX** | Demo

    ```html
     <button x-ripple={}>Click Me</button>
    ```

## **Tools** to Build . . .

- **`routes`** and **`history`** | A **Router**
- **`components`** | Reactive & Reusable [**Component**(s)](component/)
- **`directives`** | Global **Directives**
- **`val`** | Global **State** Variables **`reactive`**
- **`ctx`** | Global **Static** Variables **`non-reactive`**
- **`app.use(plugin)`** | Reusable **Plugins**

## Application **Setup**

```js title="app.js"
const app = xtyle.app({
  app: {}, // (1)
  history: false, // (2)
  reactive: true, // (3)
  routes: {}, // (4)
  components: [], // (5)
  directives: {}, // (6)
  methods: {}, // (7)
  ctx: {}, // (8)
  val: {}, // (9)
});
```

1. **Application** Component
2. IF `true`, the **URLs** will not include the **`#`**
3. IF `true`, the Application Component will **re-render** everytime you **change routes**.
4. All **Views** you want the application to have
5. All Global **Components**
6. All Global **Directives**
7. All Global **Methods**
8. All Global **Static** `non-reactive` values
9. All Global **vars** aka `reactive` values

| Property         | Type    | Description                                                                       |
| ---------------- | ------- | --------------------------------------------------------------------------------- |
| **`app`**        | Object  | **Application** Component                                                         |
| **`history`**    | Boolean | Use the hash (**`#`**) in the **`URLS`**? (**Yes: `false`**) and (**No: `true`**) |
| **`reactive`**   | Boolean | **Re-render** everytime you **change routes**.                                    |
| **`routes`**     | Object  | All **Views** you want the application to have                                    |
| **`components`** | Array   | All Global **Components**                                                         |
| **`directives`** | Object  | All Global **Directives**                                                         |
| **`methods`**    | Object  | All Global **Methods**                                                            |
| **`ctx`**        | Object  | All Global **Static** `non-reactive` values                                       |
| **`val`**        | Object  | All Global **Values** aka `reactive` values                                       |
