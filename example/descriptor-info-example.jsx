// Include the JSON helper
#include "./helpers/JSON.jsx"
// Include the descriptor-info module
#include "../jsx/descriptor-info.jsx"
  
// ActionDescriptor example  
var ref = new ActionReference();  
ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );  
var desc = executeActionGet(ref);   

// Retrieve its properties by running the getProperties function, passing the ActionDescriptor as a param
// Optional @param {Object} descFlags
// Optional @flag {Boolean} reference - return reference descriptors. Could slightly affect speed. Default = false.
// Optional @flag {Boolean} extended - returns extended information about the descriptor. Default = false.
// Optional @flag {Number} maxRawLimit - limits the max number of characters from a RAWTYPE descriptor. Default = 10000.
var descFlags = {
    reference : false,
	extended : false,
	maxRawLimit : 10000
};

var descObject = descriptorInfo.getProperties( desc, descFlags );

// Running in ExtendScript
$.writeln(JSON.stringify(descObject, null, 4));

// Running in Brackets with the Brackets-to-Photoshop extension
// https://github.com/JavierAroche/brackets-to-photoshop
// Brackets-to-Photoshop extension includes the JSON helper by default
$.writeln(descObject);