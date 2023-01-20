const Watcher = {
  onRebuild(error, result) {
    if (error) console.error("watch build failed:", error);
    else console.log("watch build succeeded:");
  },
};

const FILE = "../dist/index.js";
const MINIFY = true;
const BANNER = `
/* eslint-disable */
`;

require("esbuild")
  .build({
    globalName: "Core",
    entryPoints: ["app.js"],
    format: "iife",
    target: ["esnext"],
    charset: "utf8",
    watch: Watcher,
    outfile: FILE,
    minify: MINIFY,
    treeShaking: true,
    bundle: true,
    banner: {
      js: BANNER.trim(),
    },
  })
  .then((result) => {
    console.log("watching...");
  });
