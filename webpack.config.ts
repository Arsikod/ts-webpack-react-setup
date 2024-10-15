import "webpack-dev-server";

import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from "./config/build/types/types";

import { Configuration } from "webpack";
import { buildWebpack } from "./config/build/build-webpack";
import path from "path";

type EnvVariables = {
  mode: BuildMode;
  port: number;
  platform?: BuildPlatform;
};

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entryPath: path.resolve(__dirname, "src", "index.tsx"),
    htmlPath: path.resolve(__dirname, "public", "index.html"),
    outputPath: path.resolve(__dirname, "dist"),
    srcPath: path.resolve(__dirname, "src"),
    publicPath: path.resolve(__dirname, "public"),
  };

  const config: Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 8080,
    paths,
    platform: env.platform ?? "desktop",
  });
  return config;
};
