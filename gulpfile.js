var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path');

gulp.task('default', ['transpile'], () => {});

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("transpile", () => {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js.pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../dist/'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task("watch", () => {
    gulp.watch("**/*.ts", ["transpile"]);
});