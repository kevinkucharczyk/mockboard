import Ember from 'ember';
import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';

export default Ember.Component.extend(StyledComponentMixin, {
  classNames: ['number-widget'],

  styles: {
    backgroundColor: '#348899'
  }
});
