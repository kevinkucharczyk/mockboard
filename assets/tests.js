define('mockboard/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('mockboard/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('mockboard/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('mockboard/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'mockboard/tests/helpers/start-app', 'mockboard/tests/helpers/destroy-app'], function (exports, _qunit, _mockboardTestsHelpersStartApp, _mockboardTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _mockboardTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _mockboardTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('mockboard/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('mockboard/tests/helpers/resolver', ['exports', 'mockboard/resolver', 'mockboard/config/environment'], function (exports, _mockboardResolver, _mockboardConfigEnvironment) {

  var resolver = _mockboardResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _mockboardConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mockboardConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('mockboard/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('mockboard/tests/helpers/start-app', ['exports', 'ember', 'mockboard/app', 'mockboard/config/environment'], function (exports, _ember, _mockboardApp, _mockboardConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _mockboardConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _mockboardApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('mockboard/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('mockboard/tests/integration/pods/components/gauge-widget/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('gauge-widget', 'Integration | Component | gauge widget', {
    integration: true
  });

  (0, _emberQunit.test)('shows title', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 35
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'gauge-widget', [], ['title', 'Test Gauge'], ['loc', [null, [1, 0], [1, 35]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.widget__title').text().trim(), 'Test Gauge');
  });
});
define('mockboard/tests/integration/pods/components/gauge-widget/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/gauge-widget/component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/gauge-widget/component-test.js should pass jshint.');
  });
});
define('mockboard/tests/integration/pods/components/number-widget/component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('number-widget', 'Integration | Component | number widget', {
    integration: true
  });

  (0, _emberQunit.test)('shows title and value', function (assert) {
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 45
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'number-widget', [], ['title', 'Test Title', 'value', 10], ['loc', [null, [1, 0], [1, 45]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.widget__title').text().trim(), 'Test Title');

    assert.equal(this.$('.widget__value').text().trim(), '10');
  });
});
define('mockboard/tests/integration/pods/components/number-widget/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/pods/components/number-widget/component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/number-widget/component-test.js should pass jshint.');
  });
});
define('mockboard/tests/pods/application/view.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/application/view.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/application/view.js should pass jshint.');
  });
});
define('mockboard/tests/pods/dashboard/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dashboard/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dashboard/controller.js should pass jshint.');
  });
});
define('mockboard/tests/pods/dashboard/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dashboard/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dashboard/route.js should pass jshint.');
  });
});
define('mockboard/tests/pods/error/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/error/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/error/controller.js should pass jshint.');
  });
});
define('mockboard/tests/pods/index/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/index/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/index/controller.js should pass jshint.');
  });
});
define('mockboard/tests/pods/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/index/route.js should pass jshint.');
  });
});
define('mockboard/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('mockboard/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('mockboard/tests/test-helper', ['exports', 'mockboard/tests/helpers/resolver', 'ember-qunit'], function (exports, _mockboardTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_mockboardTestsHelpersResolver['default']);
});
define('mockboard/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('mockboard/tests/unit/pods/application/view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('view:application', 'Unit | View | application');

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var view = this.subject();
    assert.ok(view);
  });
});
define('mockboard/tests/unit/pods/application/view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/application/view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/application/view-test.js should pass jshint.');
  });
});
define("mockboard/tests/unit/pods/dashboard/controller-test", ["exports"], function (exports) {});
// import { moduleFor, test } from 'ember-qunit';

// moduleFor('controller:dashboard', 'Unit | Controller | dashboard', {
//   // Specify the other units that are required for this test.
//   // needs: ['controller:foo']
// });

// // Replace this with your real tests.
// test('it exists', function(assert) {
//   let controller = this.subject();
//   assert.ok(controller);
// });
define('mockboard/tests/unit/pods/dashboard/controller-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dashboard/controller-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dashboard/controller-test.js should pass jshint.');
  });
});
define('mockboard/tests/unit/pods/dashboard/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dashboard', 'Unit | Route | dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mockboard/tests/unit/pods/dashboard/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/dashboard/route-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dashboard/route-test.js should pass jshint.');
  });
});
define('mockboard/tests/unit/pods/error/controller-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:error', 'Unit | Controller | error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('mockboard/tests/unit/pods/error/controller-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/error/controller-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/error/controller-test.js should pass jshint.');
  });
});
define("mockboard/tests/unit/pods/index/controller-test", ["exports"], function (exports) {});
// import { moduleFor, test } from 'ember-qunit';

// moduleFor('controller:index', 'Unit | Controller | index', {
//   // Specify the other units that are required for this test.
//   // needs: ['controller:foo']
// });

// // Replace this with your real tests.
// test('it exists', function(assert) {
//   let controller = this.subject();
//   assert.ok(controller);
// });
define('mockboard/tests/unit/pods/index/controller-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/index/controller-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/index/controller-test.js should pass jshint.');
  });
});
define('mockboard/tests/unit/pods/index/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mockboard/tests/unit/pods/index/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/index/route-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/index/route-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('mockboard/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map