//启动入口
$(function () {
   initLoginPage();
});
/**
 * 初始化登录页面
 */
function initLoginPage() {
    $('#login_body_login').show();
    $('#login_open_sign_up').click(function () {
        $('#login_body_login').hide();
        $('#login_body_sign_up').show();
    });
    $('#login_close_sign_up').click(function () {
        $('#login_body_sign_up').hide();
        $('#login_body_login').show();
    });
    //绑定登录按钮
    $('#login_btn_login').click(function () {
        //获取数据
        var name = $('#name').val();
        var pwd = $('#pwd').val();
        var type = $('#type').val();
        //数据校验
        if ('' == name || '' == pwd) {
            alert('请输入账号/密码!');
        } else {
            //封装数据
            var data = {action:"ACTION_LOGIN",name:name,pwd:pwd,type:type};
            //提交数据到后台
            $.ajax({
                type: 'post',
                url: '/login',
                dataType: "json",
                data: data,
                success: function (res) {
                    //登录成功,分发页面
                    switch (type) {
                        case '0':
                            window.location = '/select?id=' + res.id + "&name=" + res.name;
                            break;
                        case '1':
                            window.location = '/teacher?id=' + res.id + "&name=" + res.name + "&course=" + res.course;
                            break;
                        case '2':
                            window.location = '/admin?name=' + res.name;
                            break;
                    }
                },
                error: function () {
                    //登录失败
                    alert('账号/密码错误!');
                }
            });
        }
    });
    //绑定注册按钮
    $('#login_btn_sign_up').click(function () {
       //获取数据
       var acount = $('#sign_up_acount').val();
       var name = $('#sign_up_name').val();
       var pwd = $('#sign_up_pwd').val();
       //数据校验
        if ('' == acount || '' == name || '' == pwd) {
            alert('请输入正确的信息!');
        } else {
            //封装数据
            var data = {action:"ACTION_SIGN_UP",acount:acount,name:name,pwd:pwd};
            //提交数据到后台
            $.ajax({
                type: 'post',
                url: '/login',
                dataType: "json",
                data: data,
                success: function (res) {
                    if (res) {
                        alert('注册成功!');
                        $('#name').val(acount);
                        $('#pwd').val(pwd);
                        $('#type').val('0');
                        $('#login_btn_login').click();
                    } else {
                        alert('该学号已被注册!');
                    }
                },
                error: function () {
                    alert('注册失败!');
                }
            });
        }
    });
}
(function () {
    var bv = new Bideo();
    bv.init({
        //获取视频播放控件
        videoEl: document.querySelector('#bg_video'),
        //获取根布局
        container: document.querySelector('body'),
        // Resize
        resize: true,
        //控制手机屏幕
        isMobile: window.matchMedia('(max-width: 768px)').matches,
        //设置视频播放资源
        src: [
            {
                src: '../data/Audience.mp4',
                type: 'video/mp4'
            }
        ],

        //加载完成后隐藏封面
        onLoad: function () {
            document.querySelector('#bg_cover').style.display = 'none';
        }
    });
}());