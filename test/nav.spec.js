var nav = require('../views/nav/nav.js');
var $ = require('jquery');
// var expect = require('expect');

describe('navigation view', function () {
	var renderResult;
	beforeEach(function(done) {
	   renderResult = nav.render();
	   done();
	 });
	it('should render without problems', function () {
		// console.log(renderResult);
		expect(renderResult).toBeDefined();
	});

	it('should contain more than one menu item', function () {
		var length = $(renderResult).find('li').length;
		// console.log('length is: ' + length);
		expect(length).toBeGreaterThan(1);
	});
})
