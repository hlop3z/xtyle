# **x-switch** and **x-case** then **case**

!!! tip "x-switch | x-case | case"

        A **powerful trio of utilities** that allow you to **conditionally render** content based on a **switch case**.

        With **`x-switch`**, **`x-case`**, and **`case`**, you can easily handle different scenarios and render specific content for each case. This feature is particularly useful for **creating dynamic views and managing conditional rendering** in a more organized and concise manner. Simplify your component logic and enhance code readability with the versatility of **`x-switch`**, **`x-case`**, and **`case`**.

Example:

```js
function View() {
  const page = preact.useSignal("one");

  return (
    {/* x-switch and x-case control structure */}
    <x-slot x-switch x-case={page.value}>
      {/* render case */}
      <x-slot case="one">Page One</x-slot>
      <x-slot case="two">Page Two</x-slot>
      <x-slot case="three">Page Three</x-slot>
   </x-slot>
  );
}
```
