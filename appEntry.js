

var $ = require('jquery');
require('bootstrap-loader'); // load bootstrap 3
require('./scss/style.scss');
require('./img/favicon.ico');
require('./img/chicago_logo.png');
require('./img/spiffygif_174x174.gif');
var li = require('./views/loading_indicator/indicator.js');

var appCache = require('./api/cache.js');
var api = require('./api/api.js');
var formatData = require('./api/_formatData.js');
var app = require('./routes/route.js');

$(document).ready(function (){

	li.show();
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

			li.hide();
			// start app
			app.start();
		})
		.catch(function(err){
			// output err message and stack trace
			console.log('loading data error...');
			console.log(err);
		});

});