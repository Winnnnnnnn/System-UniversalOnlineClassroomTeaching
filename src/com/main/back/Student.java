package com.main.back;

import com.main.bean.MessageBean;
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
 * @date 2019/03/30
 * @describe 学生页后台
 */
@WebServlet(name="student",urlPatterns="/student")
public class Student extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/Student.jsp").forward(req,resp);
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
                case ACTION_STUDENT_DOWNLOAD:
                    printWriter.print(download(req));
                    break;
                case ACTION_STUDENT_GET_ARTICLE:
                    printWriter.print(getMessage(req));
                    break;
                case ACTION_STUDENT_ADD_MESSAGE:
                    printWriter.print(addMessage(req));
                    break;
                case ACTION_STUDENT_DEL_MESSAGE:
                    printWriter.print(delMessage(req));
                    break;
            }
        }
    }

    /**
     * 下载统计
     * @param req
     * @return
     */
    private Boolean download(HttpServletRequest req) {
        String sql = "update files set download=download+1 where id=?";
        String[] p = {req.getParameter("id")};
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取我的留言
     * @param req
     * @return
     */
    private String getMessage(HttpServletRequest req) {
        String sql = "select message.*,student.name from message,student where message.teacher=? and message.student=? and message.student=student.id order by id desc";
        String[] p = {req.getParameter("teacher"),req.getParameter("student")};
        List<MessageBean> messageBeans = SqlHelper.doListQuery(sql,p,MessageBean.class);
        if (messageBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(messageBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 留言
     * @param req
     * @return
     */
    private Boolean addMessage(HttpServletRequest req) {
        String sql = "insert into message(detail,student,teacher,time) values(?,?,?,?)";
        String[] p = {
                req.getParameter("detail"),
                req.getParameter("student"),
                req.getParameter("teacher"),
                req.getParameter("time")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除留言
     * @param req
     * @return
     */
    private Boolean delMessage(HttpServletRequest req) {
        String sql = "delete from message where id=?";
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
