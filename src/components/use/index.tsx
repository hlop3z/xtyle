// Plugins Routes
export const pluginRouter: any = {
  routes: new Set(),
  before: [],
  after: [],
};

// Init Methods
export const afterInit: any = [];
export const beforeInit: any = [];

// Custom Plugins
export function addPlugin(core) {
  return (plugin: any, options: any = {}) =>
    attachPlugin(core, plugin, options);
}

function attachPlugin(core: any, plugin: any, options: any = {}) {
  const config = plugin.install
    ? plugin.install(plugin, options || {}) || {}
    : {};
  if (config.elements) {
    Object.keys(config.elements).forEach((key) => {
      core.element(key)(config.elements[key]);
    });
  }
  if (config.directives) {
    Object.keys(config.directives).forEach((key) => {
      core.directive(key)(config.directives[key]);
    });
  }
  if (config.globals) {
    core.globalProps(config.globals);
  }
  if (config.store) {
    core.globalStore(config.store);
  }
  if (config.router) {
    // Before
    if (config.router.before) {
      pluginRouter.before.push(config.router.before);
    }
    // After
    if (config.router.after) {
      pluginRouter.after.push(config.router.after);
    }
    // Routes
    if (config.router.routes) {
      config.router.routes.forEach((key) => {
        pluginRouter.routes.add(key);
      });
    }
  }
  if (config.init) {
    if (config.init.before && Array.isArray(config.init.before)) {
      beforeInit.push(...config.init.before);
    }
    if (config.init.after && Array.isArray(config.init.after)) {
      afterInit.push(...config.init.after);
    }
  }
}

export default attachPlugin;
