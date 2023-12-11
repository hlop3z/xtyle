/* @Model */
const formOne = {
  message: "hello world",
};
const formTwo = ["key"];

const schemaOne = {
  appOne: {
    modelOne: formOne,
    modelTwo: formOne,
  },
  appTwo: {
    modelOne: formOne,
    modelTwo: formOne,
  },
};
const schemaTwo = {
  $root: true,
  modelOne: formTwo,
  modelTwo: formTwo,
};

const allModels = {
  ...schemaOne,
  schemaTwo,
};
const Plugin = {
  install() {
    console.log("install", allModels);
    return {
      // Core
      globals: {
        key: "value",
      },
      store: {
        title: preact.signal(null),
      },

      // MODELS
      models: allModels,

      // ACTIONS
      actions: {
        method() {
          console.log(`Core Method`);
        },
        app: {
          method() {
            console.log(`Sub Method`);
          },
        },
      },
    };
  },
};

export default Plugin;
