//启动入口
$(function () {
    initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    //分配顶部导航栏的状态
    $('#admin_nav_name').html('欢迎您：' + getUrlParam('name') + '&nbsp;&nbsp;&nbsp;&nbsp;');
    var menu = getUrlParam('menu');
    if (null == menu) {
        $('#admin_nav_student a').css('color','#0083ce');
        initAdminStudent();
    } else {
        switch (menu) {
            case 'student':
                $('#admin_nav_student a').css('color','#0083ce');
                initAdminStudent();
                break;
            case 'teacher':
                $('#admin_nav_teacher a').css('color','#0083ce');
                initAdminTeacher();
                break;
        }
    }
    //绑定导航栏按钮
    $('#admin_nav_student').click(function () {
        window.location = '/admin?name=' + getUrlParam('name') + '&menu=student';
    });
    $('#admin_nav_teacher').click(function () {
        window.location = '/admin?name=' + getUrlParam('name') + '&menu=teacher';
    });
}

/**
 * 初始化学生管理
 */
function initAdminStudent() {
    $('#admin_student_lay').show();
    initAdminStudentTable(1);
}

/**
 * 初始化学生信息表
 */
function initAdminStudentTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        id:'#admin_table_student',
        toolbar:'#admin_toolbar_student',
        pageNumber:pageNumber,
        data: {action:'ACTION_ADMIN_GET_STUDENT'},
        search:true,
        export:false,
        columns:[{
            field: 'acount',
            title: '学号',
            align: 'center'
        },{
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'pwd',
            title: '密码',
            align: 'center',
            formatter: function (value, row, index) {
                return new Base64().decode(value);
            }
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var student = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_student_dialog\" onclick='editStudent(\"" + student + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_student_dialog\" onclick='delStudent(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化学生管理对话框
 */
function initStudentDialog() {
    $('#admin_student_dialog_btn_add').hide();
    $('#admin_student_dialog_btn_edit').hide();
    $('#admin_student_dialog_btn_del').hide();
    $('#admin_student_dialog_body').hide();
    $('#admin_student_dialog_warn').hide();
}

/**
 * 添加学生
 */
function addStudent() {
    initStudentDialog();
    //清除数据
    $('#admin_student_dialog_acount').val('');
    $("#admin_student_dialog_acount").removeAttr("disabled");
    $('#admin_student_dialog_name').val('');
    $('#admin_student_dialog_pwd').val('');
    $('#admin_student_dialog_label').html('添加学生账号');
    $('#admin_student_dialog_body').show();
    $('#admin_student_dialog_btn_add').show();
}

/**
 * 绑定添加学生按钮
 */
$('#admin_student_dialog_btn_add').click(function () {
    //获取数据
    var acount = $('#admin_student_dialog_acount').val();
    var name = $('#admin_student_dialog_name').val();
    var pwd = $('#admin_student_dialog_pwd').val();
    //数据校验
    if ('' == acount || '' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_STUDENT',
            acount:acount,
            name:name,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('添加成功!');
                    $('#admin_student_dialog').modal('hide');
                    //刷新表格
                    initAdminStudentTable(1);
                } else {
                    alert('账号已存在!');
                }
            },
            error: function () {
                alert('添加失败!');
            }
        });
    }
});

/**
 * 编辑学生信息
 * @param data
 */
function editStudent(data) {
    var student = JSON.parse(unescape(data));
    initStudentDialog();
    //填充数据
    $('#admin_student_dialog_id').val(student.id);
    $('#admin_student_dialog_acount').val(student.acount);
    $("#admin_student_dialog_acount").attr("disabled","disabled");
    $('#admin_student_dialog_name').val(student.name);
    $('#admin_student_dialog_pwd').val(new Base64().decode(student.pwd));
    $('#admin_student_dialog_label').html('编辑学生账号');
    $('#admin_student_dialog_body').show();
    $('#admin_student_dialog_btn_edit').show();
}

/**
 * 绑定编辑学生信息按钮
 */
