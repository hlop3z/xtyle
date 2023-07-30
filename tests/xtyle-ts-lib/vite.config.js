// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  define: {
    packageName: JSON.stringify(pkg.name),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "theme",
      fileName: "index",
      formats: ["es"],
    },
  },
});
