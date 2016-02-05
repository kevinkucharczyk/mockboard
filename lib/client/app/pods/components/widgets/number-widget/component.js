import Ember from 'ember';
import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';

export default Ember.Component.extend(StyledComponentMixin, {
  classNames: ['number-widget'],

  socketIOService: Ember.inject.service('socket-io'),

  willRender() {
    var socket = this.get('socketIOService').socketFor('http://localhost:3000/');

    socket.on('connection', () => {
      socket.emit('join', 'Hello World from client');
    });
  }
});
