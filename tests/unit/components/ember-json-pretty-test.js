import Ember from "ember";
import {test, moduleForComponent} from "ember-qunit";

var _rgb2hex = function (rgb) {
    var isRGBA = false;

    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    isRGBA = rgb.indexOf('rgba') > -1;

    rgb = isRGBA ? rgb.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/)
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

moduleForComponent('ember-json-pretty',
                    'component to print JSON with color and highlights and allow expand and retract arrays and objects',
    {
        needs: ['template:components/ember-line']
    }
);

test('verify if tag name is CODE', function(){
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

    equal(this.$().context.tagName, 'CODE');
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

    code = this.$();

    equal(code.context.textContent.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ''), '{key1:value1,key2:value2}');
});

test('verify if into first line the element that is presented is a brace', function(){
    var component = this.subject(),
        jsonObj,
        code, firstLine, brace;

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

    code = this.$();
    firstLine = Ember.$(code).find('div.jsonTreeView')[0];
    brace = Ember.$(firstLine).find('span')[0];

    ok(Ember.$(brace).hasClass('json-brace'));
});

test('verify if into second line there is a JSON key after the blank spaces', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, key;

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

    code = this.$();
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    key = Ember.$(secondLine).children()[0];

    while(Ember.$(key).hasClass('json-blank')){
        key = Ember.$(key).next();
    }

    ok(Ember.$(key).hasClass('json-key'));
});

test('verify if exist separator between JSON key and value', function(){
    var component = this.subject(),
        jsonObj,
        code, key, secondLine;

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

    code = this.$();
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    key = Ember.$(secondLine).children()[0];

    while(Ember.$(key).hasClass('json-blank')){
        key = Ember.$(key).next();
    }

    equal(Ember.$(Ember.$(key)).next().text().trim(), ':');
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
    lastSpan = Ember.$(Ember.$(code).find('div.jsonTreeView')[1]).children().last();

    ok(Ember.$(lastSpan).hasClass('json-brace'));
});

test('verify standard color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, key;

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
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    key = Ember.$(secondLine).children()[0];

    while(Ember.$(key).hasClass('json-blank')){
        key = Ember.$(key).next();
    }

    equal(_rgb2hex(Ember.$(key).css('color')), '#A52A2A');
});

test('verify changed color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, key;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                    'options',
                    {'keyColor':'#00FF7F'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    key = Ember.$(secondLine).children()[0];

    while(Ember.$(key).hasClass('json-blank')){
        key = Ember.$(key).next();
    }

    equal(_rgb2hex(Ember.$(key).css('color')), '#00FF7F');
});

test('verify standard highlight color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, key;

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
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    key = Ember.$(secondLine).children()[0];

    while(Ember.$(key).hasClass('json-blank')){
        key = Ember.$(key).next();
    }

    equal(_rgb2hex(Ember.$(key).css('background-color')), '#FFFFFF');
});

test('verify changed highlight color of key node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, key;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                    'options',
                    {'keyHighlight':'#00FFFF'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    key = Ember.$(secondLine).children()[0];

    while(Ember.$(key).hasClass('json-blank')){
        key = Ember.$(key).next();
    }

    equal(_rgb2hex(Ember.$(key).css('background-color')), '#00FFFF');
});

test('verify standard color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, valueSpan;

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
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    valueSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(valueSpan).hasClass('json-value') && valueSpan){
        valueSpan = Ember.$(valueSpan).next();
    }

    equal(_rgb2hex(Ember.$(valueSpan).css('color')), '#000080');
});

test('verify changed color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, valueSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 1,
            'key2': 'value2'
        };
        component
            .set(
                    'options',
                    {'valueColor':'#FF0000'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    valueSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(valueSpan).hasClass('json-value') && valueSpan){
        valueSpan = Ember.$(valueSpan).next();
    }

    equal(_rgb2hex(Ember.$(valueSpan).css('color')), '#FF0000');
});

test('verify standard highlight color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, valueSpan;

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
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    valueSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(valueSpan).hasClass('json-value') && valueSpan){
        valueSpan = Ember.$(valueSpan).next();
    }

    equal(_rgb2hex(Ember.$(valueSpan).css('background-color')), '#FFFFFF');
});

test('verify changed highlight color of value node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, valueSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 1,
            'key2': 2
        };
        component
            .set(
                    'options',
                    {'valueHighlight':'#E0FFFF'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);    
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[0];
    valueSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(valueSpan).hasClass('json-value') && valueSpan){
        valueSpan = Ember.$(valueSpan).next();
    }

    equal(_rgb2hex(Ember.$(valueSpan).css('background-color')), '#E0FFFF');
});

test('verify standard color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, stringSpan;

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
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[1];
    stringSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(stringSpan).hasClass('json-string') && stringSpan){
        stringSpan = Ember.$(stringSpan).next();
    }

    equal(_rgb2hex(Ember.$(stringSpan).css('color')), '#C0FF3E');
});

test('verify changed color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, stringSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                    'options',
                    {'stringColor':'#FF34B3'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[1];
    stringSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(stringSpan).hasClass('json-string') && stringSpan){
        stringSpan = Ember.$(stringSpan).next();
    }

    equal(_rgb2hex(Ember.$(stringSpan).css('color')), '#FF34B3');
});

test('verify standard highlight color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, stringSpan;

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
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[1];
    stringSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(stringSpan).hasClass('json-string') && stringSpan){
        stringSpan = Ember.$(stringSpan).next();
    }

    equal(_rgb2hex(Ember.$(stringSpan).css('background-color')), '#FFFFFF');
});

