import component from "./component.js";
import { buildComponents } from "./component.js";
import namespace from "./namespace.js";

window.$____XPRIVATEDICTX____$ = {
  router: {},
  components: {},
  static: {},
  methods: {},
  vars: {},
  current: null,
};
const GLOBALS = window.$____XPRIVATEDICTX____$;

const Page404 = component({
  props: {
    title: {
      type: String,
      default: "Oops!",
    },
  },
  view() {
    return [
      "div",
      {
        style: "text-align: center",
      },
      [
        [
          "h1",
          {
            style: "font-size: 8.5em",
          },
          [this.title],
        ],
        ["h3", {}, "404 | Page not Found."],
      ],
    ];
  },
});

function fixURL(path) {
  path = "/" + path.replace(/^\/|\/$/g, "") + "/";
  return path;
}

function extractSearchParams(_path) {
  const searchParams = new URLSearchParams(_path);
  const obj = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

function extractPathArgs(_template, _path) {
  const template = fixURL(_template);
  const path = fixURL(_path);
  let regexp = new RegExp(template.replace(/{(.*?)}/g, "([^/]+)"));
  let match = path.match(regexp);
  let params = {};
  if (match) {
    const found = template.match(/{(.*?)}/g);
    if (found) {
      found.forEach((key, i) => {
        params[key.slice(1, -1)] = match[i + 1];
      });
    }
  }
  return params;
}

function validPath(_template, _path) {
  const template = fixURL(_template);
  const path = fixURL(_path);
  let regexp = new RegExp("^" + template.replace(/{(.*?)}/g, "([^/]+)") + "$");
  return regexp.test(path);
}

function getPathRoute(routes, currentPath) {
  const found = Object.keys(routes).filter((route) =>
    validPath(route, currentPath)
  );
  if (found.length > 0) {
    return found[0];
  }
  return "404";
}

function mountRouter(setup) {
  const options = setup ? setup : {};
  let root = options.root ? options.root : "#app";
  let history = options.history ? options.history : false;
  let routes = options.routes ? options.routes : {};
  let appComponents = options.components ? options.components : [];
  let appMethods = options.methods ? options.methods : {};
  let appStatic = options.static ? options.static : {};
  let appVars = options.vars ? options.vars : {};

  let vdom = null;
  let route = null;
  let routerPath = null;
  let currentPath = null;
  let pathParams = {};
  let searchQuery = {};

  if (!history) {
    if (!window.location.hash) window.location.hash = "/";
  }

  // Router Go
  const navigate = (path) => {
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
    if (history) {
      window.history.pushState({}, "", path);
    } else {
      window.location.hash = path;
    }
    handleLocation();
  };

  async function handleLocation() {
    // Get Path
    currentPath = history
      ? window.location.pathname
      : window.location.hash.slice(1);

    // Get Route
    routerPath = getPathRoute(routes, currentPath);
    const splitPath = currentPath.split("?");
    pathParams = extractPathArgs(routerPath, splitPath[0]);
    if (splitPath.length > 1) {
      searchQuery = extractSearchParams(splitPath[1]);
    }
    route = routes[routerPath] || routes[404] || Page404;

    if (vdom) {
      vdom.unmount();
    }
    // Mount
    if (route) {
      vdom = route();
      vdom.mount(root);
      GLOBALS.current = vdom;
    }
  }

  function reDraw() {
    // Re-Create Current
    vdom.render();
  }

  // Attach Method
  window.onpopstate = handleLocation;

  // Admin
  const routerAdmin = {
    go: (path) => navigate(path),
    redraw: () => reDraw(),
  };

  // Current
  Object.defineProperty(routerAdmin, "current", {
    get: function () {
      return Object.freeze({
        route: routerPath,
        path: currentPath,
        args: pathParams,
        query: searchQuery,
      });
    },
  });

  // Register
  GLOBALS.components = buildComponents(appComponents);
  GLOBALS.router = routerAdmin;
  GLOBALS.methods = appMethods;
  GLOBALS.static = appStatic;
  // appVars
  GLOBALS.vars = appVars;
  Object.keys(appVars).forEach((key) => {
    GLOBALS.vars[key] = namespace(key, appVars[key]);
  });

  // Init
  handleLocation();

  return window.$____XPRIVATEDICTX____$;
}

export default mountRouter;
