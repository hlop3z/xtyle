import { CURRENT_VIEW, setNextGlobalView } from "./globalView.ts";
import {
  RouteParams,
  checkForRoot,
  checkDiff,
  extractSearchParams,
  createSearchParams,
  fixURL,
  noSuffixSlashURL,
  removeBaseURL,
  routeURL,
  pathWithQuery,
  collectRoutes,
  openOrFocusWindow,
} from "./tools.ts";

const { signal, effect, computed } = preact;

export const VIEW_UNQUE_ROUTES = {};
export const VIEW_UNQUE_NAMES = {};

let NEXT_PATH: any = "";
let SHOULD_COMMIT: boolean = false;
let SHOULD_REDIRECT: boolean = false;

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
  beforeRouter: (props: any) => void;
  routerHandler: (fromGoMethod?: boolean) => void;
  baseURL: string;
  history: boolean;
  find: any;
  routes: any;
  searchArgs: any;
  _current: any;
  page404: any;
  ctx: any;

  /**
   * Gets the current route view.
   *
   * @readonly
   * @returns {string | null} - The current route view.
   */
  constructor(options: NavigatorOptions) {
    this.ctx = options.ctx;
    const routerApi = this;
    this.beforeRouter = ({ prevRouter, nextRouter }) => {
      if (!nextRouter.view) {
        if (routerApi.page404 !== false) {
          nextRouter.view = routerApi.page404;
        }
      }

      const commitChanges = (value = true) => (SHOULD_COMMIT = value);
      const redirectChanges = (path: string = "", query: object = {}) => {
        if (path) {
          const build: any = this._buildGoQuery(path, query);
          NEXT_PATH = build.path;
          SHOULD_REDIRECT = true;
        }
      };
      if (typeof options.before === "function") {
        options.before({
          prev: prevRouter,
          next: nextRouter,
          commit: commitChanges,
          redirect: redirectChanges,
        });
      } else {
        commitChanges();
      }
    };
    this.routerHandler = (fromGoMethod?) => {
      // Update IF Changes only
      const { isDiff, prevRouter, nextRouter } = this.getDiff();

      // Router Admin
      if (!fromGoMethod) {
        this.beforeRouter({ prevRouter, nextRouter });
      }
      if (isDiff) {
        // After Router
        if (typeof options.after === "function") {
          options.after({ prev: prevRouter, next: nextRouter });
        }
        // Update Current
        this._current.value = nextRouter;

        // View Admin
        setNextGlobalView(this, { prev: prevRouter, next: nextRouter });
      }
    };
    this.baseURL = fixURL(options.baseURL || "/");
    this.history = options.history || false;
    this._current = signal({});

    // Collect Routes
    this.routes = collectRoutes(options);
    const custom404 = options.routes["404"] || options.routes[404];
    if (custom404) {
      this.page404 = custom404;
      this.routes["404"] = custom404;
      console.log(custom404);
    } else {
      this.page404 = options.page404;
      this.routes["404"] = options.page404;
    }

    // Extra Methods
    this.find = VirtualRouter(this.routes, this.history, this.baseURL);
    this.searchArgs = createSearchParams;

    // Set Handler
    window.onpopstate = () => this.routerHandler();

    // Init Router
    this.routerHandler();
  }

  // NAMESPACES
  get view() {
    return Object.freeze(VIEW_UNQUE_NAMES);
  }

  get views() {
    return CURRENT_VIEW.value;
  }

  getDiff(next?: any) {
    const prevRouter = { ...this._current.value };
    const nextRouter = next ? this.find(next) : this.find();
    const isDiff = checkDiff(prevRouter, nextRouter);
    return { isDiff, prevRouter, nextRouter };
  }

  /**
   * Gets the current route view.
   *
   * @readonly
   * @returns {any | null} - The current route view.
   */
  get current(): any | null {
    return this._current.value;
  }

  /**
   * Computes a value based on the current route.
   *
   * @param {...any} args - Arguments to be passed to the computation function.
   * @returns {any} - The computed value.
   */
  computed(...args: any): any {
    return computed(...args);
  }

  /**
   * Adds an effect to be triggered when the route changes.
   *
   * @param {...any} args - Arguments to be passed to the effect function.
   * @returns {any} - The effect.
   */
  effect(...args: any): any {
    return effect(...args);
  }

  /**
   * Navigates to the specified path and triggers the router handler.
   *
   * @param {string} [path=""] - The path to navigate to.
   * @param {object} [query={}] - The query parameters for the path.
   * @returns {void}
   */
  redirect(
    path: string = "",
    openName: string | boolean = false,
    query: object | any = {}
  ): void {
    const currentPath = pathWithQuery(path, query);
    if (![null, undefined, "", false].includes(openName)) {
      openOrFocusWindow(currentPath, openName);
    } else {
      window.location.href = currentPath;
    }
  }

  keys() {
    return Object.keys(this.routes);
  }

  /**
   * Navigates to the specified path and triggers the router handler.
   *
   * @param {string} [path=""] - The path to navigate to.
   * @param {object} [query={}] - The query parameters for the path.
   * @returns {void}
   */
  go(path: string | null = null, query: object = {}): void {
    const nextPath = path || this.current.route || "/";
    const event = window.event;
    if (event) {
      try {
        event.preventDefault?.();
        event.stopPropagation?.();
        event.stopImmediatePropagation?.();
      } catch (e) {}
    }

    // Clean
    const build: any = this._buildGoQuery(nextPath, query);

    // Change Route
    const { isDiff, prevRouter, nextRouter } = this.getDiff(build.pathDiff);
    this.beforeRouter({ isDiff, prevRouter, nextRouter });
    if ((isDiff && SHOULD_COMMIT) || SHOULD_REDIRECT) {
      if (!SHOULD_REDIRECT) {
        NEXT_PATH = build.path;
      }
      window.history.pushState({}, "", noSuffixSlashURL(NEXT_PATH));
      this.routerHandler(true);
    }
  }

  _buildGoQuery(path: string = "", query: object | any = {}): object {
    let finalPath = "";
    const currentPath = pathWithQuery(path, query);

    // Set Route
    if (this.history) {
      finalPath = noSuffixSlashURL(this.baseURL + currentPath);
    } else {
      finalPath = `${this.baseURL}#` + currentPath;
    }
    return {
      path: finalPath,
      pathDiff: finalPath,
    };
  }
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
  route: string | null;
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
   * The route value in the route response.
   *
   * @type {string | null}
   */
  route: string | null;

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
    this.route = null;

    Object.assign(this, args);
  }
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
  before: (props: {
    next: any;
    prev: any;
    commit: () => any;
    redirect: () => any;
  }) => void;
  after: (props: { next: any; prev: any }) => void;
  history?: boolean;
  baseURL?: string;
  routes?: any;
  page404: any;
  ctx: any;
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
  inputPath = fixURL(inputPath, {
    remove: { prefix: true, suffix: true },
  });
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
  path: string,
  baseURL: string
): RouteResponse {
  // Real
  let currentPath = path;
  if (!currentPath) {
    currentPath = history
      ? window.location.pathname
      : window.location.hash.slice(1);
  }

  const fullPath = window.location.pathname + window.location.hash;

  // Clean
  const cleanPath = removeBaseURL(currentPath, baseURL);

  // Core
  const data = parsePath(cleanPath, routes);
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

  const cleaner = (thePath) =>
    fixURL(thePath, {
      remove: { prefix: true, suffix: true },
    });

  data.route = routeURL(data.path, baseURL);
  data.path = cleaner(fullPath);

  // ROOT VIEW
  const isRootView = checkForRoot(data.route, cleaner(baseURL));
  if (isRootView) {
    data.view = routes["/"];
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
  history: boolean = true,
  baseURL: string = ""
): Function {
  return (path = "") => getPath(routes, history, path, baseURL);
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
