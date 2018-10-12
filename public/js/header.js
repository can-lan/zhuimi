$(function(){
  $(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
  (async function(){
    //引入header.html
    await $.ajax({
      url:"header.html",
      type:"get",
      success:function(res){
        $(res).replaceAll("header");
      }
    })
    //请求2个栏目表
    var res=await $.ajax({
        url:'http://localhost:7000/index',
        type:'get',
    });

    new Vue({
      el:"#header",
      data:{function(){
          return {
              firstlist:{},
              secondlist:{}
          }
      }},
      created(){
        this.firstlist=res.firstlist;
        this.secondlist=res.secondlist;
      }
    });
  })();
})
