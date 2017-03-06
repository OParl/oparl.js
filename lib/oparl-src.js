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

	OParl.namespaces = [];

	/*
	 * OParl.Util contains some helper functions
	 * https://oparl.org/spezifikation/online-ansicht/#entity-system
	 */

	OParl.Util = {
		getJSON: function (url, callback) {
			var http, https, xhr, body = '';
			if (url === null) {
				callback('URI is null');
				return;
			}
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
					if (0 === url.indexOf('http://')) {
						// fallback: some (bad configured) OParl systems only serves http links in an https environment
						OParl.Util.getJSON(url.replace('http://', 'https://'), callback);
					} else {
						callback('Could not load ' + url);
					}
				};
				xhr.send();
			}
		},

		/*
		 * OParl.Util.registerNamespace register a new namespace parser function
		 */
		registerNamespace: function (namespace, parseFunc) {
			OParl.namespaces.push({namespace: namespace, func: parseFunc});
		},

		callParser: function (namespace, json, callback) {
			var i;

			for (i = 0; i < OParl.namespaces.length; ++i) {
				if (OParl.namespaces[i].namespace === namespace) {
					OParl.namespaces[i].func(json, callback);
					return;
				}
			}

			callback('Unknown namespace ' + namespace);
		},

		callObjectArrayParser: function (callback) {
			function analyseArray(data) {
				var arr = [],
					i;

				for (i = 0; i < data.length; ++i) {
					arr.push({
						get: OParl.Util.callObjectParser,
						data: data[i] || null
					});
				}

				callback(null, arr);
			}

			if (this.data instanceof Array) {
				analyseArray(this.data);
			} else {
				var url = this.data;

				OParl.Util.getJSON(url, function (err, data) {
					if (err !== null) {
						callback(err);
					} else {
						analyseArray(data.data);
					}
				});
			}
		},

		callObjectParser: function (callback) {
			if (this.data === null) {
				callback(null, null);
			} else if (this.data instanceof Object) {
				OParl.Util.callParser(this.data.type, this.data, callback);
			} else {
				var url = this.data;

				OParl.Util.getJSON(url, function (err, data) {
					if (err !== null) {
						callback(err);
					} else {
						OParl.Util.callParser(data.type, data, callback);
					}
				});
			}
		}
	};

	/*
	 * https://oparl.org/spezifikation/online-ansicht/#entity-system
	 */
	OParl.Util.registerNamespace('https://schema.oparl.org/1.0/System', function (json, callback) {
		var obj = {};
		obj.objectType = 'oparl:System';

		// mandatory
		obj.oparlVersion = json.oparlVersion || '';
		obj.bodyList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.body || []
		};

		// optional
		obj.otherOparlVersions = json.otherOparlVersions || [];
		obj.license = json.license || '';
		obj.name = json.name || '';
		obj.contactEmail = json.contactEmail || '';
		obj.contactName = json.contactName || '';
		obj.website = json.website || '';
		obj.vendor = json.vendor || '';
		obj.product = json.product || '';

		// do we need this?
//		obj.id = json.id || '';
//		obj.type = json.type || '';
//		obj.created = new Date(Date.parse(json.created || null));
//		obj.modified = new Date(Date.parse(json.modified || null));
//		obj.web = json.web || '';
//		obj.deleted = json.deleted || false;

		callback(null, obj);
	});

	/*
	 * https://oparl.org/spezifikation/online-ansicht/#entity-body
	 */
	OParl.Util.registerNamespace('https://schema.oparl.org/1.0/Body', function (json, callback) {
		var obj = {};
		obj.objectType = 'oparl:Body';

		// mandatory
		obj.name = json.name || '';
		obj.organizationList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.organization || []
		};
		obj.personList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.person || []
		};
		obj.meetingList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.meeting || []
		};
		obj.paperList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.paper || []
		};
		obj.legislativeTermList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.legislativeTerm || []
		};

		// optional
		obj.systemObject = {
			get: OParl.Util.callObjectParser,
			data: json.system || null
		};
		obj.shortName = json.shortName || '';
		obj.website = json.website || '';
		obj.license = json.license || '';
		obj.licenseValidSince = new Date(Date.parse(json.licenseValidSince || null));
		obj.oparlSince = new Date(Date.parse(json.oparlSince || null));
		obj.ags = json.ags || '';
		obj.rgs = json.rgs || '';
		obj.equivalent = json.equivalent || [];
		obj.contactEmail = json.contactEmail || '';
		obj.contactName = json.contactName || '';
		obj.classification = json.classification || '';
		obj.location = json.location || '';
		obj.modified = new Date(Date.parse(json.modified || null));

		// do we need this?
