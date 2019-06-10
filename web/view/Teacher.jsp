<%--
  Created by IntelliJ IDEA.
  User: 晓敏
  Date: 2019/3/17
  Time: 22:09
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
        <li id="teacher_nav_notice">
            <a href="#">公告中心</a>
        </li>
        <li id="teacher_nav_message">
            <a href="#">留言中心</a>
        </li>
        <li id="teacher_nav_article">
            <a href="#">文章中心</a>
        </li>
        <li id="teacher_nav_file">
            <a href="#">课件中心</a>
        </li>
        <li class="fr">
            <a href="/login"><span id="teacher_nav_name"></span>退出登录</a>
        </li>
    </ul>
</div>
<div class="cf"></div>
<%--公告中心--%>
<div id="teacher_notice" class="BaseMain">
    <%--我的公告列表--%>
    <div class="NoticeBg">
        <div>
            <img class="NoticeImg" src="../image/icon/公告.png">
            <h3>我发布的公告</h3>
            <button onclick="addNotice()" data-toggle="modal" data-target="#teacher_notice_dialog" type='button' class='close btn btn-sm fr NoticeAddBtn' aria-hidden='true'><span class="glyphicon glyphicon-plus"></span>&nbsp;添加公告</button>
            <div class="cf"></div>
        </div>
        <div class="BaseLine"></div>
        <%--公告列表--%>
        <div id="teacher_notice_list"></div>
        <div id="teacher_notice_no" class="NoticeCard" style="display: none;">
            <h4>暂无公告!</h4>
        </div>
    </div>
</div>
<%--公告中心对话框--%>
<div id='teacher_notice_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='teacher_notice_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='teacher_notice_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='teacher_notice_dialog_id'/>
                <div class='form-horizontal' id='teacher_notice_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">公告标题</label>
                        <div class="col-sm-10">
                            <input id="teacher_notice_dialog_title" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">公告详情</label>
                        <div class="col-sm-10">
                            <textarea id="teacher_notice_dialog_detail" class="form-control" rows="11"></textarea>
                        </div>
                    </div>
                </div>
                <div id='teacher_notice_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="teacher_notice_dialog_btn_add" type="button" class="btn btn-info">添加</button>
                <button id="teacher_notice_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="teacher_notice_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--留言中心--%>
<div id="teacher_message" class="BaseMain">
    <%--我的留言列表--%>
    <div class="NoticeBg">
        <div>
            <img class="NoticeImg" src="../image/icon/留言.png">
            <h3>收到的留言</h3>
            <div class="cf"></div>
        </div>
        <div class="BaseLine"></div>
        <%--留言列表--%>
        <div id="teacher_message_list"></div>
        <div id="teacher_message_no" class="NoticeCard" style="display: none;">
            <h4>暂无留言!</h4>
        </div>
    </div>
</div>
<%--文章中心--%>
<div id="teacher_article" class="BaseMain">
    <div class="NoticeBg">
        <div id="teacher_article_top">
            <img class="NoticeImg" src="../image/icon/文章.png">
            <h3>我的文章</h3>
            <button onclick="addArticle()" data-toggle="modal" data-target="#teacher_article_dialog" type='button' class='close btn btn-sm fr NoticeAddBtn' aria-hidden='true'><span class="glyphicon glyphicon-edit"></span>&nbsp;写文章</button>
            <div class="cf"></div>
        </div>
        <div class="BaseLine"></div>
        <%--文章--%>
        <div class="ArticleMain" id="teacher_article_main">
            <%--文章列表--%>
            <div class="ArticleList" id="teacher_article_list"></div>
            <%--文章详情--%>
            <div class="ArticleDetail" id="teacher_article_detail">
                <%--文章操作工具栏--%>
                <div>
                    <button onclick="editArticle()" data-toggle="modal" data-target="#teacher_article_dialog" type='button' class='btn btn-sm btn-info'><span class="glyphicon glyphicon-edit"></span></button>
                    <button onclick="delArticle()" data-toggle="modal" data-target="#teacher_article_dialog" type='button' class='btn btn-sm btn-danger'><span class="glyphicon glyphicon-remove"></span></button>
                </div>
                <%--文章ID--%>
                <input type="hidden" id="teacher_article_detail_id">
                <%--文章标题--%>
                <h3 class="ArticleDetailTitle" id="teacher_article_detail_title"></h3>
                <p id="teacher_article_detail_content"></p>
            </div>
        </div>
        <div id="teacher_article_no" class="NoticeCard" style="display: none;">
            <h4>暂无文章!</h4>
        </div>
    </div>
</div>
<%--文章中❤对话框--%>
<div id='teacher_article_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='teacher_article_dialog_label' aria-hidden='true' style="z-index: 9999;"  data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='teacher_article_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='teacher_article_dialog_id'/>
                <div class='form-horizontal' id='teacher_article_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">文章标题</label>
                        <div class="col-sm-10">
                            <input id="teacher_article_dialog_title" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">文章内容</label>
                        <div class="col-sm-10">
                            <textarea id="teacher_article_dialog_detail" class="form-control" rows="20"></textarea>
                        </div>
                    </div>
                </div>
                <div id='teacher_article_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="teacher_article_dialog_btn_add" type="button" class="btn btn-info">添加</button>
                <button id="teacher_article_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="teacher_article_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--课件中心--%>
<div id="teacher_file" class="BaseMain">
    <div class="NoticeBg">
        <div id="teacher_file_top">
            <img class="NoticeImg" src="../image/icon/课件.png">
            <h3>我的课件</h3>
            <button onclick="addFile()" data-toggle="modal" data-target="#teacher_file_dialog" type='button' class='close btn btn-sm fr NoticeAddBtn' aria-hidden='true'><span class="glyphicon glyphicon-plus"></span>&nbsp;添加课件</button>
            <div class="cf"></div>
        </div>
        <div class="BaseLine"></div>
        <table class="table mytable FileTable" id="teacher_file_table" data-show-columns="false"></table>
    </div>
</div>
<%--课件中心对话框--%>
<div id='teacher_file_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='teacher_file_dialog_label' aria-hidden='true' style="z-index: 9999;"  data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='teacher_file_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='teacher_file_dialog_id'/>
                <div class='form-horizontal' id='teacher_file_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课件名称</label>
                        <div class="col-sm-10">
                            <input id="teacher_file_dialog_title" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课件文件</label>
                        <div class="col-sm-10">
                            <form id="teacher_file_dialog_form" enctype="multipart/form-data">
                                <input id="teacher_file_dialog_file" name="file" type="file">
                            </form>
                        </div>
                    </div>
                </div>
                <div id='teacher_file_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="teacher_file_dialog_add" type="button" class="btn btn-info">添加</button>
                <button id="teacher_file_dialog_edit" type="button" class="btn btn-info">编辑</button>
                <button id="teacher_file_dialog_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<div class="cf"></div>
<%--底部--%>
<div class="Bottom">Copyright 2019 通用型线上课堂同步助手 All Rights Reserved</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/utils/base64.js"></script>
<script src="../js/teacher.js"></script>
</body>
</html>
