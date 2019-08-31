const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'srcß/assets/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|ogg|wav|json)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};