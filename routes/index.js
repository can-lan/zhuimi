const express=require("express");
const router=express.Router();
const pool=require("../pool.js");
var firstlist,secondlist;
router.get("/",(req,res)=>{
    var obj={
        firstlist:{},
        secondlist:{}
    };
    (async function(){
        await new Promise(function(open){
            var sql = "SELECT * FROM zm_firstlist";
            pool.query(sql,[], (err, result) => {
                if (err) console.log(err)
                obj.firstlist=result;
                open()
            })
        })

        await new Promise(function(open){
            var sql="SELECT * FROM zm_secondlist"
            pool.query(sql,[],(err,result)=>{
                if(err) console.log(err)
                obj.secondlist=result;
                open()
            })
        })
        res.send(obj);
    })()
})
module.exports=router;
xingzengjiad
