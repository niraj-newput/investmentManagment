const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }) 
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin('./assets/css/app.css')
    ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
 
}