import * as url from "url";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import nodeExternals from "webpack-node-externals";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const config = [
  {
    entry: {
      app: [__dirname + "/src/app/index.ts"],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: __dirname + "/generators/",
      filename: "[name]/index.js",
      library: {
        type: "module",
      },
    },
    // externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({ importType: "module", additionalModuleDirs: ["../../node_modules"] })], // in order to ignore all modules in node_modules folder
    devtool: "source-map",
    mode: "production",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
      alias: {},
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/lib/, /dist/, /templates/, /temp-templates/],
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/app/templates",
            to: "app/templates",
            info: { minimized: true },
          },
        ],
      }),
    ],
  },
];

export default config;
