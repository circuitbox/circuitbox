'use strict';

var fs = require('fs');
var gulp = require('gulp');
var tasks = require('gulp-load-tasks')({scope: ['devDependencies']});
var stylish = require('jshint-stylish');

var plumber = tasks.plumber;

gulp.task('lint', function (done) {
  var jshint = tasks.jshint,
      config = JSON.parse(String(fs.readFileSync('./.jshintrc', 'utf8')));

  gulp.src(['./gulpfile.js', './lib/**/*.js', './test/**/*.js', './examples/**/*.js'])
    .pipe(plumber())
    .pipe(jshint(config))
    .pipe(jshint.reporter(stylish))
    .on('end', function () {
      done();
    });
});

gulp.task('instrument', ['lint'], function (done) {
  gulp.src(['./lib/**/*.js'])
    .pipe(plumber())
    .pipe(tasks.istanbul())
    .on('end', function () {
      done();
    });
});

gulp.task('test', ['instrument'], function (done) {
  gulp.src(['./test/**/*.js', '!./test/fixtures/*'])
      .pipe(plumber())
      .pipe(tasks.mocha({reporter: 'spec'}))
      .pipe(tasks.istanbul.writeReports())
      .on('end', function () {
        done();
      });
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