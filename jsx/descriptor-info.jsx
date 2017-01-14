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
 *    @flag {Boolean} reference - return reference descriptors. Could slightly affect speed.
 *    @flag {Boolean} extended - returns extended information about the descriptor.
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
        try {
            var descType = ( theDesc.getType( theDesc.getKey(i) ) ).toString();
			
			var descProperties,
				descStringID = typeIDToStringID( theDesc.getKey(i) ),
				descCharID = typeIDToCharID( theDesc.getKey(i) );
            
			if( this.descParams.extended ) {
				descProperties = {
					stringID : descStringID,
					charID : descCharID,
					id : theDesc.getKey(i),
					key : i,
					type : descType,
					value : this._getValue( theDesc, descType, theDesc.getKey(i) )
				};
			} else {
				descProperties = this._getValue( theDesc, descType, theDesc.getKey(i) );
			}
            
            var objectName = descStringID == '' ? descCharID : descStringID;
            
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
                    descProperties.enumerationType = typeIDToStringID(theDesc.getEnumerationType( theDesc.getKey(i) ));  
                    break;
                    
                case 'DescValueType.REFERENCETYPE':
                    if( this.descParams.reference ) {
						if( this.descParams.extended ) {
							descProperties.reference = executeActionGet( descProperties.value );
						} else {
							descProperties = executeActionGet( descProperties );
						}
                    }
                    break;
                
                default: 
                    break;
            }
            
            descObject[objectName] = descProperties;
            
        } catch(err) {
            $.writeln('error: ' + descStringID + ' - ' + err);
        }
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

        default:
            break;  
    };
};

// Create a new Descriptor instance
var descriptorInfo = new DescriptorInfo();
