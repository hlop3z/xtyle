import { signalXtyle } from "../../store";

const BackendKey = {
  action: "__a",
  query: "__q",
};

function checkDiff(obj1: any, obj2: any) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

/**
 * RouterAPI class for handling routing and providing route-related functionality.
 *
 * @class
 */
class RouterAPI {
  /**
   * Creates a new RouterAPI instance.
   *
   * @constructor
   * @param {NavigatorOptions} options - The options object containing router configuration.
   */
  routerHandler: () => void;
  baseURL: string;
  history: boolean;
  find: any;
  routes: any;
  searchArgs: any;
  _current: any;

  constructor(options: NavigatorOptions) {
    this.routerHandler = () => {
      const nextRouter = this.find();
      const isDiff = checkDiff({ ...this._current.value }, nextRouter);
      // Update IF Changes only
      if (isDiff) {
        this._current.value = nextRouter;
        if (typeof options.callback === "function") {
          options.callback(nextRouter);
        }
      }
    };
    this.baseURL = options.baseURL || "/";
    this.history = options.history || false;
    this._current = signalXtyle({});

    // Set Handler
    window.onpopstate = this.routerHandler;

    // Collect Routes
    if (Array.isArray(options.routes)) {
      const dict = {};
      options.routes.forEach((key) => {
        dict[key] = null;
      });
      this.routes = dict;
    } else {
      this.routes = options.routes || {};
    }

    // Extra Methods
    this.find = VirtualRouter(this.routes, this.history);
    this.searchArgs = createSearchParams;

    // Init Router
    this.routerHandler();
  }

  /**
   * Gets the current route view.
   *
   * @readonly
   * @returns {string | null} - The current route view.
   */
  get current(): string | null {
    return this._current.value;
  }

  /**
   * Computes a value based on the current route.
   *
   * @param {...any} args - Arguments to be passed to the computation function.
   * @returns {any} - The computed value.
   */
  computed(...args: any): any {
    return this._current.computed(...args);
  }

  /**
   * Adds an effect to be triggered when the route changes.
   *
   * @param {...any} args - Arguments to be passed to the effect function.
   * @returns {any} - The effect.
   */
  effect(...args: any): any {
    return this._current.effect(...args);
  }

  /**
   * Navigates to the specified path and triggers the router handler.
   *
   * @param {string} [path=""] - The path to navigate to.
   * @param {object} [query={}] - The query parameters for the path.
   * @returns {void}
   */
  go(path: string = "", query: object = {}): void {
    const event = window.event;
    if (event) {
      try {
        event.preventDefault?.();
        event.stopPropagation?.();
        event.stopImmediatePropagation?.();
      } catch (e) {}
    }

    path = `${this.baseURL}${path}`;
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    path = path.replace("//", "/");

    if (Object.keys(query).length > 0) {
      path += createSearchParams(query);
    }
    if (this.history) {
      window.history.pushState({}, "", path);
    } else {
      window.history.pushState({}, "", "/#" + path);
    }

    this.routerHandler();
  }
}

/**
 * Interface for the route parameters in the RouterAPI class.
 *
 * @interface
 */
interface RouteParams {
  [key: string]: string | undefined;
}

/**
 * Interface for the route response in the RouterAPI class.
 *
 * @interface
 */
interface RouteResponse {
  view: string | null;
  arg: RouteParams;
  path: string | null;
  search: RouteParams;
}

/**
 * RouterView class representing the route response in the RouterAPI class.
 *
 * @class
 */
class RouterView implements RouteResponse {
  /**
   * The view value in the route response.
   *
   * @type {string | null}
   */
  view: string | null;

  /**
   * The argument object in the route response.
   *
   * @type {RouteParams}
   */
  arg: RouteParams;

  /**
   * The path value in the route response.
   *
   * @type {string | null}
   */
  path: string | null;

  /**
   * The search object in the route response.
   *
   * @type {RouteParams}
   */
  search: RouteParams;

  /**
   * Creates a new RouterView instance.
   *
   * @constructor
   * @param {Partial<RouteResponse>} args - The arguments for the RouterView instance.
   */
  constructor(args: Partial<RouteResponse>) {
    this.view = null;
    this.arg = {};
    this.path = null;
    this.search = {};

    Object.assign(this, args);
  }
}

/**
 * Function to extract search parameters from the path.
 *
 * @param {string} _path - The path containing search parameters.
 * @returns {RouteParams} - The extracted search parameters.
 */
