SET NAMES UTF8;
DROP DATABASE IF EXISTS zm;
CREATE DATABASE zm CHARSET=UTF8;
USE zm;
/*一级分类表*/
CREATE TABLE zm_firstlist(
    fid TINYINT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(8),
    fintroduce VARCHAR(128),
    href VARCHAR(32)
);
/*二级分类*/
CREATE TABLE zm_secondlist(
    sid TINYINT PRIMARY KEY,
    sname VARCHAR(8),
    sintroduce VARCHAR(128),
    fid TINYINT,
    href VARCHAR(32)
);
/*交易域名表*/
CREATE TABLE zm_sale(
    id INT PRIMARY KEY AUTO_INCREMENT,#每个域名的id
    domainname VARCHAR(64),            #域名全名包含后缀
    info VARCHAR(32),                  #域名简介
    uid INT,                           #持有人ID
    isOnsale INT,                      #是否在售,取值1,0                       
    endTime DATETIME,              #出售截止时间
    saleType VARCHAR(8),                      #交易类型取值 1:一口价 2:竞价 3:询价 
    startPrice INT,                    #起始出售价格(用于一元起拍) 询价不显示价格,取值null?
    offer INT,                          #出价次数
    nowPrice INT,                      #当前价格
    star INT DEFAULT 0,                #推荐指数取值 1,2,3,4,5 用来按推荐排序
    saleTime VARCHAR(32) DEFAULT ''    #截止交易结束剩余时间,默认空,前端计算获得
);
/*用户表*/
CREATE TABLE zm_users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(16),
    upwd VARCHAR(32),
    phone VARCHAR(20),
    photo VARCHAR(256) DEFAULT './img/pub/photo.png',
    domains VARCHAR(10240)
);
/*抢注竞价域名表*/

