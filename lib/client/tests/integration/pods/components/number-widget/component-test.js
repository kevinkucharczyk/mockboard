import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('number-widget', 'Integration | Component | number widget', {
  integration: true
});

test('shows title and value', function(assert) {
  this.render(hbs`{{number-widget title="Test Title" value=10}}`);

  assert.equal(this.$('.number-widget__title').text().trim(), 'Test Title');

  assert.equal(this.$('.number-widget__value').text().trim(), '10');
});
