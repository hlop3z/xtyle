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

/* (Set) History & Routes */
xtyle.Router({
  history: false,
  routes: ["/", "/{app}/{model}"],
});

/* (Set) Translations */
xtyle.translations({
  fr: {
    greetings: {
      hello: "Bonjour!",
    },
  },
});

/* Preview Directives Keys */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Preview Components Keys */
console.log(
  "Components: ",
  Object.keys(xtyle.allComponents).map((item) => "x-" + item)
);

/* Change Route */
xtyle.router.go("");

/* Other Previews */
console.log("Globals: ", xtyle.global);
console.log("Router: ", xtyle.router);
console.log("i18n: ", xtyle.i18n("fr.greetings.hello"));
