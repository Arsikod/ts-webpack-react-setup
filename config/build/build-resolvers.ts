import { BuildOptions, ConfigurationResolvers } from "./types/types";

import path from "path";

export function buildResolvers({
  paths,
}: BuildOptions): ConfigurationResolvers {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": paths.srcPath,
    },
  };
}
