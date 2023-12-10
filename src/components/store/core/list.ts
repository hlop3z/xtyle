/**
 * Import statements for signals and hooks from preact library
 */
const { signal, effect, computed, useSignal, useSignalEffect, useComputed } =
  preact;

export const list = (type, inObj) => new List(type, false, inObj);
export const set = (type, inObj) => new List(type, true, inObj);

const convertToSet = (data) => [...Array.from(new Set(data))];

class List {
  private _isSet: any;
  private _defaultValue: any;
  private _state: any;
  private _last: any;
  computed: any;
  effect: any;
  signalType: any;
  constructor(signalType, isSet, defaultValue?) {
    const __default = defaultValue || [];
    const isLocal = signalType === "useSignal" ? true : false;
    this._isSet = isSet;
    this._defaultValue = __default;
    this._state = isLocal ? useSignal(__default) : signal(__default);
    this._last = isLocal ? useSignal(__default) : signal(__default);
    this.computed = isLocal ? useComputed : computed;
    this.effect = isLocal ? useSignalEffect : effect;
    this.signalType = signalType;
  }
  get value() {
    return this._state.value;
  }
  set value(newValue) {
    this.last = this._state.value;
    this._state.value = this._convertToSet(newValue);
  }
  get last() {
    return this._last.value;
  }
  set last(newValue) {
    this._last.value = this._convertToSet(newValue);
  }
  diff(identifier = "id") {
    if (this._isSet) {
      const oldArray = [...this.last];
      const newArray = [...this.value];
      return newArray.filter((item) => !oldArray.includes(item));
    }
    return findChangedObjects([...this.last], [...this.value], identifier);
  }
  reset() {
    this._state.value = this._defaultValue;
    this.last = [];
  }
  update(method) {
    const updateList = [...this.value];
    method(updateList);
    this.value = this._convertToSet(updateList);
  }
  _convertToSet(newValue) {
    return this._isSet ? convertToSet(newValue) : newValue;
  }
}

function findChangedObjects(oldArray, newArray, identifier = "id") {
  const changedArray: any = [];

  newArray.forEach((row) => {
    const found = oldArray.find((item) => item[identifier] === row[identifier]);
    if (!found) {
      changedArray.push(row);
    } else {
      const hasChanges = Object.keys(found).some(
        (key) => found[key] !== row[key]
      );
      if (hasChanges) {
        changedArray.push(row);
      }
    }
  });

  return changedArray;
}
