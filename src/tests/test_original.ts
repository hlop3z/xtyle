// @ts-nocheck
/* Theme */
import App from "./tests/app";
import * as xtyle from "./pre-build";

//
const DOCS = (txt) => console.log(xtyle.stringTo.docs(txt));

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
        before(route) {
          console.log("Plugin Router");
          route.commit();
          // route.redirect("/login");
        },
      },
    };
  },
};

const demoPlugin = (name) => ({
  install() {
    return {
      actions: {
        method() {
          console.log(`Core Method From <${name}>`);
        },
        app: {
          method() {
            console.log(`Sub Method From <${name}>`);
          },
        },
      },
    };
  },
});

xtyle.use(Plugin);
xtyle.use(demoPlugin("Demo-1"));
//xtyle.use(demoPlugin("Demo-2"));

xtyle.action("method");
xtyle.action("app.method");
xtyle.action("namespace.method");

/**
 * @Router
 */
const router = {
  history: false,
  baseURL: "about-us/",
  // "/{app}/{package}/{module}/{method}"
  routes: {
    "{view}": ({ search, arg }) => {
      console.log("Request:", search, arg);
      return h("h1", null, "My App VIEW");
    },
  },
  before(route) {
    //route.commit(false);
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
console.log("Actions: ", xtyle.action.object());

/* Directives Keys */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Globals */
console.log("Globals: ", xtyle.global);

/* Store */
console.log("Store: ", xtyle.store);

/* Routes */
console.log("Routes: ", Object.keys(xtyle.router.routes));

/* Router Effect */
xtyle.router.effect(() => {
  console.log("xtyle.router.effect =>", xtyle.router.current);
}, []);

/**
 * @Theme
 */
const Theme = {
  theme: {
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#ff9800",
    info: "#2196F3",
  },
  light: {
    danger: "#FFEBEE",
  },
  dark: {
    danger: "#B71C1C",
  },
  disable: [
    // string: ("text", "color", "border", "table")
  ],
};

xtyle.theme(Theme);

/* Theme */
console.log("Theme-Color: ", xtyle.theme.color("danger", "table"));

/**
 * @Reactive
 */

// const myDict = xtyle.dict(["id", "name"]);
// const myDict = xtyle.dict({ id: 1, name: "john" });
const myDict = xtyle.dict(["id", "name", "extra"]);

myDict.$set({
  id: 1,
  name: "john",
  extra: "hello-world",
  nonInputValue: "computed-value",
});

// myDict.id.value = 1;
myDict.name.value = "jane";
myDict.extra.value = "hello-world";

console.log(myDict.$);
console.log(myDict.$diff());
console.log(myDict.$get());

/* @Dict
// const myDict = xtyle.dict(["id", "name"]);
const myDict = xtyle.dict({ id: 1, name: "john" });
// myDict.$set({ id: 1, name: "jane", extra: "hello-world" });

myDict.name.value = "jane";

console.log(myDict.$diff());
console.log(myDict.$get());
*/

/* @List
const myList = xtyle.list([]);
myList.value = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
];
myList.value = [
  { id: 3, name: "Bob", age: 35 },
  { id: 1, name: "John", age: 26 },
];
myList.value = [
  { id: 3, name: "Bob", age: 36 },
  { id: 1, name: "John", age: 26 },
];

console.log(myList.last);
console.log(myList.value);
console.log(myList.diff());
*/

/* @Set
const mySet = xtyle.set(["id", "key"]);
mySet.value = ["id", "value"];
mySet.value = ["id", "key"];
console.log(mySet.last);
console.log(mySet.value);
console.log(mySet.diff());
*/

/* @Timer
const myTimer = xtyle.timer.start();
const timeInMilliseconds = xtyle.timer({ seconds: 2 });

setInterval(() => {
  const isOld = myTimer.check({ seconds: 4 });
  console.log(isOld ? "More than (x) time have passed." : "Not yet (x) time.");
}, timeInMilliseconds);
*/

/* @Model
const formOne = {
  message: "hello world",
};
const formTwo = ["key"];

const schemaOne = {
  appOne: {
    modelOne: formOne,
    modelTwo: formOne,
  },
  appTwo: {
    modelOne: formOne,
    modelTwo: formOne,
  },
};
const schemaTwo = {
  $root: true,
  modelOne: formTwo,
  modelTwo: formTwo,
};

xtyle.models(schemaTwo);
xtyle.models(schemaOne);

console.log(xtyle.models.keys());
console.log(xtyle.models.get("modelOne"));

xtyle.models.get("modelOne").instance.key.value = "Value";
console.log(xtyle.model.get("modelOne").instance.key.value);

console.log(xtyle.models.get("appOne.modelOne").instance.message.value);
*/
