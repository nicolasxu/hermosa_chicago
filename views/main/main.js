
var $ = require('jquery');

var mainTpl = require('./main.html');
var graph = require('./graph/graph.js');
var table = require('./table/table.js');
var hasher = require('hasher');

function main() {
	var attachPoint = '#main-content';
	var eventBinded = false; 
	var renderResult = '';
	var $renderResult = '';
	var $previousDomObj = '';

	function bindEvent(context) {
		eventBinded = true;
	}
	function unbindEvent() {
		eventBinded = false; 
	}


	function render() {
		var $result = $(mainTpl);
		var currentHash = '';
		currentHash = hasher.getHash();
		// console.log('current hash: ' + currentHash);
		switch (currentHash) {
			case '':
			case 'table':
				$result.find(attachPoint).append(table.render());
			break;
			case 'graph':
				$result.find(attachPoint).append(graph.render());
			break;
		}
		$renderResult = $result;
 		return $renderResult[0].outerHTML;

	}
	function detach() {
		if($ ($previousDomObj) ) {
			$($previousDomObj).remove();
		}
		$previousDomObj = '';
	}

	function attach(selector)  {
		detach();
		render();

		if (selector) {
			$(selector).append($renderResult);
		} else {
			$('body').append($renderResult);
		}
		$previousDomObj = $renderResult;
		bindEvent();

	}

	return {
		attach: attach,
		render: render
	}
}

module.exports = main();


