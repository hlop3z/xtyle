// rollup.config.js
import fs from "fs";
import terser from "@rollup/plugin-terser";

// Read the package.json
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

export default {
  input: "dist/index.js",
  output: {
    file: `dist/${pkg.name}.min.js`,
    format: "iife",
    name: pkg.name,
    plugins: [terser()],
  },
};
