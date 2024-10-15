import { Configuration } from "webpack";

export type BuildPaths = {
  entryPath: string;
  htmlPath: string;
  outputPath: string;
  srcPath: string;
  publicPath?: string;
};

export type BuildMode = Configuration["mode"];
export type BuildPlatform = "mobile" | "desktop";

export type BuildOptions = {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  bundleAnalyzer?: boolean;
  platform?: BuildPlatform;
};

export type ConfigurationPlugins = Configuration["plugins"];
export type ConfigurationResolvers = Configuration["resolve"];
