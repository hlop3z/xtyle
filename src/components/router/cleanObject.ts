/**
 * Remove all properties with `null` or `undefined` values from the object
 * @param {object} obj - The object to clean
 * @returns {object} - The cleaned object
 */
export default function cleanObject(obj) {
  const cleanedObject = {};

  for (const key in obj) {
    const value = obj[key];

    // Exclude null, undefined, "null", and "undefined" values
    if (
      value !== null &&
      value !== undefined &&
      String(value) !== "null" &&
      String(value) !== "undefined"
    ) {
      cleanedObject[key] = value;
    }
  }

  return cleanedObject;
}
