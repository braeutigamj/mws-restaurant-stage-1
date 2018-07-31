var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('build-main', () => {
  return gulp.src('src/js/main.ts')
    .pipe(webpack({
    devtool: 'source-map',
    watch: true,
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
  .pipe(gulp.dest('js/'));
});

gulp.task('build-restaurant', () => {
  return gulp.src('src/js/restaurant.ts')
    .pipe(webpack({
    devtool: 'source-map',
    watch: true,
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
  .pipe(gulp.dest('js/'));
});
