/**
 * 封装的处理AJAX请求处理函数
 * @returns {Object}
 * @constructor
 */
function Ajax() {
    var ajax = new Object();
    ajax.Init = function (param) {
        $.ajax({
            type: param.type,
            url: param.url,
            dataType: "json",
            data: param.data,
            success: param.success,
            error: param.error
        });
    };
    return ajax;
}