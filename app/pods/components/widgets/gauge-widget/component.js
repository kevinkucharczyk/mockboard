import Ember from 'ember';
import d3 from 'd3';

const pi = Math.PI;

export default Ember.Component.extend({
  classNames: ['gauge-widget'],
  offset: 120,
  width: 400,
  height: 320,
  radius: Ember.computed('width', 'height', function() {
    return this.get('width') / 2;
  }),
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
    return this.get('viewport').select('g').selectAll('path').data(data);
  }),

  viewport: Ember.computed(function() {
    return d3.select(this.$("svg").get(0));
  }),

  didRender() {
    const groups = this.get('groups');

    groups
      .enter()
      .append('path').attr('class', 'gauge-widget__path')
      .attr('d', this.get('arc'));
  }
});
