package com.main.back;

import com.main.bean.StudentBean;
import com.main.bean.TeacherBean;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.main.utils.ConstUtil.*;

/**
 * @author 晓敏
 * @date 2019/03/17
 * @describe 管理员后台
 */
@WebServlet(name="admin",urlPatterns="/admin")
public class Admin extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/Admin.jsp").forward(req,resp);
    }

    /**
     * 处理浏览器POST请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        //获取请求来自于哪里，做什么动作
        String action = req.getParameter("action");
        //回调结果
        PrintWriter printWriter = resp.getWriter();
        //判断动作
        if (action != null) {
            switch (action) {
                case ACTION_ADMIN_GET_STUDENT:
                    printWriter.print(getStudent(req));
                    break;
                case ACTION_ADMIN_ADD_STUDENT:
                    printWriter.print(addStudent(req));
                    break;
                case ACTION_ADMIN_EDIT_STUDENT:
                    printWriter.print(editStudent(req));
                    break;
                case ACTION_ADMIN_DEL_STUDENT:
                    printWriter.print(delStudent(req));
                    break;
                case ACTION_ADMIN_GET_TEACHER:
                    printWriter.print(getTeacher(req));
                    break;
                case ACTION_ADMIN_ADD_TEACHER:
                    printWriter.print(addTeacher(req));
                    break;
                case ACTION_ADMIN_EDIT_TEACHER:
                    printWriter.print(editTeacher(req));
                    break;
                case ACTION_ADMIN_DEL_TEACHER:
                    printWriter.print(delTeacher(req));
                    break;
            }
        }
    }

    /**
     * 获取全部学生信息
     * @param req
     * @return
     */
    private String getStudent(HttpServletRequest req) {
        String sql = "select * from student order by id desc";
        List<StudentBean> studentBeans = SqlHelper.doListQuery(sql,null,StudentBean.class);
        if (studentBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(studentBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加学生账号
     * @param req
     * @return
     */
    private Boolean addStudent(HttpServletRequest req) {
        //判断是否已经被注册
        String check = "select acount from student where acount=?";
        String[] check_p = {req.getParameter("acount")};
        StudentBean check_r = SqlHelper.doObjQuery(check,check_p,StudentBean.class);
        if (null != check_r) {
            //已经被注册
            return false;
        } else {
            String sql = "insert into student(acount,name,pwd) values(?,?,?)";
            String[] p = {
                    req.getParameter("acount"),
                    req.getParameter("name"),
                    Base64Util.encode(req.getParameter("pwd"))
            };
            int result = SqlHelper.doUpdate(sql,p);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 修改学生信息
     * @param req
     * @return
     */
    private Boolean editStudent(HttpServletRequest req) {
        String sql = "update student set name=?,pwd=? where id=?";
        String[] p = {
                req.getParameter("name"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除学生
     * @param req
     * @return
     */
    private Boolean delStudent(HttpServletRequest req) {
        String sql = "delete from student where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取全部教师
     * @param req
     * @return
     */
    private String getTeacher(HttpServletRequest req) {
        String sql = "select * from teacher order by id desc";
        List<TeacherBean> teacherBeans = SqlHelper.doListQuery(sql,null,TeacherBean.class);
        if (teacherBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(teacherBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加教师账号
     * @param req
     * @return
     */
    private Boolean addTeacher(HttpServletRequest req) {
        //判断是否已经被注册
        String check = "select phone from teacher where phone=?";
        String[] check_p = {req.getParameter("phone")};
        TeacherBean check_r = SqlHelper.doObjQuery(check,check_p,TeacherBean.class);
        if (null != check_r) {
            //已经被注册
            return false;
        } else {
            String sql = "insert into teacher(phone,name,pwd,course) values(?,?,?,?)";
            String[] p = {
                    req.getParameter("phone"),
                    req.getParameter("name"),
                    Base64Util.encode(req.getParameter("pwd")),
                    req.getParameter("course")
            };
            int result = SqlHelper.doUpdate(sql,p);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 修改教师信息
     * @param req
     * @return
     */
    private Boolean editTeacher(HttpServletRequest req) {
        String sql = "update teacher set name=?,pwd=?,course=? where id=?";
        String[] p = {
                req.getParameter("name"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("course"),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除教师
     * @param req
     * @return
     */
    private Boolean delTeacher(HttpServletRequest req) {
        String sql = "delete from teacher where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }
}
