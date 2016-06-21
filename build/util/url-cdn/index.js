/**
 * 检索 .html .css 文件中的路径，添加cdn服务以及版本控制服务
 */
var through = require('through2');
var path = require('path');
var getVersion = require('./lib/getVersion');

var cssUrl = require('./lib/css-url');
var htmlUrl = require("./lib/html-url");


module.exports = function(option){
    option = option || {};
    ['css','link','img','script'].forEach(function(key){
        option[key] = option[key] || {};
        option[key].cdn = option[key].cdn || option.cdn;
        option[key].exec = option[key].exec || option.exec;
    });
    
    return through.obj(function(file,enc,cb){
        if(file.isNull()){
            this.push(file);
            return cb();
        }
        if(file.isStream()){
            this.emit('error',function(){
                console.error("stream not supported");
            });
            this.push(file);
            return cb();
        }
        var content = file._contents.toString();
        var version = getVersion(content,'hash');
        if(/\.css$/.test(file.history[0])){
            content = cssUrl(content,option.css);
        }
        if(/\.html$/.test(file.history[0])){
            content = htmlUrl(content,option);
        }
        file._contents = new Buffer(content);
        this.push(file);
        cb();
  })
};
