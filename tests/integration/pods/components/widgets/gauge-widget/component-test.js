import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/gauge-widget', 'Integration | Component | widgets/gauge widget', {
  integration: true
});

test('shows title', function(assert) {
  this.render(hbs`{{widgets/gauge-widget title="Test Gauge"}}`);

  assert.equal(this.$('.gauge-widget__title').text().trim(), 'Test Gauge');
});
