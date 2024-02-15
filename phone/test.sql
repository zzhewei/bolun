-- MySQL dump 10.13  Distrib 5.6.50, for Linux (x86_64)
--
-- Host: localhost    Database: cydia
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apt_123Options`
--

DROP TABLE IF EXISTS `apt_123Options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apt_123Options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(64) NOT NULL,
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apt_123Options`
--

LOCK TABLES `apt_123Options` WRITE;
/*!40000 ALTER TABLE `apt_123Options` DISABLE KEYS */;
INSERT INTO `apt_123Options` VALUES (1,'udid_level','a:2:{i:0;s:6:\"游客\";i:1;s:0:\"\";}','yes'),(2,'autofill_depiction','2','yes'),(3,'rewrite_mod','1','yes'),(4,'php_forward','2','yes'),(5,'module_enabled','1','yes');
/*!40000 ALTER TABLE `apt_123Options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apt_123Packages`
--

DROP TABLE IF EXISTS `apt_123Packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apt_123Packages` (
  `ID` int(8) NOT NULL AUTO_INCREMENT,
  `Package` varchar(512) DEFAULT NULL,
  `Source` varchar(512) DEFAULT NULL,
  `Version` varchar(512) DEFAULT NULL,
  `Priority` varchar(512) DEFAULT NULL,
  `Section` varchar(512) DEFAULT NULL,
  `Essential` varchar(512) DEFAULT NULL,
  `Maintainer` varchar(512) DEFAULT NULL,
  `Pre-Depends` varchar(512) DEFAULT NULL,
  `Depends` varchar(512) DEFAULT NULL,
  `Recommends` varchar(512) DEFAULT NULL,
  `Suggests` varchar(512) DEFAULT NULL,
  `Conflicts` varchar(512) DEFAULT NULL,
  `Provides` varchar(512) DEFAULT NULL,
  `Replaces` varchar(512) DEFAULT NULL,
  `Enhances` varchar(512) DEFAULT NULL,
  `Architecture` varchar(512) NOT NULL DEFAULT 'iphoneos-arm',
  `Filename` varchar(512) DEFAULT NULL,
  `Size` int(11) DEFAULT NULL,
  `Installed-Size` varchar(512) DEFAULT NULL,
  `Description` varchar(512) DEFAULT NULL,
  `Multi` varchar(2048) DEFAULT NULL,
  `Origin` varchar(512) DEFAULT NULL,
  `Bugs` varchar(512) DEFAULT NULL,
  `Name` varchar(512) DEFAULT NULL,
  `Author` varchar(512) DEFAULT NULL,
  `Sponsor` varchar(512) DEFAULT NULL,
  `Homepage` varchar(512) DEFAULT NULL,
  `Website` varchar(512) DEFAULT NULL,
  `Depiction` varchar(512) DEFAULT NULL,
  `Icon` varchar(512) DEFAULT NULL,
  `MD5sum` varchar(512) DEFAULT NULL,
  `SHA1` varchar(512) DEFAULT NULL,
  `SHA256` varchar(512) DEFAULT NULL,
  `Stat` int(1) DEFAULT NULL,
  `Tag` varchar(512) DEFAULT NULL,
  `UUID` varchar(512) NOT NULL,
  `Level` char(8) DEFAULT NULL,
  `Price` char(8) DEFAULT NULL,
  `Purchase_Link` varchar(512) DEFAULT NULL,
  `Purchase_Link_Stat` int(1) NOT NULL DEFAULT '0',
  `Changelog` varchar(512) DEFAULT NULL,
  `Changelog_Older_Shows` int(11) NOT NULL DEFAULT '0',
  `Video_Preview` varchar(512) DEFAULT NULL,
  `System_Support` longtext,
  `ScreenShots` longtext,
  `TimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DownloadTimes` int(8) NOT NULL DEFAULT '0',
  `CreateStamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apt_123Packages`
--

LOCK TABLES `apt_123Packages` WRITE;
/*!40000 ALTER TABLE `apt_123Packages` DISABLE KEYS */;
INSERT INTO `apt_123Packages` VALUES (13,'com.ruku800.ruku',NULL,'0.1-1','optional','犁牛',NULL,'',NULL,'firmware (>= 5.0), mobilesubstrate',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20220526/xHBV8glcum392NQ55zX5f19RF3GMAvuiOqR6YAsM.deb',141770,NULL,'','',NULL,NULL,'入库','入库','',NULL,NULL,'http://n.com/index.php?pid=13','null\n','f9831afdfb50f92b6b328c26feb2b7c1',NULL,NULL,1,'','xHBV8glcum392NQ55zX5f19RF3GMAvuiOqR6YAsM','0',NULL,NULL,0,'',0,'','',NULL,'2023-12-17 18:30:57',32,'2022-05-26 12:22:13'),(14,'com.cai0061.caiji',NULL,'1.0.1','optional','犁牛',NULL,'',NULL,'firmware (>= 5.0), mobilesubstrate',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20220526/AB34S44SGgzMbA4ike3dwJn59yqwOx8Y29KXoHsJ.deb',431648,NULL,'','',NULL,NULL,'采集','采集','',NULL,NULL,'http://n.com/index.php?pid=14','null\n','5836296fbe76e27b1a9e176de5b05bc8',NULL,NULL,1,'','AB34S44SGgzMbA4ike3dwJn59yqwOx8Y29KXoHsJ','0',NULL,NULL,0,'',0,'','',NULL,'2023-12-31 05:25:06',65,'2022-05-26 12:25:45'),(15,'com.chu00554a.chuku',NULL,'1.0.1','optional','犁牛',NULL,'',NULL,'firmware (>= 5.0), mobilesubstrate',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20220526/Jsm2F4KrjsB3cCTv1j1JkmFpUyzenYi2W69Tm1p9.deb',490090,NULL,'','',NULL,NULL,'出库','出库','',NULL,NULL,'http://n.com/index.php?pid=15','null\n','416febc20af8cb1e023b7f17b7be96e9',NULL,NULL,1,'','Jsm2F4KrjsB3cCTv1j1JkmFpUyzenYi2W69Tm1p9','0',NULL,NULL,0,'',0,'','',NULL,'2024-01-09 14:48:25',313,'2022-05-26 12:25:50'),(16,'com.s0414dddd2.chuku3',NULL,'1.0.1','optional','犁牛',NULL,'',NULL,'firmware (>= 5.0), mobilesubstrate',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20220526/bXuaFpBtdnuLvLRlNdxDf6QAEmQY6x2evTjJGZHC.deb',500332,NULL,'','',NULL,NULL,'天堂DNF专用','天堂DNF专用','',NULL,NULL,'http://n.com/index.php?pid=16','null\n','effa6c26efeef828756f8cb2e925ae9a',NULL,NULL,1,'','bXuaFpBtdnuLvLRlNdxDf6QAEmQY6x2evTjJGZHC','0',NULL,NULL,0,'',0,'','',NULL,'2023-08-31 09:37:08',10,'2022-05-26 12:25:51'),(17,'com.01wdg.chuku1',NULL,'1.0.2','optional','犁牛',NULL,'',NULL,'firmware (>= 5.0), mobilesubstrate',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20220526/VqWaSc1ltmHtDxwCnIXwD7N7Gl9nd64Eu9QfYDIt.deb',521740,NULL,'','',NULL,NULL,'万国出库','万国出库','',NULL,NULL,'http://n.com/index.php?pid=17','null\n','b8ebbe872f3399b74dc46e1a5b13cd79',NULL,NULL,1,'','VqWaSc1ltmHtDxwCnIXwD7N7Gl9nd64Eu9QfYDIt','0',NULL,NULL,0,'',0,'','',NULL,'2023-12-23 13:08:30',8,'2022-05-26 12:25:52'),(18,'com.les01.chukuNew',NULL,'1.0.1','optional','犁牛',NULL,'',NULL,'firmware (>= 5.0), mobilesubstrate',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20220526/ON1u8oX0UrC7tKCXfCZ7XqsVwWoJqCKnwjcPGe6i.deb',162718,NULL,'','',NULL,NULL,'lsr的出库','lsr','',NULL,NULL,'http://n.com/index.php?pid=18','null\n','fa0d37490940dab94c4587b81a9f8c75',NULL,NULL,1,'','ON1u8oX0UrC7tKCXfCZ7XqsVwWoJqCKnwjcPGe6i','0',NULL,NULL,0,'',0,'','',NULL,'2024-01-13 14:50:57',486,'2022-05-26 12:26:07'),(22,'com.yourcompany.gametest1',NULL,'0.0.1-1+debug',NULL,'[實用插件]',NULL,'ddd',NULL,'mobilesubstrate (>= 0.9.5000)',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20230523/57zRkyVSkv9gwjOsHAk3O6KDGomDycxpC77s7Zna.deb',6324,'200',NULL,NULL,NULL,NULL,'【遊戲防檢測】奧丁','ddd\n',NULL,NULL,NULL,'http://n.com/index.php?pid=22',NULL,'be32ccf2d5c10d3a21e6ba8dce3fd29c',NULL,NULL,1,NULL,'57zRkyVSkv9gwjOsHAk3O6KDGomDycxpC77s7Zna',NULL,NULL,NULL,0,NULL,0,NULL,NULL,NULL,'2023-10-26 04:40:49',1,'2023-05-23 14:31:08'),(21,'com.senhe.chuku',NULL,'2.041','optional','插件',NULL,'',NULL,'firmware (>= 5.0), mobilesubstrate',NULL,NULL,NULL,NULL,NULL,NULL,'iphoneos-arm','../downloads/20230205/YKjApTYDdfm6nX6U2csc73w6tsqu8r28VzYfev4R.deb',502162,NULL,'','',NULL,NULL,'手機還原','2205','',NULL,NULL,'http://n.com/index.php?pid=21','null\n','8a7f7acd71e13aa774299bf46ff1e9c5',NULL,NULL,1,'','YKjApTYDdfm6nX6U2csc73w6tsqu8r28VzYfev4R','0',NULL,NULL,0,'',0,'','',NULL,'2023-12-31 05:30:40',87,'2023-02-04 16:13:29');
/*!40000 ALTER TABLE `apt_123Packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apt_123Reports`
--

DROP TABLE IF EXISTS `apt_123Reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apt_123Reports` (
  `ID` int(8) NOT NULL AUTO_INCREMENT,
  `PID` int(8) NOT NULL,
  `Remote` varchar(64) NOT NULL,
  `Device` varchar(64) NOT NULL,
  `iOS` varchar(64) NOT NULL,
  `Version` varchar(64) NOT NULL,
  `Support` int(8) NOT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apt_123Reports`
