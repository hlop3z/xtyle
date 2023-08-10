# **Xtyle** Library for **(Preact)**

!!! info "Xtyle"

    Welcome to **Xtyle**! Your Ultimate Directive Extension! :rocket:  Enabling you to effortlessly extend your functions as **global directives**. Say goodbye to exporting and importing components constantly. Any **`method`** or **`component`** you register globally will be readily available throughout your whole Application.

<p
  align="center"
  style="font-size: 2.5em; letter-spacing: -2px; font-family: Georgia, sans-serif;"
>
  <a
    href="https://github.com/hlop3z/xtyle/raw/main/getting-started/xtyle-ts-lib.zip"
    target="_blank"
  >
    Download (TypeScript) Template
  </a>
</p>

!!! tip "no-installation"

    ```js
    <script src="https://unpkg.com/xtyle@latest" type="text/javascript"></script>
    ```

## Description

!!! info "Purpose and Goals"

    The purpose of the **`xtyle`** tool is to revolutionize the way you **develop for the browser**. Our aim is to **simplify** the development process while **maintaining compatibility with TypeScript** and modern tools like **VS Code**. Xtyle empowers **API developers** by providing them with a simpler way to connect various plugins built with **TypeScript/Javascript** with their corresponding **APIs**.

### Key Features

- **Global Directives**: Easily extend the behavior of your elements by declaring custom directives.
- **Simplified Components**: Define custom elements without the hassle of constant exporting and importing.
- **Global Variables**: Specify global variables that are accessible within your application's scope.
- **Reactive State Management**: Define global state variables that can be used reactively within your application.

!!! tip "Plugins"

    With **`xtyle.use`**, you can easily **. . .**

    1. Define Routes: Configure your route patterns using the `routes` prop to create a structured navigation flow.
    2. Declare Directives: Extend the behavior of your elements by declaring custom directives using the `directives` prop.
    3. Create Custom Elements: Define the custom elements you want to create with your plugin using the `elements` prop.
    4. Set Global Variables: Specify global variables within your plugin's scope using the `globals` prop.
    5. Reactive State Management: Define global state variables using the `store` prop to enable reactive updates.

---

## Core **API**

| Key                   | Description                                         |
| --------------------- | --------------------------------------------------- |
| **`xtyle.init`**      | <a href="#init-run-application">Run Application</a> |
| **`xtyle.use`**       | <a href="#creating-plugins">Plugin(s)</a>           |
| **`xtyle.element`**   | <a href="#creating-components">Component(s)</a>     |
| **`xtyle.directive`** | <a href="#creating-directives">Directive(s)</a>     |
| **`xtyle.router`**    | <a href="./router">Router</a>                       |
| **`xtyle.model`**     | <a href="./util/models">Model(s)</a>                |
| **`xtyle.base`**      | **Only** useful with **`TypeScript`**               |

---

## `x-html` **(Directive)**

!!! info "x-html"

    Converts a regular HTML element into an **Xtyle `<Component />`**.

Example:

```js
<div x-html>Regular div becomes a (Xtyle) Component</div>
```

---

## `x-slot` **(Component)**

!!! info "x-slot"

    Converts a regular HTML element into an **Xtyle `<Fragment />`**.

Example:

```js
<x-slot>
  {/*
  <!-- Content goes here... -->
  */}
</x-slot>
```

---

## Creating **Directives**

!!! info "custom &lt;div x-custom&gt;"

    Registered directives will be enforced to be **lower-case**. Any directive you register under any given name will be prefixed with “**`x-`**”

- **`props`** Arguments for the final **Component**.
- **`self`** Arguments that construct the **Component**.

| Key                          | Description                                     |
| ---------------------------- | ----------------------------------------------- |
| **`self.directives.custom`** | Object where you can find your custom directive |
| **`self.ref.add`**           | **Add** class(es) to the DOM element            |
| **`self.ref.remove`**        | **Remove** class(es) to the DOM element         |
| **`self.ref.toggle`**        | **Toggle** class(es) to the DOM element         |
| **`self.ref.contains`**      | Check if DOM element **Contains** a class       |

Example:

```js
// "x-demo"
xtyle.directive("demo")((self, props) => {
  preact.useEffect(() => {
    // Self
    self.ref.add("class-after-init");
    self.ref.remove("class-after-init");
    self.ref.toggle(["toggled-class"], true);
    self.ref.contains("toggled-class");
  }, []);
  // Demo
  console.log("Custom Directive");
  console.log(self.directives.custom["demo"]);
  console.log(props);
});
```

