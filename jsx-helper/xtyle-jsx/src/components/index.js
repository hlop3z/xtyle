const requireModule = import.meta.globEager("./**/**.jsx");

function camelCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (e, r) =>
      0 == +e ? "" : 0 === r ? e.toLowerCase() : e.toUpperCase()
    )
    .replace(/[^\w]+/g, "");
}

function getModules(modules, clean = "(^./|.jsx)") {
  const items = {};
  Object.keys(modules).forEach((filename) => {
    // Module Name
    const moduleName = filename
      .replace(new RegExp(clean, "g"), "")
      .replace(/^\w/, (c) => c.toLowerCase());
    // The Module
    const moduleDefault = modules[filename].default || modules[filename];
    // Attach
    items[camelCase(moduleName)] = xtyle.dom(moduleDefault);
  });
  return items;
}

export default getModules(requireModule);
