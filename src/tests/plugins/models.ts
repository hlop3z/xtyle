// @ts-nocheck

/* @Model */
const formTwo = ["key"];

const formOne = {
  message: "hello world",
};

const Plugin = {
  install() {
    return {
      // MODELS
      models: {
        $ref: {
          modelOne: "database_table_one",
          "appOne.modelOne": "database_table_two",
        },
        coreModels: {
          $root: true,
          modelOne: formTwo,
          modelTwo: formTwo,
        },
        appOne: {
          modelOne: formOne,
          modelTwo: formOne,
        },
        appTwo: {
          modelOne: formOne,
          modelTwo: formOne,
        },
      },
    };
  },
};

export default Plugin;
