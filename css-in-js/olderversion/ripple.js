const prefixCSS = "gui-design";

export function inject(props) {
  /**
   * Inject replaceable CSS.
   * @param {string} id
   * @param {string} code
   */
  const ID = props.id;
  const stringTemplate = props.code;

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

const cssClass = {
  container: "v-ripple__container",
  animation: "v-ripple__animation",
  enter: "v-ripple__animation--enter",
  visible: "v-ripple__animation--visible",
  start: "v-ripple__animation--start",
  end: "v-ripple__animation--end",
  style: `.v-ripple__animation,.v-ripple__container{color:inherit;position:absolute;top:0;left:0;pointer-events:none;overflow:hidden}.v-ripple__container{border-radius:inherit;width:100%;height:100%;z-index:0;contain:strict}.v-ripple__animation{border-radius:50%;background:currentColor;opacity:0;will-change:transform,opacity}.v-ripple__animation--enter{transition:none}.v-ripple__animation--start{transition:transform .25s cubic-bezier(.4, 0, .2, 1),opacity .1s cubic-bezier(.4, 0, .2, 1)}.v-ripple__animation--end{transition:opacity .3s cubic-bezier(.4, 0, .2, 1)}`,
};

inject({
  id: "ripple-fx",
  code: cssClass.style,
});

function transform(el, value) {
  el.style["transform"] = value;
  el.style["webkitTransform"] = value;
}
function opacity(el, value) {
  el.style["opacity"] = value.toString();
}
function isTouchEvent(e) {
  return e.constructor.name === "TouchEvent";
}
const calculate = (e, el, value = {}) => {
  const offset = el.getBoundingClientRect();
  const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
  const localX = target.clientX - offset.left;
  const localY = target.clientY - offset.top;
  let radius = 0;
  let scale = 0.3;
  if (el._ripple && el._ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center
      ? radius
      : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return { radius, scale, x, y, centerX, centerY };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e, el, value = {}) {
    if (!el._ripple || !el._ripple.enabled) {
      return;
    }
    const container = document.createElement("span");
    const animation = document.createElement("span");
    container.appendChild(animation);
    container.className = cssClass.container;
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = cssClass.animation;
    animation.style.width = size;
    animation.style.height = size;
    if (el._ripple && el._ripple.color) {
      animation.style.color = el._ripple.color;
    }
    el.appendChild(container);
    const computed = window.getComputedStyle(el);
    if (computed && computed.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add(cssClass.enter);
    animation.classList.add(cssClass.visible);
    transform(
      animation,
      `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`
    );
    opacity(animation, 0);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove(cssClass.enter);
      animation.classList.add(cssClass.start);
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      opacity(animation, 0.25);
    }, 0);
  },
  hide(el) {
    if (!el || !el._ripple || !el._ripple.enabled) return;
    const ripples = el.getElementsByClassName(cssClass.animation);
    if (ripples.length === 0) return;
    const animation = ripples[ripples.length - 1];
    if (animation.dataset.isHiding) return;
    else animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove(cssClass.start);
      animation.classList.add(cssClass.end);
      opacity(animation, 0);
      setTimeout(() => {
        const ripples = el.getElementsByClassName(cssClass.animation);
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        animation.parentNode && el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  },
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!element || !element._ripple || element._ripple.touched) return;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch) return;
  }
  value.center = element._ripple.centered;
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  ripples.show(e, element, value);
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!element) return;
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}

function startListeners(el, setup, wasEnabled) {
  const enabled = isRippleEnabled(setup);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple || {};
  el._ripple.enabled = enabled;
  const value = setup || {};
  if (value.center) {
    el._ripple.centered = true;
  }
  if (value.class) {
    el._ripple.class = setup.class;
  }
  if (value.circle) {
    el._ripple.circle = setup.circle;
  }
  if (value.color) {
    el._ripple.color = setup.color;
  }
  if (enabled && !wasEnabled) {
    el.addEventListener("touchstart", rippleShow, { passive: true });
    el.addEventListener("touchend", rippleHide, { passive: true });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("dragstart", rippleHide, { passive: true });
  } else if (!enabled && wasEnabled) {
    stopListeners(el);
  }
}

function stopListeners(el) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleHide);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("dragstart", rippleHide);
}

export default (el, setup) => startListeners(el, setup, false);
