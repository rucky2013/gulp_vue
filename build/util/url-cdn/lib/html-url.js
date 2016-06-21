/**
 * 取得对路径的所有操作权
 * @param option
 *         cdn          CDN路径
 *         exec         正则或字符串，cdn替换匹配到的结果
 *         version      版本控制
 *         extensions   数组，路径后缀。只匹配对应后缀的路径
 */

var path = require('path');
var cssUrl = require('./css-url');

/**
 * <img src="" alt="" />
 * <link href="" />
 * <script src="">
 * style=""
 */

var getUrlHead = function(target,param){
    return new RegExp("<.*?"+target+".*?"+param+'="');
}
var urlFooterReg = /(?=")/;
var urlContent = /.*?/;

var ImgUrlHeadReg = getUrlHead('img',"src");
var linkUrlHeadReg = getUrlHead('link','href');
var scriptHeadReg = getUrlHead('script','src');

var styleReg = /style=".*?(?=")/ig;
var styleUrlHeadReg = /style="/;

var isRegExp = function(obj){
    return Object.prototype.toString.call(obj) === "[object RegExp]";
}

function getUrlReg (head,option){
    var reg;
    option = option || {};
    if(option.extensions){
        var extensions ="\\.(" + option.extensions.join('|')+")";
        reg = new RegExp("(?:" +head.source + ")" + urlContent.source + option.extensions + urlContent.source + urlFooterReg.source,"ig");
    }else{
        reg = new RegExp("(?:" +head.source + ")" + urlContent.source + urlFooterReg.source,"ig")
    }
    return reg;
}

function replaceUrl(code,pattern,header,option){
    option = option ||{};
    return code.replace(pattern,function(match){
        var head = header.exec(match)[0];
        match = match.replace(header,'');
        if(option.exec){
            option.exec = isRegExp(option.exec) ? option.exec.source : option.exec;
            match = match.replace(new RegExp("^"+option.exec),'');
        }
        match = typeof option.callback === 'function' ? option.callback(match,option) : match;
        match = path.join(option.cdn ||'',match).replace(/\\/g,"/");
        return head + match;
    })
}

function addVersion(match,option){
    if(option.version){
        var ext = /\?/.test(match) ? "&" : "?";
        match += ext + '_v=' + option.version;
    }
    return match;
}

function replaceStyle(code,option){
    option = option || {};
    return code.replace(styleReg,function(match){
        var head = styleUrlHeadReg.exec(match)[0];
        match = match.replace(styleUrlHeadReg,'');
        return head + cssUrl(match,option);
    })
}

module.exports = function(code,option){
    option = option || {};

    var imgReg = getUrlReg(ImgUrlHeadReg,option.img);
    code =  replaceUrl(code,imgReg,ImgUrlHeadReg,Object.assign(option.img || {},{
        callback:addVersion
    }));

    var linkReg = getUrlReg(linkUrlHeadReg,option.link);
    code = replaceUrl(code,linkReg,linkUrlHeadReg,option.link);

    var scriptReg = getUrlReg(scriptHeadReg,option.script);
    code = replaceUrl(code,scriptReg,scriptHeadReg,option.script);

    code = replaceStyle(code,option.css);

    return code;
};
