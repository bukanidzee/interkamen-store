const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

let isProduction = process.env.NODE_ENV === 'production'


const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebPackPlugin({
    template: path.resolve( __dirname, 'public/index.html' ),
    filename: 'index.html',
    favicon: 'public/favicon.ico'
  }),
  new MiniCssExtractPlugin({
    filename: isProduction ? '[name].[contenthash].css' : '[name].css', // Формат имени файла
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  new webpack.EnvironmentPlugin(['REACT_APP_API_ORIGIN']),
  new webpack.SourceMapDevToolPlugin({
    filename: "[file].map"
  }),
]

if (process.env.SERVE) { // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {front: path.resolve(__dirname, "./src/index.js")},
  output: {
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss'],
    alias: {
      'react-virtualized/List': 'react-virtualized-reactv17/dist/es/List',
      'react-virtualized/styles.css': 'react-virtualized-reactv17/styles.css'
  },
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
            plugins: [
              !isProduction && require("react-refresh/babel")
            ].filter(Boolean),
            presets: ['@babel/preset-env',
                      ['@babel/preset-react', {"runtime": "automatic"}]],
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: [isProduction ?
                MiniCssExtractPlugin.loader :
                'style-loader',
              {loader: 'css-loader',
                options: {
                  // modules: true,
                  sourceMap: !isProduction
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: !isProduction,
                  postcssOptions: {
                    config: path.resolve(__dirname, "src/static/css/postcss.config.js"),
                  },
                },
              },
              {loader: 'sass-loader',
                options: {
                  // modules: true,
                  sourceMap: !isProduction
                }
              }
            ]
      },
      {
        test: /\.(png|jpg|jpeg|ico)$/,
        exclude: /node_modules/,
        type: isProduction ? 'asset' : 'asset/resource',
        // type: 'asset',
        parser: { dataUrlCondition: { maxSize: 15000 } },
      },
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
}
}
