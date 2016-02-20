/*jshint node:true*/
const Funnel = require('broccoli-funnel'),
      Merge  = require('broccoli-merge-trees');

module.exports = {
  name: 'import-dashboards',

  treeForApp: function(tree) {
    if (tree) {
      return Merge([tree, this.dashboardConfigs()]);
    } else {
      return this.dashboardConfigs();
    }
  },

  treeForTemplates: function(tree) {
    if (tree) {
      return Merge([tree, this.routeTemplates()]);
    } else {
      return this.routeTemplates();
    }
  },

  routeTemplates: function() {
    return new Funnel('../../dashboards', {
      include: ['**/*.hbs']
    });
  },

  dashboardConfigs: function() {
    return new Funnel('../../dashboards', {
      include: ['**/*.js'],
      destDir: 'dashboards'
    });
  }
};
