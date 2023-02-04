// vite.config.js
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [babel()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@tool": fileURLToPath(new URL("./tools", import.meta.url)),
    },
  },
});
