import gulp from 'gulp';

gulp.task('watch', () => {
    gulp.watch( './client/scss/**/*.scss', ['build-css']);
    gulp.watch(['./**/.js', './public/js/**/*.js', '!./node_modules/**', '!./public/bower_components/**'], ['lint-js']);
    //gulp.watch('./src/app/partials/**/*.html', ['cache-bust']);
});