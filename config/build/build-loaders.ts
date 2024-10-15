import { BuildMode } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/build-babel-loader";

export function buildLoaders(mode: BuildMode): ModuleOptions["rules"] {
  const isProd = mode === "production";
  const isDev = mode === "development";

  const tsLoader = {
    test: /\.tsx?$/,
    loader: "ts-loader",
    options: {
      transpileOnly: isDev,
      getCustomTransformers: () => ({
        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
      }),
    },
    exclude: /node_modules/,
  };

  const cssFIleName = isProd ? "[hash:base64:8]" : "[path][name]__[local]";

  const cssLoaderWIthModules = {
    loader: "css-loader",

    options: {
      modules: {
        localIdentName: cssFIleName,
        namedExport: false,
      },
    },
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              // Convert color values to shorter formats, but leave `currentColor` unchanged
              {
                name: "convertColors",
                params: {
                  currentColor: true, // Ensures currentColor is left as-is
                },
              },
            ],
          },
        },
      },
    ],
  };

  const styleExtractor = isProd ? MiniCssExtractPlugin.loader : "style-loader";

  const scssLoader = {
    test: /\.(sa|sc|c)ss$/i,
    use: [styleExtractor, cssLoaderWIthModules, "sass-loader"],
  };

  const babelLoader = buildBabelLoader(mode);

  return [assetLoader, babelLoader, scssLoader, svgLoader];
}
