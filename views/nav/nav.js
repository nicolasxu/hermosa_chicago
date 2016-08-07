var $ = require('jquery');
var navTpl = require('./nav.html');


function nav () {

	/*** Private member variables ***/

	// Flag to tell if event binding is done
	var eventBinded = false; 
	// Hold the html render result
	var renderResult = '';
	// Hold the render result in jquery object
	var $renderResult = '';
	// Hold last rendered jquery object for preventing double rendering to DOM
	var $previousDomObj = '';

	
	/*** Private member methods ***/

	// Method for binding events
	function bindEvent(context) {
		// TODO
		eventBinded = true; 
	}
	// Method for unbinding events
	function unbindEvent() {
		// TODO
		eventBinded = false;
	}
	// Method for detaching rendered html from DOM
	function detach() {
		if($ ($previousDomObj) ) {
			$($previousDomObj).remove();
		}
		$previousDomObj = '';
	}
	// Method for rendering html to member variable
	function render() {
		renderResult = navTpl;
		$renderResult = $(renderResult);
		// bind data here if required 
		return navTpl;
	}
	// Method for attaching rendered result to DOM
	function attach(selector) {
		unbindEvent();
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

	/*** public methods ***/ 

	return {
		render: render,
		attach: attach,
		tpl: navTpl
	}
}

module.exports = nav();