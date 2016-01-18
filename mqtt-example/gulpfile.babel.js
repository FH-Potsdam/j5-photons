'use strict';
import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('babel', ()=>{
  return gulp.src('src/**/*.js')
  .pipe(babel({
    presets:['es2015']
}))
  .pipe(gulp.dest('app'));
});

gulp.task('watch', ()=>{
  gulp.watch('src/**/*.js',['babel']);
});

gulp.task('default',['watch','babel']);

