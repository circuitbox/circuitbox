'use strict';

var fs = require('fs');
var gulp = require('gulp');
var tasks = require('gulp-load-tasks')({scope: ['devDependencies']});
var stylish = require('jshint-stylish');

function loadJsHintConfig() {
  return JSON.parse(String(fs.readFileSync('./.jshintrc', 'utf8')));
}

gulp.task('lint', function (done) {
  var jshint = tasks.jshint,
      config = loadJsHintConfig();

  gulp.src(['./gulpfile.js', './lib/**/*.js', './test/**/*.js', './examples/**/*.js'])
    .on('end', function () {
      done();
    })
    .pipe(tasks.plumber())
    .pipe(jshint(config))
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', ['lint'], function (done) {
  gulp.src(['./test/**/*.js', '!./test/fixtures/*'])
    .on('end', function () {
      done();
    })
    .pipe(tasks.plumber())
    .pipe(tasks.mocha({reporter: 'spec'}));
});

gulp.task('sloc', function (done) {
  gulp.src('./lib/**/*.js')
    .on('end', function () {
      done();
    })
    .pipe(tasks.plumber())
    .pipe(tasks.sloc());
});

gulp.task('default', ['test', 'sloc'], function () {
  gulp.watch(['./gulpfile.js', './lib/**/*.js', './test/**/*.js', './examples/**/*.js'], function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('lint', 'test', 'sloc');
  });
});

gulp.task('ci', ['test', 'sloc'], function () {});