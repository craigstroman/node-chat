import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import requireDir from 'require-dir';

// Pulling in all tasks from the tasks folder
requireDir('./tasks', { recurse: true });

// Define the default task.
gulp.task('default', ['watch','nodemon']);

// Define the build task.
//gulp.task('build', ['minify-js', 'minify-css', 'update-html', 'copy-files']);