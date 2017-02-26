/*
 * oparl.js, a JavaScript library for the OParl protocoll. https://github.com/tursics/oparl.js
 * 2017, Thomas Tursics
 */
/*jslint browser: true*/
/*global module,define,require*/

(function (window, document) {
	'use strict';

	var OParl = {};
	OParl.version = '0.0.1';
	OParl.apiversion = '1.0';
	OParl.usingNodeJS = (typeof module === 'object' && typeof module.exports === 'object');

	// define OParl for Node module pattern loaders, including Browserify
	if (OParl.usingNodeJS) {
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
			var http, https, xhr, body = '';
			if (OParl.usingNodeJS) {
				http = require('http');
				https = require('https');

				if (url.indexOf('https://') === 0) {
					https.get(url, function (res) {
						res.on('data', function (chunk) {
							body += chunk;
						});

						res.on('end', function () {
							callback(null, JSON.parse(body));
						});
					}).on('error', function (status) {
						callback(status);
					});
				} else if (url.indexOf('http://') === 0) {
					http.get(url, function (res) {
						res.on('data', function (chunk) {
							body += chunk;
						});

						res.on('end', function () {
							callback(null, JSON.parse(body));
						});
					}).on('error', function (status) {
						callback(status);
					});
				} else {
					callback('Unknown URI schema');
				}
			} else {
				// see http://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
				xhr = new XMLHttpRequest();
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
				xhr.onerror = function (e) {
					callback('Could not load ' + url);
				};
				xhr.send();
			}
		}
	};

	/*
	 * OParl.registerNamespace register a new namespace parser function
	 */

	OParl.namespaces = {};
	OParl.registerNamespace = function (namespace, parseFunc) {
		OParl.namespaces[namespace] = parseFunc;
	};

	OParl.callParser = function (namespace, json) {
		
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
				console.error('Something went wrong: ' + err);
			} else {
				console.log('Your query object: ' + data.type);
			}
		});
	};

}(typeof window !== 'undefined' ? window : {}, typeof document !== 'undefined' ? document : {}));
