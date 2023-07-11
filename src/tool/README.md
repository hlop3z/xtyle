## API

Tool for

---

### Global

| Key                   | Usage     | Description                  |
| --------------------- | --------- | ---------------------------- |
| **`xtyle.createApp`** | Config    | Configure global variables.  |
| **`xtyle.inject`**    | CSS       | Inject **`CSS`** code.       |
| **`xtyle.camel`**     | Transform | Convert string to camelCase. |
| **`xtyle.slugify`**   | Transform | Convert string to slug-ify.  |

---

### Store

| Key             | Usage  | Description   |
| --------------- | ------ | ------------- |
| **`useState`**  | Local  | Single Value. |
| **`useObject`** | Local  | Object Value. |
| **`signal`**    | Global | Single Value. |
| **`state`**     | Global | Object Value. |

---

### Router

| Key                     | Usage  | Description                     |
| ----------------------- | ------ | ------------------------------- |
| **`xtyle.router.view`** | Router | Display current **Route**.      |
| **`xtyle.router.link`** | Router | Create a link `<a>` to a route. |
| **`xtyle.router.go`**   | Router | Method to change routes.        |

---

### Tab

| Key                     | Usage | Description                           |
| ----------------------- | ----- | ------------------------------------- |
| **`xtyle.tabs.view`**   | Tabs  | Display current **Tab(s)**.           |
| **`xtyle.tabs.toggle`** | Tabs  | Method to change routes (**Multi**).  |
| **`xtyle.tabs.active`** | Tabs  | Method to change routes (**Single**). |

---

### Component

| Key                 | Usage      | Description                                                 |
| ------------------- | ---------- | ----------------------------------------------------------- |
| **`xtyle.element`** | Components | Create custom **Component(s)**.                             |
| **`xtyle.slots`**   | Components | Design the location of a **`component`** using **`slots`**. |
| **`xtyle.props`**   | Components | Transform **`props`** to **camelCase**.                     |
| **`xtyle.class`**   | Components | Transform { `Object`, `Array`, `String` } to CSS **Class**. |
| **`xtyle.style`**   | Components | Transform { `Object`, `Array`, `String` } to CSS **Style**. |

---

## Component (Directives)

| Key                   | Type      | Description                                                             |
| --------------------- | --------- | ----------------------------------------------------------------------- |
| **`x-slot`**          | Util      | Used to define the location of a **`component`** using **`slots`**.     |
| **`x-tag`**           | Util      | Used to define the **HTML** real **`element`** for the **`component`**. |
| **`x-init`**          | Util      | Used to manage the component from the parent.                           |
| **`x-click`**         | Directive | Wrapper of (`preact`)'s **onClick**                                     |
| **`x-click-outside`** | Directive | Detect `click-outside` current element.                                 |
| **`x-hover`**         | Directive | Detect `hover` current element.                                         |
| **`x-resize`**        | Directive | Detect `resize` window global element.                                  |
| **`x-ripple`**        | Directive | Detect `click` current element.                                         |
| **`x-scroll`**        | Directive | Detect `scroll` current element.                                        |
| **`x-swipe`**         | Directive | Detect `swipe` current element.                                         |

---

## Util (Components)

| Key                     | Usage      | Description                     |
| ----------------------- | ---------- | ------------------------------- |
| **`xtyle.element`**     | Components | Create custom **Component(s)**. |
| **`xtyle.router.view`** | Router     | Display current **Route**.      |
| **`xtyle.router.link`** | Router     | Create a link `<a>` to a route. |
| **`xtyle.tabs.view`**   | Tabs       | Display current **Tab(s)**.     |

```jsx
xtyle.createApp();

export default function View() {
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
