var crossroads = require('crossroads');
var $ = require('jquery');
var hasher = require('hasher');
var nav = require('../views/nav/nav.js');
var main = require('../views/main/main.js');

function mountRoutes() {

	function tableHandler () {
		nav.attach();
		main.attach();
		console.log('default route');
	}
	crossroads.addRoute('', tableHandler);
	crossroads.addRoute('/table/', tableHandler);

	crossroads.addRoute('/graph/', function () {
		nav.attach();
		main.attach();
		console.log('/graph route');
	});

	function handleChanges (newHash, oldHash) {
		crossroads.parse(newHash);
	}
	hasher.initialized.add(handleChanges);
	hasher.changed.add(handleChanges);
	hasher.init();

}

module.exports = {start: mountRoutes};