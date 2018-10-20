const express=require("express");
const bodyParser=require("body-parser");

const header=require("./routes/header");
const api=require("./routes/api");
const domain=require('./routes/domain');

const app=express();
app.listen(7000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use("/header",header);//获取所有导航分类
app.use("/api",api);//获取互联网域名是否可注册
app.use("/domain",domain);//获取本地数据库中所有域名