// @ts-nocheck

const Plugin = {
  install() {
    return {
      // Init
      init: {
        before: [],
        after: [],
      },
      // Router
      router: {
        before({ prev, next, commit, redirect }) {
          const { search, arg } = next;
          // GET TABLES
          console.log(search, arg);
          commit();
          // redirect("/login");
        },
        after({ prev, next }) {},
      },
    };
  },
};

export default Plugin;
