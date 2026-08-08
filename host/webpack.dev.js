/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: "development",
  devtool: "eval-source-map",

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
};

module.exports = devConfig;
