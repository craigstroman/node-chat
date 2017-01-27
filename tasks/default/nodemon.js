import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import errorHandler from '../error';

gulp.task('nodemon', (cb) => {
      return nodemon({
                    script: './server/app.js',
                    ext: '.js .pug',
                    env: { 'NODE_ENV': 'development' },
                    ignore: ['./node_modules', './public', './client']
                  })
                .on('restart', function() {
                    console.log('Change detected, restarting the server...');
                });
});   