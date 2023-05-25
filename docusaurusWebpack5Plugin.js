const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = function (context, options) {
  return {
    name: 'custom-docusaurus-plugin',

    configureWebpack(config, isServer, utils) {
      return {
        mergeStrategy: {
          'resolve.fallback': 'append',
          plugins: 'append',
        },
        resolve: {
          alias: {
            path: require.resolve('path-browserify'),
          },
          fallback: {
            fs: false,
            http: false, //require.resolve('stream-http'),
            https: false, //require.resolve('https-browserify'),
            os: false, //require.resolve('os-browserify/browser'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer/'),
          },
        },
        plugins: [
          new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
          }),
        ],
        externals: {
          bufferutil: 'bufferutil',
          'utf-8-validate': 'utf-8-validate',
        },
      };
    },
  };
};
