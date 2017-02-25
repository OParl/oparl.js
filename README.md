#oparl.js

This is a JavaScript lib for the OParl protocoll. The lib is in the beginning. Pre-Alpha...

Some links
- the spec: https://oparl.org/spezifikation/online-ansicht/
- a (real) test system: http://www.lwl-pch.sitzung-online.de/oi/oparl/1.0/system.asp

##getting started

###HTML file

include JavaScript lib file in HTML header

```<script src="lib/oparl-src.js"></script>```

than use the global ```OParl``` object

    OParl.open(url);

###NodeJS

	var OParl = require('./lib/oparl-src');
    OParl.open(url);

##objects

ready to use object types:

    none

not yet ready object types:

    oparl:System
    oparl:Body
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
