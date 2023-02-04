import "./assets/style.css";
import App from "./App";
import view from "./views";
import store from "./store"; // val
import globals from "./globals"; // ctx

const app = xtyle.app({
  app: App,
  val: store,
  ctx: globals,
  routes: {
    "/": view.sample,
    "/{name}": view.sample,
  },
});

app.mount("#app");
