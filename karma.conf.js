var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
/*
The entry point from the referenced Webpack configuration 
has to be removed or tests will fail in weird and inscrutable 
ways. Easy enough, just define an empty entry object.
*/
 
module.exports = function(config) {
  config.set({
  	bathPath: './dist/',
  	webpack: webpackConfig,
  	/* reference the Webpack configuration in the Karma configuration */
  	preprocessors: {
  		// './dist/bundle.js': ['webpack'],
  		'./test/*.js': ['webpack']
  		/* application’s entry point, karama-webpack plugin requires this */
  		/* you have to tell Karma that you want the karma-webpack plugin 
  		   to process these files. That’s what ['webpack'] does.
  		*/
  	},
  	/* 
			The plugins section is missing from my karma.config.js file. 
			When missing, Karma will load any plugins it can find in the 
			node-modules folder. Much simpler in my opinion.
  	*/
    frameworks: ['jasmine'],
    files: [ {pattern: 'index.html', }, './test/*.js'],
    /* The files array determines which files are included in the 
       browser and which files are watched and served by Karma 
    */
    browsers: ['Chrome'],
    reporters: ['progress'],
    port: 9876
  });
};