import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge"


export const createCommonConfig = async (uniqueName: string) => {
  return {
    output: {
      path: path.resolve(process.cwd(), "build"),
      clean: true,
      filename: "[name].[contenthash].js",
      uniqueName
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
}


export const createDevelopmentConfig = async (uniqueName: string, config = {}) => {
  return merge(
    await createCommonConfig(uniqueName), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
      historyApiFallback: true,
      port: process.env.PORT,
      client:{
        overlay:false
      }
    }
  }, config
  )
}

export const createHostDevelopmentConfig = async (uniqueName: string, config = {})=>{
  return merge(
    await createDevelopmentConfig(uniqueName, {
      //Todo: module federation plugin setup
    }), config
  )
}