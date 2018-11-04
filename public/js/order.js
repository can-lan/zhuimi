new Vue({
  el:'#content',
  data:{
    cart:[],
    total:null,
    isCheck:false,
    isClick:false,
    uname:'',
    domains:''
  },
  created(){
    //?d=domainname.com&p=1788
    if(location.search){ //如果有传参, 则只购买当前参数;
        var str=location.search.slice(1);
        var arr=str.split('&');
        var domain=arr[0]
        domain=domain.slice(domain.indexOf('=')+1);
        var price=arr[1];
        price=price.slice(price.indexOf('=')+1);
        var cartItem={};
        cartItem.domainname=domain;
        cartItem.nowPrice=price;
        this.cart.push(cartItem);
        this.total=price; 
        this.domains=domain;  //获取域名字符串 
    }else{
      //否则--查询localStorage--购物车
      var total=0;
      for(var i=0;i<localStorage.length;i++){
        this.domains+=localStorage.key(i)+',';  //获取多个域名拼接字符串
        var cartItem={};
        cartItem.domainname=localStorage.key(i);
        cartItem.nowPrice=localStorage.getItem(localStorage.key(i));
        this.cart.push(cartItem);  
        total+=parseInt(cartItem.nowPrice);        
      }
      this.total=total;
    }
  },
  methods:{
    async pay(){
      if(!sessionStorage.getItem('uname')){
        alert('请登录账户');
        location.href="/login.html?page=1";
      }else{
        this.uname=sessionStorage.getItem('uname'); //已登录, 获取用户名, 下面查表,为期domains列拼接当前域名
        this.isClick=true;
        if(this.isCheck){
          //将选择的域名当前id的插入数据表;
          await $.ajax({
            url:'http://127.0.0.1:7000/users/has?uname='+this.uname,
            method:'GET',
            success:(result)=>{
              this.domains+=result[0].domains;  //domainname.com,sale.com,tyygkf.com,ynyyzs.com,admin.com
            }
          });
          await $.ajax({
            url:'http://127.0.0.1:7000/users/buy',
            method:'POST',
            data:{
              uname:this.uname,
              domains:this.domains
            },
            success:(result)=>{
              if(result.code==1){ //如果返回值{code:1} 插入数据成功
                alert('支付成功 , 即将进入管理中心。'); //跳转个人中心
                location.href='/admin.html';
                if(this.cart.length==1){
                  localStorage.removeItem(this.cart[0].domainname); //如果只买了一个,只清空购物车内的一个域名
                }else{
                  localStorage.clear();
                }
              }else{
                alert('注册失败 , 请重试 。');
              }
            }
          });
        } 
      }  
    }
  }
});