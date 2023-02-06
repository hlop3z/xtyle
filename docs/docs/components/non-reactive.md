This is the **simplest** form of creating a reusable component.

```js
const Title = (text) => ["h1", {}, text];
```

You can then use it in a `xtyle.dom` component to test its functionality.

```js
const Title = (text) => ["h1", {}, text];

// xtyle.dom
export default {
  slot: {
    default() {
      return [Title("Hello World 1"), Title("Hello World 2")];
    },
  },
};
```
