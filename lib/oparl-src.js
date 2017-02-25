/*
 * oparl.js, a JavaScript library for the OParl protocoll. https://github.com/tursics/oparl.js
 * 2017, Thomas Tursics
 */
/*jslint browser: true*/
/*global module,define*/

(function (window, document) {
	'use strict';

	var OParl = {};
	OParl.version = '0.0.1';
	OParl.apiversion = '1.0';

	// define OParl for Node module pattern loaders, including Browserify
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = OParl;

	// define OParl as an AMD module
	} else if (typeof define === 'function' && define.amd) {
		define(OParl);
	}

	// define OParl as a global OParl variable
	window.OParl = OParl;

	/*
	 * OParl.Util contains some helper functions
	 * https://oparl.org/spezifikation/online-ansicht/#entity-system
	 */

	OParl.Util = {
		getJSON: function (url, callback) {
			// see http://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'json';
			xhr.onload = function () {
				var status = xhr.status;
				if (status === 200) {
					callback(null, xhr.response);
				} else {
					callback(status);
				}
			};
			xhr.send();
		}
	};

	/*
	 * OParl.System contains the oparl:System object
	 * https://oparl.org/spezifikation/online-ansicht/#entity-system
	 */

	OParl.System = {
	};

	/*
	 * OParl.open is the starting function
	 */

	OParl.open = function (url) {
		OParl.Util.getJSON(url, function (err, data) {
			if (err !== null) {
				alert('Something went wrong: ' + err);
			} else {
				alert('Your query count: ' + data.query.count);
			}
		});
	};

}(window, document));
