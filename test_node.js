/*jslint browser: true*/
/*global console,require*/

//-----------------------------------------------------------------------

function start() {
	'use strict';

	var OParl = require('./lib/oparl-src');
	OParl.open('http://www.lwl-pch.sitzung-online.de/oi/oparl/1.0/system.asp');
}

//-----------------------------------------------------------------------

try {
	start();
} catch (e) {
	console.error(e);
}

//-----------------------------------------------------------------------
//eof
