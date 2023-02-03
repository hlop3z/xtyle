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
  app: {}, // (1)
  history: false, // (2)
  reactive: false, // (3)
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
