import Ember from 'ember';

var _replacer = function(match, pIndent, pKey, pVal, pEnd, keyColor) {
    var key = '<span class=json-key>';
    var val = '<span class=json-value>';
    var str = '<span class=json-string>';
    var brace = '<span class=json-brace>';
    var bracket = '<span class=json-bracket>';
    var r = pIndent || '';
    if (pKey){
        r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
    }
    if (pVal){
        r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
    }
    if(match.trim() === '{' || match.trim() === '}'){
        r = r + brace + match + '</span>';
        pEnd = '';
    }
    if(match.trim() === '[' || match.trim() === ']'){
        r = r + bracket + match + '</span>';
        pEnd = '';
    }
    return r + (pEnd || '');
};

var _replaceKeyStyle = function(jsonHTML, keyColor, keyHighlight){
    return jsonHTML
            .replace(   /<span class=json-key>/g,
                        '<span class=json-key style=" color:' + keyColor + '; background-color:' + keyHighlight + ';">'
                    );
};

var _replaceValueStyle = function(jsonHTML, valueColor, valueHighlight){
    return jsonHTML
            .replace(   /<span class=json-value>/g,
                        '<span class=json-value style=" color:' + valueColor + '; background-color:' + valueHighlight + ';">'
                    );
};

var _prettyPrint = function(obj, keyColor, keyHighlight, valueColor, valueHighlight) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?([,[}])?$/mg,
        jsonHTML = JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, _replacer);

        jsonHTML = _replaceKeyStyle(jsonHTML, keyColor, keyHighlight);
        jsonHTML = _replaceValueStyle(jsonHTML, valueColor, valueHighlight);

    return jsonHTML;
};

export default Ember.Component.extend({
    tagName: 'pre',
    keyColor: '#A52A2A',
    keyHighlight: '#FFFFFF00',
    valueColor: '#000080',
    valueHighlight: '#FFFFFF00',
    pretty: function () {
        var jsonObj = this.get('jsonObj'),
            keyColor = this.get('keyColor'),
            keyHighlight = this.get('keyHighlight'),
            valueColor = this.get('valueColor'),
            valueHighlight = this.get('valueHighlight'),
            json_pretty = _prettyPrint(jsonObj, keyColor, keyHighlight, valueColor, valueHighlight);
        
        return Ember.String.htmlSafe(json_pretty);
    }.property('jsonObj'),
});