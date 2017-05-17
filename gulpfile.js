var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    jwt = require('jsonwebtoken'),
    fs = require('fs'),
    argv = require('yargs').argv

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


// Use it: gulp decode --token jwt-token
gulp.task("decode", () => {
    const token = argv.token;
    var decoded = jwt.decode(token);
    console.log(decoded);
});