"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('mockboard/app', ['exports', 'ember', 'mockboard/resolver', 'ember/load-initializers', 'mockboard/config/environment'], function (exports, _ember, _mockboardResolver, _emberLoadInitializers, _mockboardConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _mockboardConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mockboardConfigEnvironment['default'].podModulePrefix,
    Resolver: _mockboardResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _mockboardConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('mockboard/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'mockboard/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _mockboardConfigEnvironment) {

  var name = _mockboardConfigEnvironment['default'].APP.name;
  var version = _mockboardConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('mockboard/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('mockboard/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define("mockboard/dashboards/config", ["exports"], function (exports) {
  exports["default"] = {
    index: {
      widget_margins: [5, 5],
      widget_base_dimensions: [300, 300],
      columns: 4
    }
  };
});
define('mockboard/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _emberMomentHelpersMomentCalendar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentCalendar['default'];
    }
  });
  Object.defineProperty(exports, 'momentCalendar', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentCalendar.momentCalendar;
    }
  });
});
define('mockboard/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('mockboard/helpers/moment-format', ['exports', 'ember', 'mockboard/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _mockboardConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_mockboardConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('mockboard/helpers/moment-from-now', ['exports', 'ember', 'mockboard/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _mockboardConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_mockboardConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('mockboard/helpers/moment-to-now', ['exports', 'ember', 'mockboard/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _mockboardConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_mockboardConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('mockboard/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('mockboard/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('mockboard/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'mockboard/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _mockboardConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_mockboardConfigEnvironment['default'].APP.name, _mockboardConfigEnvironment['default'].APP.version)
  };
});
define('mockboard/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('mockboard/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('mockboard/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('mockboard/initializers/export-application-global', ['exports', 'ember', 'mockboard/config/environment'], function (exports, _ember, _mockboardConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_mockboardConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _mockboardConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_mockboardConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('mockboard/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('mockboard/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('mockboard/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("mockboard/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define("mockboard/pods/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "mockboard/pods/application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('mockboard/pods/application/view', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['mockboard-body']
  });
});
define('mockboard/pods/components/bar-chart-widget/component', ['exports', 'ember', 'mockboard-base-widget', 'd3', 'lodash/array'], function (exports, _ember, _mockboardBaseWidget, _d3, _lodashArray) {
  exports['default'] = _mockboardBaseWidget['default'].extend({
    width: 300,
    height: 200,
    margin: {
      top: 10,
      right: 10,
      bottom: 40,
      left: 40
    },
    data: [],
    transform: _ember['default'].computed('margin', function () {
      var margin = this.get('margin');
      return 'translate(' + margin.left + ',' + margin.top + ')';
    }),

    viewport: _ember['default'].computed(function () {
      return _d3['default'].select(this.$('.widget__viewport')[0]);
    }),

    xDomain: _ember['default'].computed('data', function () {
      return this.get('data').map(function (d) {
        return d.label;
      });
    }),

    yDomain: _ember['default'].computed('data', function () {
      return _d3['default'].extent(this.get('data'), function (d) {
        return d.value;
      });
    }),

    xScale: _ember['default'].computed('margin', 'height', 'xDomain', function () {
      var margin = this.get('margin');
      var width = this.get('width') - margin.left - margin.right;
      return _d3['default'].scale.ordinal().domain(this.get('xDomain')).rangeRoundBands([0, width], .1);
    }),

    yScale: _ember['default'].computed('margin', 'height', 'yDomain', function () {
      var margin = this.get('margin');
      var height = this.get('height') - margin.top - margin.bottom;
      return _d3['default'].scale.linear().domain(this.get('yDomain')).range([height, 0]);
    }),

    xAxis: _ember['default'].computed(function () {
      return _d3['default'].svg.axis().orient('bottom');
    }),

    yAxis: _ember['default'].computed(function () {
      return _d3['default'].svg.axis().orient('left');
    }),

    bars: _ember['default'].computed(function () {
      return this.get('viewport').selectAll('.bar').data(this.get('data'), function (d) {
        return d.value;
      });
    }).volatile(),

    updateDimensions: function updateDimensions() {
      _ember['default'].run.scheduleOnce('afterRender', this, '_updateDimensions');
    },

    _updateDimensions: function _updateDimensions() {
      var width = this.$().width();
      var height = this.$().height() - this.$('.widget__title').outerHeight(true);
      this.set('width', width);
      this.set('height', height);
    },

    draw: function draw() {
      _ember['default'].run.scheduleOnce('afterRender', this, '_draw');
    },

    _draw: function _draw() {
      this._drawChart();
    },

    _drawChart: function _drawChart() {
      var margin = this.get('margin');
      var innerHeight = this.get('height') - margin.top - margin.bottom;
      var viewport = this.get('viewport');
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');

      var xAxis = this.get('xAxis');
      var yAxis = this.get('yAxis');

      var data = this.get('data');

      xAxis.scale(xScale);
      yAxis.scale(yScale);

      viewport.select('g.x').attr('transform', 'translate(0,' + innerHeight + ')').call(xAxis).selectAll('text').attr('class', 'axis-text');

      viewport.select('g.y').call(yAxis).selectAll('text').attr('class', 'axis-text');

      var bars = this.get('bars');

      bars.enter().append('rect').attr('class', 'bar').attr('x', function (d) {
        return xScale(d.label);
      }).attr('width', xScale.rangeBand()).attr('y', function (d) {
        return yScale(d.value);
      }).attr('height', function (d) {
        return innerHeight - yScale(d.value);
      });

      return bars.exit().remove();
    },

    _onResizeEnd: function _onResizeEnd() {
      this.updateDimensions();
      this.draw();
    },

    debouncedResizeHandler: function debouncedResizeHandler() {
      return _ember['default'].run.debounce(this, this._onResizeEnd, 200);
    },

    _setupResizeListener: function _setupResizeListener() {
      var resizeHandler = _ember['default'].$.proxy(this.debouncedResizeHandler, this);
      _ember['default'].$(window).on('resize.' + this.elementId, resizeHandler);
    },

    _destroyResizeListener: function _destroyResizeListener() {
      _ember['default'].$(window).off('resize.' + this.elementId);
    },

    init: function init() {
      this._super();
      this.addObserver('data', this.draw);
    },

    didInsertElement: function didInsertElement() {
      this._super();
      this._setupResizeListener();
      this.updateDimensions();
      this.draw();
    },

    willDestroyElement: function willDestroyElement() {
      this._destroyResizeListener();
    }
  });
});
define('mockboard/pods/components/gauge-widget/component', ['exports', 'ember', 'mockboard-base-widget', 'd3'], function (exports, _ember, _mockboardBaseWidget, _d3) {

  var pi = Math.PI;

  exports['default'] = _mockboardBaseWidget['default'].extend({
    pathClasses: ['widget__value-path', 'widget__remainder-path'],
    currentData: [],
    offset: 120,
    width: 300,
    height: 225,
    gaugeWidth: 15,
    radius: _ember['default'].computed('width', 'height', function () {
      return this.get('width') / 2;
    }),
    transform: _ember['default'].computed('width', 'height', function () {
      return 'translate(' + this.get('width') / 2 + ',' + this.get('width') / 2 + ')';
    }),

    viewport: _ember['default'].computed(function () {
      return _d3['default'].select(this.$('.widget__viewport')[0]);
    }),

    data: _ember['default'].computed('value', 'max', function () {
      var value = this.get('value');
      var max = this.get('max');
      if (value !== undefined && max !== undefined) {
        return [value, max - value];
      } else {
        return [null, null];
      }
    }),

    hasData: _ember['default'].computed('data', function () {
      return !_ember['default'].isEmpty(this.get('data'));
    }),

    arc: _ember['default'].computed('radius', 'gaugeWidth', function () {
      var radius = this.get('radius');
      var gaugeWidth = this.get('gaugeWidth');
      return _d3['default'].svg.arc().outerRadius(radius).innerRadius(radius - gaugeWidth);
    }),

    pie: _ember['default'].computed('offset', function () {
      var offset = this.get('offset');
      return _d3['default'].layout.pie().sort(null).startAngle(-offset * pi / 180).endAngle(offset * pi / 180);
    }),

    groups: _ember['default'].computed('data', function () {
      var data = this.get('pie')(this.get('data'));
      return this.get('viewport').selectAll('.arc').data(data);
    }).volatile(),

    text: _ember['default'].computed('data', function () {
      return this.get('viewport').selectAll('.text').data([this.get('value')]);
    }).volatile(),

    arcTween: function arcTween(d, i) {
      var current = this.get('currentData')[i];
      var interpolate = _d3['default'].interpolate(current, d);
      var arc = this.get('arc');

      this.get('currentData')[i] = interpolate(0);
      return function (t) {
        return arc(interpolate(t));
      };
    },

    textTween: function textTween(d) {
      var currentValue = +this.textContent,
          i = _d3['default'].interpolate(currentValue, d),
          prec = (d + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

      return function (t) {
        this.textContent = Math.round(i(t) * round) / round;
      };
    },

    updateDimensions: function updateDimensions() {
      _ember['default'].run.scheduleOnce('afterRender', this, '_updateDimensions');
    },

    _updateDimensions: function _updateDimensions() {
      var width = this.$().width();
      var height = this.$().height();
      var value = Math.min(width, height) - 50;
      this.set('width', value);
      this.set('height', value * 0.75);
    },

    draw: function draw() {
      _ember['default'].run.scheduleOnce('afterRender', this, '_draw');
    },

    _draw: function _draw() {
      this._prepareData();
      this._drawChart();
    },

    _prepareData: function _prepareData() {
      var _this = this;

      this.set('currentData', []);

      var groups = this.get('groups'),
          text = this.get('text');

      var groupsEnter = groups.enter().append('g').attr('class', 'arc'),
          textEnter = text.enter().append('g').attr('class', 'text');

      groupsEnter.append('path').attr('class', function (d, i) {
        return _this.get('pathClasses')[i];
      });

      textEnter.append('text').attr('class', 'widget__text');

      groups.exit().remove();
      text.exit().remove();
    },

    _drawChart: function _drawChart() {
      var _this2 = this;

      var groups = this.get('groups'),
          text = this.get('text');

      groups.select('path').attr('d', this.get('arc')).each(function (d) {
        return _this2.get('currentData').push(d);
      });

      text.select('text').style('font-size', this.get('radius') / 2.5 + 'px').text(function (d) {
        return d;
      });
    },

    update: function update() {
      _ember['default'].run.scheduleOnce('afterRender', this, '_update');
    },

    _update: function _update() {
      var groups = this.get('groups'),
          text = this.get('text');

      groups.select('path').transition().duration(750).attrTween('d', this.get('arcTween').bind(this));

      text.select('text').transition().duration(750).tween('text', this.get('textTween'));
    },

    _onResizeEnd: function _onResizeEnd() {
      this.updateDimensions();
      this.draw();
    },

    debouncedResizeHandler: function debouncedResizeHandler() {
      return _ember['default'].run.debounce(this, this._onResizeEnd, 200);
    },

    _setupResizeListener: function _setupResizeListener() {
      var resizeHandler = _ember['default'].$.proxy(this.debouncedResizeHandler, this);
      _ember['default'].$(window).on('resize.' + this.elementId, resizeHandler);
    },

    _destroyResizeListener: function _destroyResizeListener() {
      _ember['default'].$(window).off('resize.' + this.elementId);
    },

    init: function init() {
      this._super();
      this.addObserver('data', this.update);
    },

    didInsertElement: function didInsertElement() {
      this._super();
      this._setupResizeListener();
      this.updateDimensions();
      this.draw();
    },

    willDestroyElement: function willDestroyElement() {
      this._destroyResizeListener();
    }
  });
});
define('mockboard/pods/components/line-chart-widget/component', ['exports', 'ember', 'mockboard-base-widget', 'd3', 'lodash/array'], function (exports, _ember, _mockboardBaseWidget, _d3, _lodashArray) {
  exports['default'] = _mockboardBaseWidget['default'].extend({
    width: 300,
    height: 200,
    margin: {
      top: 10,
      right: 10,
      bottom: 40,
      left: 40
    },
    data: [],
    transform: _ember['default'].computed('margin', function () {
      var margin = this.get('margin');
      return 'translate(' + margin.left + ',' + margin.top + ')';
    }),

    viewport: _ember['default'].computed(function () {
      return _d3['default'].select(this.$('.widget__viewport')[0]);
    }),

    xScale: _ember['default'].computed(function () {
      var margin = this.get('margin');
      var width = this.get('width') - margin.left - margin.right;
      return _d3['default'].time.scale().range([0, width]);
    }),

    yScale: _ember['default'].computed(function () {
      var margin = this.get('margin');
      var height = this.get('height') - margin.top - margin.bottom;
      return _d3['default'].scale.linear().range([height, 0]);
    }),

    xAxis: _ember['default'].computed(function () {
      return _d3['default'].svg.axis().orient('bottom').tickFormat(_d3['default'].time.format("%H:%M:%S")).ticks(5).outerTickSize(0);
    }),

    yAxis: _ember['default'].computed(function () {
      return _d3['default'].svg.axis().orient('left');
    }),

    line: _ember['default'].computed(function () {
      var x = this.get('xScale');
      var y = this.get('yScale');
      return _d3['default'].svg.line().x(function (d) {
        return x(new Date(d.date));
      }).y(function (d) {
        return y(d.value);
      });
    }),

    updateDimensions: function updateDimensions() {
      _ember['default'].run.scheduleOnce('afterRender', this, '_updateDimensions');
    },

    _updateDimensions: function _updateDimensions() {
      var width = this.$().width();
      var height = this.$().height() - this.$('.widget__title').outerHeight(true);
      this.set('width', width);
      this.set('height', height);
    },

    draw: function draw() {
      _ember['default'].run.scheduleOnce('afterRender', this, '_draw');
    },

    _draw: function _draw() {
      this._drawChart();
    },

    _drawChart: function _drawChart() {
      var margin = this.get('margin');
      var viewport = this.get('viewport');
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');

      var xAxis = this.get('xAxis');
      var yAxis = this.get('yAxis');
      var line = this.get('line');

      var data = this.get('data');

      xScale.domain(_d3['default'].extent(data, function (d) {
        return new Date(d.date);
      }));
      yScale.domain(_d3['default'].extent(data, function (d) {
        return d.value;
      })).nice();

      xAxis.scale(xScale);
      yAxis.scale(yScale);

      viewport.select('g.x').attr('transform', 'translate(0,' + (this.get('height') - margin.top - margin.bottom) + ')').call(xAxis).selectAll('text').attr('class', 'axis-text');

      viewport.select('g.y').call(yAxis).selectAll('text').attr('class', 'axis-text');

      viewport.select('path.line').datum(data).attr('d', line);
    },

    _onResizeEnd: function _onResizeEnd() {
      this.updateDimensions();
      this.draw();
    },

    debouncedResizeHandler: function debouncedResizeHandler() {
      return _ember['default'].run.debounce(this, this._onResizeEnd, 200);
    },

    _setupResizeListener: function _setupResizeListener() {
      var resizeHandler = _ember['default'].$.proxy(this.debouncedResizeHandler, this);
      _ember['default'].$(window).on('resize.' + this.elementId, resizeHandler);
    },

    _destroyResizeListener: function _destroyResizeListener() {
      _ember['default'].$(window).off('resize.' + this.elementId);
    },

    init: function init() {
      this._super();
      this.addObserver('data', this.draw);
    },

    didInsertElement: function didInsertElement() {
      this._super();
      this._setupResizeListener();
      this.updateDimensions();
      this.draw();
    },

    willDestroyElement: function willDestroyElement() {
      this._destroyResizeListener();
    }
  });
});
define('mockboard/pods/components/number-widget/component', ['exports', 'ember', 'mockboard-base-widget'], function (exports, _ember, _mockboardBaseWidget) {
  exports['default'] = _mockboardBaseWidget['default'].extend({
    classNames: ['number-widget']
  });
});
define('mockboard/pods/dashboard/controller', ['exports', 'mockboard/pods/index/controller'], function (exports, _mockboardPodsIndexController) {
  exports['default'] = _mockboardPodsIndexController['default'].extend({});
});
define('mockboard/pods/dashboard/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return params.dashboard;
    },

    renderTemplate: function renderTemplate(controller, model) {
      this.render(model);
    },

    actions: {
      error: function error(_error) {
        if (_error) {
          _error.dashboard = this.get('controller.model');
          this.controllerFor('error').set('error', _error);
          return this.transitionTo('error', _error.dashboard);
        }
      }
    }
  });
});
define('mockboard/pods/error/controller', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define("mockboard/pods/error/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "mockboard/pods/error/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "small-12 text-center");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("\"");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\" dashboard not found.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "error.dashboard", ["loc", [null, [3, 9], [3, 28]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('mockboard/pods/index/controller', ['exports', 'ember', 'mockboard/dashboards/config', 'lodash/object'], function (exports, _ember, _mockboardDashboardsConfig, _lodashObject) {

  var defaultConfig = {
    widget_margins: [5, 5],
    widget_base_dimensions: [300, 300],
    columns: 4
  };

  exports['default'] = _ember['default'].Controller.extend({
    init: function init() {
      var _this = this;

      var config = defaultConfig;
      this._super();
      _ember['default'].run.schedule('afterRender', function () {
        var dashboard = _this.get('model');
        if (_lodashObject['default'].has(_mockboardDashboardsConfig['default'], dashboard)) {
          _lodashObject['default'].merge(config, _mockboardDashboardsConfig['default'][dashboard]);
        }

        var width = (config.widget_base_dimensions[0] + config.widget_margins[0] * 2) * config.columns;

        _ember['default'].$('.gridster').width(width);

        _ember['default'].$('.gridster ul').gridster({
          widget_margins: config.widget_margins,
          widget_base_dimensions: config.widget_base_dimensions
        });
      });
    }
  });
});
define('mockboard/pods/index/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return 'index';
    }
  });
});
define('mockboard/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('mockboard/router', ['exports', 'ember', 'mockboard/config/environment'], function (exports, _ember, _mockboardConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _mockboardConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('dashboard', { path: '/:dashboard' });
    this.route('error', { path: '/*path' });
  });

  exports['default'] = Router;
});
define('mockboard/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('mockboard/services/moment', ['exports', 'ember', 'mockboard/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _mockboardConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_mockboardConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define('mockboard/services/socket-io', ['exports', 'ember', 'ember-websockets/helpers/socketio-proxy', 'ember-websockets/helpers'], function (exports, _ember, _emberWebsocketsHelpersSocketioProxy, _emberWebsocketsHelpers) {
  var Service = _ember['default'].Service;

  function isWebSocketOpen(socket) {
    return socket.socket.io.readyState !== 'closed';
  }

  exports['default'] = Service.extend({

    /*
    * Each element in the array is of the form:
    *
    * {
    *    url: 'string'
    *    socket: SocketIO Proxy object
    * }
    */
    sockets: {},

    /*
    * socketFor returns a socketio proxy object. On this object there is a property `socket`
    * which contains the actual socketio object. This socketio object is cached based off of the
    * url meaning multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var normalizedUrl = (0, _emberWebsocketsHelpers.normalizeURL)(url);
      var cleanedUrl = normalizedUrl.replace(/\./g, '');
      var existingProxy = this.get('sockets.' + cleanedUrl);

      if (existingProxy && isWebSocketOpen(existingProxy.socket)) {
        return existingProxy.socket;
      }

      var newProxy = _emberWebsocketsHelpersSocketioProxy['default'].create({ content: this, socket: io(normalizedUrl, options) });

      newProxy.socket.connect();

      this.set('sockets.' + cleanedUrl, { url: normalizedUrl, socket: newProxy });

      return newProxy;
    },

    /*
    * closeSocketFor closes the socket for a given url.
    */
    closeSocketFor: function closeSocketFor(url) {
      var normalizedUrl = (0, _emberWebsocketsHelpers.normalizeURL)(url);
      var cleanedUrl = normalizedUrl.replace(/\./g, '');
      var sockets = this.get('sockets');
      var socket = sockets[cleanedUrl];
      socket.socket.close();
      socket.socket.removeAllListeners();
      delete sockets[cleanedUrl];

      this.set('sockets', sockets);
    }
  });
});
define('mockboard/services/websockets', ['exports', 'ember', 'ember-websockets/helpers', 'ember-websockets/helpers/websocket-proxy'], function (exports, _ember, _emberWebsocketsHelpers, _emberWebsocketsHelpersWebsocketProxy) {
  var Service = _ember['default'].Service;
  var isArray = _ember['default'].isArray;

  function isWebSocketOpen(websocket) {
    return websocket.socket.readyState !== window.WebSocket.CLOSED;
  }

  exports['default'] = Service.extend({

    /*
    * A hash of open websocket connections. This
    * allows multiple components to share the same connection.
    *
    * {
    *    'websocket-url': WebSocket Proxy object
    * }
    */
    sockets: {},

    /*
    * socketFor returns a websocket proxy object. On this object there is a property `socket`
    * which contains the actual websocket object. This websocket object is cached based off of the url meaning
    * multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var protocols = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      // Websockets allows either a string or array of strings to be passed as the second argument.
      // Normalize both cases into an array of strings so we can just deal with arrays.
      if (!isArray(protocols)) {
        protocols = [protocols];
      }

      var normalizedUrl = (0, _emberWebsocketsHelpers.normalizeURL)(url);
      var cleanedUrl = normalizedUrl.replace(/\./g, '');

      var existingProxy = this.get('sockets.' + cleanedUrl);

      if (existingProxy && isWebSocketOpen(existingProxy.socket)) {
        return existingProxy.socket;
      }

      // we can get to this place if the websocket has been closed and we are trying to reopen
      // or we are creating a proxy for the first time
      var newWebSocket = new WebSocket(normalizedUrl, protocols);

      if (existingProxy) {
        // If there is an existing socket in place we simply update the websocket object and not
        // the whole proxy as we dont want to destroy the previous listeners.

        existingProxy.socket.socket = newWebSocket;
        return newWebSocket;
      }

      var newProxy = _emberWebsocketsHelpersWebsocketProxy['default'].create({ content: this, protocols: protocols, socket: newWebSocket });

      this.set('sockets.' + cleanedUrl, { url: newProxy.socket.url, socket: newProxy });

      return newProxy;
    },

    /*
    * closeSocketFor closes the socket for a given url.
    */
    closeSocketFor: function closeSocketFor(url) {
      var sockets = this.get('sockets');
      var normalizedUrl = (0, _emberWebsocketsHelpers.normalizeURL)(url);
      var cleanedUrl = normalizedUrl.replace(/\./g, '');
      var socket = sockets[cleanedUrl];
      socket.socket.close();
      delete sockets[cleanedUrl];

      this.set('sockets', sockets);
    }
  });
});
define("mockboard/templates/components/bar-chart-widget", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 2
            },
            "end": {
              "line": 19,
              "column": 2
            }
          },
          "moduleName": "mockboard/templates/components/bar-chart-widget.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Updated at ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "moment-format", [["get", "updatedAt", ["loc", [null, [18, 31], [18, 40]]]], "YYYY-MM-DD HH:mm:ss"], [], ["loc", [null, [18, 15], [18, 64]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 6
          }
        },
        "moduleName": "mockboard/templates/components/bar-chart-widget.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__title");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__chart-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "widget__chart");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el3 = dom.createElement("svg");
        dom.setAttribute(el3, "class", "widget__svg");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("g");
        dom.setAttribute(el4, "class", "widget__viewport");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("g");
        dom.setAttribute(el5, "class", "x axis");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("g");
        dom.setAttribute(el5, "class", "y axis");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        dom.setNamespace(null);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__updated-at");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element0, 'width');
        morphs[2] = dom.createAttrMorph(element0, 'height');
        morphs[3] = dom.createAttrMorph(element1, 'transform');
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["content", "title", ["loc", [null, [2, 2], [2, 11]]]], ["attribute", "width", ["concat", [["get", "width", ["loc", [null, [7, 38], [7, 43]]]]]]], ["attribute", "height", ["concat", [["get", "height", ["loc", [null, [7, 57], [7, 63]]]]]]], ["attribute", "transform", ["concat", [["get", "transform", ["loc", [null, [8, 47], [8, 56]]]]]]], ["block", "if", [["get", "updatedAt", ["loc", [null, [17, 8], [17, 17]]]]], [], 0, null, ["loc", [null, [17, 2], [19, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mockboard/templates/components/gauge-widget", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 2
            },
            "end": {
              "line": 17,
              "column": 2
            }
          },
          "moduleName": "mockboard/templates/components/gauge-widget.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Updated at ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "moment-format", [["get", "updatedAt", ["loc", [null, [16, 31], [16, 40]]]], "YYYY-MM-DD HH:mm:ss"], [], ["loc", [null, [16, 15], [16, 64]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 6
          }
        },
        "moduleName": "mockboard/templates/components/gauge-widget.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__title");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__chart-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "widget__chart");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el3 = dom.createElement("svg");
        dom.setAttribute(el3, "class", "widget__svg");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("g");
        dom.setAttribute(el4, "class", "widget__viewport");
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        dom.setNamespace(null);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__updated-at");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element0, 'width');
        morphs[2] = dom.createAttrMorph(element0, 'height');
        morphs[3] = dom.createAttrMorph(element1, 'transform');
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["content", "title", ["loc", [null, [2, 2], [2, 11]]]], ["attribute", "width", ["concat", [["get", "width", ["loc", [null, [7, 38], [7, 43]]]]]]], ["attribute", "height", ["concat", [["get", "height", ["loc", [null, [7, 57], [7, 63]]]]]]], ["attribute", "transform", ["concat", [["get", "transform", ["loc", [null, [8, 47], [8, 56]]]]]]], ["block", "if", [["get", "updatedAt", ["loc", [null, [15, 8], [15, 17]]]]], [], 0, null, ["loc", [null, [15, 2], [17, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mockboard/templates/components/line-chart-widget", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 2
            },
            "end": {
              "line": 20,
              "column": 2
            }
          },
          "moduleName": "mockboard/templates/components/line-chart-widget.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Updated at ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "moment-format", [["get", "updatedAt", ["loc", [null, [19, 31], [19, 40]]]], "YYYY-MM-DD HH:mm:ss"], [], ["loc", [null, [19, 15], [19, 64]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 6
          }
        },
        "moduleName": "mockboard/templates/components/line-chart-widget.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__title");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__chart-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "widget__chart");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el3 = dom.createElement("svg");
        dom.setAttribute(el3, "class", "widget__svg");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("g");
        dom.setAttribute(el4, "class", "widget__viewport");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("g");
        dom.setAttribute(el5, "class", "x axis");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("g");
        dom.setAttribute(el5, "class", "y axis");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("path");
        dom.setAttribute(el5, "class", "line");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        dom.setNamespace(null);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__updated-at");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element0, 'width');
        morphs[2] = dom.createAttrMorph(element0, 'height');
        morphs[3] = dom.createAttrMorph(element1, 'transform');
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["content", "title", ["loc", [null, [2, 2], [2, 11]]]], ["attribute", "width", ["concat", [["get", "width", ["loc", [null, [7, 38], [7, 43]]]]]]], ["attribute", "height", ["concat", [["get", "height", ["loc", [null, [7, 57], [7, 63]]]]]]], ["attribute", "transform", ["concat", [["get", "transform", ["loc", [null, [8, 47], [8, 56]]]]]]], ["block", "if", [["get", "updatedAt", ["loc", [null, [18, 8], [18, 17]]]]], [], 0, null, ["loc", [null, [18, 2], [20, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mockboard/templates/components/number-widget", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "mockboard/templates/components/number-widget.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Updated at ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "moment-format", [["get", "updatedAt", ["loc", [null, [11, 31], [11, 40]]]], "YYYY-MM-DD HH:mm:ss"], [], ["loc", [null, [11, 15], [11, 64]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 6
          }
        },
        "moduleName": "mockboard/templates/components/number-widget.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__title");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__value");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "widget__updated-at");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["content", "title", ["loc", [null, [2, 2], [2, 11]]]], ["content", "value", ["loc", [null, [6, 2], [6, 11]]]], ["block", "if", [["get", "updatedAt", ["loc", [null, [10, 8], [10, 17]]]]], [], 0, null, ["loc", [null, [10, 2], [12, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("mockboard/templates/custom", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 6
          }
        },
        "moduleName": "mockboard/templates/custom.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "custom-dashboard");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "gridster");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "1");
        dom.setAttribute(el4, "data-col", "1");
        dom.setAttribute(el4, "data-sizex", "1");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "1");
        dom.setAttribute(el4, "data-col", "2");
        dom.setAttribute(el4, "data-sizex", "1");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "2");
        dom.setAttribute(el4, "data-col", "1");
        dom.setAttribute(el4, "data-sizex", "2");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "2");
        dom.setAttribute(el4, "data-col", "2");
        dom.setAttribute(el4, "data-sizex", "2");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 1, 1);
        return morphs;
      },
      statements: [["inline", "number-widget", [], ["title", "Test Number", "value", 5, "channel", "number"], ["loc", [null, [5, 8], [5, 70]]]], ["inline", "gauge-widget", [], ["title", "Test Gauge", "value", 40, "max", 100, "channel", "gauge"], ["loc", [null, [9, 8], [9, 76]]]], ["inline", "line-chart-widget", [], ["title", "Test LineChart", "channel", "linechart"], ["loc", [null, [13, 8], [13, 72]]]], ["inline", "bar-chart-widget", [], ["title", "Test Bar Chart", "channel", "barchart"], ["loc", [null, [17, 8], [17, 70]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("mockboard/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 6
          }
        },
        "moduleName": "mockboard/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "index-dashboard");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "class", "text-center");
        var el3 = dom.createTextNode("\n    Mockboard\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "gridster");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "1");
        dom.setAttribute(el4, "data-col", "1");
        dom.setAttribute(el4, "data-sizex", "1");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "1");
        dom.setAttribute(el4, "data-col", "2");
        dom.setAttribute(el4, "data-sizex", "1");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "2");
        dom.setAttribute(el4, "data-col", "1");
        dom.setAttribute(el4, "data-sizex", "2");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "data-row", "2");
        dom.setAttribute(el4, "data-col", "2");
        dom.setAttribute(el4, "data-sizex", "2");
        dom.setAttribute(el4, "data-sizey", "1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 3, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 1, 1);
        return morphs;
      },
      statements: [["inline", "number-widget", [], ["title", "Test Number", "value", 5, "channel", "number"], ["loc", [null, [9, 8], [9, 70]]]], ["inline", "gauge-widget", [], ["title", "Test Gauge", "value", 40, "max", 100, "channel", "gauge"], ["loc", [null, [13, 8], [13, 76]]]], ["inline", "line-chart-widget", [], ["title", "Test LineChart", "channel", "linechart"], ["loc", [null, [17, 8], [17, 72]]]], ["inline", "bar-chart-widget", [], ["title", "Test Bar Chart", "channel", "barchart"], ["loc", [null, [21, 8], [21, 70]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('mockboard/config/environment', ['ember'], function(Ember) {
  var prefix = 'mockboard';
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

/* jshint ignore:end */

/* jshint ignore:start */
if (!runningTests) {
  require("mockboard/app")["default"].create({"name":"mockboard","version":"0.0.0+6c30f37a"});
}
/* jshint ignore:end */
//# sourceMappingURL=mockboard.map