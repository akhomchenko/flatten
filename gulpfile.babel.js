import del from 'del';
import path from 'path';

import gulp from 'gulp';
import _if from 'gulp-if';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';

const PATHS = {
  src: './lib/**/*.js',
  tests: './test/**/*.js',
  dest: './dist'
};
let failOnError = true;

gulp.task('clean', (cb) => {
  del([path.join(PATHS.dest, '**/*')], cb);
});

gulp.task('lint', () =>
    gulp.src([PATHS.src, PATHS.tests])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(_if(failOnError, eslint.failAfterError()))
);

gulp.task('test', ['lint'], () => {
  const pipe = gulp.src(PATHS.tests, {read: false}).pipe(mocha());

  if (!failOnError) {
    pipe.on('error', function () {
      this.emit('end');
    });
  }

  return pipe;
});

gulp.task('build', ['clean', 'lint', 'test'], () =>
    gulp.src(PATHS.src)
      .pipe(babel())
      .pipe(gulp.dest('dist'))
);

gulp.task('allow-fail', () => {
  failOnError = false;
});

gulp.task('watch', ['allow-fail', 'build'], () => {
  gulp.watch([PATHS.src, PATHS.tests], ['build']);
});

gulp.task('default', ['build']);
