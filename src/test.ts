// @ts-nocheck

/* Theme */
import { Base } from "./components";
import App from "./tests/app";
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
window.h = Base.h;

preact.render(preact.h(App), document.body);
/*
setTimeout(() => {
  preact.render(null, document.body);
}, 1000);
*/
