// import h from "./hyperscript";
import dom from "./vnode";
import reactive from "./reactive";
import ripple from "./ripple";
import namespace, { globalVars, dict } from "./namespace";
import { inject } from "./ripple";

function camelCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (e, r) =>
      0 == +e ? "" : 0 === r ? e.toLowerCase() : e.toUpperCase()
    )
    .replace(/[^\w]+/g, "");
}

function mountToRoot(root, vnode) {
  let parentNode = root;
  if ("string" === typeof root) {
    parentNode = document.querySelector(root);
  }
  if (parentNode && vnode) {
    while (parentNode.firstChild) {
      parentNode.firstChild.remove();
    }
    parentNode.appendChild(vnode);
  }
  return parentNode;
}

export const ROUTER_KEY = "______xtyle-view-display-active-element______";

const ALL_EVENTS = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "contextmenu",
  "mouseout",
  "mousewheel",
  "mouseover",
  "touchstart",
  "touchend",
  "touchmove",
  "touchcancel",
  "keydown",
  "keyup",
  "keypress",
  "focus",
  "blur",
  "change",
  "input",
  "submit",
  "resize",
  "scroll",
  "hashchange",
];

window.x = function x(...args) {
  const [tag, attrs, ...children] = args;
  return [tag, attrs ? attrs : {}, children];
};

export const randomUUID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

// window.$____XPRIVATEDICTX____$
export const PrivateGlobalDict = {
  directives: {
    on(vnode, key, value) {
      const current = vnode.vdom ? vnode.vdom : vnode;
      if (ALL_EVENTS.includes(key)) {
        current.addEventListener(key, value);
      }
    },
    ripple(vnode, value) {
      const current = vnode.vdom ? vnode.vdom : vnode;
      ripple(current, value);
    },
  },
  components: {},
  methods: {},
  ctx: {},
  val: globalVars,
  router: null,
};

/*
  @ Application
*/

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

const Page404 = dom({
  props: {
    title: "Oops",
  },
  slot: {
    default() {
      const { title } = this.state;
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
            [title],
          ],
          ["h3", {}, ["404 | Page not Found."]],
        ],
      ];
    },
  },
});

class App {
  constructor(setup) {
    this.$setup = setup ? setup : {};
  }
  use(plugin, options = {}) {
    if (plugin.install) {
      const mixin = (options) => {
        this.$setup = { ...this.$setup, ...options };
      };
      plugin.install(mixin, options);
    }
  }
  mount(root = "#app") {
    // App Core
    const options = this.$setup;
    let history = options.history ? options.history : false;
    let reactive = options.reactive ? options.reactive : true;
    let routes = options.routes ? options.routes : {};
    let AppComponent = options.app ? dom(options.app) : null;

    // App Tools
    let appComponents = options.components ? options.components : [];
    let appMethods = options.methods ? options.methods : {};
    let appStatic = options.ctx ? options.ctx : {};
    let appVars = options.val ? options.val : {};
    let appDirectives = options.directives ? options.directives : {};

    let vdom = null; //Allow Re-Render from Outside
    let currentView = null;
    let routerPath = null;
    let currentPath = null;
    let pathParams = {};
    let searchQuery = {};

    if (!history) {
      if (!window.location.hash) window.location.hash = "/";
    }

    //console.log(options);
    Object.entries(routes).forEach(([key, component]) => {
      routes[key] = dom(component);
    });

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
      routerHandler();
      window.onpopstate = routerHandler;
    };

    // Main Handler
    async function routerHandler() {
      // Get Path
      currentPath = history
        ? window.location.pathname
        : window.location.hash.slice(1);

      // Get Route
      routerPath = getPathRoute(routes, currentPath);
      const splitPath = currentPath.split("?");
      pathParams = extractPathArgs(routerPath, splitPath[0]);
      if (splitPath.length > 1) {
        searchQuery = extractSearchParams("?" + splitPath[1]);
      }
      currentView = routes[routerPath] || routes[404] || Page404;

      PrivateGlobalDict.router = {
        route: routerPath,
        path: currentPath,
        args: pathParams,
        query: searchQuery,
        go(path) {
          navigate(path);
        },
      };
      // Mount | App
      if (reactive) {
        vdom = AppComponent()();
        mountToRoot(root, vdom.vdom);
      } else if (!vdom) {
        vdom = AppComponent()();
        vdom.mount(root);
      }

      // Mount | Current Route
      if (currentView) {
        const routerElement = document.querySelector("#" + ROUTER_KEY);
        const routerView = currentView()();
        mountToRoot(routerElement, routerView.vdom);
      }
    }

    /*
      @ Register Globals
    */

    // Components
    const allComponents = {};
    appComponents.map((item) => {
      allComponents[camelCase(item.name)] = dom(item);
    });
    PrivateGlobalDict.components = allComponents;

    // Namespaced Vars
    Object.keys(appVars).forEach((key) => {
      namespace(key, appVars[key]);
    });

    // Static Vars
    PrivateGlobalDict.ctx = Object.freeze(appStatic);

    // Directives
    PrivateGlobalDict.directives = {
      ...appDirectives,
      ...PrivateGlobalDict.directives,
    };

    // Methods
    Object.keys(appMethods).forEach((key) => {
      appMethods[key] = appMethods[key].bind(PrivateGlobalDict);
    });
    PrivateGlobalDict.methods = Object.freeze(appMethods);

    /*
      @ Start Router
    */
    routerHandler();
    window.redraw = routerHandler;
  }
}

function createApp(setup) {
  return new App(setup);
}

export default {
  dom,
  ...reactive,
  namespace,
  dict,
  inject,
  app: createApp,
};
