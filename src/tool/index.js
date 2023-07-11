import element from "./element";
import Layout from "./layout";
import directives from "./directives";
import ref from "./ref";
import store from "./store";
import tabs from "./tabs";
import router from "./router";
import appLayout from "./app-layout";

const prefixCSS = "gui-design";

const injectCSS = (code, id = "main") => injectCSSBase({ code: code, id: id });

function injectCSSBase(kwargs) {
  /**
   * Inject replaceable CSS.
   * @param {string} id
   * @param {string} code
   */
  const ID = kwargs.id;
  const stringTemplate = kwargs.code;

  function getStyle(id) {
    /**
     * Add replaceable CSS.
     * @param {string} styleID
     * @param {string} styleString
     */
    const found = window.document.querySelectorAll(`[${prefixCSS}="${id}"]`);
    if (found.length > 0) {
      return found[0];
    } else {
      const style = window.document.createElement("style");
      style.setAttribute(prefixCSS, id);
      window.document.head.append(style);
      return style;
    }
  }

  function removeSpace(text) {
    /**
     * Clean CSS Code.
     * @param {string} text
     */
    return text
      .replace(/\s\s+/g, " ")
      .replace(/\r?\n|\r/g, "")
      .trim();
  }

  const elem = getStyle(ID);
  elem.textContent = removeSpace(stringTemplate);
}

const objectToClass = (input) => {
  /**
   * Transform Object to (CSS) Class
   * @param {object} CSS CSS-Class
   */
  if (typeof input === "string") {
    return input.trim();
  } else if (typeof input === "object") {
    if (Array.isArray(input)) {
      let result = [];
      for (let i = 0; i < input.length; i++) {
        result.push(objectToClass(input[i]));
      }
      return result.join(" ").trim();
    } else {
      let result = [];
      for (let key in input) {
        if (input[key] === true) {
          result.push(key);
        }
      }
      return result.join(" ").trim();
    }
  }
  return "";
};

function objectToStyle(input) {
  /**
   * Transform Object to (CSS) Style
   * @param {object} CSS CSS-Style
   */
  if (typeof input === "string") {
    input = input.trim();
    if (input.endsWith(";;")) {
      input = input.slice(0, -1);
    }
    return input;
  } else if (typeof input === "object") {
    if (Array.isArray(input)) {
      let result = [];
      for (let i = 0; i < input.length; i++) {
        result.push(objectToStyle(input[i]));
      }
      return result.join(" ").trim();
    } else {
      let result = [];
      for (let key in input) {
        const value = input[key];
        if (value) {
          result.push(`${key}: ${value};`);
        }
      }
      return result.join(" ").trim();
    }
  }
  return "";
}

function camelCase(input) {
  /**
   * Transform text to camel-Case text.
   * @param {string} input Any string.
   */
  return input
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (e, r) =>
      0 == +e ? "" : 0 === r ? e.toLowerCase() : e.toUpperCase()
    )
    .replace(/[^\w]+/g, "")
    .replace(/^\w/, (c) => c.toLowerCase());
}

const camelProps = (kwargs, component) => {
  /**
   * Transform Object to (camelCase) Keys
   * @param {object}
   */
  const dict = {};
  Object.entries(component ? component.$values(kwargs) : kwargs).map(
    ([key, value]) => (dict[camelCase(key)] = value)
  );
  return dict;
};

const createSlots = (props, key = "x-slot") => {
  /**
   * Transform { Children } to named slots.
   * @param {object} props Props from JSX
   */
  const slots = {};
  if (props.children) {
    if (!Array.isArray(props.children)) props.children = [props.children];
    props.children.forEach((el) => {
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
  slots.$ = (slot) => {
    const current = slots[slot] || {};
    if (current.props) {
      if (current.props.children) {
        return current.props.children;
      }
    }
    return null;
  };
  slots.$all = Object.values(slots);
  slots.$keys = Object.keys(slots).filter(
    (key) => !["$", "$all"].includes(key)
  );
  return slots;
};

function slugify(str, numbers = true) {
  str = str.replace(/^\s+|\s+$/g, ""); // Trim leading/trailing white space
  str = str.toLowerCase(); // Convert to lowercase
  if (numbers) {
    str = str.replace(/[^a-z0-9 -]/g, ""); // Remove non-alphanumeric characters
  } else {
    str = str.replace(/[^a-z -]/g, ""); // Only Letters
  }
  str = str
    .replace(/\s+/g, "-") // Replace whitespace with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
  return str;
}

function collectLocalDirectives(props) {
  /**
   * Get custom { Directives } from the Props.
   * @param {object} props Props from JSX
   */
  const found = [];
  Object.keys(props).forEach((key) => {
    if (key.startsWith("x-")) found.push(camelCase(key));
  });
  return found;
}

function createGlobalDirectives(props) {
  /**
   * Create Global { Directives }
   * @param {object} props Props from JSX
   */
  const _directive = {};
  Object.entries(props).map(([key, val]) => (_directive[`x-${key}`] = val));
  return camelProps(_directive);
}

function eventListener(el, event, handler, cleanup = []) {
  /**
   * Simpler Event Handling
   * @param {string} event Name of the Event. Example: ["keydown", "resize", etc...]
   * @param {object} handler Props from JSX
   */
  const { useEffect } = preact;
  useEffect(() => {
    const elem = el.current ? el.current : el;
    // Attach the Event Listener
    elem.addEventListener(event, handler);
    // Cleanup the Event Listener
    return () => {
      elem.removeEventListener(event, handler);
    };
  }, cleanup);
}

const Util = {
  inject: injectCSS,
  props: camelProps,
  class: objectToClass,
  style: objectToStyle,
  camel: camelCase,
  slugify: slugify,
  // Preact
  self: ref,
  slots: createSlots,
  event: eventListener,
  router: router,
  ...store,
  directives: {
    find: collectLocalDirectives,
    create: createGlobalDirectives,
    method: {},
    init: function () {},
  },
};

// Complex Utils (Custom)
Util.element = element(Util);
Util.directives.init = directives(Util);
Util.layout = appLayout(Util);
Util.tabs = {
  view: tabs(Util),
  store: store.signal({}),
  active: (group, view) => {
    Util.tabs.store.update((draft) => {
      draft[group] = [view];
    });
  },
  toggle: (group, view) => {
    Util.tabs.store.update((draft) => {
      if (Array.isArray(draft[group])) {
        if (draft[group].includes(view)) {
          draft[group] = draft[group].filter((key) => key !== view);
        } else {
          draft[group].push(view);
        }
      }
    });
  },
};

Util.createApp = (config) => {
  const { layout, directives, router } = config || {};
  // Layouts
  Layout(Util)(layout || {});

  // Directives
  Util.directives.init(directives || {});

  // Router
  Util.router(router || {});
};

export default Util;

/* [ Testing ]
// Props
console.log(Util.props({ "camel-case": "hello-world" }));

// CSS-Class
console.log(Util.class([{ "is-active": true, "is-disabled": false }]));

// CSS-Style
console.log(
  Util.style([
    "background-color:10;",
    { color: "red" },
    ["color:green;", { border: "2px solid black" }],
  ])
);

// camel-Case
console.log(Util.camel("camel-case"));
*/
