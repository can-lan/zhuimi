    headerVm=new Vue({
      el:"#app",
      data:{
        firstlist:{},
        secondlist:{},
        whois:'',
        isLogin:false,
        dCount:'',
        cart:[],
        total:0,
        now:null,
        uname:'',
        phone:'',
        photo:'',
        id:'',
        domains:[]
      },
      created(){
        //查询localStorage--购物车
        for(var i=0;i<window.localStorage.length;i++){
          var carItem={};
          carItem.domainname=window.localStorage.key(i);
          carItem.nowPrice=window.localStorage.getItem(localStorage.key(i));
          this.cart.push(carItem);          
        }
        //查询sessionStorage--个人信息
        if(window.sessionStorage.getItem('uname')){
          this.isLogin=true;
          this.uname=window.sessionStorage.getItem('uname');
          $.ajax({
            url:'/users/has?uname='+this.uname,
            method:'get',
            success:(res)=>{
              this.uname=res[0].uname;
              this.phone=res[0].phone;
              this.photo=res[0].photo;
              this.id=res[0].id;
              if(res[0].domains){ //如果domains为null,则false; 如果不为null,则为true,会进行赋值;  
                this.dCount=res[0].domains.split(',').length;
                this.domains=res[0].domains.split(','); //拆分数据表中的域名-->遍历
              }else{
                this.dCount=0;
                this.domains=['您还没有域名'];
              }
            }
          });
        }
      },
      methods:{
        logout(e){
          e.preventDefault();
          window.sessionStorage.clear();
          window.location.href='/';
        },
        searchWhois(){
          window.open(`http://api.chinaz.com/CallAPI/Whois?key=e1caa93f865f40968b43b2445a2a4460&domainName=${this.whois}`);
        },
        cartDel(e){ 
          var domain=$(e.target).prev().text();
          localStorage.removeItem(domain);  //移除localStorage内
          for(var i=0;i<this.cart.length;i++){ //移除数组购物车内
            if(this.cart[i].domainname==domain){
              this.cart.splice(i,1); 
            }
          }; 
          if(this.now=='domainVm'){      
            domainVm.delCart(e,domain);  //触发事件,移除domain.html购物车和更改按钮
          }
          if(this.now=='saleVm'){
            $(`a[data-d='${domain}']`).html("加入购物车");  //更改页面中含有此域名的按钮,更改样式.
            $(`a[data-d='${domain}']`).css({"background":"#00c1de","color":"#fff","border":"none"});
          }
        },
        pay(){
          if(!sessionStorage.getItem('uname')){
            alert('请登录账户');
            location.href="/login.html?page=1";
          }else{
            location.href='/order.html';
          }
        }
      },
      watch:{
        cart(){ //购物车一但变化,总价变化
          var total=0;
          for(var item of this.cart){
            total+=parseInt(item.nowPrice);
          }
          this.total=total;
        }
      }
    });