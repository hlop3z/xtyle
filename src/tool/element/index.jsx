import ripple from "./ripple";

const globalDirectives = [
  "xClick",
  "xHover",
  "xSwipe",
  "xRipple",
  "xSelf",
  "xPointer",
  "xNoselect",
  "xInit",
  "xScroll",
];

function initElement(util) {
  // Inject Stylesheet
  util.inject(ripple.css, "app-ripple");

  const Component = (props) => {
    const { useEffect } = preact;
    const tag = props["x-tag"] ? props["x-tag"] : "div";
    const attrs = props.attrs ? props.attrs : {};
    const customAttrs = {};
    const prop = util.props(props);
    const css = {
      class: !props.class ? undefined : util.class(props.class),
      style: !props.style ? undefined : util.style(props.style),
    };

    /*
      @ x-self (useRef)
    */
    let refAdmin = prop.xSelf;
    const directives = util.directives.find(props);
    if ((directives.length > 0 || prop.xInit) && !refAdmin) {
      refAdmin = util.self();
    }

    /*
      @ x-hover
    */
    if (prop.xHover) {
      customAttrs.onMouseEnter = (e) => {
        prop.xHover(true);
        if (attrs.onMouseEnter) {
          attrs.onMouseEnter(e);
        }
      };
      customAttrs.onMouseLeave = (e) => {
        prop.xHover(false);
        if (attrs.onMouseLeave) {
          attrs.onMouseLeave(e);
        }
      };
    }

    /*
      @ x-swipe
    */
    if (prop.xSwipe) {
      const { handleTouchStart, handleTouchMove, handleTouchEnd } =
        SwipeDetector(prop.xSwipe);
      customAttrs.onTouchStart = handleTouchStart;
      customAttrs.onTouchMove = handleTouchMove;
      customAttrs.onTouchEnd = handleTouchEnd;
    }

    /*
      @ x-click
    */
    if (prop.xClick) {
      customAttrs.onClick = prop.xClick;
    }

    /*
      @ x-ripple
    */
    if (prop.xRipple) {
      useEffect(() => {
        if (prop.xRipple === true) {
          ripple.directive(refAdmin.current);
        } else {
          ripple.directive(refAdmin.current, prop.xRipple);
        }
      }, [refAdmin.current]);
    }

    const selfConfig = {
      ref: refAdmin,
      //...prop,
      ...attrs,
      ...customAttrs,
      ...css,
    };

    /*
      @ INIT
    */
    if (prop.xInit) {
      useEffect(() => {
        prop.xInit(selfConfig);
      }, [props]);
    }

    /*
      @ Directives
    */
    directives.forEach((key) => {
      const method = util.directives.method[key];
      if (method && !globalDirectives.includes(method))
        method(selfConfig, prop);
    });

    /*
    console.log(
      Object.keys(props)
        .filter((key) => key.startsWith("x-"))
        .map((key) => key) // util.camel(key)
        .sort()
        .join("\n")
    );
    */
    return h(tag, selfConfig, props.children);
  };

  /*
   @ Swipe (Util)
  */
  function SwipeDetector(emitValue) {
    const { useState } = preact;
    const [startX, setStartX] = useState(null);
    const [endX, setEndX] = useState(null);
    const [startY, setStartY] = useState(null);
    const [endY, setEndY] = useState(null);
    emitValue = emitValue || function () {};
    function handleTouchStart(e) {
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
    }
    function handleTouchMove(e) {
      setEndX(e.touches[0].clientX);
      setEndY(e.touches[0].clientY);
    }
    function handleTouchEnd() {
      const xDistance = startX - endX;
      const yDistance = startY - endY;
      if (Math.abs(xDistance) > Math.abs(yDistance)) {
        if (xDistance > 0) {
          emitValue("left");
        } else if (xDistance < 0) {
          emitValue("right");
        }
      } else {
        if (yDistance > 0) {
          emitValue("up");
        } else if (yDistance < 0) {
          emitValue("down");
        }
      }
      setStartX(null);
      setEndX(null);
      setStartY(null);
      setEndY(null);
    }
    return { handleTouchStart, handleTouchMove, handleTouchEnd };
  }
  return Component;
}

export default initElement;
