/*
    @ Admin
*/
function refAdmin() {
  const refAdmin = preact.useRef(null);
  const self = {
    get $() {
      return refAdmin;
    },
    get current() {
      return refAdmin.current;
    },
    set current(value) {
      refAdmin.current = value;
    },
    contains(className) {
      try {
        return this.current.classList.contains(className);
      } catch (e) {
        return false;
      }
    },
    add(...args) {
      try {
        this.__add(...args);
      } catch (e) {}
    },
    remove(...args) {
      try {
        this.__remove(...args);
      } catch (e) {}
    },
    toggle(args, value = null) {
      try {
        this.__toggle(value, ...args);
      } catch (e) {}
    },
    __add(...args) {
      args = args || [];
      args.forEach((className) => {
        this.current.classList.add(className);
      });
    },
    __remove(...args) {
      args = args || [];
      args.forEach((className) => {
        this.current.classList.remove(className);
      });
    },
    __toggle(value, ...args) {
      args = args || [];
      if (Object.keys(args).length === 0) args.push(hideElement);
      args.forEach((className) => {
        if (value === null) {
          this.current.classList.toggle(className);
        } else {
          this.current.classList.toggle(className, value);
        }
      });
    },
  };
  return self;
}

export default refAdmin;
