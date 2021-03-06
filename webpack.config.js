const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    alias: {
      data: path.resolve(__dirname, 'src/data/'),
      lib: path.resolve(__dirname, 'src/lib/'),
      functions: path.resolve(__dirname, 'src/functions/index.js'),
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }, {
      test: /\.m?js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
