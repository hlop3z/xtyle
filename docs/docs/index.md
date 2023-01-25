# Component

> Create **Reusable** Components

## Demo | **HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Xtyle | App</title>
    <script src="https://cdn.jsdelivr.net/gh/hlop3z/xtyle@main/dist/index.min.js"></script>
  </head>

  <body>
    <div id="app"></div>

    <script>
      const myComponent = xtyle.h({
        props: {
          title: {
            type: String,
            default: "Hello World",
          },
        },
        data: {
          show: true,
        },
        methods: {
          toggle() {
            this.show = !this.show;
          },
        },
        view() {
          return [
            "div",
            {
              "@click": () => {
                console.log(this.title);
                this.toggle();
                console.log(this.show);
              },
            },
            [["h1", {}, ["Xtyle Project"]]],
          ];
        },
      });
      const component = myComponent();
      component.mount("#app");
    </script>
  </body>
</html>
```
