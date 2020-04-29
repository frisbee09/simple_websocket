const merge = require("webpack-merge");
const common = require("./webpack.common");
const nodeExternals = require("webpack-node-externals");

module.exports = merge(common, {
  mode: "production",
  entry: { client: "./client/index.tsx", server: "./server/index.ts" },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  externals: [nodeExternals()],
});
