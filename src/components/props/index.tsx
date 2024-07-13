import { createDefaultForm } from "../util";

import {
  ALL_JS_FIELD_TYPES,
  BLANK_VALUES,
  JS_TYPES,
  JS_TYPES_REVERSE,
  PYTHON_EQUIVALENTS_REVERSE,
  PYTHON_EQUIVALENTS,
} from "./types";

function getValueInfo(value) {
  let typeToProcess = "any";
  if (value && typeof value === "object" && value.constructor === Object) {
    typeToProcess = "object";
  } else if (
    value &&
    typeof value === "object" &&
    value.constructor === Array &&
    Array.isArray(value)
  ) {
    typeToProcess = "array";
  } else if (ALL_JS_FIELD_TYPES.includes(value)) {
    typeToProcess = "primitive";
  }
  return {
    type: typeToProcess,
    value,
  };
}

function getKeyInfo(value) {
  value = value || "";
  const required = !value.includes("$");
  const name = value.replace(/[^a-zA-Z0-9-]/g, "");
  return {
    name,
    required,
    default: null,
  };
}

function PropsSchemaBuilder(inputSchema, withPythonTypes = false) {
  const finalSchema = {};
  const resetSchema = {};
  const allKeys = new Set();

  Object.entries(inputSchema).forEach(([key, value]) => {
    const { type, value: val } = getValueInfo(value);
    const keyInfo: any = getKeyInfo(key);

    if (type === "primitive") {
      if (BLANK_VALUES.includes(val)) {
        keyInfo.required = false;
      }
      keyInfo.types = [val]; //[JS_TYPES_REVERSE[val]];
    } else if (type === "array") {
      if (val.some((item) => BLANK_VALUES.includes(item))) {
        keyInfo.required = false;
      }
      keyInfo.types = val; //.map((element) => JS_TYPES_REVERSE[element]);
    } else if (type === "object") {
      if (
        Array.isArray(val.type) &&
        val.type.some((item) => BLANK_VALUES.includes(item))
      ) {
        keyInfo.required = false;
      } else if (BLANK_VALUES.includes(val.type)) {
        keyInfo.required = false;
      }

      keyInfo.default = val.default !== undefined ? val.default : null;
      keyInfo.types = val.type; //.map((element) => JS_TYPES_REVERSE[element]);
    } else if (type === "any") {
      keyInfo.types = ["any"];
    }

    // PYTHON_EQUIVALENTS
    if (withPythonTypes) {
      keyInfo.python = [];
      if (!keyInfo.types.includes["any"]) {
        keyInfo.python = keyInfo.types.map(
          (x) => PYTHON_EQUIVALENTS[JS_TYPES_REVERSE[x]]
        );
      }
    }
    resetSchema[keyInfo.name] = keyInfo.default;
    finalSchema[keyInfo.name] = keyInfo;
    allKeys.add(keyInfo.name);
  });

  return {
    keys: Array.from(allKeys),
    meta: finalSchema,
    props: (form) => ({ ...createDefaultForm(resetSchema), ...(form || {}) }),
  };
}

PropsSchemaBuilder.types = JS_TYPES;
PropsSchemaBuilder.field = PYTHON_EQUIVALENTS_REVERSE;

export default PropsSchemaBuilder;
