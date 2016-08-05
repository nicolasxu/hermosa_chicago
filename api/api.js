var request = require('./request.js');
var cache = require('./cache.js');
var Promise = require('bluebird');

module.exports = {
	hermosa: {
		getCommercial: function () {
			return request.get('https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&building_type=Commercial');
		},
		getResidential: function () {
			return request.get('https://data.cityofchicago.org/resource/energy-usage-2010.json?community_area_name=Hermosa&building_type=Residential');
		}
	}
}

