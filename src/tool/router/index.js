import RouterBase from "./base";
import lazyLoadScript from "./lazyLoad";
const { signal } = preact.signals;

const RouterAdmin = signal({});

const collectReactRouters = (props) => {
  const hold = {};
  if (props.children) {
    if (!Array.isArray(props.children)) props.children = [props.children];
    props.children.forEach((el) => {
      const childProps = el.props || {};
      if (childProps.path) {
        hold[el.props.path] = {
          path: el.props.path,
          name: el.props.name,
          view: () => el.props.children,
        };
      }
    });
  }
  return hold;
};

function reactRouter(props) {
  let routes = {};
  let routesByName = {};
  const withRoutes = props.routes ? true : false;
  if (withRoutes) {
    props.routes.forEach((item) => {
      routes[item.path] = item;
      if (item.name) {
        routesByName[item.name] = item;
      }
    });
  } else {
    if (props) {
      routes = collectReactRouters(props);
      Object.entries(routes).map(([key, config]) => {
        if (config.name) {
          routesByName[config.name] = config;
        }
      });
    }
  }
  const admin = {
    routes,
    routesByName,
  };
  const filterPathBase = (path) => {
    const isText = typeof path === "string";
    let pathURL = "/";
    if (isText) {
      pathURL = path;
    } else if (!isText && path.name) {
      pathURL = admin.routesByName[path.name].path;
    } else if (!isText && path.path) {
      pathURL = RouterBase.parsePath(path.path, admin.routes).value.path;
    }
    return pathURL;
  };

  admin.path = (request, query = null) => {
    const path = filterPathBase(request);
    let current = null;
    if (typeof request === "string") {
      current = path;
    } else if (typeof request === "object") {
      current = request.path;
      if (request.args) {
        let realPath = RouterBase.parseStringWithDict(path, request.args);
        current = realPath;
      }
    }
    if (query) {
      current += RouterBase.createSearchParams(query);
    }
    return current;
  };

  const router = RouterBase.Router(admin.routes, props.history ? true : false);

  admin.$router = (request = null, query = null) => {
    if (request) {
      const url = admin.path(request, query);
      return router(url);
    }
    return router();
  };
  return admin;
}

let singleView = null;

function Router(props) {
  // INIT
  // props (history, routes, after, before)
  const admin = reactRouter(props);
  Router.__history__ = props.history ? true : false;
  Router.$path = admin.path;
  Router.$info = admin.$router;
  Router.__key__ = lazyLoadScript.key;

  const afterRouter = (nextView) => {
    if (props.after) props.after(nextView);
  };
  const beforeRouter = (nextView) => {
    if (props.before) props.before(nextView);
  };
  Router.init = async () => {
    const { useState } = preact;
    const [current, setCurrent] = useState(admin.$router());

    // Update Current
    const routerHandler = () => {
      //setIsLoaded(false);
      const nextPage = admin.$router();
      const setNext = () => setCurrent(nextPage);
      const redirect = (...args) => {
        const _nextPage = admin.$router(...args);
        setCurrent(_nextPage);
        let _nextSearch = RouterBase.createSearchParams(_nextPage.search);
        if (!Router.__history__) {
          _nextSearch = "/#" + _nextPage.path + _nextSearch;
        } else {
          _nextSearch = _nextPage.path + _nextSearch;
        }
        window.history.pushState({}, "", _nextSearch);
      };

      if (
        current.path !== nextPage.path ||
        JSON.stringify(current.search) !== JSON.stringify(nextPage.search)
      ) {
        if (props.before) {
          beforeRouter({
            from: current,
            to: nextPage,
            next: setNext,
            redirect: redirect,
          });
        } else {
          setNext();
        }
        afterRouter({ from: current, to: nextPage });
      }
    };

    // Handle Current
    let currentView = null;
    if (typeof current.value.view === "string") {
      const nextView = await lazyLoadScript(current.value.view);
      if (nextView) {
        currentView = nextView();
      }
    } else if (typeof current.value.view === "function") {
      currentView = current.value.view();
    }

    // Create Navigator
    Router.go = RouterBase.Navigator(routerHandler, props.history, admin.path);
    Router.$path = admin.path;
    // Global admin
    RouterAdmin.value = current;

    singleView = currentView;
    return currentView || null;
  };

  Router.view = () => {
    Router.init();
    return singleView;
  };
}

Router.go = () => null;
Router.view = () => null;
Router.link = (props) => {
  const params = {};
  if (props.name) {
    params.name = props.name;
  } else {
    params.path = props.path;
  }
  if (props.args) {
    params.args = props.args;
  }
  let theLink = props.path;
  if (props.name && props.args) {
    theLink = Router.$path(params, props.query);
  } else if (props.query) {
    theLink = Router.$path(props.path, props.query);
  }
  if (!Router.__history__) theLink = "/#" + theLink;
  return h(
    "a",
    { href: theLink, class: props.class, style: props.style },
    props.children
  );
};

Object.defineProperty(Router, "current", {
  get: function () {
    return RouterAdmin.value;
  },
});

export default Router;
