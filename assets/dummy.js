/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/components/ember-json-pretty', ['exports', 'ember', 'ember-json-pretty/components/ember-json-pretty'], function (exports, Ember, EmberJsonPrettyComponent) {

	'use strict';

	exports['default'] = EmberJsonPrettyComponent['default'];

});
define('dummy/controllers/application', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var ApplicationController = Ember['default'].ObjectController.extend({
        jsonString: (function () {
            var jsonObject = this.get("model.menus");
            return JSON.stringify(jsonObject);
        }).property("jsonString"),
        refreshJson: (function () {
            var jsonObject = JSON.parse(this.jsonString);
            this.set("model.menus", jsonObject);

            console.log("teste");
        }).observes("jsonString")
    });

    exports['default'] = ApplicationController;

});
define('dummy/ember-json-pretty/tests/modules/ember-json-pretty/components/ember-json-pretty.jshint', function () {

  'use strict';

  module("JSHint - modules/ember-json-pretty/components");
  test("modules/ember-json-pretty/components/ember-json-pretty.js should pass jshint", function () {
    ok(true, "modules/ember-json-pretty/components/ember-json-pretty.js should pass jshint.");
  });

});
define('dummy/helpers/fa-icon', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var FA_PREFIX = /^fa\-.+/;

  var warn = Ember['default'].Logger.warn;

  /**
   * Handlebars helper for generating HTML that renders a FontAwesome icon.
   *
   * @param  {String} name    The icon name. Note that the `fa-` prefix is optional.
   *                          For example, you can pass in either `fa-camera` or just `camera`.
   * @param  {Object} options Options passed to helper.
   * @return {Ember.Handlebars.SafeString} The HTML markup.
   */
  var faIcon = function faIcon(name, options) {
    if (Ember['default'].typeOf(name) !== "string") {
      var message = "fa-icon: no icon specified";
      warn(message);
      return Ember['default'].String.htmlSafe(message);
    }

    var params = options.hash,
        classNames = [],
        html = "";

    classNames.push("fa");
    if (!name.match(FA_PREFIX)) {
      name = "fa-" + name;
    }
    classNames.push(name);
    if (params.spin) {
      classNames.push("fa-spin");
    }
    if (params.flip) {
      classNames.push("fa-flip-" + params.flip);
    }
    if (params.rotate) {
      classNames.push("fa-rotate-" + params.rotate);
    }
    if (params.lg) {
      warn("fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"lg\"}}");
      classNames.push("fa-lg");
    }
    if (params.x) {
      warn("fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"" + params.x + "\"}}");
      classNames.push("fa-" + params.x + "x");
    }
    if (params.size) {
      if (Ember['default'].typeOf(params.size) === "string" && params.size.match(/\d+/)) {
        params.size = Number(params.size);
      }
      if (Ember['default'].typeOf(params.size) === "number") {
        classNames.push("fa-" + params.size + "x");
      } else {
        classNames.push("fa-" + params.size);
      }
    }
    if (params.fixedWidth) {
      classNames.push("fa-fw");
    }
    if (params.listItem) {
      classNames.push("fa-li");
    }
    if (params.pull) {
      classNames.push("pull-" + params.pull);
    }
    if (params.border) {
      classNames.push("fa-border");
    }
    if (params.classNames && !Ember['default'].isArray(params.classNames)) {
      params.classNames = [params.classNames];
    }
    if (!Ember['default'].isEmpty(params.classNames)) {
      Array.prototype.push.apply(classNames, params.classNames);
    }

    html += "<";
    var tagName = params.tagName || "i";
    html += tagName;
    html += " class='" + classNames.join(" ") + "'";
    if (params.title) {
      html += " title='" + params.title + "'";
    }
    if (params.ariaHidden === undefined || params.ariaHidden) {
      html += " aria-hidden=\"true\"";
    }
    html += "></" + tagName + ">";
    return Ember['default'].String.htmlSafe(html);
  };

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(faIcon);

  exports.faIcon = faIcon;

});
define('dummy/initializers/app-version', ['exports', 'dummy/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function initialize(container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;

});
define('dummy/routes/application', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            return { menus: [{
                    name: "menu 1",
                    events: ["click", "hover"],
                    type: "list",
                    object: {
                        key: "value1",
                        another: 1
                    },
                    submenus: [{
                        name: "submenu 1",
                        events: ["click"],
                        type: "text",
                        submenus: null
                    }, {
                        name: "submenu 2",
                        events: ["click", "check"],
                        type: "checkbox",
                        submenus: null
                    }],
                    total_submenus: 2
                }, {
                    name: "menu 2",
                    events: ["click", "hover"],
                    type: "list",
                    submenus: [{
                        name: "submenu 1",
                        events: ["click"],
                        type: "text",
                        submenus: null
                    }, {
                        name: "submenu 2",
                        events: ["click"],
                        type: "text",
                        submenus: null
                    }],
                    total_submenus: 2
                }]
            };
        }
    });

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("Welcome to Ember.js");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Standard styles");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Change styles");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[9]); }
        var morph0 = dom.createMorphAt(fragment,1,2,contextualElement);
        var morph1 = dom.createMorphAt(fragment,2,3,contextualElement);
        var morph2 = dom.createMorphAt(fragment,5,6,contextualElement);
        var morph3 = dom.createMorphAt(fragment,8,9,contextualElement);
        inline(env, morph0, context, "textarea", [], {"value": get(env, context, "jsonString"), "cols": "100", "rows": "10"});
        content(env, morph1, context, "outlet");
        inline(env, morph2, context, "ember-json-pretty", [], {"jsonObj": get(env, context, "this.model.menus")});
        inline(env, morph3, context, "ember-json-pretty", [], {"jsonObj": get(env, context, "this.model.menus"), "options": "{\n        \"keyColor\":\"#00FF7F\",\n        \"keyHighlight\":\"#FAFAD2\",\n        \"valueColor\":\"#FF0000\",\n        \"valueHighlight\":\"#FFE4E1\",\n        \"stringColor\":\"#551A8B\",\n        \"stringHighlight\":\"#FFD39B\",\n        \"braceColor\":\"#8B864E\",\n        \"braceHighlight\":\"#FFD39B\",\n        \"bracketColor\":\"#FFB90F\",\n        \"bracketHighlight\":\"#90EE90\"}"});
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/components/ember-json-pretty', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","jsonTreeView");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, element = hooks.element, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(element0,0,1);
          element(env, element0, context, "bind-attr", [], {"id": get(env, context, "id")});
          inline(env, morph0, context, "partial", ["components/ember-line"], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0,1]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        block(env, morph0, context, "each", [get(env, context, "pretty")], {"keyword": "line"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/components/ember-line', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.setAttribute(el1,"class","fa fa-minus-square-o plus-icon");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, element = hooks.element;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element3 = dom.childAt(fragment, [1]);
            element(env, element3, context, "bind-attr", [], {"id": get(env, context, "element.plusId")});
            element(env, element3, context, "action", ["toggleExpand", get(env, context, "element.plusId")], {});
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            var el2 = dom.createTextNode("\n              \n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, element = hooks.element;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element2 = dom.childAt(fragment, [1]);
            element(env, element2, context, "bind-attr", [], {"class": "element.class"});
            return fragment;
          }
        };
      }());
      var child2 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, element = hooks.element, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element1 = dom.childAt(fragment, [1]);
            var morph0 = dom.createMorphAt(element1,0,1);
            element(env, element1, context, "bind-attr", [], {"class": "element.class", "style": "element.style"});
            content(env, morph0, context, "element.element");
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          if (this.cachedFragment) { dom.repairClonedNode(fragment,[0,1,2,3]); }
          var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
          var morph1 = dom.createMorphAt(fragment,1,2,contextualElement);
          var morph2 = dom.createMorphAt(fragment,2,3,contextualElement);
          block(env, morph0, context, "if", [get(env, context, "element.hasPlus")], {}, child0, null);
          block(env, morph1, context, "if", [get(env, context, "element.isBlank")], {}, child1, null);
          block(env, morph2, context, "unless", [get(env, context, "element.isBlank")], {}, child2, null);
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","new-line");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, element = hooks.element, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(element0,0,1);
          element(env, element0, context, "bind-attr", [], {"data-id": get(env, context, "line.plusId")});
          inline(env, morph0, context, "partial", ["components/ember-line"], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0,1,2]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        var morph1 = dom.createMorphAt(fragment,1,2,contextualElement);
        block(env, morph0, context, "each", [get(env, context, "line.elements")], {"keyword": "element"}, child0, null);
        block(env, morph1, context, "each", [get(env, context, "line.lines")], {"keyword": "line"}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/resolver', ['exports', 'ember/resolver', 'dummy/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('dummy/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/router', 'dummy/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var App;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      App = Application['default'].create(attributes);
      App.setupForTesting();
      App.injectTestHelpers();
    });

    return App;
  }

});
define('dummy/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('dummy/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

	document.write("<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>");

	QUnit.config.urlConfig.push({ id: "nocontainer", label: "Hide container" });
	var containerVisibility = QUnit.urlParams.nocontainer ? "hidden" : "visible";
	document.getElementById("ember-testing-container").style.visibility = containerVisibility;

});
define('dummy/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/ember-json-pretty-test', ['ember', 'ember-qunit'], function (Ember, ember_qunit) {

    'use strict';

    var _rgb2hex = function _rgb2hex(rgb) {
        var isRGBA = false;

        if (/^#[0-9A-F]{6}$/i.test(rgb)) {
            return rgb;
        }isRGBA = rgb.indexOf("rgba") > -1;

        rgb = isRGBA ? rgb.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/) : rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2).toUpperCase();
        };

        if (isRGBA) {
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]) + hex(rgb[4]);
        } else {
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
    };

    ember_qunit.moduleForComponent("ember-json-pretty", "component to print JSON with color and highlights and allow expand and retract arrays and objects", {
        needs: ["template:components/ember-line"]
    });

    ember_qunit.test("verify if tag name is CODE", function () {
        var component = this.subject(),
            jsonObj;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        equal(this.$().context.tagName, "CODE");
    });

    ember_qunit.test("verify if JSON was printed", function () {
        var component = this.subject(),
            jsonObj,
            code;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = this.$();

        equal(code.context.textContent.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ""), "{key1:value1,key2:value2}");
    });

    ember_qunit.test("verify if into first line the element that is presented is a brace", function () {
        var component = this.subject(),
            jsonObj,
            code,
            firstLine,
            brace;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        firstLine = Ember['default'].$(code).find("div.jsonTreeView")[0];
        brace = Ember['default'].$(firstLine).find("span")[0];

        ok(Ember['default'].$(brace).hasClass("json-brace"));
    });

    ember_qunit.test("verify if into second line there is a JSON key after the blank spaces", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            key;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        key = Ember['default'].$(secondLine).children()[0];

        while (Ember['default'].$(key).hasClass("json-blank")) {
            key = Ember['default'].$(key).next();
        }

        ok(Ember['default'].$(key).hasClass("json-key"));
    });

    ember_qunit.test("verify if exist separator between JSON key and value", function () {
        var component = this.subject(),
            jsonObj,
            code,
            key,
            secondLine;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        key = Ember['default'].$(secondLine).children()[0];

        while (Ember['default'].$(key).hasClass("json-blank")) {
            key = Ember['default'].$(key).next();
        }

        equal(Ember['default'].$(Ember['default'].$(key)).next().text().trim(), ":");
    });

    ember_qunit.test("verify if last element in JSON is brace", function () {
        var component = this.subject(),
            jsonObj,
            code,
            lastSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        lastSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[1]).children().last();

        ok(Ember['default'].$(lastSpan).hasClass("json-brace"));
    });

    ember_qunit.test("verify standard color of key node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            key;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        key = Ember['default'].$(secondLine).children()[0];

        while (Ember['default'].$(key).hasClass("json-blank")) {
            key = Ember['default'].$(key).next();
        }

        equal(_rgb2hex(Ember['default'].$(key).css("color")), "#A52A2A");
    });

    ember_qunit.test("verify changed color of key node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            key;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("options", { keyColor: "#00FF7F" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        key = Ember['default'].$(secondLine).children()[0];

        while (Ember['default'].$(key).hasClass("json-blank")) {
            key = Ember['default'].$(key).next();
        }

        equal(_rgb2hex(Ember['default'].$(key).css("color")), "#00FF7F");
    });

    ember_qunit.test("verify standard highlight color of key node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            key;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        key = Ember['default'].$(secondLine).children()[0];

        while (Ember['default'].$(key).hasClass("json-blank")) {
            key = Ember['default'].$(key).next();
        }

        equal(_rgb2hex(Ember['default'].$(key).css("background-color")), "#FFFFFF");
    });

    ember_qunit.test("verify changed highlight color of key node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            key;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("options", { keyHighlight: "#00FFFF" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        key = Ember['default'].$(secondLine).children()[0];

        while (Ember['default'].$(key).hasClass("json-blank")) {
            key = Ember['default'].$(key).next();
        }

        equal(_rgb2hex(Ember['default'].$(key).css("background-color")), "#00FFFF");
    });

    ember_qunit.test("verify standard color of value node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            valueSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: 1,
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        valueSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(valueSpan).hasClass("json-value") && valueSpan) {
            valueSpan = Ember['default'].$(valueSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(valueSpan).css("color")), "#000080");
    });

    ember_qunit.test("verify changed color of value node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            valueSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: 1,
                key2: "value2"
            };
            component.set("options", { valueColor: "#FF0000" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        valueSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(valueSpan).hasClass("json-value") && valueSpan) {
            valueSpan = Ember['default'].$(valueSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(valueSpan).css("color")), "#FF0000");
    });

    ember_qunit.test("verify standard highlight color of value node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            valueSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: 1,
                key2: 2
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        valueSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(valueSpan).hasClass("json-value") && valueSpan) {
            valueSpan = Ember['default'].$(valueSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(valueSpan).css("background-color")), "#FFFFFF");
    });

    ember_qunit.test("verify changed highlight color of value node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            valueSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: 1,
                key2: 2
            };
            component.set("options", { valueHighlight: "#E0FFFF" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        valueSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(valueSpan).hasClass("json-value") && valueSpan) {
            valueSpan = Ember['default'].$(valueSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(valueSpan).css("background-color")), "#E0FFFF");
    });

    ember_qunit.test("verify standard color of string node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            stringSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[1];
        stringSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(stringSpan).hasClass("json-string") && stringSpan) {
            stringSpan = Ember['default'].$(stringSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(stringSpan).css("color")), "#C0FF3E");
    });

    ember_qunit.test("verify changed color of string node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            stringSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("options", { stringColor: "#FF34B3" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[1];
        stringSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(stringSpan).hasClass("json-string") && stringSpan) {
            stringSpan = Ember['default'].$(stringSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(stringSpan).css("color")), "#FF34B3");
    });

    ember_qunit.test("verify standard highlight color of string node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            stringSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[1];
        stringSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(stringSpan).hasClass("json-string") && stringSpan) {
            stringSpan = Ember['default'].$(stringSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(stringSpan).css("background-color")), "#FFFFFF");
    });

    ember_qunit.test("verify changed highlight color of string node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            stringSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("options", { stringHighlight: "#FFBBFF" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[1];
        stringSpan = Ember['default'].$(secondLine).children()[0];

        while (!Ember['default'].$(stringSpan).hasClass("json-string") && stringSpan) {
            stringSpan = Ember['default'].$(stringSpan).next();
        }

        equal(_rgb2hex(Ember['default'].$(stringSpan).css("background-color")), "#FFBBFF");
    });

    ember_qunit.test("verify standard color of brace node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            braceSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        braceSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(braceSpan).css("color")), "#000000");
    });

    ember_qunit.test("verify changed color of brace node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            braceSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("options", { braceColor: "#FF34B3" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        braceSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(braceSpan).css("color")), "#FF34B3");
    });

    ember_qunit.test("verify standard highlight color of brace node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            braceSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        braceSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(braceSpan).css("background-color")), "#FFFFFF");
    });

    ember_qunit.test("verify changed highlight color of brace node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            braceSpan;

        Ember['default'].run(function () {
            jsonObj = {
                key1: "value1",
                key2: "value2"
            };
            component.set("options", { braceHighlight: "#FFBBFF" });
            component.set("jsonObj", jsonObj);
        });

        code = Ember['default'].$(this.$()[0]);
        braceSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(braceSpan).css("background-color")), "#FFBBFF");
    });

    ember_qunit.test("verify standard color of bracket node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: "value1",
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        bracketSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(bracketSpan).css("color")), "#000000");
    });

    ember_qunit.test("verify changed color of bracket node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: "value1",
                key2: "value2"
            }];
            component.set("options", { bracketColor: "#FF34B3" });
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        bracketSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(bracketSpan).css("color")), "#FF34B3");
    });

    ember_qunit.test("verify standard highlight color of bracket node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: "value1",
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        bracketSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(bracketSpan).css("background-color")), "#FFFFFF");
    });

    ember_qunit.test("verify changed highlight color of bracket node", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: "value1",
                key2: "value2"
            }];
            component.set("options", { bracketHighlight: "#FFBBFF" });
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        bracketSpan = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("span").first();

        equal(_rgb2hex(Ember['default'].$(bracketSpan).css("background-color")), "#FFBBFF");
    });

    ember_qunit.test("verify if exist a icone before the first bracket", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan,
            plusSignal;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: "value1",
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        plusSignal = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).children().first();

        ok(Ember['default'].$(plusSignal).is("i"));
    });

    ember_qunit.test("verify if exist a icone with class to minus signal before the first bracket", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan,
            plusSignal;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: "value1",
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        plusSignal = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).children().first();

        ok(Ember['default'].$(plusSignal).hasClass("fa-minus-square-o"));
    });

    ember_qunit.test("verify if exist a icone before each bracket", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan,
            plusSignal;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: ["1", "2", "3"],
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();

        Ember['default'].$.each(code.find("div.jsonTreeView").children(), function (index, element) {
            if (Ember['default'].$(element).hasClass("json-bracket") && Ember['default'].$(element).text().trim() === "[") {
                plusSignal = code.find("div.jsonTreeView").children()[index - 1];

                ok(Ember['default'].$(plusSignal).is("i"));
            }
        });
    });

    ember_qunit.test("verify if exist a icone with class to minus signal before each bracket", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan,
            plusSignal;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: ["1", "2", "3"],
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();

        Ember['default'].$.each(code.find("div.jsonTreeView").children(), function (index, element) {
            if (Ember['default'].$(element).hasClass("json-bracket") && Ember['default'].$(element).text().trim() === "[") {
                plusSignal = code.find("div.jsonTreeView").children()[index - 1];

                ok(Ember['default'].$(plusSignal).hasClass("fa-minus-square-o"));
            }
        });
    });

    ember_qunit.test("verify if exist a icone before each brace", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan,
            plusSignal;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: {
                    key3: "value3",
                    key4: "value4"
                },
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();

        Ember['default'].$.each(code.find("div.jsonTreeView").children(), function (index, element) {
            if (Ember['default'].$(element).hasClass("json-brace") && Ember['default'].$(element).text().trim() === "{") {
                plusSignal = code.find("div.jsonTreeView").children()[index - 1];

                ok(Ember['default'].$(plusSignal).is("i"));
            }
        });

        Ember['default'].$.each(code.find("div.new-line").children(), function (index, element) {
            if (Ember['default'].$(element).hasClass("json-brace") && Ember['default'].$(element).text().trim() === "{") {
                plusSignal = code.find("div.new-line").children()[index - 1];

                ok(Ember['default'].$(plusSignal).is("i"));
            }
        });
    });

    ember_qunit.test("verify if exist a icone with class to minus signal before each brace", function () {
        var component = this.subject(),
            jsonObj,
            code,
            bracketSpan,
            plusSignal;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: {
                    key3: "value3",
                    key4: "value4"
                },
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();

        Ember['default'].$.each(code.find("div.jsonTreeView").children(), function (index, element) {
            if (Ember['default'].$(element).hasClass("json-brace") && Ember['default'].$(element).text().trim() === "{") {
                plusSignal = code.find("div.jsonTreeView").children()[index - 1];

                ok(Ember['default'].$(plusSignal).hasClass("fa-plus-square-o"));
            }
        });

        Ember['default'].$.each(code.find("div.new-line").children(), function (index, element) {
            if (Ember['default'].$(element).hasClass("json-brace") && Ember['default'].$(element).text().trim() === "{") {
                plusSignal = code.find("div.new-line").children()[index - 1];

                ok(Ember['default'].$(plusSignal).hasClass("fa-minus-square-o"));
            }
        });
    });

    ember_qunit.test("verify if when icone is clicked the content within object is hidden", function () {
        var component = this.subject(),
            jsonObj,
            code,
            id;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: {
                    key3: "value3",
                    key4: "value4"
                },
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        id = Ember['default'].$(code).find("i").prop("id");

        Ember['default'].$("#" + id).trigger("click");

        Ember['default'].$("[data-id=\"" + id + "\"]").each(function (index, element) {
            equal(Ember['default'].$(element).css("display"), "none");
        });
    });

    ember_qunit.test("verify if when icone is clicked the content within object is hidden when icone is clicked again the content within object is showed", function () {
        var component = this.subject(),
            jsonObj,
            code,
            id;

        Ember['default'].run(function () {
            jsonObj = [{
                key1: "value1",
                key2: "value2"
            }, {
                key1: {
                    key3: "value3",
                    key4: "value4"
                },
                key2: "value2"
            }];
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        id = Ember['default'].$(code).find("i").prop("id");

        Ember['default'].$("#" + id).trigger("click");

        Ember['default'].$("[data-id=\"" + id + "\"]").each(function (index, element) {
            equal(Ember['default'].$(element).css("display"), "none");
        });

        Ember['default'].$("#" + id).trigger("click");

        Ember['default'].$("[data-id=\"" + id + "\"]").each(function (index, element) {
            equal(Ember['default'].$(element).css("display"), "block");
        });
    });

    ember_qunit.test("verify when JSON object informed is a text if into first line the element that is presented is a brace", function () {
        var component = this.subject(),
            jsonObj,
            code,
            firstLine,
            brace;

        Ember['default'].run(function () {
            jsonObj = "{\"name\": \"menu 1\",\"events\": [\"click\", \"hover\"]}";
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        firstLine = Ember['default'].$(code).find("div.jsonTreeView")[0];
        brace = Ember['default'].$(firstLine).find("span")[0];

        ok(Ember['default'].$(brace).hasClass("json-brace"));
    });

    ember_qunit.test("verify when JSON object informed is a text if into second line there is a JSON key after the blank spaces", function () {
        var component = this.subject(),
            jsonObj,
            code,
            secondLine,
            key;

        Ember['default'].run(function () {
            jsonObj = "{\"name\": \"menu 1\",\"events\": [\"click\", \"hover\"]}";
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        secondLine = Ember['default'].$(Ember['default'].$(code).find("div.jsonTreeView")[0]).find("div.new-line")[0];
        key = Ember['default'].$(secondLine).children()[0];

        while (Ember['default'].$(key).hasClass("json-blank")) {
            key = Ember['default'].$(key).next();
        }

        ok(Ember['default'].$(key).hasClass("json-key"));
        equal(Ember['default'].$(key).text().trim(), "name");
    });

    ember_qunit.test("verify when JSON object informed is a text if there are two keys in JSON object", function () {
        var component = this.subject(),
            jsonObj,
            code,
            keys;

        Ember['default'].run(function () {
            jsonObj = "{\"name\": \"menu 1\",\"events\": [\"click\", \"hover\"]}";
            component.set("jsonObj", jsonObj);
        });

        code = this.$();
        keys = Ember['default'].$(code).find(".json-key");

        equal(keys.length, 2);
    });

});
define('dummy/tests/unit/components/ember-json-pretty-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/ember-json-pretty-test.js should pass jshint', function() { 
    ok(true, 'unit/components/ember-json-pretty-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({"name":"ember-json-pretty","version":"0.1.1.0abb5b9b"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map