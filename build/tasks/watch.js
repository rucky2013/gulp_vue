
var gulp = require('gulp');
var watch = require('gulp-watch');
var browser = require('browser-sync').get('server');

var path = require('path');
var config = require('../config');

var requireTask = {
    html: require('./html'),
    js: require('./js'),
    images: require('./images')
}

var bsReload = browser.reload;

var watchTask = function(){
    var enTask = ['html','js','images']
    enTask.forEach(function(tasks){
        var task = config.tasks[tasks];
        var glob = path.join(config.root,"**/*.{" + task.extensions + "}");
        watch(glob,function(){
            requireTask[tasks]();
        }).on('change',function(){
            setTimeout(bsReload,500);
        });
    })
}

gulp.task('watch',watchTask);

module.exports = watchTask;
