import Ember from 'ember';
import configuration from '../../dashboards/config';
import _object from 'lodash/object';

const defaultConfig = {
  widget_margins: [5, 5],
  widget_base_dimensions: [300, 300],
  columns: 4
};

export default Ember.Controller.extend({
  init() {
    let config = defaultConfig;
    this._super();
    Ember.run.schedule('afterRender', () => {
      const dashboard = this.get('model');
      if(_object.has(configuration, dashboard)) {
        _object.merge(config, configuration[dashboard]);
      }
      
      const width = (config.widget_base_dimensions[0] + config.widget_margins[0] * 2) * config.columns;
      
      Ember.$('.gridster').width(width);
      
      Ember.$('.gridster ul').gridster({
        widget_margins: config.widget_margins,
        widget_base_dimensions: config.widget_base_dimensions  
      });
    });
  }
});
