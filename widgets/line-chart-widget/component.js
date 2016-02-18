import Ember from 'ember';
import BaseWidget from 'mockboard-base-widget';
import d3 from 'd3';
import _array from 'lodash/array';

const pi = Math.PI;

const dataset = [93.24, 95.35, 98.84, 99.92, 99.80, 99.47, 100.39, 100.40, 100.81, 103.92, 105.06, 106.88, 107.34, 108.74, 109.36, 107.52, 107.34, 109.44, 110.02, 111.98, 113.54, 112.89, 110.69, 113.62, 114.35, 118.77, 121.19, 118.40, 121.33, 122.67, 123.64, 124.07, 124.49, 120.19];

const dates = ['2016-01-01', '2016-01-02', '2016-01-03', '2016-01-04', '2016-01-05', '2016-01-06', '2016-01-07', '2016-01-08', '2016-01-09', '2016-01-10', '2016-01-11', '2016-01-12', '2016-01-13', '2016-01-14', '2016-01-15', '2016-01-16', '2016-01-17', '2016-01-18', '2016-01-19', '2016-01-20', '2016-01-21', '2016-01-22', '2016-01-23', '2016-01-24', '2016-01-25', '2016-01-26', '2016-01-27', '2016-01-28', '2016-01-29', '2016-01-30', '2016-01-31', '2016-02-01', '2016-02-02', '2016-02-03'];

const data = _array.zipWith(dataset, dates, function(value, date) {
  return {
    value: value,
    date: date
  };
});

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
    return d3.svg.axis().orient('bottom').tickFormat(d3.time.format("%Y-%m-%d")).ticks(5);
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

    xScale.domain(d3.extent(dates, function(d) { return new Date(d); })).nice();
    yScale.domain(d3.extent(dataset)).nice();

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
    this.addObserver('data', this.update);
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
