<%--
  Created by IntelliJ IDEA.
  User: 晓敏
  Date: 2019/3/17
  Time: 20:54
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
<div class="AdminNav">
    <img src="../image/logo.png"/>
    <ul>
        <li id='admin_nav_student'>
            <a><span class="glyphicon glyphicon-user"></span>&nbsp;学生管理</a>
        </li>
        <li id='admin_nav_teacher'>
            <a><span class='glyphicon glyphicon-education'></span>&nbsp;教师管理</a>
        </li>
        <li class='fr' style='margin-right:100px;'>
            <a href="/login"><span id='admin_nav_name'></span>退出登录&nbsp;<span class='glyphicon glyphicon-log-out'></span></a>
        </li>
    </ul>
</div>
<div class="cf"></div>
<%--学生管理--%>
<div id='admin_student_lay' class='AdminMain'>
    <%--工具栏--%>
    <div id='admin_toolbar_student' class='btn-group'>
        <button class="btn btn-info" data-toggle="modal" data-target="#admin_student_dialog" onclick='addStudent()'>
            <span class='glyphicon glyphicon-plus'></span>添加学生账号
        </button>
    </div>
    <%--学生信息表--%>
    <table id='admin_table_student' class='table mytable'></table>
</div>
<%--学生操作对话框--%>
<div id='admin_student_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_student_dialog_label' aria-hidden='true' style="z-index: 9999;">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_student_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_student_dialog_id'/>
                <div class='form-horizontal' id='admin_student_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">学号</label>
                        <div class="col-sm-10">
                            <input id="admin_student_dialog_acount" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_student_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_student_dialog_pwd" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div id='admin_student_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_student_dialog_btn_add" type="button" class="btn btn-info">创建</button>
                <button id="admin_student_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="admin_student_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--教师管理--%>
<div id='admin_teacher_lay' class='AdminMain'>
    <%--工具栏--%>
    <div id='admin_toolbar_teacher' class='btn-group'>
        <button class="btn btn-info" data-toggle="modal" data-target="#admin_teacher_dialog" onclick='addTeacher()'>
            <span class='glyphicon glyphicon-plus'></span>
            添加教师账号
        </button>
    </div>
    <%--教师信息表--%>
    <table id='admin_table_teacher' class='table mytable'></table>
</div>
<%--教师操作对话框--%>
<div id='admin_teacher_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_teacher_dialog_label' aria-hidden='true' style="z-index: 9999;">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_teacher_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_teacher_dialog_id'/>
                <div class='form-horizontal' id='admin_teacher_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">电话</label>
                        <div class="col-sm-10">
                            <input id="admin_teacher_dialog_acount" type="text" class="form-control" maxlength='11'/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_teacher_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_teacher_dialog_pwd" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课程</label>
                        <div class="col-sm-10">
                            <input id="admin_teacher_dialog_course" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div id='admin_teacher_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_teacher_dialog_btn_add" type="button" class="btn btn-info">创建</button>
                <button id="admin_teacher_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="admin_teacher_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/utils/base64.js"></script>
<script src="../js/admin.js"></script>
</body>
</html>
