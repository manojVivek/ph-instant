const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: "static", to: "static" },
        { from: "manifest.json", to: "manifest.json" },
      ],
      { debug: true, context: "." }
    ),
  ]
};
