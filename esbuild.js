const FILE = "./dist/index.min.js";
const FILEMJS = "./dist/index.min.mjs";
const MINIFY = false;
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

require("esbuild").build({
  globalName: "Core",
  entryPoints: ["src/index.js"],
  format: "esm",
  target: ["esnext"],
  charset: "utf8",
  outfile: FILEMJS,
  minify: MINIFY,
  treeShaking: true,
  bundle: true,
  banner: {
    js: BANNER.trim(),
  },
});
