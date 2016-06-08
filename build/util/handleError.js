/**
 * 提供gulp任务运行错误 日志打印
 */

var notify = require("gulp-notify");

module.exports = function(errorObject, callback) {
    notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments)
    if (typeof this.emit === 'function') this.emit('end')
}
