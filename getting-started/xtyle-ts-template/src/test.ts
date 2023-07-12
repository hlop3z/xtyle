import App from "./base/layout";

const AppLayout = {
  // Sizes
  header: "50px",
  footer: "50px",
  right: "185px",
  left: "185px",
  leftMini: "60px",
  rightMini: "60px",

  // Layers
  headerLayer: 2,
  footerLayer: 2,
  leftLayer: 1,
  rightLayer: 1,
};

const Routes = [
  // Home Page
  {
    path: "/",
    name: "home",
    view: () => h("div", {}, "Home View"),
  },
  // About Page
  {
    path: "/{view}",
    name: "custom",
    view: () => h("div", {}, "About View"),
  },
];

const Config = {
  layout: AppLayout,
  directives: {},
  router: {
    history: false,
    routes: Routes,
    before: ({ from, to, next }) => next(),
    after: ({ from, to }) => console.log(from, to),
  },
};

xtyle.createApp(Config);

preact.render(preact.h(App), document.body);
