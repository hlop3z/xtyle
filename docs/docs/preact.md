# **Preact** (Browser)

!!! tip

    A preact wrapper for standalone usage in the browser.

## Usage

```js
const { signal } = preact;
```

## Properties

| Key                   | Description                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| **`h`**               | Preact core **`h`**, used for creating virtual DOM elements.                                              |
| **`render`**          | Preact core **`render`**, used for rendering virtual DOM elements to the real DOM.                        |
| **`useState`**        | Preact **`hook`** for managing state in functional components.                                            |
| **`useEffect`**       | Preact **`hook`** for handling side effects in functional components.                                     |
| **`useRef`**          | Preact **`hook`** for creating mutable references in functional components.                               |
| **`useCallback`**     | Preact **`hook`** for memoizing functions in functional components.                                       |
| **`signal`**          | Preact **`signals`** for managing state in functional components.                                         |
| **`computed`**        | Preact **`signals`** used for creating computed values.                                                   |
| **`effect`**          | Preact **`signals`** used for creating effects that react to signal changes.                              |
| **`batch`**           | Preact **`signals`** used for batching multiple signal updates into a single re-render.                   |
| **`useSignalEffect`** | Preact **`signals`** signals for handling side effects in functional components that depend on signals.   |
| **`useSignal`**       | Preact **`signals`** signals for subscribing to a signal and re-rendering the component on signal change. |
| **`useComputed`**     | Preact **`signals`** signals for creating and using computed values in functional components.             |

<style>
/* Apply custom CSS to make the first table header wider */
table th:nth-child(1) {
  width: 200px;
}
</style>
