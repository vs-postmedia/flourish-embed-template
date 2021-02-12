module.exports = {
	plugins: [
		/**
		 * Docs: https://github.com/csstools/postcss-preset-env
		 */
		require('postcss-flexbugs-fixes'),
		require('postcss-preset-env')({
			// Enabled Stage 2 features and add polyfill if necessary
			stage: 2,
			/**
			 * Enabled this list of features no matter what stage are
			 * You can see the list of all features id below:
			 * https://github.com/csstools/postcss-preset-env/blob/master/src/lib/	plugins-by-id.js#L36
			 */
			features: {
				// Enabled nesting rules features
				'nesting-rules': true,
				// Enbaled prefers-color-scheme features
				// To detect dark/light mode
				'prefers-color-scheme-query': true,
			},
			// This will get passed to autoprefixer
			autoprefixer: {
				// This will add flexbox prefixes only final and IE 10 versions of 		specification
				flexbox: 'no-2009',
				// This will enable autoprefixer grid translations and include autoplacement support
				grid: 'autoplace',
			}
		})
	]
};