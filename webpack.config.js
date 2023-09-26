const path    = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/james-strategy.js",
  resolve: { 
    modules: [path.resolve(__dirname, 'src'), 'node_modules'] 
  },
  output: {
    filename: "james-strategy.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
