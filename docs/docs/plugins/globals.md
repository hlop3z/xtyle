# Globals

Declaring **`globals`** variables allows you to define variables that can be reused throughout your entire application. This helps in maintaining consistency and reducing redundancy by providing a single source of truth for commonly used values. Unlike store variables, global variables are not reactive, meaning their changes won't automatically trigger updates in the UI or other parts of your application.

## Example Setup

Here’s how you can define and use a global variable in your application.

### Defining a Global Variable

```js
/* Plugin Install */
export function install(self, option) {
  return {
    // ...
    globals: {
      someVariable: "Hello World!",
    },
    // ...
  };
}
```

### Accessing a Global Variable

You can access the value of a global variable directly through the `xtyle.global` object.

```js
console.log(xtyle.global.someVariable);
```

Using **`globals`** variables ensures that your application's commonly used values are centralized and easy to manage, promoting consistency and reducing the risk of discrepancies.
