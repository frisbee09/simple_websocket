const merge = require("webpack-merge");
const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  entry: { server: "./server/index.ts" },
  output: {
    path: path.resolve("./dist"),
    filename: "server.js",
  },
  watch: true,
  target: "node",
  externals: [nodeExternals()],
  plugins: [new NodemonPlugin()],
  devtool: "source-map",
});
