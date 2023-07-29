# **x-scroll**

!!! tip "x-scroll"

    Utility that facilitates handling **scroll events** and executing actions within the current element. With **`x-scroll`**, you can **seamlessly manage scroll interactions** and define custom behaviors when users scroll within the element.

    Enhance interactivity and user experiences by leveraging the power of **`x-scroll`** to create dynamic and engaging content.

Example:

```js
<div
  x-html
  x-scroll={({ value, self }) => {
    /* ... */
    console.log(value);
    self.ref.toggle(["they-see-me-scrolling"]);
  }}
>
  {/* <!-- Content goes here... --> */}
</div>
```
