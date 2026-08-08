const { createCommonConfig } = require("app-config");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");

/** @type {import('webpack').ConfigurationFactory} */
module.exports = (env) => {
  const { mode = "development" } = env ?? {};

  const commonConfig = createCommonConfig({ context: __dirname });

  const envConfig = mode === "production" ? prodConfig : devConfig;
  return merge(commonConfig, envConfig);
};
