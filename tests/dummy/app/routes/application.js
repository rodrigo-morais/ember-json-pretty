import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return { "menus": 
                    {
                        "services": 
                            [
                                { "name": "Service 1"}
                            ]
                    }
                };
    }
});