// Include the JSON helper
#include "./helpers/JSON.jsx"
// Include the descriptor-info module
#include "../jsx/descriptor-info.jsx"

// ActionDescriptor example
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
var desc = executeActionGet(ref);

/** Retrieve its properties by running the getProperties function, passing the ActionDescriptor as a param
  * @param {Boolean} reference - return reference descriptors. Could slightly affect speed. Default = false.
  * @param {Boolean} extended - returns extended information about the descriptor. Default = false.
  * @param {Number} maxRawLimit - limits the max number of characters from a RAWTYPE descriptor. Default = 10000.
  * @param {Number} maxXMPLimit - limits the max number of characters from an XMPMetadataAsUTF8 property. Default = 10000.
  * @param {String} saveToFile - Saves the descriptor to a JSON file. Default = '~/Desktop/descriptor-info.json'.
  */
var descFlags = {
	reference : false,
	extended : false,
	maxRawLimit : 10000,
	maxXMPLimit : 100000,
	saveToFile: '~/Desktop/descriptor-info.json'
};

var descObject = descriptorInfo.getProperties( desc, descFlags );

// Running in ExtendScript
$.writeln(JSON.stringify(descObject, null, 4));

// Running in Brackets with the Brackets-to-Photoshop extension
// https://github.com/JavierAroche/brackets-to-photoshop
// Brackets-to-Photoshop extension includes the JSON helper by default
// $.writeln(descObject);
