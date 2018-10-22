$(function(){
  $(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
  $(`<link rel="shortcut icon" href="img/header/favicon.ico"> `).appendTo("head");
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
        url:'http://localhost:7000/header',
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
  //为搜索框绑定事件, 并且可发送请求
  
})