//		obj.id = json.id;
//		obj.type = json.type;
//		obj.keyword = json.keyword || '';
//		obj.created = new Date(Date.parse(json.created || null));
//		obj.web = json.web || '';
//		obj.deleted = json.deleted || false;

		callback(null, obj);
	});

	/*
	 * https://oparl.org/spezifikation/online-ansicht/#legislativeterm
	 */
	OParl.Util.registerNamespace('https://schema.oparl.org/1.0/LegislativeTerm', function (json, callback) {
		var obj = {};
		obj.objectType = 'oparl:LegislativeTerm';

		// mandatory

		// optional
		obj.bodyObject = {
			get: OParl.Util.callObjectParser,
			data: json.body || null
		};
		obj.name = json.name || '';
		obj.startDate = new Date(Date.parse(json.startDate || null));
		obj.endDate = new Date(Date.parse(json.endDate || null));

		// do we need this?
//		obj.id = json.id;
//		obj.type = json.type;
//		obj.keyword = json.keyword || [];
//		obj.web = json.web || '';

		callback(null, obj);
	});

	/*
	 * https://oparl.org/spezifikation/online-ansicht/#entity-organization
	 */
	OParl.Util.registerNamespace('https://schema.oparl.org/1.0/Organization', function (json, callback) {
		var obj = {};
		obj.objectType = 'oparl:Organization';

		// mandatory

		// optional
		obj.bodyObject = {
			get: OParl.Util.callObjectParser,
			data: json.body || null
		};
		obj.name = json.name || '';
		obj.membershipList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.membership || []
		};
		obj.meetingList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.meeting || []
		};
		obj.shortName = json.shortName || '';
		obj.post = json.post || [];
		obj.subOrganizationOfObject = {
			get: OParl.Util.callObjectParser,
			data: json.subOrganizationOf || null
		};
		obj.organizationType = json.organizationType || '';
		obj.classification = json.classification || '';
		obj.startDate = new Date(Date.parse(json.startDate || null));
		obj.endDate = new Date(Date.parse(json.endDate || null));
		obj.website = json.website || '';
		obj.locationObject = {
			get: OParl.Util.callObjectParser,
			data: json.location || null
		};
		obj.externalBodyObject = {
			get: OParl.Util.callObjectParser,
			data: json.externalBody || null
		};

		// do we need this?
//		obj.id = json.id;
//		obj.type = json.type;
//		obj.keyword = json.keyword || '';
//		obj.created = new Date(Date.parse(json.created || null));
//		obj.modified = new Date(Date.parse(json.modified || null));
//		obj.web = json.web || '';
//		obj.deleted = json.deleted || false;

		callback(null, obj);
	});

	/*
	 * https://oparl.org/spezifikation/online-ansicht/#entity-meeting
	 */
	OParl.Util.registerNamespace('https://schema.oparl.org/1.0/Meeting', function (json, callback) {
		var obj = {};
		obj.objectType = 'oparl:Meeting';

		// mandatory

		// optional
		obj.name = json.name || '';
		obj.meetingState = json.meetingState || '';
		obj.cancelled = json.cancelled || false;
		obj.start = new Date(Date.parse(json.start || null));
		obj.end = new Date(Date.parse(json.end || null));
		obj.locationObject = {
			get: OParl.Util.callObjectParser,
			data: json.location || null
		};
		obj.organizationList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.organization || []
		};
		obj.participantList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.participant || []
		};
		obj.invitationObject = {
			get: OParl.Util.callObjectParser,
			data: json.invitation || null
		};
		obj.resultsProtocolObject = {
			get: OParl.Util.callObjectParser,
			data: json.resultsProtocol || null
		};
		obj.verbatimProtocolObject = {
			get: OParl.Util.callObjectParser,
			data: json.verbatimProtocol || null
		};
		obj.auxiliaryFileList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.auxiliaryFile || []
		};
		obj.agendaItemList = {
			get: OParl.Util.callObjectArrayParser,
			data: json.agendaItem || []
		};

		// do we need this?
//		obj.id = json.id;
//		obj.type = json.type;
//		obj.keyword = json.keyword || '';
//		obj.created = new Date(Date.parse(json.created || null));
//		obj.modified = new Date(Date.parse(json.modified || null));
//		obj.web = json.web || '';
//		obj.deleted = json.deleted || false;

		callback(null, obj);
	});

	/*
	 * OParl.open is the starting function
	 */

	OParl.open = function (url, callback) {
		OParl.Util.getJSON(url, function (err, data) {
			if (err !== null) {
				callback(err);
			} else {
				OParl.Util.callParser(data.type, data, callback);
			}
		});
	};

}(typeof window !== 'undefined' ? window : {}, typeof document !== 'undefined' ? document : {}));
