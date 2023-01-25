# **App** | API

```js
export default {
  root: "#app",
  history: false,
  routes: {},
  components: [],
  methods: {},
  static: {},
  vars: {},
};
```

## Application | **Setup**

| Property         | Type              | Description                                         |
| ---------------- | ----------------- | --------------------------------------------------- |
| **`root`**       | String or Element | Where the Application will get mounted to           |
| **`history`**    | Boolean           | Use the hash (**`#`**) in the **`URLS`** Yes or No? |
| **`routes`**     | Object            | All **Views** you want the application to have      |
| **`components`** | Array             | All Global **Components**                           |
| **`methods`**    | Object            | All Global **Methods**                              |
| **`static`**     | Object            | All Global **Static** `non-reactive` values         |
| **`vars`**       | Object            | All Global **vars** aka `reactive` values           |
