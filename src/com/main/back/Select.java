package com.main.back;

import com.main.bean.TeacherBean;
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

/**
 * @author 晓敏
 * @date 2019/03/30
 * @describe 教师选择页后台
 */
@WebServlet(name="select",urlPatterns="/select")
public class Select extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/Select.jsp").forward(req,resp);
    }

    /**
     * 获取全部教师列表
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
        //回调结果
        PrintWriter printWriter = resp.getWriter();
        String sql = "select * from teacher order by id desc";
        List<TeacherBean> teacherBeans = SqlHelper.doListQuery(sql,null,TeacherBean.class);
        if (teacherBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(teacherBeans);
            printWriter.print(jsonArray.toString());
        } else {
            printWriter.print("");
        }
    }
}
