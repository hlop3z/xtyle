import "./assets/style.css";
import App from "./App";
import view from "./views";

const app = xtyle.app({
  app: App,
  routes: {
    "/": view.sample,
    "/{name}": view.sample,
  },
  val: {
    counter: {
      count: 0,
    },
  },
});

app.mount("#app");
