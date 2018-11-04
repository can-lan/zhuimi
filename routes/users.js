const express=require('express');
var router=express.Router();
const pool=require('../pool');
//接口1:验证用户名是否存在
router.get('/has',(req,res)=>{
    var $uname=req.query.uname;
    if(!$uname){
        return;
    }
    var sql='SELECT * FROM zm_users WHERE uname=?';
    pool.query(sql,[$uname],(err,result)=>{
        if(err) throw err;  
        res.send(result); 
    });
});
//接口2:注册用户信息
router.post('/register',(req,res)=>{
    //console.log("req.body: "+req.body); =>? BUG 为啥不能拼接打印
    var $uname=req.body.uname;
    var $upwd=req.body.upwd;
    var $phone=req.body.phone;
    if(!$uname) return ;
    if(!$upwd) return ;
    if(!$phone) return ;
    var sql='INSERT INTO zm_users VALUES(null,?,?,?,DEFAULT,null)';
    pool.query(sql,[$uname,$upwd,$phone],(err,result)=>{
        if(err) throw err;
        res.send({code:result.affectedRows}); //不能直接返回 result.refectedRows 值为0或1的; //注册成功{code:1}  失败{code:0}
    });
})
//接口3:验证登录密码是否正确
router.get('/check',(req,res)=>{
    var $lname=req.query.lname;
    var $lpwd=req.query.lpwd;
    if(!$lname) return ;
    if(!$lpwd) return ;
    var sql='SELECT * FROM zm_users WHERE uname=? AND upwd=?';
    pool.query(sql,[$lname,$lpwd],(err,result)=>{
        if(err) throw err;
        res.send({code:result.length}); //登录成功{code:1}  失败{code:0}
    });
});
//接口4:用户购买域名后,将购买的域名插入到该用户数据表
router.post('/buy',(req,res)=>{
    var $uname=req.body.uname;
    var $domains=req.body.domains;
    if(!$uname) return ;
    if(!$domains) return ;
    var sql='UPDATE zm_users SET domains = ? WHERE uname = ? ';
    pool.query(sql,[$domains,$uname],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows==1){
            res.send({code:1})
        }else{
            res.send({code:0});
        }
    });
});

module.exports=router;
