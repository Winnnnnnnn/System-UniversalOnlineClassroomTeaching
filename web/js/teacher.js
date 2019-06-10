//页面启动入口
$(function () {
    initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    $('#teacher_nav_name').html('欢迎您：' + getUrlParam('course') + '老师&nbsp;&nbsp;' + getUrlParam('name') + '&nbsp;&nbsp;&nbsp;&nbsp;');
    var menu = getUrlParam('menu');
    if (null == menu) {
        $('#teacher_nav_notice').css('background','#34495e');
        initNotice();
    } else {
        switch (menu) {
            case '0':
                $('#teacher_nav_notice').css('background','#34495e');
                initNotice();
                break;
            case '1':
                $('#teacher_nav_message').css('background','#34495e');
                initMessage();
                break;
            case '2':
                $('#teacher_nav_article').css('background','#34495e');
                initArticle();
                break;
            case '3':
                $('#teacher_nav_file').css('background','#34495e');
                initFile();
                break;
        }
    }
    //处理导航栏按钮
    $('#teacher_nav_notice').click(function () {
        window.location = '/teacher?id=' + getUrlParam('id') + "&name=" + getUrlParam('name') + "&course=" + getUrlParam('course') + "&menu=0";
    });
    $('#teacher_nav_message').click(function () {
        window.location = '/teacher?id=' + getUrlParam('id') + "&name=" + getUrlParam('name') + "&course=" + getUrlParam('course') + "&menu=1";
    });
    $('#teacher_nav_article').click(function () {
        window.location = '/teacher?id=' + getUrlParam('id') + "&name=" + getUrlParam('name') + "&course=" + getUrlParam('course') + "&menu=2";
    });
    $('#teacher_nav_file').click(function () {
        window.location = '/teacher?id=' + getUrlParam('id') + "&name=" + getUrlParam('name') + "&course=" + getUrlParam('course') + "&menu=3";
    });
}

/**
 * 初始化公告中心
 */
function initNotice() {
    $('#teacher_notice').fadeIn(500);
    initNoticeList();
}

/**
 * 初始化公告对话框
 */
function initNoticeDialog() {
    $('#teacher_notice_dialog_body').hide();
    $('#teacher_notice_dialog_warn').hide();
    $('#teacher_notice_dialog_btn_add').hide();
    $('#teacher_notice_dialog_btn_edit').hide();
    $('#teacher_notice_dialog_btn_del').hide();
}

/**
 * 添加公告
 */
function addNotice() {
    initNoticeDialog();
    $('#teacher_notice_dialog_body').show();
    $('#teacher_notice_dialog_btn_add').show();
    $('#teacher_notice_dialog_label').html('添加新公告');
    $('#teacher_notice_dialog_title').val('');
    $('#teacher_notice_dialog_detail').val('');
}

/**
 * 绑定添加公告按钮
 */
$('#teacher_notice_dialog_btn_add').click(function () {
    //获取数据
    var title = $('#teacher_notice_dialog_title').val();
    var detail = $('#teacher_notice_dialog_detail').val();
    //数据校验
    if ('' == title || '' == detail) {
        alert('请输入公告!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_TEACHER_ADD_NOTICE',
            title:title,
            detail:getFormatCode(detail),
            teacher:getUrlParam('id'),
            time:getNowFormatDate()
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/teacher',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('添加成功!');
                    $('#teacher_notice_dialog').modal('hide');
                    initNoticeList();
                } else {
                    alert('添加失败!');
                }
            },
            error: function () {
                alert('添加失败!');
            }
        });
    }
});

/**
 * 初始化我的公告列表
 */
