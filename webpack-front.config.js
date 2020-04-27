const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    "./client/index.tsx",
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("./dist"),
    publicPath: "/",
    filename: "client.js",
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: /node_modules/,
        use: ["react-hot-loader/webpack"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "client", "content"),
    historyApiFallback: true,
    host: "0.0.0.0",
    public: "http://localhost:8080",
    hot: true,
    open: true,
    openPage: "",
    proxy: {
      "/": "http://localhost:3000",
    },
  },
});
