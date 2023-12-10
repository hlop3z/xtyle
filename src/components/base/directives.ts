/**
 * Import statements.
 */
import core from "../util";
import ripple from "./ripple.js";
import validator from "../validator";

const { useEffect, useRef } = preact;

// Ripple Effect
export const hideKeyCSS = "xtyle__hide";

core.inject(ripple.css, "xtyle-ripple");
core.inject(`.${hideKeyCSS}{ display: none !important; }`, "xtyle-hide");

export const includedCoreAttrs = [
  // Core
  "key",
  "id",
  "class",
  "style",
  // Input
  "type",
  "name",
  "placeholder",
  "checked",
  "step",
  "pattern",
  "readonly",
  "required",
  // Textarea
  "rows",
  "cols",
  // Link
  "href",
  // Link & Img
  "src",
  "alt",
];

export const customCoreDirectives = [
  // Tools, Control-Flow & Effects
  "html",
  "fragment",
  "tag",
  "switch",
  "case",
  "fallback",
  "fallback-is",
  "for",
  "in",
  "if",
  "show",
  "live",
  "portal",
  "ripple",
  // Input Related
  "input",
  "value-clean",
  "value-validators",
  "value-disabled",
];

const DirectiveResponse = (
  self: any,
  props: any,
  event: any,
  kwargs?: any
) => ({
  self,
  props,
  event,
  ...(kwargs || {}),
});

export const globalDirectives = {
  // wheel - maybe implement a "wheel-tracker" (Up & Down) Tracker.
  ref: (self: any) => {
    const directive = self.directives.custom["ref"];
    useEffect(() => {
      if (directive) directive(self.ref);
    }, [self.ref]);
  },
  value: (self: any, props: any) => {
    const xTag = self.directives.custom["tag"];
    const state = self.directives.custom["value"];
    const filter = self.directives.custom["value-clean"];
    const validators = self.directives.custom["value-validators"];
    const xInput = self.directives.custom["input"];
    const disabled = self.directives.custom["value-disabled"];

    const { onInput } = props;
    if (["input", "textarea", "select", "progress"].includes(xTag)) {
      props.onInput = (event: any) => {
        let newValue = "";
        // Set New-Value
        if (disabled) {
          event.target.value = state.value;
        } else {
          // Clean Value
          if (filter && typeof filter === "function") {
            newValue = filter(event.target.value);
            event.target.value = newValue;
          } else {
            newValue = event.target.value;
          }
          state.value = newValue;
        }
        // Validators
        let isValid: any[] = [];
        if (validators && typeof Array.isArray(validators)) {
          isValid = validator(newValue, validators);
        }
        if (xInput && typeof xInput === "function") {
          xInput({
            value: newValue,
            valid: isValid.length === 0,
            errors: isValid,
            event: event,
          });
        }
        // On Input (Methods)
        if (onInput) {
          onInput(event);
        }
      };
      useEffect(() => {
        self.ref.current.value = state.value;
      }, [self.ref, state]);
    }
  },
  scroll: (self: any, props: any) => {
    const directive = self.directives.custom["scroll"];
    const handler = (event: any) => {
      const dirConfig = DirectiveResponse(self, props, event, {
        value: {
          x: event.target.scrollLeft,
          y: event.target.scrollTop,
        },
      });
      directive(dirConfig);
    };
    core.event(self.ref, "scroll", handler, [self.ref, directive, props]);
  },
  hover: (self: any, props: any) => {
    const directive = self.directives.custom["hover"];
    const attrs = { ...props };
    props.onMouseEnter = (event: any) => {
      const dirConfig = DirectiveResponse(self, props, event, {
        value: true,
      });
      directive(dirConfig);
      if (attrs.onMouseEnter) {
        attrs.onMouseEnter(event);
      }
    };
    props.onMouseLeave = (event: any) => {
      const dirConfig = DirectiveResponse(self, props, event, {
        value: false,
      });
      directive(dirConfig);
      if (attrs.onMouseLeave) {
        attrs.onMouseLeave(event);
      }
    };
  },
  swipe: (self: any, props: any) => {
    const directive = self.directives.custom["swipe"];
    SwipeDetector((value: string) => {
      const dirConfig = DirectiveResponse(self, props, null, {
        value: value,
      });
      directive(dirConfig);
    });
  },
  resize: (self: any, props: any) => {
    const directive = self.directives.custom["resize"];
    const handler = (event: any) => {
      const dirConfig = DirectiveResponse(self, props, event);
      directive(dirConfig);
    };
    core.event(window, "resize", handler, [self.ref, directive, props]);
  },
  "click-outside": (self: any, props: any) => {
    const directive = self.directives.custom["click-outside"];
    const handler = (event: any) => {
      const isClickInsideElement = self.ref.current.contains(event.target);
      if (!isClickInsideElement) {
        const dirConfig = DirectiveResponse(self, props, event);
        directive(dirConfig);
      }
    };
    core.event(document, "click", handler, [self.ref, directive, props]);
  },
};

/**
 * Applies the Ripple effect to an element based on the provided directives.
 *
 * @param {any} selfRef - A reference to the element to which the Ripple effect will be applied.
 * @param {any} directives - An object containing directives for customizing the Ripple effect.
 * @param {boolean} [directives.custom.ripple=true] - Set to `true` to enable the Ripple effect,
 *                                                   or provide an object with options for the Ripple effect.
 * @returns {void}
 */
export function Ripple(selfRef: any, directives: any): void {
  useEffect(() => {
    if (directives.custom["ripple"] === true) {
      ripple.directive(selfRef.current);
    } else if (directives.custom["ripple"]) {
      ripple.directive(selfRef.current, directives.custom["ripple"]);
    }
    return () => {};
  }, [selfRef.current]);
}

/**
 * Function to detect swipe gestures and emit the swipe direction.
 * @param {Function} onSwipe - The callback function to handle the swipe direction.
 */
function SwipeDetector(onSwipe: Function) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    const MIN_SWIPE_DISTANCE = 50;

    const handleTouchStart = (event) => {
      touchStartX.current = event.touches[0].clientX;
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      if (
        Math.abs(deltaX) > MIN_SWIPE_DISTANCE ||
        Math.abs(deltaY) > MIN_SWIPE_DISTANCE
      ) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          onSwipe(deltaX > 0 ? "right" : "left");
        } else {
          onSwipe(deltaY > 0 ? "bottom" : "top");
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipe]);
}
