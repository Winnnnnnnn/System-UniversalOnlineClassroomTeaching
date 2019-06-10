package com.main.bean;

/**
 * @author 晓敏
 * @date 2019/03/17
 * @describe 管理员Bean
 */
public class AdminBean {
    private int id;
    private String name;
    private String pwd;

    public AdminBean() {
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

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
