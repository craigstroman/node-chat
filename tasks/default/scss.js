import gulp from 'gulp';
import errorHandler from '../error';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';

gulp.task('build-css', () => {
    return gulp.src( './client/scss/**/*.scss' )
        .pipe( sass() )
        .on('error', errorHandler(sass))
        .on('success', function() {
            sourceMaps.init()
        })
        .pipe(sourceMaps.write('./public/css/'))
        .pipe( sourceMaps.init() )
        .pipe( gulp.dest('./public/css/', {overwrite: true}) );
});   