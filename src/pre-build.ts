// Tools
export { device } from "./store";
export { useSignalXtyle as useSignal } from "./store";
export { signalXtyle as signal } from "./store";
export { default as util } from "./utils.ts";
export { default as model } from "./components/model/index.tsx";
export { default as validator } from "./components/validator/index.tsx";
export { default as stringTo } from "./components/stringTo/index.tsx";
export { default as useRef } from "./components/useRef/index.tsx";
export { default as actions } from "./components/actions/index.tsx";

// (i18n) Translations
import i18nAdmin from "./components/i18n/index.tsx";

// @ts-ignore
export let i18n = (param: any) => undefined; // over-written by setting up translations
export const translations = (obj: any) => {
  i18n = i18nAdmin(obj);
};

// Core (Exports)
export {
  Base as base,
  allProps as global,
  allStates as store,
  allComponents,
  allDirectives,
} from "./components/base/index.tsx";

// Library Wrapper
import * as Core from "./components/base/index.tsx";

// Router
import ROUTER from "./components/router/index.tsx";
export let router = {};

// Tool Wrappers
export const h = Core.h;
export const element = Core.element;
export const directive = Core.directive;
export const Router = (args: any) => {
  const admin = ROUTER(args);
  if (Object.keys(router).length === 0) {
    router = admin;
  }
  return admin;
};

export function generateRoutes(routePath: string) {
  const routeHierarchy: any = [];
  const parts = routePath.split("/").filter((part) => part);
  let currentPath: string = "";
  for (const part of parts) {
    currentPath += `/${part}`;
    routeHierarchy.push(currentPath);
  }
  return ["/", ...routeHierarchy];
}

// Plugins Routes
const pluginRoutes: any = new Set();
const afterInit: any = [];

// Custom Plugins
export const use = (options: any = {}) => {
  const config = options || {};
  if (config.elements) {
    Object.keys(config.elements).forEach((key) => {
      Core.element(key)(config.elements[key]);
    });
  }
  if (config.directives) {
    Object.keys(config.directives).forEach((key) => {
      Core.directive(key)(config.directives[key]);
    });
  }
  if (config.globals) {
    Core.globalProps(config.globals);
  }
  if (config.store) {
    Core.globalStore(config.store);
  }
  if (config.routes && Array.isArray(config.routes)) {
    config.routes.forEach((key) => {
      pluginRoutes.add(key);
    });
  }
  if (config.init && Array.isArray(config.init)) {
    afterInit.push(...config.init);
  }
};

// Components in Pascal-Case to Kebab-Case
function pascalToKebab(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Convert uppercase letters to kebab-case
    .toLowerCase(); // Convert the whole string to lowercase
}

export const build = (
  options: any = {},
  title: string | undefined = undefined
) => {
  const dict = {};
  Object.keys(options).forEach((key) => {
    const name = (title ? `${title}-` : "") + pascalToKebab(key);
    dict[name] = options[key];
  });
  return dict;
};

// Run Project
export function init(app: any, renderTo: any, options: any) {
  options = options || {};

  // Init Router
  const routes = new Set(options.routes || []);
  options.routes = [...Array.from(routes), ...Array.from(pluginRoutes)];
  Router(options);

  // GET Mount Point
  let element: any = renderTo;
  if (typeof renderTo === "string") {
    element = document.querySelector(renderTo);
  }

  // Init App
  preact.render(preact.h(app), element);

  // afterInit
  afterInit.forEach((method: any) => {
    method();
  });
}
