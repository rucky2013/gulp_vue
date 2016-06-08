var gulp = require('gulp');
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var browser = require('browser-sync').get('server');

var path = require('path');
var config = require('../config');
var handleError = require('../util/handleError');

var dev = process.env.NODE_ENV === 'production';

var paths = {
    src: path.join(config.root,config.static,config.tasks.images.src,'**/*.{' + config.tasks.images.extensions.join(',') + '}'),
    dest: path.join(dev?config.build.dest:config.dev.dest,config.static,config.tasks.images.dest)
}


var imageminTask = function (){
    return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(changed(paths.dest))
    .pipe(imagemin(Object.assign(config.tasks.images.imagemin,{
        use: [pngquant()]
    })))
    .on('error',handleError)
    .pipe(gulp.dest(paths.dest))
    .pipe(browser.stream())
}

gulp.task('images',imageminTask);

module.exports = imageminTask;
