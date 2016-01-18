'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('default', function() {
  return gulp.src(['src/*.js', 'test/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});
