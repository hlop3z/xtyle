// Usage Example
const Options = {
  key: "value",
};

const myPlugin = {
  install(self, options) {
    console.log("My Plugin Installation", self, options);
    return {
      elements: {},
      directives: {},
      globals: {},
      store: {},
      init: {
        before: [],
        after: [],
      },
      router: {
        before({ prev, next, commit, redirect }) {
          commit();
          // redirect("/login");
        },
        after({ prev, next }) {},
      },
    };
  },
};

/** 

// Init
export default {
  before: [],
  after: [],
};

// Router  
export default {
  before({ prev, next, commit, redirect }) {
    commit();
    // redirect("/login");
  },
  after({ prev, next }) {},
};


**/

xtyle.use(myPlugin, Options);
