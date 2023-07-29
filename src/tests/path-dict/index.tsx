/**
 * Represents a hierarchical path dictionary with corresponding values.
 */
type Options = Record<string, any>;

/**
 * Class to manage a path dictionary with hierarchical keys and corresponding values.
 */
class PathDict {
  private options: Options;

  /**
   * Creates an instance of `PathDict`.
   * @param {Options} options - An optional object representing the initial path dictionary values.
   */
  constructor(options: Options = {}) {
    this.options = options;
  }

  /**
   * Retrieves the value associated with a specific key in the path dictionary.
   * @param {string} key - A dot-separated string representing the hierarchical path to the desired value.
   * @returns {any} - The value associated with the provided key.
   */
  ["get"](key: string): any {
    return key.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, this.options);
  }

  /**
   * Sets or updates the value associated with a specific key in the path dictionary.
   * @param {string} key - A dot-separated string representing the hierarchical path where the value should be stored.
   * @param {any} value - The value to be stored in the path dictionary.
   */
  ["set"](key: string, value: any): void {
    const keys = key.split(".");
    const lastKey = keys.pop();
    let obj: Options = this.options;

    keys.forEach((k) => {
      if (obj[k] === undefined) {
        obj[k] = {};
      }
      obj = obj[k];
    });

    if (lastKey !== undefined) {
      obj[lastKey] = value;
    }
  }

  /**
   * Retrieves the entire path dictionary.
   * @returns {Options} - An object containing all keys and their corresponding values in the path dictionary.
   */
  ["all"](): Options {
    return this.options;
  }
}

/**
 * Creates a new instance of `PathDict`.
 * @param {Options} options - An optional object representing the initial path dictionary values.
 * @returns {PathDict} - An instance of the `PathDict` class.
 */
export default function createPathDict(options: Options = {}): PathDict {
  return new PathDict(options);
}

/*
// Example usage of the `createPathDict` function to create, set, and retrieve values from a path dictionary.
const dict = createPathDict();

// Set a value at a specific path
dict.set("app.model.function", () => {
  console.log("App-Model-FunctionName");
});

// Retrieve the value from the path
const value = dict.get("app.model.function");
value(); // Output: "App-Model-FunctionName"
*/
