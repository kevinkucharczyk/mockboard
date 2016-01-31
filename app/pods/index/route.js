import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.set('gaugeValue', 50);
    controller.set('gaugeMax', 50);
  }
});
