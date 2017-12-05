// Includiamo Gulp
var gulp = require('gulp');

// Includiamo i Plugins
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var notify       = require('gulp-notify');
var imagemin     = require('gulp-imagemin');

/**
*
* Compiliamo i file sass
* - Compile
* - Compress/Minify
* - Autoprefixer
*
**/
gulp.task('sass', function () {
  var processors = [
        autoprefixer({browsers: [
                                  "Android 2.3",
                                  "Android >= 4",
                                  "Chrome >= 20",
                                  "Firefox >= 24",
                                  "Explorer >= 8",
                                  "iOS >= 6",
                                  "Opera >= 12",
                                  "Safari >= 6"
                                ]}),
        cssnano
    ];
  return gulp.src('css/*.scss')
     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
     .pipe(postcss(processors))
     .pipe(gulp.dest('../dist/css/'))
     .pipe(notify('Sass Compilato e Minificato'));
});

/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('browser-sync', function() {
  browserSync({
    server: {
            baseDir: "./"
        }
  });
});

/**
*
* Compressione immagini
* - Compress them!
*
**/
gulp.task('images', function () {
  return gulp.src('img/**/*{jpg,png,gif}')
		.pipe(imagemin({
			progressive: true,
      optimizationLevel: 4,
      interlaced: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest('../dist/img/'));
});

/**
*
* Controlliamo le modifiche ai file e lanciamo i task
*
**/
gulp.task('watch', function() {
  gulp.watch('img/**/*', ['images']);
  gulp.watch('css/**/*.scss', ['sass']);
});
