# HTML/Preact "**ON**" Events

!!! tip "on:kebab-case"

    A convenient wrapper for the original events used in Preact, designed to simplify event listener binding. With **`on:`** followed by **`kebab-case`**, common event handlers such as **`onClick`** are effortlessly transformed, **enabling more intuitive and concise event handling**. This cleaner syntax provides a seamless way to attach event listeners to elements in your Preact application, **enhancing code readability and maintainability**.

Example:

```js
<button on:click={() => console.log("clicked")} x-html>
  Click Me
</button>
```

!!! info "Description"

    **Event Listener For...**

| Directive                  | Description                 |
| -------------------------- | --------------------------- |
| on:**click**               | Click events.               |
| on:**dbl-click**           | Double-click events.        |
| on:**context-menu**        | Context menu events.        |
| on:**mouse-down**          | Mouse down events.          |
| on:**mouse-up**            | Mouse up events.            |
| on:**mouse-enter**         | Mouse enter events.         |
| on:**mouse-leave**         | Mouse leave events.         |
| on:**mouse-move**          | Mouse move events.          |
| on:**key-down**            | Key down events.            |
| on:**key-up**              | Key up events.              |
| on:**key-press**           | Key press events.           |
| on:**focus**               | Focus events.               |
| on:**blur**                | Blur events.                |
| on:**change**              | Change events.              |
| on:**input**               | Input events.               |
| on:**submit**              | Submit events.              |
| on:**touch-start**         | Touch start events.         |
| on:**touch-move**          | Touch move events.          |
| on:**touch-end**           | Touch end events.           |
| on:**touch-cancel**        | Touch cancel events.        |
| on:**wheel**               | Wheel events.               |
| on:**scroll**              | Scroll events.              |
| on:**copy**                | Copy events.                |
| on:**cut**                 | Cut events.                 |
| on:**paste**               | Paste events.               |
| on:**composition-start**   | Composition start events.   |
| on:**composition-update**  | Composition update events.  |
| on:**composition-end**     | Composition end events.     |
| on:**load**                | Load events.                |
| on:**error**               | Error events.               |
| on:**animation-start**     | Animation start events.     |
| on:**animation-end**       | Animation end events.       |
| on:**animation-iteration** | Animation iteration events. |
| on:**transition-end**      | Transition end events.      |
