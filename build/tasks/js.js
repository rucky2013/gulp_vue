var config = require('../config'),
    path = require('path'),
    through = require('through2'),
    gulp = require('gulp'),
    browser = require('browser-sync').get('server'),
    webpack = require('gulp-webpack'),
    gIf = require('gulp-if'),
    rename = require('vinyl-named')
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    sourceMap = require('gulp-sourcemaps');

var handleError = require('../util/handleError');
var devWebpackConf = require('../webpack/webpack.config.dev');
var prodWebpackConf = require('../webpack/webpack.config.prod');

var dev = process.env.NODE_ENV === 'production';

var paths = {
    src: [path.join(config.root,config.tasks.js.src, "{*/*,*}.js")],
    dest: path.join(dev ? config.build.dest : config.dev.dest,config.static,config.tasks.js.dest)
}

var checkNoCss = function(file){
    return !dev && !/\.css$/.test(file.path);
}

var jsTask = function(){
    return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(rename())
    .pipe(webpack(dev ? prodWebpackConf:devWebpackConf))
    /**
     * sourceMap 配置
     * 通过 through 模块确认是否已有map如果没有，则写入map
     */
    .pipe(gIf(checkNoCss,sourceMap.init({loadMaps:true})))
    .pipe(gIf(checkNoCss,through.obj(function(file,enc,cb){
        var isSourceMap = /\.map$/.test(file.path);
        if(!isSourceMap) this.push(file);
        cb();
    })))
    .pipe(gIf(checkNoCss,sourceMap.write('.')))
    /**
     * webpack输出的文件中，由于从vue中抽离css导致output文件包含css文件
     * 这个问题会导致 uglify 尝试压缩 css文件 而报错
     * gulp-if 插件 第一个参数可以是一个 function @return {Boolean}
     * 通过判断file.path 是否是js后缀从而执行 uglify
     */
    .pipe(gIf(function(file){
        return dev && /\.js$/.test(file.path);
    },uglify(config.tasks.js.uglify)))
    .on('error',handleError)
    .pipe(gulp.dest(paths.dest))
    .pipe(gIf(dev,browser.stream()));
}

gulp.task('js',jsTask);

module.exports = jsTask;