/**导入数据**/
/*一级分类*/
INSERT INTO zm_firstlist VALUES
(null,'域名注册','域名注册的介绍fintroduce',"/registered.html"),
(null,'域名交易','域名交易的介绍fintroduce',"/sale.html"),
(null,'域名预定','域名预定的介绍fintroduce',"/sale.html"),
(null,'预定竞价','预定竞价的介绍fintroduce',"/sale.html"),
(null,'域名经纪','域名经纪的介绍fintroduce',"/broker.html"),
(null,'域名工具','域名工具的介绍fintroduce',"/tool.html");
/*二级分类*/
INSERT INTO zm_secondlist VALUES
(1,'推荐注册','域名注册的介绍fintroduce',1,'/registered.html'),
(2,'热销注册','域名交易的介绍fintroduce',1,'/registered.html?type=rx'),
(3,'国别域名','域名预定的介绍fintroduce',1,'/registered.html?type=gb'),
(4,'新顶级域名','预定竞价的介绍fintroduce',1,'/registered.html?type=xdj'),
(5,'中文域名','域名经纪的介绍fintroduce',1,'/registered.html?type=zw'),
(21,'推荐交易','域名注册的介绍fintroduce',2,'/sale.html'),
(22,'一口价','域名交易的介绍fintroduce',2,'/sale.html?type=ykj'),
(23,'域名竞价','域名预定的介绍fintroduce',2,'/sale.html?type=jj'),
(24,'域名询价','预定竞价的介绍fintroduce',2,'/sale.html?type=xj'),
(25,'域名拍卖','域名经纪的介绍fintroduce',2,'/sale.html?type=pm'),
(31,'推荐预定','域名经纪的介绍fintroduce',3,'/sale.html'),
(32,'国际域名','域名注册的介绍fintroduce',3,'/sale.html?type=ykj'),
(33,'国内域名','域名交易的介绍fintroduce',3,'/sale.html?type=jj'),
(34,'备案域名','域名预定的介绍fintroduce',3,'/sale.html?type=xj'),
(35,'权重域名','预定竞价的介绍fintroduce',3,'/sale.html?type=pm'),
(41,'热门竞价','域名注册的介绍fintroduce',4,'/sale.html?type'),
(42,'即将结束','域名交易的介绍fintroduce',4,'/sale.html?type=ykj'),
(43,'我的竞价','预定竞价的介绍fintroduce',4,'/sale.html?type=jj'),
(44,'得标域名','域名经纪的介绍fintroduce',4,'/sale.html?type=xj'),
(45,'违约认购','域名预定的介绍fintroduce',4,'/sale.html?type=pm'),
(51,'推荐预定','域名注册的介绍fintroduce',5,"/broker.html"),
(52,'国际预定','域名交易的介绍fintroduce',5,"/broker.html"),
(53,'国内预定','域名预定的介绍fintroduce',5,"/broker.html"),
(54,'我的预定','预定竞价的介绍fintroduce',5,"/broker.html"),
(55,'违约认购','域名经纪的介绍fintroduce',5,"/broker.html"),
(61,'whois查询','域名注册的介绍fintroduce',6,"/tool.html"),
(62,'备案查询','域名交易的介绍fintroduce',6,"/tool.html"),
(63,'安全监测','域名预定的介绍fintroduce',6,"/tool.html"),
(64,'域名行情','预定竞价的介绍fintroduce',6,"/tool.html"),
(65,'域名米表','域名经纪的介绍fintroduce',6,"/tool.html");
/*交易域名表*/
INSERT INTO zm_sale VALUES
/*域名id  域名         简介    uid 是否在售 截止时间 交易类型 始价 出价次数 现价 推荐*/
(null,"domainname.com","精品英文域名",1,1,"2018-10-26T02:59","ykj",888,5,1788,0,DEFAULT),
(null,"sale.com","出售 英文 简介",1,1,"2018-10-26T02:55","ykj",888,5,1788,0,DEFAULT),
(null,"ynyyzs.com","域名含义简介",	1	,1,	"2018/12/10 12:32:00"	,"ykj",	88,	1,	288,	DEFAULT,DEFAULT),
(null,"tyygkf.com","域名简介",	1	,1,	"2018/12/10 12:32:01"	,"ykj",	89,	2,	289,	DEFAULT,DEFAULT),
(null,"wjhhyy.com","域名简介",	1	,1,	"2018/12/10 12:32:02"	,"ykj",	90,	3,	290,	DEFAULT,DEFAULT),
(null,"woitbw.com","域名简介",	1	,1,	"2018/12/10 12:32:03"	,"ykj",	91,	4,	291,	DEFAULT,DEFAULT),
(null,"whaddL.com","域名简介",	1	,1,	"2018/12/10 12:32:04"	,"ykj",	92,	5,	292,	DEFAULT,DEFAULT),
(null,"wooabc.com","域名简介",	1	,1,	"2018/12/10 12:32:05"	,"ykj",	93,	6,	293,	DEFAULT,DEFAULT),
(null,"xaadgs.com","域名简介",	1	,1,	"2018/12/10 12:32:06"	,"ykj",	94,	7,	294,	1,DEFAULT),
(null,"xxshbz.com","域名简介",	1	,1,	"2018/12/10 12:32:07"	,"ykj",	95,	8,	295,	1,DEFAULT),
(null,"ynjLms.com","域名简介",	1	,1,	"2018/12/10 12:32:08"	,"ykj",	96,	9,	296,	2,DEFAULT),
(null,"ynjntm.com","域名简介",	1	,1,	"2018/12/10 12:32:09"	,"ykj",	97,	10,	297,	1,DEFAULT),
(null,"xyrooy.com","域名简介",	1	,1,	"2018/12/10 12:32:10"	,"ykj",	98,	11,	298,	1,DEFAULT),
(null,"xxggyy.com","域名简介",	1	,1,	"2018/12/10 12:32:11"	,"ykj",	99,	12,	299,	1,DEFAULT),
(null,"zhydog.com","域名简介",	1	,1,	"2018/12/10 12:32:12"	,"ykj",	100,	13,	300,	0,DEFAULT),
(null,"bjzhgb.com","域名简介",	1	,1,	"2018/12/10 12:32:13"	,"ykj",	101,	14,	301,	0,DEFAULT),
(null,"whatareru.com","域名简介",	1	,1,	"2018/12/10 12:32:14"	,"ykj",	102,	15,	302,	0,DEFAULT),
(null,"snpav.com","域名简介",	1	,1,	"2018/12/10 12:32:15"	,"ykj",	103,	16,	303,	0,DEFAULT),
(null,"djroofs.com","域名简介",	2	,2,	"2018/12/10 12:32:16"	,"ykj",	104,	17,	304,	0,DEFAULT),
(null,"bingaLa.com","域名简介",	3	,3,	"2018/12/10 12:32:17"	,"ykj",	105,	18,	305,	0,DEFAULT),
(null,"chuakito.com","域名简介",4	,4,	"2018/12/10 12:32:18"	,"jj",	106,	19,	306,	0,DEFAULT),
(null,"mmuzamiL.com","域名简介",5	,5,	"2018/12/10 12:32:19"	,"jj",	107,	20,	307,	0,DEFAULT),
(null,"iiteque.com","域名简介",	6	,6,	"2018/12/10 12:32:20"	,"jj",	108,	21,	308,	0,DEFAULT),
(null,"bchhub.com","域名简介",	7	,7,	"2018/12/10 12:32:21"	,"jj",	109,	22,	309,	0,DEFAULT),
(null,"rebenko.com","域名简介",	8	,8,	"2018/12/10 12:32:22"	,"jj",	110,	23,	310,	0,DEFAULT),
(null,"wjfzpx.com","域名简介",	9	,9,	"2018/12/10 12:32:23"	,"jj",	111,	24,	311,	0,DEFAULT),
(null,"xjxhgc.com","域名简介",	10	,10,	"2018/12/10 12:32:24"	,"jj",	112,	25,	312,	0,DEFAULT),
(null,"ynjpms.com","域名简介",	11	,11,	"2018/11/25 12:32:00"	,"jj",	113,	26,	313,	0,DEFAULT),
(null,"xfsssm.com","域名简介",	12	,12,	"2018/11/25 12:32:01"	,"jj",	114,	27,	314,	0,DEFAULT),
(null,"yLmzhr.com","域名简介",	13	,13,	"2018/11/25 12:32:02"	,"jj",	115,	28,	315,	0,DEFAULT),
(null,"xnjysy.com","域名简介",	14	,14,	"2018/11/25 12:32:03"	,"jj",	116,	29,	316,	0,DEFAULT),
(null,"xjbdby.com","域名简介",	15	,15,	"2018/11/25 12:32:04"	,"jj",	117,	30,	317,	0,DEFAULT),
(null,"xLehuo.com","域名简介",	16	,16,	"2018/11/25 12:32:05"	,"jj",	118,	31,	318,	0,DEFAULT),
(null,"zymyLj.com","域名简介",	17	,17,	"2018/11/25 12:32:06"	,"jj",	119,	32,	319,	0,DEFAULT),
(null,"zjpufu.com","域名简介",	18	,18,	"2018/11/25 12:32:07"	,"jj",	120,	33,	320,	0,DEFAULT),
(null,"zmdnbr.com","域名简介",	19	,19,	"2018/11/25 12:32:08"	,"jj",	121,	34,	321,	0,DEFAULT),
(null,"zjLsjn.com","域名简介",	20	,20,	"2018/11/25 12:32:09"	,"jj",	122,	35,	322,	0,DEFAULT),
(null,"zyrkny.com","域名简介",	21	,21,	"2018/11/25 12:32:10"	,"jj",	123,	36,	323,	0,DEFAULT),
(null,"yozoko.com","域名简介",	22	,22,	"2018/11/25 12:32:11"	,"jj",	124,	37,	324,	0,DEFAULT),
(null,"cdzqdL.com","域名简介",	23	,23,	"2018/11/25 12:32:12"	,"jj",	125,	38,	325,	0,DEFAULT),
(null,"zLsbbs.com","域名简介",	24	,24,	"2018/11/25 12:32:13"	,"jj",	126,	39,	326,	0,DEFAULT),
(null,"sczzsx.com","域名简介",	25	,25,	"2018/11/25 12:32:14"	,"jj",	127,	40,	327,	0,DEFAULT),
(null,"qcggtL.com","域名简介",	26	,26,	"2018/11/25 12:32:15"	,"jj",	128,	3,	328,	0,DEFAULT),
(null,"smzzfs.com","域名简介",	27	,27,	"2019/01/25 12:32:16"	,"jj",	129,	4,	329,	0,DEFAULT),
(null,"Lehonw.com","域名简介",	28	,28,	"2019/01/25 12:32:17"	,"jj",	130,	5,	330,	0,DEFAULT),
(null,"czqscp.com","域名简介",	29	,29,	"2019/01/25 12:32:18"	,"jj",	131,	6,	331,	0,DEFAULT),
(null,"shteji.com","域名简介",	30	,30,	"2019/01/25 12:32:19"	,"jj",	132,	7,	332,	0,DEFAULT),
(null,"jge.tv","域名简介",	31	,31,	"2019/01/25 12:32:20"	,"jj",	133,	8,	333,	0,DEFAULT),
(null,"vbo.tv","域名简介",	32	,32,	"2019/01/25 12:32:21"	,"jj",	134,	9,	334,	0,DEFAULT),
(null,"vLe.tv","域名简介",	33	,33,	"2019/01/25 12:32:22"	,"jj",	135,	10,	335,	0,DEFAULT),
(null,"vso.tv","域名简介",	34	,34,	"2019/01/25 12:32:23"	,"jj",	136,	11,	336,	0,DEFAULT),
(null,"ehf.tv","域名简介",	35	,35,	"2019/01/25 12:32:24"	,"jj",	137,	12,	337,	0,DEFAULT),
(null,"aewc.net","域名简介",	36	,36,	"2019/01/25 12:32:25"	,"jj",	138,	13,	338,	0,DEFAULT),
(null,"totp.net","域名简介",	37	,37,	"2019/01/25 12:32:26"	,"xj",	139,	14,	339,	0,DEFAULT),
(null,"govg.net","域名简介",	38	,38,	"2019/01/25 12:32:27"	,"xj",	140,	15,	340,	0,DEFAULT),
(null,"txic.net","域名简介",	39	,39,	"2019/01/25 12:32:28"	,"xj",	141,	16,	341,	0,DEFAULT),
(null,"oahs.net","域名简介",	40	,40,	"2019/01/25 12:32:29"	,"xj",	142,	17,	342,	0,DEFAULT),
(null,"urco.net","域名简介",	41	,41,	"2019/01/25 12:32:30"	,"xj",	143,	18,	343,	0,DEFAULT),
(null,"ewim.net","域名简介",	42	,42,	"2019/01/25 12:32:31"	,"xj",	144,	19,	344,	0,DEFAULT),
(null,"onaa.net","域名简介",	43	,43,	"2019/01/25 12:32:32"	,"xj",	145,	20,	345,	0,DEFAULT),
(null,"gsri.net","域名简介",	44	,44,	"2019/01/25 12:32:33"	,"xj",	146,	21,	346,	0,DEFAULT),
(null,"bhgj.net","域名简介",	45	,45,	"2019/01/25 12:32:34"	,"xj",	147,	22,	347,	0,DEFAULT),
(null,"zzbp.net","域名简介",	46	,46,	"2019/01/25 12:32:35"	,"xj",	148,	23,	348,	0,DEFAULT),
(null,"onao.net","域名简介",	47	,47,	"2019/01/25 12:32:36"	,"xj",	149,	24,	349,	0,DEFAULT),
(null,"Ldxd.net","域名简介",	48	,48,	"2019/01/25 12:32:37"	,"xj",	150,	25,	350,	0,DEFAULT),
(null,"Lhyd.net","域名简介",	49	,49,	"2019/01/25 12:32:38"	,"xj",	151,	26,	351,	0,DEFAULT),
(null,"nLdf.net","域名简介",	50	,50,	"2019/01/25 12:32:39"	,"xj",	152,	27,	352,	0,DEFAULT),
(null,"wgrc.net","域名简介",	51	,51,	"2019/01/25 12:32:40"	,"xj",	153,	28,	353,	0,DEFAULT),
(null,"tzxn.net","域名简介",	52	,52,	"2019/01/25 12:32:41"	,"xj",	154,	29,	354,	0,DEFAULT),
(null,"wxvx.net","域名简介",	53	,53,	"2019/01/25 12:32:42"	,"xj",	155,	30,	355,	0,DEFAULT),
(null,"bmxs.net","域名简介",	54	,54,	"2019/01/25 12:32:43"	,"xj",	156,	31,	356,	0,DEFAULT),
(null,"hrsb.cc","域名简介",	55	,55,	"2019/01/25 12:32:44"	,"xj",	157,	32,	357,	0,DEFAULT),
(null,"hunx.tv","域名简介",	56	,56,	"2019/01/25 12:32:45"	,"xj",	158,	33,	358,	0,DEFAULT),
(null,"igym.cc","域名简介",	57	,57,	"2019/01/25 12:32:46"	,"xj",	159,	34,	180,	0,DEFAULT),
(null,"Lecc.tv","域名简介",	58	,58,	"2019/01/25 12:32:47"	,"xj",	160,	35,	181,	0,DEFAULT),
(null,"Lvtu.tv","域名简介",	59	,59,	"2019/01/25 12:32:48"	,"xj",	161,	36,	182,	0,DEFAULT),
(null,"mpdy.tv","域名简介",	60	,60,	"2019/01/25 12:32:49"	,"xj",	162,	37,	183,	0,DEFAULT),
(null,"siyu.tv","域名简介",	61	,61,	"2019/01/25 12:32:50"	,"xj",	163,	38,	184,	0,DEFAULT),
(null,"xqbz.cc","域名简介",	62	,62,	"2019/01/25 12:32:51"	,"xj",	164,	39,	185,	0,DEFAULT),
(null,"xukx.cc","域名简介",	63	,63,	"2019/01/25 12:32:52"	,"xj",	165,	40,	186,	0,DEFAULT),
(null,"tsmi.cc","域名简介",	64	,64,	"2019/01/25 12:32:53"	,"xj",	166,	41,	187,	0,DEFAULT),
(null,"wuv.tv","域名简介",	65	,65,	"2019/01/25 12:32:54"	,"xj",	167,	42,	188,	0,DEFAULT),
(null,"vsfx.cc","域名简介",	66	,66,	"2019/01/25 12:32:55"	,"xj",	168,	43,	189,	0,DEFAULT),
(null,"aLLm.org","域名简介",	67	,67,	"2019/01/25 12:32:56"	,"xj",	169,	44,	190,	0,DEFAULT),
(null,"codj.org","域名简介",	68	,68,	"2019/01/25 12:32:57"	,"xj",	170,	45,	191,	0,DEFAULT),
(null,"fiof.org","域名简介",	69	,69,	"2019/01/25 12:32:58"	,"xj",	171,	46,	192,	0,DEFAULT),
(null,"hbbe.org","域名简介",	70	,70,	"2019/01/25 12:32:59"	,"xj",	172,	47,	193,	0,DEFAULT),
(null,"nLau.org","域名简介",	71	,71,	"2019/01/25 12:32:13",	"xj",	173,	48,	194,	0,DEFAULT),
(null,"ntnv.org","域名简介",	72	,72,	"2019/01/25 12:32:01"	,"xj",	174,	49,	195,	0,DEFAULT),
(null,"ixtm.org","域名简介",	73	,73,	"2019/01/25 12:32:02"	,"xj",	175,	50,	196,	0,DEFAULT),
(null,"xmee.org","域名简介",	74	,74,	"2019/01/25 12:32:04"	,"xj",	176,	51,	197,	0,DEFAULT),
(null,"cxbk.com.cn","域名简介",	75	,75,	"2019/01/25 12:32:14"	,"xj",	177,	52,	198,	0,DEFAULT),
(null,"dzch.com.cn","域名简介",	76	,76,	"2019/01/25 12:32:15"	,"xj",	178,	53,	199,	0,DEFAULT),
(null,"yhcg.com.cn","域名简介",	77	,77,	"2019/01/25 12:32:16"	,"xj",	179,	54,	200,	0,DEFAULT),
(null,"pxsi.cn","域名简介",	78	,78,	"2019/01/25 12:32:11"	,"xj",	180,	55,	201,	0,DEFAULT),
(null,"ihre.cn","域名简介",	79	,79,	"2019/01/25 12:32:14"	,"xj",	181,	56,	202,	0,DEFAULT),
(null,"njex.cn","域名简介",	80	,80,	"2019/01/25 12:32:23"	,"xj",	182,	57,	203,	0,DEFAULT),
(null,"wbfa.cn","域名简介",	81	,81,	"2019/01/25 12:32:45"	,"xj",	183,	58,	204,	0,DEFAULT),
(null,"ayra.cn","域名简介",	82	,82,	"2019/01/25 12:32:23"	,"xj",	184,	59,	205,	0,DEFAULT),
(null,"rjak.cn","域名简介",	83	,83,	"2019/01/25 12:32:43"	,"xj",	185,	60,	206,	0,DEFAULT),
(null,"rmah.cn","域名简介",	84	,84,	"2019/01/25 12:32:43"	,"xj",	186,	61,	207,	0,DEFAULT),
(null,"hixn.cn","域名简介",	85	,85,	"2019/01/25 12:32:12"	,"xj",	187,	62,	208,	0,DEFAULT),
(null,"hzeh.cn","域名简介",	86	,86,	"2019/01/25 12:32:12"	,"xj",	188,	63,	209,	0,DEFAULT),
(null,"hzwe.cn","域名简介",	87	,87,	"2019/01/25 12:32:23"	,"xj",	189,	64,	210,	0,DEFAULT),
(null,"edrf.cn","域名简介",	88	,88,	"2019/01/25 12:32:17"	,"xj",	190,	65,	211,	0,DEFAULT),
(null,"edrn.cn","域名简介",	89	,89,	"2019/01/25 12:32:28"	,"xj",	191,	66,	212,	0,DEFAULT),
(null,"efrd.cn","域名简介",	90	,90,	"2019/01/25 12:32:39"	,"xj",	192,	67,	213,	0,DEFAULT),
(null,"efrf.cn","域名简介",	91	,91,	"2019/01/25 12:32:40"	,"xj",	193,	68,	214,	0,DEFAULT),
(null,"efrg.cn","域名简介",	92	,92,	"2019/01/25 12:32:51"	,"xj",	194,	69,	215,	0,DEFAULT),
(null,"efrm.cn","域名简介",	93	,93,	"2019/01/25 12:32:12"	,"xj",	195,	70,	216,	0,DEFAULT);
/*用户表数据*/
INSERT INTO zm_users VALUES(null,'admin','123456','01234567890','./img/pub/huoshan.jpg','admin.com');
