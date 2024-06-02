import { stringCamelCase } from "../stringTo";

const { useEffect, useCallback } = preact;

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
 * Injects replaceable CSS.
 * @param {string} code - The CSS code to inject.
 * @param {string} id - The ID of the style element to inject the code into.
 */
export const injectCSS = (code: string, id: string = "main") =>
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
export function getStyle(id: string): HTMLElement {
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
export const objectToClass = (input: any): string => {
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
export function objectToStyle(input: any): string {
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
 * @returns {object} - The object with camelCase keys.
 */
export const camelProps = (kwargs: any): object => {
  const dict: { [key: string]: any } = {};
  Object.entries(kwargs).map(
    ([key, value]) => (dict[stringCamelCase(key)] = value)
  );
  return dict;
};

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
 * Creates a new object by executing functions in the input object and storing their results.
 * @param {object} obj - The input object.
 * @returns {object} - The new object with the executed function results.
 */
export function createDefaultForm(obj: { [key: string]: any }): object {
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
 * Converts a time duration specified in years, months, days, hours, minutes, and seconds into milliseconds.
 *
 * @param {Object} duration - An object containing the time duration.
 * @param {number} [duration.years=0] - The number of years.
 * @param {number} [duration.months=0] - The number of months (assuming an average month length of 30 days).
 * @param {number} [duration.days=0] - The number of days.
 * @param {number} [duration.hours=0] - The number of hours.
 * @param {number} [duration.minutes=0] - The number of minutes.
 * @param {number} [duration.seconds=0] - The number of seconds.
 * @returns {number} The total time duration in milliseconds.
 */
export function getMilliseconds({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}: {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}) {
  const yearInMillis = 365 * 24 * 60 * 60 * 1000;
  const monthInMillis = 30 * 24 * 60 * 60 * 1000; // Assuming an average month length
  const dayInMillis = 24 * 60 * 60 * 1000;
  const hourInMillis = 60 * 60 * 1000;
  const minuteInMillis = 60 * 1000;
  const secondInMillis = 1000;

  const totalMilliseconds =
    years * yearInMillis +
    months * monthInMillis +
    days * dayInMillis +
    hours * hourInMillis +
    minutes * minuteInMillis +
    seconds * secondInMillis;

  return totalMilliseconds;
}

// Core module exports
export default {
  timer: getMilliseconds,
  inject: injectCSS,
  form: createDefaultForm,
  // Preact plugins
  class: objectToClass,
  style: objectToStyle,
  props: camelProps,
  event: eventListener,
  events: Object.freeze(events),
};
