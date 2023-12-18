// @ts-nocheck

const Plugin = {
  install() {
    return {
      // Globals
      globals: {
        key: "value",
      },
      // Store
      store: {
        title: preact.signal(null),
      },
    };
  },
};

export default Plugin;
