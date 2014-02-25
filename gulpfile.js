'use strict';

var gulp = require('gulp'),
    tasks = require('gulp-load-plugins')({scope: ['devDependencies']}),
    plumber = tasks.plumber;

gulp.task('lint', function (done) {
  var fs = require('fs'),
      jshint = tasks.jshint,
      config = JSON.parse(String(fs.readFileSync('./.jshintrc', 'utf8'))),
      stylish = require('jshint-stylish');

  gulp.src(['./gulpfile.js', './lib/**/*.js', './test/**/*.js', './examples/**/*.js'])
    .pipe(plumber())
    .pipe(jshint(config))
    .pipe(jshint.reporter(stylish))
    .on('end', done);
});

gulp.task('test', ['lint'], function (done) {
  var mocha = tasks.mocha;

  gulp.src(['./test/**/*.js', '!./test/fixtures/*'])
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('end', done);
});

gulp.task('sloc', function (done) {
  var sloc = tasks.sloc;

  gulp.src('./lib/**/*.js')
    .pipe(plumber())
    .pipe(sloc())
    .on('end', done);

});

gulp.task('default', ['test', 'sloc'], function () {

  gulp.watch(['./gulpfile.js', './lib/**/*.js', './test/**/*.js', './examples/**/*.js'], function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('lint', 'test', 'sloc');
  });

});

gulp.task('ci', ['test', 'sloc'], function () {});