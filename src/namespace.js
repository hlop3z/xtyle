import reactive from "./reactive.js";
import { globalComponents } from "./vnode";
import { randomUUID } from ".";

const GLOBAL_EVENT = "xtyleGlobalsUpdate";

export const globalVars = {
  __keys__: new Set(),
};

function dispatchUpdate(namespace) {
  let event = new CustomEvent(GLOBAL_EVENT, {
    detail: { namespace: namespace },
  });
  window.dispatchEvent(event);
}
window.addEventListener(GLOBAL_EVENT, (event) => {
  const { namespace } = event.detail;
  Object.keys(globalComponents).forEach((key) => {
    const { follows, method } = globalComponents[key];
    if (follows.has(namespace)) {
      method();
    }
  });
});

export class SimpleNamespace {
  constructor(name, reactObject) {
    if (globalVars.hasOwnProperty(name)) {
      console.error(`${name} | has already been declared`);
    } else {
      const defaultValue = { ...reactObject };
      this.$original = defaultValue;
      this.$current = defaultValue;
      this.$namespace = name;
      const dict = this;
      globalVars.__keys__.add(name);
      Object.defineProperty(globalVars, name, {
        get: () => {
          return dict;
        },
      });
    }
  }

  get key() {
    return this.$namespace;
  }

  get state() {
    return this.$current;
  }

  set state(method) {
    this.update(method);
  }

  update(method) {
    const { data, update } = reactive.produce(this.$current, method);
    if (update) {
      this.$current = data;
      dispatchUpdate(this.$namespace);
    }
    return update;
  }

  reset() {
    this.$current = this.$original;
    dispatchUpdate(this.$namespace);
  }
}

function namespace(name, originalData) {
  return new SimpleNamespace(name, originalData);
}

function uniqueID() {
  let key = null;
  do {
    key = randomUUID();
  } while (globalVars.hasOwnProperty(key) && key === null);
  return key;
}

export function dict(originalData) {
  const ID = uniqueID();
  return new SimpleNamespace(ID, originalData);
}

export default namespace;
