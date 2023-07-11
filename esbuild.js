const FILE = "./dist/pre.min.js";
const MINIFY = true;
const BANNER = `/*! @License MIT | Copyright (c) 2023 hlop3z */`;

require("esbuild").build({
  globalName: "Core",
  entryPoints: ["src/index.js"],
  format: "iife",
  target: ["esnext"],
  charset: "utf8",
  outfile: FILE,
  minify: MINIFY,
  treeShaking: true,
  bundle: true,
  globalName: "xtyle",
  banner: {
    js: BANNER.trim(),
  },
});
