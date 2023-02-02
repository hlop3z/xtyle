# Welcome to **Xtyle**

A **minimalistic** framework. This framework is heavily inspired by 3 tools. **React, Vue** and **Mithril**

## **Tools** to Build . . .

- A **Router**
- Reactive [**Component**(s)](component/)
- **Directives**
- Global **State**
- Global **Static Variables**

## Application **Setup**

```js title="app.js"
const app = xtyle.app({
  history: false, // (1)
  reactive: false, // (2)
  routes: {}, // (3)
  components: [], // (4)
  methods: {}, // (5)
  ctx: {}, // (6)
  var: {}, // (7)
});
```

1. IF `true`, the **URLs** will not include the **`#`**
2. IF `true`, the Application Component will **re-render** everytime you **change routes**.
3. All **Views** you want the application to have
4. All Global **Components**
5. All Global **Methods**
6. All Global **Static** `non-reactive` values
7. All Global **vars** aka `reactive` values

| Property         | Type    | Description                                                                       |
| ---------------- | ------- | --------------------------------------------------------------------------------- |
| **`history`**    | Boolean | Use the hash (**`#`**) in the **`URLS`**? (**Yes: `false`**) and (**No: `true`**) |
| **`reactive`**   | Boolean | **Re-render** everytime you **change routes**.                                    |
| **`routes`**     | Object  | All **Views** you want the application to have                                    |
| **`components`** | Array   | All Global **Components**                                                         |
| **`methods`**    | Object  | All Global **Methods**                                                            |
| **`ctx`**        | Object  | All Global **Static** `non-reactive` values                                       |
| **`var`**        | Object  | All Global **vars** aka `reactive` values                                         |
