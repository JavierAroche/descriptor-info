// Include the descriptor-info module
#include "../jsx/descriptor-info.jsx"
// Include the JSON helper
#include "./helpers/JSON.jsx"
  
// ActionDescriptor example  
var ref = new ActionReference();  
ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );  
var desc = executeActionGet(ref);   
  
// Retrieve its properties by running the getProperties function, passing the ActionDescriptor as a param  
var descObject = descriptorInfo.getProperties( desc );

// Running in ExtendScript
$.writeln(JSON.stringify(descObject, null, 4));

// Running in Brackets with the Brackets-to-Photoshop extension
// https://github.com/JavierAroche/brackets-to-photoshop
// Brackets-to-Photoshop extension includes the JSON helper by default
$.writeln(descObject);