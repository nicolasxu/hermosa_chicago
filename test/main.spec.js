


var appCache = require('../api/cache.js');

var main = require('../views/main/main.js');

var $ = require('jquery');

var api = require('../api/api.js');
describe('main view', function () {

	beforeAll(function(done){
		api.hermosa.getCommercial()
			.then(function(commercials){
				appCache.commercials = commercials;
				return api.hermosa.getResidential();
		})
			.then(function(residentials){
				appCache.residentials = residentials;
				done();
			})

	});
	it('Should render table with 2 data', function () {
		var renderResult = main.render();
		var renderLength = $(renderResult).find('tr').length;
		var dataLength = appCache.commercials.length + appCache.residentials.length; 

		// console.log('renderLength: ' + renderLength + ', recordLength: ' + dataLength );

		expect(renderLength).toBe(dataLength + 2);
		// 2 more <tr> tags for table header
	});

});