

var $ = require('jquery');
require('bootstrap-loader'); // load bootstrap 3
require('./scss/style.scss');
require('./img/favicon.ico');
require('./img/chicago_logo.png');
var appCache = require('./api/cache.js');
var api = require('./api/api.js');
var formatData = require('./api/_formatData.js');
var app = require('./routes/route.js');

$(document).ready(function (){
	// load data
	api.hermosa.getCommercial()
		.then(function(commercials){
			appCache.commercials = commercials;
			return api.hermosa.getResidential();
	})
		.then(function(residentials){
			appCache.residentials = residentials;
			appCache.commGraphData = formatData.formatGraphData(appCache.commercials);
			appCache.residGraphData = formatData.formatGraphData(appCache.residentials);
			// start app
			app.start();
		})
		.catch(function(err){
			// output err message and stack trace
			console.log('loading data error...');
			console.log(err);
		});

});