var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var gIf = require('gulp-if');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var handleError = require('../util/handleError');
var browser = require('browser-sync').get('server');
var sourceMap = require('gulp-sourcemaps');
var less = require('gulp-less');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var config = require('../config');
var path = require('path');
var urlCDN = require('../util/url-cdn');


var dev = process.env.NODE_ENV === 'production';

var paths = {
    src: path.join(config.root,"{" + config.tasks.css.src.join(',') + ",!" + config.tasks.css.ingoreFold.join(',!') +"}",
                    '**/*.{'+ config.tasks.css.extensions.join(',') +'}'),
    dest: path.join(dev ? config.build.dest:config.dev.dest,config.static,config.tasks.css.dest)
}
var postcssConfig = [
    autoprefixer(config.tasks.css.postcss.autoprefixer),
    px2rem(config.tasks.css.postcss.px2rem)
];

function checkFilePathExits(file){
    return !dev && /\.less$/.test(file.path);
}

var cssTask = function(){
    return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(changed(paths.dest))
    .pipe(gIf(!dev,sourceMap.init({loadMaps: true})))
    .pipe(gIf(checkFilePathExits,less()))
    .pipe(postcss(postcssConfig))
    .pipe(urlCDN(config.CDN))
    .pipe(gIf(!dev,sourceMap.write('./maps')))
    .pipe(rename(function(p){
        p.dirname = '';
    }))
    .on('error',handleError)
    .pipe(gulp.dest(paths.dest))
    .pipe(gIf(!dev,browser.stream()))
}

gulp.task('css',cssTask);

module.exports = cssTask;
