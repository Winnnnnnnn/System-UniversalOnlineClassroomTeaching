package com.main.bean;

/**
 * @author 晓敏
 * @date 2019/03/17
 * @describe 教学文章Bean
 */
public class AriticleBean {
    private int id;
    private String title;
    private String detail;
    private int teacher;
    private String time;

    public AriticleBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public int getTeacher() {
        return teacher;
    }

    public void setTeacher(int teacher) {
        this.teacher = teacher;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
