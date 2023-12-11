export const BLANK_VALUES = ["", null, undefined];

export const ALL_JS_FIELD_TYPES = [
  Object,
  Number,
  String,
  Boolean,
  undefined,
  null,
  Array,
  Function,
  Symbol,
  BigInt,
];

export const JS_TYPES: any = {
  object: Object,
  bigint: BigInt,
  number: Number,
  string: String,
  boolean: Boolean,
  undefined: undefined,
  null: null,
  array: Array,
  function: Function,
  // symbol: Symbol,
};

export const JS_TYPES_REVERSE = Object.fromEntries(
  Object.entries(JS_TYPES).map(([key, value]) => [value, key])
);

export const PYTHON_EQUIVALENTS = {
  object: "dict",
  bigint: "int",
  number: "float",
  string: "str",
  boolean: "bool",
  undefined: "None",
  null: "None",
  array: "list",
  function: "function",
  // symbol: "unknown",
};

const PYTHON_EQUIVALENTS_REVERSE = Object.fromEntries(
  Object.entries(PYTHON_EQUIVALENTS).map(([key, value]) => [
    value,
    JS_TYPES[key],
  ])
);
PYTHON_EQUIVALENTS_REVERSE.lambda = Function;
PYTHON_EQUIVALENTS_REVERSE.method = Function;
export { PYTHON_EQUIVALENTS_REVERSE };

/*
// Usage

const inputSchema = {
  keyOneA$: Object,
  keyTwoA: Array,
  keyOneB: "null",
  keyTwoB: {
    type: [
      Object,
      Number,
      String,
      Boolean,
      // undefined,
      // null,
      Array,
      Function,
      Symbol,
      BigInt,
    ],
    default: () => "Hello World",
  },
};

const demoSchema = PropsSchemaBuilder(inputSchema);
console.log(demoSchema);
*/
