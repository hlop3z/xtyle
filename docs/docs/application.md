# **Xtyle** | Application

!!! tip "Views"

    Create **Views** with your **Components**

## Browser Usage

```html
<script src="https://unpkg.com/xtyle@latest"></script>
```

<p align="center" style="font-size: 2.5em; letter-spacing: -2px; font-family: Georgia, sans-serif;" >
   Xtyle App 
</p>

<video width="100%" loop autoplay controls>
  <source src="../img/app.mp4" type="video/mp4">
</video>

## Demo | **HTML**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Config -->
    <title>Xtyle App</title>
    <!-- Xtyle JS -->
    <script src="https://unpkg.com/xtyle@latest"></script>
  </head>
  <body>
    <div id="app"></div>

    <!-- Xtyle Code -->
    <script>
      // Inject CSS
      xtyle.inject({
        id: "xtyle-app",
        code: `main { margin-top: 25%; } button { margin: 0 2px; }`,
      });

      // Global Reactive
      const dict = xtyle.dict({
        count: 0,
        add() {
          this.state = (draft) => {
            if (draft.count > 9) {
              this.reset();
            } else {
              draft.count += 1;
            }
          };
        },
      });
      // Reusable Component (Global State)
      const Component = xtyle.dom({
        tag: "button",
        data: {
          dict,
        },
        attrs: {
          "x-on:click": () => dict.state.add(),
        },
        slot: {
          default() {
            // Access $store.project (Defined in the App Section)
            const { project } = this.$store;
            const { name } = project.state;
            // Access "dict"
            const { count } = dict.state; // You can also use: `this.state.dict`
            return `(Global-${name}) Count is: ${count}`;
          },
        },
      });

      // Reusable Component (Local State)
      const maxCount = 5;
      const LocalComponent = xtyle.dom({
        tag: "button",
        data: {
          count: 0,
        },
        attrs: {
          // Attrs uses (`self`)
          "x-on:click": (self) => {
            const { count } = self.state;
            const isMax = count > maxCount;
            if (!isMax) {
              /* [Update Current Values]
            @set(method) => state         
        */
              self.state = (draft) => {
                draft.count += 1;
              };
            } else {
              self.$reset();
            }
          },
        },
        slot: {
          // Slot(s) uses (`this`)
          default() {
            const { count } = this.state;
            return "Count is: " + count;
          },
        },
      });

      // Home Page
      const pageHome = {
        slot: {
          default() {
            const { $route, $router } = this;
            const current = $router.args.name || "home";
            const pageName = current.charAt(0).toUpperCase() + current.slice(1);
            return [
              "div",
              {},
              [
                ["h3", {}, pageName + " | Page"],
                ["br", {}, []],
                LocalComponent(),
                Component(),
              ],
            ];
          },
        },
      };

      // App Component
      const App = {
        slot: {
          default() {
            const { $route, $router } = this;
            return [
              "main",
              {
                style: "text-align: center;",
              },
              [
                "Xtyle Application",
                ["br", {}, []],
                ["br", {}, []],
                [
                  "button",
                  {
                    "x-on:click": () => {
                      $router.go("/");
                    },
                  },
                  ["home"],
                ],
                [
                  "button",
                  {
                    "x-on:click": () => {
                      $router.go("/about");
                    },
                  },
                  ["about"],
                ],
                [
                  "button",
                  {
                    "x-ripple": { color: "red", circle: true, center: true },
                  },
                  ["x-ripple"],
                ],
                ["br", {}, []],
                ["br", {}, []],
                $route,
              ],
            ];
          },
        },
      };

      // Xtyle App
      const app = xtyle.app({
        app: App,
        val: {
          project: {
            name: "xtyle",
          },
        },
        methods: {
          changeTitle() {
            console.log(this);
          },
        },
        routes: {
          "/": pageHome,
          "/{name}": pageHome,
        },
      });

      // Mount
      app.mount("#app");
    </script>
  </body>
</html>
```
