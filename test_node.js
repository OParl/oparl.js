/*jslint browser: true*/
/*global console,require*/

//-----------------------------------------------------------------------

function testBody(data) {
	'use strict';

	console.log();
	console.log('Body name: ' + data.name);
	console.log('Body license: ' + data.license);
	console.log('Body modified: ' + data.modified.toJSON().substr(0, 10));

	data.systemObject.get(function (err, dataSystem) {
		if (err !== null) {
			console.error('Something went wrong: ' + err);
		} else {
			console.log('System name: ' + dataSystem.name);

			data.organizationList.get(function (err, dataOrganizationList) {
				if (err !== null) {
					console.error('Something went wrong: ' + err);
				} else {
					console.log('Organization count: ' + dataOrganizationList.length);

					data.personList.get(function (err, dataPersonList) {
						if (err !== null) {
							console.error('Something went wrong: ' + err);
						} else {
							console.log('Person count: ' + dataPersonList.length);

							data.meetingList.get(function (err, dataMeetingList) {
								if (err !== null) {
									console.error('Something went wrong: ' + err);
								} else {
									console.log('Meeting count: ' + dataMeetingList.length);

									data.paperList.get(function (err, dataPaperList) {
										if (err !== null) {
											console.error('Something went wrong: ' + err);
										} else {
											console.log('Paper count: ' + dataPaperList.length);

											data.legislativeTermList.get(function (err, dataLegislativeTermList) {
												if (err !== null) {
													console.error('Something went wrong: ' + err);
												} else {
													console.log('Legislative count: ' + dataLegislativeTermList.length);
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
}

//-----------------------------------------------------------------------

function testSystem(data) {
	'use strict';

	console.log();
	console.log('System name: ' + data.name);
	console.log('System license: ' + data.license);

	data.bodyList.get(function (err, dataBodyList) {
		if (err !== null) {
			console.error('Something went wrong: ' + err);
		} else {
			console.log('Body count: ' + dataBodyList.length);
			if (dataBodyList.length > 0) {
				dataBodyList[0].get(function (err, object) {
					if (err !== null) {
						console.error('Something went wrong: ' + err);
					} else {
						testBody(object);
					}
				});
			}
		}
	});
}

//-----------------------------------------------------------------------

function start() {
	'use strict';

	var OParl = require('./lib/oparl-src');
	OParl.open('http://www.lwl-pch.sitzung-online.de/oi/oparl/1.0/system.asp', function (err, data) {
		if (err !== null) {
			console.error('Something went wrong: ' + err);
		} else {
			testSystem(data);
		}
	});
}

//-----------------------------------------------------------------------

try {
	start();
} catch (e) {
	console.error(e);
}

//-----------------------------------------------------------------------
//eof
