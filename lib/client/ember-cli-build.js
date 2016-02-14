/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    Concat   = require('broccoli-concat');

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

  var extraJs = new Concat('../../assets/js', {
    inputFiles: ['**/*.js'],
    outputFile: 'assets/mockboard-vendor.js',
    allowNone: true
   });

  var extraCss = new Concat('../../assets/styles', {
    inputFiles: ['**/*.css'],
    outputFile: 'assets/mockboard-vendor.css',
    allowNone: true
  });

  app.import('vendor/jquery.gridster.css');
  app.import('vendor/jquery.gridster.js');

  return app.toTree([extraJs, extraCss]);
};
