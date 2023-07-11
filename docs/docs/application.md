!!! info "Description"

    The purpose of the **Application Configuration Layout** is to provide developers with a structured and organized approach to managing the settings and parameters that control the overall appearance and behavior of a software application. This design approach aims to create a cohesive structure that enhances the organization and accessibility of settings, facilitating efficient locating and modification of specific options.

!!! info "Slots (sections)"

    - **`main`** `<Fragment x-slot="main" />`
    - **`header`** `<Fragment x-slot="header" />`
    - **`footer`** `<Fragment x-slot="footer" />`
    - **`left`** `<Fragment x-slot="left" />`
    - **`right`** `<Fragment x-slot="right" />`
    - **`left-mini`** `<Fragment x-slot="left-mini" />`
    - **`right-mini`** `<Fragment x-slot="right-mini" />`

## Configuration Layout

```jsx
const AppLayout = {
  // Sizes
  header: "50px",
  footer: "50px",
  right: "185px",
  left: "185px",
  leftMini: "60px",
  rightMini: "60px",

  // Layers
  headerLayer: 2,
  footerLayer: 2,
  leftLayer: 1,
  rightLayer: 1,
};

const Config = {
  layout: AppLayout,
  directives: {},
  router: {},
};

xtyle.createApp(Config);
```

### Sizing (Width & Height)

| Key             | Descriptions           |
| --------------- | ---------------------- |
| **`header`**    | Header's **height**    |
| **`footer`**    | Footer's **height**    |
| **`right`**     | Right's **width**      |
| **`left`**      | Left's **width**       |
| **`leftMini`**  | Left-Mini's **width**  |
| **`rightMini`** | Right-Mini's **width** |

### Layering (Z-Index)

| Key               | Descriptions       |
| ----------------- | ------------------ |
| **`headerLayer`** | Header's **layer** |
| **`footerLayer`** | Footer's **layer** |
| **`leftLayer`**   | Left's **layer**   |
| **`rightLayer`**  | Right's **layer**  |

## Application

!!! info "Cliping"

    Use **`clip-{side}`** to trim the element to fit, without overlapping with other elements.

### Init

- **`x-init`**

```js
function App() {
  let admin = {};
  return <xtyle.layout x-init={(self) => (admin = self)}></xtyle.layout>;
}
```

### Main

!!! info

    - **`clip-top`**
    - **`clip-bottom`**
    - **`clip-left`**
    - **`clip-right`**

```html
<Fragment x-slot="main" clip-top clip-bottom clip-left clip-right> </Fragment>
```

### Sides

!!! info

    - **`clip-top`**
    - **`clip-bottom`**

    To **`Open`** and **`Close`** use the toggle method.

    -  **`admin.toggle("left | right | left-mini | right-mini")`**

```html
<Fragment
  x-slot="(left | right | left-mini | right-mini)"
  clip-top
  clip-bottom
  class="open"
>
  Side
</Fragment>
```

### Demo

```jsx
function App() {
  let admin = {};
  return (
    <xtyle.layout x-init={(self) => (admin = self)}>
      {/* <!-- Header --> */}
      <Fragment x-slot="header">
        <button onClick={() => admin.toggle("left")}>Toggle Left</button>
        Header
        <button onClick={() => admin.toggle("right-mini")}>Toggle Right</button>
      </Fragment>

      {/* <!-- Main --> */}
      <Fragment x-slot="main" clip-top clip-bottom clip-left clip-right>
        <br />
        <button onClick={() => xtyle.router.go({ path: "/" })}>Home</button>
        <button
          onClick={() =>
            xtyle.router.go({ name: "custom", args: { view: "about" } })
          }
        >
          About
        </button>
        <br />
        <br />
        {/* <!-- Router --> */}
        <xtyle.router.view />
      </Fragment>

      {/* <!-- Drawers --> */}
      <Fragment
        x-slot="left"
        class="open"
        clip-top
        clip-bottom
        x-swipe={(e) => console.log(e)}
      >
        Left
      </Fragment>
      <Fragment x-slot="right" class="open" clip-top clip-bottom>
        Right
      </Fragment>

      {/* <!-- Drawers (mini) --> */}
      <Fragment x-slot="left-mini" class="open" clip-top clip-bottom>
        Left-mini
      </Fragment>
      <Fragment x-slot="right-mini" class="open" clip-top clip-bottom>
        Right-mini
      </Fragment>

      {/* <!-- Footer --> */}
      <Fragment x-slot="footer">Footer</Fragment>
    </xtyle.layout>
  );
}

// Demo
xtyle.inject(`
.lt, .lb, .ll, .lr {
  border: 1px solid black;
}
.ll {
  text-align: right;
}
.lm, .lt {
  text-align: center;
}
button { margin: 0 8px; }
`);

export default App;
```
