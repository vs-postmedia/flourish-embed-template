// SEE THIS TUTORIAL
// https://finmavis.dev/blog/webpack-configuration-step-by-step

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// Tweak this to match your GitHub project name
const publicPath = 'covid-active-cases/';
// process.cwd will return a path to our active project directory
const ROOT_DIR = process.cwd();


module.exports = {
	devServer: {
		// Enable gzip compression
		compress: true,
		// Serves everything from our dist folder which is our output folder
		contentBase: path.resolve(ROOT_DIR, 'dist'),
		// This will shows a full-screen overlay in the browser when there are compiler errors
		host: '0.0.0.0',
		overlay: true,
		port: 3000
	},
	// Development Tools (Map Errors To Source File)
  	devtool: 'source-map',
  	// source
	entry: { 
		main: path.resolve(ROOT_DIR, 'src/index.js')
	},
	mode: 'development',
	output: {
		path: path.resolve(ROOT_DIR, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js'
		// Tweak this to match your GitHub project name
      	// publicPath: publicPath
	},
	module: {
		rules: [
			// CSS
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [
					'style-loader', 
					{ 
						loader: 'css-loader', 
						options: {
							// Enable url functions handling in css
							url: true,
							// Enables @import at-rules handling
							import: true,
							// Disable css modules
							modules: false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							/**
								* Note: You can also put your postcss config here
								* Instead of make a new file just like we do here
								* Docs: https://github.com/postcss/postcss-loader#config
							*/
							config: {
								// tell postcss-loader where to find config file
								path: path.resolve(ROOT_DIR, 'config')
							}
						}
					}
				]
			},
			{
			 	test: /\.module\.css$/,
			 	use: [
			 		'style-loader',
			 		{
			 			loader: 'css-loader',
			 			options: {
			 				url: true,
			 				import: true,
			 				modules: {
			 					// Convention name of generated CSS Modules classname
			 					localIdentName: '[name]__[local]--[contenthash:8]',
			 				}
			 			}
			 		},
			 		{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							/**
								* Note: You can also put your postcss config here
								* Instead of make a new file just like we do here
								* Docs: https://github.com/postcss/postcss-loader#config
							*/
							config: {
								// tell postcss-loader where to find config file
								path: path.resolve(ROOT_DIR, 'config')
							}
						}
					}
			 	]
			},
			// js/jsx (es6 friendly)
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: { 
					loader: 'babel-loader',
					options: {
						// Enabled cache for faster recompilation
						cacheDirectory: true,
						/**
						* Here we tell babel where to find babel config file
						* Note that we can also put our babel config (presets and plugins) here
						* Since Babel 7, using .babelrc filename not recommended
						* Here we are using the new recommended filename
						* using babel.config.js filename
						* Docs: https://babeljs.io/docs/en/config-files
						*/
						configFile: path.resolve(ROOT_DIR, 'config/babel.config.js'),
					}
				}
			},
			// image loader
			{
				test: /\.(gif|jpg|png|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[contenthash:8].[ext]',
							// inline files < 4kb using bse64 URIs
							limit: 4096,
							// output folder for assets (ie: dist/assets)
							outputPath: 'assets'
						}
					}
				]
			},
			// fonts
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[contenthash:8].[ext]',
							outputPath: 'assets'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(ROOT_DIR, 'src/index.html'),
			filename: 'index.html',
			hash: true
		})
	]
};