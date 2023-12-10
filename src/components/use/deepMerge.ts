export default function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && !(source[key] instanceof Function)) {
      // If the key is an object, recursively merge
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      // Otherwise, assign the value to the target
      target[key] = source[key];
    }
  }
  return target;
}
