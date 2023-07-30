# Xtyle Library (Preact)

## Core

### Built-in Components

| Directive | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| x-slot    | Create (one or multiple) elements without adding an additional DOM node. |

### Core Directive

| Directive | Description                             |
| --------- | --------------------------------------- |
| x-html    | Converts regular **HTML** to **XTYLE**. |

### x-html

Converts a regular HTML element into an **Xtyle `<Component />`**.

Example:

```jsx
<div x-html>Regular div becomes an xtyle component</div>
```

### x-slot

Converts a regular HTML element into an **Xtyle `<Fragment />`**.

Example:

```jsx
<x-slot>{/* <!-- Content goes here... --> */}</x-slot>
```

---

### Custom Directives

| Directive       | Description                                               |
| --------------- | --------------------------------------------------------- |
| x-ref           | Handle resize events.                                     |
| x-value         | IF the element is (input) updates the (`signal`)'s value. |
| x-hover         | Handle hover events.                                      |
| x-scroll        | Handle scroll events.                                     |
| x-swipe         | Handle swipe events.                                      |
| x-ripple        | Adds a ripple effect to elements.                         |
| x-resize        | Handle resize events.                                     |
| x-click-outside | Handle click outside an element.                          |

---

### Control Flow

| Directive     | Description                                                                       |
| ------------- | --------------------------------------------------------------------------------- |
| x-for         | For creating a loop of elements.                                                  |
| x-in          | Array used with **`x-for`** to define the loop iteration.                         |
| x-if          | For conditional rendering.                                                        |
| x-show        | For conditional display with CSS class manipulation.                              |
| x-live        | For dynamic components.                                                           |
| x-portal      | For rendering a component in a specific DOM element.                              |
| x-fragment    | Used with **`x-portal`** to define if to replace or append.                       |
| x-fallback    | For providing a fallback content when the condition is false.                     |
| x-fallback:is | Specifies whether the x-fallback content should be shown.                         |
| x-switch      | For handling switch-case logic.                                                   |
| x-case        | Specifies the case value for **`x-switch`** directive.                            |
| case          | Specifies the case value for **`x-switch`** nested inside **`x-slot`** directive. |

---

### x-portal

Used for portal rendering, allowing elements to be rendered outside the component's DOM.

Example (**Component**):

```jsx
<x-slot x-portal="#modal">{/* <!-- Content goes here... --> */}</x-slot>
```

Example (**Fragment**):

```jsx
<x-slot x-portal="#modal" x-fragment>
  {/* <!-- Content goes here... --> */}
</x-slot>
```

### x-swipe

Detects swipe gestures and emits the direction.

Example:

```jsx
<div x-html x-swipe={(e) => console.log(e)}>
  Swipe me
</div>
```

### x-click-outside

Listens for clicks outside the element and triggers a callback.

Example:

```jsx
<div x-html x-click-outside={() => console.log("Clicked outside")}></div>
```

### x-fallback

Used to show a fallback component if something goes wrong with the main component rendering.

Example:

```jsx
<x-slot x-fallback={<h1>Loading...</h1>} x-fallback:is={true}>
  {/* <!-- Content goes here... --> */}
</x-slot>
```

### x-for and x-in

Used for looping through an array and rendering elements for each item.

Example:

```jsx
<x-slot x-for={(item) => <li>{item}</li>} x-in={["one", "two", "three"]}>
  {/* <!-- Content goes here... --> */}
</x-slot>
```

### x-switch and x-case

Used for conditionally rendering content based on a switch case.

Example:

```jsx
function View() {
  const text = preact.useSignal("one");
  return (
    <x-slot x-switch x-case={text.value}>
      <x-slot
        x-for={(item) => <x-slot case={item}>Page {item}</x-slot>}
        x-in={["one", "two", "three"]}
      >
        {/* <!-- Content goes here... --> */}
      </x-slot>
    </x-slot>
  );
}
```

### x-scroll

Used for handling scroll events and performing actions.

Example:

```jsx
<div
  x-html
  x-scroll={({ offset, self }) => {
    /* ... */
    self.ref.toggle(["they-see-me-scrolling"]);
  }}
>
  {/* <!-- Content goes here... --> */}
</div>
```

### x-live

Used for rendering a dynamic component based on the provided callback.

Example:

```jsx
<x-slot x-live={(p) => <h2>{p.title}</h2>} title="My Component" />
```

## Creating Components:

A custom component that displays a title and its children.

Props:

- title: The title for the component.

Example:

```jsx
Base.element("demo")((props) => (
  <x-slot>
    <h2>{props.title}</h2>
    {props.children}
  </x-slot>
));
```

```jsx
<x-demo title="Hello World">
  <h4>Content goes here...</h4>
</x-demo>
```

## Util Directives:

---

### Hooks

| Directive    | Description                                             |
| ------------ | ------------------------------------------------------- |
| hook:created | Hook called when the component is created.              |
| hook:updated | Hook called when the component is updated.              |
| hook:removed | Hook called when the component is removed from the DOM. |

---

### CSS

| Directive | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| css:is    | Specifies the CSS class to apply when the condition is **`true`**.  |
| css:on    | Specifies the CSS classes to add when the condition is **`true`**.  |
| css:off   | Specifies the CSS classes to add when the condition is **`false`**. |

---

### React Core

| Directive | Description                                             |
| --------- | ------------------------------------------------------- |
| attrs     | React core attribute for custom attributes on elements. |
| class     | React core attribute for defining CSS classes.          |
| style     | React core attribute for inline styles.                 |
| children  | React core attribute for rendering child components.    |

---

### React (`onClick`, `onDblClick`, etc...) matching.

- `on:` with `kebab-case`

| Directive              | Description                                    |
| ---------------------- | ---------------------------------------------- |
| on:click               | Event listener for click events.               |
| on:dbl-click           | Event listener for double-click events.        |
| on:context-menu        | Event listener for context menu events.        |
| on:mouse-down          | Event listener for mouse down events.          |
| on:mouse-up            | Event listener for mouse up events.            |
| on:mouse-enter         | Event listener for mouse enter events.         |
| on:mouse-leave         | Event listener for mouse leave events.         |
| on:mouse-move          | Event listener for mouse move events.          |
| on:key-down            | Event listener for key down events.            |
| on:key-up              | Event listener for key up events.              |
| on:key-press           | Event listener for key press events.           |
| on:focus               | Event listener for focus events.               |
| on:blur                | Event listener for blur events.                |
| on:change              | Event listener for change events.              |
| on:input               | Event listener for input events.               |
| on:submit              | Event listener for submit events.              |
| on:touch-start         | Event listener for touch start events.         |
| on:touch-move          | Event listener for touch move events.          |
| on:touch-end           | Event listener for touch end events.           |
| on:touch-cancel        | Event listener for touch cancel events.        |
| on:wheel               | Event listener for wheel events.               |
| on:scroll              | Event listener for scroll events.              |
| on:copy                | Event listener for copy events.                |
| on:cut                 | Event listener for cut events.                 |
| on:paste               | Event listener for paste events.               |
| on:composition-start   | Event listener for composition start events.   |
| on:composition-update  | Event listener for composition update events.  |
| on:composition-end     | Event listener for composition end events.     |
| on:load                | Event listener for load events.                |
| on:error               | Event listener for error events.               |
| on:animation-start     | Event listener for animation start events.     |
| on:animation-end       | Event listener for animation end events.       |
| on:animation-iteration | Event listener for animation iteration events. |
| on:transition-end      | Event listener for transition end events.      |
