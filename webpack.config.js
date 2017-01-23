const path = require('path')
const webpack = require('webpack')

module.exports = env => ({
	entry  : './index.js',
	output : {
		path           : path.join(__dirname, 'build'),
		filename       : (env !== 'prod' && 'trekk.js') || 'trekk.min.js',
		publicPath     : 'build/',
		library        : 'trekk',
		libraryTarget  : 'umd',
		umdNamedDefine : true
	},
	module : {
		rules : [
			{
				test    : /\.js$/,
				loader  : 'babel-loader',
				exclude : /node_modules/
			}
		]
	},
	plugins : (env !== 'prod' && []) || [
		new webpack.optimize.UglifyJsPlugin()
	],
	target : 'node'
})
