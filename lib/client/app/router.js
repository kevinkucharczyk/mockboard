import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('dashboard', { path: '/:dashboard' });
  this.route('error', { path: '/*path' });
});

export default Router;
