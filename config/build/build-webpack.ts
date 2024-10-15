import "webpack-dev-server";

import { BuildOptions } from "./types/types";
import { Configuration } from "webpack";
import { buildDevServer } from "./build-devserver";
import { buildLoaders } from "./build-loaders";
import { buildPlugins } from "./build-plugins";
import { buildResolvers } from "./build-resolvers";

export type Mode = Configuration["mode"];
export type EnvVariables = {
  mode: Mode;
  port: number;
};

export function buildWebpack(env: BuildOptions): Configuration {
  const { mode, port, paths } = env;

  const config: Configuration = {
    mode: mode ?? "development",

    devtool: "inline-source-map",

    entry: paths.entryPath,

    output: {
      path: paths.outputPath,
      filename: "[name].[contenthash].js",
      clean: true,
    },

    module: {
      rules: buildLoaders(mode),
    },

    resolve: buildResolvers(env),

    plugins: buildPlugins(env),

    devServer: buildDevServer(port),
  };

  return config;
}
