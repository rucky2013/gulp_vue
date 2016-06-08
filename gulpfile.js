
/**
 @file gulpfile.js
 =================
 gulp配置文件：build/
 gulp 任务： build/tasks
 gulp default build/task/default
**/
var requireDir = require('require-dir')

requireDir('build/tasks',{recurse:true})
