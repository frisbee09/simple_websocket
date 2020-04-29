const merge = require("webpack-merge");
const common = require("./webpack.common");
const nodeExternals = require("webpack-node-externals");

const sharedConfig = merge(common, {
  mode: "production",
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
});

const serverConfig = merge(sharedConfig, {
  target: "node",
  entry: { server: "./server/index.ts" },
  externals: [nodeExternals()],
});

const clientConfig = merge(sharedConfig, {
  entry: { client: "./client/index.tsx" },
});

module.exports = [serverConfig, clientConfig];
