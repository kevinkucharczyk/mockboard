import Ember from 'ember';
import BaseWidget from '../../base-widget/component';
import d3 from 'd3';

const pi = Math.PI;

export default BaseWidget.extend({
  classNames: ['gauge-widget'],
  pathClasses: ['gauge-widget__value-path', 'gauge-widget__remainder-path'],
  currentData: [],
  offset: 120,
  width: 300,
  height: 300,
  gaugeWidth: 15,
  radius: Ember.computed('width', 'height', function() {
    return this.get('width') / 2;
  }),
  transform: Ember.computed('width', 'height', function() {
    return 'translate(' + this.get('width')/2 + ',' + this.get('width')/2 + ')';
  }),

  viewport: Ember.computed(function() {
    return d3.select(this.$('.gauge-widget__viewport')[0]);
  }),

  data: Ember.computed('value', 'max', function() {
    const value = this.get('value');
    const max = this.get('max');
    if(value !== undefined && max !== undefined) {
      return [value, max - value];
    } else {
      return [null, null];
    }
  }),

  hasData: Ember.computed('data', function() {
    return !Ember.isEmpty(this.get('data'));
  }),

  arc: Ember.computed('radius', 'gaugeWidth', function() {
    const radius = this.get('radius');
    const gaugeWidth = this.get('gaugeWidth');
    return d3.svg.arc().outerRadius(radius).innerRadius(radius - gaugeWidth);
  }),

  pie: Ember.computed('offset', function() {
    const offset = this.get('offset');
    return d3.layout.pie()
      .sort(null)
      .startAngle(-offset * pi / 180)
      .endAngle(offset * pi / 180);
  }),

  groups: Ember.computed('data', function() {
    const data = this.get('pie')(this.get('data'));
    return this.get('viewport').selectAll('.arc').data(data);
  }).volatile(),

  text: Ember.computed('data', function() {
    return this.get('viewport').selectAll('.text').data([this.get('value')]);
  }).volatile(),

  arcTween(d, i) {
    const current = this.get('currentData')[i];
    const interpolate = d3.interpolate(current, d);
    const arc = this.get('arc');

    this.get('currentData')[i] = interpolate(0);
    return function(t) {
      return arc(interpolate(t));
    };
  },

  textTween(d) {
    const currentValue = +this.textContent,
      i = d3.interpolate( currentValue, d ),
      prec = (d + "").split("."),
      round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

    return function(t) {
      this.textContent = Math.round(i(t) * round) / round;
    };
  },

  updateDimensions() {
    Ember.run.scheduleOnce('afterRender', this, '_updateDimensions');
  },

  _updateDimensions() {
    this.set('width', this.$().width());
    this.set('height', this.$().height());
  },

  draw() {
    Ember.run.scheduleOnce('afterRender', this, '_draw');
  },

  _draw() {
      this._prepareData();
      this._drawChart();
  },

  _prepareData() {
    this.set('currentData', []);

    const groups = this.get('groups'),
      text = this.get('text');

    const groupsEnter = groups.enter().append('g').attr('class', 'arc'),
      textEnter = text.enter().append('g').attr('class', 'text');

    groupsEnter
      .append('path')
      .attr('class',
        (d, i) => {
          return this.get('pathClasses')[i];
        });

    textEnter
      .append('text')
      .attr('class', 'gauge-widget__text');

    groups.exit().remove();
    text.exit().remove();
  },

  _drawChart() {
    const groups = this.get('groups'),
      text = this.get('text');

    groups
      .select('path')
      .attr('d', this.get('arc'))
      .each(d => this.get('currentData').push(d));

    text
      .select('text')
      .style('font-size', this.get('radius')/2.5+'px')
      .text(d => d);
  },

  update() {
    Ember.run.scheduleOnce('afterRender', this, '_update');
  },

  _update() {
      const groups = this.get('groups'),
      text = this.get('text');

      groups
        .select('path')
        .transition()
        .duration(750)
        .attrTween('d', this.get('arcTween').bind(this));

      text
        .select('text')
        .transition()
        .duration(750)
        .tween('text', this.get('textTween'));
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
