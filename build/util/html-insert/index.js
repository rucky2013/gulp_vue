var through = require('through2');
var replaceComponent = require('./lib/replaceComponent');
var replaceStyle = require('./lib/replaceStyle');
var replaceJs = require('./lib/replaceJs');
/**
 option = {
    component: {
        path:'src/views'
    },
    css: {
        path:'src/static',
        output:'../static',
        compress:fasle,
        version:false
    },
    js: {
        path:'src',
        output:'../static/js',
        compress:falsem
        version:false
    }
}
 */
module.exports = function(option){
    option = option || {};
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

        if(option.component){
            content = replaceComponent(content,option.component);
        }
        if(option.css){
            content = replaceStyle(content,option.css);
        }
        if(option.js){
            content = replaceJs(content,option.js);
        }
        file._contents = new Buffer(content);
        this.push(file);
        cb();
    })
}
