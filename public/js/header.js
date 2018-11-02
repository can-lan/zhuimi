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
        url:'/header',
        type:'get',
    });

    headerVm=new Vue({
      el:"#header",
      data:{
        firstlist:{},
        secondlist:{},
        whois:'',
        isLogin:false,
        uname:'',
        phone:'',
        photo:'',
        dCount:'',
        cart:[]
      },
      created(){
        this.firstlist=res.firstlist;
        this.secondlist=res.secondlist;
        //查询localStorage--购物车
        
        for(var i=0;i<localStorage.length;i++){
          var carItem={};
          carItem.domainname=localStorage.key(i);
          carItem.nowPrice=localStorage.getItem(localStorage.key(i));
          this.cart.push(carItem);
          
        }
        console.log(this.cart)
        //查询sessionStorage--个人信息
        if(window.sessionStorage.getItem('uname')){
          this.isLogin=true;
          this.uname=window.sessionStorage.getItem('uname');
          $.ajax({
            url:'/users/has?uname='+this.uname,
            method:'get',
            success:(res)=>{
              console.log(res)
              this.uname=res[0].uname;
              this.phone=res[0].phone;
              this.photo=res[0].photo;
              if(res[0].domains){ //如果domains为null,则false; 如果不为null,则为true,会进行赋值;
                this.dCount=res[0].domains.split(',').length;
              }else{
                this.dCount=0;
              }
              
            }
          });
        }
      },
      methods:{
        logout(e){
          e.preventDefault();
          window.sessionStorage.clear();
          window.location.href='';
        },
        searchWhois(){
          window.open(`http://api.chinaz.com/CallAPI/Whois?key=e1caa93f865f40968b43b2445a2a4460&domainName=${this.whois}`);
        }
      }
    });
  })();
})