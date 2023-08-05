const { useRef } = preact;

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
 * Factory function for creating a RefAdmin object with admin capabilities.
 * @returns {RefAdmin} - The RefAdmin object.
 */
export default function createRefAdmin(
  realRef: object | undefined = undefined
): RefAdmin {
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
