/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-json-pretty',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-json-pretty/styles/styles.css');
  }
};
