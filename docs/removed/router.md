!!! tip "Router"

    The **`xtyle.Router`** and **`xtyle.router`** provide powerful routing capabilities for your application. The **`xtyle.Router`** is designed as an initializer to keep track of parameter changes without immediately rendering a view, promoting flexibility in managing routes. On the other hand, the **`xtyle.router`** acts as your router's manager.

## **Dynamic** Path Patterns

When defining routes, you can use dynamic path patterns to handle different scenarios:

- **`/{variable}`**: Encapsulating a word with `{}` brackets makes it a required path parameter.
- **`/{?variable}`**: The `?` at the start indicates that the parameter is optional.
- **`/{variable*}`**: The `*` at the end denotes a wildcard parameter, which matches the remaining part of the path.

## Configuration (Example)

Here's an example of how to initialize the router and configure it with options and route patterns:

!!! note "Path Patterns (Examples)"

    - **`/a/some-{key}`** : This one is **required**!

    - **`/a/b-{?key}`** : The **"`?`"** indicates that the parameter **`key`** is **optional**.

    - **`/a/b/{path*}`** : The **"`*`"** denotes a wildcard parameter named **`path`**, which matches the **remaining part of the path**.

!!! tip "xtyle.Router"

```js
/**
 * Define the list of route patterns
 */
const patternList = ["/", "/a/b/{?key}", "/a/b/key-{name}/{path*}"];

/**
 * Initialize the router with options
 */
xtyle.Router({
  history: false,
  baseURL: "/",
  routes: patternList,
  callback: (router) => {
    console.log("Changed");
    console.log(router);
  },
});
```

## Options

| Key            | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| **`history`**  | A boolean flag indicating whether to use the history API for routing.       |
| **`baseURL`**  | The base **URL** for the router.                                            |
| **`routes`**   | The **list** of route patterns to use for routing.                          |
| **`callback`** | A **callback `function`** that will be executed when the **route changes**. |

!!! info "history"

    The **`history`** option is a **boolean flag** that determines the **routing behavior**.

    - If set to **`false`**, paths will use the **"#" prefix**, indicating the use of the **hash-based routing** strategy.
    - If set to **`true`**, the router will use the **regular history API** for navigation, allowing for cleaner URLs without the "#" symbol.

## Properties

| Key         | Description                    |
| ----------- | ------------------------------ |
| **current** | Get the current router's info. |

## Methods

| Key          | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| **go**       | **Navigate** to a specific path and optionally add a **URL** query via an object. |
| **effect**   | Preact effect wrapper for easy access to **router effects**.                      |
| **computed** | Preact computed wrapper for easy **creation of computed values**.                 |

## Special ${**Keys**}

| Key         | Description                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| **$action** | Converts to **URL** query parameter **`__a`** to define a backend **action** for the route.               |
| **$query**  | Converts to **URL** query parameter **`__q`** to pass **query parameters** as a JSON string to the route. |

## Navigate (Demo)

!!! tip "xtyle.router"

```js
/**
 * Navigate to a new path with query parameters
 */
xtyle.router.go(
  "/home", // Path
  // Query
  {
    key: "val",
    $action: "app.model.filter",
    $query: { key: "val" },
  }
);
```

## Computed & Effect (Demo)

!!! tip "xtyle.router"

```js
/**
 * Create a computed value based on the current route
 */
const currentSearch = xtyle.router.computed(() => {
  return xtyle.router.current.search;
});

/**
 * Add an effect to be triggered when the route changes
 */
xtyle.router.effect(() => {
  // Log an example value from the `router.current.search` object
  console.log(currentSearch.value);
});

/**
 * Set an interval to navigate after a certain time
 */
setInterval(() => {
  xtyle.router.go("/about", {
    key: new Date().toISOString(),
  });
}, 1000);
```

With the Xtyle Router module, you can easily manage your application's routing, handle dynamic path patterns, and perform actions when the route changes, providing a smooth user experience and better control over your application's navigation.
