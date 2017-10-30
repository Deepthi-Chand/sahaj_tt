var argv = require('yargs').argv;
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var debug = require('debug')('app:config:webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Environment Constants
var NODE_ENV = process.env.NODE_ENV;
var __DEV__ = NODE_ENV === 'development';
var __PROD__ = NODE_ENV === 'production';
var __TEST__ = NODE_ENV === 'test';
var __COVERAGE__ = !argv.watch && __TEST__;
var __BASENAME__ = JSON.stringify(process.env.BASENAME || '');
var __API_URL__ = JSON.stringify(process.env.API_URL || '');
var GLOBALS = {
  'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
  NODE_ENV: NODE_ENV,
  __DEV__: __DEV__,
  __PROD__: __PROD__,
  __TEST__: __TEST__,
  __COVERAGE__: __COVERAGE__,
  __BASENAME__: __BASENAME__,
  __API_URL__: __API_URL__
};

// Constants
var ROOT = path.resolve(__dirname);
var DIST = path.join(ROOT, 'dist');
var SRC = path.join(ROOT, 'src');
var PROJECT_PUBLIC_PATH = '/';

// Base Configuration
var webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: { rules: [] }
};

// Entry
var APP_ENTRY = path.join(SRC, 'app.tsx');
var REACT_HOT_PATCH = 'react-hot-loader/patch';
var WEBPACK_DEV_SERVER = `webpack-hot-middleware/client?path=${PROJECT_PUBLIC_PATH}__webpack_hmr`
webpackConfig.entry = {
  app: __DEV__
    ? [REACT_HOT_PATCH, APP_ENTRY, WEBPACK_DEV_SERVER]
    : [APP_ENTRY],
  vendor: [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'redux',
    'react-redux',
    'ramda'
  ]
};

// Output
webpackConfig.output = {
  filename: `[name].[hash].js`,
  path: DIST,
  publicPath: PROJECT_PUBLIC_PATH
};

// Plugins
webpackConfig.plugins = [
  new webpack.DefinePlugin(GLOBALS),
  new HtmlWebpackPlugin({
    template: path.join(SRC, 'index.html'),
    hash: false,
    favicon: path.join(SRC, 'favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: { collapseWhitespace: true }
  }),
  new CopyWebpackPlugin([
    { from: 'src/images', to: 'images' },
    { from: 'src/fonts', to: 'fonts' }
  ])
];

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurrenceOrder & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

// Rules
var CSS_LOADERS = [
  'style-loader',
  'css-loader?sourceMap&-minimize',
  'postcss-loader'
];
function addRules(rules) {
  webpackConfig.module.rules = webpackConfig.module.rules.concat(rules);
}
// TypeScript and source maps
addRules([
  { test: /\.tsx?$/, loader: 'ts-loader' },
  { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
]);
// Styles
addRules([
  {
    test: /\.scss$/,
    loaders: [
      ...CSS_LOADERS,
      'sass-loader?sourceMap'
    ]
  },
  {
    test: /\.css$/,
    loaders: CSS_LOADERS
  }
]);
webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({ sassLoader: { includePaths: path.join(SRC, 'styles') } })
);
// Files
addRules([
  { test: /\.woff(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
]);

// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Applying ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.rules.filter(rule =>
    rule.loaders && rule.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach(loader => {
    const first = loader.loaders[0];
    const rest = loader.loaders.slice(1);
    loader.loader = ExtractTextPlugin.extract({ fallback: first, use: rest.join('!') });
    delete loader.loaders;
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    })
  )
}

module.exports = webpackConfig;
