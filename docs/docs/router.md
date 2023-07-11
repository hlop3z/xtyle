!!! Description

    The purpose of the **Router** is to provide developers with a convenient and efficient way to handle client-side navigation and page rendering. One of the main benefits is its ability to enable Single Page Application (SPA) functionality. It allows developers to create dynamic and interactive user experiences by rendering content on the client-side without requiring full page reloads.

## Routes

| Key        | Descriptions                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------- |
| **`path`** | Uniform Resource Locator (**URL**), string that specifies the location of a specific resource |
| **`name`** | Name to reference the **URL** as a form of an **"`ID`"**                                      |
| **`view`** | **`HyperScript`** component to render as a **"`view`"** or **"`page`"**                       |

```js
const Routes = [
  // Home Page
  {
    path: "/",
    name: "home",
    view: () => h("div", {}, "Home View"),
  },
  // About Page
  {
    path: "/{view}",
    name: "custom",
    view: () => h("div", {}, "About View"),
  },
];
```

## Configuration

| Key           | Type     | Descriptions                                                                            |
| ------------- | -------- | --------------------------------------------------------------------------------------- |
| **`history`** | Boolean  | This sets the browser's history **`regular`** (**`true`**) or **`hash`** (**`false`**). |
| **`routes`**  | Array    | List of views / pages / components as **`objects`**.                                    |
| **`before`**  | Function | Runs **before** each route change.                                                      |
| **`after`**   | Function | Runs **after** each route change.                                                       |

```js
const Config = {
  router: {
    history: false,
    routes: Routes,
    before: ({ from, to, next }) => next(),
    after: ({ from, to }) => console.log(from, to),
  },
  // Other Configs . . .
};
```

## Utils

| Key                        | Description                         |
| -------------------------- | ----------------------------------- |
| **`xtyle.router.current`** | **Info** of the current Route.      |
| **`xtyle.router.view`**    | Display current **Route**.          |
| **`xtyle.router.link`**    | Create a link **`<a>`** to a route. |
| **`xtyle.router.go`**      | Method to change routes.            |

```js
function App() {
  /* Menu */
  const menu = {
    home: () => xtyle.router.go({ path: "/" }),
    about: () => xtyle.router.go({ name: "custom", args: { view: "about" } }),
  };
  /* Component */
  return (
    <div class="the-app">
      {/* <!-- Router Menu --> */}
      <button onClick={menu.home}>Home</button>
      <button onClick={menu.about}>About</button>

      {/* <!-- Router View(s) --> */}
      <xtyle.router.view />
    </div>
  );
}
```
