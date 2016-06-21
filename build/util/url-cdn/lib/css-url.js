
var path = require('path');
var cssUrlHeadReg = /url\(('|")?/;
var cssUrlContentReg = /\S*?/;
var cssUrlFooterReg = /(?=('|")?\))/;

/**
 * 取得对路径的所有操作权
 * @param option
 *         cdn          CDN路径
 *         exec         正则或字符串，cdn替换匹配到的结果
 *         version      版本控制
 *         extensions   数组，路径后缀。只匹配对应后缀的路径
 */

 var isRegExp = function(obj){
     return Object.prototype.toString.call(obj) === "[object RegExp]";
 }

module.exports = function (code,option){
    var cssUrlReg;
    if(option.extensions){
        var extensions ="\\.("+option.extensions.join('|')+")";
        cssUrlReg = new RegExp("(?=" + cssUrlHeadReg.source + ")" + cssUrlContentReg.source + extensions + cssUrlContentReg.source + cssUrlFooterReg.source,'ig');
    }else{
        cssUrlReg = new RegExp("(?=" + cssUrlHeadReg.source + ")" + cssUrlContentReg.source + cssUrlFooterReg.source,'ig');
    }
    return code.replace(cssUrlReg,function(match){
        var head = cssUrlHeadReg.exec(match)[0];
        match = match.replace(cssUrlHeadReg,'');
        if(option.exec){
            option.exec = isRegExp(option.exec) ? option.exec.source : option.exec;
            match = match.replace(new RegExp("^"+option.exec),'');
        }
        match = path.join(option.cdn || '',match).replace(/\\/g,"/");
        if(option.version){
            var ext = /\?/.test(match) ? "&" : "?";
            match += ext + '_v=' + option.version;
        }

        return head + match;
    })

}
