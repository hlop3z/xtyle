// @ts-nocheck
/* Theme */
import App from "./tests/app";
import * as xtyle from "./pre-build";

/*
console.log(preact.$keys);
console.log(preact.util);
*/

window.h = xtyle.h;

// Plugin
const Plugin = {
  install() {
    console.log("install");
    return {
      router: {
        routes: ["{a}/{b}"],
        before(route) {
          console.log("Plugin Router");
          route.commit();
          // route.redirect("/login");
        },
      },
    };
  },
};

xtyle.use(Plugin);

/**
 * @Router
 */
const router = {
  history: false,
  baseURL: null,
  routes: xtyle.generateRoutes("/{view}/{section}"),
  before(route) {
    console.log("MAIN ROUTER");
    //route.commit();
  },
  after(route) {
    console.log(route);
  },
};

/**
 * @Render
 */
xtyle.init(App, document.body, router);

/**
 * @Preview
 */

/* Directives Keys */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Globals */
console.log("Globals: ", xtyle.global);

/* Store */
console.log("Store: ", xtyle.store);

/* Routes */
console.log("Routes: ", Object.keys(xtyle.router.routes));

/* Router Effect */
// xtyle.router.go("/home/about-us");
// xtyle.router.redirect("/home/about-us");
xtyle.router.effect(() => {
  setTimeout(() => {
    console.log(xtyle.router.current);
  });
}, 1000);

/**
 * @Theme
 */
const Theme = {
  theme: {
    // Base
    none: "transparent",
    white: "#fff",
    black: "#000",
    gray: "#808080",
    success: "#4CAF50",
    danger: "#f44336",
    warning: "#ff9800",
    info: "#2196F3",
    // Theme
    1: "#3f51b5",
  },
  light: {
    1: "#6c80f5",
  },
  dark: {},
};

xtyle.theme(Theme);

/* Theme */
console.log("Theme-Color: ", xtyle.theme.color("danger", "border"));
