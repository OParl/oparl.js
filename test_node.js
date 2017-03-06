/*jslint browser: true*/
/*global console,require*/

//-----------------------------------------------------------------------

function testMeeting(data) {
	'use strict';

	console.log();
	console.log('Meeting name: ' + data.name);
	console.log('Date: ' + (isNaN(data.start) ? '---' : data.start.toJSON().slice(0, 10)));
	console.log('Start time: ' + (isNaN(data.start) ? '---' : data.start.toJSON().slice(11, 16)));
	console.log('End time: ' + (isNaN(data.end) ? '---' : data.end.toJSON().slice(11, 16)));

	data.organizationList.get(function (err, dataOrganizationList) {
		if (err !== null) {
			console.error('Something went wrong: ' + err);
		} else {
			console.log('Organization count: ' + dataOrganizationList.length);

			data.participantList.get(function (err, dataParticipantList) {
				if (err !== null) {
					console.error('Something went wrong: ' + err);
				} else {
					console.log('Participant count: ' + dataParticipantList.length);

					data.auxiliaryFileList.get(function (err, dataAuxiliaryFileList) {
						if (err !== null) {
							console.error('Something went wrong: ' + err);
						} else {
							console.log('Auxiliary file count: ' + dataAuxiliaryFileList.length);

							data.agendaItemList.get(function (err, dataAgendaItemList) {
								if (err !== null) {
									console.error('Something went wrong: ' + err);
								} else {
									console.log('Agenda item count: ' + dataAgendaItemList.length);
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

function testOrganization(data) {
	'use strict';

	console.log();
	console.log('Organization name: ' + data.name);
	console.log('Organization type: ' + data.organizationType);
	console.log('Classification: ' + data.classification);
	console.log('Start date: ' + (isNaN(data.startDate) ? '---' : data.startDate.toJSON().slice(0, 10)));
	console.log('End date: ' + (isNaN(data.endDate) ? '---' : data.endDate.toJSON().slice(0, 10)));

	data.membershipList.get(function (err, dataMembership) {
		if (err !== null) {
			console.error('Something went wrong: ' + err);
		} else {
			console.log('Membership count: ' + dataMembership.length);

			data.meetingList.get(function (err, dataMeetingList) {
				if (err !== null) {
					console.error('Something went wrong: ' + err);
				} else {
					console.log('Meeting count: ' + dataMeetingList.length);

					if (dataMeetingList.length > 0) {
						dataMeetingList[0].get(function (err, dataMeeting) {
							if (err !== null) {
								console.error('Something went wrong: ' + err);
							} else {
								testMeeting(dataMeeting);
							}
						});
					}
				}
			});
		}
	});
}

//-----------------------------------------------------------------------

function testLegislative(data, callback) {
	'use strict';

	console.log();
	console.log('Legislative term name: ' + data.name);

	data.bodyObject.get(function (err, dataBody) {
		if (err !== null) {
			console.error('Something went wrong: ' + err);
		} else {
			if (dataBody === null) {
				console.log('Body name: ---');
			} else {
				console.log('Body name: ' + dataBody.name);
			}
			console.log('Start date: ' + (isNaN(data.startDate) ? '---' : data.startDate.toJSON().slice(0, 10)));
			console.log('End date: ' + (isNaN(data.endDate) ? '---' : data.endDate.toJSON().slice(0, 10)));

			callback();
		}
	});
}

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
													if (dataLegislativeTermList.length > 0) {
														dataLegislativeTermList[0].get(function (err, dataLegislativeTerm) {
															if (err !== null) {
																console.error('Something went wrong: ' + err);
															} else {
																testLegislative(dataLegislativeTerm, function () {
																	if (dataOrganizationList.length > 0) {
																		dataOrganizationList[0].get(function (err, dataOrganization) {
																			if (err !== null) {
																				console.error('Something went wrong: ' + err);
																			} else {
																				testOrganization(dataOrganization);
																			}
																		});
																	}
																});
															}
														});
													}
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
	OParl.open('https://www.lwl-pch.sitzung-online.de/oi/oparl/1.0/system.asp', function (err, data) {
//	OParl.open('https://dev.oparl.org/api/v1/system/', function (err, data) {
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
