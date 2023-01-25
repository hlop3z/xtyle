# Application

## Demo (**HTML**)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Xtyle | App</title>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/gh/hlop3z/xtyle@main/dist/index.min.js"></script>
  </head>

  <body>
    <div id="app"></div>

    <script>
      const pageHome = xtyle.h({
        view() {
          return [
            "div",
            {
              "@click": () => {
                this.$ui.router.go("/about");
              },
              style: "cursor:pointer; user-select:none;",
            },
            [["h1", {}, ["Home Page"]]],
          ];
        },
      });

      const pageAbout = xtyle.h({
        view() {
          return [
            "div",
            {
              "@click": () => {
                this.$ui.router.go("/");
              },
              style: "cursor:pointer; user-select:none;",
            },
            [["h1", {}, ["About Page"]]],
          ];
        },
      });

      const app = xtyle.app({
        root: "#app",
        routes: {
          "/": pageHome,
          "/about": pageAbout,
        },
      });
    </script>
  </body>
</html>
```
