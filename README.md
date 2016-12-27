# Descriptor-Info

### Description
---------
JSX module to recursively get all the properties in an ActionDescriptor used in Adobe applications

### Usage
---------
#### getProperties
Return complete Descriptor info in JSON format

// Sample code for getting Descriptor properties with getProperties

```
// Include the descriptorInfo module
#include "~/Development/personal/descriptor-info/jsx/descriptor-info.jsx"

// ActionDescriptor example
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
var desc = executeActionGet(ref); 

// Retrieve its properties by running the getProperties function, passing the ActionDescriptor as a param
var descObject = descriptorInfo.getProperties( desc );
```


Returns JSON for requested Descriptor info. Sample reply:
```
{
    "name": {
        "stringID": "name",
        "charID": "Nm  ",
        "id": 1315774496,
        "key": 0,
        "type": "DescValueType.STRINGTYPE",
        "value": "Background"
    },
    "visible": {
        "stringID": "visible",
        "charID": "Vsbl",
        "id": 1450402412,
        "key": 1,
        "type": "DescValueType.BOOLEANTYPE",
        "value": true
    },
    "mode": {
        "stringID": "mode",
        "charID": "Md  ",
        "id": 1298407456,
        "key": 2,
        "type": "DescValueType.ENUMERATEDTYPE",
        "value": "normal",
        "enumerationType": "blendMode"
    },
    "opacity": {
        "stringID": "opacity",
        "charID": "Opct",
        "id": 1332765556,
        "key": 3,
        "type": "DescValueType.INTEGERTYPE",
        "value": 255
    },
    "layerID": {
        "stringID": "layerID",
        "charID": "LyrI",
        "id": 1283027529,
        "key": 4,
        "type": "DescValueType.INTEGERTYPE",
        "value": 1
    },
    "bounds": {
        "stringID": "bounds",
        "charID": "",
        "id": 1341,
        "key": 20,
        "type": "DescValueType.OBJECTTYPE",
        "value": {
            "count": 4,
            "typename": "ActionDescriptor"
        },
        "object": {
            "top": {
                "stringID": "top",
                "charID": "Top ",
                "id": 1416589344,
                "key": 0,
                "type": "DescValueType.UNITDOUBLE",
                "value": 0
            },
            "left": {
                "stringID": "left",
                "charID": "Left",
                "id": 1281713780,
                "key": 1,
                "type": "DescValueType.UNITDOUBLE",
                "value": 0
            },
            "bottom": {
                "stringID": "bottom",
                "charID": "Btom",
                "id": 1114926957,
                "key": 2,
                "type": "DescValueType.UNITDOUBLE",
                "value": 2500
            },
            "right": {
                "stringID": "right",
                "charID": "Rght",
                "id": 1382508660,
                "key": 3,
                "type": "DescValueType.UNITDOUBLE",
                "value": 1594
            }
        }
    },
    "smartObject": {
        "stringID": "smartObject",
        "charID": "",
        "id": 834,
        "key": 30,
        "type": "DescValueType.OBJECTTYPE",
        "value": {
            "count": 5,
            "typename": "ActionDescriptor"
        },
        "object": {
            "placed": {
                "stringID": "placed",
                "charID": "",
                "id": 2367,
                "key": 0,
                "type": "DescValueType.ENUMERATEDTYPE",
                "value": "rasterizeContent",
                "enumerationType": "placed"
            },
            "documentID": {
                "stringID": "documentID",
                "charID": "DocI",
                "id": 1148150601,
                "key": 1,
                "type": "DescValueType.STRINGTYPE",
                "value": "xmp.did:bfeed619-610f-4c23-9a5d-d03a5d55286e"
            },
            "compsList": {
                "stringID": "compsList",
                "charID": "",
                "id": 3048,
                "key": 2,
                "type": "DescValueType.OBJECTTYPE",
                "value": {
                    "count": 2,
                    "typename": "ActionDescriptor"
                },
                "object": ...
            },
            "linked": {
                "stringID": "linked",
                "charID": "Lnkd",
                "id": 1282304868,
                "key": 3,
                "type": "DescValueType.BOOLEANTYPE",
                "value": false
            },
            "fileReference": {
                "stringID": "fileReference",
                "charID": "FilR",
                "id": 1181314130,
                "key": 4,
                "type": "DescValueType.STRINGTYPE",
                "value": "imac_performance_and_design.psb"
            }
        }
    },
    "targetChannels": {
        "stringID": "targetChannels",
        "charID": "",
        "id": 3072,
        "key": 15,
        "type": "DescValueType.LISTTYPE",
        "value": {
          "count": 3,
          "typename": "ActionList"
        },
        "list": [
            {
              "count": 5,
              "typename": "ActionDescriptor"
            },
            {
              "count": 5,
              "typename": "ActionDescriptor"
            },
            {
              "count": 5,
              "typename": "ActionDescriptor"
            }
        ]
    },
    "channelRestrictions": {
        "stringID": "channelRestrictions",
        "charID": "",
        "id": 1201,
        "key": 17,
        "type": "DescValueType.LISTTYPE",
        "value": {
            "count": 3,
            "typename": "ActionList"
        },
        "list": [
            "red",
            "grain",
            "blue"
        ]
    },
    ...
}
```

### Example
---------
* [descriptor-info-example](https://github.com/JavierAroche/descriptor-info/tree/master/example)


### Supported Descriptors
---------
* DescValueType.BOOLEANTYPE
* DescValueType.CLASSTYPE
* DescValueType.DOUBLETYPE
* DescValueType.ENUMERATEDTYPE
* DescValueType.INTEGERTYPE
* DescValueType.LISTTYPE
* DescValueType.OBJECTTYPE
* DescValueType.REFERENCETYPE
* DescValueType.STRINGTYPE
* DescValueType.UNITDOUBLE
* DescValueType.ALIASTYPE
* DescValueType.RAWTYPE

### Known Limitations
---------
* REFERENCETYPE Descriptors will only return the Descriptor linked, but not it's actual properties. Adding this without properly testing can fall in an endless loop.
* RAWTYPE Descriptors, usually labeled "legacyContentData", will return the value as unicode. You will have to parse it separately as the data varies too much.

### Changelog
---------
**v1.0.0 (Dec 2 2016)**
* Added descriptor-info JSX

**v0.0.0 (Dec 2 2016)**
* Initial Commit

### License
---------
MIT © Javier Aroche