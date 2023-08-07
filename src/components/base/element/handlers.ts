/**
 * Import Core
 */

const { useEffect, render, $ready } = preact;

/**
 * Import statements for required modules and functions.
 */
import core from "../../../utils";

import {
  cleanCSS,
  isFunction,
  hookCreated,
  hookUpdated,
  hookCleanup,
} from "./utils";

import {
  Ripple,
  hideKeyCSS,
  globalDirectives,
  includedCoreAttrs,
  customCoreDirectives,
} from "../directives";

import { allDirectives } from "../";

/**
 * IS-NOT Blank
 */
export const isNotBlank = (val: any) =>
  val !== null && val !== undefined && val !== "";

/**
 * Handles HTML (Element) creation and processing of directives.
 * @param {string | null} tagHTML - The HTML tag specified in the directives.
 * @param {any} selfContext - The self context object for the component.
 * @returns {any | null} - The rendered JSX element based on the directives or null if no tagHTML is provided.
 */
export function handleHTMLElement(tagHTML: any, selfContext: any): any {
  if (!tagHTML) return null;

  // Custom Attrs
  const customAttrs = { ...selfContext.directives.on };
  if (selfContext.directives.custom["ripple"]) {
    Ripple(selfContext.ref, selfContext.directives);
  }

  // Included Attrs
  includedCoreAttrs.forEach((key) => {
    if (selfContext.props[key]) {
      customAttrs[key] = selfContext.props[key];
    }
  });

  // Real Built Attrs
  const propsHTML = {
    ref: selfContext.ref,
    ...customAttrs,
    ...selfContext.props.attrs,
  };

  // Process Directives
  const dKeys = Object.keys(selfContext.directives.custom);
  if (dKeys.length > 0) {
    dKeys.forEach((key) => {
      if (!customCoreDirectives.includes(key)) {
        if (globalDirectives[key]) {
          const method = globalDirectives[key];
          method(selfContext, propsHTML);
        } else {
          const method = allDirectives[key];
          if (typeof method === "function") {
            method(selfContext, propsHTML);
          }
        }
      }
    });
  }

  // (Any | Object) to CSS-Class
  if (propsHTML.class) {
    propsHTML.class = core.class(propsHTML.class);
  }

  // (Any | Object) to CSS-Style
  if (propsHTML.style) {
    propsHTML.style = core.style(propsHTML.style);
  }

  // HTML (Element)
  return h(tagHTML, propsHTML, selfContext.props.children);
}

/**
 * Handles Reactive CSS using useEffect.
 * @param {any} directives - The directives object containing CSS properties.
 * @param {any} selfRef - The self reference for the component.
 */

export function handleReactiveCSS(directives: any, selfRef: any) {
  useEffect(() => {
    if (isNotBlank(directives.css["is"])) {
      if (directives.css["is"] === true) {
        selfRef.add(...cleanCSS(directives.css["on"]));
        selfRef.remove(...cleanCSS(directives.css["off"]));
      } else {
        selfRef.remove(...cleanCSS(directives.css["on"]));
        selfRef.add(...cleanCSS(directives.css["off"]));
      }
    }
  }, [directives.css["is"]]);
}

/**
 * Handles Reactive CSS using useEffect.
 * @param {any} directives - The directives object containing CSS properties.
 * @param {any} selfRef - The self reference for the component.
 */

export function handleShowCSS(directives: any, selfRef: any) {
  useEffect(() => {
    if (isNotBlank(directives.custom["show"])) {
      if (directives.custom["show"] === true) {
        selfRef.remove(hideKeyCSS);
      } else {
        selfRef.add(hideKeyCSS);
      }
    }
  }, [directives.custom["show"]]);
}

/**
 * Handles Hooks like `created`, `updated`, and `cleanup`.
 * @param {any} directives - The directives object containing hook properties.
 * @param {any} selfContext - The self context object for the component.
 */
export function handleHooks(directives: any, selfContext: any) {
  if (isFunction(directives.hook["created"])) {
    hookCreated(() => {
      directives.hook["created"](selfContext);
    });
  }
  if (isFunction(directives.hook["updated"])) {
    hookUpdated(() => {
      directives.hook["updated"](selfContext);
    });
  }
  if (isFunction(directives.hook["removed"])) {
    hookCleanup(() => {
      directives.hook["removed"](selfContext);
    });
  }
}

/**
 * Handles Portal creation and rendering.
 * @param {any} elementQuery - The query selector for the portal element.
 * @param {any} directives - The directives object containing portal properties.
 * @param {any} props - The props passed to the component.
 * @returns {any | null} - The JSX element rendered inside the portal or null if no elementQuery is provided.
 */
export function handlePortal(
  elementQuery: any,
  directives: any,
  props: any
): any {
  if (elementQuery) {
    if ($ready.value) {
      const elementHTML = document.querySelector(elementQuery);
      if (elementHTML) {
        useEffect(() => {
          if (directives.custom["fragment"]) {
            const fragment = document.createDocumentFragment();
            render(props.children, fragment);
            elementHTML.appendChild(fragment);
          } else {
            render(props.children, elementHTML);
          }
        }, []);
      }
    }
    return null;
  }
  return props.children;
}

/**
 * Handles For (Loop) rendering based on the directives.
 * @param {any} directives - The directives object containing the `for` and `in` properties.
 * @returns {any | null} - The array of JSX elements generated by the loop or null if invalid directives.
 */
export function handleForLoop(directives: any): any {
  if (
    typeof directives.custom["for"] === "function" &&
    Array.isArray(directives.custom["in"])
  ) {
    const forLoop = directives.custom["in"];
    const forItem = directives.custom["for"];
    return forLoop.map(forItem);
  } else if (
    typeof directives.custom["for"] === "function" &&
    typeof directives.custom["in"] === "number"
  ) {
    const forLoop = directives.custom["in"];
    const forItem = directives.custom["for"];
    return [...Array(forLoop).keys()].map(forItem);
  }
  return null;
}

/**
 * Handles Switch (Case) rendering based on the directives.
 * @param {any} directives - The directives object containing switch properties.
 * @param {any} props - The props passed to the component.
 * @returns {any | null} - The JSX element based on the active case or null if no active case is found.
 */
export function handleSwitchCase(directives: any, props: any): any {
  if (directives.custom["switch"]) {
    const activeCase = directives.custom["case"] || "default";
    let currentView = null;
    if (
      props.children &&
      props.children.props &&
      props.children.props["x-for"] &&
      props.children.props["x-in"]
    ) {
      const out = props.children.props["x-in"].map(
        props.children.props["x-for"]
      );
      currentView = out.filter(
        (item: any) => item.props["case"] === activeCase
      );
    } else if (Array.isArray(props.children)) {
      currentView = props.children.filter(
        (item: any) => item.props && item.props["case"] === activeCase
      );
    }
    return currentView;
  }
  return null;
}
