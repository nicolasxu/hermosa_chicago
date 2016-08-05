var $ = require('jquery');

// TODO: http://www.html5rocks.com/en/tutorials/cors/

function postFn(url, payload) {
	return $.ajax({
		method: 'POST',
		url: url,
		xhrFields: {
			withCredentials: true
		},
		data: payload
	});
}

function getFn(urlWithQueryString) {
	return $.ajax({
		method: 'GET',
		xhrFields: {
			// withCredentials: true
			// has to be disabled to get data from Chicago City data API
		},
		url: urlWithQueryString
	});
}

function putFn(url, payload) {
	return $.ajax({
		method: 'PUT',
		url: url,
		xhrFields: {
			withCredentials: true
		},
		data: payload
	});
}

function deleteFn(url, payload) {
	return $.ajax({
		method: 'DELETE',
		url: url,
		xhrFields: {
			withCredentials: true
		},
		data: payload
	});
}

module.exports = {
	get: getFn,
	post: postFn,
	put: putFn,
	delete: deleteFn
}