# **x-fallback** and **x-fallback:is**

!!! tip "x-fallback and x-fallback:is"

        Combination of utilities that provides a seamless way to **display a fallback component in case of rendering issues** with the main component.

        With **`x-fallback`** and **`x-fallback:is`**, you can easily handle scenarios where the main component encounters errors or is still loading, ensuring a smooth user experience. Simply specify the fallback component and conditionally render it when needed. Enhance error handling and loading states with the versatility of **`x-fallback`** and **`x-fallback:is`**.

Example:

```js
<x-slot x-fallback:is={true} x-fallback={<h1>Loading...</h1>}>
  {/* <!-- Content goes here... --> */}
</x-slot>
```
