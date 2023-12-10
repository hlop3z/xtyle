// @ts-nocheck
/* Theme */
import test from "./tests";
import * as xtyle from "./pre-build";

//
const DOCS = (txt) => console.log(xtyle.stringTo.docs(txt));

/*
console.log(preact.$keys);
console.log(preact.util);
*/

window.h = xtyle.h;

xtyle.action("namespace.method");

xtyle.use(test.Models);

/**
 * @View
 */
const DemoView =
  (name) =>
  ({ search, arg }) => {
    console.log("Request:", search, arg);
    return h(
      "h1",
      null,
      "View " + name + ` ${JSON.stringify(search)} | ${JSON.stringify(arg)}`
    );
  };

/**
 * @Router
 */
const router = {
  history: false,
  baseURL: null,
  // "/{app}/{package}/{module}/{method}"
  404: (route) => {
    return preact.h("h1", null, "ERROR 404");
  },

  before(route) {
    route.commit();
  },
  after(route) {
    console.log(route);
  },
};

xtyle.view("/", DemoView("Root"));
xtyle.view("home", "home", DemoView("Home"));
xtyle.view("about-us/{path*}", "app.view.name", DemoView("About Us"));

/**
 * @Render
 */
xtyle.init(test.App, document.body, router);

/* Routes */
console.log(`Views:`, xtyle.router.name);
console.log("Routes: ", Object.keys(xtyle.router.routes));
// xtyle.router.name["app.view.name"].go({ path: "extra/path" }, { q: 1 })

/**
 * @Models
 */
console.log(`Models:`);

console.log(xtyle.models.keys());
console.log(xtyle.models.get("modelOne"));

xtyle.models.get("modelOne").instance.key.value = "Value";
console.log(xtyle.models.get("modelOne").instance.key.value);

console.log(xtyle.models.get("appOne.modelOne").instance.message.value);

/*
xtyle.models(schemaTwo);
xtyle.models(schemaOne);

console.log(xtyle.models.keys());
console.log(xtyle.models.get("modelOne"));

xtyle.models.get("modelOne").instance.key.value = "Value";
console.log(xtyle.model.get("modelOne").instance.key.value);

console.log(xtyle.models.get("appOne.modelOne").instance.message.value);

*/
