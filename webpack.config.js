const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script.js",
    assetModuleFilename: "images/[name][ext]",
    clean: true,
  },

  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
    open: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "MDb",
      filename: "index.html",
      template: "./src/temp.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                    overrideBrowserslist: ["last 5 versions", "ie >9"],
                  }),
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|ico|png|jpg|jpeg|gif)$/,
        exclude: /(node_modules)/,
        type: "file-loader",
      },
    ],
  },
};