--

LOCK TABLES `apt_123Reports` WRITE;
/*!40000 ALTER TABLE `apt_123Reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `apt_123Reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apt_123Sections`
--

DROP TABLE IF EXISTS `apt_123Sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apt_123Sections` (
  `ID` int(8) NOT NULL AUTO_INCREMENT,
  `Name` varchar(512) NOT NULL,
  `Icon` varchar(512) NOT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apt_123Sections`
--

LOCK TABLES `apt_123Sections` WRITE;
/*!40000 ALTER TABLE `apt_123Sections` DISABLE KEYS */;
INSERT INTO `apt_123Sections` VALUES (1,'犁牛','','2021-11-22 11:23:16'),(2,'插件','','2021-11-22 11:23:22');
/*!40000 ALTER TABLE `apt_123Sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apt_123UDID`
--

DROP TABLE IF EXISTS `apt_123UDID`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apt_123UDID` (
  `ID` int(8) NOT NULL AUTO_INCREMENT,
  `UDID` varchar(128) NOT NULL,
  `Level` int(8) NOT NULL DEFAULT '0',
  `Packages` varchar(512) DEFAULT NULL,
  `Comment` varchar(512) DEFAULT NULL,
  `TimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Downloads` int(8) NOT NULL DEFAULT '0',
  `IP` bigint(20) DEFAULT NULL,
  `CreateStamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apt_123UDID`
--

LOCK TABLES `apt_123UDID` WRITE;
/*!40000 ALTER TABLE `apt_123UDID` DISABLE KEYS */;
/*!40000 ALTER TABLE `apt_123UDID` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apt_123Users`
--

DROP TABLE IF EXISTS `apt_123Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apt_123Users` (
  `ID` int(8) NOT NULL AUTO_INCREMENT,
  `Username` varchar(64) NOT NULL,
  `SHA1` varchar(128) NOT NULL,
  `LastLoginTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Power` int(8) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apt_123Users`
--

LOCK TABLES `apt_123Users` WRITE;
/*!40000 ALTER TABLE `apt_123Users` DISABLE KEYS */;
-- INSERT INTO `apt_123Users` VALUES (1,'wbldaniel1','481fb3d1632c646d2537577acb876e9342c638db','2024-01-23 07:02:55',1);
INSERT INTO `apt_123Users` VALUES (1,'admin','d033e22ae348aeb5660fc2140aec35850c4da997','2024-01-23 07:02:55',1);
/*!40000 ALTER TABLE `apt_123Users` ENABLE KEYS */;
UNLOCK TABLES;
