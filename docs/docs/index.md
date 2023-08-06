# **Xtyle** Library for **(Preact)**

!!! info "Xtyle"

    Welcome to **Xtyle**! Your Ultimate Directive Extension! :rocket:  Enabling you to effortlessly extend your functions as **global directives**. Say goodbye to exporting and importing components constantly. Any **`method`** or **`component`** you register globally will be readily available throughout your whole Application.

!!! tip "no-installation"

    ```js
    <script src="https://unpkg.com/xtyle@latest" type="text/javascript"></script>
    ```

!!! tip "TypeScript"

<p
  align="center"
  style="font-size: 2.5em; letter-spacing: -2px; font-family: Georgia, sans-serif;"
>
  <a
    href="https://github.com/hlop3z/xtyle/raw/main/getting-started/xtyle-ts-lib.zip"
    target="_blank"
  >
    Download (Library) Template
  </a>
</p>

---

## Core **API**

| Key                   | Description                                     |
| --------------------- | ----------------------------------------------- |
| **`xtyle.use`**       | <a href="#creating-plugins">Plugin(s)</a>       |
| **`xtyle.element`**   | <a href="#creating-components">Component(s)</a> |
| **`xtyle.directive`** | <a href="#creating-directives">Directive(s)</a> |
| **`xtyle.router`**    | <a href="./router">Router</a>                   |
| **`xtyle.model`**     | <a href="./util/models">Model(s)</a>            |
| **`xtyle.base`**      | **Only** useful with **`TypeScript`**           |

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

- title: The title for the component.

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

- **`elements`**: Define the custom elements you want to create with your plugin.
- **`directives`**: Declare custom directives to extend the behavior of your elements.
- **`globals`**: Specify global variables accessible within your plugin's scope.
- **`store`**: Define global state variables that can be used reactively within your plugin.

### Example:

Below is an example of how to create and register a custom plugin using **`xtyle.use`**:

```js
// Define your plugin
const myPlugin = {
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

By following this example, you've successfully created a plugin that includes:

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

With **`xtyle.use`**, you can easily bundle and manage multiple **`elements`, `directives`, `globals`, and `store`** variables into a single cohesive **plugin**, making it more organized and maintainable for your Preact applications.
