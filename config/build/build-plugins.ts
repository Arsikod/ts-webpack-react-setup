import { BuildOptions, ConfigurationPlugins } from "./types/types";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { DefinePlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";

export function buildPlugins({
  mode,
  paths,
  bundleAnalyzer = false,
  platform,
}: BuildOptions): ConfigurationPlugins {
  const isProd = mode === "production";
  const isDev = mode === "development";

  const plugins: ConfigurationPlugins = [
    new HtmlWebpackPlugin({
      template: paths.htmlPath,
      filename: "index.html",
      favicon: path.resolve(paths.publicPath, "favicon.ico"),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      })
    );

    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(paths.publicPath, "locales"),
            to: path.resolve(paths.outputPath, "locales"),
          },
        ],
      })
    );
  }

  if (bundleAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
