# **$UI** | API

```js
export default {
  mounted: () => {
    this.$ui.router.go("/about");
  },
  view: () => ["div", {}, ["Hello World"]],
};
```

## **`router`**

| Property       | Description                              |
| -------------- | ---------------------------------------- |
| **`go(path)`** | Navigate to another **`View`**           |
| **`redraw`**   | Global Static Objects (**Non-Reactive**) |

```js
export default {
  mounted: () => {
    console.log(this.$ui.router);
    console.log(this.$ui.static);
    console.log(this.$ui.methods);
    console.log(this.$ui.vars);
  },
  view: () => ["div", {}, ["Hello World"]],
};
```

## **`$ui`**

| Property      | Description                              |
| ------------- | ---------------------------------------- |
| **`router`**  | Application Router                       |
| **`static`**  | Global Static Objects (**Non-Reactive**) |
| **`methods`** | Global Methods                           |
| **`vars`**    | Global Objects (**Reactive**)            |
| **`current`** | Current View                             |
