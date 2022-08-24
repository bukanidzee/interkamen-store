const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve( __dirname, 'public/index.html' ),
      filename: 'index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      REACT_APP_API_ORIGIN: JSON.stringify(process.env.REACT_APP_API_ORIGIN)
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
  }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias: {
    //    process: "process/browser"
    // }
  },
  module: {
    rules:[
      {
        test:/\.jsx?$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
                      ['@babel/preset-react', {"runtime": "automatic"}]]
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|ico)$/,
      //   exclude: /node_modules/,
      //   use: ['file-loader?name=[name].[ext]', // ?name=[name].[ext] is only necessary to preserve the original file name
      //         {
      //           loader:'image-webpack-loader',
      //           options: {
      //             disable: true, // webpack@2.x and newer
      //           },
      //         }]
      // },
      {
        test: /\.(png|jpg|jpeg|ico)$/,
        exclude: /node_modules/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 15000 } },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'public'),
  //   },
  //   compress: true,
  //   port: 8080,
  // },
}
