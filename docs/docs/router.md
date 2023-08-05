!!! tip "xtyle.Router"

    The **xtyle.Router** (initializer) is designed to **keep track of parameter changes without rendering a view immediately**, This enables you to **define views later** in the project, promoting decoupling from the router and providing greater flexibility in managing routes.

!!! tip "xtyle.router"

    The **xtyle.router** (virtual router) is your router's manager.

## **Dynamic** Path Patterns

- **`/{variable}`** : Encapsulating a word with **"`{}`"** brackets makes it a **required** path parameter.

- **`/{?variable}`** : The **"`?`"** at the **start** indicates that the parameter is **optional**.

- **`/{variable*}`** : The **"`*`"** at the **end** denotes a wildcard parameter, which matches the **remaining part of the path**.


## Config (Example)


!!! note "Path Patterns (Examples)"

    - **`/a/some-{key}`** : This one is **required**!

    - **`/a/b-{?key}`** : The **"`?`"** indicates that the parameter **`key`** is **optional**.

    - **`/a/b/{path*}`** : The **"`*`"** denotes a wildcard parameter named **`path`**, which matches the **remaining part of the path**.

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
  callback: () => {
    console.log("Changed");
  },
});
```

## Options

| Key            | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| **`history`**  | Indicating whether to use the history API for routing.                      |
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
