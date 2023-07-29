# **x-show**

!!! tip "x-show"

        Utility for **enabling conditional display with CSS class manipulation**.

        With **`x-show`**, you can easily control whether an element should be **shown** or **hidden** based on the truthiness of the provided condition. This feature allows you to **apply CSS classes dynamically** to toggle the element's visibility, resulting in a more interactive and responsive user interface.


Example:

```js
function Component(props) {
  const status = preact.useSignal(false);
  return (
    <div x-html x-show="{status.value}">
      Hide and Seek
    </div>
  );
}
```
