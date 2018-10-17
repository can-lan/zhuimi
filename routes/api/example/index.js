let AliCloudClient = require("../aliCloudClient");  //0 安装程序提示所需npm到node-modules
let aliClient=new AliCloudClient({        
    AccessKeyId:"LTAI6RcLKiVxplzs",     //1
    AccessKeySecret:"bvHC8AdvY1aUOeMtFTMQPP2N5y0ESn",   //2
    serverUrl:"http://domain.aliyuncs.com"  //3
});

//获取解析列表
aliClient.get("/",{
    Action:"CheckDomain",   //4
    DomainName:"baidu.com"  //5   //6 Version:"2018-01-29"(aliCloudClient.js)
}).then(function(data){
    console.log(data.body)
}).catch(function(err){
    console.log(err);
});
 
module.exports=aliClient;
