/*jshint node:true*/
const Funnel = require('broccoli-funnel'),
      Merge  = require('broccoli-merge-trees');

module.exports = {
  name: 'import-dashboards',

  treeForTemplates: function(tree) {
    if (tree) {
      return Merge([tree, this.routeTemplates()]);
    } else {
      return this.routeTemplates();
    }
  },

  routeTemplates: function() {
    return new Funnel('../../dashboards');
  }
};
