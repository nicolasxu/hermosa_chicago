var $ = require('jquery');
var navTpl = require('./nav.html');


function nav () {

	/* private members */
	var eventBinded = false; 
	var renderResult = '';
	var $renderResult = '';
	var $previousDomObj = '';

	// private members
	function bindEvent(context) {
		eventBinded = true; 
	}
	// private members
	function unbindEvent() {
		eventBinded = false;
	}
	function detach() {
		if($ ($previousDomObj) ) {
			$($previousDomObj).remove();
		}
		$previousDomObj = '';
	}
	// private members
	function render() {

		renderResult = navTpl;
		$renderResult = $(renderResult);
		// bind data if possible 
		return navTpl;
	}
	// private members
	function attach(selector) {

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


	/* interface */
	return {
		// public members & methods
		render: render,
		attach: attach,
		tpl: navTpl
	}
}

module.exports = nav();