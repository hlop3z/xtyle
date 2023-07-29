const PROJECT_NAME = "preact";

// webpack.config.js
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    library: PROJECT_NAME,
    filename: "index.min.js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
  },
};
