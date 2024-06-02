# Router

The **`router`** section is dedicated to configuring routing behaviors within your application. This encompasses defining rules for redirection when a user attempts to access a view they are not authorized to see, as well as loading data before presenting the page to the user.

```js
/* Plugin Install */
export function install(self, option) {
  return {
    // ...
    router: {
      before({ commit, redirect, prev, next }) {
        // Commits Change
        commit();

        // OR

        // Redirect
        redirect("/login");
      },
      after({ prev, next }) {
        // (Info) Prev & Next
        console.log(prev);
        console.log(next);
      },
    },
    // ...
  };
}
```

## **Dynamic** Path Patterns

When defining routes, you can use dynamic path patterns to handle different scenarios:

- **`/{variable}`**: Encapsulating a word with `{}` brackets makes it a required path parameter.
- **`/{?variable}`**: The `?` at the start indicates that the parameter is optional.
- **`/{variable*}`**: The `*` at the end denotes a wildcard parameter, which matches the remaining part of the path.

## Configuration (**Example**)

Here's an example of how to initialize the router and configure it with options and route patterns:

!!! note "Path Patterns (Examples)"

    - **`/a/some-{key}`** : This one is **required**!

    - **`/a/b-{?key}`** : The **"`?`"** indicates that the parameter **`key`** is **optional**.

    - **`/a/b/{path*}`** : The **"`*`"** denotes a wildcard parameter named **`path`**, which matches the **remaining part of the path**.

## Register a View

```js
const View = ({ route, search, arg }) => {
  return h("h1", null, "My View");
};

xtyle.view("/some-page-name", View);
```

## Display Views

```html
<xtyle.router.views />
```

## Change Routes (aka: Views)

```js
// No Parameters
xtyle.router.go("/some-page");

// With Parameters
xtyle.router.go("/some-page", { search: "something" });
```

## Utils `xtyle.router`

The `xtyle.router` utility provides various methods to manage routing within your application, ensuring smooth navigation and view handling.

| Key       | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `go`      | Navigates to a specified route or view.                     |
| `views`   | Returns a component of the current view in the application. |
| `current` | Retrieves information about the current view or route.      |

## Utils `xtyle.router.current`

The `xtyle.router.current` utility offers detailed information about the currently active route, providing insights into the current view and its parameters.

| Key      | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| `view`   | The current view as a function.                                      |
| `arg`    | URL parameters of the current path. For example `/{argOne}/{argTwo}` |
| `path`   | The full path of the current route.                                  |
| `search` | URL search parameters of the route. For example `/?arg=1&param=2`    |
| `route`  | The name or identifier of the current view.                          |
