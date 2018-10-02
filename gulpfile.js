"use strict";

let gulp = require('gulp'),
    pug = require('gulp-jade'),
    sass = require('gulp-sass');

gulp.task('pug', () => {
    let YOUR_LOCALS = {
        v: "2.0.0"
    };

    return gulp.src('./pug/**/*.pug')
        .pipe(pug({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', () =>
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
);

gulp.task('default', gulp.parallel('sass', 'pug'));