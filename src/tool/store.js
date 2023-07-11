const { signal, effect, computed, useSignal, useSignalEffect, useComputed } =
  preact.signals;

const getObjectType = (input) => {
  if (typeof input === "object") {
    if (Array.isArray(input)) {
      return Array;
    } else {
      return Object;
    }
  }
  return null;
};
function valueState(value, isLocal = true) {
  /**
   * Single Value
   * @param {any} value Default Value
   */
  const objType = getObjectType(value);
  const objState = isLocal ? useSignal(value) : signal(value);
  objState.update = (newValue) => {
    if (objType === Array) {
      let data = [...objState.value];
      newValue(data);
      objState.value = data;
    } else if (objType === Object) {
      let data = { ...objState.value };
      newValue(data);
      objState.value = data;
    } else {
      objState.value = newValue;
    }
  };
  // Tools
  objState.computed = isLocal ? useComputed : computed;
  objState.effect = isLocal ? useSignalEffect : effect;
  objState.reset = () => (objState.value = value);
  return objState;
}

const statePlugin = {
  useSignal: valueState,
  signal: (base) => valueState(base, false),
};

export default statePlugin;
