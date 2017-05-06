 /*
 *
 * Descriptor-Info
 * JSX script to recursively get all the properties in an ActionDescriptor used in Adobe applications
 * 
 * Author: Javier Aroche (https://github.com/JavierAroche)
 * Repo: https://github.com/JavierAroche/descriptor-info
 * Version: v1.0.0
 * License MIT
 *
 */

/*
 * Descriptor Info constructor.
 * @constructor
 */
function DescriptorInfo() {}

/*
 * @public
 * Handler function to get Action Descriptor properties
 * @param {Object} Action Descriptor
 * @param {Object} Optional params object
 *    @flag {Boolean} reference - return reference descriptors. Could slightly affect speed. Default = false.
 *    @flag {Boolean} extended - returns extended information about the descriptor. Default = false.
 */
DescriptorInfo.prototype.getProperties = function( theDesc, params ) {
    // Define params
    this.descParams = {
        reference : params ? params.reference : false,
        extended : params ? params.extended : false
    };
    
    if( theDesc == '[ActionList]' ) {
        return this._getDescList( theDesc );
    } else {
        return this._getDescObject( theDesc, {} );
    }
};

/*
 * @private
 * Handler function to get the items in an ActionDescriptor Object
 * @param {Object} Action Descritor
 * @param {Object} Empty object to return (required since it's a recursive function)
 */
DescriptorInfo.prototype._getDescObject = function( theDesc, descObject ) {
    for( var i = 0; i < theDesc.count; i++ ) {        
            var typeID = theDesc.getKey(i); // storing typeID in variable should save a litle bit of performance
            var descType = ( theDesc.getType( typeID ) ).toString();
			
			var descProperties,
				descStringID = typeIDToStringID( typeID ),
				descCharID = typeIDToCharID( typeID );
            
			if( this.descParams.extended ) {
				descProperties = {
					stringID : descStringID,
					charID : descCharID,
					id : typeID,
					key : i,
					type : descType,
					value : this._getValue( theDesc, descType, typeID )
                    
				};
            
			} else {
				descProperties = this._getValue( theDesc, descType, typeID );
			}
            
            //var objectName = descStringID == '' ? descCharID : descStringID;
            var objectName = this._getBestName (typeID);
            
            switch( descType ) {
                case 'DescValueType.OBJECTTYPE':
					if( this.descParams.extended ) {
						descProperties.object = this._getDescObject( descProperties.value, {} );
					} else {
						descProperties = this._getDescObject( descProperties, {} );
					}
                    break;
                
                case 'DescValueType.LISTTYPE':
					if( this.descParams.extended ) {
                    	descProperties.list = this._getDescList( descProperties.value );
					} else {
						descProperties = this._getDescList( descProperties );
					}
                    break;
                    
                case 'DescValueType.ENUMERATEDTYPE':
                    descProperties.enumerationType = typeIDToStringID(theDesc.getEnumerationType( typeID ));  
                    break;
                    
                case 'DescValueType.REFERENCETYPE': 
                    if( this.descParams.reference ) {
                          var referenceValue;
                          
                          if(this.descParams.extended) {
                              referenceValue = descProperties.value;
                          } else {
                              referenceValue = descProperties;
                          }
                            debugger;
                          // there is multiple try/catch because you never know which lines of code can get data and you don't want drop all
                          // if this try/catch will wrap inside another try then data will drop
                          try{
                            descProperties.actionReference = this._getActionReferenceInfo (referenceValue);
                          }catch(err){
                              $.writeln("I can't read descProperties.value " + descStringID + ' - ' + err);
                          }
                      
                          try{
                              descProperties.actionReferenceContainer = this._getActionReferenceInfo (referenceValue.getContainer());
                          }catch(err){
                            $.writeln("I can't read descProperties.value.getContainer(): " + descStringID + ' - ' + err);
                          }
                      
                          try{
                            descProperties.reference = executeActionGet( referenceValue );
                          }catch(err){
                            $.writeln("I can't use executeActionGet from regular value: " + descStringID + ' - ' + err);
                          }
                      
                          try{
                            descProperties.referenceContainer = executeActionGet( referenceValue.getContainer() );
                          }catch(err){
                            $.writeln("I can't use executeActionGet from container: " + descStringID + ' - ' + err);
                          }
                    }
                    break;
                
                default: 
                    break;
            }
            
            descObject[objectName] = descProperties;
    }
    
    return descObject;
};

/*
 * @private
 * Handler function to get the items in an ActionList
 * @param {Object} Action List
 */
