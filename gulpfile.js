var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
  	.pipe(sass())
    .pipe(gulp.dest('src'));
});

gulp.task('default', function(){
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  // Other watchers
})