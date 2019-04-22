const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();

const paths = {
  source: {
    scripts: [
      'src/js/main.js',
    ],
    styles: [
      'src/scss/**/*.scss'
    ]
  },
  target: {
    scripts: 'dist/js',
    styles: 'dist/css',
    sourcemaps: './maps',
  }
};

gulp.task('styles', () => {
  gulp.src(paths.source.styles)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.concat('app.css'))
    .pipe($.autoprefixer({browsers: ['last 2 versions', '> 1%', 'Firefox ESR']}))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.styles))
    .pipe(browserSync.stream())
});

gulp.task('scripts', () => {
  gulp.src(paths.source.scripts)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('app.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.scripts))
    .pipe(browserSync.stream())
});

gulp.task('serve', () => {
  browserSync.init({ server: { baseDir: './' } });
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('default', ['scripts', 'styles', 'serve']);
