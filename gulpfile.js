"use strict";

let gulp = require('gulp'),
    pug = require('gulp-jade'),
    sass = require('gulp-sass');

const srcDir = './src',
    jsDir = './js',
    cssDir = './css',
    vendorDir = './node_modules',
    distDir = './';

// Utility function to copy specific sub-folders to the dist folder
let copy = (targetDir) =>
    gulp.src(`${srcDir}/**/${targetDir}/*`)
        .pipe(gulp.dest(distDir));

// Copy images to images folders
gulp.task('assets', () => copy('images'));


gulp.task('vendor scripts', () =>
    gulp.src([
            `${vendorDir}/bootstrap/dist/js/bootstrap.js`,
            `${vendorDir}//jquery/dist/jquery.js`
        ]).pipe(gulp.dest(jsDir)));

// Copy javascript to javascript folders
gulp.task('scripts', () => copy('js'));

// Compile Pug files
gulp.task('pug', () => {
    let YOUR_LOCALS = {
        v: "2.0.0"
    };

    return gulp.src('./pug/**/*.pug')
        .pipe(pug({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(distDir));
});

// Compile SASS files
gulp.task('sass', () =>
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
);

// By default, do all
gulp.task('default', gulp.parallel('assets', 'vendor scripts', 'scripts', 'sass', 'pug'));