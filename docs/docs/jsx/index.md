Here you will learn how to use this library with **`JSX`** and **`Vite`**.

[**Click Here**](https://github.com/hlop3z/xtyle/releases/download/jsx-template/xtyle-jsx.zip) to Download the template.

Is just a simple **`vite`** template with the configurations to transform **`JSX`** into **`Xtyle` Code**

**After downloading** and **`unzipping`** just run the following code inside the folder:

## Installation

```sh
npm install
npm run dev
```

<video width="100%" loop autoplay controls>
  <source src="./app.mp4" type="video/mp4">
</video>

## Demo | **Application**

!!! note

        It comes with **five** (5) main **parts**. (**`Main`, `App`, `View`, `Button`, `Page Name`**)

=== "Main"

      Main (App)

      ```js title="./src/main.js"
      import App from "./App";
      import View from "./views";

      // Plugin (Lib)
      import Plugin from "./xlib";

      // Setup
      const app = xtyle.app({
        app: App,
        routes: {
          "/": View.sample,
          "/{name}": View.sample,
        },
      });

      // Install Plugin
      app.use(Plugin, {
        name: "xtyler",
        debug: true,
      });

      // Mount App
      app.mount("#app");
      ```

=== "App"

      Application (Object)

      ```js title="./src/App.jsx"
      import javascriptLogo from "./assets/logos/javascript.svg";
      import xtyleLogo from "./assets/logos/xtyle.svg";

      export default {
        slot: {
          default() {
            const { $route, $router } = this;
            if ($router.route === "404") {
              return $route;
            }
            return (
              <div id="app">
                <h1>Xtyle | App</h1>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                  target="_blank"
                >
                  <img
                    src={javascriptLogo}
                    class="logo vanilla"
                    alt="JavaScript logo"
                  />
                </a>
                <a href="https://hlop3z.github.io/xtyle/" target="_blank">
                  <img src={xtyleLogo} class="logo" alt="Xtyle logo" />
                </a>
                <br />
                <br />
                <button x-ripple={{ color: "red", circle: true, center: true }}>
                  X-Ripple
                </button>
                <br />
                <br />
                {$route}
              </div>
            );
          },
        },
      };
      ```

=== "View"

      View (Object)

      ```js title="./src/views/sample.jsx"
      export default {
        slot: {
          default() {
            const { $router } = this;
            const { pageName, xButton } = this.$gui;
            return (
              <template>
                {pageName()}
                <br />
                <button x-ripple x-on:click={() => $router.go("/")}>
                  Go Home
                </button>
                <button x-on:click={() => $router.go("/2nd")}>Go Second</button>
                <button x-on:click={() => $router.go("/3rd")}>Go Third</button>
                <button
                  x-on:click={() =>
                    $router.go("/not/found/" + new Date().toISOString())
                  }
                >
                  Page Not Found
                </button>
                <br />
                <br />
                {xButton({ isGlobal: false })}
                {xButton({ isGlobal: true })}
              </template>
            );
          },
        },
      };
      ```

=== "Button"

      Button (Component)

      ```js title="./src/components/x/button.jsx"
      export default {
        tag: "button",
        follow: ["counter"],
        props: {
          isGlobal: false,
        },
        data: {
          count: 0,
        },
        attrs: {
          "x-on:click": (vnode, event) => {
            const { isGlobal } = vnode.state;
            const { counter } = vnode.$ui.val;
            if (isGlobal) {
              counter.state = (draft) => {
                draft.count += 1;
              };
            } else {
              vnode.state = (draft) => {
                draft.count += 1;
              };
            }
            console.log(event);
          },
        },
        slot: {
          default() {
            const { isGlobal } = this.state;
            if (isGlobal) {
              const { counter } = this.$ui.val;
              const { count } = counter.state;
              return "Global Count is: " + count;
            }
            const { count } = this.state;
            return "Local Count is: " + count;
          },
        },
      };
      ```

=== "Page Name"

      Page Name (Component)

      ```js title="./src/components/page-name.jsx"
      export default {
        tag: "h3",
        slot: {
          default() {
            const { $router } = this;
            const current = $router.args.name || "home";
            const pageName = current.charAt(0).toUpperCase() + current.slice(1);
            return pageName + " View";
          },
        },
      };
      ```

---

## **Lib** vs **App**

!!! tip "App"

    You can create a reusable **`Library`** or an **`Application`**

    The **default** mode is **`Library`** but you just need to **remove** the **`build`** object from the configurations.

    To turn it into an **`Application`** build.

=== "Library"

    ```js title="vite.config.js"
    import { defineConfig } from "vite";
    import { fileURLToPath } from "url";
    import babel from "vite-plugin-babel";
    import { resolve } from "path";

    export default defineConfig({
      plugins: [babel()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
          "@tool": fileURLToPath(new URL("./tools", import.meta.url)),
        },
      },
      // Remove this to create a (Web-App)
      // Leave it to create a (Library)
      build: {
        lib: {
          entry: resolve(__dirname, "src/xlib.js"),
          name: "index",
          fileName: "index",
          format: "esm",
        },
      },
    });
    ```

=== "Application"

    ```js title="vite.config.js"
    import { defineConfig } from "vite";
    import { fileURLToPath } from "url";
    import babel from "vite-plugin-babel";
    import { resolve } from "path";

    export default defineConfig({
      plugins: [babel()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
          "@tool": fileURLToPath(new URL("./tools", import.meta.url)),
        },
      },
    });
    ```
