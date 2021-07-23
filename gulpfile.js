const gulp = require("gulp"); //https://gulpjs.com/
const rename = require("gulp-rename"); //https://www.npmjs.com/package/gulp-rename
const plumber = require("gulp-plumber"); //https://www.npmjs.com/package/gulp-plumber
const cssnano = require("gulp-cssnano"); //https://www.npmjs.com/package/gulp-cssnano https://cssnano.co/
const gulpImport = require("gulp-html-import"); //https://www.npmjs.com/package/gulp-html-imports
const htmlmin = require("gulp-htmlmin"); //https://www.npmjs.com/package/gulp-htmlmin
const imagemin = require("gulp-imagemin"); //https://www.npmjs.com/package/gulp-imagemin
// const cacheBust = require("gulp-cache-bust"); //https://www.npmjs.com/package/gulp-cache-bust
var browserSync = require("browser-sync").create(); //https://www.browsersync.io/

gulp.task('html', async function () {
  gulp.src('./src/index.html')
  .pipe(gulpImport('./src/html/'))
  .pipe(gulpImport('./src/html/components/'))
  // .pipe(cacheBust({
  //   type: 'timestamp'
  // }))
  .pipe(gulp.dest('public'))
  .pipe(browserSync.stream());
  
  // gulp.src('./src/html/')
  // .pipe(gulpImport('./src/html/components/'))
  // .pipe(gulp.dest('public'))
  // .pipe(browserSync.stream());
});

gulp.task('assets', async function(){
  gulp.src('./src/assets/*.*').pipe(gulp.dest('./public/assets/')).pipe(browserSync.stream());
})

gulp.task("css", function (done) {
  const postcss = require("gulp-postcss");

  return (
    gulp
      .src("src/css/tailwind.css")
      .pipe(plumber())
      .pipe(
        postcss([
          // ...
          require("postcss-import"),
          require("tailwindcss"),
          require("autoprefixer"),
          // ...
        ])
      )
      .pipe(rename("adis_urban.css"))
      .pipe(gulp.dest("public/"))
      .pipe(browserSync.stream()),
    done()
  );
});

gulp.task("server", async () => {
  browserSync.init({
    server: "./public",
    port:3000,
    ui:{
      port: 3001,
    }, 
    notify: false
  });
  gulp.watch("./src/css/**/*.css", gulp.series("css"));
  gulp.watch("./src/assets/*.*", gulp.series("assets"));
  gulp.watch("./src/**/*.html", gulp.series('html','css')).on("change", browserSync.reload);
});

gulp.task('app', async function () {
  gulp.src('./src/index.html')
    .pipe(gulpImport('./src/html/'))
    .pipe(htmlmin({
      collapseWhitespace: false,
      removeComments: true
    }))
    .pipe(gulp.dest('app'));
  gulp.src('./public/adis_urban.css')
    .pipe(cssnano("adis_urban.css")).pipe(gulp.dest('./app/'));
  gulp.src('./public/assets/*.*').pipe(imagemin()).pipe(gulp.dest('./app/assets/'))
});