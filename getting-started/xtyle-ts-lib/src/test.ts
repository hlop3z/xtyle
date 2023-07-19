/* Theme */
import LayoutConfig from "./config/layout.ts";
import Directives from "./config/directives.ts";

/* App */
import App from "./base/index.tsx";
import Routes from "./views/__init__.ts";

/* Config */
const Config = {
  layout: LayoutConfig,
  directives: Directives,
  router: {
    history: false,
    routes: Routes,
    // before: ({ from, to, next, redirect }) => next(),
    // after: ({ from, to }) => console.log(from, to),
  },
};

/* Render */
xtyle.createApp(Config);
preact.render(preact.h(App), document.body);