function initNoticeList() {
    var data = {
        action:'ACTION_TEACHER_GET_NOTICE',
        id:getUrlParam('id')
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length != 0) {
                $('#teacher_notice_list').empty();
                $('#teacher_notice_no').hide();
                $.each(res,function (i,obj) {
                    var tmp = escape(JSON.stringify(obj));
                    var notice = "<div id='notice_" + obj.id + "' class=\"NoticeCard\">" +
                        "<div class=\"NoticeTitle\">" +
                        "<h4 id='notice_title_" + obj.id + "'>" + obj.title + "</h4>" +
                        "<h4>" + obj.time + "</h4>" +
                        "<button onclick='delNotice(\"" + obj.id + "\")' data-toggle=\"modal\" data-target=\"#teacher_notice_dialog\" type='button' class='close btn btn-sm' aria-hidden='true'><span class=\"glyphicon glyphicon-remove\"></span></button>" +
                        "<button onclick='editNotice(\"" + tmp + "\")'  data-toggle=\"modal\" data-target=\"#teacher_notice_dialog\" type='button' class='close btn btn-sm' aria-hidden='true'><span class=\"glyphicon glyphicon-edit\"></span></button>" +
                        "</div>" +
                        "<div class=\"cf\" style=\"margin-bottom: 10px\"></div>" +
                        "<p id='notice_detail_" + obj.id + "'>" + obj.detail + "</p>" +
                        "</div>";
                    $('#teacher_notice_list').append(notice);
                });
            } else {
                $('#teacher_notice_list').empty();
                $('#teacher_notice_no').show();
            }
        },
        error: function () {
            $('#teacher_notice_list').empty();
            $('#teacher_notice_no').show();
        }
    });
}

/**
 * 编辑公告
 * @param data
 */
function editNotice(data) {
    var tmp = JSON.parse(unescape(data));
    initNoticeDialog();
    $('#teacher_notice_dialog_body').show();
    $('#teacher_notice_dialog_btn_edit').show();
    $('#teacher_notice_dialog_label').html('编辑公告');
    $('#teacher_notice_dialog_title').val(tmp.title);
    $('#teacher_notice_dialog_detail').val(setFormatCode(tmp.detail));
    $('#teacher_notice_dialog_id').val(tmp.id);
}

/**
 * 绑定编辑按钮
 */
$('#teacher_notice_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#teacher_notice_dialog_id').val();
    var title = $('#teacher_notice_dialog_title').val();
    var detail = $('#teacher_notice_dialog_detail').val();
    //数据校验
    if ('' == title || '' == detail) {
        alert('请输入公告!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_TEACHER_EDIT_NOTICE',
            id:id,
            title:title,
            detail:getFormatCode(detail)
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/teacher',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#teacher_notice_dialog').modal('hide');
                    //刷新数据
                    $('#notice_title_' + id).html(title);
                    $('#notice_detail_' + id).html(getFormatCode(detail));
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('修改失败!');
            }
        });
    }
});

/**
 * 删除公告
 * @param id
 */
function delNotice(id) {
    initNoticeDialog();
    $('#teacher_notice_dialog_warn').show();
    $('#teacher_notice_dialog_btn_del').show();
    $('#teacher_notice_dialog_label').html('删除公告');
    $('#teacher_notice_dialog_id').val(id);
}

/**
 * 绑定删除公告按钮
 */
$('#teacher_notice_dialog_btn_del').click(function () {
    var id = $('#teacher_notice_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_TEACHER_DEL_NOTICE',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#teacher_notice_dialog').modal('hide');
                //刷新数据
                $('#notice_' + id).remove();
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
 * 初始化留言中心
 */
function initMessage() {
    $('#teacher_message').fadeIn(500);
    initMessageList();
}

/**
 * 初始化留言列表
 */
function initMessageList() {
    var data = {
        action:'ACTION_TEACHER_GET_MESSAGE',
        id:getUrlParam('id')
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length != 0) {
                $('#teacher_message_list').empty();
                $('#teacher_message_no').hide();
                $.each(res,function (i,obj) {
                    var tmp = escape(JSON.stringify(obj));
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
                            "<h4>我的回复</h4>" +
                            "<p id='message_reply_my_" + obj.id + "'>" + obj.reply + "</p>" +
                        "</div>" +
                        "<div class=\"cf\"></div>" +
                        "<div class=\"MessageCardTool\">" +
                            "<button onclick='replyMessage(\"" + tmp + "\")' type=\"button\" class=\"close btn btn-sm fr\"><span class=\"glyphicon glyphicon-edit\"></span></button>" +
                        "</div>" +
                        "<div class=\"cf\"></div>" +
                        "<div id='message_reply_" + obj.id + "' class=\"MessageCardReply\">" +
                            "<div class=\"MessageCardLine\"></div>" +
                            "<textarea id='message_reply_detail_" + obj.id + "' rows=\"8\" placeholder=\"请在此输入回复内容...\"></textarea>" +
                            "<button onclick='subReplyMessage(\"" + obj.id + "\")' class=\"btn btn-info\">回复留言</button>" +
                        "</div>" +
                        "</div>";
                    $('#teacher_message_list').append(message);
                });
            } else {
                $('#teacher_message_list').empty();
                $('#teacher_message_no').show();
            }
        },
        error: function () {
            $('#teacher_message_list').empty();
            $('#teacher_message_no').show();
        }
    });
}

