import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return params.dashboard;
  },

  renderTemplate(controller, model) {
    this.render(model);
  },

  actions: {
    error(error) {
      if (error) {
        error.dashboard = this.get('controller.model');
        this.controllerFor('error').set('error', error);
        return this.transitionTo('error', error.dashboard);
      }
    }
  }
});
