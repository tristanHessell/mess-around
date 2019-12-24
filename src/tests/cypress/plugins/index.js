const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../webpack.config.js');

module.exports = (on) => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions,
    watchOptions: {},
  };

  on('file:preprocessor', webpack(options));
};
