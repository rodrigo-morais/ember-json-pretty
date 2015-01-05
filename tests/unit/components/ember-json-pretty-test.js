import Ember from "ember";
import {test, moduleForComponent} from "ember-qunit";

var _rgb2hex = function (rgb) {
    var isRGBA = false;

    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    isRGBA = rgb.indexOf('rgba') > -1;

    rgb = isRGBA
                ? rgb.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/)
                : rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2).toUpperCase();
    };

    if(isRGBA){
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]) + hex(rgb[4]);
    }
    else{
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
     }
};

moduleForComponent('ember-json-pretty');

test('verify if tag name is PRE', function(){
    var component = this.subject(),
        jsonObj;
    
    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    equal(this.$().context.tagName, 'PRE');
});

test('verify if exist content CODE element', function(){
    var component = this.subject(),
        jsonObj,
        firstElement;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                JSON.stringify(jsonObj)
            );
    });

    firstElement = Ember.$(this.$()[0]);
    
    equal(firstElement.context.firstElementChild.tagName, 'CODE');
});

test('verify if JSON was printed', function(){
    var component = this.subject(),
        jsonObj, code;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);

    equal(code.context.textContent.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ''), '{key1:"value1",key2:"value2"}');
});

test('verify if second element in JSON is brace', function(){
    var component = this.subject(),
        jsonObj,
        code, firstSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    firstSpan = Ember.$(code).find('span')[1];

    ok(Ember.$(firstSpan).hasClass('json-brace'));
});

test('verify if third element in JSON is a JSON key', function(){
    var component = this.subject(),
        jsonObj,
        code, keySpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    keySpan = Ember.$(code).find('span')[2];

    ok(Ember.$(keySpan).hasClass('json-key'));
});

test('verify if exist separator between JSON key and value', function(){
    var component = this.subject(),
        jsonObj,
        code, keySpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    keySpan = Ember.$(code).find('span')[2];    

    equal(Ember.$(Ember.$(keySpan))[0].nextSibling.textContent.trim(), ':');
});

test('verify if last element in JSON is brace', function(){
    var component = this.subject(),
        jsonObj,
        code, lastSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    lastSpan = Ember.$(code).find('span').last();

    ok(Ember.$(lastSpan).hasClass('json-brace'));
});

test('verify standard color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, keySpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    keySpan = Ember.$(code).find('.json-key');

    equal(_rgb2hex(Ember.$(keySpan).css('color')), '#A52A2A');
});

test('verify changed color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, keySpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'keyColor',
                    '#00FF7F'
                );
    });

    code = Ember.$(this.$()[0]);
    keySpan = Ember.$(code).find('.json-key');

    equal(_rgb2hex(Ember.$(keySpan).css('color')), '#00FF7F');
});

test('verify standard highlight color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, keySpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    keySpan = Ember.$(code).find('.json-key');

    equal(_rgb2hex(Ember.$(keySpan).css('background-color')), '#00000000');
});

test('verify changed highlight color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, keySpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'keyHighlight',
                    '#00FFFF'
                );
    });

    code = Ember.$(this.$()[0]);    
    keySpan = Ember.$(code).find('.json-key');

    equal(_rgb2hex(Ember.$(keySpan).css('background-color')), '#00FFFF');
});

test('verify standard color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, valueSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 1,
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    valueSpan = Ember.$(code).find('.json-value');

    equal(_rgb2hex(Ember.$(valueSpan).css('color')), '#000080');
});

test('verify changed color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, valueSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 1,
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'valueColor',
                    '#FF0000'
                );
    });

    code = Ember.$(this.$()[0]);
    valueSpan = Ember.$(code).find('.json-value');

    equal(_rgb2hex(Ember.$(valueSpan).css('color')), '#FF0000');
});

test('verify standard highlight color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, valueSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 1,
            'key2': 2
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    valueSpan = Ember.$(code).find('.json-value');

    equal(_rgb2hex(Ember.$(valueSpan).css('background-color')), '#00000000');
});

