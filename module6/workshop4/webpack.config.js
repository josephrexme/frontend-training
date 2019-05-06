const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 1500 },
        },
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
            },
            optipng: {
              optimizationLevel: 7
            }
          }
        }]
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      title: 'My First React App',
      template: 'src/template.html',
    })
  ]
};

module.exports = config;
