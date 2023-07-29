interface RippleSetup {
  centered?: boolean;
  class?: string;
  circle?: boolean;
  color?: string;
}

const cssClass = {
  container: "ripple-effect__container",
  animation: "ripple-effect__animation",
  enter: "ripple-effect__animation--enter",
  visible: "ripple-effect__animation--visible",
  start: "ripple-effect__animation--start",
  end: "ripple-effect__animation--end",
  style: `.ripple-effect__animation,.ripple-effect__container{color:inherit;position:absolute;top:0;left:0;pointer-events:none;overflow:hidden}.ripple-effect__container{border-radius:inherit;width:100%;height:100%;z-index:0;contain:strict}.ripple-effect__animation{border-radius:50%;background:currentColor;opacity:0;will-change:transform,opacity}.ripple-effect__animation--enter{transition:none}.ripple-effect__animation--start{transition:transform .25s cubic-bezier(.4, 0, .2, 1),opacity .1s cubic-bezier(.4, 0, .2, 1)}.ripple-effect__animation--end{transition:opacity .3s cubic-bezier(.4, 0, .2, 1)}`,
};

function transform(el: any, value: string) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}

function opacity(el: any, value: number) {
  el.style.opacity = value.toString();
}

function isTouchEvent(e: Event) {
  return e instanceof TouchEvent;
}

function calculate(e: Event, el: any, value: any = {}) {
  const offset = el.getBoundingClientRect();
  const target: any = isTouchEvent(e)
    ? (e as TouchEvent).touches[(e as TouchEvent).touches.length - 1]
    : e;
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
  // @ts-ignore
  const x = value.center ? centerX : `${localX - radius}px`;
  // @ts-ignore
  const y = value.center ? centerY : `${localY - radius}px`;

  return { radius, scale, x, y, centerX, centerY };
}

const ripples = {
  /* eslint-disable max-statements */
  show(e: Event, el: any, value: RippleSetup = {}) {
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
  hide(el: any) {
    if (!el || !el._ripple || !el._ripple.enabled) return;
    const ripples = el.getElementsByClassName(cssClass.animation);
    if (ripples.length === 0) return;
    const animation = ripples[ripples.length - 1] as any;
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

function isRippleEnabled(value: unknown): boolean {
  return typeof value === "undefined" || !!value;
}

function rippleShow(e: Event) {
  const value: any = {};
  const element = e.currentTarget as any;
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

function rippleHide(e: Event) {
  const element = e.currentTarget as any;
  if (!element) return;
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}

function startListeners(
  el: any,
  setup: RippleSetup | undefined,
  wasEnabled: boolean
) {
  const enabled = isRippleEnabled(setup);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple || {};
  el._ripple.enabled = enabled;

  if (setup) {
    el._ripple.centered = !!setup.centered;
    el._ripple.class = setup.class;
    el._ripple.circle = !!setup.circle;
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

export function stopListeners(el: any) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleHide);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("dragstart", rippleHide);
}

export default {
  css: cssClass.style,
  directive: (el: any, setup?: RippleSetup) => startListeners(el, setup, false),
};
