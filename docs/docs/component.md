!!! Description

    The purpose of the **`xtyle.element`** is to provide developers with a convenient and **centralized** way to create **Component(s)**. This  can serve different purposes.

    Mainly: **Reusable Directives**.

    The reason directives are useful is because instead of having to **`export/import`** tools to each component you create and from different sources you can register a global directive and use it when you ever you find it fit. Then, later in the project you can **add** or **remove** from the component in a simpler way.

- **`xtyle.element`** Use it to create a custom element.
- **`xtyle.slots`** Use it to collect **`slots`** from the **`props.children`** via **`x-slot`** **name**.
- **`xtyle.props`** Use it to collect **`props`** and make them **camelCase**.

```jsx
function Component(args) {
  // Collect
  const slots = xtyle.slots(args);
  const props = xtyle.props(args);

  // View
  return <xtyle.element x-tag="div">Hello World</xtyle.element>;
}
```

---

## **Slot** Reference(s)

| Key          | Type | Description                                                         |
| ------------ | ---- | ------------------------------------------------------------------- |
| **`x-slot`** | Util | Used to define the location of a **`component`** using **`slots`**. |

---

## **Built-in** Directives

| Key                   | Type      | Description                                                             |
| --------------------- | --------- | ----------------------------------------------------------------------- |
| **`x-tag`**           | Util      | Used to define the **HTML** real **`element`** for the **`component`**. |
| **`x-init`**          | Util      | Used to manage the component from the parent.                           |
| **`x-click`**         | Directive | Wrapper of preact's **`onClick`**                                       |
| **`x-click-outside`** | Directive | Detect `click-outside` current element.                                 |
| **`x-hover`**         | Directive | Detect `hover` current element.                                         |
| **`x-resize`**        | Directive | Detect `resize` window global element.                                  |
| **`x-ripple`**        | Directive | Detect `click` current element.                                         |
| **`x-scroll`**        | Directive | Detect `scroll` current element.                                        |
| **`x-swipe`**         | Directive | Detect `swipe` current element.                                         |

```jsx
function Component() {
  // View
  return (
    <xtyle.element
      x-tag="div"
      x-init={(self) => console.log(self)}
      x-click={(e) => console.log(e)}
      x-click-outside={(e) => console.log(e)}
      x-hover={(e) => console.log(e)}
      x-resize={(e) => console.log(e)}
      x-ripple={(e) => console.log(e)}
      x-swipe={(e) => console.log(e)}
      x-scroll={(info) => console.log(info)}
    >
      Hello World
    </xtyle.element>
  );
}
```

---

## Component (**Utils**)

| Key                 | Usage      | Description                                                 |
| ------------------- | ---------- | ----------------------------------------------------------- |
| **`xtyle.element`** | Components | Create custom **Component(s)**.                             |
| **`xtyle.slots`**   | Components | Design the location of a **`component`** using **`slots`**. |
| **`xtyle.props`**   | Components | Transform **`props`** to **camelCase**.                     |
| **`xtyle.class`**   | Components | Transform { `Object`, `Array`, `String` } to CSS **Class**. |
| **`xtyle.style`**   | Components | Transform { `Object`, `Array`, `String` } to CSS **Style**. |
