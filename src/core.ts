const { useEffect, useRef, useCallback } = preact;

/**
 * The CSS class prefix used for custom styles.
 */
const prefixCSS = "gui-design";

/**
 * Event name mapping to their corresponding React event names.
 */
const events: object = {
  click: "onClick",
  "dbl-click": "onDblClick",
  "context-menu": "onContextMenu",
  "mouse-down": "onMouseDown",
  "mouse-up": "onMouseUp",
  "mouse-enter": "onMouseEnter",
  "mouse-leave": "onMouseLeave",
  "mouse-move": "onMouseMove",
  "key-down": "onKeyDown",
  "key-up": "onKeyUp",
  "key-press": "onKeyPress",
  focus: "onFocus",
  blur: "onBlur",
  change: "onChange",
  input: "onInput",
  submit: "onSubmit",
  "touch-start": "onTouchStart",
  "touch-move": "onTouchMove",
  "touch-end": "onTouchEnd",
  "touch-cancel": "onTouchCancel",
  wheel: "onWheel",
  scroll: "onScroll",
  copy: "onCopy",
  cut: "onCut",
  paste: "onPaste",
  "composition-start": "onCompositionStart",
  "composition-update": "onCompositionUpdate",
  "composition-end": "onCompositionEnd",
  load: "onLoad",
  error: "onError",
  "animation-start": "onAnimationStart",
  "animation-end": "onAnimationEnd",
  "animation-iteration": "onAnimationIteration",
  "transition-end": "onTransitionEnd",
};

/**
 * Represents a reference with admin capabilities.
 */
interface RefAdmin {
  current: HTMLElement | null;
  $: { current: HTMLElement | null };
  contains(className: string): boolean;
  add(...args: string[]): void;
  remove(...args: string[]): void;
  toggle(args: string[], value?: any): void;
  __add(...args: string[]): void;
  __remove(...args: string[]): void;
  __toggle(args: string[], value?: any): void;
  find(query: string): any;
  get(query: string): any;
}

/**
 * Injects replaceable CSS.
 * @param {string} code - The CSS code to inject.
 * @param {string} id - The ID of the style element to inject the code into.
 */
const injectCSS = (code: string, id: string = "main") =>
  injectCSSBase({ code, id });

/**
 * Base function for injecting replaceable CSS.
 * @param {object} options - Options for injecting CSS.
 * @param {string} options.code - The CSS code to inject.
 * @param {string} options.id - The ID of the style element to inject the code into.
 */
function injectCSSBase({ code, id }: { code: string; id: string }) {
  const elem = getStyle(id);
  elem.textContent = removeSpace(code);
}

/**
 * Gets the style element with the specified ID, creating one if it doesn't exist.
 * @param {string} id - The ID of the style element to retrieve or create.
 * @returns {HTMLElement} - The style element with the specified ID.
 */
function getStyle(id: string): HTMLElement {
  const found = window.document.querySelectorAll(`[${prefixCSS}="${id}"]`);
  if (found.length > 0) {
    return found[0] as HTMLElement;
  } else {
    const style = window.document.createElement("style");
    style.setAttribute(prefixCSS, id);
    window.document.head.append(style);
    return style;
  }
}

/**
 * Cleans up CSS code by removing extra spaces and newlines.
 * @param {string} text - The CSS code to clean up.
 * @returns {string} - The cleaned up CSS code.
 */
export function removeSpace(text: string): string {
  return text
    .replace(/\s\s+/g, " ")
    .replace(/\r?\n|\r/g, "")
    .trim();
}

/**
 * Transforms a CSS object to a space-separated class string.
 * @param {any} input - The CSS object to transform.
 * @returns {string} - The space-separated class string.
 */
const objectToClass = (input: any): string => {
  if (typeof input === "string") {
    return input.trim();
  } else if (typeof input === "object") {
    if (Array.isArray(input)) {
      return input.map(objectToClass).join(" ").trim();
    } else {
      return Object.keys(input)
        .filter((key) => input[key] === true)
        .join(" ")
        .trim();
    }
  }
  return "";
};

/**
 * Transforms a CSS object to a style string.
 * @param {any} input - The CSS object to transform.
 * @returns {string} - The style string.
 */
function objectToStyle(input: any): string {
  if (typeof input === "string") {
    input = input.trim();
    if (input.endsWith(";;")) {
      input = input.slice(0, -1);
    }
    return input;
  } else if (typeof input === "object") {
    if (Array.isArray(input)) {
      return input.map(objectToStyle).join(" ").trim();
    } else {
      return Object.keys(input)
        .filter((key) => input[key])
        .map((key) => `${key}: ${input[key]};`)
        .join(" ")
        .trim();
    }
  }
  return "";
}

/**
 * Transforms an object's keys to camelCase.
 * @param {any} kwargs - The object whose keys need to be transformed to camelCase.
 * @param {any} component - The component object.
 * @returns {object} - The object with camelCase keys.
 */
const camelProps = (kwargs: any, component?: any): object => {
  const dict: { [key: string]: any } = {};
  Object.entries(component ? component.$values(kwargs) : kwargs).map(
    ([key, value]) => (dict[camelCase(key)] = value)
  );
  return dict;
};

/**
 * Transforms children to named slots.
 * @param {object} props - Props from JSX.
 * @param {string} key - The key used to identify slots in the children.
 * @returns {object} - An object representing the named slots.
 */
