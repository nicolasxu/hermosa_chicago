var api = require('../api/api.js');


describe('api shoudl retrieve data from server', function () {

	var residentials = '';
	var commercials = '';
	beforeAll(function(done){
		api.hermosa.getCommercial()
			.then(function(buildings) {
				commercials = buildings;
				return api.hermosa.getResidential();
			})
			.then(function(buildings){
				residentials = buildings;
				done();
			});
	});

	it('commercial buildings api should return some records', function () {
		expect(commercials.length).toBeGreaterThan(1);
	});


	it('residential buildings api should return some records', function () {
		expect(residentials.length).toBeGreaterThan(1);
	});


});