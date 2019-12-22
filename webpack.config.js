// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: {
		card_layer: './entry.js',
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		library: 'CardLayer',
		libraryTarget: 'umd',
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		// inject: false,
	// 		chunks: ['main'],
	// 		filename: 'index.html'
	// 	}),
	// ],
	externals: [
		{
			jquery: 'jQuery',
		}
	],
	module: {
		rules: [

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: { ie: '11' },
									useBuiltIns: "usage",
									corejs: 3 // or 2
								}
							]
						]
					}
				}
			}
		]
	},
}
