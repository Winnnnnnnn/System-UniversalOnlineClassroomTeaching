/*
Navicat MySQL Data Transfer

Source Server         : 本地连接
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : educations

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2019-06-10 23:37:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `name` varchar(255) NOT NULL COMMENT '管理员名称',
  `pwd` varchar(255) NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'YWRtaW4=');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章编号',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `detail` text NOT NULL COMMENT '文章内容',
  `teacher` int(11) NOT NULL COMMENT '发布老师',
  `time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件编号',
  `title` text NOT NULL COMMENT '文件标题',
  `file` text NOT NULL COMMENT '文件路径',
  `teacher` int(11) NOT NULL COMMENT '发布老师',
  `download` int(11) NOT NULL DEFAULT '0' COMMENT '下载次数统计',
  `time` varchar(255) NOT NULL COMMENT '上传时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of files
-- ----------------------------

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '留言编号',
  `detail` text NOT NULL COMMENT '留言内容',
  `reply` text COMMENT '回复内容',
  `student` int(11) NOT NULL COMMENT '留言学生',
  `teacher` int(11) NOT NULL COMMENT '科任老师',
  `time` varchar(255) NOT NULL COMMENT '留言时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告编号',
  `title` varchar(255) NOT NULL COMMENT '公告标题',
  `detail` text NOT NULL COMMENT '公告内容',
  `teacher` int(11) NOT NULL COMMENT '公告发布老师',
  `time` varchar(255) NOT NULL COMMENT '公告时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学生编号',
  `acount` varchar(255) NOT NULL COMMENT '学号',
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `pwd` varchar(255) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '教师编号',
  `name` varchar(255) NOT NULL COMMENT '教师姓名',
  `phone` varchar(255) NOT NULL COMMENT '教师账号',
  `pwd` varchar(255) NOT NULL COMMENT '教师密码',
  `course` varchar(255) NOT NULL COMMENT '教师所任课程',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
