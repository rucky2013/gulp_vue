/**
 * 浏览器热加载
 */


var browser = require('browser-sync').create('server');
var config  = require('../config');
var gulp   = require('gulp');

var browserTask = function () {
    browser.init(config.tasks.browserSync);
}
gulp.task('browserSync',browserTask)

module.exports = browserTask
