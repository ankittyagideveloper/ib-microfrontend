/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: "production",
  devtool: "source-map",

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  },
};

export default prodConfig;
