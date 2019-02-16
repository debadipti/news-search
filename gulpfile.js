const { src, dest, task } = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
sass.compiler = require("node-sass");

task("copyHtml", () => {
  src("./*.html").pipe(dest("dist/"));
});

task("sass", () => {
  src("assets/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("dist/css/"));
});

task("minifyJs", () => {
  src("assets/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(dest("dist/js/"));
});
