package com.main.back;

import com.main.bean.AriticleBean;
import com.main.bean.FileBean;
import com.main.bean.MessageBean;
import com.main.bean.NoticeBean;
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
 * @describe 教师页后台
 */
@WebServlet(name="teacher",urlPatterns="/teacher")
public class Teacher extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/view/Teacher.jsp").forward(req,resp);
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
                case ACTION_TEACHER_GET_NOTICE:
                    printWriter.print(getNotice(req));
                    break;
                case ACTION_TEACHER_ADD_NOTICE:
                    printWriter.print(addNotice(req));
                    break;
                case ACTION_TEACHER_EDIT_NOTICE:
                    printWriter.print(editNotice(req));
                    break;
                case ACTION_TEACHER_DEL_NOTICE:
                    printWriter.print(delNotice(req));
                    break;
                case ACTION_TEACHER_GET_MESSAGE:
                    printWriter.print(getMessage(req));
                    break;
                case ACTION_TEACHER_REPLY_MESSAGE:
                    printWriter.print(replyMessage(req));
                    break;
                case ACTION_TEACHER_GET_ARTICLE:
                    printWriter.print(getArticle(req));
                    break;
                case ACTION_TEACHER_ADD_ARTICLE:
                    printWriter.print(addArticle(req));
                    break;
                case ACTION_TEACHER_EDIT_ARTICLE:
                    printWriter.print(editArticle(req));
                    break;
                case ACTION_TEACHER_DEL_ARTICLE:
                    printWriter.print(delArticle(req));
                    break;
                case ACTION_TEACHER_GET_FILE:
                    printWriter.print(getFile(req));
                    break;
                case ACTION_TEACHER_ADD_FILE:
                    printWriter.print(addFile(req));
                    break;
                case ACTION_TEACHER_EDIT_FILE:
                    printWriter.print(editFile(req));
                    break;
                case ACTION_TEACHER_DEL_FILE:
                    printWriter.print(delFile(req));
                    break;
            }
        }
    }

    /**
     * 获取我发布的公告
     * @param req
     * @return
     */
    private String getNotice(HttpServletRequest req) {
        String sql = "select * from notice where teacher=? order by id desc";
        String[] p = {req.getParameter("id")};
        List<NoticeBean> noticeBeanList = SqlHelper.doListQuery(sql,p,NoticeBean.class);
        if (noticeBeanList != null) {
            JSONArray jsonArray = JSONArray.fromObject(noticeBeanList);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加公告
     * @param req
     * @return
     */
    private Boolean addNotice(HttpServletRequest req) {
        String sql = "insert into notice(title,detail,teacher,time) values(?,?,?,?)";
        String[] p = {
                req.getParameter("title"),
                req.getParameter("detail"),
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
     * 编辑公告
     * @param req
     * @return
     */
    private Boolean editNotice(HttpServletRequest req) {
        String sql = "update notice set title=?,detail=? where id=?";
        String[] p = {
                req.getParameter("title"),
                req.getParameter("detail"),
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
     * 删除公告
     * @param req
     * @return
     */
    private Boolean delNotice(HttpServletRequest req) {
        String sql = "delete from notice where id=?";
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
     * 获取我收到的留言
     * @param req
     * @return
     */
    private String getMessage(HttpServletRequest req) {
        String sql = "select message.*,student.name from message,student where message.teacher=? and message.student=student.id order by id desc";
        String[] p = {req.getParameter("id")};
        List<MessageBean> messageBeans = SqlHelper.doListQuery(sql,p,MessageBean.class);
        if (messageBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(messageBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 回复留言
     * @param req
     * @return
     */
    private Boolean replyMessage(HttpServletRequest req) {
        String sql = "update message set reply=? where id=?";
        String[] p = {
                req.getParameter("reply"),
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
     * 获取我发的文章
     * @param req
     * @return
     */
    private String getArticle(HttpServletRequest req) {
        String sql = "select * from article where teacher=? order by id desc";
        String[] p = {req.getParameter("id")};
        List<AriticleBean> ariticleBeans = SqlHelper.doListQuery(sql,p,AriticleBean.class);
        if (ariticleBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(ariticleBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 发布文章
     * @param req
     * @return
     */
    private Boolean addArticle(HttpServletRequest req) {
        String sql = "insert into article(title,detail,teacher,time) values(?,?,?,?)";
        String[] p = {
                req.getParameter("title"),
                req.getParameter("detail"),
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
     * 修改文章
     * @param req
     * @return
     */
    private Boolean editArticle(HttpServletRequest req) {
        String sql = "update article set title=?,detail=? where id=?";
        String[] p = {
                req.getParameter("title"),
                req.getParameter("detail"),
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
     * 删除文章
     * @param req
     * @return
     */
    private Boolean delArticle(HttpServletRequest req) {
        String sql = "delete from article where id=?";
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
     * 获取我发布的课件
     * @param req
     * @return
     */
    private String getFile(HttpServletRequest req) {
        String sql = "select * from files where teacher=? order by id desc";
        String[] p = {req.getParameter("teacher")};
        List<FileBean> fileBeans = SqlHelper.doListQuery(sql,p,FileBean.class);
        if (fileBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(fileBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加课件
     * @param req
     * @return
     */
    private Boolean addFile(HttpServletRequest req) {
        String sql = "insert into files(title,file,teacher,time) values(?,?,?,?)";
        String[] p = {
                req.getParameter("title"),
                req.getParameter("file"),
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
     * 修改课件
     * @param req
     * @return
     */
    private Boolean editFile(HttpServletRequest req) {
        String filename = req.getParameter("file");
        String sql = "";
        if (null == filename || filename.equals("")) {
            sql = "update files set title=? where id=?";
            String[] p = {
                    req.getParameter("title"),
                    req.getParameter("id")
            };
            int result = SqlHelper.doUpdate(sql,p);
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            sql = "update files set title=?,file=? where id=?";
            String[] p = {
                    req.getParameter("title"),
                    req.getParameter("file"),
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

    /**
     * 刪除课件
     * @param req
     * @return
     */
    private Boolean delFile(HttpServletRequest req) {
        String sql = "delete from files where id=?";
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
