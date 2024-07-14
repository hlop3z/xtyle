# **x-portal**

!!! tip "x-portal"

    Utility that enables portal rendering, **allowing elements to be rendered outside the component's DOM**.

    With **`x-portal`**, you can **seamlessly render content into a specified target container**, even if it exists outside the current component's hierarchy. This feature is particularly **useful for implementing modals, overlays, or other UI elements that need to be rendered at a different location in the DOM**. Simplify your component architecture and enhance flexibility with the convenience of **`x-portal`**

    By using **`x-fragment`** in combination with **`x-portal`**, you can create a **Document Fragment**, a lightweight container that **allows you to group multiple elements together** without adding additional nodes to the DOM. This can be helpful when you need to render multiple elements as a single unit.

Example (**Component**):

!!! warning "Re-renders"

    This **re-renders**! Replacing anything in the selected container.

```js
<x-slot x-portal="#modal">
  {/*
  <!-- Content goes here... -->
  */}
</x-slot>
```

Example (**Fragment**):

!!! warning "Appends"

    This **appends** to the selected container.

```js
<x-slot x-portal="#modal" x-fragment>
  {/*
  <!-- Content goes here... -->
  */}
</x-slot>
```

## Using `slot` instead.

```js
<x-slot x-portal="#modal" slot={<h1>Hello World<h1>}></x-slot>
```
