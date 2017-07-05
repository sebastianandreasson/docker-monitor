const { join } = require('path')
const {
  HotModuleReplacementPlugin, ProvidePlugin, NoErrorsPlugin
} = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const HappyPack = require('happypack')

module.exports = {
  devtool: 'eval',
  entry: {
    bundle: [
      'webpack-hot-middleware/client',
      './src/index'
    ]
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HotModuleReplacementPlugin(),
    new ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new NoErrorsPlugin(),
    new LiveReloadPlugin(),
    new HappyPack({
      threads: 4,
      loaders: ['babel']
    })
  ],
  postcss: [
    require('postcss-import')({
      path: 'src'
    }),
    require('postcss-css-variables'),
    require('postcss-custom-media'),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-nested'),
    require('postcss-short'),
    require('autoprefixer'),
    require('cssnano')({
      discardUnused: false,
      zindex: false
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'happypack/loader',
        include: join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&sourceMap=true&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src/styles',
      'src/components',
      'node_modules',
      'src'
    ],
    extensions: ['', '.js', '.css', '.json', '.md']
  }
}
