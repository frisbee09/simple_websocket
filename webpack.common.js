const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
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
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  watch: true,
  devtool: "source-map",
};
