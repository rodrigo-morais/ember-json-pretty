module.exports = {
  description: '',
     
  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('components-font-awesome');
  }
};
