/*jshint node:true*/
const Funnel = require('broccoli-funnel'),
      Merge  = require('broccoli-merge-trees');

module.exports = {
  name: 'import-widgets',

  treeForApp: function(tree) {
    if (tree) {
      return Merge([tree, this.podsComponents()]);
    } else {
      return this.podsComponents();
    }
  },

  treeForTemplates: function(tree) {
    if (tree) {
      return Merge([tree, this.podsTemplates()]);
    } else {
      return this.podsTemplates();
    }
  },

  podsComponents: function() {
    return new Funnel('../../widgets', {
      destDir: 'pods/components'
    });
  },

  podsTemplates: function() {
    return new Funnel('../../widgets', {
      include: ['**/*.hbs'],

      getDestinationPath: function(relativePath) {
        if (relativePath.indexOf('/template.hbs') !== -1) {
          return 'components/' + relativePath.substr(0, relativePath.lastIndexOf('/')) + '.hbs';
        } else {
          return relativePath;
        }
      }
    });
  }
};
