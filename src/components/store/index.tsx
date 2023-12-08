//@ts-nocheck

/**
 * Import statements for signals and hooks from preact library
 */
const {
  batch,
  signal,
  effect,
  computed,
  useSignal,
  useSignalEffect,
  useComputed,
} = preact;

/**
 * Creates a single value state with local reactivity.
 * @type {Function}
 */
export const useSignalXtyle: Function = (inObj: any) =>
  createForm("useSignal", inObj);

/**
 * Creates a single value state with global reactivity.
 * @type {Function}
 */
export const signalXtyle: Function = (inObj: any) =>
  createForm("signal", inObj);

/**
 * Signal for window size
 */
export const device: any = signal({
  x: window.innerWidth,
  y: window.innerHeight,
});

function createForm(signalType, inObj): any {
  const keys = Array.isArray(inObj) ? inObj : Object.keys(inObj);
  const outForm = {};
  let values = {};
  const isLocal = signalType === "useSignal" ? true : false;

  if (typeof inObj === "object" && inObj !== null) {
    values = inObj;
  } else {
    throw new Error("Invalid input. Expected an array or object.");
  }

  keys.forEach((key) => {
    let defaultValue = null;
    if (values[key]) {
      defaultValue =
        values[key] instanceof Function ? values[key]() : values[key];
    }
    outForm[key] = isLocal ? useSignal(defaultValue) : signal(defaultValue);
  });

  const getDict = () =>
    keys.reduce((dict, key) => {
      dict[key] = outForm[key].value;
      return dict;
    }, {});

  const setValues = (props) =>
    batch(() =>
      Object.keys(props).forEach(
        (key) => keys.includes(key) && (outForm[key].value = props[key])
      )
    );

  const resetValues = () => {
    const dict = {};
    keys.forEach((key) => {
      let defaultValue = null;
      if (values[key]) {
        defaultValue =
          values[key] instanceof Function ? values[key]() : values[key];
      }
      dict[key] = defaultValue;
    });
    setValues(dict);
  };

  const getItems = () => keys.map((key) => [key, outForm[key].value]);

  const forEachItem = (method) =>
    getItems().map(([key, value]) => method(key, value));

  const forEachValue = (method) =>
    getItems().map(([key, value]) => method(value));

  const forEachKeyBase = (method) => keys.map((key) => method(key));
  const forEachKey = (method = null) =>
    method ? forEachKeyBase(method) : keys;

  Object.assign(outForm, {
    $keys: forEachKey,
    $get: getDict,
    $set: setValues,
    $items: getItems,
    $for: forEachItem,
    $values: forEachValue,
    $reset: resetValues,
    $computed: isLocal ? useComputed : computed,
    $effect: isLocal ? useSignalEffect : effect,
    $signalType: signalType,
  });

  return outForm;
}

// Window resize event listener
window.addEventListener("resize", () => {
  device.value = {
    x: window.innerWidth,
    y: window.innerHeight,
  };
});

export default {};
