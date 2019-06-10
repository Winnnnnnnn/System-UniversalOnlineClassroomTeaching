package com.main.bean;

/**
 * @author 晓敏
 * @date 2019/03/17
 * @describe 学生Bean
 */
public class StudentBean {
    private int id;
    private String acount;
    private String name;
    private String pwd;

    public StudentBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAcount() {
        return acount;
    }

    public void setAcount(String acount) {
        this.acount = acount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
