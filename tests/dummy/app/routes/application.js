import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return {    "menus": {
                        "key1": "value1",
                        "key2": "value2"
                    }
                };
                    /*[
                        {
                            "name": "menu 1",
                            "events": ["click", "hover"],
                            "type": "list",
                            "submenus": [
                                {
                                    "name": "submenu 1",
                                    "events": ["click"],
                                    "type": "text",
                                    "submenus": null
                                },
                                {
                                    "name": "submenu 2",
                                    "events": ["click", "check"],
                                    "type": "checkbox",
                                    "submenus": null
                                }
                            ],
                            "total_submenus": 2
                        },
                        {
                            "name": "menu 2",
                            "events": ["click", "hover"],
                            "type": "list",
                            "submenus": [
                                {
                                    "name": "submenu 1",
                                    "events": ["click"],
                                    "type": "text",
                                    "submenus": null
                                },
                                {
                                    "name": "submenu 2",
                                    "events": ["click"],
                                    "type": "text",
                                    "submenus": null
                                }
                            ],
                            "total_submenus": 2
                        }
                    ]
                };*/
    }
});