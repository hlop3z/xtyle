// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [babel()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "theme",
      fileName: "index",
    },
  },
});
