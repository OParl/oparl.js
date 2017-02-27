#oparl.js

This is a JavaScript lib for the OParl protocoll. The lib is in the beginning. Pre-Alpha...

Some links
- the spec: https://oparl.org/spezifikation/online-ansicht/
- a (real) test system: http://www.lwl-pch.sitzung-online.de/oi/oparl/1.0/system.asp

##getting started

You can use **oparl.js** directly in your HTML/JavaScript file or in your node.js JavaScript file.

###HTML file

First include the JavaScript lib file in HTML header:

```<script src="lib/oparl-src.js"></script>```

Second use the global ```OParl``` object:

    OParl.open(url);

###NodeJS

First require the lib:

	var OParl = require('./lib/oparl-src');

Second use the ```oParl``` object:

    OParl.open(url);

###Load first data from the OParl endpoint

Use the function ```OParl.open``` with 2 parameters. The first parameter contains the OParl endpoint URI of the requested domain.
The second parameter is a callback function called asynchroniously. The callback function with 2 parameters return an error message if the first parameter is non-null.
The second contains an ```oparl:System``` object, if the call was successful.

	OParl.open(uriToOParlServer, function (err, data) {
		if (err !== null) {
			console.error('Something went wrong: ' + err);
		} else {
			console.log(data);
		}
	});

##objects

ready to use object types:

    oparl:Body
    oparl:System

not yet ready object types:

    oparl:LegislativeTerm
    oparl:Organization
    oparl:Person
    oparl:Membership
    oparl:Meeting
    oparl:AgendaItem
    oparl:Paper
    oparl:Consultation
    oparl:File
    oparl:Location
    oparl:LegislativeTerm
    oparl:Membership
    oparl:AgendaItem
    oparl:Consultation
    oparl:File
    oparl:Location

##Lizenz

Die JavaScript-Lib ist kostenlos und in die Public Domain freigegeben. Weitere Informationen findest du in der Datei LICENSE.md
