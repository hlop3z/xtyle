const FILE = "./dist/index.js";
const MINIFY = true;
const BANNER = `
/* eslint-disable */
`;

const FOOTER = `
var xtyle = (function() {
    return null
})();
`;

require("esbuild").build({
  globalName: "Core",
  entryPoints: ["src/__init__.js"],
  format: "esm",
  target: ["esnext"],
  charset: "utf8",
  outfile: FILE,
  minify: MINIFY,
  treeShaking: true,
  bundle: true,
  banner: {
    js: BANNER.trim(),
  },
  footer: {
    js: FOOTER.trim(),
  },
});
