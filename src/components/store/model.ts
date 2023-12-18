const { signal } = preact;

// listX
import { signalX } from "./index.tsx";

let MODELS = {};
const KEYS = new Set();
/*
const FakeModelState = {
  instance: {},
  objects: { value: [] },
};
*/
function modelState(model, objName, uriName) {
  return {
    model: objName,
    namespace: uriName,
    instance: signalX(model),
    objects: signal([]),
  };
}

function modelBuilder(options, coreSetup) {
  const isRoot = options && options.$root === true;
  const allModels = Object.keys(options).filter(
    (x) => !["$root", "$ref"].includes(x)
  );
  const nameRef = (coreSetup || {}).$ref || {};
  const modelDict = {};
  if (isRoot) {
    allModels.forEach((uriName) => {
      const objName = nameRef[uriName] || uriName;
      modelDict[uriName] = modelState(options[uriName], objName, uriName);
      KEYS.add(uriName);
    });
  } else {
    allModels.forEach((appName) => {
      const appModels = {};
      Object.entries(options[appName]).forEach(([name, model]) => {
        const uriName = `${appName}.${name}`;
        const objName = nameRef[uriName] || name;
        appModels[name] = modelState(model, objName, uriName);
        KEYS.add(uriName);
      });
      modelDict[appName] = appModels;
    });
  }
  MODELS = { ...MODELS, ...modelDict };
}

export function createModels({ models }) {
  const subSchema = {};
  Object.entries(models).forEach(([key, plugin]: any) => {
    if (plugin.$root) {
      modelBuilder(plugin, models);
    } else {
      subSchema[key] = plugin;
    }
  });
  if (Object.keys(subSchema).length > 0) {
    modelBuilder(subSchema, models);
  }
}

export default {
  keys() {
    return [...Array.from(KEYS)];
  },
  get(key: string) {
    key = key || "";
    const found = key.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, MODELS);
    //if (!found) return FakeModelState;
    return found;
  },
};
