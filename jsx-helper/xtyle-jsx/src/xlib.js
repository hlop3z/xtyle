import "@/assets/style.css";
import style from "../css/style.css?raw";

function camelCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (e, r) =>
      0 == +e ? "" : 0 === r ? e.toLowerCase() : e.toUpperCase()
    )
    .replace(/[^\w]+/g, "");
}

function getModules(modules, prefix = null, clean = "(^./|^../|.jsx|.js)") {
  const items = {};
  Object.keys(modules).forEach((filename) => {
    // Module Name
    let moduleName = filename
      .replace(new RegExp(clean, "g"), "")
      .replace(/^\w/, (c) => c.toLowerCase());
    // The Module
    const moduleDefault = modules[filename].default || modules[filename];
    // Camel-Case Name
    if (prefix) {
      moduleName = moduleName.replace(new RegExp(`^${prefix}`), "");
    }
    // Attach
    moduleDefault.name = moduleName;
    items[camelCase(moduleName)] = moduleDefault;
  });
  return items;
}

const componentModules = import.meta.globEager("./components/**/**.jsx");
const ctxModules = import.meta.globEager("./globals/**/**.js");
const storeModules = import.meta.globEager("./store/**/**.js");

const Plugin = {
  // Setup
  style: style,
  val: getModules(storeModules, "store/"),
  ctx: getModules(ctxModules, "globals/"),
  components: Object.values(getModules(componentModules, "components/")),

  // Install
  install(app, opts) {
    // CSS
    if (!opts.debug) {
      app.css({
        name: opts.name,
        code: style,
      });
    }
    // Mixin
    app.mixin({
      val: this.val,
      ctx: this.ctx,
      components: this.components,
    });
  },
};

export default Plugin;
