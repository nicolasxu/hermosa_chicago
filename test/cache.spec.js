var cache = require('../api/cache.js');


describe('main view', function () {

	beforeEach(function(done) {
	   
	   cache.testData = 4568;
	   done();
	 });
	it('Cache should store the data', function () {
		expect(cache.testData).toBe(4568);
	});

});