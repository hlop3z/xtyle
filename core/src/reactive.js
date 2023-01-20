function reDraw() {
  console.log(`Trigger ReDraw | Reactive (Value)`);
}

function setProperty(obj, key, defaultValue) {
  // Proxy
  Object.defineProperty(obj, key, {
    get: function () {
      return this.____dict____[key];
    },
    set: function (value) {
      // reDraw();
      const doRedraw = this.____dict____.__redraw__;
      if (this.____dict____[key] !== value) {
        this.____dict____[key] = value;
        if (doRedraw) {
          doRedraw();
        }
      }
    },
  });
  // Init
  obj[key] = defaultValue;
}

function createReactive(obj) {
  const theProps = { ____dict____: {} };
  Object.keys(obj).forEach((key) => {
    setProperty(theProps, key, obj[key]);
  });

  function setRerender(obj, key, value) {
    const doRedraw = obj.____dict____.__redraw__;
    if (obj.____dict____[key] !== value) {
      obj.____dict____[key] = value;
      if (doRedraw) {
        doRedraw();
      }
    }
  }

  theProps.$set = (key, value) => setRerender(theProps, key, value);
  theProps.$get = (key) => theProps.____dict____[key];
  return theProps;
}

export default createReactive;
