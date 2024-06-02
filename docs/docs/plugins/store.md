# Store

The **`store`** section enables you to create centralized variables known as store variables, which are accessible throughout the entire application. This provides a single, organized location for managing and accessing important data, ensuring consistency and ease of reference.

## Store vs. Globals

The main difference between **`globals`** and **`store`** is that store variables are designed to be reactive, while global variables are not. Reactive store variables automatically update the UI or trigger other actions whenever their values change.

## Example Setup

Here’s how you can define and use a store variable in your application.

### Defining a Store Variable

```js
const { signal } = preact;

/* Plugin Install */
export function install(self, option) {
  return {
    // ...
    store: {
      darkMode: signal(true),
    },
    // ...
  };
}
```

### Accessing a Store Variable

You can access the value of a store variable using the `.value` property.

```js
console.log(xtyle.store.darkMode.value);
```

### Updating a Store Variable

Since store variables are reactive, updating them will automatically reflect the changes wherever they are used in your application.

```js
xtyle.store.darkMode.value = false;
```

Using `store` ensures that your application's state management is centralized, consistent, and reactive, making it easier to maintain and scale.
