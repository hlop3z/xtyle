!!! info "Description"

    The **`xtyle.element`** serves the purpose of offering developers a convenient and centralized approach to creating components. It provides a versatile solution that can serve various purposes, with a primary focus on **reusable directives**.

    One of the **key advantages of directives** is their ability to simplify component development. By registering a global directive, developers can avoid the need to **`export/import`** tools for each component individually from multiple sources. Instead, they can leverage the global directive whenever it is deemed appropriate. This approach streamlines the development process and facilitates easier **addition** or **removal** of the directive from components as the project evolves.

    In summary, **`xtyle.element`** empowers developers by providing a centralized and efficient method for component creation. Through the utilization of reusable directives, developers can enhance productivity, maintain consistency, and seamlessly manage component-related functionalities throughout their projects.

!!! tip "Directives"

    **Directives** make everything easier.

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
