# **x-click-outside**

!!! tip "x-click-outside"

        Utility that actively listens for **clicks outside** the specified element and automatically triggers a **callback function**. With **`x-click-outside`**, you can effortlessly capture clicks occurring outside the element and respond with custom actions or behavior. This feature is particularly valuable for **scenarios** like closing **pop-ups, modals, or dropdowns** when users interact with elements outside of them.

Example:

```js
<div
  x-html
  x-click-outside={({ self }) => console.log("Clicked outside")}
></div>
```
