const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('css', () => {
  gulp.src('src/scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions', '> 1%'] }))
    .pipe(cssnano())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
});

gulp.task('js', () => {
  gulp.src('src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
});

gulp.task('serve', () => {
  browserSync.init({ server: { baseDir: './' } });
  gulp.watch('src/scss/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['serve']);
