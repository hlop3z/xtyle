// Tools
export { device } from "./store";
export { useSignalXtyle as useSignal } from "./store";
export { signalXtyle as signal } from "./store";
export { default as util } from "./utils.ts";
export { default as validator } from "./components/validator/index.tsx";
export { default as stringTo } from "./components/stringTo/index.tsx";
export { default as useRef } from "./components/useRef/index.tsx";
export { default as actions } from "./components/actions/index.tsx";
export { default as theme } from "./components/theme/index.tsx";
export { default as slot } from "./components/slot/index.tsx";
export { default as arrayPage } from "./components/arrayPage/index.tsx";
export { default as string } from "./components/string/index.tsx";
export { default as build } from "./components/build/index.tsx";
export { default as api } from "./components/api/index.tsx";
export { default as cleanObject } from "./components/cleanObject/index.tsx";

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

// Plugins
import {
  pluginRouter,
  beforeInit,
  afterInit,
  addPlugin,
} from "./components/use/index.tsx";

export const use = addPlugin(Core);

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
  return routeHierarchy;
}

// Run Project
export function init(app: any, renderTo: any, routerOptions: any) {
  routerOptions = routerOptions || {};

  // Collect Routes
  const routes = new Set(routerOptions.routes || []);
  const uniqueRoutes = new Set([...routes, ...pluginRouter.routes]);
  routerOptions.routes = Array.from(uniqueRoutes);

  console.log(pluginRouter.routes);

  // Init Router
  Router({
    ...routerOptions,
    before: (data) => {
      pluginRouter.before.forEach((method) => {
        method(data);
      });
      if (routerOptions.before) {
        routerOptions.before(data);
      }
      if (!routerOptions.before && pluginRouter.before.length === 0) {
        data.commit();
      }
    },
    after: (data) => {
      pluginRouter.after.forEach((method) => {
        method(data);
      });
      if (routerOptions.after) routerOptions.after(data);
    },
  });

  // GET Mount Point
  let element: any = renderTo;
  if (typeof renderTo === "string") {
    element = document.querySelector(renderTo);
  }

  // afterInit
  beforeInit.forEach((method: any) => {
    method();
  });

  // Init App
  preact.render(preact.h(app), element);

  // afterInit
  afterInit.forEach((method: any) => {
    method();
  });
}