test('verify changed highlight color of string node', function(){
    var component = this.subject(),
        jsonObj,
        code, secondLine, stringSpan;

    Ember.run(function(){
        jsonObj = {
            'key1': 'value1',
            'key2': 'value2'
        };
        component
            .set(
                    'options',
                    {'stringHighlight':'#FFBBFF'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);    
    secondLine = Ember.$(
                        Ember.$(code).find('div.jsonTreeView')[0]
                    ).find('div.new-line')[1];
    stringSpan = Ember.$(secondLine).children()[0];

    while(!Ember.$(stringSpan).hasClass('json-string') && stringSpan){
        stringSpan = Ember.$(stringSpan).next();
    }

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
    braceSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

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
                    'options',
                    {'braceColor':'#FF34B3'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);
    braceSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

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
    braceSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

    equal(_rgb2hex(Ember.$(braceSpan).css('background-color')), '#FFFFFF');
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
                    'options',
                    {'braceHighlight':'#FFBBFF'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = Ember.$(this.$()[0]);    
    braceSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

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

    code = this.$();
    bracketSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

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
                    'options',
                    {'bracketColor':'#FF34B3'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();
    bracketSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

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

    code = this.$();
    bracketSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

    equal(_rgb2hex(Ember.$(bracketSpan).css('background-color')), '#FFFFFF');
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
                    'options',
                    {'bracketHighlight':'#FFBBFF'}
                );
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();    
    bracketSpan = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).find('span').first();

    equal(_rgb2hex(Ember.$(bracketSpan).css('background-color')), '#FFBBFF');
});

test('verify if exist a icone before the first bracket', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

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

    code = this.$();
    plusSignal = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).children().first();

    ok(Ember.$(plusSignal).is('i'));
});

test('verify if exist a icone with class to minus signal before the first bracket', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

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

    code = this.$();
    plusSignal = Ember.$(Ember.$(code)
                            .find('div.jsonTreeView')[0]
                        ).children().first();

    ok(Ember.$(plusSignal).hasClass('fa-minus-square-o'));
});

test('verify if exist a icone before each bracket', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': ['1','2','3'],
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();

    Ember.$.each(code.find('div.jsonTreeView').children(), function(index, element){
        if( Ember.$(element).hasClass('json-bracket') &&
            Ember.$(element).text().trim() === '['
        )
        {
            plusSignal = code.find('div.jsonTreeView').children()[index - 1];

            ok(Ember.$(plusSignal).is('i'));
        }
    });
});

test('verify if exist a icone with class to minus signal before each bracket', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': ['1','2','3'],
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();

    Ember.$.each(code.find('div.jsonTreeView').children(), function(index, element){
        if( Ember.$(element).hasClass('json-bracket') &&
            Ember.$(element).text().trim() === '['
        )
        {
            plusSignal = code.find('div.jsonTreeView').children()[index - 1];

            ok(Ember.$(plusSignal).hasClass('fa-minus-square-o'));
        }
    });
});

test('verify if exist a icone before each brace', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': {
                    'key3': 'value3',
                    'key4': 'value4'
                },
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();

    Ember.$.each(code.find('div.jsonTreeView').children(), function(index, element){
        if( Ember.$(element).hasClass('json-brace') &&
            Ember.$(element).text().trim() === '{'
        )
        {
            plusSignal = code.find('div.jsonTreeView').children()[index - 1];

            ok(Ember.$(plusSignal).is('i'));
        }
    });

    Ember.$.each(code.find('div.new-line').children(), function(index, element){
        if( Ember.$(element).hasClass('json-brace') &&
            Ember.$(element).text().trim() === '{'
        )
        {
            plusSignal = code.find('div.new-line').children()[index - 1];

            ok(Ember.$(plusSignal).is('i'));
        }
    });
});

test('verify if exist a icone with class to minus signal before each brace', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': {
                    'key3': 'value3',
                    'key4': 'value4'
                },
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();

    Ember.$.each(code.find('div.jsonTreeView').children(), function(index, element){
        if( Ember.$(element).hasClass('json-brace') &&
            Ember.$(element).text().trim() === '{'
        )
        {
            plusSignal = code.find('div.jsonTreeView').children()[index - 1];

            ok(Ember.$(plusSignal).hasClass('fa-plus-square-o'));
        }
    });

    Ember.$.each(code.find('div.new-line').children(), function(index, element){
        if( Ember.$(element).hasClass('json-brace') &&
            Ember.$(element).text().trim() === '{'
        )
        {
            plusSignal = code.find('div.new-line').children()[index - 1];

            ok(Ember.$(plusSignal).hasClass('fa-minus-square-o'));
        }
    });
});

test('verify if when icone is clicked the content within object is hidden', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': {
                    'key3': 'value3',
                    'key4': 'value4'
                },
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();

    Ember.$('#plus_0').trigger('click');

    Ember.$('[data-id="plus_0"]').each(function(index, element){
        equal(Ember.$(element).css('display'), 'none');
    });
});

test('verify if when icone is clicked the content within object is hidden when icone is clicked again the content within object is showed', function(){
    var component = this.subject(),
        jsonObj,
        code, bracketSpan, plusSignal;

    Ember.run(function(){
        jsonObj = [
            {
                'key1': 'value1',
                'key2': 'value2'
            },
            {
                'key1': {
                    'key3': 'value3',
                    'key4': 'value4'
                },
                'key2': 'value2'
            }
        ];
        component
            .set(
                'jsonObj',
                jsonObj
            );
    });

    code = this.$();

    Ember.$('#plus_0').trigger('click');

    Ember.$('[data-id="plus_0"]').each(function(index, element){
        equal(Ember.$(element).css('display'), 'none');
    });

    Ember.$('#plus_0').trigger('click');

    Ember.$('[data-id="plus_0"]').each(function(index, element){
        equal(Ember.$(element).css('display'), 'block');
    });
});