'use strict';

var fs = require('fs');
var gulp = require('gulp');
var tasks = require('gulp-load-tasks')({scope: ['devDependencies']});

function loadJsHintConfig() {
  return JSON.parse(String(fs.readFileSync('./.jshintrc', 'utf8')));
}

gulp.task('lint', function () {
  var jshint = tasks.jshint,
      config = loadJsHintConfig();

  gulp.src(['./gulpfile.js', './lib/**/*.js', './test/**/*.js', './examples/**/*.js'])
    .pipe(jshint(config))
    .pipe(jshint.reporter('default'));
});

gulp.task('test', ['lint'], function () {
  gulp.src('./test/**/*.js')
    .pipe(tasks.mocha({reporter: 'spec'}));
});

gulp.task('default', ['test'], function () {
  gulp.watch(['./gulpfile.js', './lib/**/*.js', './test/**/*.js', './examples/**/*.js'], function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('test');
  });
});

gulp.task('ci', ['test'], function () {});