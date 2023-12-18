/**
 * Converts a string to Pascal case (each word starts with an uppercase letter without spaces or symbols).
 * @param {string} text - The input string to convert.
 * @returns {string} The Pascal case representation of the input string.
 */
export function stringPascalCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
    .replace(/[^\w-]+/g, "")
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));
}

/**
 * Transforms a string to camelCase.
 * @param {string} input - The input string to transform.
 * @returns {string} - The camelCase string.
 */
export function stringCamelCase(input: string): string {
  return input
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (e, r) =>
      0 == +e ? "" : 0 === r ? e.toLowerCase() : e.toUpperCase()
    )
    .replace(/[^\w]+/g, "")
    .replace(/^\w/, (c) => c.toLowerCase());
}

/**
 * Slugifies a string.
 * @param {string} str - The input string to slugify.
 * @param {boolean} numbers - Whether to include numbers in the slug.
 * @returns {string} - The slugified string.
 */
export function stringSlugify(str: string, numbers: boolean = true): string {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  if (numbers) {
    str = str.replace(/[^a-z0-9 -]/g, "");
  } else {
    str = str.replace(/[^a-z -]/g, "");
  }
  str = str.replace(/\s+/g, "-").replace(/-+/g, "-");
  if (str.startsWith("-")) {
    str = str.slice(1);
  }
  return str;
}

/**
 * Converts a string to lowercase.
 * @param {string} text - The input string to convert.
 * @returns {string} The lowercase representation of the input string.
 */
export function stringLowerCase(text: string): string {
  return text.toLowerCase();
}

/**
 * Converts a string to uppercase.
 * @param {string} text - The input string to convert.
 * @returns {string} The uppercase representation of the input string.
 */
export function stringUpperCase(text: string): string {
  return text.toUpperCase();
}

/**
 * Converts a string to title case (each word starts with an uppercase letter).
 * @param {string} text - The input string to convert.
 * @returns {string} The title case representation of the input string.
 */
export function stringTitleCase(text: string): string {
  return text.toLowerCase().replace(/(^|[\s-_])\S/g, function (t) {
    return t.toUpperCase();
  });
}

/**
 * Snake a string.
 * @param {string} str - The input string to slugify.
 * @param {boolean} numbers - Whether to include numbers in the slug.
 * @returns {string} - The slugified string.
 */
export function stringSnake(str: string, numbers: boolean = true): string {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  if (numbers) {
    str = str.replace(/[^a-z0-9 _]/g, "");
  } else {
    str = str.replace(/[^a-z _]/g, "");
  }
  str = str.replace(/\s+/g, "_").replace(/_+/g, "_");
  if (str.startsWith("_")) {
    str = str.slice(1);
  }
  return str;
}

export function simpleDocs(code) {
  const formattedCode = code.trim().replace(/^(.*)$/gm, " * $1");
  return formattedCode;
}

export const kebabToTitleCase = (text) => {
  const _text = text.replace(/-/g, " "); // Use a global replace to replace all occurrences
  return _text
    .toLowerCase()
    .split(" ")
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
    .join("");
};

/**
 * Object containing methods to convert strings to different formats.
 */
export default {
  camel: stringCamelCase,
  slug: stringSlugify,
  lower: stringLowerCase,
  upper: stringUpperCase,
  title: stringTitleCase,
  pascal: stringPascalCase,
  docs: simpleDocs,
  snake: stringSnake,
  slot: kebabToTitleCase,
  cut: (text, size) => text.substring(0, size),
};
