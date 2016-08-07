
var $ = require('jquery');

var mainTpl = require('./main.html');
var graph = require('./graph/graph.js');
var table = require('./table/table.js');
var hasher = require('hasher');

function main() {

	/*** Private member variables ***/

	// id tag for attaching the rendered result
	var attachPoint = '#main-content';
	// Flag to tell if the event binding is done
	var eventBinded = false; 
	// Hold rendered html result
	var renderResult = '';
	// Hold rendered result in jquery object
	var $renderResult = '';
	// Variable for previously rendered jquery obj, 
	// the purpose of this variable is to prevent double rendering.
	var $previousDomObj = '';

	/*** private methods ***/

	// method for binding event
	function bindEvent(context) {
		eventBinded = true;
	}
	// method for unbinding event
	function unbindEvent() {
		eventBinded = false; 
	}
	// render html and store result html in private member variable
	function render() {
		var $result = $(mainTpl);
		var currentHash = '';
		currentHash = hasher.getHash();

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
	// method for removing previously rendered result from DOM
	function detach() {
		if($ ($previousDomObj) ) {
			$($previousDomObj).remove();
		}
		$previousDomObj = '';
	}
	// method for attaching rendered result to DOM
	function attach(selector)  {
		detach();
		render();

		if (selector) {
			$(selector).append($renderResult);
		} else {
			$('body').append($renderResult);
		}
		var currentHash = hasher.getHash();
		if(currentHash === 'graph' ) {
			// draw svg
			graph.drawSvg();
		}
		$previousDomObj = $renderResult;
		bindEvent();
	}

	/*** public methods ***/

	return {
		attach: attach,
		render: render
	}
}

module.exports = main();


