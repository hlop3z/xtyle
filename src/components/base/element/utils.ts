/**
 * Import Core
 */
const { useEffect, useRef } = preact;
import util, { removeSpace } from "../../../utils";

/**
 * Represents the directives extracted from the props.
 */
export interface Directive {
  [key: string]: any;
}

interface Props {
  [key: string]: any;
}

// is-function
export const isFunction = (value: any): boolean => typeof value === "function";

/**
 * Custom hook that runs the provided callback function only once.
 * @param {() => void} callback - The callback function to be executed once.
 */
export function hookCreated(callback: () => void): void {
  useEffect(() => {
    callback();
  }, []);
}

/**
 * Custom hook that runs the provided callback function whenever the component updates.
 * @param {() => void} callback - The callback function to be executed on component update.
 */
export function hookUpdated(callback: (selfDict?: any) => void): void {
  const callbackRef: any = useRef(callback);

  useEffect(() => {
    const updateCallback = callbackRef.current;
    updateCallback();
  });
}

/**
 * Custom hook that runs the provided callback function on component cleanup.
 * @param {() => void} callback - The callback function to be executed on cleanup.
 */
export function hookCleanup(callback: () => void): void {
  const cleanupRef: any = useRef(callback);
  useEffect(() => {
    const cleanup = cleanupRef.current;
    return () => {
      cleanup();
    };
  }, []);
}

/**
 * Extracts the directives from the props based on a filter function.
 * @param {Props} props - The props object to extract the directives from.
 * @param {Function} filterFn - The filter function to determine which directives to extract.
 * @returns {Directive} The extracted directives as a dictionary.
 */
export const filterDirectives = (
  props: Props,
  cut: number,
  filterFn: (key: string) => boolean
): Directive => {
  const directives: Directive = {};
  Object.keys(props).forEach((key) => {
    if (filterFn(key)) {
      directives[key.slice(cut).trim()] = props[key];
    }
  });
  return directives;
};

/**
 * Extracts the event listener directives from the props.
 * @param {Props} props - The props object to extract the directives from.
 * @returns {Directive} The extracted event listener directives as a dictionary.
 */
export const filterEventDirectives = (props: Props): Directive => {
  const eventDirectives: Directive = {};
  Object.keys(props).forEach((key) => {
    if (key.startsWith("on-")) {
      const _name = key.slice(3).trim();
      const name = util.events[_name];
      eventDirectives[name || _name] = props[key];
    }
  });
  return eventDirectives;
};

/**
 * Extracts all the directives from the props and categorizes them.
 * @param {Props} props - The props object to extract the directives from.
 * @returns {Directive} The extracted directives as a dictionary with categorized sections.
 */
export const collectDirectives = (props: Props): Directive => {
  const find = (key: string) =>
    filterDirectives(props, key.length, (item) => item.startsWith(key));
  // Collect
  const customDirectives = find("x-");
  const hookDirectives = find("hook-");
  const cssDirectives = find("css-");
  const eventDirectives = filterEventDirectives(props);

  const dict: Directive = {
    custom: customDirectives,
    on: eventDirectives,
    hook: hookDirectives,
    css: cssDirectives,
  };

  return dict;
};

/**
 * Ensures the value is a CSS "Class-List".
 * @param {Array | string} items - The object/items to extract the classes from.
 * @returns {string[]} A list of css classes
 */
export const cleanCSS = (items: any): any => {
  if (Array.isArray(items)) {
    return items;
  } else if (typeof items === "string") {
    const css = removeSpace(items);
    if (css.includes(" ")) {
      return css.split(" ");
    }
    return [items];
  }
  return [];
};
