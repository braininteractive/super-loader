var config = require('./webpack.config.js');

config.entry = {
  'super-loader': './bin/index.js',
};

config.output = {
  filename: './dist/[name].js',
  library: 'superLoader',
  libraryTarget: 'umd'
};

module.exports = config;