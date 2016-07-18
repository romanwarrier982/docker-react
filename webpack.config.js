const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'app/js/main'),
  devServer: {
    outputPath: path.join(__dirname, 'build'),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'build/js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  web3Loader: {
    constructorParams: {
      MyToken: [ 250000, 'The Coin', 2, 'TC$', '1.0.0' ],
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'app/static'),
        from: '**/*',
        to: path.resolve(__dirname, 'build'),
      },
    ]),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['eslint'],
      },
    ],
    loaders: [
      {
        test: /\.sol$/,
        loaders: ['web3', 'solc'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel'],
      },
    ],
  },
};
