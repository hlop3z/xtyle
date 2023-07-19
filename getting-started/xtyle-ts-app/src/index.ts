/* Core */
import Routes from "./views/__init__.ts";

const { App, LayoutConfig, Directives } = theme;

const Config = {
  layout: LayoutConfig,
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
