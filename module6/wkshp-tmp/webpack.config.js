require('dotenv').config();
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

const prodPlugins = process.env.NODE_ENV === 'development' ? [] : [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new UglifyJsPlugin({ sourceMap: true }),
];
const config = {
  mode: process.env.NODE_ENV,

  entry: './src/index.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve('./public'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize=true',
        }),
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 1500 },
        },
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optipng: {
              optimizationLevel: 7
            }
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devtool: 'source-map',

  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css', allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App Title',
      inject: false,
      template: HtmlWebpackTemplate,
      hash: true,
      mobile: true,
      favicon: 'public/favicon.ico',
      appMountId: 'app',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'HOST']),
  ].concat(prodPlugins)
};

module.exports = config;
