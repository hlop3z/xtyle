# **x-ref**

!!! tip "x-ref"

    A utility function designed for efficiently handling the **`useRef()`** value of the **current `<element-component>`**.

    With **`x-ref`**, you can easily access and interact with the current value of the referenced element component. This allows you to perform actions on the referenced element without triggering re-renders.

    Simplify your element management and optimize performance with **`x-ref`**.

| Key                | Description                                   |
| ------------------ | --------------------------------------------- |
| **`ref.add`**      | **Add** class(es) to the DOM element          |
| **`ref.remove`**   | **Remove** class(es) to the DOM element       |
| **`ref.toggle`**   | **Toggle** class(es) to the DOM element       |
| **`ref.contains`** | **Check** if DOM element **Contains** a class |
| **`ref.get`**      | **Run `querySelector`** on DOM element        |
| **`ref.find`**     | **Run `querySelectorAll`** on DOM element     |

Example:

```js
function Component(props) {
  let ref = null;
  return (
    <div x-ref={(self) => (ref = self)} x-html>
      Content goes here...
    </div>
  );
}
```

Usage:

```js
// Current
ref.current;

// Utils
ref.add("class-after-init");
ref.remove("class-after-init");
ref.toggle(["toggled-classes"], true);
ref.contains("toggled-classes");

// Children Utils
ref.get(".one-child");
ref.find(".all-children");
```
