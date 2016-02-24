import Ember from 'ember';
import _object from 'lodash/object';

export default Ember.Component.extend({
  classNames: ['mockboard-widget'],
  socketIOService: Ember.inject.service('socket-io'),

  channel: null,
  onData: Ember.K,

  didInsertElement() {
    this.set('socket', this.get('socketIOService').socketFor(location.protocol + '//' + location.host));

    if(this.get('channel')) {
      this.get('socket').on(this.get('channel'), (data) => {
        this.onData(data);
        _object.forOwn(data, (value, key) => {
          if(key === 'updatedAt') {
            this.set(key, new Date(value * 1000));
          } else {
            this.set(key, value);
          }
        });
      });

      this.get('socket').emit('subscribe', this.get('channel'));
    }
  },

  willDestroyElement() {
    if(this.get('channel')) {
      this.get('socket').off(this.get('channel'));
    }
  }
});
