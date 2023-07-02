// SEE THIS TUTORIAL
// https://finmavis.dev/blog/webpack-configuration-step-by-step

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');


// process.cwd will return a path to our active project directory
const ROOT_DIR = process.cwd();


module.exports = {
	mode: 'production',
  	// source
	entry: { 
		main: path.resolve(ROOT_DIR, 'src/index.js')
	},
	output: {
		path: path.resolve(ROOT_DIR, 'dist'),
		// add hashing for better caching
		filename: '[name].[contenthash:8].bundle.js',
		chunkFilename: '[name].[contenthash:8].chunk.js',
		// for gh-pages – 
      	publicPath: './'
	},
	module: {
		rules: [
			// CSS
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
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
			 		MiniCssExtractPlugin.loader,
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
	optimization: {
		// Minimize the bundle using the TerserPlugin (by default)
		minimize: true,
		minimizer: [
			// other minimizer plugin
			/**
			 * Minify our CSS
			 * Docs: https://github.com/NMFR/optimize-css-assets-webpack-plugin
			 */
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					parser: safePostCssParser,
					map: false,
				},
				cssProcessorPluginOptions: {
					/**
					 * You can see all the preset option here:
					 * https://github.com/cssnano/cssnano/tree/master/packages/cssnano-preset-default
					 */
					preset: [
						'default',
						{
							discardComments: {
								removeAll: true,
							},
							minifyFontValues: {
								removeQuotes: false,
							}
						}
					]
				}
			})
		],
		/**
		* Keep the runtime chunk separated to enable long term caching
		* Reference: https://twitter.com/wSokra/status/969679223278505985
		*/
		runtimeChunk: {
			name: entrypoint => `runtime-${entrypoint}`,
		},
		/*
		* Split third-party libraries into vendors chunk to enable long term caching
		* Docs: https://webpack.js.org/plugins/split-chunks-plugin/
		*/
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		// clean the build directory
		new CleanWebpackPlugin(),
		new CompressionPlugin({
			algorithm: 'gzip',
			compressionOptions: { level: 9 },
			filename: '[path].gz[query]',
			minRatio: 0.8,
			test: /\.(js|css|html|svg)$/
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(ROOT_DIR, 'src/index.html'),
			filename: 'index.html',
			hash: true,
			// Minify options: https://github.com/DanielRuf/html-minifier-terser
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].bundle.css',
			chunkFilename: '[name].[contenthash:8].chunk.css',
		})
	]
};