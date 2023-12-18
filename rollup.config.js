// rollup.config.js
import fs from "fs";
import terser from "@rollup/plugin-terser";

// Read the package.json
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

// Terser Config
const terserConfig = {
  compress: {
    drop_console: true,
  },
};

export default {
  input: "dist/index.js",
  output: {
    format: "iife",
    name: pkg.name,
    file: `dist/${pkg.name}.min.js`,
    plugins: [terser(terserConfig)],
  },
};
