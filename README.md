#oparl.js

This is a JavaScript lib for the OParl protocoll. The lib is in the beginning. Pre-Alpha...

Some links
- the spec: https://oparl.org/spezifikation/online-ansicht/
- a (real) test system: http://www.lwl-pch.sitzung-online.de/oi/oparl/1.0/system.asp
- see the oparl.js lib in action: https://tursics.github.io/oparl.js/

##getting started

You can use **oparl.js** directly in your HTML/JavaScript file or in your node.js JavaScript file.

###HTML file

First include the JavaScript lib file in HTML header:

```javascript
<script src="lib/oparl-src.js"></script>
```

Second use the global ```OParl``` object:

```javascript
OParl.open(url);
```

###NodeJS

First require the lib:

```javascript
var OParl = require('./lib/oparl-src');
```

Second use the ```oParl``` object:

```javascript
OParl.open(url);
```

###Load first data from the OParl endpoint

Use the function ```OParl.open``` with 2 parameters. The first parameter contains the OParl endpoint URI of the requested domain.
The second parameter is a callback function called asynchroniously. The callback function with 2 parameters return an error message if the first parameter is non-null.
The second contains an ```oparl:System``` object, if the call was successful.

```javascript
OParl.open(uriToOParlServer, function (err, serverObj) {
	if (err !== null) {
		console.error('Something went wrong: ' + err);
	} else {
		console.log(serverObj);
	}
});
```
##Object types

The ```OParl.open``` function serves an **```oparl:System```** object to the callback function. First you should read the description of these type.

####item object

|Function      |Description
|--------------|------------
|get(callback) |The ```get``` function collect one object. This could be done by an internet request call. So the function did not return the object, it calls the ```callback``` function when it's done.<br>**```callback(error, object)```**<br>The ```error``` parameter contains an error message or, if it is ```null```, the ```object``` parameter contains an **object** in one of the oparl: types (listed below).

####list object

|Function      |Description
|--------------|------------
|get(callback) |The ```get``` function collect a list of items. This could be done by an internet request call. So the function did not return a list, it calls the ```callback``` function when it's done.<br>**```callback(error, itemList)```**<br>The ```error``` parameter contains an error message or, if it is ```null```, the ```itemList``` parameter contains an array of **item objects**.

**To do:** the list object should handle the paging and pagination. Currently a maximum of 100 objects will be listed.

####oparl:Body

The ```oparl:Body``` object represent one city, country or municipal.

|Parameter                       |Type        |Description
|--------------------------------|------------|-----------------------------------------------
|objectType                      |string      |is 'oparl:Body'
|name                            |string      |the official (and long) name of the body
|organizationList                |list object |list of all organizations, see object ```oparl:Organization```
|personList                      |list object |list of all persons, see object ```oparl:Person```
|meetingList                     |list object |list of all meetings, see object ```oparl:Meeting```
|paperList                       |list object |list of all papers, see object ```oparl:Paper```
|legislativeTermList             |list object |list of all legislative terms, see object ```oparl:LegislativeTerm```
|systemObject       *(optional)* |item object |the parent OParl system, see object ```oparl:System```
|shortName          *(optional)* |strings     |a shorter version of the body name
|website            *(optional)* |strings     |URI to the ordinary website of the body
|license            *(optional)* |strings     |URI of the used license
|licenseValidSince  *(optional)* |Date        |last license changed date
|oparlSince         *(optional)* |Date        |date for the first use of OParl
|ags                *(optional)* |strings     |8 digits of the AGS (the German Amtliche Gemeindeschlüssel)
|rgs                *(optional)* |strings     |12 digits of the RGS (the German Regionalschlüssel)
|equivalent         *(optional)* |array       |external links for the body
|contactEmail       *(optional)* |strings     |contact mail address
|contactName        *(optional)* |strings     |name of the contact person
|classification     *(optional)* |strings     |classification of the body
|location           *(optional)* |strings     |location of the body
|                                |            |*^^ type should be changed ^^*
|modified           *(optional)* |Date        |last modified

####oparl:System

The ```oparl:System``` object is the entry point for all clients. It defines basic information of the OParl system.

|Parameter                       |Type        |Description
|--------------------------------|------------|-----------------------------------------------
|objectType                      |string      |is 'oparl:System'
|oparlVersion                    |string      |version number of supported OParl
|bodyList                        |list object |list of all bodies, see object ```oparl:Body```
|otherOparlVersions *(optional)* |array       |array of URIs
|                                |            |*^^ type should be changed ^^*
|license            *(optional)* |string      |URI of the used license
|name               *(optional)* |string      |user friendly title of the system
|contactEmail       *(optional)* |string      |contact email address
|contactName        *(optional)* |string      |name of the contact person
|website            *(optional)* |string      |URI of the RIS website
|vendor             *(optional)* |string      |URI of the vendor of the RIS software
|product            *(optional)* |string      |URI of the software product

####not yet ready object types

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
