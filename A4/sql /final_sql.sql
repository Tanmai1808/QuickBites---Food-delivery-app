-- MySQL dump 10.13  Distrib 8.0.45, for macos15 (arm64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `address_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `house_no` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `landmark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (501,101,'12-4-58','Madhapur','Ahmedabad','500081','Near Metro'),(502,102,'45-2-11','Gachibowli','Ahmedabad','500032','Opposite Mall'),(503,103,'8-1-22','Kukatpally','Ahmedabad','500072',NULL),(504,104,'2-3-90','Banjara Hills','Ahmedabad','500034','Road No 12'),(505,105,'10-5-18','Ameerpet','Ahmedabad','500016',NULL),(506,106,'1-9-30','Begumpet','Ahmedabad','500003','Near Airport Road'),(507,107,'4-6-77','Hitech City','Ahmedabad','500081','Cyber Towers'),(508,108,'6-3-44','Manikonda','Ahmedabad','500089','Near Park'),(509,109,'3-2-88','Kondapur','Ahmedabad','500084','Opp IT Park');
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuditLog`
--

DROP TABLE IF EXISTS `AuditLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AuditLog` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `table_name` varchar(100) NOT NULL,
  `record_id` int DEFAULT NULL,
  `details` text,
  `performed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLog`
--

LOCK TABLES `AuditLog` WRITE;
/*!40000 ALTER TABLE `AuditLog` DISABLE KEYS */;
INSERT INTO `AuditLog` VALUES (1,25,'LOGIN','Sessions',NULL,'partner5 logged in as RestaurantOwner','2026-04-02 16:52:28'),(2,6,'LOGIN','Sessions',NULL,'Kavya Nair logged in as Customer','2026-04-02 16:53:09'),(3,21,'LOGIN','Sessions',NULL,'partner1 logged in as RestaurantOwner','2026-04-02 16:54:13'),(4,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 16:55:13'),(5,13,'LOGIN','Sessions',NULL,'Aditya Rao logged in as DeliveryPartner','2026-04-02 16:55:59'),(6,6,'LOGIN','Sessions',NULL,'Kavya Nair logged in as Customer','2026-04-02 16:57:37'),(7,21,'LOGIN','Sessions',NULL,'partner1 logged in as RestaurantOwner','2026-04-02 16:58:10'),(8,1,'LOGIN','Sessions',NULL,'Aarav Sharma logged in as Admin','2026-04-02 17:01:33'),(9,6,'LOGIN','Sessions',NULL,'Kavya Nair logged in as Customer','2026-04-02 17:55:58'),(10,25,'LOGIN','Sessions',NULL,'partner5 logged in as RestaurantOwner','2026-04-02 17:56:32'),(11,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 17:57:06'),(12,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 17:57:23'),(13,14,'LOGIN','Sessions',NULL,'Neha Kapoor logged in as DeliveryPartner','2026-04-02 18:06:53'),(14,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 18:09:12'),(15,6,'LOGIN','Sessions',NULL,'Kavya Nair logged in as Customer','2026-04-02 18:13:14'),(16,25,'LOGIN','Sessions',NULL,'partner5 logged in as RestaurantOwner','2026-04-02 18:13:36'),(17,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 18:13:54'),(18,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 18:21:22'),(19,1,'LOGIN','Sessions',NULL,'Aarav Sharma logged in as Admin','2026-04-02 18:21:58'),(20,1,'UPDATE','member',2,'Admin Aarav Sharma updated member_id=2 (role=Customer)','2026-04-02 18:22:07'),(21,3,'LOGIN','Sessions',NULL,'Rahul Verma logged in as Customer','2026-04-02 18:23:12'),(22,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 18:27:40'),(23,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 18:37:29'),(24,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 19:50:16'),(25,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 19:54:43'),(26,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 20:09:26'),(27,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 20:09:56'),(28,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 20:24:18'),(29,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 20:26:33'),(30,2,'LOGIN','Sessions',NULL,'Priya chowdary logged in as Customer','2026-04-02 20:27:25'),(31,21,'LOGIN','Sessions',NULL,'partner1 logged in as RestaurantOwner','2026-04-02 20:34:54'),(32,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 20:35:27'),(33,2,'LOGIN','Sessions',NULL,'Priya chowdary logged in as Customer','2026-04-02 20:35:57'),(34,1,'LOGIN','Sessions',NULL,'Aarav Sharma logged in as Admin','2026-04-02 20:38:26'),(35,1,'UPDATE','member',3,'Admin Aarav Sharma updated member_id=3 (role=Customer)','2026-04-02 20:38:48'),(36,1,'UPDATE','member',6,'Admin Aarav Sharma updated member_id=6 (role=Customer)','2026-04-02 20:39:49'),(37,6,'LOGIN','Sessions',NULL,'Kavya sri logged in as Customer','2026-04-02 20:40:47'),(38,21,'LOGIN','Sessions',NULL,'partner1 logged in as RestaurantOwner','2026-04-02 20:42:16'),(39,22,'LOGIN','Sessions',NULL,'partner2 logged in as RestaurantOwner','2026-04-02 20:42:38'),(40,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 20:44:05'),(41,3,'LOGIN','Sessions',NULL,'Rahul Verma logged in as Customer','2026-04-02 20:57:07'),(42,22,'LOGIN','Sessions',NULL,'partner2 logged in as RestaurantOwner','2026-04-02 20:58:32'),(43,15,'LOGIN','Sessions',NULL,'Kiran Babu logged in as DeliveryPartner','2026-04-02 21:00:28'),(44,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 21:07:00'),(45,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 21:19:39'),(46,21,'LOGIN','Sessions',NULL,'partner1 logged in as RestaurantOwner','2026-04-02 21:19:47'),(47,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 21:20:04'),(48,12,'LOGIN','Sessions',NULL,'Divya Patel logged in as DeliveryPartner','2026-04-02 21:21:36'),(49,6,'LOGIN','Sessions',NULL,'Kavya sri logged in as Customer','2026-04-02 22:56:04'),(50,3,'LOGIN','Sessions',NULL,'Rahul Verma logged in as Customer','2026-04-04 12:10:13'),(51,3,'LOGIN','Sessions',NULL,'Rahul Verma logged in as Customer','2026-04-04 12:13:52');
/*!40000 ALTER TABLE `AuditLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `category_id` int NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `is_veg` tinyint(1) NOT NULL,
  `description` text,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (601,'Biryani',0,'Traditional rice dish with spices'),(602,'Pizza',1,'Italian baked flatbread with toppings'),(603,'Burger',0,'Grilled patty served inside buns'),(604,'South Indian',1,'Dosa, Idli, and regional dishes'),(605,'Chinese',1,'Indo-Chinese style dishes'),(606,'Desserts',1,'Sweet dishes and sweets'),(607,'Beverages',1,NULL),(608,'North Indian',1,'Curries and tandoor dishes'),(609,'Snacks',1,NULL),(610,'Seafood',0,'Fish and prawn based dishes');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `signup_date` date NOT NULL,
  `loyalty_points` int DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `chk_loyalty_points` CHECK ((`loyalty_points` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (101,'2024-01-01',0,0,2),(102,'2024-01-05',90,0,3),(103,'2024-01-10',200,0,4),(104,'2024-01-15',50,0,5),(105,'2024-02-01',160,0,6),(106,'2024-02-10',NULL,0,7),(107,'2024-02-15',90,0,8),(108,'2024-03-01',40,0,9),(109,'2024-03-05',110,0,10),(110,'2024-03-01',0,0,31),(111,'2026-03-30',0,0,35),(112,'2026-03-30',0,0,40),(113,'2026-03-31',0,0,44),(114,'2026-03-31',0,0,47),(115,'2026-03-31',0,0,49);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery` (
  `delivery_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `partner_id` int DEFAULT NULL,
  `delivery_status` varchar(30) DEFAULT NULL,
  `delivery_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`delivery_id`),
  KEY `order_id` (`order_id`),
  KEY `fk_delivery_partner` (`partner_id`),
  CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`),
  CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`partner_id`) REFERENCES `DeliveryPartner` (`partner_id`),
  CONSTRAINT `fk_delivery_partner` FOREIGN KEY (`partner_id`) REFERENCES `DeliveryPartner` (`partner_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_delivery_status` CHECK ((`delivery_status` in (_utf8mb4'PREPARING',_utf8mb4'ASSIGNED',_utf8mb4'OUT_FOR_DELIVERY',_utf8mb4'DELIVERED',_utf8mb4'CANCELLED',_utf8mb4'FAILED')))
) ENGINE=InnoDB AUTO_INCREMENT=1228 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
INSERT INTO `delivery` VALUES (1201,901,201,'ASSIGNED','2024-05-01 07:30:00'),(1202,902,202,'DELIVERED','2024-05-02 08:30:00'),(1203,904,203,'DELIVERED','2024-05-04 11:00:00'),(1204,905,204,'OUT_FOR_DELIVERY',NULL),(1205,906,205,'DELIVERED','2024-05-06 12:30:00'),(1206,907,206,'DELIVERED','2024-05-07 13:30:00'),(1207,908,207,'ASSIGNED',NULL),(1208,909,208,'DELIVERED','2024-05-09 15:30:00'),(1215,903,205,'FAILED',NULL),(1217,919,202,'PREPARING',NULL),(1218,920,202,'PREPARING',NULL),(1219,921,202,'PREPARING',NULL),(1220,922,202,'PREPARING',NULL),(1221,923,202,'PREPARING',NULL),(1222,924,202,'PREPARING',NULL),(1223,925,202,'PREPARING',NULL),(1224,926,202,'PREPARING',NULL),(1225,927,202,'OUT_FOR_DELIVERY',NULL),(1226,928,202,'OUT_FOR_DELIVERY',NULL),(1227,929,NULL,'PREPARING',NULL);
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryLOCATION`
--

DROP TABLE IF EXISTS `deliveryLOCATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryLOCATION` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `delivery_id` int NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `recorded_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `fk_location_delivery` (`delivery_id`),
  CONSTRAINT `deliverylocation_ibfk_1` FOREIGN KEY (`delivery_id`) REFERENCES `Delivery` (`delivery_id`),
  CONSTRAINT `fk_location_delivery` FOREIGN KEY (`delivery_id`) REFERENCES `Delivery` (`delivery_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1331 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryLOCATION`
--

LOCK TABLES `deliveryLOCATION` WRITE;
/*!40000 ALTER TABLE `deliveryLOCATION` DISABLE KEYS */;
INSERT INTO `deliveryLOCATION` VALUES (1301,1201,17.450000,78.380000,'2024-05-01 07:35:00'),(1302,1201,17.455000,78.385000,'2024-05-01 07:40:00'),(1303,1202,17.460000,78.390000,'2024-05-02 08:40:00'),(1304,1202,17.465000,78.395000,'2024-05-02 08:50:00'),(1305,1203,17.470000,78.400000,'2024-05-04 11:05:00'),(1306,1204,17.475000,78.405000,NULL),(1307,1205,17.480000,78.410000,'2024-05-06 12:40:00'),(1308,1206,17.485000,78.415000,'2024-05-07 13:40:00'),(1309,1207,17.490000,78.420000,NULL),(1310,1208,17.495000,78.425000,'2024-05-09 15:40:00'),(1317,1215,17.530000,78.460000,NULL),(1318,1203,17.535000,78.465000,'2024-05-04 11:15:00'),(1319,1206,17.540000,78.470000,'2024-05-07 13:50:00'),(1320,1217,17.374224,78.470364,'2026-03-30 12:10:49'),(1321,1218,17.385000,78.486700,'2026-03-30 12:54:46'),(1322,1219,17.373732,78.487186,'2026-03-30 18:03:04'),(1323,1220,17.394857,78.491135,'2026-03-30 19:25:37'),(1324,1221,17.378975,78.492336,'2026-04-02 03:45:52'),(1325,1222,17.385000,78.486700,'2026-04-02 10:57:53'),(1326,1223,17.380613,78.484612,'2026-04-02 11:23:27'),(1327,1224,17.371930,78.496113,'2026-04-02 12:53:17'),(1328,1225,17.385000,78.486700,'2026-04-02 15:10:56'),(1329,1226,17.385000,78.486700,'2026-04-02 15:27:29'),(1330,1227,17.384708,78.487873,'2026-04-04 06:40:29');
/*!40000 ALTER TABLE `deliveryLOCATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliverypartner`
--

DROP TABLE IF EXISTS `deliverypartner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliverypartner` (
  `partner_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_type` varchar(50) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `vehicleNumber` varchar(100) DEFAULT NULL,
  `licenseID` varchar(100) DEFAULT NULL,
  `currentLatitude` double DEFAULT NULL,
  `currentLongitude` double DEFAULT NULL,
  `isOnline` tinyint(1) DEFAULT NULL,
  `averageRating` float DEFAULT NULL,
  `image` blob,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`partner_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `deliverypartner_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `chk_partner_rating` CHECK ((`averageRating` between 1 and 5)),
  CONSTRAINT `chk_vehicle_type` CHECK ((`vehicle_type` in (_utf8mb4'BIKE',_utf8mb4'SCOOTER',_utf8mb4'CAR',_utf8mb4'BICYCLE')))
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliverypartner`
--

LOCK TABLES `deliverypartner` WRITE;
/*!40000 ALTER TABLE `deliverypartner` DISABLE KEYS */;
INSERT INTO `deliverypartner` VALUES (201,'BIKE',0,'VEH201','LIC201',23.0225,72.5714,1,4.5,NULL,11),(202,'SCOOTER',0,'VEH202','LIC202',23.0225,72.5714,1,4.2,NULL,12),(203,'CAR',0,'VEH203','LIC203',23.0225,72.5714,0,4.8,NULL,13),(204,'BIKE',0,'VEH204','LIC204',23.0225,72.5714,1,4.1,NULL,14),(205,'SCOOTER',0,'VEH205','LIC205',23.0225,72.5714,0,4.6,NULL,15),(206,'BIKE',0,'VEH206','LIC206',23.0225,72.5714,1,4.3,NULL,16),(207,'CAR',0,'VEH207','LIC207',23.0225,72.5714,1,NULL,NULL,17),(208,'SCOOTER',0,'VEH208','LIC208',23.0225,72.5714,0,4.4,NULL,18),(209,'BIKE',0,'VEH209','LIC209',23.0225,72.5714,1,4,NULL,19),(210,'CAR',0,'VEH210','LIC210',23.0225,72.5714,1,4.7,NULL,20),(211,'SCOOTER',0,'VEH211','LIC211',NULL,NULL,0,NULL,NULL,39);
/*!40000 ALTER TABLE `deliverypartner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeliveryReview`
--

DROP TABLE IF EXISTS `DeliveryReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeliveryReview` (
  `delivery_review_id` int NOT NULL,
  `order_id` int NOT NULL,
  `partner_id` int NOT NULL,
  `rating` int NOT NULL,
  `comments` text,
  `review_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`delivery_review_id`),
  UNIQUE KEY `uq_deliveryreview_order` (`order_id`),
  KEY `fk_deliveryreview_partner` (`partner_id`),
  CONSTRAINT `deliveryreview_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deliveryreview_ibfk_2` FOREIGN KEY (`partner_id`) REFERENCES `DeliveryPartner` (`partner_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_deliveryreview_partner` FOREIGN KEY (`partner_id`) REFERENCES `DeliveryPartner` (`partner_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeliveryReview`
--

LOCK TABLES `DeliveryReview` WRITE;
/*!40000 ALTER TABLE `DeliveryReview` DISABLE KEYS */;
INSERT INTO `DeliveryReview` VALUES (1501,901,201,5,'Very fast delivery','2024-05-01 08:35:00'),(1502,902,202,4,'Polite delivery partner','2024-05-02 09:35:00'),(1503,903,205,1,'Delivery failed',NULL),(1504,904,203,5,'On time delivery','2024-05-04 11:40:00'),(1505,905,204,4,NULL,'2024-05-05 12:40:00'),(1506,906,205,3,'Average service','2024-05-06 13:40:00'),(1507,907,206,5,'Very professional','2024-05-07 14:40:00'),(1508,908,207,4,'Good communication','2024-05-08 15:40:00'),(1509,909,208,4,NULL,'2024-05-09 16:40:00');
/*!40000 ALTER TABLE `DeliveryReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FoodReview`
--

DROP TABLE IF EXISTS `FoodReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FoodReview` (
  `food_review_id` int NOT NULL,
  `order_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `rating` int NOT NULL,
  `comments` text,
  `review_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`food_review_id`),
  KEY `order_id` (`order_id`),
  KEY `fk_foodreview_restaurant` (`restaurant_id`),
  CONSTRAINT `fk_foodreview_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `foodreview_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `foodreview_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FoodReview`
--

LOCK TABLES `FoodReview` WRITE;
/*!40000 ALTER TABLE `FoodReview` DISABLE KEYS */;
INSERT INTO `FoodReview` VALUES (1401,901,401,5,'Excellent taste and packaging','2024-05-01 08:30:00'),(1402,902,402,4,'Good pizza but slightly cold','2024-05-02 09:30:00'),(1403,903,403,2,'Order was cancelled',NULL),(1404,904,404,5,'Amazing biryani','2024-05-04 11:30:00'),(1405,905,405,4,NULL,'2024-05-05 12:30:00'),(1406,906,406,3,'Food was okay','2024-05-06 13:30:00'),(1407,907,407,5,'Loved the seafood','2024-05-07 14:30:00'),(1408,908,408,4,'Desserts were fresh','2024-05-08 15:30:00'),(1409,909,409,4,NULL,'2024-05-09 16:30:00');
/*!40000 ALTER TABLE `FoodReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `image_url` text,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `dateOfBirth` date DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'Aarav Sharma','aarav@gmail.com','9876500001','images/m1.jpg','aarav','aarav123',0,'2003-03-01'),(2,'Priya chowdary','priya@gmail.com','9876500005','images/m2.jpg','priya','priya123',0,'2000-01-18'),(3,'Rahul Verma','rahul@gmail.com','9876500003',NULL,'rahul','rahul123',0,'2003-03-01'),(4,'Sneha Iyer','sneha@gmail.com','9876500004','images/m4.jpg','sneha','sneha123',0,'2003-03-01'),(5,'Arjun Mehta','arjun@gmail.com','9876500005','images/m5.jpg','arjun','arjun123',0,'2003-03-01'),(6,'Kavya sri','kavya@gmail.com','9876500006','images/m6.jpg','kavya','kavya123',0,'2003-03-01'),(7,'Vikram Singh','vikram@gmail.com','9876500007','images/m7.jpg','vikram','vikram123',0,'2003-03-01'),(8,'Ananya Das','ananya@gmail.com','9876500008','images/m8.jpg','ananya','ananya123',0,'2003-03-01'),(9,'Rohan Gupta','rohan@gmail.com','9876500009',NULL,'rohan','rohan123',0,'2003-03-01'),(10,'Meera Joshi','meera@gmail.com','9876500010','images/m10.jpg','meera','meera123',0,'2003-03-01'),(11,'Sanjay Kumar','sanjay@gmail.com','9876500011','images/m11.jpg','sanjay','sanjay123',0,'2003-03-01'),(12,'Divya Patel','divya@gmail.com','9876500012','images/m12.jpg','divya','divya123',0,'2003-03-01'),(13,'Aditya Rao','aditya@gmail.com','9876500013','images/m13.jpg','aditya','aditya123',0,'2003-03-01'),(14,'Neha Kapoor','neha@gmail.com','9876500014','images/m14.jpg','neha','neha123',0,'2003-03-01'),(15,'Kiran Babu','kiran@gmail.com','9876500015','images/m15.jpg','kiran','kiran123',0,'2003-03-01'),(16,'Manoj Kumar','manoj@gmail.com','9876500016','images/m16.jpg','manoj','manoj123',0,'2003-03-01'),(17,'Pooja Singh','pooja@gmail.com','9876500017','images/m17.jpg','pooja','pooja123',0,'2003-03-01'),(18,'Nikhil Jain','nikhil@gmail.com','9876500018','images/m18.jpg','nikhil','nikhil123',0,'2003-03-01'),(19,'Swathi Rao','swathi@gmail.com','9876500019','images/m19.jpg','swathi','swathi123',0,'2003-03-01'),(20,'Tarun Varma','tarun@gmail.com','9876500020','images/m20.jpg','tarun','tarun123',0,'2003-03-01'),(21,'partner1','partner1@gmail.com','8888888888',NULL,'partner1','partner1123',0,'2003-03-01'),(22,'partner2','partner2@gmail.com','8888888889',NULL,'partner2','partner2123',0,'2003-03-01'),(23,'partner3','partner3@gmail.com','8888888898',NULL,'partner3','partner3123',0,'2003-03-01'),(24,'partner4','partner4@gmail.com','8888888988',NULL,'partner4','partner4123',0,'2003-03-01'),(25,'partner5','partner5@gmail.com','8888889888',NULL,'partner5','partner5123',0,'2003-03-01'),(26,'partner6','partner6@gmail.com','8888898888',NULL,'partner6','partner6123',0,'2003-03-01'),(27,'partner7','partner7@gmail.com','8888988888',NULL,'partner7','partner7123',0,'2003-03-01'),(28,'partner8','partner8@gmail.com','8889888888',NULL,'partner8','partner8123',0,'2003-03-01'),(29,'partner9','partner9@gmail.com','8898888888',NULL,'partner9','partner9123',0,'2003-03-01'),(30,'partner30','partner10@gmail.com','8988888888',NULL,'partner10','partnerA123',0,'2003-03-01'),(31,'test user one','testuser1@gmail.com','9888888888',NULL,'testuser1','testuser1123',0,'2003-03-01'),(32,'chef test','cheftest@gmail.com','8888888899',NULL,'chef1','cheftest123',1,'2003-03-01'),(34,'rest1','rest1@gmail.com','8000000001',NULL,'rest1','rest1123',0,NULL),(35,'cust1','cust1@gmail.com','8000000002',NULL,'cust1','cust1@gmail.com',0,'2003-06-18'),(39,'delivery1','delivery1@gmail.com','80000000003',NULL,'delivery1','deliver1123',0,'2002-07-09'),(40,'delivery2','delivery2@gmail.com','8000000004',NULL,'delivery2','delivery2123',0,'2004-06-16'),(43,'rest2','rest2@gmail.com','800000005',NULL,'rest2','rest2123',0,'2001-03-30'),(44,'kavya','gullapallikavyadurgasri@gmail.com','8247087449',NULL,'kavss','kavss',0,'2007-03-25'),(47,'Kavya','gullapallikavysdurgasri@gmail.com','8247087449',NULL,'kaavss','kaavss',0,'2007-03-25'),(49,'secret','secret@gmail.com','8247087449',NULL,'secret552234','secret',0,'2007-03-25'),(50,'Pravallika Matha','pravallika.matha@iitgn.ac.in','9392756057',NULL,'pravallika','pinky',0,'2007-05-25');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MemberRoleMapping`
--

DROP TABLE IF EXISTS `MemberRoleMapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MemberRoleMapping` (
  `member_id` int NOT NULL,
  `roleID` int NOT NULL,
  PRIMARY KEY (`member_id`,`roleID`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `memberrolemapping_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `Member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberrolemapping_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `Roles` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MemberRoleMapping`
--

LOCK TABLES `MemberRoleMapping` WRITE;
/*!40000 ALTER TABLE `MemberRoleMapping` DISABLE KEYS */;
INSERT INTO `MemberRoleMapping` VALUES (1,1),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(31,2),(35,2),(40,2),(44,2),(47,2),(49,2),(11,3),(12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),(20,3),(39,3),(21,4),(22,4),(23,4),(24,4),(25,4),(26,4),(27,4),(28,4),(29,4),(30,4),(32,4),(34,4),(43,4),(50,4);
/*!40000 ALTER TABLE `MemberRoleMapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MenuItem`
--

DROP TABLE IF EXISTS `MenuItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MenuItem` (
  `item_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`item_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `fk_menu_category` (`category_id`),
  CONSTRAINT `fk_menu_category` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `menuitem_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant` (`restaurant_id`),
  CONSTRAINT `menuitem_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`),
  CONSTRAINT `chk_price` CHECK ((`price` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MenuItem`
--

LOCK TABLES `MenuItem` WRITE;
/*!40000 ALTER TABLE `MenuItem` DISABLE KEYS */;
INSERT INTO `MenuItem` VALUES (701,401,'Chicken Biryani',230.00,601,1,'images/biryani1.jpg'),(702,401,'Veg Biryani',180.00,601,1,'images/biryani2.jpg'),(703,402,'Margherita Pizza',299.00,602,1,'images/pizza1.jpg'),(704,402,'Farmhouse Pizza',399.00,602,1,'images/pizza2.jpg'),(705,403,'Cheese Burger',149.00,603,1,'images/burger1.jpg'),(706,403,'Chicken Burger',199.00,603,1,NULL),(707,409,'Masala Dosa',120.00,604,1,'images/dosa1.jpg'),(708,406,'Paneer Butter Masala',220.00,608,1,'images/paneer1.jpg'),(710,405,'Fried Rice',170.00,605,1,'images/rice1.jpg'),(711,408,'Gulab Jamun',90.00,606,1,'images/gulab.jpg'),(712,408,'Ice Cream',80.00,606,1,NULL),(713,408,'Cold Coffee',110.00,607,1,'images/coffee.jpg'),(714,406,'Chole Bhature',160.00,608,1,'images/chole.jpg'),(715,410,'Pani Puri',60.00,609,1,'images/panipuri.jpg'),(716,407,'Fish Curry',320.00,610,1,'images/fish.jpg'),(717,406,'Tandoori Chicken',400.00,608,1,'images/tandoori.jpg'),(718,405,'Veg Manchurian',190.00,605,1,'images/manchurian.jpg'),(719,408,'Chocolate Cake',250.00,606,1,'images/cake.jpg'),(720,401,'Lassi',70.00,607,1,'images/lassi.jpg');
/*!40000 ALTER TABLE `MenuItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Offer`
--

DROP TABLE IF EXISTS `Offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Offer` (
  `offer_id` int NOT NULL,
  `offer_code` varchar(50) NOT NULL,
  `discount_type` varchar(20) NOT NULL,
  `discount_value` decimal(6,2) NOT NULL,
  `min_order_amount` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`offer_id`),
  UNIQUE KEY `offer_code` (`offer_code`),
  CONSTRAINT `chk_discount_value` CHECK ((`discount_value` > 0)),
  CONSTRAINT `chk_min_order` CHECK ((`min_order_amount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Offer`
--

LOCK TABLES `Offer` WRITE;
/*!40000 ALTER TABLE `Offer` DISABLE KEYS */;
INSERT INTO `Offer` VALUES (801,'WELCOME10','PERCENTAGE',10.00,500.00,1),(802,'BIRYANI20','PERCENTAGE',20.00,600.00,1),(803,'PIZZA15','PERCENTAGE',15.00,700.00,1),(804,'BURGER5','PERCENTAGE',5.00,300.00,1),(805,'NEWUSER25','PERCENTAGE',25.00,800.00,1),(806,'FLAT100','FLAT',100.00,NULL,1),(807,'SWEET10','PERCENTAGE',10.00,400.00,1),(808,'LUNCH50','FLAT',50.00,500.00,NULL),(809,'DINNER15','PERCENTAGE',15.00,600.00,1),(810,'SAVE30','FLAT',30.00,200.00,1);
/*!40000 ALTER TABLE `Offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `item_price` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `fk_orderitem_order` (`order_id`),
  KEY `fk_orderitem_menu` (`item_id`),
  CONSTRAINT `fk_orderitem_menu` FOREIGN KEY (`item_id`) REFERENCES `MenuItem` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orderitem_order` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`),
  CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `MenuItem` (`item_id`),
  CONSTRAINT `chk_quantity` CHECK ((`quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=1032 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

LOCK TABLES `orderitem` WRITE;
/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
INSERT INTO `orderitem` VALUES (1001,901,701,2,250.00),(1002,901,720,1,70.00),(1003,902,703,1,299.00),(1004,902,704,1,399.00),(1005,903,705,2,149.00),(1006,904,701,2,250.00),(1007,904,717,1,350.00),(1009,906,714,3,160.00),(1010,907,716,2,320.00),(1011,908,711,2,90.00),(1012,909,707,2,120.00),(1020,919,705,2,149.00),(1021,920,713,1,110.00),(1022,921,710,1,170.00),(1023,922,705,1,149.00),(1024,923,701,1,250.00),(1025,924,716,1,320.00),(1026,925,702,1,180.00),(1027,926,705,1,149.00),(1028,927,704,1,399.00),(1029,928,703,1,299.00),(1030,929,718,1,190.00),(1031,929,720,1,70.00);
/*!40000 ALTER TABLE `orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `address_id` int NOT NULL,
  `order_time` timestamp NOT NULL,
  `order_status` varchar(30) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `offer_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `address_id` (`address_id`),
  KEY `fk_order_offer` (`offer_id`),
  KEY `idx_orders_customer` (`customer_id`),
  KEY `idx_orders_customer_status` (`customer_id`,`order_status`),
  CONSTRAINT `fk_order_offer` FOREIGN KEY (`offer_id`) REFERENCES `Offer` (`offer_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant` (`restaurant_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `Address` (`address_id`),
  CONSTRAINT `chk_order_status` CHECK ((`order_status` in (_utf8mb4'PLACED',_utf8mb4'PREPARING',_utf8mb4'OUT_FOR_DELIVERY',_utf8mb4'DELIVERED',_utf8mb4'CANCELLED'))),
  CONSTRAINT `chk_total_amount` CHECK ((`total_amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=930 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (901,101,401,501,'2024-05-01 07:00:00','CANCELLED',800.00,801),(902,102,402,502,'2024-05-02 07:30:00','DELIVERED',650.00,803),(903,103,403,503,'2024-05-03 08:45:00','CANCELLED',300.00,NULL),(904,104,404,504,'2024-05-04 10:15:00','DELIVERED',900.00,802),(905,105,405,505,'2024-05-05 10:40:00','PREPARING',500.00,808),(906,106,406,506,'2024-05-06 11:50:00','OUT_FOR_DELIVERY',750.00,809),(907,107,407,507,'2024-05-07 12:35:00','DELIVERED',1200.00,805),(908,108,408,508,'2024-05-08 13:30:00','PLACED',400.00,807),(909,109,409,509,'2024-05-09 14:40:00','DELIVERED',350.00,804),(919,102,403,502,'2026-03-30 12:10:49','OUT_FOR_DELIVERY',298.00,NULL),(920,101,408,501,'2026-03-30 12:54:46','PLACED',110.00,NULL),(921,101,405,501,'2026-03-30 18:03:04','CANCELLED',170.00,NULL),(922,102,403,502,'2026-03-30 19:25:37','OUT_FOR_DELIVERY',149.00,NULL),(923,101,401,501,'2026-04-02 03:45:52','OUT_FOR_DELIVERY',250.00,NULL),(924,105,407,505,'2026-04-02 10:57:53','OUT_FOR_DELIVERY',320.00,NULL),(925,105,401,505,'2026-04-02 11:23:27','OUT_FOR_DELIVERY',180.00,NULL),(926,102,403,502,'2026-04-02 12:53:17','OUT_FOR_DELIVERY',149.00,NULL),(927,105,402,505,'2026-04-02 15:10:56','PLACED',399.00,NULL),(928,102,402,502,'2026-04-02 15:27:29','PLACED',299.00,NULL),(929,102,405,502,'2026-04-04 06:40:29','PLACED',260.00,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `payment_mode` varchar(30) NOT NULL,
  `payment_status` varchar(30) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `refund_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `uq_payment_order` (`order_id`),
  CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `chk_amount` CHECK ((`amount` >= 0)),
  CONSTRAINT `chk_payment_status` CHECK ((`payment_status` in (_utf8mb4'PENDING',_utf8mb4'SUCCESS',_utf8mb4'FAILED',_utf8mb4'REFUNDED'))),
  CONSTRAINT `chk_refund_amount` CHECK ((`refund_amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=1127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1101,901,'UPI','SUCCESS',800.00,NULL),(1102,902,'CARD','SUCCESS',650.00,NULL),(1103,903,'UPI','REFUNDED',300.00,300.00),(1104,904,'CARD','SUCCESS',900.00,NULL),(1105,905,'CASH','PENDING',500.00,NULL),(1106,906,'UPI','SUCCESS',750.00,NULL),(1107,907,'CARD','SUCCESS',1200.00,NULL),(1108,908,'UPI','SUCCESS',400.00,NULL),(1109,909,'CARD','SUCCESS',350.00,NULL),(1116,919,'CASH','PENDING',298.00,NULL),(1117,920,'CASH','PENDING',110.00,NULL),(1118,921,'UPI','PENDING',170.00,NULL),(1119,922,'CASH','PENDING',149.00,NULL),(1120,923,'CASH','PENDING',250.00,NULL),(1121,924,'CASH','PENDING',320.00,NULL),(1122,925,'CASH','PENDING',180.00,NULL),(1123,926,'CASH','PENDING',149.00,NULL),(1124,927,'CASH','PENDING',399.00,NULL),(1125,928,'CASH','PENDING',299.00,NULL),(1126,929,'CASH','PENDING',260.00,NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `restaurant_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `is_open` tinyint(1) NOT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `owner_id` int NOT NULL,
  `addressLine` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `zipCode` char(6) NOT NULL,
  `discontinued` tinyint(1) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`restaurant_id`),
  KEY `fk_restaurant_owner` (`owner_id`),
  CONSTRAINT `fk_restaurant_owner` FOREIGN KEY (`owner_id`) REFERENCES `RestaurantOwner` (`owner_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_restaurant_rating` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=415 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (401,'Spice Hub',1,'9000000001',4.3,301,'Street 401','Ahmedabad','380001',0,0),(402,'Pizza Palace',1,'9000000002',4.1,309,'Street 402','Ahmedabad','380001',0,0),(403,'Burger Town',1,'9000000003',4.5,302,'Street 403','Ahmedabad','380001',0,0),(404,'Biryani House',1,'9000000004',4.7,310,'Street 404','Ahmedabad','380001',0,0),(405,'Green Bowl',1,'9000000005',NULL,303,'Street 405','Ahmedabad','380001',0,0),(406,'Tandoori Treats',1,'9000000006',4.2,304,'Street 406','Ahmedabad','380001',0,0),(407,'Sushi Spot',1,'9000000007',4.6,305,'Street 407','Ahmedabad','380001',0,0),(408,'Cafe Delight',1,'9000000008',4.4,306,'Street 408','Ahmedabad','380001',0,0),(409,'Dosa Corner',1,'9000000009',4.3,307,'Street 409','Ahmedabad','380001',0,0),(410,'Chaat Express',1,'9000000010',4.1,308,'Street 410','Ahmedabad','380001',0,0),(411,'dawat',1,'800000005',NULL,315,'street411','ahmedabad','380001',0,0),(412,'Food Fiesta',1,'9000000011',4.2,311,'Street 412','Ahmedabad','380001',0,0),(413,'Urban Bites',1,'9000000012',4.5,312,'Street 413','Ahmedabad','380001',0,0),(414,'xxxx',1,'9392756057',NULL,316,'xxxxxx','x','382055',0,0);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurantowner`
--

DROP TABLE IF EXISTS `restaurantowner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantowner` (
  `owner_id` int NOT NULL AUTO_INCREMENT,
  `role_start_date` date NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`owner_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `restaurantowner_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurantowner`
--

LOCK TABLES `restaurantowner` WRITE;
/*!40000 ALTER TABLE `restaurantowner` DISABLE KEYS */;
INSERT INTO `restaurantowner` VALUES (301,'2023-01-01',1,0,21),(302,'2023-06-01',1,0,22),(303,'2023-09-01',1,0,23),(304,'2023-02-01',1,0,24),(305,'2023-03-01',NULL,0,25),(306,'2023-04-01',1,0,26),(307,'2023-05-01',1,0,27),(308,'2023-06-01',1,0,28),(309,'2023-07-01',1,0,29),(310,'2023-08-01',1,0,30),(311,'2024-03-01',1,0,32),(312,'2026-03-30',1,0,34),(315,'2026-03-30',1,0,43),(316,'2026-04-01',1,0,50);
/*!40000 ALTER TABLE `restaurantowner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `roleID` int NOT NULL,
  `roleName` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`roleID`),
  UNIQUE KEY `roleName` (`roleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'Admin','Full system access'),(2,'Customer','Place and track orders'),(3,'DeliveryPartner','Accept and deliver orders'),(4,'RestaurantOwner','Manage restaurant and menu');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `token` (`token`),
  KEY `fk_sessions_member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,25,'a0c7d233-6339-4f08-88b6-aee9cb7939e9','2026-04-02 16:52:28','2026-04-03 00:52:28'),(2,6,'798e2b11-3888-4036-ac13-fa92c44df426','2026-04-02 16:53:09','2026-04-03 00:53:10'),(3,21,'f8707389-605c-4b4b-9b27-b45acddce955','2026-04-02 16:54:13','2026-04-03 00:54:13'),(4,12,'cc883d43-bf99-4bda-bb75-4df283e0de09','2026-04-02 16:55:13','2026-04-03 00:55:14'),(5,13,'bc31e1bf-d81c-4643-8eb2-7484a2953e1c','2026-04-02 16:55:59','2026-04-03 00:56:00'),(6,6,'1799f131-44b6-49dd-b526-19b422780a49','2026-04-02 16:57:37','2026-04-03 00:57:38'),(7,21,'6373f50a-a662-4f7b-8ba4-f5c0c5016dde','2026-04-02 16:58:10','2026-04-03 00:58:10'),(8,1,'6dfdaa54-653e-4c44-85fc-7320473065a4','2026-04-02 17:01:33','2026-04-03 01:01:34'),(9,6,'c4948ee8-3ecd-47ac-9014-c1784312f20d','2026-04-02 17:55:58','2026-04-03 01:55:58'),(10,25,'6fa992af-a7f8-4ad1-bc2d-a486dfd5f62a','2026-04-02 17:56:32','2026-04-03 01:56:33'),(11,12,'70df9d36-6562-4cf6-a37f-d4816d00a38f','2026-04-02 17:57:06','2026-04-03 01:57:07'),(12,12,'2aa61b64-5ca1-4cab-bfd0-20ec2d7c607e','2026-04-02 17:57:23','2026-04-03 01:57:24'),(13,14,'2eeae77d-364b-450e-bd07-3bfbd2033c72','2026-04-02 18:06:53','2026-04-03 02:06:54'),(14,12,'f9d9fbb9-b35f-4680-9480-c7d4cc72b7ba','2026-04-02 18:09:12','2026-04-03 02:09:13'),(15,6,'6c46e4ec-853b-43e7-ba54-cc50576b84f1','2026-04-02 18:13:14','2026-04-03 02:13:14'),(16,25,'de55a81e-734a-4e2f-b260-917524c9a878','2026-04-02 18:13:36','2026-04-03 02:13:37'),(17,12,'ac68bd13-8aa4-439d-b668-1ac8e928ff42','2026-04-02 18:13:54','2026-04-03 02:13:54'),(18,12,'08433437-1d9c-446b-a163-53348662003b','2026-04-02 18:21:22','2026-04-03 02:21:22'),(19,1,'442b2e4b-7809-4f6e-8bd9-2d159278a2b4','2026-04-02 18:21:58','2026-04-03 02:21:58'),(20,3,'52a96c34-a5be-42f8-ba6c-f80e813d04ef','2026-04-02 18:23:12','2026-04-03 02:23:13'),(21,12,'2ed8ac7c-2309-4ef1-9173-d4d8156ddc2f','2026-04-02 18:27:40','2026-04-03 02:27:40'),(22,12,'d2ca8279-4bdd-44c1-b658-32e9f3701aa8','2026-04-02 18:37:29','2026-04-03 02:37:30'),(23,12,'6943d1ab-37c2-4412-b876-cae8655c2faf','2026-04-02 19:50:16','2026-04-03 03:50:17'),(24,12,'9b5fb462-8eca-4aae-bf76-99120104da28','2026-04-02 19:54:43','2026-04-03 03:54:44'),(25,12,'4077d07c-aa93-46fa-a555-7e5cbc2f8d51','2026-04-02 20:09:26','2026-04-03 04:09:27'),(26,12,'ae41cbfe-d432-4cc3-a632-b2db5b86faab','2026-04-02 20:09:56','2026-04-03 04:09:57'),(27,12,'5fda9fd8-f801-4ad9-941f-ebaeffbb4200','2026-04-02 20:24:18','2026-04-03 04:24:18'),(28,12,'558859c1-342e-408c-bbc7-0e55a70e4c6c','2026-04-02 20:26:33','2026-04-03 04:26:33'),(29,2,'a4a5b3a2-f53d-4b39-822a-4cb5f4b651ac','2026-04-02 20:27:25','2026-04-03 04:27:26'),(30,21,'667b1cfd-c718-46cd-a960-914fab2a2e7c','2026-04-02 20:34:54','2026-04-03 04:34:54'),(31,12,'04404bd5-37c7-416b-99f5-9571cdebd662','2026-04-02 20:35:27','2026-04-03 04:35:27'),(32,2,'fb53ed8e-9cdd-44da-bdf6-013a68b06783','2026-04-02 20:35:57','2026-04-03 04:35:58'),(34,1,'adc4ad0a-e22f-41ce-be97-eb907186b51a','2026-04-02 20:38:26','2026-04-03 04:38:26'),(35,6,'05c0c931-c5da-4e26-a379-dbcd1e03a044','2026-04-02 20:40:47','2026-04-03 04:40:47'),(39,21,'ebc42638-8ccb-4ed8-bc4e-0bb722706a57','2026-04-02 20:42:16','2026-04-03 04:42:17'),(40,22,'fcd27111-6d6e-414b-9066-e0bef28b73b7','2026-04-02 20:42:38','2026-04-03 04:42:38'),(43,12,'7e128a71-f606-46d4-9ba7-bc602f4bca55','2026-04-02 20:44:05','2026-04-03 04:44:06'),(44,3,'6a2aaab5-7353-4ead-b436-0f82048ee839','2026-04-02 20:57:07','2026-04-03 04:57:08'),(47,22,'7e0b6482-fbd5-4057-96c0-4118ffe8b0c7','2026-04-02 20:58:32','2026-04-03 04:58:32'),(49,15,'eb9778a3-a5d6-4702-81ab-760084c82796','2026-04-02 21:00:28','2026-04-03 05:00:29'),(50,12,'36b82a73-ba40-4d0d-8120-76ea461b7317','2026-04-02 21:07:00','2026-04-03 05:07:00'),(54,12,'dd7e08e6-fa7b-44e3-a8d5-409d296fb603','2026-04-02 21:19:39','2026-04-03 05:19:39'),(55,21,'dd60dda0-bfcb-48d5-a0c1-93b769661b84','2026-04-02 21:19:47','2026-04-03 05:19:47'),(56,12,'53853144-d720-49b0-9e53-c92b97fc0469','2026-04-02 21:20:04','2026-04-03 05:20:04'),(57,12,'1e2c4b68-8e10-4c68-88d1-6f5f98fbf084','2026-04-02 21:21:36','2026-04-03 05:21:36'),(58,6,'ac409d00-df64-433a-8c4c-c912778c42be','2026-04-02 22:56:04','2026-04-03 06:56:05'),(59,3,'e6265102-7b34-40e2-a557-5fd4c0006f0c','2026-04-04 12:10:13','2026-04-04 20:10:14'),(60,3,'005269a3-8459-4076-84d2-2c09cd50b937','2026-04-04 12:13:52','2026-04-04 20:13:52');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shard_0_menuitem`
--

DROP TABLE IF EXISTS `shard_0_menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shard_0_menuitem` (
  `item_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`item_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `fk_menu_category` (`category_id`),
  CONSTRAINT `shard_0_menuitem_chk_1` CHECK ((`price` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shard_0_menuitem`
--

LOCK TABLES `shard_0_menuitem` WRITE;
/*!40000 ALTER TABLE `shard_0_menuitem` DISABLE KEYS */;
INSERT INTO `shard_0_menuitem` VALUES (702,401,'Veg Biryani',180.00,601,1,'images/biryani2.jpg'),(705,403,'Cheese Burger',149.00,603,1,'images/burger1.jpg'),(708,406,'Paneer Butter Masala',220.00,608,1,'images/paneer1.jpg'),(711,408,'Gulab Jamun',90.00,606,1,'images/gulab.jpg'),(714,406,'Chole Bhature',160.00,608,1,'images/chole.jpg'),(717,406,'Tandoori Chicken',400.00,608,1,'images/tandoori.jpg'),(720,401,'Lassi',70.00,607,1,'images/lassi.jpg');
/*!40000 ALTER TABLE `shard_0_menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shard_1_menuitem`
--

DROP TABLE IF EXISTS `shard_1_menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shard_1_menuitem` (
  `item_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`item_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `fk_menu_category` (`category_id`),
  CONSTRAINT `shard_1_menuitem_chk_1` CHECK ((`price` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shard_1_menuitem`
--

LOCK TABLES `shard_1_menuitem` WRITE;
/*!40000 ALTER TABLE `shard_1_menuitem` DISABLE KEYS */;
INSERT INTO `shard_1_menuitem` VALUES (703,402,'Margherita Pizza',299.00,602,1,'images/pizza1.jpg'),(706,403,'Chicken Burger',199.00,603,1,NULL),(712,408,'Ice Cream',80.00,606,1,NULL),(715,410,'Pani Puri',60.00,609,1,'images/panipuri.jpg'),(718,405,'Veg Manchurian',190.00,605,1,'images/manchurian.jpg');
/*!40000 ALTER TABLE `shard_1_menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shard_2_menuitem`
--

DROP TABLE IF EXISTS `shard_2_menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shard_2_menuitem` (
  `item_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`item_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `fk_menu_category` (`category_id`),
  CONSTRAINT `shard_2_menuitem_chk_1` CHECK ((`price` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shard_2_menuitem`
--

LOCK TABLES `shard_2_menuitem` WRITE;
/*!40000 ALTER TABLE `shard_2_menuitem` DISABLE KEYS */;
INSERT INTO `shard_2_menuitem` VALUES (701,401,'Chicken Biryani',230.00,601,1,'images/biryani1.jpg'),(704,402,'Farmhouse Pizza',399.00,602,1,'images/pizza2.jpg'),(707,409,'Masala Dosa',120.00,604,1,'images/dosa1.jpg'),(710,405,'Fried Rice',170.00,605,1,'images/rice1.jpg'),(713,408,'Cold Coffee',110.00,607,1,'images/coffee.jpg'),(716,407,'Fish Curry',320.00,610,1,'images/fish.jpg'),(719,408,'Chocolate Cake',250.00,606,1,'images/cake.jpg');
/*!40000 ALTER TABLE `shard_2_menuitem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-17  2:21:30
