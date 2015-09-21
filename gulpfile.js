var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var ghPages = require('gulp-gh-pages');
var ngAnnotate = require('gulp-ng-annotate');
var merge2 = require('merge2');

gulp.task('concatJs', function () {
  var thirdParty = gulp.src([
      'bower_components/ace-builds/src-noconflict/ace.js',
      'bower_components/ace-builds/src-noconflict/ext-language_tools.js',
      'bower_components/ace-builds/src-noconflict/mode-javascript.js',
      "bower_components/angular/angular.js",
      "bower_components/angular-ui-ace/ui-ace.js",
      "bower_components/jasmine-core/lib/jasmine-core/jasmine.js",
      "bower_components/jasmine-core/lib/jasmine-core/jasmine-html.js"
  ]);

  var firstParty = gulp.src('scripts/*.js').pipe(ngAnnotate());

  return merge2(thirdParty, firstParty)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('aceWorker', function () {
  return gulp.src(
      'bower_components/ace-builds/src-noconflict/worker-javascript.js'
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('copyPublic', function () {
  return gulp.src('public/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['default'], function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['concatJs', 'aceWorker', 'copyPublic']);
