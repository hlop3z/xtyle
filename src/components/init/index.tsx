// Plugins
import { pluginRouter, beforeInit, afterInit } from "../use/index.tsx";
import Props from "./props.ts";
import { VIEW_UNQUE_ROUTES } from "../router/index.tsx";

function generateRoutes(routePath: string) {
  const routeHierarchy: any = [];
  const parts = routePath.split("/").filter((part) => part);
  let currentPath: string = "";
  for (const part of parts) {
    currentPath += `/${part}`;
    routeHierarchy.push(currentPath);
  }
  return Array.from(new Set(routeHierarchy));
}

const valueIs = {
  dict(value) {
    return value && typeof value === "object" && value.constructor === Object;
  },
  string(value) {
    return typeof value === "string" || value instanceof String;
  },
  list(value) {
    return value && typeof value === "object" && value.constructor === Array;
  },
};

// Run Project
export default (Router) =>
  function AppInit(app: any, renderTo: any, routerOptions: Props | any) {
    routerOptions = routerOptions || {};

    // Page Not Found
    let page_error_404 = routerOptions[404] || routerOptions["404"];
    if (page_error_404 !== false) {
      page_error_404 =
        page_error_404 || (() => preact.h("h1", null, "Page Not Found"));
    }

    //;

    // Collect Routes
    if (!routerOptions.routes) {
      routerOptions.routes = VIEW_UNQUE_ROUTES;
    } else if (valueIs.string(routerOptions.routes)) {
      routerOptions.routes = generateRoutes(routerOptions.routes);
    } else if (valueIs.list(routerOptions.routes)) {
      routerOptions.routes = Array.from(new Set(routerOptions.routes));
    }

    // Init Router
    Router({
      ...routerOptions,
      page404: page_error_404,
      before: (route) => {
        pluginRouter.before.forEach((method) => {
          method(route);
        });
        if (routerOptions.before) {
          routerOptions.before(route);
        }
        if (!routerOptions.before && pluginRouter.before.length === 0) {
          route.commit();
        }
      },
      after: (route) => {
        pluginRouter.after.forEach((method) => {
          method(route);
        });
        if (routerOptions.after) routerOptions.after(route);
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
  };