/**
 * 回复留言
 * @param data
 */
function replyMessage(data) {
    var message = JSON.parse(unescape(data));
    $('#message_reply_' + message.id).slideToggle(300);
    var reply = $('#message_reply_my_'+message.id).html();
    $('#message_reply_detail_' + message.id).val(setFormatCode(reply));
}

/**
 * 提交留言回复
 * @param id
 */
function subReplyMessage(id) {
    var reply = $('#message_reply_detail_' + id).val();
    if ('' == reply) {
        alert('没有回复任何内容!');
    } else {
        var data = {
            action:'ACTION_TEACHER_REPLY_MESSAGE',
            reply:getFormatCode(reply),
            id:id
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/teacher',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                   //回复成功
                    $('#message_reply_my_'+id).html(getFormatCode(reply));
                    $('#message_reply_' + id).slideToggle(300);
                } else {
                    alert('回复失败!');
                }
            },
            error: function () {
                alert('回复失败!');
            }
        });
    }
}

/**
 * 初始化文章中心
 */
function initArticle() {
    $('#teacher_article').fadeIn(500);
    initArticleList();
}

/**
 * 初始化我的文章列表
 */
function initArticleList() {
    var data = {
        action:'ACTION_TEACHER_GET_ARTICLE',
        id:getUrlParam('id')
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res.length != 0) {
                //获取到文章数据
                $('#teacher_article_main').show();
                $('#teacher_article_no').hide();
                $('#teacher_article_list').empty();
                $.each(res,function (i,obj) {
                    var article = escape(JSON.stringify(obj));
                    var title = "<div class=\"ArticleTitle\">"+
                        "<a href=\"javascript:;\" onclick='openArticle(\"" + article + "\")'>" + obj.title + "</a>" +
                        "<h5>" + obj.time + "</h5>" +
                        "</div>" +
                        "<div class=\"cf\" style=\"margin-bottom: 15px;\"></div>";
                    $('#teacher_article_list').append(title);
                });
            } else {
                $('#teacher_article_main').hide();
                $('#teacher_article_no').show();
            }
        },
        error: function () {
            $('#teacher_article_main').hide();
            $('#teacher_article_no').show();
        }
    });
}

/**
 * 打开查看文章内容
 * @param data
 */
function openArticle(data) {
    var article = JSON.parse(unescape(data));
    $('#teacher_article_list').css('width','30%');
    $('#teacher_article_detail').show();
    $('#teacher_article_detail_title').html(article.title + '<br/>' + article.time);
    $('#teacher_article_detail_content').html(article.detail);
    document.getElementById("teacher_article_top").scrollIntoView();
    $('#teacher_article_detail_id').val(article.id);
}

/**
 * 添加文章
 */
function addArticle() {
    initArticleDialog();
    $('#teacher_article_dialog_body').show();
    $('#teacher_article_dialog_btn_add').show();
    $('#teacher_article_dialog_label').html('写文章');
}

/**
 * 绑定添加文章按钮
 */
$('#teacher_article_dialog_btn_add').click(function () {
    //获取数据
    var title = $('#teacher_article_dialog_title').val();
    var detail = $('#teacher_article_dialog_detail').val();
    //数据校验
    if ('' == title) {
        alert('请输入标题!');
        return;
    }
    if ('' == detail) {
        alert('请输入内容!');
        return;
    }
    //数据封装
    var data = {
        action:'ACTION_TEACHER_ADD_ARTICLE',
        title:title,
        detail:getFormatCode(detail),
        teacher:getUrlParam("id"),
        time:getNowFormatDate()
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('添加成功!');
                //清除数据
                $('#teacher_article_dialog_title').val('');
                $('#teacher_article_dialog_detail').val('');
                $('#teacher_article_dialog').modal('hide');
                initArticleList();
            } else {
                alert('添加失败!');
            }
        },
        error: function () {
            alert('服务器异常，添加失败!');
        }
    });
});

/**
 * 初始化文章中心对话框
 */
function initArticleDialog() {
    $('#teacher_article_dialog_body').hide();
    $('#teacher_article_dialog_warn').hide();
    $('#teacher_article_dialog_btn_add').hide();
    $('#teacher_article_dialog_btn_edit').hide();
    $('#teacher_article_dialog_btn_del').hide();
}

