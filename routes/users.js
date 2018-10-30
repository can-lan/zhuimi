const express=require('express');
var router=express.Router();
const pool=require('../pool');
router.get('/has',(req,res)=>{
    var $uname=req.query.uname;
    if(!$uname){
        return
    }
    var sql='SELECT * FROM zm_users WHERE uname=?';
    pool.query(sql,[$uname],(err,result)=>{
        if(err) throw err;  
        res.send(result);
    });
});
router.post('/register',(req,res)=>{
    console.log("req.body: "+req.body);
    var $uname=req.body.uname;
    var $upwd=body.query.upwd;
    var $phone=body.query.phone;
    if(!$uname) return ;
    if(!$upwd) return ;
    if(!$phone) return ;
    var sql='INSERT INTO zm_users VALUES(null,?,?,?,null)';
    pool.query(sql,[$uname,$upwd,$phone],(err,result)=>{
        if(err) throw err;
        console.log(result);
    });
})
module.exports=router;
