# Descriptor Info
[![npm-image](https://img.shields.io/badge/Descriptor%20Info-v1.1.0-09bc00.svg)](https://github.com/JavierAroche/parse-action-descriptor-code)

## Description
JSX module to recursively get all the properties in an `ActionDescriptor` used in Adobe applications.

## Usage

**getProperties**

Return complete Descriptor info in JSON format
```javascript
/**
  * @param {Boolean} reference - return reference descriptors. Could slightly affect speed. Default = false.
  * @param {Boolean} extended - returns extended information about the descriptor. Default = false.
  * @param {Number} maxRawLimit - limits the max number of characters from a RAWTYPE descriptor. Default = 10000.
  * @param {Number} maxXMPLimit - limits the max number of characters from an XMPMetadataAsUTF8 property. Default = 10000.
  * @param {String} saveToFile - Saves the descriptor to a JSON file. Default = '~/Desktop/descriptor-info.json'.
  */
```

**Sample code for getting Descriptor properties with getProperties**
```javascript
// Include the JSON helper
#include "./helpers/JSON.jsx"
// Include the descriptor-info module
#include "../jsx/descriptor-info.jsx"

// ActionDescriptor example
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
var desc = executeActionGet(ref);

// Optional
var descFlags = {
	reference : false,
	extended : false,
	maxRawLimit : 10000,
	maxXMPLimit : 100000,
	saveToFile: '~/Desktop/descriptor-info.json'
};

// Retrieve its properties by running the getProperties function, passing the ActionDescriptor as a param
var descObject = descriptorInfo.getProperties( desc, descFlags );
```


**JSON returned for requested Descriptor info.**
```javascript
{
    "name": "Layer 0",
    "color": "none",
    "visible": true,
    "mode": "normal",
    "opacity": 255,
    "layerID": 4,
    "itemIndex": 2,
    "count": 3,
    "preserveTransparency": false,
    "layerFXVisible": false,
    "globalAngle": 30,
    "background": false,
    "layerSection": "layerSectionContent",
    "layerLocking": {
        "protectTransparency": false,
        "protectComposite": false,
        "protectPosition": false,
        "protectAll": false
    },
    "group": false,
    "targetChannels": [
        {
            "typename": "ActionReference"
        },
        {
            "typename": "ActionReference"
        },
        {
            "typename": "ActionReference"
        }
    ],
    "visibleChannels": [
        {
            "typename": "ActionReference"
        },
        {
            "typename": "ActionReference"
        },
        {
            "typename": "ActionReference"
        }
    ],
    "channelRestrictions": [
        "red",
        "grain",
        "blue"
    ],
    "fillOpacity": 255,
    "hasUserMask": false,
    "hasVectorMask": false,
    "proportionalScaling": false,
    "layerKind": 5,
    "hasFilterMask": false,
    "userMaskDensity": 255,
    "userMaskFeather": 0,
    "vectorMaskDensity": 255,
    "vectorMaskFeather": 0,
    "bounds": {
        "top": -51,
        "left": -104,
        "bottom": 1599,
        "right": 2312,
        "width": 2416,
        "height": 1650
    },
    "boundsNoEffects": {
        "top": -51,
        "left": -104,
        "bottom": 1599,
        "right": 2312,
        "width": 2416,
        "height": 1650
    },
    "smartObject": {
        "placed": "rasterizeContent",
        "documentID": "",
        "compsList": {
            "compID": -1,
            "originalCompID": -1
        },
        "linked": false,
        "fileReference": "Screen Shot 2017-01-13 at 12.52.30 PM.png"
    },
    "useAlignedRendering": false,
    "generatorSettings": {

    },
    "keyOriginType": [

    ],
    "fillEnabled": false,
    "animationProtection": {
        "animationUnifyPosition": false,
        "animationUnifyEffects": false,
        "animationUnifyVisibility": false,
        "animationPropagate": true
    },
    "artboard": {
        "artboardRect": {
            "top": 0,
            "left": 0,
            "bottom": 0,
            "right": 0
        }
    },
    "artboardEnabled": false
}
```

**JSON returned with `extended: true`**
```javascript
{
    "name": {
        "stringID": "name",
        "charID": "Nm  ",
        "id": 1315774496,
        "key": 0,
        "type": "DescValueType.STRINGTYPE",
        "value": "Layer 0"
    },
    "color": {
        "stringID": "color",
        "charID": "Clr ",
        "id": 1131180576,
        "key": 1,
        "type": "DescValueType.ENUMERATEDTYPE",
        "value": "none",
        "enumerationType": "color"
    },
    "visible": {
        "stringID": "visible",
        "charID": "Vsbl",
        "id": 1450402412,
        "key": 2,
        "type": "DescValueType.BOOLEANTYPE",
        "value": true
    },
    "mode": {
        "stringID": "mode",
        "charID": "Md  ",
        "id": 1298407456,
        "key": 3,
        "type": "DescValueType.ENUMERATEDTYPE",
        "value": "normal",
        "enumerationType": "blendMode"
    },
    "opacity": {
        "stringID": "opacity",
        "charID": "Opct",
        "id": 1332765556,
        "key": 4,
        "type": "DescValueType.INTEGERTYPE",
        "value": 255
    },
    "layerID": {
        "stringID": "layerID",
        "charID": "LyrI",
        "id": 1283027529,
        "key": 5,
        "type": "DescValueType.INTEGERTYPE",
        "value": 4
    },
    "itemIndex": {
        "stringID": "itemIndex",
        "charID": "ItmI",
        "id": 1232366921,
        "key": 6,
        "type": "DescValueType.INTEGERTYPE",
        "value": 2
    },
    "targetChannels": {
        "stringID": "targetChannels",
        "charID": "",
        "id": 3036,
        "key": 15,
        "type": "DescValueType.LISTTYPE",
        "value": {
            "count": 3,
            "typename": "ActionList"
        },
        "list": [
            {
                "typename": "ActionReference"
            },
            {
                "typename": "ActionReference"
            },
            {
                "typename": "ActionReference"
            }
        ]
    },
    "channelRestrictions": {
        "stringID": "channelRestrictions",
        "charID": "",
        "id": 1196,
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
    "smartObject": {
        "stringID": "smartObject",
        "charID": "",
        "id": 829,
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
                "id": 2363,
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
                "value": ""
            },
            "compsList": {
                "stringID": "compsList",
                "charID": "",
                "id": 3017,
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
                "value": "Screen Shot 2017-01-13 at 12.52.30 PM.png"
            }
        }
    },
    ...
}
```

## Example
[descriptor-info-example](https://github.com/JavierAroche/descriptor-info/tree/master/example)

## Supported Descriptors
* `DescValueType.BOOLEANTYPE`
* `DescValueType.CLASSTYPE`
* `DescValueType.DOUBLETYPE`
* `DescValueType.ENUMERATEDTYPE`
* `DescValueType.INTEGERTYPE`
* `DescValueType.LISTTYPE`
* `DescValueType.OBJECTTYPE`
* `DescValueType.REFERENCETYPE`
* `DescValueType.STRINGTYPE`
* `DescValueType.UNITDOUBLE`
* `DescValueType.ALIASTYPE`
* `DescValueType.RAWTYPE`

## Known Limitations
* `REFERENCETYPE` Descriptors will only return the Descriptor linked, but not it's actual properties. Adding this without properly testing can fall in an endless loop.
* `RAWTYPE` Descriptors, usually labeled `legacyContentData`, will return the value as unicode. You will have to parse it separately as the data varies too much.

## Changelog
**v1.1.0 (Dec 08 2017)**
* Added maxRawLimit param
* Added maxXMPLimit param
* Added saveToFile param
* Improved ActionReference / ActionLists

**v1.0.2 (Jan 13 2017)**
* Added optional params to retrieve extended descriptor information
* Updated example to reflect new optional params

**v1.0.1 (Jan 3 2017)**
* Added optional params to retrieve reference descriptors
* Updated example to reflect new optional params

**v1.0.0 (Dec 2 2016)**
* Added descriptor-info JSX

**v0.0.0 (Dec 2 2016)**
* Initial Commit

## License
MIT © Javier Aroche
