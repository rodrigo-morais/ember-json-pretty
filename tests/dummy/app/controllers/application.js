import Ember from 'ember';

var ApplicationController = Ember.ObjectController.extend({
    jsonString: function(){
        var jsonObject = this.get('model.menus');
        return JSON.stringify(jsonObject);
    }.property('jsonString'),
    refreshJson: function(){
        var jsonObject = JSON.parse(this.jsonString);
        this.set('model.menus', jsonObject);

        console.log('teste');
    }.observes('jsonString')
});

export default ApplicationController;