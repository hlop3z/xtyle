# **x-live**

!!! tip "x-live"

        Utility that **dynamically renders a component** based on the provided callback function.

        With **`x-live`**, you can create highly flexible and dynamic components that adapt their content based on the callback's output. This feature allows you to generate custom UI elements or complex structures on the fly, providing a more interactive and adaptive user experience. Unlock the full potential of component rendering with the versatility of **`x-live`**.

Example:

```js
<x-slot x-live={(p) => <h2>{p.title}</h2>} title="My Component" />
```
