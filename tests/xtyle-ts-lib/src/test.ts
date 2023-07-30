//@ts-nocheck
import { plugin } from "./index.ts";
import Home from "./views/home.tsx";

/**
 * @Testing
 */

/* Register Plugin */
xtyle.use(plugin);

/* Render */
preact.render(preact.h(Home), document.body);

/* Preview Directives Keys */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Preview Components Keys */
console.log("Components: ", Object.keys(xtyle.allComponents));