function createSlots(
  props: { children?: any },
  key: string = "slot"
): {
  [key: string]: any;
  $: (slot: string) => any;
  $all: any[];
  $keys: string[];
} {
  const slots: any = {};
  if (props.children) {
    const childrenArray = Array.isArray(props.children)
      ? props.children
      : [props.children];

    childrenArray.forEach((el) => {
      if (typeof el === "object" && el && el.props) {
        const slotName = el.props[key];
        if (!slotName) {
          slots["default"] = el;
        } else {
          slots[camelCase(slotName)] = el;
        }
      }
    });
  }
  slots.$ = (slot: any) => {
    const current = slots[slot] || {};
    if (current.props && current.props.children) {
      return current.props.children;
    }
    return null;
  };
  slots.$all = Object.values(slots);
  slots.$keys = Object.keys(slots).filter(
    (key) => !["$", "$all"].includes(key)
  );
  return slots;
}

/**
 * Event listener helper function for handling events with useEffect.
 * @param {any} el - The element to attach the event listener to.
 * @param {string} event - The name of the event to listen for.
 * @param {Function} handler - The event handler function.
 * @param {any} config - Config for `addEventListener`
 * @param {any[]} cleanup - An array of dependencies for the useEffect hook.
 */
function eventListener(
  el: any,
  event: string,
  handler: (event: Event) => void,
  cleanup: any[] = [],
  config: any = {}
) {
  useEffect(() => {
    const elem: any = "current" in el ? el.current : el;
    elem.addEventListener(event, handler, config); // Add the passive option
    return () => {
      elem.removeEventListener(event, handler);
    };
  }, cleanup);

  return useCallback(handler, cleanup);
}

/**
 * Factory function for creating a RefAdmin object with admin capabilities.
 * @returns {RefAdmin} - The RefAdmin object.
 */
function createRefAdmin(realRef: object | undefined = undefined): RefAdmin {
  const refAdmin: any = realRef || useRef(null);
  const self: RefAdmin = {
    get $() {
      return refAdmin;
    },
    get current() {
      return refAdmin.current;
    },
    set current(value) {
      refAdmin.current = value;
    },
    contains(className: string) {
      try {
        return this.current?.classList.contains(className) || false;
      } catch (e) {
        return false;
      }
    },
    find(query: string) {
      try {
        let elems = this.current?.querySelectorAll(query);
        if (elems) {
          return Array.from(elems).map((el: any) =>
            createRefAdmin({ current: el })
          );
        }
        return [];
      } catch (e) {
        return [];
      }
    },
    ["get"](query: string) {
      try {
        let elem = this.current?.querySelector(query);
        if (elem) return createRefAdmin({ current: elem });
        return null;
      } catch (e) {
        return null;
      }
    },
    add(...args: string[]) {
      try {
        this.__add(...args);
      } catch (e) {}
    },
    remove(...args: string[]) {
      try {
        this.__remove(...args);
      } catch (e) {}
    },
    toggle(args: string[], value: any = null) {
      try {
        this.__toggle(value, ...args);
      } catch (e) {}
    },
    __add(...args: string[]) {
      args = [...args];
      args.forEach((className) => {
        this.current?.classList.add(className);
      });
    },
    __remove(...args: string[]) {
      args = [...args];
      args.forEach((className) => {
        this.current?.classList.remove(className);
      });
    },
    __toggle(value: any, ...args: string[]) {
      args = [...args];
      args.forEach((className) => {
        if (value === null) {
          this.current?.classList.toggle(className);
        } else {
          this.current?.classList.toggle(className, value);
        }
      });
    },
  };
  return self;
}

/**
 * Creates a new object by executing functions in the input object and storing their results.
 * @param {object} obj - The input object.
 * @returns {object} - The new object with the executed function results.
 */
export function createForm(obj: { [key: string]: any }): object {
  const newObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "function") {
        newObj[key] = value(); // Execute the function and store the result
      } else {
        newObj[key] = value; // Copy non-function values as-is
      }
    }
  }

  return newObj;
}

/**
 * Converts a string to Pascal case (each word starts with an uppercase letter without spaces or symbols).
 * @param {string} text - The input string to convert.
 * @returns {string} The Pascal case representation of the input string.
 */
function toPascalCase(text: string): string {
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
function camelCase(input: string): string {
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
function slugify(str: string, numbers: boolean = true): string {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  if (numbers) {
    str = str.replace(/[^a-z0-9 -]/g, "");
  } else {
    str = str.replace(/[^a-z -]/g, "");
  }
  str = str.replace(/\s+/g, "-").replace(/-+/g, "-");
  return str;
}

/**
 * Converts a string to lowercase.
 * @param {string} text - The input string to convert.
 * @returns {string} The lowercase representation of the input string.
 */
function toLower(text: string): string {
  return text.toLowerCase();
}

/**
 * Converts a string to uppercase.
 * @param {string} text - The input string to convert.
 * @returns {string} The uppercase representation of the input string.
 */
function toUpper(text: string): string {
  return text.toUpperCase();
}

/**
 * Converts a string to title case (each word starts with an uppercase letter).
 * @param {string} text - The input string to convert.
 * @returns {string} The title case representation of the input string.
 */
function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Object containing methods to convert strings to different formats.
 */
export const stringTo = {
  camel: camelCase,
  slug: slugify,
  lower: toLower,
  upper: toUpper,
  title: toTitleCase,
  pascal: toPascalCase,
};

// Core module exports
export default {
  inject: injectCSS,
  camel: camelCase,
  form: createForm,
  // Preact module exports
  ref: createRefAdmin,
  class: objectToClass,
  style: objectToStyle,
  props: camelProps,
  slots: createSlots,
  event: eventListener,
  events: Object.freeze(events),
};
