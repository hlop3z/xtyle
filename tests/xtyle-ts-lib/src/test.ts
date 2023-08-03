//@ts-nocheck
import { plugin } from "./index.ts";
import Main from "./views/main.tsx";

/**
 * @Testing
 */

/* Register Plugin */
xtyle.use(plugin);

/* Render */
preact.render(preact.h(Main), document.body);

/* Preview Directives Keys */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Preview Components Keys */
console.log("Components: ", Object.keys(xtyle.allComponents));
