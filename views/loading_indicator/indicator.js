
var tpl = require('./indicator.html');
var $ = require('jquery');

var id = 'loading-indicator';

function show() {
	var $elm = $('#' + id);
	if($elm.length) {
		$elm.show();
	} else {
		$('body').append(tpl);
	}
}

function hide() {
	$('#' + id).hide();
	
}

module.exports = {
	hide: hide,
	show: show
}