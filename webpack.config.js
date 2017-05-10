'use strict';


var webpack = require('webpack');
var	path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryBasePath  = __dirname;
var outputBasePath = __dirname + '/dist';

module.exports = {
	context: entryBasePath,
	entry: {
		app: ['webpack/hot/dev-server', './appEntry.js']
	},
	output: {
		path: outputBasePath,
		filename: './bundle.js',
		sourceMapFilename: '[file].map' // set source map output name rule
	},
	devtool: 'source-map', // enable source map
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({template: 'index.html'})
		// ,
		// new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
	], 
	module: {
		loaders: [
			{test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}, 
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.(html)(\?[\s\S]+)?$/, loader: 'raw-loader'},
			{
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000" 
      },
      {
        test: /\.(ttf|eot|svg|ico)(\?[\s\S]+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=[name].[ext]' } 
    ]
	}
}