$('#admin_student_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_student_dialog_id').val();
    var acount = $('#admin_student_dialog_acount').val();
    var name = $('#admin_student_dialog_name').val();
    var pwd = $('#admin_student_dialog_pwd').val();
    //数据校验
    if ('' == acount || '' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_STUDENT',
            id:id,
            acount:acount,
            name:name,
            pwd:pwd
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#admin_student_dialog').modal('hide');
                    //刷新表格
                    initAdminStudentTable($('#admin_table_student').bootstrapTable('getOptions').pageNumber);
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
 * 删除学生信息
 * @param id
 */
function delStudent(id) {
    initStudentDialog();
    //填充数据
    $('#admin_student_dialog_id').val(id);
    $('#admin_student_dialog_label').html('删除学生账号');
    $('#admin_student_dialog_warn').show();
    $('#admin_student_dialog_btn_del').show();
}

/**
 * 绑定删除学生信息按钮
 */
$('#admin_student_dialog_btn_del').click(function () {
    var id = $('#admin_student_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_STUDENT',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#admin_student_dialog').modal('hide');
                //刷新表格
                initAdminStudentTable($('#admin_table_student').bootstrapTable('getOptions').pageNumber);
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
 * 初始化教师管理
 */
function initAdminTeacher() {
    $('#admin_teacher_lay').show();
    initAdminTeacherTable(1);
}

/**
 * 初始化教师信息表
 */
function initAdminTeacherTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        id:'#admin_table_teacher',
        toolbar:'#admin_toolbar_teacher',
        pageNumber:pageNumber,
        data:{action:'ACTION_ADMIN_GET_TEACHER'},
        search:true,
        export:false,
        columns:[{
            field: 'phone',
            title: '账号',
            align: 'center'
        },{
            field: 'name',
            title: '姓名',
            align: 'center'
        },{
            field: 'pwd',
            title: '密码',
            align: 'center',
            formatter: function (value, row, index) {
                return new Base64().decode(value);
            }
        },{
            field: 'course',
            title: '课程',
            align: 'center'
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var teacher = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_teacher_dialog\" onclick='editTeacher(\"" + teacher + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_teacher_dialog\" onclick='delTeacher(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化教师管理对话框
 */
function initTeacherDialog() {
    $('#admin_teacher_dialog_btn_add').hide();
    $('#admin_teacher_dialog_btn_edit').hide();
    $('#admin_teacher_dialog_btn_del').hide();
    $('#admin_teacher_dialog_body').hide();
    $('#admin_teacher_dialog_warn').hide();
}

/**
 * 添加教师
 */
function addTeacher() {
    initTeacherDialog();
    //清除数据
    $('#admin_teacher_dialog_acount').val('');
    $("#admin_teacher_dialog_acount").removeAttr("disabled");
    $('#admin_teacher_dialog_name').val('');
    $('#admin_teacher_dialog_pwd').val('');
    $('#admin_teacher_dialog_course').val('');
    $('#admin_teacher_dialog_body').show();
    $('#admin_teacher_dialog_btn_add').show();
    $('#admin_teacher_dialog_label').html('添加教师账号');
}

/**
 * 添加教师信息
 */
$('#admin_teacher_dialog_btn_add').click(function () {
    //获取数据
    var phone = $('#admin_teacher_dialog_acount').val();
    var name = $('#admin_teacher_dialog_name').val();
    var pwd = $('#admin_teacher_dialog_pwd').val();
    var course = $('#admin_teacher_dialog_course').val();
    //数据校验
    if ('' == phone || '' == name || '' == pwd || '' == course || !isPoneAvailable(phone)) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_ADD_TEACHER',
            phone:phone,
            name:name,
            pwd:pwd,
            course:course
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('添加成功!');
                    $('#admin_teacher_dialog').modal('hide');
                    //刷新表格
                    initAdminTeacherTable(1);
                } else {
                    alert('账号已存在!');
                }
            },
            error: function () {
                alert('添加失败!');
            }
        });
    }
});

/**
 * 编辑教师信息
 * @param data
 */
function editTeacher(data) {
    var teacher = JSON.parse(unescape(data));
    initTeacherDialog();
    //填充数据
    $('#admin_teacher_dialog_id').val(teacher.id);
    $('#admin_teacher_dialog_acount').val(teacher.phone);
    $("#admin_teacher_dialog_acount").attr("disabled","disabled");
    $('#admin_teacher_dialog_name').val(teacher.name);
    $('#admin_teacher_dialog_pwd').val(new Base64().decode(teacher.pwd));
    $('#admin_teacher_dialog_course').val(teacher.course);
    $('#admin_teacher_dialog_body').show();
    $('#admin_teacher_dialog_btn_edit').show();
    $('#admin_teacher_dialog_label').html('修改教师账号');
}

/**
 * 绑定编辑教师信息按钮
 */
$('#admin_teacher_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#admin_teacher_dialog_id').val();
    var phone = $('#admin_teacher_dialog_acount').val();
    var name = $('#admin_teacher_dialog_name').val();
    var pwd = $('#admin_teacher_dialog_pwd').val();
    var course = $('#admin_teacher_dialog_course').val();
    //数据校验
    if ('' == phone || '' == name || '' == pwd || '' == course) {
        alert('数据无效!');
    } else {
        //封装数据
        var data = {
            action:'ACTION_ADMIN_EDIT_TEACHER',
            id:id,
            phone:phone,
            name:name,
            pwd:pwd,
            course:course
        };
        //提交数据到后台
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#admin_teacher_dialog').modal('hide');
                    //刷新表格
                    initAdminTeacherTable($('#admin_table_teacher').bootstrapTable('getOptions').pageNumber);
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
 * 删除教师信息
 * @param id
 */
function delTeacher(id) {
    initTeacherDialog();
    //填充数据
    $('#admin_teacher_dialog_id').val(id);
    $('#admin_teacher_dialog_warn').show();
    $('#admin_teacher_dialog_btn_del').show();
    $('#admin_teacher_dialog_label').html('删除教师账号');
}

/**
 * 绑定删除教师信息按钮
 */
$('#admin_teacher_dialog_btn_del').click(function () {
    var id = $('#admin_teacher_dialog_id').val();
    //封装数据
    var data = {
        action:'ACTION_ADMIN_DEL_TEACHER',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#admin_teacher_dialog').modal('hide');
                //刷新表格
                initAdminTeacherTable($('#admin_table_teacher').bootstrapTable('getOptions').pageNumber);
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
 * 手机号校验
 * @param phone
 * @returns {boolean}
 */
function isPoneAvailable(phone) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}