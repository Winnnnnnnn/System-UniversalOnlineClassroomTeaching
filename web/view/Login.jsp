<%--
  Created by IntelliJ IDEA.
  User: 晓敏
  Date: 2019/3/17
  Time: 12:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>通用型线上课堂同步教学系统</title>
    <link rel="stylesheet" href="../css/base.css">
</head>
<body class="LoginBody">
<%--全屏视频播放背景--%>
<video id="bg_video" autoplay loop muted></video>
<%--封面--%>
<div id="bg_cover" class="LoginCover"></div>
<%--蒙板--%>
<div class="LoginOverlay"></div>
<%--登录框--%>
<div class="LoginBg">
    <div class="LoginLogo">
        <%--LOGO--%>
        <img src="../image/logo.png">
    </div>
    <%--登录--%>
    <div id="login_body_login" class="LoginForm">
        <div class="LoginEditBg">
            <img src="../image/icon/用户.png">
            <input id='name' type='text' placeholder='请输入账号' autocomplete='off'>
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <div class="LoginEditBg">
            <img src="../image/icon/密码.png">
            <input id='pwd' type='password' placeholder='请输入密码' autocomplete='off'>
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <div>
            <%--身份选择--%>
            <select id="type" class="LoginSelect">
                <option value="0" class="LoginSelectOption">学生</option>
                <option value="1" class="LoginSelectOption">教师</option>
                <option value="2" class="LoginSelectOption">管理员</option>
            </select>
            <%--学生注册--%>
            <a id="login_open_sign_up" class="LoginSignUp" href="#">学生注册</a>
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <div id="login_btn_login" class="LoginButton"></div>
    </div>
    <%--注册--%>
    <div id="login_body_sign_up" class="LoginForm">
        <div class="LoginEditBg">
            <img src="../image/icon/姓名.png">
            <input id='sign_up_acount' type='text' placeholder='请输入学号' autocomplete='off'>
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <div class="LoginEditBg">
            <img src="../image/icon/用户.png">
            <input id='sign_up_name' type='text' placeholder='请输入姓名' autocomplete='off'>
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <div class="LoginEditBg">
            <img src="../image/icon/密码.png">
            <input id='sign_up_pwd' type='password' placeholder='请输入密码' autocomplete='off'>
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <div>
            <a id="login_close_sign_up" class="LoginBack" href="#">返回登录</a>
            <a id="login_btn_sign_up" class="LoginSignUp" href="#">立即注册</a>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bideo.js"></script>
<script src="../js/login.js"></script>
</body>
</html>
