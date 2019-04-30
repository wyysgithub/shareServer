/*
Navicat MySQL Data Transfer

Source Server         : 本地mysql
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-04-30 17:28:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `article_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type_id` int(11) DEFAULT NULL,
  `article_name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `article_content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `author` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `flag` int(11) NOT NULL DEFAULT '1',
  `status` int(11) DEFAULT '1',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_id`),
  KEY `type_id` (`type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '1', '文章1', '文章内容1', '张三', '1', '1', '2019-02-28 16:11:05');
INSERT INTO `article` VALUES ('2', '1', '文章2', '文章内容2', '李四', '1', '1', '2019-02-28 16:11:07');
INSERT INTO `article` VALUES ('3', '2', '文章3', '文章内容3', '王五', '1', '1', '2019-02-28 16:11:12');
INSERT INTO `article` VALUES ('4', '3', 'csa', 'csa', 'csa', '1', '5', '2019-03-07 13:33:14');

-- ----------------------------
-- Table structure for article_type
-- ----------------------------
DROP TABLE IF EXISTS `article_type`;
CREATE TABLE `article_type` (
  `type_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `flag` int(11) DEFAULT '1',
  `status` int(11) DEFAULT '1',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of article_type
-- ----------------------------
INSERT INTO `article_type` VALUES ('1', '好勒1', '1', '5', '2019-03-07 09:30:51');
INSERT INTO `article_type` VALUES ('2', ' Java ', '1', '5', '2019-03-01 15:31:09');
INSERT INTO `article_type` VALUES ('3', ' Php ', '1', '5', '2019-03-01 15:31:17');
INSERT INTO `article_type` VALUES ('4', '分类3', '1', '5', '2019-03-01 14:55:26');
INSERT INTO `article_type` VALUES ('5', 'ces', '1', '5', '2019-03-01 11:57:58');
INSERT INTO `article_type` VALUES ('6', 'cs', '1', '5', '2019-03-01 12:02:31');
INSERT INTO `article_type` VALUES ('7', 'cs', '1', '5', '2019-03-01 13:07:44');
INSERT INTO `article_type` VALUES ('8', 'cs', '1', '5', '2019-03-01 13:08:09');
INSERT INTO `article_type` VALUES ('9', 'cs', '1', '5', '2019-03-01 13:08:33');
INSERT INTO `article_type` VALUES ('10', 'dsad', '1', '5', '2019-03-01 13:08:36');
INSERT INTO `article_type` VALUES ('11', 'dsadsa', '1', '5', '2019-03-01 13:08:39');
INSERT INTO `article_type` VALUES ('12', '测试', '1', '5', '2019-03-01 13:18:02');
INSERT INTO `article_type` VALUES ('13', '测试', '1', '5', '2019-03-01 14:37:02');
INSERT INTO `article_type` VALUES ('14', '测试', '1', '5', '2019-03-01 13:30:58');

-- ----------------------------
-- Table structure for article_type_rel
-- ----------------------------
DROP TABLE IF EXISTS `article_type_rel`;
CREATE TABLE `article_type_rel` (
  `rel_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`rel_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of article_type_rel
-- ----------------------------
INSERT INTO `article_type_rel` VALUES ('1', '1', '1');
INSERT INTO `article_type_rel` VALUES ('2', '2', '1');

-- ----------------------------
-- Table structure for db
-- ----------------------------
DROP TABLE IF EXISTS `db`;
CREATE TABLE `db` (
  `id` int(3) NOT NULL,
  `name` char(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of db
-- ----------------------------
INSERT INTO `db` VALUES ('1', 'haha');
