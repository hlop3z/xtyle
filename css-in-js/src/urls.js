function fixURL(path) {
  path = "/" + path.replace(/^\/|\/$/g, "") + "/";
  return path;
}

function extractParams(_template, _path) {
  const template = fixURL(_template);
  const path = fixURL(_path);
  let regexp = new RegExp(template.replace(/{(.*?)}/g, "([^/]+)"));
  let match = path.match(regexp);
  let params = {};
  if (match) {
    template.match(/{(.*?)}/g).forEach((key, i) => {
      params[key.slice(1, -1)] = match[i + 1];
    });
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

const template = "/mypath/id-{key1}-{key2}/{key3}";
const path = "mypath/id-one-two/three";
const params = extractParams(template, path);
console.log(params);
console.log(validPath(template, path));
