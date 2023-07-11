// webpack.config.js
const path = require("path");
const webpack = require("webpack");

new webpack.BannerPlugin({
  banner: "hello world",
});

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    library: "PREACT",
    filename: "bundle.min.js",
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, "dist"),
  },
};
