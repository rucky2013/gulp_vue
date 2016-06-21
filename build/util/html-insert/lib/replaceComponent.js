
var fsStream = require('./fsStream');
var path = require('path');


var componentReg = /\s*<\!--\s*component\s*:.*-->/g;
var insetReg = /(\s*<\!--|\s*-->)/g;
var spaceReg = /^\s*/;
/**
 * @func replaceComponent 检查文件中关于组件注入的注释，并替换content
 * @param content {Stream} html文件内容
 * @param option {Object} 设置
 *          path {String} 文件所在路径
 * @return componentContent 组件内容
 */
module.exports = function(content,option){
    return content.replace(componentReg,function(match){
        var space = match.match(spaceReg)[0].replace(/^\s\n/,'');
        match = match.replace(insetReg,'');
        var pathname = match.split(/\s*:\s*/)[1];
        var componentContent = fsStream(path.join(option.path,pathname));
        return "\n"+space + componentContent.replace(/\n/g,'\n'+space);
    })
}
