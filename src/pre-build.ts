// Tools
export { default as actions } from "./components/actions/index.tsx";
export { default as api } from "./components/api/index.tsx";
export { default as arrayPage } from "./components/arrayPage/index.tsx";
export { default as build } from "./components/build/index.tsx";
export { default as slot } from "./components/slot/index.tsx";
export { default as string } from "./components/string/index.tsx";
export { default as stringTo } from "./components/stringTo/index.tsx";
export { default as theme } from "./components/theme/index.tsx";
export { default as useRef } from "./components/useRef/index.tsx";
export { default as util } from "./components/util/index.tsx";
export { default as validator } from "./components/validator/index.tsx";
export { default as timer } from "./components/timer/index.tsx";

// Actions
export { ACTION as action } from "./components/use/index.tsx";

// Store
export { device } from "./components/store/index.tsx";
export { listX as list } from "./components/store/index.tsx";
export { setX as set } from "./components/store/index.tsx";
export { signalX as dict } from "./components/store/index.tsx";
export { useListX as useList } from "./components/store/index.tsx";
export { useSetX as useSet } from "./components/store/index.tsx";
export { useSignalX as useDict } from "./components/store/index.tsx";
export { models as models } from "./components/store/index.tsx";

// (i18n) Translations
import i18nAdmin from "./components/i18n/index.tsx";

// @ts-ignore
export let i18n = (param: any) => undefined; // over-written by setting up translations
export const translations = (obj: any) => {
  i18n = i18nAdmin(obj);
};

// Core (Exports)
export {
  Base as base,
  allProps as global,
  allStates as store,
  allComponents,
  allDirectives,
} from "./components/base/index.tsx";

// Library Wrapper
import * as Core from "./components/base/index.tsx";

// Plugins
import { addPlugin } from "./components/use/index.tsx";

export const use = addPlugin(Core);

// Tool Wrappers
export const h = Core.h;
export const element = Core.element;
export const directive = Core.directive;

// Router
let router: any = {};
import ROUTER from "./components/router/index.tsx";

export const Router = (args: any) => {
  if (Object.keys(router).length === 0) {
    router = ROUTER(args);
  }
  return router;
};

// Export router separately if needed
export { router };

// INIT
import AppINIT from "./components/init/index.tsx";
export const init = AppINIT(Router);

import attachView from "./components/view/index.tsx";
export const view = attachView({
  get: () => router,
});
