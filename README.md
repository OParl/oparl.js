# oparl.js

This is a JavaScript library for the OParl protocoll.

THE LIB IS IN THE BEGINING. PRE-ALPHA...

Some links: the [OParl spec](https://oparl.org/spezifikation/online-ansicht/),
a (real) [test system](http://www.lwl-pch.sitzung-online.de/oi/oparl/1.0/system.asp),
and a [live demo](https://tursics.github.io/oparl.js/test.html) of the oparl.js

## Getting started

You can use **oparl.js** directly in your HTML/JavaScript file or in your node.js project.

### HTML file

1. Include the JavaScript lib file in HTML header
```javascript
<script src="lib/oparl-src.js"></script>
```
2. Use the global ```OParl``` object
```javascript
OParl.open(url);
```

### Node.js

1. Installation
```
npm install oparl --save
```
2. Usage
```javascript
var OParl = require('oparl');
OParl.open(url);
```

### Load first data from the OParl endpoint

Use the function ```OParl.open``` with 2 parameters. The first parameter contains the OParl endpoint URI of the requested domain.
The second parameter is a callback function called asynchroniously. The callback function with 2 parameters return an error message if the first parameter is non-null.
The second contains an [oparl:System](#oparlSystem) object, if the call was successful.

```javascript
OParl.open(uriToOParlServer, function (err, serverObj) {
	if (err !== null) {
		console.error('Something went wrong: ' + err);
	} else {
		console.log(serverObj);
	}
});
```
## Object types

The ```OParl.open``` function serves an [oparl:System](#oparlSystem) object to the callback function. First you should read the description of these type.

#### Item object

|Function      |Description
|--------------|------------
|get(callback) |The ```get``` function collect one object. This could be done by an internet request call. So the function did not return the object, it calls the ```callback``` function when it's done.<br>**```callback(error, object)```**<br>The ```error``` parameter contains an error message or, if it is ```null```, the ```object``` parameter contains an **object** in one of the oparl: types (listed below).

#### List object

|Function      |Description
|--------------|------------
|get(callback) |The ```get``` function collect a list of items. This could be done by an internet request call. So the function did not return a list, it calls the ```callback``` function when it's done.<br>**```callback(error, itemList)```**<br>The ```error``` parameter contains an error message or, if it is ```null```, the ```itemList``` parameter contains an array of **item objects**.

**To do:** the list object should handle the paging and pagination. Currently a maximum of 100 objects will be listed.

#### <a name="oparlBody"></a>oparl:Body

The ```oparl:Body``` object represent one city, country or municipal.

|Parameter                       |Type        |Description
|--------------------------------|------------|-----------------------------------------------
|objectType                      |string      |is 'oparl:Body'
|name                            |string      |the official (and long) name of the body
|organizationList                |list object |list of all organizations, see object [oparl:Organization](#oparlOrganization)
|personList                      |list object |list of all persons, see object ```oparl:Person```
|meetingList                     |list object |list of all meetings, see object ```oparl:Meeting```
|paperList                       |list object |list of all papers, see object ```oparl:Paper```
|legislativeTermList             |list object |list of all legislative terms, see object [oparl:LegislativeTerm](#oparlLegislativeTerm)
|systemObject       *(optional)* |item object |the parent OParl system, see object [oparl:System](#oparlSystem)
|shortName          *(optional)* |string      |a shorter version of the body name
|website            *(optional)* |string      |URI to the ordinary website of the body
|license            *(optional)* |string      |URI of the used license
|licenseValidSince  *(optional)* |Date        |last license changed date
|oparlSince         *(optional)* |Date        |date for the first use of OParl
|ags                *(optional)* |string      |8 digits of the AGS (the German Amtliche Gemeindeschlüssel)
|rgs                *(optional)* |string      |12 digits of the RGS (the German Regionalschlüssel)
|equivalent         *(optional)* |array       |external links for the body
|contactEmail       *(optional)* |string      |contact mail address
|contactName        *(optional)* |string      |name of the contact person
|classification     *(optional)* |string      |classification of the body
|location           *(optional)* |string      |location of the body
|                                |            |*^^ type should be changed ^^*
|modified           *(optional)* |Date        |last modified

#### <a name="oparlLegislativeTerm"></a>oparl:LegislativeTerm

The ```oparl:LegislativeTerm``` object represent one legislative period.

|Parameter                       |Type        |Description
|--------------------------------|------------|-----------------------------------------------
|objectType                      |string      |is 'oparl:LegislativeTerm'
|bodyObject         *(optional)* |item object |the body of the legislation period, see object [oparl:Body](#oparlBody)
|name               *(optional)* |string      |user friendly title of the legislative period
|startDate          *(optional)* |Date        |first day of the legislative period
|endDate            *(optional)* |Date        |last day of the legislative period

#### <a name="oparlOrganization"></a>oparl:Organization

The ```oparl:Organization``` object represent one organization unit.

|Parameter                       |Type        |Description
|--------------------------------|------------|-----------------------------------------------
|objectType                      |string      |is 'oparl:Organization'
|bodyObject         *(optional)* |item object |the body of the organization, see object [oparl:Body](#oparlBody)
|name               *(optional)* |string      |the official (and long) name of the organization
|membershipList     *(optional)* |list object |list of all memberships, see object ```oparl:Membership```
|meetingList        *(optional)* |list object |list of all meetings, see object ```oparl:Meeting```
|shortName          *(optional)* |string      |a shorter version of the organization name
|post               *(optional)* |array       |array of strings
|subOrganizationOfObject *(optional)* |item object |a superior organization, see object [oparl:Organization](#oparlOrganization)
|organizationType   *(optional)* |string      |type of the organization
|classification     *(optional)* |string      |group of the organization
|startDate          *(optional)* |Date        |date of formation
|endDate            *(optional)* |Date        |date of termination
|website            *(optional)* |string      |URI of the organization website
|locationObject     *(optional)* |item object |location of the organization, see object ```oparl:Location```
|externalBodyObject *(optional)* |item object |the body of an external OParl system, see object [oparl:Body](#oparlBody)

#### <a name="oparlSystem"></a>oparl:System

The ```oparl:System``` object is the entry point for all clients. It defines basic information of the OParl system.

|Parameter                       |Type        |Description
|--------------------------------|------------|-----------------------------------------------
|objectType                      |string      |is 'oparl:System'
|oparlVersion                    |string      |version number of supported OParl
|bodyList                        |list object |list of all bodies, see object [oparl:Body](#oparlBody)
|otherOparlVersions *(optional)* |array       |array of URIs
|                                |            |*^^ type should be changed ^^*
|license            *(optional)* |string      |URI of the used license
|name               *(optional)* |string      |user friendly title of the system
|contactEmail       *(optional)* |string      |contact email address
|contactName        *(optional)* |string      |name of the contact person
|website            *(optional)* |string      |URI of the RIS website
|vendor             *(optional)* |string      |URI of the vendor of the RIS software
|product            *(optional)* |string      |URI of the software product

#### Not yet ready object types

    oparl:Person
    oparl:Membership
    oparl:Meeting
    oparl:AgendaItem
    oparl:Paper
    oparl:Consultation
    oparl:File
    oparl:Location
    oparl:Membership
    oparl:AgendaItem
    oparl:Consultation
    oparl:File
    oparl:Location

## Contributing

## Release History

* 0.0.1 Initial release

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.
