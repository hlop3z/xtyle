// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import pkg from "./package.json";

export default defineConfig({
  define: {
    packageName: JSON.stringify(pkg.name),
  },
  plugins: [babel()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "theme",
      fileName: "index",
      formats: ["es"],
    },
  },
});