DescriptorInfo.prototype._getDescList = function( list ) {
    var listArray = [];
        
    for ( var ii = 0; ii < list.count; ii++ ) {
        var listItemType = list.getType(ii).toString();
        var listItemValue = this._getValue( list, listItemType, ii );
        
        switch( listItemType ) {
            case 'DescValueType.OBJECTTYPE':
                var listItemOBJ = {};
				
				var listItemProperties,
					descStringID = typeIDToStringID( list.getClass(ii) );
                
				if( this.descParams.extended ) {
					listItemProperties = {
						stringID : descStringID,
						key : ii,
						type : listItemType,
						value : listItemValue
					};

					listItemProperties.object = this._getDescObject( listItemValue, {} );
				} else {
					listItemProperties = this._getDescObject( listItemValue, {} );
				}
                
                var listItemObject = {};
                listItemObject[descStringID] = listItemProperties;
                
                listArray.push( listItemObject );
                break;

            case 'DescValueType.LISTTYPE':
                listArray.push( this._getDescList( listItemValue ) );
                break;
            
            case 'DescValueType.REFERENCETYPE':
                if( this.descParams.reference ) {
                    listArray.push( executeActionGet( listItemValue ) );
                } else {
                    listArray.push( listItemValue );
                }
                break;

            default: 
                listArray.push( listItemValue );
                break;
        }
    }
    
    return listArray;
}

/*
 * @private
 *
 * Based on code by Michael Hale
 * http://www.ps-scripts.com/
 *
 * Handler function to get the value of an Action Descriptor
 * @param {Object} Action Descriptor
 * @param {String} Action Descriptor type
 * @param {Number} Action Descriptor Key / Index
 */
DescriptorInfo.prototype._getValue = function( theDesc, descType, position ) {   
    
    switch( descType ) {  
        case 'DescValueType.BOOLEANTYPE':  
            return theDesc.getBoolean( position );  
            break;

        case 'DescValueType.CLASSTYPE':  
            return theDesc.getClass( position );  
            break;

        case 'DescValueType.DOUBLETYPE':  
            return theDesc.getDouble( position );  
            break;

        case 'DescValueType.ENUMERATEDTYPE':  
            return typeIDToStringID(theDesc.getEnumerationValue( position ));  
            break;

        case 'DescValueType.INTEGERTYPE':  
            return theDesc.getInteger( position );  
            break;

        case 'DescValueType.LISTTYPE':  
            return theDesc.getList( position );  
            break;

        case 'DescValueType.OBJECTTYPE':
            return theDesc.getObjectValue( position );  
            break;

        case 'DescValueType.REFERENCETYPE':
            return theDesc.getReference( position );  
            break;

        case 'DescValueType.STRINGTYPE':
            var str = '';
            return str + theDesc.getString( position );  
            break;

        case 'DescValueType.UNITDOUBLE':  
            return theDesc.getUnitDoubleValue( position );  
            break;        
        
        case 'DescValueType.ALIASTYPE':  
            return decodeURI(theDesc.getPath( position ));
            break;
        
        case 'DescValueType.RAWTYPE':  
            return theDesc.getData( position );
            break;
            
        // ReferenceFormType
            
        case 'ReferenceFormType.CLASSTYPE':
            return theDesc.getDesiredClass(); //I am not sure if makes sense
            break;
            
        case 'ReferenceFormType.ENUMERATED':
            var enumeratedID = theDesc.getEnumeratedValue();
            return this._getBestName (enumeratedID);
            break;
            
        case 'ReferenceFormType.IDENTIFIER':
            return theDesc.getIdentifier();
            break;
            
        case 'ReferenceFormType.INDEX':
            return theDesc.getIndex();
            break;
            
        case 'ReferenceFormType.NAME':
            var str = '';
            return str + theDesc.getName();
            break;
            
        case 'ReferenceFormType.OFFSET':
            return theDesc.getOffset();
            break;
            
        case 'ReferenceFormType.PROPERTY':
            var propertyID = theDesc.getProperty();
            return this._getBestName (propertyID);
            break;

        default:
            break;  
    };
};

/*
 * @private
 *
 * Handler function to get the info about action reference
 * @param {Object} Action Reference
 */

DescriptorInfo.prototype._getActionReferenceInfo = function(reference){
    var form = reference.getForm().toString();
    var classID = reference.getDesiredClass();
    var info;
    
    if( this.descParams.extended ){
        info = {
            stringID: typeIDToStringID(classID),
            charID: typeIDToCharID(classID),
            id: classID,
            type: form,
            value: this._getValue(reference, form, 0)
        };
    }

    else{
        info = this._getValue(reference, form, 0);
    }
    
    return info;
}


/*
 * @private
 *
 * Handler function to get the best name for typeID
 * @param {Number} typeID
 */
DescriptorInfo.prototype._getBestName = function (typeID){
    var stringValue = typeIDToStringID(typeID);
    var charValue = typeIDToCharID(typeID);
    if(stringValue) return stringValue;
    else if(charValue) return charValue;
    else return propertyID+""; //I am not sure if everything has stringID or charID
}

// Create a new Descriptor instance
var descriptorInfo = new DescriptorInfo();