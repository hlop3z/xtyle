function getToRoot(root) {
  if ("string" === typeof root) {
    return document.querySelector(root);
  } else {
    return root;
  }
}

function parsePath(url) {
  const [path, query] = url.split("?");
  const searchParams = new URLSearchParams(query);
  const searchJSON = Object.fromEntries(searchParams);
  return { path: path, query: searchJSON };
}

class Router {
  constructor(root, routes) {
    this.routes = routes;
    this.routes[""] = routes["/"];
    this.rootElement = getToRoot(root);
    this.currentRoute = null;
    this.currentComponent = null;
    window.addEventListener("hashchange", this.handleRouteChange.bind(this));
    this.handleRouteChange();
    if (!window.location.hash) window.location.hash = "/";
  }
  redraw() {
    const currentPath = window.location.hash.slice(1);
    if (this.currentComponent) this.currentComponent.unmount();
    this.currentComponent = this.routes[currentPath];
    this.currentComponent.mount(this.rootElement);
  }
  getCurrentPath() {
    const currentPath = window.location.hash.slice(1);
    this.currentRoute = parsePath(currentPath);
  }
  handleRouteChange() {
    this.getCurrentPath();
    const { currentRoute } = this;
    if (this.currentComponent) this.currentComponent.unmount();
    if (!currentRoute.path) window.location.hash = "/";
    if (!this.routes[currentRoute.path]) {
      this.currentComponent = this.routes["404"];
      this.currentComponent.mount(this.rootElement);
    } else {
      this.redraw();
    }
  }
  navigate(path) {
    window.location.hash = path;
    const event = window.event;
    if (event) {
      try {
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation();
        }
      } catch (e) {
        e;
      }
    }
    //window.history.pushState({}, "", path);
  }
}

export default function createRouter(root, routes) {
  //console.log(root.id);
  const router = new Router(root, routes);
  //router.start();
  window.GO = async (path) => router.navigate(path);
  return router;
}

// can you create me a Router to navigate
