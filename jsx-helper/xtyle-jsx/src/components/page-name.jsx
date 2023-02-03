export default {
  tag: "h3",
  slot: {
    default() {
      const { $router } = this;
      const current = $router.args.name || "home";
      const pageName = current.charAt(0).toUpperCase() + current.slice(1);
      return pageName + " View";
    },
  },
};
