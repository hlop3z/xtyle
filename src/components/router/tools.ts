import cleanObject from "./cleanObject.ts";

/**
 * Interface for the route parameters in the RouterAPI class.
 */
export interface RouteParams {
  [key: string]: string | undefined;
}

/**
 * Utility object for checking the type of values.
 */
export const valueIs = {
  /**
   * Checks if the value is a dictionary (object).
   */
  dict(value: any): boolean {
    return value && typeof value === "object" && value.constructor === Object;
  },
  /**
   * Checks if the value is a string.
   */
  string(value: any): boolean {
    return typeof value === "string" || value instanceof String;
  },
  /**
   * Checks if the value is a list (array).
   */
  list(value: any): boolean {
    return value && typeof value === "object" && value.constructor === Array;
  },
  /**
   * Checks if the value is a function.
   */
  function(value: any): boolean {
    return typeof value === "function";
  },
};

/**
 * Checks if the provided route is at the root level.
 * @param {string} route - The route to check.
 * @param {string} baseURL - The base URL.
 * @returns {boolean} - True if the route is at the root level, false otherwise.
 */
export function checkForRoot(route: string, baseURL: string): boolean {
  let value = route;
  if (valueIs.string(value)) {
    value = value.replace(/[#\/]/g, "");
  }
  return ["", null, undefined, baseURL].includes(value);
}

/**
 * Checks if two objects are different using JSON.stringify.
 * @param {any} obj1 - The first object.
 * @param {any} obj2 - The second object.
 * @returns {boolean} - True if the objects are different, false otherwise.
 */
export function checkDiff(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

/**
 * Combines a path and query parameters.
 * @param {string} path - The path.
 * @param {RouteParams} query - The query parameters.
 * @returns {string} - The combined path with query parameters.
 */
export function pathWithQuery(path: string, query: RouteParams = {}): string {
  let currentPath = "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    currentPath = path;
  } else {
    currentPath = noSuffixSlashURL(path);
  }
  if (Object.keys(query).length > 0) {
    currentPath += createSearchParams(query);
  }
  return currentPath;
}

/**
 * Extracts search parameters from the path.
 * @param {string} _path - The path containing search parameters.
 * @returns {RouteParams} - The extracted search parameters.
 */
export function extractSearchParams(_path: string): RouteParams {
  const searchParams = new URLSearchParams(_path);
  const obj: RouteParams = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * Creates search parameters from the provided object.
 * @param {any} params - The object containing search parameters.
 * @returns {string} - The search parameters as a string.
 */
export function createSearchParams(params: any): string {
  const query = cleanObject({ ...params });
  const keys: string[] = Object.keys(query || {});
  if (keys.length > 0) {
    const queryString = new URLSearchParams(query).toString();
    return "?" + queryString;
  }
  return "";
}

/**
 * Cleans and formats a URL based on specified options.
 * @param {string} value - The URL to fix.
 * @param {{ prefix?: boolean; suffix?: boolean; remove?: { prefix?: boolean; suffix?: boolean } }} props - Options for fixing the URL.
 * @returns {string} - The fixed URL.
 */
export function fixURL(
  value: string,
  props: {
    prefix?: boolean;
    suffix?: boolean;
    remove?: { prefix?: boolean; suffix?: boolean };
  } = {}
): string {
  const defaultOptions = {
    prefix: true,
    suffix: true,
    remove: { prefix: false, suffix: false },
  };
  const options = { ...defaultOptions, ...props };
  const { prefix, suffix, remove } = options;

  if (typeof value !== "string") {
    throw new Error("Input must be a string");
  }

  const singleSlash = (str: string): string => "/" + str.replace(/\/+/g, "/");
  const prefixSlash = (str: string, ext: string = "/"): string =>
    ext + str.replace(/^\/+/, "");
  const suffixSlash = (str: string, ext: string = "/"): string =>
    str.replace(/\/+$/, "") + ext;

  let output = singleSlash(value);
  if (prefix) {
    output = prefixSlash(output, remove.prefix ? "" : "/");
  }
  if (suffix) {
    output = suffixSlash(output, remove.suffix ? "" : "/");
  }
  return output;
}

/**
 * Removes the suffix slash from a URL.
 * @param {string} url - The URL.
 * @returns {string} - The URL without the suffix slash.
 */
export function noSuffixSlashURL(url: string): string {
  return fixURL(url, { remove: { suffix: true } });
}

/**
 * Removes the base URL from the current path.
 * @param {string} currentPath - The current path.
 * @param {string} baseURL - The base URL.
 * @returns {string} - The cleaned path without the base URL.
 */
export function removeBaseURL(currentPath: string, baseURL: string): string {
  let cleanPath = currentPath;
  if (baseURL !== "/") {
    cleanPath = currentPath.replace(baseURL, "");
  }
  cleanPath = noSuffixSlashURL(cleanPath);
  return cleanPath;
}

/**
 * Formats the route URL by removing the prefix and suffix slashes.
 * @param {string} path - The path.
 * @param {string} baseURL - The base URL.
 * @returns {string} - The formatted route URL.
 */
export function routeURL(path: string, baseURL: string): string {
  return fixURL(removeBaseURL(path, baseURL), {
    remove: { prefix: true, suffix: true },
  });
}

/**
 * Strips prefix and suffix slashes from a URL.
 * @param {string} url - The URL.
 * @returns {string} - The stripped URL.
 */
export function stripSlashURL(url: string): string {
  return fixURL(url, { remove: { prefix: true, suffix: true } });
}

/**
 * Transform the routes config
 * @param {string} url - The URL.
 * @returns {string} - The Clean URL.
 */
export function inputPath(path: string | any): string {
  return checkForRoot(path, "") ? "/" : stripSlashURL(path);
}

/**
 * Collects and formats routes based on the provided options.
 * @param {any} options - The options for collecting routes.
 * @returns {any}
 */
export function collectRoutes(options: any): any {
  let groupedRoutes = {};
  if (Array.isArray(options.routes)) {
    const dict = {};
    options.routes.forEach((urlKey) => {
      dict[inputPath(urlKey)] = null;
    });
    groupedRoutes = dict;
  } else {
    const dict = {};
    Object.keys(options.routes).forEach((urlKey) => {
      dict[inputPath(urlKey)] = options.routes[urlKey];
    });
    groupedRoutes = dict;
  }
  return groupedRoutes;
}
