const gulp = require('gulp')
const mocha = require('gulp-mocha')
const eslint = require('gulp-eslint')
const gulpStylelint = require('gulp-stylelint')

require('./src/compiler.js')
require('babel-core/register')

gulp.task('lint', ['mocha', 'lint-css'], () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('lint-css', ['mocha'], () => {
  return gulp
    .src('./src/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
})

gulp.task('mocha', () => {
  return gulp
    .src([
      './src/specHelper.js',
      './src/**/_tests_/*.spec.js',
      './test/**/*.js'
    ], { read: false })
    .pipe(mocha({
      reporter: 'dot'
    }))
})

gulp.task('watch', () => {
  gulp.watch([
    './src/**/*.js',
    './src/**/_tests_/*.spec.js',
    './lib/**/*.js',
    './test/**/*.js'
  ], ['lint'])

  gulp.watch(['./src/**/*.css'], ['lint-css'])
})

gulp.task('default', [
  'lint',
  'watch'
])
