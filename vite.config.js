// vite.config.js
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [babel()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@tool": fileURLToPath(new URL("./src/tool", import.meta.url)),
      "@devtool": fileURLToPath(new URL("./devtool", import.meta.url)),
    },
  },
});
