// @ts-nocheck

// Tools
export { device } from "./store";
export { useSignalXtyle as useSignal } from "./store";
export { signalXtyle as signal } from "./store";
export { stringTo } from "./core";
export { default as util } from "./core";
export { default as router } from "./components/router/index.tsx";
export { default as model } from "./components/model/index.tsx";

// Core
import App, { allComponents, allDirectives } from "./components/base/index.tsx";
export { Base as base } from "./components/base/index.tsx";

export { allComponents, allDirectives };

export const h = (...args: any) => App.h(...args);
export const element = (...args: any) => App.element(...args);
export const directive = (...args: any) => App.directive(...args);

export const use = (options: any = {}) => {
  const config = options || {};
  if (config.elements) {
    Object.keys(config.elements).forEach((key) => {
      element(key)(config.elements[key]);
    });
  }
  if (config.directives) {
    Object.keys(config.directives).forEach((key) => {
      directive(key)(config.directives[key]);
    });
  }
};

export const build = (options: any = {}, title: string = null) => {
  function pascalToKebab(str: string) {
    return str
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Convert uppercase letters to kebab-case
      .toLowerCase(); // Convert the whole string to lowercase
  }
  const dict = {};
  Object.keys(options).forEach((key) => {
    const name = (title ? `${title}-` : "") + pascalToKebab(key);
    dict[name] = options[key];
  });
  return dict;
};
