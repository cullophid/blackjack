var gulp = require('gulp'),
  watch = require('gulp-watch'),
  browserify = require('gulp-browserify'),
  rename = require('gulp-rename'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function () {
  return gulp.src('app/js/app.js')
  .pipe(browserify({
    debug : true
  }))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('app/'))
  .pipe(livereload());
});

gulp.task('live', ['build'], function() {
  livereload.listen();
  gulp.watch('app/js/**/*.js', ['build']);
  gulp.watch([
     'app/images/**',
     'app/index.html'
  ])
    .on('change', livereload.changed);
});
