import Ember from 'ember';

var _addBrace = function(element, plusId, numberSpaces, hasPlus, braceColor, braceHighlight){
    var jsonLine = {
            elements: [],
            lines: []
        },
        jsonObj = {};

    for(var counter = 0; counter < numberSpaces; counter = counter +1){
        jsonLine.elements.push(_addBlank());
    }

    jsonObj.newLine = true;
    jsonObj.endLine = true;
    jsonObj.hasPlus = hasPlus;
    jsonObj.plusId = 'plus_' + plusId;
    jsonObj.isBlank = false;
    jsonObj.element = element;
    jsonObj.style = 'color:' + braceColor + '; background-color:' + braceHighlight;
    jsonObj.class = 'json-brace';

    jsonLine.elements.push(jsonObj);

    return jsonLine;
};

var _addBlank = function(){
    var jsonObj = {};

    jsonObj.newLine = true;
    jsonObj.endLine = false;
    jsonObj.hasPlus = false;
    jsonObj.plusId = null;
    jsonObj.element = '';
    jsonObj.isBlank = true;
    jsonObj.style = '';
    jsonObj.class = 'json-blank';

    return jsonObj;
};

var _addKey = function(key, plusId, numberSpaces, keyColor, keyHighlight){
    var jsonObj = {};

    jsonObj.newLine = true;
    jsonObj.endLine = false;
    jsonObj.hasPlus = false;
    jsonObj.plusId = null;
    jsonObj.isBlank = false;
    jsonObj.element = key;
    jsonObj.style = 'color:' + keyColor + '; background-color:' + keyHighlight;
    jsonObj.class = 'json-key';

    return jsonObj;
};

var _addTwoPoints = function(){
    var jsonObj = {};

    jsonObj.newLine = false;
    jsonObj.endLine = false;
    jsonObj.hasPlus = false;
    jsonObj.plusId = null;
    jsonObj.isBlank = false;
    jsonObj.element = ':';
    jsonObj.style = '';
    jsonObj.class = 'json-two-points';

    return jsonObj;
};

var _addValue = function(value, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight, hasComma){
    var jsonObj = {};

    if(value){
        if(typeof value === 'string'){
            jsonObj = _addStringValue(value, stringColor, stringHighlight);
        }
        else if(Array.isArray(value)){
            if(typeof value[0] === 'object'){
                
                jsonObj = _createJSONTree(value, numberSpaces, plusId, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight, hasComma);
            }
            else{
                jsonObj = _addArrayStandardValues(value);
            }            
        }
        else if(value && typeof value === 'object'){
            jsonObj = _addObjectValue(value, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight);
        }
        else{
            jsonObj = _addStandardValue(value, valueColor, valueHighlight);
        }
    }
    else{
        jsonObj = _addStringValue('null', stringColor, stringHighlight);
    }

    return jsonObj;
};

var _addStringValue = function(value, stringColor, stringHighlight){
    var jsonObj = {};

    jsonObj.newLine = true;
    jsonObj.endLine = true;
    jsonObj.hasPlus = false;
    jsonObj.plusId = null;
    jsonObj.isBlank = false;
    jsonObj.element = value;
    jsonObj.style = 'color:' + stringColor + '; background-color:' + stringHighlight;
    jsonObj.class = 'json-string';

    return jsonObj;
};

var _addObjectValue = function(value, plusId, numberSpacesInitial, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight){
    return _createObject(value, plusId, numberSpacesInitial, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight);
};

var _addStandardValue = function(value, valueColor, valueHighlight){
    var jsonObj = {};

    jsonObj.newLine = false;
    jsonObj.endLine = false;
    jsonObj.hasPlus = false;
    jsonObj.plusId = null;
    jsonObj.isBlank = false;
    jsonObj.element = value;
    jsonObj.style = 'color:' + valueColor + '; background-color:' + valueHighlight;
    jsonObj.class = 'json-value';

    return jsonObj;
};

var _addArrayStandardValues = function(value){
    var jsonObj = {},
        arrayValue = '[';

    value.forEach(function(arrayItem){
        arrayValue = arrayValue + arrayItem + ', ';
    });

    arrayValue = arrayValue.substr(0, arrayValue.length - 2) + ']';

    jsonObj.newLine = true;
    jsonObj.endLine = true;
    jsonObj.hasPlus = false;
    jsonObj.plusId = null;
    jsonObj.isBlank = false;
    jsonObj.element = arrayValue;
    jsonObj.style = '';
    jsonObj.class = '';

    return jsonObj;
};

var _addComma = function(){
    var jsonObj = {};

    jsonObj.newLine = false;
    jsonObj.endLine = true;
    jsonObj.hasPlus = false;
    jsonObj.plusId = null;
    jsonObj.isBlank = false;
    jsonObj.element = ',';
    jsonObj.style = '';
    jsonObj.class = '';

    return jsonObj;
};

