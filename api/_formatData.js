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

function formatForGraph(input) {
	if(!input) {
		return;
	}

	var result = [];

	input.forEach(function(building) {
		result.push(building.kwh_january_2010? parseInt(building.kwh_january_2010): 0);
		result.push(building.kwh_february_2010? parseInt(building.kwh_february_2010): 0);
		result.push(building.kwh_march_2010? parseInt(building.kwh_march_2010): 0);
		result.push(building.kwh_april_2010? parseInt(building.kwh_april_2010): 0);
		result.push(building.kwh_may_2010? parseInt(building.kwh_may_2010): 0);
		result.push(building.kwh_june_2010? parseInt(building.kwh_june_2010): 0);
		result.push(building.kwh_july_2010? parseInt(building.kwh_july_2010): 0);
		result.push(building.kwh_august_2010? parseInt(building.kwh_august_2010): 0);
		result.push(building.kwh_september_2010? parseInt(building.kwh_september_2010): 0);
		result.push(building.kwh_october_2010? parseInt(building.kwh_october_2010): 0);
		result.push(building.kwh_november_2010? parseInt(building.kwh_november_2010): 0);
		result.push(building.kwh_december_2010? parseInt(building.kwh_december_2010): 0);


		result.push(building.therm_january_2010? parseInt(building.therm_january_2010): 0);
		result.push(building.therm_february_2010? parseInt(building.therm_february_2010): 0);
		result.push(building.therm_march_2010? parseInt(building.therm_march_2010): 0);
		result.push(building.herm_april_2010? parseInt(building.herm_april_2010): 0); // typo in back-end api
		result.push(building.therm_may_2010? parseInt(building.therm_may_2010):0);
		result.push(building.therm_june_2010? parseInt(building.therm_june_2010):0);
		result.push(building.therm_july_2010? parseInt(building.therm_july_2010): 0);
		result.push(building.therm_august_2010? parseInt(building.therm_august_2010): 0);
		result.push(building.therm_september_2010? parseInt(building.therm_september_2010): 0);
		result.push(building.therm_october_2010? parseInt(building.therm_october_2010): 0);
		result.push(building.therm_november_2010? parseInt(building.therm_november_2010): 0);
		result.push(building.therm_december_2010? parseInt(building.therm_december_2010): 0);



	});

	return result; 

}

module.exports = {formatInt: formatInt, 
	formatFloat: formatFloat, 
	formatGraphData: formatForGraph};



