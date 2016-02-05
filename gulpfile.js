var path        = require('path'),

    gulp        = require('gulp'),
    shell       = require('gulp-shell'),
    runSequence = require('run-sequence'),

    escapeChar  = process.platform.match(/^win/) ? '^' : '\\',
    cwd         = process.cwd().replace(/( |\(|\))/g, escapeChar + '$1'),
    emberPath   = path.resolve(cwd + '/lib/client/node_modules/.bin/ember'),
    bowerPath   = path.resolve(cwd + '/node_modules/.bin/bower');

var emberOptions = {
  cwd: path.resolve(process.cwd() + '/lib/client/')
};

gulp.task('serve', shell.task(emberPath + ' s', emberOptions));

gulp.task('client:bower', shell.task(bowerPath + ' install'));

gulp.task('client:npm', shell.task('npm install', emberOptions));

gulp.task('init', function(callback) {
  return runSequence(['client:bower', 'client:npm'], callback);
});

gulp.task('test', shell.task(emberPath + ' test', emberOptions));

gulp.task('validate', function(callback) {
  runSequence('init', 'test', callback);
});

gulp.task('ghpages', shell.task(emberPath + ' build --environment ghpages', emberOptions));

gulp.task('default', function() {
  console.log(cwd);
});
