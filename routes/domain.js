const express=require('express');
var router=express.Router();
const pool=require('../pool');

router.get('/sale',(req,res)=>{
  var control=parseInt(req.query.control);
  var sql='';
  switch(control){
    case 1: //字母顺序
      sql='SELECT * FROM zm_sale ORDER BY domainname';
      break;
    case 2: //价格排序
      sql='SELECT * FROM zm_sale ORDER BY nowPrice';
      break;
    case 3: //出价次数
      sql='SELECT * FROM zm_sale ORDER BY offer';
      break;
    case 4: //剩余时间
      sql='SELECT * FROM zm_sale ORDER BY endTime';
      break;
    case 6: //热拍热卖--出价次数排序
      sql='SELECT * FROM zm_sale ORDER BY offer DESC LIMIT 0,15';
      break;
    case 7: //即将结束--结束时间排序
      sql='SELECT * FROM zm_sale ORDER BY endTime LIMIT 0,15';
      break;
    case 8: //一口价
      sql='SELECT * FROM zm_sale WHERE saleType="ykj" ORDER BY endTime LIMIT 0,15';
      break;
    case 9: //竞价
      sql='SELECT * FROM zm_sale WHERE saleType="jj" ORDER BY endTime LIMIT 0,15';
      break;
    case 10: //询价
      sql='SELECT * FROM zm_sale WHERE saleType="xj" ORDER BY endTime desc LIMIT 0,15';
      break;
    case 11: //热拍热卖
      sql='SELECT * FROM zm_sale ORDER BY offer DESC LIMIT 0,15';
      break;
    case 12: //即将结束
      sql='SELECT * FROM zm_sale ORDER BY endTime LIMIT 0,15';
      break;
    case 13: //一口价
      sql='SELECT * FROM zm_sale WHERE saleType="ykj" ORDER BY endTime LIMIT 0,15';
      break;
    case 14: //竞价
      sql='SELECT * FROM zm_sale WHERE saleType="jj" ORDER BY endTime LIMIT 0,15';
      break;
    case 15: //询价
      sql='SELECT * FROM zm_sale WHERE saleType="xj" ORDER BY endTime desc LIMIT 0,15';
      break;
    default:
      sql='SELECT * FROM zm_sale';
      break;
  }
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
})

module.exports=router;