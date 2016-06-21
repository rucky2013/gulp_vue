var fsStream = require('./fsStream');
var getVersion = require('./getVersion');
var path = require('path');
var uglify = require('uglify-js');

var jsReg = /\s*<\!--\s*js\s*:.*-->/g;
var insetReg = /(\s*<\!--|\s*-->)/g;
var spaceReg = /^(\r|\t|\s)*/;

/**
 * @func replaceStyle 查找文件中关于CSS注入的注释，进行替换
 * @param content {Stream} 文件内容
 * @param option {Object} 设置
 *          path {String} 文件输入路径
 *          output {String} 文件替换后的路径，可选，空时以path作为路径
 *          compress {Boolean} 是否压缩CSS，仅以require方式插入内容时压缩
 *          uglifyOption {Object} 压缩设置
 *          version {String} 规定以何种方式控制文件版本，仅非require时生效。
 *                           @hash[Number] 使用文件内容的sha1值作为version; ps: hash:默认整个hash值 hash8:截取hash前8个字符
 *                           0.1.0 自定义字符
 */
 module.exports = function (content,option){
     return content.replace(jsReg,function(match){
         var space = match.match(spaceReg)[0].replace(/\s\n/g,'');
         match = match.replace(insetReg,'');
         match = match.split(/\s*:\s*/);
        if(match.length === 3 && match[1] === 'require'){
            var jsContent = '';
            if(option.compress){
                jsContent = uglify.minify(path.join(option.path,match[2]),option.uglifyOption || {}).code;
            }else{
                jsContent = fsStream(path.join(option.path,match[2]));
                jsContent = jsContent.replace(/\s\n/g,'\n'+space);
            }
            return '\n'+space +'<script>\n'+space + jsContent + '</script>';
        }else{
            var jsContent = fsStream(path.join(option.path,match[1]));
            var pathname = path.join(option.output ? option.output : option.path , match[1].slice(match[1].lastIndexOf('/')));
            if(option.version) pathname += getVersion(jsContent,option.version)
            pathname = pathname.replace(/\\/g,'/');
            return '\n'+space +'<script src="' + pathname + '"></script>';
        }
     })
 }
