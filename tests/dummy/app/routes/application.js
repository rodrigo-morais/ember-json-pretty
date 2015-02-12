import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return {    "menus": [
                        {
                            "name": "menu 1",
                            "events": ["click", "hover"],
                            "type": "list",
                            "object": {
                                "key": "value1",
                                "another": 1
                            },
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
                };
    }
});