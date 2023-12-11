import { VIEW_UNQUE_ROUTES, VIEW_UNQUE_NAMES } from "../router/index.tsx";
import paramHelper from "./paramHelper";
import { inputPath, valueIs } from "../router/tools.ts";

function attachView(routerAPI, path, namespace, method) {
  const finalPath = inputPath(path);
  method.uri = namespace;
  VIEW_UNQUE_ROUTES[finalPath] = method;
  VIEW_UNQUE_NAMES[namespace] = {
    path: finalPath,
    args: paramHelper.extract(finalPath),
    go: (val, search) =>
      routerAPI.get().go(paramHelper.build(finalPath, val), search || {}),
  };
  return VIEW_UNQUE_ROUTES;
}

function createView(routerAPI, path, name, component) {
  const method = component ? component : name;
  const namespace = component ? name : path;
  if (["/", "."].includes(path) || !path) {
    return attachView(routerAPI, "/", "$", method);
  }
  return attachView(routerAPI, path, namespace, method);
}

const View = (routerAPI) => {
  // View Generator
  return (path, name, component) => {
    if (valueIs.list(path)) {
      path.map((item) => createView(routerAPI, item, name, component));
      return VIEW_UNQUE_ROUTES;
    }
    return createView(routerAPI, path, name, component);
  };
};

export default View;
