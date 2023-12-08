export default function cleanObject(obj) {
  const cleanedObject = {};

  for (const key in obj) {
    if (
      obj[key] !== null &&
      obj[key] !== undefined &&
      obj[key] !== "null" &&
      obj[key] !== "undefined"
    ) {
      cleanedObject[key] = obj[key];
    }
  }

  return cleanedObject;
}
