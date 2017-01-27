import gulp from 'gulp';
import eslint from 'gulp-eslint';
import errorHandler from '../error';

gulp.task('lint-js', () => {
    return gulp.src( ['./app.js', './chatServer.js', './client/js/**/*.js', '!./public/js/**/', '!./node_modules/**'] )
        .pipe( eslint() )
        .pipe( eslint.format() )
        .on('error', errorHandler(eslint))
        .pipe( eslint.failOnError() );
});