const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack')

const plugins = [
  new HtmlWebPackPlugin({
    template: path.resolve( __dirname, 'public/index.html' ),
    filename: 'index.html',
    favicon: './public/favicon.ico'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css', // Формат имени файла
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      REACT_APP_API_ORIGIN: JSON.stringify(process.env.REACT_APP_API_ORIGIN)
    }
  }),
  // new webpack.EnvironmentPlugin(['REACT_APP_API_ORIGIN']),
  new webpack.SourceMapDevToolPlugin({
    filename: "[file].map"
  }),
]

let mode = 'development'
let target = 'web'

if (process.env.NODE_ENV === 'production'){
  mode = 'production'
  target = 'browserlist'
}

if (process.env.SERVE) { // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: mode,
  target: target,
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias: {
    //    process: "process/browser"
    // }
  },
  module: {
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      // {
      //   test: /\.html$/,
      //   use: ['html-loader']
      // },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/i,
        use: [process.env.NODE_ENV === 'production' ?
                MiniCssExtractPlugin.loader :
                'style-loader',
              'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|ico)$/,
        exclude: /node_modules/,
        type: mode === 'production' ? 'asset' : 'asset/resource',
        // parser: { dataUrlCondition: { maxSize: 15000 } },
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   use: ['source-map-loader'],
      // },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  devtool: 'source-map',

  devServer: {
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
}
}
