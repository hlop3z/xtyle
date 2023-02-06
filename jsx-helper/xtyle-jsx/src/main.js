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
