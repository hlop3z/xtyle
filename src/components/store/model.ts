// can you make this code cleaner, it works perfectly

import { signalX, listX } from "./index.tsx";

let MODELS = {};
const KEYS = new Set();

function modelState(model) {
  return {
    instance: signalX(model),
    objects: listX([]),
    meta: {},
    headers: [],
  };
}

function modelBuilder(options) {
  const useApp = options && options.$root === true;
  const allKeys = Object.keys(options).filter((x) => x !== "$root");
  const modelDict = {};
  if (useApp) {
    allKeys.forEach((name) => {
      modelDict[name] = modelState(options[name]);
      KEYS.add(name);
    });
  } else {
    allKeys.forEach((appName) => {
      const appModels = {};
      Object.entries(options[appName]).forEach(([name, model]) => {
        appModels[name] = modelState(model);
        KEYS.add(`${appName}.${name}`);
      });
      modelDict[appName] = appModels;
    });
  }
  MODELS = { ...MODELS, ...modelDict };
}

modelBuilder.keys = () => [...Array.from(KEYS)];
modelBuilder.get = (key: string): any => {
  return key.split(".").reduce((o, i) => {
    if (o) return o[i];
  }, MODELS);
};

export default modelBuilder;
