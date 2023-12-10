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
      models: allModels,
    };
  },
};

export default Plugin;
