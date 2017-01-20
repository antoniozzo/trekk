const path = require('path')

module.exports = {
	entry  : './index.js',
	output : {
		path           : path.join(__dirname, 'build'),
		filename       : 'trekk.js',
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
	target : 'node'
}
