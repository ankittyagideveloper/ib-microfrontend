import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import devConfig from "./webpack.dev.js";
import prodConfig from "./webpack.prod.js";

/** @type {import('webpack').Configuration} */
const commonConfig = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(import.meta.dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        resolve: { fullySpecified: false },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: { syntax: "ecmascript", jsx: true },
              transform: { react: { runtime: "automatic" } },
            },
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", tsx: true },
              transform: { react: { runtime: "automatic" } },
            },
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

export default (env) => {
  const { mode = "development" } = env ?? {};
  const envConfig = mode === "production" ? prodConfig : devConfig;
  return merge(commonConfig, envConfig);
};
