import Ember from 'ember';
import d3 from 'd3';

const pi = Math.PI;

export default Ember.Component.extend({
  classNames: ['gauge-widget'],
  pathClasses: ['gauge-widget__value-path', 'gauge-widget__remainder-path'],
  offset: 120,
  width: 300,
  height: 300,
  radius: Ember.computed('width', 'height', function() {
    return this.get('width') / 2;
  }),
  currentData: [],
  gaugeWidth: 15,
  transform: Ember.computed('width', 'height', function() {
    return 'translate(' + this.get('width')/2 + ',' + this.get('width')/2 + ')';
  }),

  data: Ember.computed('value', 'max', function() {
    const value = this.get('value');
    const max = this.get('max');
    return [value, max - value];
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

  viewport: Ember.computed(function() {
    return d3.select(this.$('.gauge-widget__viewport')[0]);
  }),

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

  _updateDimensions: function() {
    this.set('width', this.$().width());
    this.set('height', this.$().height());
  },

  drawOnce() {
    Ember.run.scheduleOnce('afterRender', this, 'draw');
  },

  updateOnce() {
    Ember.run.scheduleOnce('afterRender', this, 'update');
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

  draw() {
    this._prepareData();
    this._drawChart();
  },

  update() {
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

  didInsertElement() {
    this._super();
    this._updateDimensions();
    this.drawOnce();
    Ember.$(window).resize(() => {
      this._updateDimensions();
      this.drawOnce();
    });
  },

  didUpdateAttrs() {
    this._super();
    this._updateDimensions();
    this.updateOnce();
  }
});
