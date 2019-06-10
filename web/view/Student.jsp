<%--
  Created by IntelliJ IDEA.
  User: 晓敏
  Date: 2019/3/30
  Time: 16:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>通用型线上课堂同步教学系统</title>
    <link rel="stylesheet" href="../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../css/libs/bootstrap-table.css">
    <link rel="stylesheet" href="../css/base.css">
</head>
<body>
<%--顶部导航栏--%>
<div class="BaseNav">
    <ul>
        <li>
            <img src="../image/logo.png">
        </li>
        <li id="student_nav_home">
            <a href="#"><span class="glyphicon glyphicon-home"></span> &nbsp;首页</a>
        </li>
        <li id="student_nav_message">
            <a href="#"><span class="glyphicon glyphicon-envelope"></span> &nbsp;留言</a>
        </li>
        <li class="fr">
            <a href="/login"><span class="glyphicon glyphicon-log-out"></span> &nbsp;退出登录</a>
        </li>
        <li class="fr" id="student_nav_back">
            <a href="#"><span class="glyphicon glyphicon-bullhorn"></span> &nbsp;<span id="student_nav_teacher"></span><span class="glyphicon glyphicon-chevron-left"></span> &nbsp;返回选择</a>
        </li>
    </ul>
</div>
<div class="cf"></div>
<%--首页--%>
<div id="student_home" class="BaseMain">
    <%--公告、课件模块--%>
    <div class="HomeTop">
        <div class="HomeTopLeft">
            <%--公告中心--%>
            <div class="NoticeBg">
                <div>
                    <img class="NoticeImg" src="../image/icon/公告.png">
                    <h3>公告中心</h3>
                    <div class="cf"></div>
                </div>
                <div class="BaseLine"></div>
                <%--公告列表--%>
                <div id="student_notice_list"></div>
                <div id="student_notice_no" class="NoticeCard" style="display: none;">
                    <h4>暂无公告!</h4>
                </div>
            </div>
        </div>
        <div class="HomeTopRight">
            <%--课件中心--%>
            <div class="NoticeBg">
                <div>
                    <img class="NoticeImg" src="../image/icon/课件.png">
                    <h3>课件中心</h3>
                    <div class="cf"></div>
                </div>
                <div class="BaseLine"></div>
                <%--课件--%>
                <div class="ArticleMain" id="student_file_main">
                    <%--课件列表--%>
                    <div class="ArticleList" id="student_file_list"></div>
                </div>
                <div id="student_file_no" class="NoticeCard" style="display: none;">
                    <h4>暂无课件!</h4>
                </div>
            </div>
        </div>
    </div>
    <%--文章模块--%>
    <div class="NoticeBg StudentArticle">
        <div id="student_article_top">
            <img class="NoticeImg" src="../image/icon/文章.png">
            <h3>文章中心</h3>
            <div class="cf"></div>
        </div>
        <div class="BaseLine"></div>
        <%--文章--%>
        <div class="ArticleMain" id="student_article_main">
            <%--文章列表--%>
            <div class="ArticleList" id="student_article_list"></div>
            <%--文章详情--%>
            <div class="ArticleDetail" id="student_article_detail">
                <%--文章标题--%>
                <h3 class="ArticleDetailTitle" id="student_article_detail_title"></h3>
                <p id="student_article_detail_content"></p>
            </div>
        </div>
        <div id="student_article_no" class="NoticeCard" style="display: none;">
            <h4>暂无文章!</h4>
        </div>
    </div>
</div>
<%--留言--%>
<div id="student_message" class="BaseMain">
    <%--我的留言列表--%>
    <div class="NoticeBg">
        <div>
            <img class="NoticeImg" src="../image/icon/留言.png">
            <h3>我的留言</h3>
            <button data-toggle="modal" data-target="#student_message_dialog" type='button' class='close btn btn-sm fr NoticeAddBtn' aria-hidden='true'><span class="glyphicon glyphicon-plus"></span>&nbsp;留言</button>
            <div class="cf"></div>
        </div>
        <div class="BaseLine"></div>
        <%--留言列表--%>
        <div id="student_message_list"></div>
        <div id="student_message_no" class="NoticeCard" style="display: none;">
            <h4>暂无留言!</h4>
        </div>
    </div>
</div>
<%--留言对话框--%>
<div id='student_message_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='student_message_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='student_message_dialog_label' class='modal-title'>留言</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='teacher_notice_dialog_id'/>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">留言内容</label>
                        <div class="col-sm-10">
                            <textarea id="student_message_dialog_detail" class="form-control" rows="11"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="student_message_dialog_add" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--删除留言对话框--%>
<div id='student_message_del_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='student_message_del_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='student_message_del_dialog_label' class='modal-title'>删除留言</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='student_message_del_dialog_id'/>
                <h4>确认要删除吗？不可恢复哦？</h4>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="student_message_del_dialog_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--底部--%>
<div class="Bottom">Copyright 2019 通用型线上课堂同步助手 All Rights Reserved</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/utils/base64.js"></script>
<script src="../js/student.js"></script>
</body>
</html>
