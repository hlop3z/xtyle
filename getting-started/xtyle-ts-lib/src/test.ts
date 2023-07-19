/* Core */
import App from "./base/__init__.tsx";
import Routes from "./views/__init__.ts";
import Layout from "./config/layout.ts";
import Directives from "./config/directives.ts";

const Config = {
  layout: Layout,
  directives: Directives,
  router: {
    history: false,
    routes: Routes,
    // before: ({ from, to, next }) => next(),
    // after: ({ from, to }) => console.log(from, to),
  },
};

xtyle.createApp(Config);

preact.render(preact.h(App), document.body);
