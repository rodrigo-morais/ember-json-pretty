import Ember from "ember";
import {test, moduleForComponent} from "ember-qunit";

var _rgb2hex = function (rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2).toUpperCase();
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
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

test('verify if first element in JSON is brace', function(){
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
    firstSpan = Ember.$(code).find('span').first();

    ok(Ember.$(firstSpan).hasClass('json-brace'));
});

test('verify if second element in JSON is a JSON key', function(){
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
    keySpan = Ember.$(code).find('span')[1];

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
    keySpan = Ember.$(code).find('span')[1];    

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

test('verify standard color of key', function(){
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

test('verify change color of key', function(){
    var component = this.subject(),
        jsonObj,
        code, keySpan;
console.log('test1');
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
console.log('test2');
    code = Ember.$(this.$()[0]);
    
console.log('test3');
    keySpan = Ember.$(code).find('.json-key');
    equal(_rgb2hex(Ember.$(keySpan).css('color')), '#00FF7F');
});