/**
 * 编辑文章
 */
function editArticle() {
    initArticleDialog();
    $('#teacher_article_dialog_body').show();
    $('#teacher_article_dialog_btn_edit').show();
    $('#teacher_article_dialog_label').html('修改文章');
    $('#teacher_article_dialog_id').val($('#teacher_article_detail_id').val());
    $('#teacher_article_dialog_title').val(getCaption($('#teacher_article_detail_title').html()));
    $('#teacher_article_dialog_detail').val(setFormatCode($('#teacher_article_detail_content').html()));
}

/**
 * 绑定编辑文章按钮
 */
$('#teacher_article_dialog_btn_edit').click(function () {
    //获取数据
    var title = $('#teacher_article_dialog_title').val();
    var detail = $('#teacher_article_dialog_detail').val();
    var id = $('#teacher_article_dialog_id').val();
    //数据校验
    if ('' == title) {
        alert('请输入标题!');
        return;
    }
    if ('' == detail) {
        alert('请输入内容!');
        return;
    }
    //数据封装
    var data = {
        action:'ACTION_TEACHER_EDIT_ARTICLE',
        title:title,
        detail:getFormatCode(detail),
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('修改成功!');
                //清除数据
                $('#teacher_article_dialog').modal('hide');
                //数据修改
                $('#teacher_article_detail_content').html(getFormatCode(detail));
                var title_temp = $('#teacher_article_detail_title').html();
                var title_time = title_temp.lastIndexOf(">");
                var time = title_temp.substring(title_time+1,title_temp.length);
                $('#teacher_article_detail_title').html(title + '<br/>' + time);
                //更新列表
                initArticleList();
            } else {
                alert('修改失败!');
            }
        },
        error: function () {
            alert('服务器异常，修改失败!');
        }
    });
});

/**
 * 删除文章
 */
function delArticle() {
    initArticleDialog();
    $('#teacher_article_dialog_warn').show();
    $('#teacher_article_dialog_btn_del').show();
    $('#teacher_article_dialog_label').html('删除文章');
    $('#teacher_article_dialog_id').val($('#teacher_article_detail_id').val());
}

/**
 * 绑定删除文章按钮
 */
