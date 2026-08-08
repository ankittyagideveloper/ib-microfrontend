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

export default devConfig;
