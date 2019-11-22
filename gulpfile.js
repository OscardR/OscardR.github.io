import gulp from 'gulp'
import pug from 'gulp-jade'
import minify from 'gulp-minify'
import sass from 'gulp-sass'

//---------
// Setup
//---
const DIR = {
  SRC: './src',
  DIST: './public',
  get JS() {
    return `${this.DIST}/js`;
  },
  get CSS() {
    return `${this.DIST}/`;
  },
  VENDOR: './node_modules'
};


//-------------------------------------
// Utility function to copy specific
// sub-folders to the dist folder
//----------------------------
let copy = (targetDir) => gulp
  .src(`${DIR.SRC}/**/${targetDir}/*`)
  .pipe(gulp.dest(DIR.DIST));


//---------------------------------
// Copy images to images folders
//---------------------------
gulp.task('assets', () => copy('images'));


//------------------
// Vendor Scripts
//------------
gulp.task('vendor scripts', () => gulp
  .src([
    `${DIR.VENDOR}/bootstrap/dist/js/bootstrap.js`,
    `${DIR.VENDOR}/jquery/dist/jquery.js`
  ])
  .pipe(minify({
    ext: {src: '.js', min: '.min.js'}
  }))
  .pipe(gulp.dest(DIR.JS))
);


//-----------------------------------------
// Copy javascript to javascript folders
//-----------------------------------
gulp.task('scripts', () => copy('js'));


//---------------------
// Compile Pug files
//---------------
gulp.task('pug', () => {
  const LOCALS = {
    v: "2.0.0"
  };

  return gulp
    .src(`${DIR.SRC}/**/*.pug`)
    .pipe(pug({
      locals: LOCALS
    }))
    .pipe(gulp.dest(DIR.DIST));
});


//----------------------
// Compile SASS files
//----------------
gulp.task('sass', () => gulp
  .src([`${DIR.SRC}/**/*.sass`, `${DIR.SRC}/**/*.scss`])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(DIR.CSS))
);


//----------------------
// By default, do all
//----------------
gulp.task('default', gulp.parallel('assets', 'vendor scripts', 'scripts', 'sass', 'pug'));