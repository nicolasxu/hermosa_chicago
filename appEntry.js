

var $ = require('jquery');
require('bootstrap-loader'); // load bootstrap 3
require('./scss/style.scss');
require('./img/favicon.ico');
require('./img/chicago_logo.png');
var appCache = require('./api/cache.js');
var api = require('./api/api.js');
// var api = require('./api/api.js');

var app = require('./routes/route.js');




$(document).ready(function (){

	api.hermosa.getCommercial()
		.then(function(commercials){
			appCache.commercials = commercials;
			return api.hermosa.getResidential();
	})
		.then(function(residentials){
			appCache.residentials = residentials;
			console.log(appCache);
			app.start();
		})
		.catch(function(err){
			console.log('loading data error...');
			console.log(err);
		});

});