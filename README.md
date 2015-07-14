# Ember-json-pretty

This component should be use to print the JSON object or JSON text in pretty way. With this component is possible to change the color in each type of element within of JSON object and expand and retract objects and arrays.

[![Build Status](https://travis-ci.org/rodrigo-morais/ember-json-pretty.svg?branch=master)](https://travis-ci.org/rodrigo-morais/ember-json-pretty)

## Installation

To install witn NPM:

```sh
$ npm install ember-json-pretty --save-dev
$ ember generate ember-json-pretty
```

To install witn ember-cli:

```sh
$ ember install:addon ember-json-pretty
```

## Example

To use this component is need call it in a template to passing a JSON object that should exist in a route, controller or another stuff of project where component was installed.

```sh
------- route -------
Ember.Route.extend({
    model: function () {
        return {"key1":"value1", "key2":"value2"};
    }
});

------ template ------
{{ ember-json-pretty jsonObj=this.model }}


------ template with options ------
{{ ember-json-pretty
    jsonObj=this.model
    options='{
        "keyColor":"#00FF7F",
        "keyHighlight":"#FAFAD2",
        "valueColor":"#FF0000",
        "valueHighlight":"#FFE4E1",
        "stringColor":"#551A8B",
        "stringHighlight":"#FFD39B",
        "braceColor":"#8B864E",
        "braceHighlight":"#FFD39B",
        "bracketColor":"#FFB90F",
        "bracketHighlight":"#90EE90"
    }'
}}
```

Is possible inform some options to change the style of component.

- `keyColor` - change the color of a key in JSON object printed. The standard color is #A52A2A.
- `keyHighlight` - change the highlight color of a key in JSON object printed. The standard color is #FFFFFF.
- `valueColor` - change the color of a value in JSON object printed. The standard color is #000080.
- `valueHighlight` - change the highlight color of a value in JSON object printed. The standard color is #FFFFFF.
- `stringColor` - change the color of a string value in JSON object printed. The standard color is #C0FF3E.
- `stringHighlight` - change the highlight color of a string value in JSON object printed. The standard color is #FFFFFF.
- `braceColor` - change the color of a brace in JSON object printed. The standard color is #000000.
- `braceHighlight` - change the highlight color of a brace in JSON object printed. The standard color is #FFFFFF.
- `bracketColor` - change the color of a bracket in JSON object printed. The standard color is #000000.
- `bracketHighlight` - change the highlight color of a bracket in JSON object printed. The standard color is #FFFFFF.
