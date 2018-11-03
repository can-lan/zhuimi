new Vue({
  el:'#content',
  data:{
    cart:[],
    total:null,
    isCheck:false,
    isClick:false
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
    }else{
      //否则--查询localStorage--购物车
      var total=0;
      for(var i=0;i<localStorage.length;i++){
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
    pay(){
      if(!sessionStorage.getItem('uname')){
        alert('请登录账户');
        location.href="/login.html?page=1";
      }else{
        this.isClick=true;
        if(this.isCheck){
          alert('支付成功 , 即将进入管理中心。');
          location.href='/admin.html';
          if(this.cart.length==1){
            localStorage.removeItem(this.cart[0].domainname);
          }else{
            localStorage.clear();
          }
        } 
      }  
    }
  }
});