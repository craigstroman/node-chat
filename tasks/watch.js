import gulp from 'gulp';

gulp.task('watch', () => {
    gulp.watch( './client/scss/**/*.scss', ['build-css']);
    gulp.watch(['./app.js', './chatServer.js', './client/js/**/*.js', './client/js/**/*.html', '!./node_modules/**', '!./public/**'], ['lint-js', 'webpack']);
});