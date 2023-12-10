import deepMerge from "./deepMerge.ts";
import createActions from "../actions/index.tsx";
import { models } from "../store/index.tsx";

// Plugins Routes
export const pluginRouter: any = {
  before: [],
  after: [],
};

// Init Methods
export const afterInit: any = [];
export const beforeInit: any = [];
export let ACTION: any = (params) => params;

ACTION.object = () => {};

const globalActionsDict: any = {};

const mergeActions = (extras) => deepMerge(globalActionsDict, extras);

// Custom Plugins
export function addPlugin(core) {
  return (plugin: any, options: any = {}) =>
    attachPlugin(core, plugin, options);
}

function attachPlugin(core: any, plugin: any, options: any = {}) {
  const config = plugin.install
    ? plugin.install(plugin, options || {}) || {}
    : {};

  // Core
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

  // Actions
  if (config.actions) {
    ACTION = createActions(mergeActions(config.actions));
    ACTION.object = () => ({ ...globalActionsDict });
  }

  // Models
  if (config.models) {
    const subSchema = {};
    Object.entries(config.models).forEach(([key, plugin]: any) => {
      if (plugin.$root) {
        models(plugin);
      } else {
        subSchema[key] = plugin;
      }
    });
    if (Object.keys(subSchema).length > 0) {
      models(subSchema);
    }
    //models(config.models);
  }

  // Router
  if (config.router) {
    // Before
    if (config.router.before) {
      pluginRouter.before.push(config.router.before);
    }
    // After
    if (config.router.after) {
      pluginRouter.after.push(config.router.after);
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
