import Ember from 'ember';

var _addBrace = function(element, plusId, numberSpaces, hasPlus, braceColor, braceHighlight){
    var jsonLine = {
            elements: []
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

var _addValue = function(value, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight){
    var jsonObj = {};

    if(value){
        if(typeof value === 'string'){
            jsonObj = _addStringValue(value, stringColor, stringHighlight);
        }
        else if(Array.isArray(value)){
            if(typeof value[0] === 'object'){
                jsonObj = _createJSONTree(value, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight);
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

var _createObject = function(obj, plusId, numberSpacesInitial, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight) {
    var jsonLines = [],
        jsonLine = {
            elements: []
        },
        jsonObj = {},
        numberSpaces = numberSpacesInitial;


    jsonLines.push(_addBrace('{', plusId, numberSpacesInitial, true, braceColor, braceHighlight));

    numberSpaces = numberSpaces + 1;
    Object.keys(obj).forEach(function(key){
        plusId = plusId + 1;

        jsonLine = {
            elements: []
        };

        for(var counter = 0; counter < numberSpaces; counter = counter +1){
            jsonLine.elements.push(_addBlank());
        }

        jsonLine
            .elements
                .push(_addKey(key, plusId, numberSpaces, keyColor, keyHighlight));
        jsonLine
            .elements
                .push(_addTwoPoints());
        jsonLine
            .elements
                .push(_addValue(obj[key], plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight));

        if(Array.isArray(jsonLine.elements[jsonLine.elements.length - 1])){

            var internalArray = jsonLine.elements[jsonLine.elements.length - 1];
            jsonLine.elements.pop();

            jsonLine.elements.push(internalArray[0].elements[0]);
            jsonLines.push(jsonLine);

            internalArray.shift();
            internalArray.forEach(function(element){
                jsonLine = {
                    elements: []
                };
                element.elements.forEach(function(object){
                    jsonLine.elements.push(object);
                });
                jsonLines.push(jsonLine);
            });
        }
        else{
            jsonLines.push(jsonLine);
        }
    });
    
    jsonLines.push(_addBrace('}', plusId, numberSpacesInitial, false, braceColor, braceHighlight));

    return jsonLines;
};

var _createJSONTree = function( obj, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight) {
    var jsonLines = [],
        jsonLine = {
            elements: []
        },
        jsonObj = {
            'hasPlus': false,
            'newLine': false,
            'endLine': false
        },
        numberSpaces = 0,
        plusId = 0;

    if(Array.isArray(obj)){
        numberSpaces = 1;

        jsonObj.newLine = true;
        jsonObj.endLine = true;
        jsonObj.hasPlus = true;
        jsonObj.plusId = 'plus_' + plusId;
        jsonObj.element = '[';
        jsonObj.isBlank = false;
        jsonObj.style = 'color:' + bracketColor + '; background-color:' + bracketHighlight;
        jsonObj.class = 'json-bracket';

        jsonLine.elements.push(jsonObj);
        jsonLines.push(jsonLine);

        obj.forEach(function(newObj){
            var newLines;

            plusId = plusId + 1;

            newLines = _createObject(newObj, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight);

            jsonLines = jsonLines.concat(newLines);

            plusId = plusId + newLines.length;
        });

        jsonObj = {
            'hasPlus': false,
            'newLine': false,
            'endLine': false
        };
        jsonLine = {
            'elements': []
        };
        jsonObj.newLine = true;
        jsonObj.endLine = true;
        jsonObj.hasPlus = false;
        jsonObj.plusId = null;
        jsonObj.element = ']';
        jsonObj.isBlank = false;
        jsonObj.style = 'color:' + bracketColor + '; background-color:' + bracketHighlight;
        jsonObj.class = 'json-bracket';

        jsonLine.elements.push(jsonObj);
        jsonLines.push(jsonLine);
    }
    else{
        _createObject(obj, plusId, numberSpaces, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight);
    }

    return jsonLines;
};

var _createJSONTree_old = function( obj, keyColor, keyHighlight, valueColor, valueHighlight, stringColor, stringHighlight, braceColor, braceHighlight, bracketColor, bracketHighlight) {
    var jsonArray = [],
        jsonLine = {
            elements: []
        };

    JSON.stringify(obj, null, 3).split('\n').forEach(function(line, index){
        var jsonObj = {
            'hasPlus': false,
            'newLine': false,
            'endLine': false
        },
        comma = '',
        prevEndLine = false;

        if(line.substr(line.length - 1, 1) === ','){
            comma = line.substr(line.length - 1, 1);
            line = line.substr(0, line.length - 1);
        }

        if(line.split(':').length <= 1){
            if(line.trim() === '{' || line.trim() === '['){
                jsonObj.newLine = true;
                jsonObj.endLine = true;
                jsonObj.hasPlus = true;
                jsonObj.plusId = 'plus_' + index;
            }
            else if(line.trim() === '}' || line.trim() === ']'){
                jsonObj.newLine = true;
                jsonObj.endLine = true;
                jsonObj.hasPlus = false;
                jsonObj.plusId = null;
            }

            jsonObj.element = line.trim();

            if(line.trim() === '{' || line.trim() === '}'){
                jsonObj.style = 'color:' + braceColor + '; background-color:' + braceHighlight;
                jsonObj.class = 'json-brace';
            }

            if(line.trim() === '[' || line.trim() === ']'){
                jsonObj.style = 'color:' + bracketColor + '; background-color:' + bracketHighlight;
                jsonObj.class = 'json-bracket';
            }
        }
        else{
            var keyObj, valueObj;

            keyObj = line.split(':')[0].trim();
            valueObj = line.split(':')[1].trim();

            jsonObj.newLine = true;
            jsonObj.endLine = false;
            jsonObj.style = 'color:' + keyColor + '; background-color:' + keyHighlight;
            jsonObj.class = 'json-key';
            jsonObj.element = keyObj.trim();

            jsonLine.elements.push(jsonObj);

            jsonObj = {
                'class': 'json-two-points',
                'hasPlus': false,
                'element': ': ',
                'style': 'color:#000000; background-color:#FFFFFF00'
            };

            jsonLine.elements.push(jsonObj);

            jsonObj = {
                "hasPlus": false,
                "newLine": false,
                "endLine": false
            };

            if(valueObj.trim() === '{' || valueObj.trim() === '['){
                jsonObj.newLine = true;
                jsonObj.endLine = true;
                jsonObj.hasPlus = true;
                jsonObj.plusId = 'plus_' + index;

                if(line.trim() === '{'){
                    jsonObj.style = 'color:' + braceColor + '; background-color:' + braceHighlight;
                    jsonObj.class = 'json-brace';
                }

                if(line.trim() === '['){
                    jsonObj.style = 'color:' + bracketColor + '; background-color:' + bracketHighlight;
                    jsonObj.class = 'json-bracket';
                }
            }
            else if(valueObj.indexOf('"') <= -1){
                jsonObj.newLine = false;
                jsonObj.endLine = true;
                jsonObj.style = 'color:' + valueColor + '; background-color:' + valueHighlight;
                jsonObj.class = 'json-value';
            }
            else{
                jsonObj.newLine = false;
                jsonObj.endLine = true;
                jsonObj.style = 'color:' + stringColor + '; background-color:' + stringHighlight;
                jsonObj.class = 'json-string';
            }

            jsonObj.element = valueObj;
        }

        jsonLine.elements.push(jsonObj);

        if(comma === ','){
            prevEndLine = jsonObj.endLine;
            jsonObj = {
                'class': 'json-comma',
                'hasPlus': false,
                'element': ',',
                'style': '',
                'newLine': false,
                'endLine': true
            };
            jsonLine.elements.push(jsonObj);            
        }

        if(jsonObj.endLine){
            jsonArray.push(jsonLine);
            jsonLine = {
                elements: []
            };
        }
        
    });

    return jsonArray;
};

var _replacer = function(match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class=json-key>';
    var val = '<span class=json-value>';
    var str = '<span class=json-string>';
    var brace = '<span class=json-brace>';
    var bracket = '<span class=json-bracket>';
    var bracketInternal = '<span class=json-bracket-internal>';
    var blank = '<span class=json-blank>';
    var comma = '<span class=json-comma>,</span>';
    var commaInternal = '<span class=json-comma-internal>,</span>';
    var twoPoints = '<span class=json-two-points>: </span>';
    var plusIcon = '<i class="fa fa-plus-square-o plus-icon"></i>';
    var plusIconInternal = '<i class="fa fa-plus-square-o plus-icon-internal"></i>';
    var r = pIndent || '';

    if (pKey){
        r = r + key + pKey.replace(/[": ]/g, '') + '</span>' + twoPoints;
        if(match.split(':')[1].indexOf('[') > -1){
            r = r + blank + match.split(':')[1].replace('[', '') + '</span>' + plusIconInternal + bracketInternal + match.split(':')[1].trim() + '</span>';            
            pEnd = '';
        }
    }
    if (pVal){
        r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
        if(match.indexOf(',') > -1){
            r = r + commaInternal;
        }
    }
    if(match.trim() === '},' && pEnd === undefined){
        r = r + blank + match.replace('},', '') + '</span>' + brace + match.replace(',','').trim() + '</span>' + comma;
        pEnd = '';
    }
    if(match.trim() === '{' || (match.trim() === '}' && pEnd !== '')){
        if(match.trim() === '{'){
            r = r + blank + match.replace('{', '') + '</span>' + plusIcon + brace + match.trim() + '</span>';
        }
        else{
            r = r + blank + match.replace('}', '') + '</span>' + brace + match.trim() + '</span>';
        }
        pEnd = '';
    }
    if(match.trim() === '],' && pEnd === ']'){
        r = r + blank + match.replace('],', '') + '</span>' + bracket + pEnd.trim() + '</span>' + comma;
        pEnd = '';
    }
    if(match.trim() === '[' || match.trim() === ']'){
        if(match.trim() === '['){
            r = plusIcon;
        }
        r = r + bracket + match + '</span>';
        pEnd = '';
    }
    return r + (pEnd || '');
};

var _replaceKeyStyle = function(jsonHTML, keyColor, keyHighlight){
    return jsonHTML
            .replace(   /<span class=json-key>/g,
                        '<span class=json-key style="color:' + keyColor + '; background-color:' + keyHighlight + ';">'
                    );
};

var _replaceValueStyle = function(jsonHTML, valueColor, valueHighlight){
    return jsonHTML
            .replace(   /<span class=json-value>/g,
                        '<span class=json-value style="color:' + valueColor + '; background-color:' + valueHighlight + ';">'
                    );
};

var _replaceStringStyle = function(jsonHTML, stringColor, stringHighlight){
    return jsonHTML
            .replace(   /<span class=json-string>/g,
                        '<span class=json-string style="color:' + stringColor + '; background-color:' + stringHighlight + ';">'
                    );
};

var _replaceBraceStyle = function(jsonHTML, braceColor, braceHighlight){
    return jsonHTML
            .replace(   /<span class=json-brace>/g,
                        '<span class=json-brace style="color:' + braceColor + '; background-color:' + braceHighlight + ';">'
                    );
};

var _replaceBracketStyle = function(jsonHTML, bracketColor, bracketHighlight){
    return jsonHTML
            .replace(   /<span class=json-bracket>/g,
                        '<span class=json-bracket style="color:' + bracketColor + '; background-color:' + bracketHighlight + ';">'
                    )
            .replace(   /<span class=json-bracket-internal>/g,
                        '<span class=json-bracket-internal style="color:' + bracketColor + '; background-color:' + bracketHighlight + ';">'
                    );
};

var _prettyPrint = function(    obj,
                                keyColor, keyHighlight,
                                valueColor, valueHighlight,
                                stringColor, stringHighlight,
                                braceColor, braceHighlight,
                                bracketColor, bracketHighlight) {
    /*var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?(])?([,[{])?([,[}])?([,[},])?$/mg,
        jsonHTML = jsonObj.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, _replacer);

        jsonHTML = _replaceKeyStyle(jsonHTML, keyColor, keyHighlight);
        jsonHTML = _replaceValueStyle(jsonHTML, valueColor, valueHighlight);
        jsonHTML = _replaceStringStyle(jsonHTML, stringColor, stringHighlight);
        jsonHTML = _replaceBraceStyle(jsonHTML, braceColor, braceHighlight);
        jsonHTML = _replaceBracketStyle(jsonHTML, bracketColor, bracketHighlight);

        return jsonHTML;
*/
    var jsonTree = _createJSONTree( obj,
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
        
        //return Ember.String.htmlSafe(json_pretty);
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