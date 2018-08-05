var gulp = require('gulp');
var webpack = require('webpack-stream');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');

gulp.task('main-js', () => {
  return gulp.src('src/js/main.ts')
    .pipe(webpack({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: '[name].js',
      library: 'Restaurant',
      libraryTarget: 'umd'
    }
  }))
  .pipe(minify())
  .pipe(gulp.dest('js/'));
});

gulp.task('main-css', () => {
  return gulp.src('src/css/main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('css/'));
});

gulp.task('restaurant-js', () => {
  return gulp.src('src/js/restaurant.ts')
    .pipe(webpack({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'restaurant.js',
      library: 'Restaurant',
      libraryTarget: 'umd'
    }
  }))
  .pipe(minify())
  .pipe(gulp.dest('js/'));
});

gulp.task('restaurant-css', () => {
  return gulp.src('src/css/restaurant.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('css/'));
});
