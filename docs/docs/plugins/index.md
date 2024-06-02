# Install

The **`install`** method is where you setup your plugin. It receives the **`self` (module)** and **`options` (configuration)** as parameters.

You can customize the plugin by adding various parts within the returned object.
Such as...

- **`init`**
- **`actions`**
- **`directives`**
- **`globals`**
- **`models`**
- **`router`**
- **`store`**

```js
const Plugin = {
  /**
   * Plugin Install
   * @param {Object} self - The plugin instance.
   * @param {Object} options - Configuration options for the plugin.
   * @returns {Object} - Various plugin parts (actions, directives, etc).
   */
  install(self, options) {
    console.log("The Plugin", self);
    console.log("The Options", options);

    /* Plugin Parts */
    return {
      actions: {},
      directives: {},
      globals: {},
      init: {},
      models: {},
      router: {},
      store: {},
    };
  },
};
```

## `Use` your plugin

To use your plugin, simply call **`xtyle.use`**. This will execute the install method and set up your plugin.

```js
xtyle.use(Plugin, { key: "value" }); // This will run the `install` method.
```
