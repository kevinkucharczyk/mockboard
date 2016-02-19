import Ember from 'ember';
import BaseWidget from 'mockboard-base-widget';
import d3 from 'd3';
import _array from 'lodash/array';

export default BaseWidget.extend({
  classNames: ['line-chart-widget'],
  width: 300,
  height: 200,
  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40
  },
  data: [],
  transform: Ember.computed('margin', function() {
    const margin = this.get('margin');
    return 'translate(' + margin.left + ',' + margin.top + ')';
  }),

  viewport: Ember.computed(function() {
    return d3.select(this.$('.line-chart-widget__viewport')[0]);
  }),

  xScale: Ember.computed(function() {
    const margin = this.get('margin');
    const width = this.get('width') - margin.left - margin.right;
    return d3.time.scale().range([0, width]);
  }),

  yScale: Ember.computed(function() {
    const margin = this.get('margin');
    const height = this.get('height') - margin.top - margin.bottom;
    return d3.scale.linear().range([height, 0]);
  }),

  xAxis: Ember.computed(function() {
    return d3.svg.axis().orient('bottom').tickFormat(d3.time.format("%H:%M:%S")).ticks(5).outerTickSize(0);
  }),

  yAxis: Ember.computed(function() {
    return d3.svg.axis().orient('left');
  }),

	line: Ember.computed(function() {
    const x = this.get('xScale');
    const y = this.get('yScale');
    return d3.svg.line()
      .x(function(d) { return x(new Date(d.date)); })
      .y(function(d) { return y(d.value); });
  }),

  updateDimensions() {
    Ember.run.scheduleOnce('afterRender', this, '_updateDimensions');
  },

  _updateDimensions() {
    const width = this.$().width();
    const height = this.$().height() - this.$('.line-chart-widget__title').outerHeight(true);
    this.set('width', width);
    this.set('height', height);
  },

  draw() {
    Ember.run.scheduleOnce('afterRender', this, '_draw');
  },

  _draw() {
      this._drawChart();
  },

  _drawChart() {
    const margin = this.get('margin');
    const viewport = this.get('viewport');
    const xScale = this.get('xScale');
    const yScale = this.get('yScale');

    const xAxis = this.get('xAxis');
    const yAxis = this.get('yAxis');
    const line = this.get('line');

    const data = this.get('data');

    xScale.domain(d3.extent(data, function(d) { return new Date(d.date); }));
    yScale.domain(d3.extent(data, function(d) { return d.value; })).nice();

    xAxis.scale(xScale);
    yAxis.scale(yScale);

    viewport.select('g.x')
      .attr('transform', 'translate(0,' + (this.get('height') - margin.top - margin.bottom) + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('class', 'axis-text');

    viewport.select('g.y')
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'axis-text');

    viewport.select('path.line')
      .datum(data)
      .attr('d', line);
  },

  _onResizeEnd() {
    this.updateDimensions();
    this.draw();
  },

  debouncedResizeHandler() {
    return Ember.run.debounce(this, this._onResizeEnd, 200);
  },

  _setupResizeListener() {
    const resizeHandler = Ember.$.proxy(this.debouncedResizeHandler, this);
    Ember.$(window).on('resize.' + this.elementId, resizeHandler);
  },

  _destroyResizeListener() {
    Ember.$(window).off('resize.' + this.elementId);
  },

  init: function() {
    this._super();
    this.addObserver('data', this.draw);
  },

  didInsertElement() {
    this._super();
    this._setupResizeListener();
    this.updateDimensions();
    this.draw();
  },

  willDestroyElement() {
    this._destroyResizeListener();
  }
});
