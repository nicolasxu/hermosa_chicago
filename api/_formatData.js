var _ = require('lodash');

function formatData (input) {
	if(!input) {
		return 'n/a';
	}
	return input;
}

function formatInt(input) {
	if(!input) {
		return 'n/a';
	}
	var parsed = parseInt (input);
	if(typeof parsed !== 'NaN') {
		return (parsed).toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
	}
	return input;
}

function formatFloat(input) {
	if(!input) {
		return 'n/a';
	}
	var parsed = parseFloat(input);
	if(typeof parsed !== 'NaN') {

		return (parsed).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	}
	return input;
}

module.exports = {formatInt: formatInt, formatFloat: formatFloat};