// @ts-nocheck
/* Theme */
import test from "./tests";
import * as xtyle from "./pre-build";

/*
console.log(preact.$keys);
console.log(preact.util);
*/

window.h = xtyle.h;

xtyle.use(test.Events);
xtyle.use(test.Variables);
xtyle.use(test.Models);
xtyle.use(test.Actions);

/**
 * @View
 */
const DemoView = (name) => (request) => {
  // console.log("request:", request);
  // console.log("context:", request.ctx);

  return h(
    "h1",
    null,
    "View " +
      name +
      ` ${JSON.stringify(request.search)} | ${JSON.stringify(request.arg)}`
  );
};

/**
 * @Router
 */
const router = {
  history: false,
  baseURL: null,
  // "/{app}/{package}/{module}/{method}"
  /*
  404: (route) => {
    return preact.h("h1", null, "ERROR 404");
  },
  */

  before(route) {
    route.commit();
  },
  after(route) {
    console.log(route);
  },
};

// xtyle.action("namespace.method");

xtyle.view(["/", "home"], DemoView("Root"));
xtyle.view("about-us", DemoView("About Us"));

//xtyle.view("404", () => preact.h("h1", null, "ERROR 404"));
// xtyle.view("/home/", "home", DemoView("Home"));
// xtyle.view("about-us", "app.view.name", DemoView("About Us"));
// xtyle.view("about-us/{path*}", "app.view.name", DemoView("About Us"));

/**
 * @Render
 */
xtyle.init(test.App, document.body, router);

/**
 * @Preview
 */

/* Globals */
console.log("Globals: ", xtyle.global);

/* Store */
console.log("Store: ", xtyle.store);

/* Routes */
console.log("Routes: ", xtyle.router.keys());

/* Views */
console.log("Views: ", Object.keys(xtyle.router.view));

/* Directives */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Models */
console.log("Models: ", xtyle.models.keys());

/* Actions */
console.log("Actions: ", xtyle.action.keys());

// xtyle.router.name["app.view.name"].go({ path: "extra/path" }, { q: 1 })

/* Router Effect */
xtyle.router.effect(() => {
  console.log("xtyle.router.effect =>", xtyle.router.current.arg);
}, []);

/* TESTING */
// console.log(`Models:`);
// console.log(xtyle.models.keys());
// console.log(xtyle.models.get);
// console.log(xtyle.models.get("modelOne"));
// console.log(xtyle.models.get("appOne.modelOne"));
// xtyle.models.get("modelOne").instance.key.value = "Value";
// console.log(xtyle.models.get("modelOne").instance.key.value);
// console.log(xtyle.models.get("appOne.modelOne").instance.message.value);

/*
xtyle.models(schemaTwo);
xtyle.models(schemaOne);

console.log(xtyle.models.keys());
console.log(xtyle.models.get("modelOne"));

xtyle.models.get("modelOne").instance.key.value = "Value";
console.log(xtyle.model.get("modelOne").instance.key.value);

console.log(xtyle.models.get("appOne.modelOne").instance.message.value);

*/

/*
const inputSchema = {
  keyOneA$: Object,
  keyTwoA: Array,
  keyOneB: null,
  keyTwoB: {
    type: [
      Object,
      Number,
      String,
      Boolean,
      // undefined,
      // null,
      Array,
      Function,
      Symbol,
      BigInt,
    ],
    default: () => "Hello World",
  },
};
const demoPROPS = xtyle.props(inputSchema);
console.log(demoPROPS);
*/

/*
console.log("PROPS", demoPROPS.props({ keyTwoB: "hell yeah" }));
Object.entries(demoPROPS).forEach(([key, value]) => {
  console.log(key, value);
});
*/
// function ButtonComponent() {}
// xtyle.slot({ key: null }, ButtonComponent);
// xtyle.slot({ key: null }, "namespace", () => {});
