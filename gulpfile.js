var gulp = require('gulp'),
sass = require('gulp-sass');
gulp.task('styles', function(){
return gulp.src(['style/*.scss'])
.pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('style'))
});

//Default task array
gulp.task("default", gulp.series('styles')); 

const autoprefixer = require('gulp-autoprefixer');

gulp.task('prefix', () =>
    gulp.src(['style/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 99 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('style'))
);
 
