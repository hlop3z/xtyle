// vite.config.js
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import babel from "vite-plugin-babel";
import { resolve } from "path";

export default defineConfig({
  plugins: [babel()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@tool": fileURLToPath(new URL("./tools", import.meta.url)),
    },
  },
  // Remove this to create a (Web-App)
  // Leave it to create a (Library)
  build: {
    lib: {
      entry: resolve(__dirname, "src/xlib.js"),
      name: "index",
      fileName: "index",
      format: "esm",
    },
  },
});
