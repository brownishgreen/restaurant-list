-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: localhost    Database: restaurant
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `Restaurants`
--

DROP TABLE IF EXISTS `Restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `google_map` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Restaurants_userId_foreign_idx` (`userId`),
  CONSTRAINT `Restaurants_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurants`
--

LOCK TABLES `Restaurants` WRITE;
/*!40000 ALTER TABLE `Restaurants` DISABLE KEYS */;
INSERT INTO `Restaurants` VALUES (1,'Sababa 沙巴巴中東美食','Sababa Pita Bar','中東料理','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg','台北市羅斯福路三段 283 巷 17 號','02 2363 8009','https://goo.gl/maps/BJdmLuVdDbw',4.2,'沙巴巴批塔是台灣第一家純手工批塔專賣店,只選用最新鮮的頂級原料,以及道地的中東家傳配方。','2024-08-28 22:23:42','2024-09-04 23:04:56',1),(2,'梅子鰻蒲燒專賣店','Umeko Japanese Unagi House','日本料理','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5628/02.jpg','台北市中山區林森北路 107 巷 8 號',' 02 2521 2813','https://goo.gl/maps/cUJEmFSRKyH2',4.5,'鰻魚、鰻魚飯、真空鰻魚','2024-08-28 22:23:42','2024-09-01 02:47:46',2),(3,'ZIGA ZIGA','Ziga Zaga','義式餐廳','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5629/03.jpg','台北市信義區松壽路 2 號','02 2720 1230','https://goo.gl/maps/bnZKC2YjYZp',4.2,'以頂級食材與料理技法完美呈現各類經典義式料理，獅頭造型烤爐現作pizza與開放式廚房現作龍蝦茄汁雞蛋銀絲麵是不可錯過的必嚐推薦！夜間國際級樂團的熱力演出，感受活力四射的現場魅力。','2024-08-28 22:23:42','2024-08-28 22:23:42',1),(4,'艾朋牛排餐酒館','A Point Steak & Bar','美式','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5630/04.jpg','110 台北市信義區忠孝東路五段 139 號 2 樓','02 2756 7788','https://goo.gl/maps/6Lq7U2ahp152',4.2,'從味蕾開始，重拾美味感動。艾朋牛排餐酒館對高級料理的細選珍饌堅持，更勇於翻脫新意，要以平易親人的親切風格，同時不失料理獨家精髓，成功打動每吋挑剔味蕾，讓每位顧客享用鮮嫩Steak牛排風采，咀嚼Pasta義大利麵層次風味！','2024-08-28 22:23:42','2024-08-28 22:23:42',2),(5,'Gusto Pizza','Gusto Pizza','義式餐廳','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5631/05.jpg','北市中正區連雲街 74 號','02 2358 7001','https://goo.gl/maps/rqzbVyrR9Gp',4.7,'我們的披薩師傅從倫敦帶來別於一般口味的經典義大利披薩，而且披薩麵團至少發酵24小時。同時我們也窯烤麵包及甜點，但披薩才是GUSTO最強項。我們製做的每一份餐點，都充滿飽飽的口味及香氣。除此之外，遵循純手工及傳統方式製作是我們的堅持。','2024-08-28 22:23:42','2024-09-01 03:26:35',1),(6,'WXYZ Bar','WXYZ Bar','酒吧','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5632/06.jpg','台北市中山區雙城街','02 7743 9999','https://goo.gl/maps/rFLNu87ruBM2',4.3,'紅酒吧，現代創意料理，開胃小館。提供純素選擇，提供無麩質選擇，提供素食選擇。','2024-08-28 22:23:42','2024-08-28 22:23:42',2),(7,'Fika Fika Cafe','Fika Fika Cafe','咖啡','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5633/07.jpg','台北市中山區伊通街 33 號','02 2507 0633','https://goo.gl/maps/Y1iyiSK7EeR2',4.3,'我們在乎每一位顧客、賣出去的每一滴咖啡、每一粒咖啡豆。而今，「Fika Fika Cafe Online Store」更期望把如此美好的體驗，分享給喜歡我們的每一位顧客，希望您無論在世界的哪一個角落，都能與我們一起享受「Fika Fika」的美好時光。','2024-08-28 22:23:42','2024-08-28 22:23:42',1),(8,'布娜飛比利時啤酒餐廳','Bravo Beer','義式餐廳','https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5634/08.jpg','台北市松山區市民大道四段 185 號','02 2570 1255','https://goo.gl/maps/V9mKwVJ4s5v',4.7,'我們希望帶給您的，不只是啤酒，有美食，還有一份對生活的熱情。 義大利語「Bravo」的原意─「喝采」、「讚揚」， 我想著如果有一個大家都能輕鬆品嚐美酒、享受美食的地方，那就真的是太棒了！ 因為這個念頭，加上一股對比利時啤酒的熱情， 於是「Bravo Beer布娜飛比利時啤酒餐廳」在2006年誕生了...','2024-08-28 22:23:42','2024-08-28 22:23:42',2);
/*!40000 ALTER TABLE `Restaurants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-06  7:39:56