test('verify changed highlight color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, valueSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 1,
            'key2': 2
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'valueHighlight',
                    '#E0FFFF'
                );
    });

    code = Ember.$(this.$()[0]);    
    valueSpan = Ember.$(code).find('.json-value');

    equal(_rgb2hex(Ember.$(valueSpan).css('background-color')), '#E0FFFF');
});

test('verify standard color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, stringSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    stringSpan = Ember.$(code).find('.json-string');

    equal(_rgb2hex(Ember.$(stringSpan).css('color')), '#C0FF3E');
});

test('verify changed color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, stringSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'stringColor',
                    '#FF34B3'
                );
    });

    code = Ember.$(this.$()[0]);
    stringSpan = Ember.$(code).find('.json-string');

    equal(_rgb2hex(Ember.$(stringSpan).css('color')), '#FF34B3');
});

test('verify standard highlight color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, stringSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    stringSpan = Ember.$(code).find('.json-string');

    equal(_rgb2hex(Ember.$(stringSpan).css('background-color')), '#00000000');
});

test('verify changed highlight color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, stringSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'stringHighlight',
                    '#FFBBFF'
                );
    });

    code = Ember.$(this.$()[0]);    
    stringSpan = Ember.$(code).find('.json-string');

    equal(_rgb2hex(Ember.$(stringSpan).css('background-color')), '#FFBBFF');
});

test('verify standard color of brace node', function(){
    var component = this.subject(),
        jsonObj,
        code, braceSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    braceSpan = Ember.$(code).find('.json-brace');

    equal(_rgb2hex(Ember.$(braceSpan).css('color')), '#000000');
});

test('verify changed color of brace node', function(){
    var component = this.subject(),
        jsonObj,
        code, braceSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'braceColor',
                    '#FF34B3'
                );
    });

    code = Ember.$(this.$()[0]);
    braceSpan = Ember.$(code).find('.json-brace');

    equal(_rgb2hex(Ember.$(braceSpan).css('color')), '#FF34B3');
});

test('verify standard highlight color of brace node', function(){
    var component = this.subject(),
        jsonObj,
        code, braceSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    braceSpan = Ember.$(code).find('.json-brace');

    equal(_rgb2hex(Ember.$(braceSpan).css('background-color')), '#00000000');
});

test('verify changed highlight color of brace node', function(){
    var component = this.subject(),
        jsonObj,
        code, braceSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'braceHighlight',
                    '#FFBBFF'
                );
    });

    code = Ember.$(this.$()[0]);    
    braceSpan = Ember.$(code).find('.json-brace');

    equal(_rgb2hex(Ember.$(braceSpan).css('background-color')), '#FFBBFF');
});

test('verify standard color of bracket node', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': 'value1',
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    bracketSpan = Ember.$(code).find('.json-bracket');

    equal(_rgb2hex(Ember.$(bracketSpan).css('color')), '#000000');
});

test('verify changed color of bracket node', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': 'value1',
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'bracketColor',
                    '#FF34B3'
                );
    });

    code = Ember.$(this.$()[0]);
    bracketSpan = Ember.$(code).find('.json-bracket');

    equal(_rgb2hex(Ember.$(bracketSpan).css('color')), '#FF34B3');
});

test('verify standard highlight color of bracket node', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': 'value1',
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    bracketSpan = Ember.$(code).find('.json-bracket');

    equal(_rgb2hex(Ember.$(bracketSpan).css('background-color')), '#00000000');
});

test('verify changed highlight color of bracket node', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': 'value1',
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
        component
            .set(
                    'bracketHighlight',
                    '#FFBBFF'
                );
    });

    code = Ember.$(this.$()[0]);    
    bracketSpan = Ember.$(code).find('.json-bracket');

    equal(_rgb2hex(Ember.$(bracketSpan).css('background-color')), '#FFBBFF');
});