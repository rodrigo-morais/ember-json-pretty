module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;

    return this.addBowerPackageToProject('ember-json-pretty').then(function() {
        return that.addBowerPackageToProject('components-font-awesome');
    });
  }
};