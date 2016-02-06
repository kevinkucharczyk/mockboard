import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gauge-widget', 'Integration | Component | gauge widget', {
  integration: true
});

test('shows title', function(assert) {
  this.render(hbs`{{gauge-widget title="Test Gauge"}}`);

  assert.equal(this.$('.gauge-widget__title').text().trim(), 'Test Gauge');
});
