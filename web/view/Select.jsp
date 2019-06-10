<%--
  Created by IntelliJ IDEA.
  User: 晓敏
  Date: 2019/3/30
  Time: 16:45
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
<%--教师选择列表--%>
<div class="LoginBg">
    <div class="LoginLogo">
        <%--LOGO--%>
        <img src="../image/logo.png">
    </div>
    <h2 style="text-align: center;margin-bottom: 20px;font-weight: bold;">请选择教师</h2>
    <%--教师选择列表--%>
    <ul class="SelectTeacher" id="teacher_list"></ul>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bideo.js"></script>
<script src="../js/select.js"></script>
</body>
</html>
