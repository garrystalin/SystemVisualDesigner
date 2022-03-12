const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
      template: "./static/index.template.html",
      favicon: "./static/favicon.ico",
      publicPath: "/",
      cache: false,
  }),
];

module.exports = {
  entry: "./src/app.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: plugins,
  watchOptions: {
    ignored: '**/node_modules'
  }
};
