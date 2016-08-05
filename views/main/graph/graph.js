
var $ = require('jquery');

var graphTpl = require('./graph.html');


function graph () {

	function render() {
		return graphTpl;
	}
	return {
		render: render
	}
}

module.exports = graph();