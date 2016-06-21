/**
 * @task html文件编译任务
 *       css文件注入，js文件注入
 */

var config = require('../config'),
    path = require('path'),
    gulp = require('gulp'),
    browser = require('browser-sync').get('server'),
    gIf = require('gulp-if'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),
    htmlInsert = require('../util/html-insert'),
    urlCDN = require('../util/url-cdn');

var handleError = require('../util/handleError')

var dev = process.env.NODE_ENV === 'production';

var paths = {
    src: [path.join(config.root,config.tasks.html.src,'{*/*,*}.html')],
    dest: path.join(dev ? config.build.dest : config.dev.dest, config.tasks.html.dest)
}
var reg = new RegExp('('+config.root+")(\/|\\\\)("+config.tasks.html.src+')(\/|\\\\)?','i');

function renameOption (paths){
    var basename = paths.dirname.replace(reg,'');
    paths.dirname =  config.tasks.html.src;
    paths.basename = basename || 'index';
}

var htmlTask = function (){
    return gulp.src(paths.src,{
        base:process.cwd()
    })
    .pipe(plumber())
    .pipe(changed(paths.dest))
    .pipe(htmlInsert(config.tasks.html.htmlInsert))
    .pipe(urlCDN(config.CDN))
    .pipe(gIf(dev,htmlmin(config.tasks.html.htmlmin)))
    /**
     * 修改文件输出路径及文件名称 映射 src/views 目录
     * 以文件夹名称作为一个view文件名
     * 规范文件输出结构
     */
    .pipe(rename(renameOption))
    .on('error',handleError)
    .pipe(gulp.dest(paths.dest))
    .pipe(gIf(dev,browser.stream()))
}

gulp.task('html',htmlTask);

module.exports = htmlTask;
