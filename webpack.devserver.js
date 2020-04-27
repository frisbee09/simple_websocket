const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: ["./server/src/index.ts"],
  output: {
    path: path.resolve("./server/dist"),
    filename: "server.js",
  },

  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })], // mangle false else mysql blows up with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
  },
  target: "node",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  externals: [nodeExternals()],
  watch: true,
  devtool: "source-map",
  plugins: [new NodemonPlugin()],
};
