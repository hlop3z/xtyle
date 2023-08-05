// @ts-nocheck

/* Theme */
import App from "./tests/app";
import * as xtyle from "./pre-build";

xtyle.use({
  globals: {
    title: "Xtyle",
  },
});

xtyle.Router({
  history: false,
  routes: ["/", "/{?key}", "/a/b/key-{name}/{path*}"],
  callback(next) {
    console.log(next);
  },
});

// import "./tests/backend";

// HelloWorld
/*
console.log(preact.$keys);
console.log(preact.util);
console.log(XTYLE_GLOBAL);
*/
// core.render(App, document.body); // "#app"

// Base.app.directive
// Base.app.element

// @ts-ignore
window.h = xtyle.h;

preact.render(preact.h(App), document.body);
/*
setTimeout(() => {
  preact.render(null, document.body);
}, 1000);
*/

console.log(xtyle.global);
console.log(xtyle.router.current);
