const {
  batch,
  signal,
  effect,
  computed,
  useSignal,
  useSignalEffect,
  useComputed,
} = preact;

// Simple JSON DIFF
export function checkDiff(obj1: any, obj2: any) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

export default function Dict(signalType, inObj): any {
  const keys = Array.isArray(inObj) ? inObj : Object.keys(inObj);
  let values = {};

  const isLocal = signalType === "useSignal" ? true : false;

  if (typeof inObj === "object" && inObj !== null) {
    values = inObj;
  } else {
    throw new Error("Invalid input. Expected an array or object.");
  }

  function initDefaultData() {
    const dict = {};
    keys.forEach((key) => {
      let defaultValue = null;
      if (values[key]) {
        defaultValue =
          values[key] instanceof Function ? values[key]() : values[key];
      }
      dict[key] = defaultValue;
    });
    return dict;
  }

  // Create Reactive Signal
  const signalValue = {};

  const defaultData = initDefaultData();
  const trackerItem = isLocal
    ? useSignal({ ...defaultData })
    : signal({ ...defaultData });

  keys.forEach((key) => {
    signalValue[key] = isLocal
      ? useSignal(defaultData[key])
      : signal(defaultData[key]);
  });

  const getDict = (namespace: string | null = null) => {
    if (namespace) return signalValue[namespace].value;
    return keys.reduce((dict, key) => {
      dict[key] = signalValue[key].value;
      return dict;
    }, {});
  };

  // Get
  const getValue = (key) => signalValue[key].value;
  const getKeyValue = () => keys.map((key) => [key, getValue(key)]);
  const setLastValue = (props) => {
    const inputData = {};
    Object.keys(props).forEach((key) => (inputData[key] = props[key]));
    trackerItem.value = inputData;
  };

  // Set
  const setValues = (props, commitLast = true) => {
    batch(() =>
      Object.keys(props).forEach(
        (key) => keys.includes(key) && (signalValue[key].value = props[key])
      )
    );
    if (commitLast) {
      setLastValue(props);
    }
  };

  const resetValues = () => setValues(initDefaultData());

  // For Loops
  const forEachItem = (method) => keys.map((key) => method(key, getValue(key)));
  const forEachValue = (method) => keys.map((key) => method(getValue(key)));
  const forEachKey = (method) =>
    method ? keys.map((key) => method(key)) : keys;

  // Get Diff
  const getDiff = (withID = true) => {
    const current = { ...trackerItem.value };
    const cleanInput: any = {};
    keys.forEach((key) => {
      const value = signalValue[key].value;
      const isDiff = checkDiff(value, current[key]);
      if (isDiff) cleanInput[key] = value;
    });
    if (withID && current.id && Object.keys(cleanInput).length > 0) {
      cleanInput.id = current.id;
    }
    return cleanInput;
  };

  // Final Object
  Object.assign(signalValue, {
    $keys: forEachKey,
    $get: getDict,
    $set: setValues,
    $items: getKeyValue,
    $for: forEachItem,
    $values: forEachValue,
    $reset: resetValues,
    $diff: getDiff,
    $computed: isLocal ? useComputed : computed,
    $effect: isLocal ? useSignalEffect : effect,
    $signalType: signalType,
  });

  Object.defineProperty(signalValue, "$", {
    get: function () {
      return trackerItem.value;
    },
    set: function (args) {
      setLastValue(args);
    },
  });
  return signalValue;
}
