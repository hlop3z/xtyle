# Hooks

!!! tip "hook-{ method }"

        Hooks empower you to efficiently reuse stateful logic across multiple components. With hooks, you can extract and manage complex functionalities, such as managing component state, performing side effects, and handling lifecycle events, all in a modular and reusable manner. This promotes code organization and reduces code duplication, enabling you to build more maintainable and scalable applications.

| Directive        | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| hook-**created** | Hook called when the component is **created**.              |
| hook-**updated** | Hook called when the component is **updated**.              |
| hook-**removed** | Hook called when the component is **removed** from the DOM. |

Example:

```jsx
<div
  x-html
  hook-created={() => console.log("Component <Created>")}
  hook-updated={() => console.log("Component <Updated>")}
  hook-removed={() => console.log("Component <Removed>")}
>
  {/* <!-- Content goes here... --> */}
</div>
```
