var gulp = require('gulp');
var sequence = require('gulp-sequence');

var fTask = ["images",'js','html'];
var sTask = ['css'];
var tTask = process.env.NODE_ENV === 'production' ? [] : ['browserSync','watch'];

var defaultTask = function(cb){
    sequence(fTask,sTask,tTask,cb);
}

gulp.task('default',defaultTask);

gulp.task('sever',function(){
    gulp.start('watch','browserSync');
})

module.exports = defaultTask;
