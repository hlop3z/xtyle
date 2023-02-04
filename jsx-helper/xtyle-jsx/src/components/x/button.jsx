export default {
  tag: "button",
  follow: ["counter"],
  props: {
    isGlobal: false,
  },
  data: {
    count: 0,
  },
  attrs: {
    "x-on:click": (vnode, event) => {
      const { isGlobal } = vnode.state;
      const { counter } = vnode.$store;
      if (isGlobal) {
        counter.state = (draft) => {
          draft.count += 1;
        };
      } else {
        vnode.state = (draft) => {
          draft.count += 1;
        };
      }
      console.log(event);
    },
  },
  slot: {
    default() {
      const { isGlobal } = this.state;
      if (isGlobal) {
        const { counter } = this.$store;
        const { count } = counter.state;
        return "Global Count is: " + count;
      }
      const { count } = this.state;
      return "Local Count is: " + count;
    },
  },
};
