package com.main.back;

import com.main.bean.AdminBean;
import com.main.bean.StudentBean;
import com.main.bean.TeacherBean;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static com.main.utils.ConstUtil.ACTION_LOGIN;
import static com.main.utils.ConstUtil.ACTION_SIGN_UP;

/**
 * @author 晓敏
 * @date 2019/03/17
 * @describe 登录页后台
 */
@WebServlet(name="login",urlPatterns="/login")
public class Login extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/Login.jsp").forward(req,resp);
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
                case ACTION_LOGIN:
                    //登录动作
                    printWriter.print(doLogin(req));
                    break;
                case ACTION_SIGN_UP:
                    printWriter.print(doSignUp(req));
                    break;
            }
        }
    }

    /**
     * 执行登录动作
     * @param req
     * @return
     */
    private String doLogin(HttpServletRequest req) {
        //判断登录类型
        int type = Integer.parseInt(req.getParameter("type"));
        String sql = "";
        String[] p = {
                req.getParameter("name"),
                Base64Util.encode(req.getParameter("pwd"))
        };
        switch (type) {
            case 0:
                sql = "select * from student where acount=? and pwd=?";
                StudentBean studentBean = SqlHelper.doObjQuery(sql,p,StudentBean.class);
                if (studentBean != null) {
                    //登录成功
                    JSONObject adminJson = JSONObject.fromObject(studentBean);
                    return adminJson.toString();
                } else {
                    //登录失败
                    return "";
                }
            case 1:
                sql = "select * from teacher where phone=? and pwd=?";
                TeacherBean teacherBean = SqlHelper.doObjQuery(sql,p,TeacherBean.class);
                if (teacherBean != null) {
                    //登录成功
                    JSONObject adminJson = JSONObject.fromObject(teacherBean);
                    return adminJson.toString();
                } else {
                    //登录失败
                    return "";
                }
            case 2:
                sql = "select * from admin where name=? and pwd=?";
                AdminBean adminBean = SqlHelper.doObjQuery(sql,p,AdminBean.class);
                if (adminBean != null) {
                    //登录成功
                    JSONObject adminJson = JSONObject.fromObject(adminBean);
                    return adminJson.toString();
                } else {
                    //登录失败
                    return "";
                }
        }
        return "";
    }

    /**
     * 执行学生注册
     * @param req
     * @return
     */
    private Boolean doSignUp(HttpServletRequest req) {
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
}
