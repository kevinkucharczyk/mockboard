import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super();
    Ember.run.schedule('afterRender', () => {
      Ember.$('.gridster ul').gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [300, 300]
      });
    });
  }
});
