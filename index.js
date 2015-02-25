/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-json-pretty',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-json-pretty/styles/styles.css');
    app.import(app.bowerDirectory + '/components-font-awesome/css/font-awesome.min.css');
    app.import(app.bowerDirectory + '/components-font-awesome/fonts/FontAwesome.otf', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/components-font-awesome/fonts/fontawesome-webfont.eot', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/components-font-awesome/fonts/fontawesome-webfont.svg', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/components-font-awesome/fonts/fontawesome-webfont.ttf', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/components-font-awesome/fonts/fontawesome-webfont.woff', { destDir: 'fonts' });
  }
};
