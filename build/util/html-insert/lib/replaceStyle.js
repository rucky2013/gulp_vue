
var fsStream = require('./fsStream');
var getVersion = require('./getVersion');
var path = require('path');
var cleanCss = require('clean-css');

var cssReg = /\s*<\!--\s*css\s*:.*-->/g;
var insetReg = /(\s*<\!--|\s*-->)/g;
var spaceReg = /^(\r|\t|\s)*/;

/**
 * @func replaceStyle 查找文件中关于CSS注入的注释，进行替换
 * @param content {Stream} 文件内容
 * @param option {Object} 设置
 *          path {String} 文件输入路径
 *          output {String} 文件替换后的路径，可选，空时以path作为路径
 *          compress {Boolean} 是否压缩CSS，仅以require方式插入内容时压缩
 *          version {String} 规定以何种方式控制文件版本，仅非require时生效。
 *                           @hash[Number] 使用文件内容的sha1值作为version; ps: hash:默认整个hash值 hash8:截取hash前8个字符
 *                           0.1.0 自定义字符
 */
module.exports = function(content,option){
    return content.replace(cssReg,function(match){
        var space = match.match(spaceReg)[0].replace(/^\s\n/,'');
        match = match.replace(insetReg,'');
        match = match.split(/\s*:\s*/);
        if(match.length == 3 && match[1] === 'require'){        // require
            var cssContent = fsStream(path.join(option.path,match[2]));
            if(option.compress){
                cssContent = new cleanCss().minify(cssContent).styles;
                return '\n'+ space +'<style>\n'+cssContent+'\n'+ space +'</style>';
            }else{
                cssContent ='\n'+ space + '<style>\n'+space + cssContent.replace(/\n/g,'\n'+space) +'</style>';
            }
            return cssContent;
        }else{
            var cssContent = fsStream(path.join(option.path,match[1]));
            var pathname = path.join(option.output ? option.output : option.path , match[1]);
            if(option.version) pathname += getVersion(cssContent,option.version)
            pathname = pathname.replace(/\\/g,'/');
            return '\n'+ space + '<link rel="stylesheet" href="'+pathname+'" charset="utf-8">';
        }
    })
};
