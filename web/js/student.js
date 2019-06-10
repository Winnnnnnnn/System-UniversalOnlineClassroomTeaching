/**
 * 页面启动入口
 */
$(function () {
    initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    $('#student_nav_teacher').html('当前频道：' + getUrlParam('teachercourse') + '老师&nbsp;&nbsp;' + getUrlParam('teachername') + '&nbsp;&nbsp;');
    var menu = getUrlParam('menu');
    if (null == menu) {
        $('#student_nav_home').css('background','#34495e');
        initHome();
    } else {
        switch (menu) {
            case '0':
                $('#student_nav_home').css('background','#34495e');
                initHome();
                break;
            case '1':
                $('#student_nav_message').css('background','#34495e');
                initMessage();
                break;
        }
    }
    $('#student_nav_home').click(function () {
        window.location = '/student?id=' + getUrlParam('id') + "&name=" + getUrlParam('name') + "&teacherid=" + getUrlParam('teacherid') + "&teachercourse=" + getUrlParam('teachercourse') + "&teachername=" + getUrlParam('teachername') + '&menu=0';
    });
    $('#student_nav_message').click(function () {
        window.location = '/student?id=' + getUrlParam('id') + "&name=" + getUrlParam('name') + "&teacherid=" + getUrlParam('teacherid') + "&teachercourse=" + getUrlParam('teachercourse') + "&teachername=" + getUrlParam('teachername') + '&menu=1';
    });
    $('#student_nav_back').click(function () {
        window.location = '/select?id=' + getUrlParam('id') + "&name=" + getUrlParam('name');
    });
}

/**
 * 初始化首页
 */
function initHome() {
    $('#student_home').fadeIn(500);
    initNoticeList();
}

/**
 * 初始化文章中心
 */
function initArticleList() {
    var data = {
        action:'ACTION_TEACHER_GET_ARTICLE',
        id:getUrlParam('teacherid')
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length != 0) {
                //获取到文章数据
                $('#student_article_main').show();
                $('#student_article_no').hide();
                $('#student_article_list').empty();
                $.each(res,function (i,obj) {
                    var article = escape(JSON.stringify(obj));
                    var title = "<div class=\"ArticleTitle\">"+
                        "<a href=\"javascript:;\" onclick='openArticle(\"" + article + "\")'>" + obj.title + "</a>" +
                        "<h5>" + obj.time + "</h5>" +
                        "</div>" +
                        "<div class=\"cf\" style=\"margin-bottom: 15px;\"></div>";
                    $('#student_article_list').append(title);
                });
            } else {
                $('#student_article_main').hide();
                $('#student_article_no').show();
            }
        },
        error: function () {
            $('#student_article_main').hide();
            $('#student_article_no').show();
        }
    });
}

/**
 * 打开查看文章内容
 * @param data
 */
function openArticle(data) {
    var article = JSON.parse(unescape(data));
    $('#student_article_list').css('width','30%');
    $('#student_article_detail').show();
    $('#student_article_detail_title').html(article.title + '<br/>' + article.time);
    $('#student_article_detail_content').html(article.detail);
    document.getElementById("student_article_top").scrollIntoView();
}

/**
 * 初始化公告列表
 */
function initNoticeList() {
    var data = {
        action:'ACTION_TEACHER_GET_NOTICE',
        id:getUrlParam('teacherid')
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length != 0) {
                $('#student_notice_list').empty();
                $('#student_notice_no').hide();
                $.each(res,function (i,obj) {
                    var notice = "<div id='notice_" + obj.id + "' class=\"NoticeCard\">" +
                        "<div class=\"NoticeTitle\">" +
                        "<h4 id='notice_title_" + obj.id + "'>" + obj.title + "</h4>" +
                        "<h4>" + obj.time + "</h4>" +
                        "</div>" +
                        "<div class=\"cf\" style=\"margin-bottom: 10px\"></div>" +
                        "<p id='notice_detail_" + obj.id + "'>" + obj.detail + "</p>" +
                        "</div>";
                    $('#student_notice_list').append(notice);
                });
                //获取课件
                initFileList();
            } else {
                $('#student_notice_list').empty();
                $('#student_notice_no').show();
            }
        },
        error: function () {
            $('#student_notice_list').empty();
            $('#student_notice_no').show();
        }
    });
}

/**
 * 初始化课件中心
 */
