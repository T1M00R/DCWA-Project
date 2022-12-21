-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: proj2022
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `proj2022`;
CREATE DATABASE `proj2022`;
USE `proj2022`;
--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dept` (
  `did` varchar(5) NOT NULL,
  `dname` varchar(20) DEFAULT NULL,
  `lid` varchar(5) DEFAULT NULL,
  `budget` int DEFAULT NULL,
  PRIMARY KEY (`did`),
  KEY `lid` (`lid`),
  CONSTRAINT `dept_ibfk_1` FOREIGN KEY (`lid`) REFERENCES `location` (`lid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept`
--

LOCK TABLES `dept` WRITE;
/*!40000 ALTER TABLE `dept` DISABLE KEYS */;
INSERT INTO `dept` VALUES ('HR','Human Resources','GAL',700500),('OPS','Operations','COR',1100332),('R&D','Research & Devel','DUB',2000500),('SAL','Sales','GAL',900232),('FIN','Finance','GAL',1000000);
/*!40000 ALTER TABLE `dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emp_dept`
--

DROP TABLE IF EXISTS `emp_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_dept` (
  `eid` varchar(5) NOT NULL,
  `did` varchar(5) NOT NULL,
  PRIMARY KEY (`eid`,`did`),
  KEY `did` (`did`),
  CONSTRAINT `emp_dept_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `employee` (`eid`),
  CONSTRAINT `emp_dept_ibfk_2` FOREIGN KEY (`did`) REFERENCES `dept` (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_dept`
--

LOCK TABLES `emp_dept` WRITE;
/*!40000 ALTER TABLE `emp_dept` DISABLE KEYS */;
INSERT INTO `emp_dept` VALUES ('E008','HR'),('E009','HR'),('E010','HR'),('E015','HR'),('E016','HR'),('E017','HR'),('E018','HR'),('E019','HR'),('E020','OPS'),('E021','OPS'),('E022','OPS'),('E023','OPS'),('E024','OPS'),('E025','OPS'),('E026','OPS'),('E001','R&D'),('E002','R&D'),('E003','R&D'),('E004','R&D'),('E005','R&D'),('E006','R&D'),('E007','R&D'),('E011','SAL'),('E012','SAL'),('E013','SAL'),('E014','SAL');
/*!40000 ALTER TABLE `emp_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `eid` varchar(5) NOT NULL,
  `ename` varchar(20) DEFAULT NULL,
  `role` enum('Manager','Employee') DEFAULT NULL,
  `salary` double(8,2) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('E001','Tom','Manager',55999.10),('E002','Anne','Employee',51100.09),('E003','Mary','Employee',52220.29),('E004','Alan','Employee',60220.00),('E005','Cathy','Manager',71500.12),('E006','Brian','Employee',71500.12),('E007','Pat','Employee',49500.83),('E008','Marion','Manager',69500.83),('E009','William','Employee',47700.22),('E010','Barry','Employee',45700.22),('E011','Damien','Employee',72750.51),('E012','Alan','Employee',52750.51),('E013','Thomas','Manager',72750.51),('E014','Mary-Ann','Manager',68751.53),('E015','Shane','Employee',49751.50),('E016','Seamus','Employee',47751.50),('E017','Fiona','Employee',47731.53),('E018','Deirdre','Employee',55731.63),('E019','David','Employee',59731.99),('E020','PJ','Employee',55433.39),('E021','Jack','Employee',58433.88),('E022','Kevin','Manager',77433.08),('E023','John','Employee',80423.03),('E024','Neil','Manager',48424.73),('E025','Martina','Employee',47490.71),('E026','Anna','Employee',54410.41);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `lid` varchar(5) NOT NULL,
  `county` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES ('COR','Cork'),('DUB','Dublin'),('GAL','Galway');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-22 11:49:34
