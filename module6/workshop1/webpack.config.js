const path = require('path');

const config = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;