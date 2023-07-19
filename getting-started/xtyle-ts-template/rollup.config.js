// rollup.config.js
import terser from "@rollup/plugin-terser";

export default {
  input: "dist/index.js",
  output: {
    file: "dist/theme.min.js",
    format: "iife",
    name: "theme",
    plugins: [terser()],
  },
};