function initFileList() {
    var data = {
        action:'ACTION_TEACHER_GET_FILE',
        teacher:getUrlParam('teacherid')
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length != 0) {
                //获取到课件数据
                $('#student_file_main').show();
                $('#student_file_no').hide();
                $('#student_file_list').empty();
                $.each(res,function (i,obj) {
                    var file = escape(JSON.stringify(obj));
                    var title = "<div class=\"ArticleTitle\">"+
                        "<a href=\"javascript:;\" onclick='downloadFile(\"" + file + "\")'>" + obj.title + "</a>" +
                        "<h5>" + obj.time + "</h5>" +
                        "</div>" +
                        "<div class=\"cf\" style=\"margin-bottom: 15px;\"></div>";
                    $('#student_file_list').append(title);
                });
                //获取文章
                initArticleList();
            } else {
                $('#student_file_main').hide();
                $('#student_article_no').show();
            }
        },
        error: function () {
            $('#student_file_main').hide();
            $('#student_file_no').show();
        }
    });
}

/**
 * 课件下载
 * @param data
 */
function downloadFile(data) {
    var file = JSON.parse(unescape(data));
    //统计下载次数
    var req_data = {
        action:'ACTION_STUDENT_DOWNLOAD',
        id:file.id
    };
    $.ajax({
        type: 'post',
        url: '/student',
        dataType: "json",
        data: req_data,
        success: function (res) {
            if (res) {
                console.log('统计下载成功!');
            } else {
                console.log('统计下载失败!');
            }
        },
        error: function () {
            console.log('统计下载失败!');
        }
    });
    window.open("/files/" + file.file);
}

/**
 * 初始化留言
 */
function initMessage() {
    $('#student_message').fadeIn(500);
    initMessageList();
}

/**
 * 初始化留言列表
 */
function initMessageList() {
    var data = {
        action:'ACTION_STUDENT_GET_ARTICLE',
        teacher:getUrlParam('teacherid'),
        student:getUrlParam('id')
    };
    $.ajax({
        type: 'post',
        url: '/student',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length != 0) {
                $('#student_message_list').empty();
                $('#student_message_no').hide();
                $.each(res,function (i,obj) {
                    //创建模板
                    var message =
                        "<div class=\"MessageCard\">" +
                        "<div class=\"MessageCardLeft\">" +
                        "<div>" +
                        "<h4 class=\"MessageCardName\">" + obj.name + "</h4>" +
                        "<h4 class=\"MessageCardName\">" + obj.time + "</h4>" +
                        "</div>" +
                        "<div class=\"cf\" style=\"margin-bottom: 10px;\"></div>" +
                        "<p>" + obj.detail + "</p>" +
                        "</div>" +
                        "<div class=\"MessageCardRight\">" +
                        "<h4>教师的回复</h4>" +
                        "<p>" + obj.reply + "</p>" +
                        "</div>" +
                        "<div class=\"cf\"></div>" +
                        "<div class=\"MessageCardTool\">" +
                        "<button onclick='delMessage(\"" + obj.id + "\")' data-toggle=\"modal\" data-target=\"#student_message_del_dialog\"  type=\"button\" class=\"btn btn-sm btn-danger fr\" style='margin-left: 10px;margin-bottom: 10px;'><span class=\"glyphicon glyphicon-remove\"></span></button>" +
                        "</div>" +
                        "</div>";
                    $('#student_message_list').append(message);
                });
            } else {
                $('#student_message_list').empty();
                $('#student_message_no').show();
            }
        },
        error: function () {
            $('#student_message_list').empty();
            $('#student_message_no').show();
        }
    });
}

/**
 * 删除留言
 * @param id
 */
function delMessage(id) {
    $('#student_message_del_dialog_id').val(id);
}

/**
 * 删除留言
 */
$('#student_message_del_dialog_del').click(function () {
    var id = $('#student_message_del_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_STUDENT_DEL_MESSAGE',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/student',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#student_message_del_dialog').modal('hide');
                initMessageList();
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('删除失败!');
        }
    });
});

/**
 * 绑定留言按钮
 */
$('#student_message_dialog_add').click(function () {
    //获取数据
    var detail = $('#student_message_dialog_detail').val();
    if ('' == detail) {
        alert('请输入留言内容!');
    } else {
        //数据封装
        var data = {
            action:'ACTION_STUDENT_ADD_MESSAGE',
            teacher:getUrlParam('teacherid'),
            student:getUrlParam('id'),
            detail:getFormatCode(detail),
            time:getNowFormatDate()
        };
        $.ajax({
            type: 'post',
            url: '/student',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('留言成功!');
                    $('#student_message_dialog').modal('hide');
                    $('#student_message_dialog_detail').val('');
                    initMessageList();
                } else {
                    alert('留言失败!');
                }
            },
            error: function () {
                alert('留言失败!');
            }
        });
    }
});

/**
 * 获取url中的指定参数
 * @param {any} name
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

/**
 * 文本转html
 * @param strValue
 * @returns {string}
 */
function getFormatCode(strValue) {
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
}

/**
 * html转文本
 * @param strValue
 * @returns {string}
 */
function setFormatCode(strValue) {
    return strValue.replace(/<br\/>/g, '\r\n').replace(/<br\/>/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}