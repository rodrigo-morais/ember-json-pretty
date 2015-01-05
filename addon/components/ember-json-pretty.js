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

var _prettyPrint = function(obj, keyColor, keyHighlight) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?([,[}])?$/mg,
        jsonHTML = JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, _replacer);

        jsonHTML = _replaceKeyStyle(jsonHTML, keyColor, keyHighlight);

    return jsonHTML;
};

export default Ember.Component.extend({
    tagName: 'pre',
    keyColor: '#A52A2A',
    keyHighlight: '#FFFFFF00',
    pretty: function () {
        var jsonObj = this.get('jsonObj'),
            keyColor = this.get('keyColor'),
            keyHighlight = this.get('keyHighlight'),
            json_pretty = _prettyPrint(jsonObj, keyColor, keyHighlight);
        
        return Ember.String.htmlSafe(json_pretty);
    }.property('jsonObj'),
});