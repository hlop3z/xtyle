# **x-if**

!!! tip "x-if"

        Utility for **enabling conditional rendering** of elements based on specified conditions. With **x-if**, you can effortlessly control whether an element should be **rendered or hidden**, depending on the truthiness of the provided condition. This feature allows you to create dynamic and responsive user interfaces by **conditionally** showing or hiding elements as needed. Simplify your component logic and enhance user experiences with the flexibility of **x-if**.

Example:

```js
function Component(props) {
  const status = preact.useSignal(false);
  return (
    <div x-html x-if="{status.value}">
      Hide and Seek
    </div>
  );
}
```
