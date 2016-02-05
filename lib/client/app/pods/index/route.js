import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.set('gaugeValue', 42);
    controller.set('gaugeMax', 100);
  }
});
