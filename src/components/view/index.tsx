import { VIEW_UNQUE_ROUTES, VIEW_UNQUE_NAMES } from "../router/index.tsx";
import paramHelper from "./paramHelper";

const View = (routerAPI) => {
  function attachView(path, namespace, method) {
    method.uri = namespace;
    VIEW_UNQUE_ROUTES[path] = method;
    VIEW_UNQUE_NAMES[namespace] = {
      path,
      args: paramHelper.extract(path),
      go: (val, search) =>
        routerAPI.get().go(paramHelper.build(path, val), search || {}),
    };
    return VIEW_UNQUE_ROUTES;
  }

  // View Generator
  return (path, name, component) => {
    const method = component ? component : name;
    const namespace = component ? name : path;
    if (["/", "."].includes(path) || !path) {
      return attachView("/", "$", method);
    }
    return attachView(path, namespace, method);
  };
};

export default View;
