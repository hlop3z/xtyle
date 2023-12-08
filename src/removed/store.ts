/**
 * Import statements for signals and hooks from preact library
 */
const { signal, effect, computed, useSignal, useSignalEffect, useComputed } =
  preact;

/**
 * Type representing either an Array, object, or null.
 */
type ObjectType = Array<any> | object | null;

/**
 * Determines the type of the input (Array, Object, or null).
 * @param input - The value to be checked.
 * @returns {ObjectType} - The type of the input.
 */
const getObjectType = (input: any): ObjectType => {
  if (typeof input === "object") {
    if (Array.isArray(input)) {
      return Array;
    } else {
      return Object;
    }
  }
  return null;
};

/**
 * Creates a single value state with optional reactivity (local/global).
 * @param {any} value - Default value.
 * @param {boolean} isLocal - Whether the state should be local or global (default is local).
 * @returns {Object} - The state object with reactive capabilities.
 */
function valueState(value: any, isLocal: boolean = true): object {
  const objType = getObjectType(value);
  const objState = isLocal ? useSignal(value) : signal(value);
  /**
   * Updates the state's value using a callback function.
   * @param {Function} newValue - A function to update the state's value based on the current value.
   */
  objState.update = (newValue: any) => {
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
  /**
   * A tool to create a computed value based on the state.
   * @type {Function}
   */
  objState.computed = isLocal ? useComputed : computed;
  /**
   * A tool to create an effect based on the state.
   * @type {Function}
   */
  objState.effect = isLocal ? useSignalEffect : effect;
  /**
   * Resets the state to its initial value.
   */
  objState.reset = () => (objState.value = value);
  return objState;
}

/**
 * Creates a single value state with local reactivity.
 * @type {Function}
 */
export const useSignalXtyle: Function = valueState;

/**
 * Creates a single value state with global reactivity.
 * @type {Function}
 */
export const signalXtyle: Function = (base: any) => valueState(base, false);

/**
 * Signal for window size
 */
export const device: any = signal({
  x: window.innerWidth,
  y: window.innerHeight,
});

// Window resize event listener
window.addEventListener("resize", () => {
  device.value = {
    x: window.innerWidth,
    y: window.innerHeight,
  };
});
