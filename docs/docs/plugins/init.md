# INIT

The **`init`** section is automatically called when starting your application. Its purpose is to perform any other necessary setup, both **`before`** and **`after`** the instance is fully created. This ensures that all necessary configurations and preparations are completed, providing a stable starting state for your application.

```js
/* Plugin Install */
export function install(self, option) {
  return {
    // ...
    init: {
      before: [() => console.log(`Before Init`)],
      after: [() => console.log(`After Init`)],
    },
    // ...
  };
}
```
