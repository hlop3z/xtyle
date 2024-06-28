# Actions

Global **`actions`** allow you to manage actions that are used across your entire application.

!!! tip "Arguments"

    Functions can be executed **with** or **without** arguments.

## Example Setup

The following example demonstrates how to set up a plugin with a global action.

```js
/* Plugin Install */
export function install(self, option) {
  return {
    actions: {
      api: {
        demo(args) {
          console.log("Global Actions");
        },
      },
    },
  };
}
```

## Running Actions

To run a global action, use the `xtyle.action` method. The following example shows how to execute the `demo` action with an argument.

```js
xtyle.action("api.demo", { param: 1 });
```
