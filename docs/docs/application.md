# **Xtyle** | Application

!!! tip "Views"

    Create **Views** with your **Components**

## Browser Usage

```html
<script src="https://unpkg.com/xtyle@latest"></script>
```

## Demo | **HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Xtyle | App</title>
    <script src="https://unpkg.com/xtyle@latest"></script>
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
