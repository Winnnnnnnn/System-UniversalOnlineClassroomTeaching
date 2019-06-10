package com.main.bean;

/**
 * @author 晓敏
 * @date 2019/03/17
 * @describe 教师Bean
 */
public class TeacherBean {
    private int id;
    private String name;
    private String phone;
    private String pwd;
    private String course;

    public TeacherBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }
}
