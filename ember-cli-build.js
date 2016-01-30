/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components/foundation-sites/scss'
      ]
    },
    autoprefixer: {
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
      cascade: false
    }
  });

  return app.toTree();
};
