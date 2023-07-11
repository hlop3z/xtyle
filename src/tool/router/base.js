const BaseViewResponse = (args) => ({
  value: {},
  param: {},
  path: null,
  search: {},
  ...args,
});

function extractSearchParams(_path) {
  const searchParams = new URLSearchParams(_path);
  const obj = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

function createSearchParams(params) {
  if (Object.keys(params || {}).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    return "?" + queryString;
  }
  return "";
}

function parseStringWithDict(path, data) {
  const regex = /{([^}]+)}/g;
  if (path) {
    path = path.replace(/[?*]/g, "");
    return path.replace(regex, (_, match) => data[match] || "");
  }
  return null;
}

function createVanillaJavascriptNavigator(
  routerHandler,
  history = false,
  admin = false
) {
  // Browser Handler
  window.onpopstate = routerHandler;

  // Return Navigator
  return (path = null, query = null) => {
    if (admin) {
      path = admin(path, query);
    }
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

    // Fix Path
    if (!history && !path.startsWith("/")) {
      path = "/" + path;
    }

    // History ?
    if (history) {
      window.history.pushState({}, "", path);
    } else {
      window.history.pushState({}, "", "/#" + path);
    }
    routerHandler();
  };
}
function parsePath(inputPath, routes) {
  if (inputPath === "") inputPath = "/";
  if (inputPath.includes("?")) {
    inputPath = inputPath.split("?")[0];
  }
  for (const pattern in routes) {
    const param = {};
    const regex = pattern.replace(
      /\{(\??)([^/]+?)(\*?)\}/g,
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
      return BaseViewResponse({ value: view, param });
    }
  }
  return BaseViewResponse();
}

const getPath = (routes, history = true, path = null) => {
  let currentPath = path;
  if (!currentPath) {
    currentPath = history
      ? window.location.pathname
      : window.location.hash.slice(1);
  }
  const data = parsePath(currentPath, routes);
  const parts = currentPath.split("?");
  data.path = parts[0];
  const query = parts.length === 2 ? parts[1] : null;
  if (query) {
    data.search = extractSearchParams(query);
  } else {
    data.search = extractSearchParams(window.location.search);
  }
  return data;
};

const Router =
  (routes, history = true) =>
  (path = null) =>
    getPath(routes, history, path);

export default {
  Router,
  Navigator: createVanillaJavascriptNavigator,
  parseStringWithDict,
  parsePath,
  createSearchParams,
};

/*
  @ DEMO (RouterBase)
  
  const patternDictionary = {
    "/": "data1",
    "/a/b/{?key}": "data2",
    "/a/b/key-{name}/{path*}": "data3",
  };
  
  const router = Router(patternDictionary);
  
  // Auto
  console.log(router());
  
  // 1
  console.log(router(""));
  console.log(router("/"));
  
  // 2
  console.log(router("/a/b/"));
  console.log(router("/a/b/etc"));
  
  // 3
  console.log(router("/a/b/key-two/etc"));
  console.log(router("/a/b/key-one/etc/andmore/andmore?q=1"));
  */
