import h from "./component";
import { element } from "./hyperscript";
import app from "./router";
import { inject } from "./ripple.js";

/*
window.$____XPRIVATEDICTX____$ = {
  router: {},
  components: {},
  static: {},
  vars: {},
  methods: {},
};
*/

const Component = {
  props: {
    tag: { type: String, default: "div" },
    name: { type: String, default: "xtyle-virtual-container-app" },
    slots: { type: Array, default: () => [] },
    mounted: { type: Function, default: () => () => null },
    style: { type: Object, default: () => ({}) },
    css: { type: Object, default: () => ({}) },
    body: { type: Boolean, default: false },
    methods: { type: Object, default: () => ({}) },
  },
  data: {
    $vm: {},
  },
  mounted() {
    let vdom = null;

    if (this.body) {
      const { el } = element.create(document.body, this.name);
      vdom = el;
    } else {
      const el = this.$el;
      vdom = el;
    }

    // Style
    const styleAdmin = (el, value) => {
      const elem = this.$vm[el];
      elem.style.cssText = value;
    };

    // Toggle Class
    const toggleAdmin = (el, key, value = null) => {
      const elem = this.$vm[el];
      if (value !== null) {
        elem.classList.toggle(key, value);
      } else {
        elem.classList.toggle(key);
      }
    };

    // Add Class
    const addClassAdmin = (el, value = null) => {
      const elem = this.$vm[el];
      value
        .trim()
        .split(" ")
        .forEach((cls) => {
          elem.classList.add(cls);
        });
    };

    // INIT Children
    this.slots.forEach((side) => {
      const slot = this.$slot(side, {
        vdom: vdom,
        admin: this,
        toggle: (...args) => toggleAdmin(...args),
        self: () => {
          return this.$vm[side];
        },
      });
      if (slot) {
        const vnode = element.h(slot);
        this.$vm[side] = vnode;
        vdom.appendChild(vnode);
      }
    });

    // Add Default Style & Class
    this.slots.forEach((side) => {
      const style = this.style[side];
      const cssClass = this.css[side];
      if (style) {
        styleAdmin(side, style);
      }
      if (cssClass) {
        addClassAdmin(side, cssClass);
      }
    });

    // Mounted with Bind
    this.mounted.bind(this)();
  },
  view() {
    if (this.body) {
      return null;
    }
    return [this.tag, {}, []];
  },
};

// h, mount, router, reactive, go, redraw
export default {
  h,
  app,
  element,
  view: h(Component),
  inject: inject,
};
