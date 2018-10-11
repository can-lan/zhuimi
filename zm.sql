SET NAMES UTF8;
DROP DATABASE IF EXISTS zm;
CREATE DATABASE zm CHARSET=UTF8;
USE zm;
/*一级分类表*/
CREATE TABLE zm_firstlist(
    fid TINYINT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(8),
    fintroduce VARCHAR(128)
);
/*二级分类*/
CREATE TABLE zm_secondlist(
    sid TINYINT PRIMARY KEY,
    sname VARCHAR(8),
    sintroduce VARCHAR(128),
    fid TINYINT 
);

/**导入数据**/
/*一级分类*/
INSERT INTO zm_firstlist VALUES
(null,'域名注册','域名注册的介绍fintroduce'),
(null,'域名交易','域名交易的介绍fintroduce'),
(null,'域名预定','域名预定的介绍fintroduce'),
(null,'预定竞价','预定竞价的介绍fintroduce'),
(null,'域名经纪','域名经纪的介绍fintroduce'),
(null,'域名工具','域名工具的介绍fintroduce');
/*二级分类*/
INSERT INTO zm_secondlist VALUES
(1,'推荐注册','域名注册的介绍fintroduce',1),
(2,'热门注册','域名交易的介绍fintroduce',1),
(3,'国别域名','域名预定的介绍fintroduce',1),
(4,'新顶级域名','预定竞价的介绍fintroduce',1),
(5,'中文域名','域名经纪的介绍fintroduce',1),
(21,'推荐交易','域名注册的介绍fintroduce',2),
(22,'热门交易','域名交易的介绍fintroduce',2),
(23,'一口价','域名预定的介绍fintroduce',2),
(24,'域名竞价','预定竞价的介绍fintroduce',2),
(25,'域名拍卖','域名经纪的介绍fintroduce',2),
(31,'推荐预定','域名经纪的介绍fintroduce',3),
(32,'国际域名','域名注册的介绍fintroduce',3),
(33,'国内域名','域名交易的介绍fintroduce',3),
(34,'备案域名','域名预定的介绍fintroduce',3),
(35,'权重域名','预定竞价的介绍fintroduce',3),
(41,'热门竞价','域名注册的介绍fintroduce',4),
(42,'即将结束','域名交易的介绍fintroduce',4),
(43,'我的竞价','预定竞价的介绍fintroduce',4),
(44,'得标域名','域名经纪的介绍fintroduce',4),
(45,'违约认购','域名预定的介绍fintroduce',4),
(51,'推荐预定','域名注册的介绍fintroduce',5),
(52,'国际预定','域名交易的介绍fintroduce',5),
(53,'国内预定','域名预定的介绍fintroduce',5),
(54,'我的预定','预定竞价的介绍fintroduce',5),
(55,'违约认购','域名经纪的介绍fintroduce',5),
(61,'whois查询','域名注册的介绍fintroduce',6),
(62,'备案查询','域名交易的介绍fintroduce',6),
(63,'安全监测','域名预定的介绍fintroduce',6),
(64,'域名行情','预定竞价的介绍fintroduce',6),
(65,'域名米表','域名经纪的介绍fintroduce',6);