$('#teacher_article_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#teacher_article_dialog_id').val();
    //数据封装
    var data = {
        action:'ACTION_TEACHER_DEL_ARTICLE',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //清除数据
                $('#teacher_article_dialog').modal('hide');
                $('#teacher_article_list').css('width','100%');
                $('#teacher_article_detail').hide();
                //更新列表
                initArticleList();
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 文章标题处理
 * @param obj
 * @returns {*}
 */
function getCaption(obj){
    var index=obj.lastIndexOf("<br>");
    obj=obj.substring(0,index);
    return obj;
}

/**
 * 初始化课件中心
 */
function initFile() {
    $('#teacher_file').fadeIn(500);
    initFileTable(1);
}

/**
 * 初始化课件信息表
 */
function initFileTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/teacher',
        id:'#teacher_file_table',
        pageNumber:pageNumber,
        data:{action:'ACTION_TEACHER_GET_FILE',teacher:getUrlParam('id')},
        search:false,
        columns:[{
            field: 'title',
            title: '课件名称',
            align: 'center'
        },{
            field: 'download',
            title: '下载次数',
            align: 'center'
        },{
            field: 'time',
            title: '发布时间',
            align: 'center'
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var file = escape(JSON.stringify(row));
                return "<div class='btn-group'><button onclick='downloadFile(\"" + row.file + "\")' class='btn btn-primary'><span class='glyphicon glyphicon-download'></span>&nbsp;下载</button><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#teacher_file_dialog\" onclick='editFile(\"" + file + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;修改</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#teacher_file_dialog\" onclick='delFile(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 课件下载
 * @param filename
 */
function downloadFile(filename) {
    window.open("/files/" + filename);
}

/**
 * 修改课件
 * @param data
 */
function editFile(data) {
    var file = JSON.parse(unescape(data));
    initFileDialog();
    $('#teacher_file_dialog_body').show();
    $('#teacher_file_dialog_edit').show();
    $('#teacher_file_dialog_label').html('修改课件');
    $('#teacher_file_dialog_title').val(file.title);
    $('#teacher_file_dialog_id').val(file.id);
    $('#teacher_file_dialog_file').val('');
}

/**
 * 绑定编辑课件按钮
 */
$('#teacher_file_dialog_edit').click(function () {
    //获取数据
    var title = $('#teacher_file_dialog_title').val();
    var file = $('#teacher_file_dialog_file').val();
    var id = $('#teacher_file_dialog_id').val();
    if ('' == title) {
        alert('请输入名称!');
        return;
    }
    //判断是否需要重新上传文件
    if ('' == file) {
        //不需要更新文件
        var data = {
            action:'ACTION_TEACHER_EDIT_FILE',
            title:title,
            file:'',
            id:id
        };
        $.ajax({
            type: 'post',
            url: '/teacher',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    //清除数据
                    $('#teacher_file_dialog').modal('hide');
                    //更新列表
                    initFileTable($('#teacher_file_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error: function () {
                alert('服务器异常，修改失败!');
            }
        });
    } else {
        //需要更新文件
        $.ajax({
            url: '/file',
            type: 'post',
            cache: false,
            data: new FormData($('#teacher_file_dialog_form')[0]),
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (res) {
                var filename = res.responseText;
                //数据封装
                var data = {
                    action:'ACTION_TEACHER_EDIT_FILE',
                    title:title,
                    file:filename,
                    id:id
                };
                $.ajax({
                    type: 'post',
                    url: '/teacher',
                    dataType: "json",
                    data: data,
                    success: function (res) {
                        if (res) {
                            alert('修改成功!');
                            //清除数据
                            $('#teacher_file_dialog').modal('hide');
                            //更新列表
                            initFileTable($('#teacher_file_table').bootstrapTable('getOptions').pageNumber);
                        } else {
                            alert('修改失败!');
                        }
                    },
                    error: function () {
                        alert('服务器异常，修改失败!');
                    }
                });
            }
        });
    }
});

/**
 * 删除课件
 * @param id
 */
function delFile(id) {
    initFileDialog();
    $('#teacher_file_dialog_warn').show();
    $('#teacher_file_dialog_del').show();
    $('#teacher_file_dialog_label').html('删除课件');
    $('#teacher_file_dialog_id').val(id);
}

/**
 * 绑定删除课件按钮
 */
$('#teacher_file_dialog_del').click(function () {
//获取数据
    var id = $('#teacher_file_dialog_id').val();
    //数据封装
    var data = {
        action:'ACTION_TEACHER_DEL_FILE',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/teacher',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //清除数据
                $('#teacher_file_dialog').modal('hide');
                //更新列表
                initFileTable($('#teacher_file_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 添加课件
 */
function addFile() {
    initFileDialog();
    $('#teacher_file_dialog_body').show();
    $('#teacher_file_dialog_add').show();
    $('#teacher_file_dialog_label').html('添加课件');
}

/**
 * 绑定上传课件按钮
 */
$('#teacher_file_dialog_add').click(function () {
    //获取数据
    var title = $('#teacher_file_dialog_title').val();
    var file = $('#teacher_file_dialog_file').val();
    if ('' == title) {
        alert('请输入名称!');
        return;
    }
    if ('' == file) {
        alert('请选择课件!');
        return;
    }
    //课件上传
    $.ajax({
        url: '/file',
        type: 'post',
        cache: false,
        data: new FormData($('#teacher_file_dialog_form')[0]),
        processData: false,
        contentType: false,
        dataType: "json",
        complete: function (res) {
            var filename = res.responseText;
            //数据封装
            var data = {
                action:'ACTION_TEACHER_ADD_FILE',
                title:title,
                file:filename,
                teacher:getUrlParam('id'),
                time:getNowFormatDate()
            };
            $.ajax({
                type: 'post',
                url: '/teacher',
                dataType: "json",
                data: data,
                success: function (res) {
                    if (res) {
                        alert('添加成功!');
                        //清除数据
                        $('#teacher_file_dialog').modal('hide');
                        $('#teacher_file_dialog_title').val('');
                        $('#teacher_file_dialog_file').val('');
                        //更新列表
                        initFileTable(1);
                    } else {
                        alert('添加失败!');
                    }
                },
                error: function () {
                    alert('服务器异常，添加失败!');
                }
            });
        }
    });
});

/**
 * 初始化课件对话框
 */
function initFileDialog() {
    $('#teacher_file_dialog_body').hide();
    $('#teacher_file_dialog_warn').hide();
    $('#teacher_file_dialog_add').hide();
    $('#teacher_file_dialog_edit').hide();
    $('#teacher_file_dialog_del').hide();
}

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