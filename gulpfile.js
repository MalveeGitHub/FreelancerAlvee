var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");
var minify = require("gulp-minify");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
let cleanCSS = require('gulp-clean-css');
var htmlMin = require("gulp-htmlmin");

//Copy HTML
gulp.task("copyHtml", function(){
  gulp.src("./src/index.html")
    .pipe(htmlMin({collapseWhitespace: true}))
      .pipe(gulp.dest("./dist/"));
});

//Compile sass + Minify + prefixes
gulp.task("compileSass", function(){
  gulp.src("./src/sass/*.scss")
  .pipe(plumber())
  .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest("./dist/assets/styles/"));
});


//Uglify JS --- javascript
gulp.task("uglifyJs",function(){
  gulp.src(["./src/js/jquery.js","./src/js/app.js","./src/js/app2.js"])
    .pipe(concat('app.js', {newLine: ';'}))
      .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"));
});

//jQuery plugin
gulp.task("jquery-plug",function(){
  gulp.src(["./src/js/smoothscroll.js"])
    .pipe(concat('jquery-plug.js', {newLine: ';'}))
      .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"));
});

//Copy Image
gulp.task("image",function(){
  gulp.src("./src/assets/images/*")
    // .pipe(imagemin())
    .pipe(gulp.dest("./dist/assets/images/"));
});

//watch src
gulp.task("watch",function(){
  gulp.watch("./src/sass/style.scss",["compileSass"]);
  gulp.watch("./src/js/*.js",["uglifyJs"]);
  gulp.watch("./src/js/*.js",["jquery-plug"]);
  gulp.watch("./src/index.html",["copyHtml"]);
});

gulp.task("default", ["copyHtml", "compileSass", "watch","image","uglifyJs","jquery-plug"]);
