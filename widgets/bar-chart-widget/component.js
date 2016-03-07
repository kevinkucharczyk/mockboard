import Ember from 'ember';
import BaseWidget from 'mockboard-base-widget';
import d3 from 'd3';
import _array from 'lodash/array';

export default BaseWidget.extend({
  width: 300,
  height: 200,
  margin: {
    top: 10,
    right: 10,
    bottom: 40,
    left: 40
  },
  data: [],
  transform: Ember.computed('margin', function() {
    const margin = this.get('margin');
    return 'translate(' + margin.left + ',' + margin.top + ')';
  }),

  viewport: Ember.computed(function() {
    return d3.select(this.$('.widget__viewport')[0]);
  }),

  xDomain: Ember.computed('data', function() {
    return this.get('data').map(function(d) { return d.label; });
  }),

  yDomain: Ember.computed('data', function() {
    return d3.extent(this.get('data'), function(d) { return d.value; });
  }),

  xScale: Ember.computed('margin', 'height', 'xDomain', function() {
    const margin = this.get('margin');
    const width = this.get('width') - margin.left - margin.right;
    return d3.scale.ordinal()
      .domain(this.get('xDomain')).rangeRoundBands([0, width], .1);
  }),

  yScale: Ember.computed('margin', 'height', 'yDomain', function() {
    const margin = this.get('margin');
    const height = this.get('height') - margin.top - margin.bottom;
    return d3.scale.linear()
      .domain(this.get('yDomain')).range([height, 0]);
  }),

  xAxis: Ember.computed(function() {
    return d3.svg.axis().orient('bottom');
  }),

  yAxis: Ember.computed(function() {
    return d3.svg.axis().orient('left');
  }),

  bars: Ember.computed(function() {
    return this.get('viewport').selectAll('.bar').data(this.get('data'), function(d) { return d.value; });
  }).volatile(),

  updateDimensions() {
    Ember.run.scheduleOnce('afterRender', this, '_updateDimensions');
  },

  _updateDimensions() {
    const width = this.$().width();
    const height = this.$().height() - this.$('.widget__title').outerHeight(true);
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
    const innerHeight = this.get('height') - margin.top - margin.bottom;
    const viewport = this.get('viewport');
    const xScale = this.get('xScale');
    const yScale = this.get('yScale');

    const xAxis = this.get('xAxis');
    const yAxis = this.get('yAxis');

    const data = this.get('data');

    xAxis.scale(xScale);
    yAxis.scale(yScale);

    viewport.select('g.x')
      .attr('transform', 'translate(0,' + innerHeight + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('class', 'axis-text');

    viewport.select('g.y')
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'axis-text');

    const bars = this.get('bars');

    bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return xScale(d.label); })
      .attr('width', xScale.rangeBand())
      .attr('y', function(d) { return yScale(d.value); })
      .attr('height', function(d) { return innerHeight - yScale(d.value); });

    return bars.exit().remove();
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
