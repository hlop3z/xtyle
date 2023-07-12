!!! info "Description"

    The purpose of the **Router** is to offer developers a convenient and efficient solution for managing client-side navigation and enhancing page rendering. One of its key advantages lies in enabling the functionality of Single Page Applications (SPAs). By rendering content on the client-side, SPAs provide dynamic and interactive user experiences without the need for full page reloads.

    The Router empowers developers to create seamless transitions between different views and components within their web applications. It allows for efficient content updates, resulting in a smoother and more responsive user interface. By handling navigation on the client-side, the Router optimizes the user experience by minimizing page load times and providing a more fluid interaction.

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

## Paths

!!! tip

    **Variables** embedded within **URLs** for dynamic data retrieval and routing.

    Variables must be inside brackets **`{}`**. For example  `/my/path/key-{value}`

| Key                    | Required | Descriptions                                              |
| ---------------------- | -------- | --------------------------------------------------------- |
| **`{variable_name}`**  | Yes      | Regular variables                                         |
| **`{?variable_name}`** | Optional | IF it starts with **`?`** its an optional variable        |
| **`{variable_name*}`** | Optional | IF it ends with **`*`** matches the remainder of the path |

```js
const patternDictionary = {
  // Regular
  "/": "view-1",
  // Optional
  "/a/b/{?key}": "view-2",
  // Path
  "/a/b/key-{name}/{path*}": "view-3",
};
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
