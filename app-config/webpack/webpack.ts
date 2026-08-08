import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";

export interface CommonConfigOptions {
  /** Absolute path to the consuming app's root directory (pass `__dirname`). */
  context: string;
  /** Entry point relative to `context`. Defaults to `./src/index.tsx`. */
  entry?: string;
  /** Public HTML template relative to `context`. Defaults to `./public/index.html`. */
  htmlTemplate?: string;
}

export function createCommonConfig(options: CommonConfigOptions): Configuration {
  const {
    context,
    entry = "./src/index.tsx",
    htmlTemplate = "./public/index.html",
  } = options;

  return {
    entry,

    output: {
      path: path.resolve(context, "dist"),
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
        template: htmlTemplate,
      }),
    ],
  };
}
