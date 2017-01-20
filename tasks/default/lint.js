import gulp from 'gulp';
import eslint from 'gulp-eslint';
import errorHandler from '../error';

gulp.task('lint-js', () => {
    return gulp.src( ['./**/.js', './public/js/**/*.js', '!./node_modules/**', '!./public/bower_components/**'] )
        .pipe( eslint() )
        .pipe( eslint.format() )
        .on('error', errorHandler(eslint))
        .pipe( eslint.failOnError() );
});