function extractSearchParams(_path: string): RouteParams {
  const searchParams = new URLSearchParams(_path);
  const obj: RouteParams = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * Function to create search parameters from the provided object.
 *
 * @param {any} params - The object containing search parameters.
 * @returns {string} - The search parameters as a string.
 */
function createSearchParams(params: any): string {
  const keys: string[] = Object.keys(params || {});
  const dict = {};
  if (keys.length > 0) {
    if (keys.includes("$query") && keys.includes("$action")) {
      dict[BackendKey.action] = params.$action;
      dict[BackendKey.query] = JSON.stringify(params.$query);
      delete params.$query;
      delete params.$action;
    }
    const queryString = new URLSearchParams({ ...dict, ...params }).toString();
    return "?" + queryString;
  }
  return "";
}

/**
 * Interface for defining route patterns in the RouterAPI class.
 *
 * @interface
 */
interface Routes {
  [key: string]: string;
}

/**
 * Interface for the options object in the RouterAPI class.
 *
 * @interface
 */
interface NavigatorOptions {
  callback: (next: any) => void;
  history?: boolean;
  baseURL?: string;
  routes?: any;
}

/**
 * Function to parse the input path and find a matching route response.
 *
 * @param {string} inputPath - The input path to be parsed.
 * @param {Routes} routes - The routes object containing route definitions.
 * @returns {RouteResponse} - The route response object.
 */
function parsePath(
  inputPath: string,
  routes: Record<string, string>
): RouteResponse {
  if (inputPath === "") inputPath = "/";
  if (inputPath.includes("?")) {
    inputPath = inputPath.split("?")[0];
  }

  for (const pattern in routes) {
    const param: RouteParams = {};
    const regex = pattern.replace(
      /\{(\??)([^/]+?)(\*?)\}/g,
      // @ts-ignore
      (match, optional, variableName, remaining) => {
        param[variableName] = undefined;
        if (optional) {
          return "([^/]*?)?";
        } else if (remaining) {
          return "(.*)";
        } else {
          return "([^/]+)";
        }
      }
    );

    const match = inputPath.match(new RegExp(`^${regex}$`));
    if (match) {
      if (match.length > 1) {
        const allKeys = Object.keys(param);
        [...Array(match.length).keys()].map((xid) => {
          if (xid > 0) {
            const key = allKeys[xid - 1];
            param[key] = match[xid];
          }
        });
      }
      const view = routes[pattern];
      const routerInfo = new RouterView({ view: view, arg: param });
      return routerInfo;
    }
  }

  return new RouterView({});
}
/**
 * Function to get the current route based on the provided routes and path.
 *
 * @param {Routes} routes - The routes object containing route definitions.
 * @param {boolean} [history=true] - Optional flag to enable history API for routing.
 * @param {string} path - The path to be used for route matching.
 * @returns {RouteResponse} - The route response object for the current route.
 */
function getPath(
  routes: Record<string, string>,
  history: boolean = true,
  path: string
): RouteResponse {
  let currentPath = path;
  if (!currentPath) {
    currentPath = history
      ? window.location.pathname
      : window.location.hash.slice(1);
  }

  // Core
  const data = parsePath(currentPath, routes);
  const parts = currentPath.split("?");

  // Extract Path
  data.path = parts[0];
  if (!data.path) data.path = "/";

  // Query
  const query = parts.length === 2 ? parts[1] : null;
  if (query) {
    data.search = extractSearchParams(query);
  } else {
    data.search = extractSearchParams(window.location.search);
  }

  return data;
}

/**
 * Function to create a router based on the provided routes and history flag.
 *
 * @param {Routes} routes - The routes object containing route definitions.
 * @param {boolean} [history=true] - Optional flag to enable history API for routing.
 * @returns {Function} - The router function.
 */
export function VirtualRouter(
  routes: Routes,
  history: boolean = true
): Function {
  return (path = "") => getPath(routes, history, path);
}

/**
 * Function to create a new RouterAPI instance with the provided options.
 *
 * @param {NavigatorOptions} options - The options object containing router configuration.
 * @returns {RouterAPI} - A new RouterAPI instance.
 */
export default function createRouter(options: NavigatorOptions): RouterAPI {
  return new RouterAPI(options);
}

/*
// DEMO
const patternDict: any = {
  "/": "data1",
  "/a/b/{?key}": "data2",
  "/a/b/key-{name}/{path*}": "data3",
};
const patternList: any = ["/", "/a/b/{?key}", "/a/b/key-{name}/{path*}"];

const router = new RouterAPI({
  callback: () => {
    console.log("Changed");
  },
  history: false,
  baseURL: "/",
  routes: patternList, // patternDict
});

// Search to String
const searchParams = router.searchArgs({
  key: "val",
});
console.log(searchParams);

// Nav
router.go("/home", {
  // searchParams
  key: "val",
  $action: "frontend.project.list.filter",
  $query: { key: "val" },
});

// Auto (Current)
console.log(router.find());

// 1
console.log(router.find("/"));

// 2
console.log(router.find("/a/b/"));
console.log(router.find("/a/b/etc"));

// 3
console.log(router.find("/a/b/key-two/etc"));
console.log(router.find("/a/b/key-one/etc/andmore/andmore?q=1"));
*/