var _createObject = function(obj, plusId, numberSpacesInitial, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight) {
    var jsonLines = [],
        jsonLine = {
            elements: [],
            lines: []
        },
        jsonObj = {},
        numberSpaces = numberSpacesInitial;


    jsonLine = _addBrace('{', plusId, numberSpacesInitial, true, braceColor, braceHighlight);

    numberSpaces = numberSpaces + 1;
    Object.keys(obj).forEach(function(key, index){
        var hasComma = false,
        internalJsonLine = {
            elements: [],
            lines: []
        };

        plusId = plusId + 1;

        for(var counter = 0; counter < numberSpaces; counter = counter +1){
            internalJsonLine.elements.push(_addBlank());
        }

        internalJsonLine
            .elements
                .push(_addKey(key, plusId, numberSpaces, keyColor, keyHighlight));
        internalJsonLine
            .elements
                .push(_addTwoPoints());

        hasComma = index < (Object.keys(obj).length -1);

        internalJsonLine
            .elements
                .push(_addValue(obj[key], plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight, hasComma));

        jsonLine.lines.push(internalJsonLine);

        if(Array.isArray(internalJsonLine.elements[internalJsonLine.elements.length - 1])){

            var internalArray = internalJsonLine
                                    .elements[internalJsonLine
                                                .elements.length - 1];
            internalJsonLine.elements.pop();

            internalJsonLine.elements.push(internalArray[0].elements[0]);

            internalJsonLine.lines = internalArray[0].lines;

            jsonLine.lines.push(internalArray[internalArray.length - 1]);
        }
    });

    jsonLines.push(jsonLine);
    jsonLines.push(_addBrace('}', plusId, numberSpacesInitial, false, braceColor, braceHighlight));

    return jsonLines;
};

var _createJSONTree = function(obj, numberSpaces, plusId, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight, hasComma) {
    var jsonLines = [],
        jsonLine = {
            elements: [],
            lines: []
        },
        jsonObj = {
            'hasPlus': false,
            'newLine': false,
            'endLine': false
        },
        numberSpacesInitial = numberSpaces;

    if(Array.isArray(obj)){
        numberSpaces = numberSpaces + 1;

        jsonObj.newLine = true;
        jsonObj.endLine = true;
        jsonObj.hasPlus = true;
        jsonObj.plusId = 'plus_' + plusId;
        jsonObj.element = '[';
        jsonObj.isBlank = false;
        jsonObj.style = 'color:' + bracketColor + '; background-color:' + bracketHighlight;
        jsonObj.class = 'json-bracket';

        jsonLine.elements.push(jsonObj);

        obj.forEach(function(newObj, index){
            var newObject;

            plusId = plusId + 1;

            newObject = _createObject(newObj, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight);

            newObject.forEach(function(objectLine){
                jsonLine.lines.push(objectLine);
            });

            if(index < (obj.length -1)){
                jsonLine
                    .lines[jsonLine.lines.length - 1]
                        .elements.push(_addComma());
            }

            newObject.forEach(function(line){
                plusId = plusId + line.lines.length + 1;
            });            
        });

        jsonLines.push(jsonLine);

        jsonObj = {
            'hasPlus': false,
            'newLine': false,
            'endLine': false
        };
        jsonLine = {
            elements: [],
            lines: []
        };

        for(var counter = 0; counter < numberSpacesInitial; counter = counter +1){
            jsonLine.elements.push(_addBlank());
        }

        jsonObj.newLine = true;
        jsonObj.endLine = true;
        jsonObj.hasPlus = false;
        jsonObj.plusId = null;
        jsonObj.element = ']';
        jsonObj.isBlank = false;
        jsonObj.style = 'color:' + bracketColor + '; background-color:' + bracketHighlight;
        jsonObj.class = 'json-bracket';

        jsonLine.elements.push(jsonObj);

        if(hasComma){
            jsonLine.elements.push(_addComma());
        }

        jsonLines.push(jsonLine);
    }
    else{
        var newObject = _createObject(obj, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight);
        jsonLines.push(newObject);
    }

    return jsonLines;
};

var _prettyPrint = function(    obj,
                                keyColor, keyHighlight,
                                valueColor, valueHighlight,
                                stringColor, stringHighlight,
                                braceColor, braceHighlight,
                                bracketColor, bracketHighlight) {
    
    var jsonTree = _createJSONTree( obj, 0, 0,
                                    keyColor, keyHighlight,
                                    valueColor, valueHighlight,
                                    stringColor, stringHighlight,
                                    braceColor, braceHighlight,
                                    bracketColor, bracketHighlight);

    return jsonTree;
};

export default Ember.Component.extend({
    tagName: 'code',
    keyColor: '#A52A2A',
    keyHighlight: '#FFFFFF00',
    valueColor: '#000080',
    valueHighlight: '#FFFFFF00',
    stringColor: '#C0FF3E',
    stringHighlight: '#FFFFFF00',
    braceColor: '#000000',
    braceHighlight: '#FFFFFF00',
    bracketColor: '#000000',
    bracketHighlight: '#FFFFFF00',
    pretty: function () {
        var jsonObj = this.get('jsonObj'),
            keyColor = this.get('keyColor'),
            keyHighlight = this.get('keyHighlight'),
            valueColor = this.get('valueColor'),
            valueHighlight = this.get('valueHighlight'),
            stringColor = this.get('stringColor'),
            stringHighlight = this.get('stringHighlight'),
            braceColor = this.get('braceColor'),
            braceHighlight = this.get('braceHighlight'),
            bracketColor = this.get('bracketColor'),
            bracketHighlight = this.get('bracketHighlight'),
            json_pretty = _prettyPrint( jsonObj,
                                        keyColor, keyHighlight,
                                        valueColor, valueHighlight,
                                        stringColor, stringHighlight,
                                        braceColor, braceHighlight,
                                        bracketColor, bracketHighlight);
        
        return json_pretty;
    }.property('jsonObj'),
    actions: {
        toggleExpand: function(plusId){
            if(Ember.$('#' + plusId).hasClass('fa-plus-square-o')){
                Ember.$('#' + plusId).removeClass('fa-plus-square-o');
                Ember.$('#' + plusId).addClass('fa-minus-square-o');
            }
            else{
                Ember.$('#' + plusId).removeClass('fa-minus-square-o');
                Ember.$('#' + plusId).addClass('fa-plus-square-o');
            }
        }
    }
});