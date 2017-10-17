"use strict";

let gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass');

gulp.task('jade', () => {
    let YOUR_LOCALS = {};

    gulp.src('./jade/**/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', () => {
    return gulp.src('./cv/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./cv/css'));
});

gulp.task('default', ['sass', 'jade']);