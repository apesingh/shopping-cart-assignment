const gulp = require('gulp'),
concatCss = require('gulp-concat-css'),
clean = require('gulp-clean'),
sass = require('gulp-sass');

gulp.task('styles', function(){
return gulp.src([
    'style/*.scss'
])
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('style'))
});

//Auto prefix
const autoprefixer = require('gulp-autoprefixer');
gulp.task('prefix', () =>
    gulp.src([
        'style/*.css'
    ])
    .pipe(autoprefixer({
            browsers: ['last 99 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('style'))
);

//Clean bundle.css
gulp.task('clean', () =>
    gulp.src([
        'style/bundle.css',
    ])
    .pipe(clean({force: false}))
);

//Create bundle of all css files
gulp.task('concatCss', () =>
    gulp.src([
        'style/*.css',
        '!style/reset.css' // <== ignore this file for concat
    ])
    //.pipe(clean({force: false}))
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('style'))
);


//Default task array
gulp.task("default", gulp.series('styles','prefix')); 

 
