// vite.config.js
import { fileURLToPath } from "url";
import { resolve } from "path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [babel()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "App",
      fileName: (format) => `App.${format}.js`,
    },
  },
  resolve: {
    alias: {
      "@devtool": fileURLToPath(new URL("./devtool", import.meta.url)),
    },
  },
});
