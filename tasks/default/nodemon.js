import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import errorHandler from '../error';

gulp.task('nodemon', (cb) => {
      return nodemon({
                    script: './app.js',
                    ext: '.js',
                    env: { 'NODE_ENV': 'development' },
                    ignore: ['node_modules', 'public']
                  })
                .on('restart', function() {
                    console.log('Change detected, restarting the server...');
                });
});   