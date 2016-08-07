var $ = require('jquery');
var appCache = require('../../../api/cache.js');
var _ = require('lodash');

var tableTpl = require('./table.html');
var formatData = require('../../../api/_formatData.js');

function table() {

	/*** private methods ***/

	function render() {

		var commercials = appCache.commercials;
		var residentials = appCache.residentials;
		var tplFunc = _.template(tableTpl);
		var viewHelper = {
			formatInt: formatData.formatInt,
			formatFloat: formatData.formatFloat
		}
		var data = {commercials: commercials, residentials: residentials};
		data = _.extend(data, viewHelper);
		// make viewHelper available in underscore template

		var renderResult = tplFunc(data);
		return renderResult;
	}

	/*** public methods ***/

	return {
		render: render
	}
}

module.exports = table();


