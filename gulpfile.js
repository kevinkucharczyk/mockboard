var path        = require('path'),
    spawn       = require('child_process').spawn,
    chalk       = require('chalk'),

    gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    nodemon     = require('gulp-nodemon'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    jscs        = require('gulp-jscs'),

    escapeChar  = process.platform.match(/^win/) ? '^' : '\\',
    cwd         = process.cwd().replace(/( |\(|\))/g, escapeChar + '$1'),
    emberPath   = path.resolve(cwd + '/lib/client/node_modules/.bin/ember'),
    bowerPath   = path.resolve(cwd + '/node_modules/.bin/bower');

var emberOptions = {
  cwd: path.resolve(process.cwd() + '/lib/client/')
};

function _logStdOut(id, data) {
  var logData = data.toString().replace(/\n$/, '');
  console.log('[' + chalk.gray(new Date().toString().split(' ')[4])+ '] ' + chalk.green('[' + id + '] ') + logData);
}

function _logStdErr(id, data) {
  var logData = data.toString().replace(/\n$/, '');
  console.log('[' + chalk.gray(new Date().toString().split(' ')[4])+ '] ' + chalk.red('[' + id + '] ') + logData);
}

function _spawn(id, cmd, args, opts, callback) {
  var command = spawn(cmd, args, opts);
  command.stdout.on('data', function(data) {
    _logStdOut(id, data);
  });
  command.stderr.on('data', function(data) {
    _logStdErr(id, data);
  });
  command.on('close', function(code) {
    callback(code);
  });
  return command;
}

gulp.task('client:bower', function(callback) {
  return _spawn('bower', bowerPath, ['install'], {}, callback);
});

gulp.task('client:serve', function(callback) {
  return _spawn('Ember serve', emberPath, ['s'], emberOptions, callback);
});

gulp.task('client:npm', function(callback) {
  return _spawn('client npm', 'npm', ['install'], emberOptions, callback);
});

gulp.task('client:build', function(callback) {
  return _spawn('Ember build', emberPath, ['build', '--environment=production'], emberOptions, callback);
});

gulp.task('client:watch', function(callback) {
  return _spawn('Ember watch', emberPath, ['build', '--watch'], emberOptions, callback);
});

gulp.task('client:test', function(callback) {
  return _spawn('Ember test', emberPath, ['test'], emberOptions, callback);
});

gulp.task('server:watch', function () {
  nodemon({
    script: 'index.js',
    ext: 'js json',
    watch: ['index.js', 'lib/server/**/*.js', 'jobs/*.js'],
    stdout: false
  })
  .on('readable', function() {
    this.stdout.on('data', function(data) {
      _logStdOut('Server watch', data);
    });

    this.stderr.on('data', function(data) {
      _logStdErr('Server watch', data);
    });
  });
});

gulp.task('server:serve', function(callback) {
  return _spawn('Server serve', 'node', ['index.js'], {}, callback);
});

gulp.task('init', function(callback) {
  return runSequence(['client:bower', 'client:npm'], callback);
});

gulp.task('validate', function(callback) {
  return runSequence('init', 'jshint', 'jscs', 'client:test', callback);
});

gulp.task('ghpages', function(callback) {
  return _spawn('Ember ghpages', emberPath, ['build', '--environment=ghpages'], emberOptions, callback);
});

gulp.task('jshint', function() {
  return gulp.src(['index.js', 'jobs/*.js', 'lib/server/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('jscs', function() {
  return gulp.src(['index.js', 'jobs/*.js', 'lib/server/**/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('dev', ['client:watch', 'server:watch']);