Usage:

“**`x-`**” Prefix

```js
<div x-demo="Hello World" x-html></div>
```

!!! tip "Directives"

    **Directives** are a powerful tool that allows developers to reuse and encapsulate logic in their code. By leveraging custom directives, developers can effectively separate and encapsulate complex logic and low-level DOM operations, resulting in more modular and maintainable code. These directives enable the reuse of specific functionalities across multiple elements or components, promoting code consistency and reducing duplication.

    Custom directives provide a flexible and reusable approach to address unique requirements in web development. They can be used for a variety of purposes, such as applying specialized behaviors, manipulating the DOM, or implementing custom event handling. With custom directives, developers have the ability to create highly adaptable and reusable solutions that cater to specific needs.

---

## Creating **Components**

!!! info "custom &lt;x-component&gt;"

    Registered components will be enforced to be **lower-case** and **kebab-case**. Any component you register under any given name will be prefixed with “**`x-`**”

Example:

A custom component that displays a title and its children.

```js
xtyle.element("demo")((props) => (
  <x-slot>
    <h2>{props.title}</h2>
    {props.children}
  </x-slot>
));
```

Usage:

- **`title`**: The title for the component.

```js
<x-demo title="Hello World">
  <h4>Content goes here...</h4>
</x-demo>
```

---

## Creating **Plugins**

!!! info "xtyle.use"

    **Simplifying Plugin Registration**:

    The **`xtyle.use`** function is a powerful utility that simplifies the process of registering various **`elements`, `directives`, `globals`, and `store`** in a single place for your plugin. This documentation will guide you through the steps to create and register your plugins effectively.

### Props:

- **`routes`**: Define your route(s) pattern(s).
- **`directives`**: Declare custom directives to extend the behavior of your elements.
- **`elements`**: Define the custom elements you want to create with your plugin.
- **`globals`**: Specify global variables accessible within your plugin's scope.
- **`store`**: Define global state variables that can be used reactively within your plugin.

### Example:

Below is an example of how to create and register a custom plugin using **`xtyle.use`**:

```js
const myPlugin = {
  /** @Routes */
  routes: ["/my-app/", "/my-app/{path*}"],

  /** @Directives */
  directives: {
    html(self, props) {
      // Logic to handle the 'html' directive
      // ...
    },
  },

  /** @Elements */
  elements: {
    button(props) {
      return <button>Click Me | {props.children}</button>;
    },
  },

  /** @Globals */
  globals: {
    title: "Xtyle Project",
  },

  /** @Store */
  store: {
    count: xtyle.signal(0),
  },
};

// Register the plugin
xtyle.use(myPlugin);
```

By following this example, you've **successfully created a plugin** that includes:

- a custom **`x-html`** directive.
- a **`x-button`** element.
- a **`title`** global variable.
- a **`count`** store global state.

These can now be used within your application.

```js
// App (Demo)
const App = () => (
  <div x-html>
    Count is: {xtyle.store.count}
    <x-button>{xtyle.global.title}</x-button>
  </div>
);

// Reactive Count
setInterval(() => {
  xtyle.store.count.value += 1;
}, 1000);

// Render the App
preact.render(preact.h(App), document.body);
```

!!! warning

    The **`x-html`** directive is a **built-in** directive.

---

## **INIT** Run Application

```js
import myPlugin from "./plugin.ts";
import Main from "./main.tsx";

/**
 * @Register <Plugin>
 */
xtyle.use(myPlugin);

/**
 * @Router
 */
const router = {
  history: false,
  baseURL: null,
};

/**
 * @Render
 */
xtyle.init(Main, document.body, router);
```

### Main **Properties**

| Key                | Description                                     |
| ------------------ | ----------------------------------------------- |
| **`xtyle.global`** | Object where you can find your custom directive |
| **`xtyle.store`**  | Object where you can find your custom directive |
| **`xtyle.router`** | Object where you can find your custom directive |

## (App) **Preview Variables**

```js
/* Globals */
console.log("Globals: ", xtyle.global);

/* Store */
console.log("Store: ", xtyle.store);

/* Routes Keys */
console.log("Routes: ", Object.keys(xtyle.router.routes));

/* Directives Keys */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Components Keys */
console.log("Components: ", Object.keys(xtyle.allComponents));
```
