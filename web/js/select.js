$(function () {
    //获取教师数据
    $.ajax({
        type: 'post',
        url: '/select',
        dataType: "json",
        data: {},
        success: function (res) {
            if (res.length != 0) {
                $.each(res,function (i,obj) {
                    var teacher = escape(JSON.stringify(obj));
                    var teacher = "<li onclick='goStudent(\"" + teacher + "\")'>" + obj.course + "：" + obj.name + "</li>";
                    $('#teacher_list').append(teacher);
                });
            } else {
                console.log('发生错误!');
            }
        },
        error: function () {
            console.log('发生错误!');
        }
    });
});

/**
 * 跳转到学生首页
 * @param data
 */
function goStudent(data) {
    var teacher = JSON.parse(unescape(data));
    window.location = '/student?id=' + getUrlParam('id') + "&name=" + getUrlParam('name') + "&teacherid=" + teacher.id + "&teachercourse=" + teacher.course + "&teachername=" + teacher.name;
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