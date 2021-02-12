// config/babel.config.js
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
				debug: false,
			},
		]
	],
	plugins: ['@babel/plugin-transform-runtime']
};