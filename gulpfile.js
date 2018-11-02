var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

var reload = browserSync.reload;

gulp.task('browser-sync', function () {
  var files = [
    'dist/js/*.js',
    'dist/css/*.css',
    './style.css',
    '**/*.html'
  ];

  browserSync.init(files, {
    server: {
      baseDir: 'dist',
    },
  });
});

// gulp.task('build-sass', function () {
//   return gulp.src('src/sass/*.scss')
//     .pipe(sass())
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions', 'Android < 4.4'],
//       cascade: false
//     }))
//     .pipe(concat('themestyle.min.css'))
//     .pipe(cleancss())
//     .pipe(gulp.dest('dist/css/'))
//     .pipe(reload({
//       stream: true
//     }));
// });

gulp.task('build-css', function () {
  return gulp.src('src/css/*.css')
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android < 4.4'],
      cascade: false
    }))
    .pipe(concat('style.min.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(reload({
      stream: true
    }));
})

gulp.task('build-js', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('dev', ['build-css', 'build-js', 'browser-sync'], function () {
  // gulp.watch('src/**/*.scss', ['build-sass']);
  gulp.watch('src/**/*.css', ['build-css']);
  gulp.watch('src/**/*.js', ['build-js']);
  gulp.watch('./style.css').on('change', reload);
});