import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/number-widget', 'Integration | Component | widgets/number widget', {
  integration: true
});

test('shows title and value', function(assert) {
  this.render(hbs`{{widgets/number-widget title="Test Title" value=10}}`);

  assert.equal(this.$('.number-widget__title').text().trim(), 'Test Title');

  assert.equal(this.$('.number-widget__value').text().trim(), '10');
});
