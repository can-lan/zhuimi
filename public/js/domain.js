$(function(){

  //1.监视整页#content
  domainVm=new Vue({
    el:"#content",
    data:{
      keyword:'', //双向绑定keyword输入框
      suffix:'.com',
      suffixs:[{d:"com",p:"49"},{d:"cn",p:"19"},{d:"com.cn",p:"18"},{d:"net",p:"59"},{d:"org",p:"49"},{d:"cc",p:"22"},{d:"tv",p:"228"},{d:"xin",p:"15"},{d:"top",p:"6"},{d:"vip",p:"99"},{d:"love",p:"52"},{d:"club",p:"16"},{d:"xyz",p:"6"},{d:"中国",p:"188"},{d:"公司",p:"158"}],  //所有后缀
      price:[49,19,18,69,59,22,228,15,6,55,52,16,6,188,158],
      add:["123","365","360","i","91","51"],//推荐域名前面拼接字符
      recomment:[],
      resulte:[],  //后缀和对应结果
      local:[],
      hasLocal:false,
      ban:0 //轮播图判断值
    },
    created(){
      //1.3 获取地址栏参数d
      var d=window.location.search;
      d=d.slice(d.indexOf('=')+1)
      this.keyword=d.slice(0,d.indexOf('.'));//将域名前缀插入到输入框
      //this.getSearch();   //调用1.2 查询
      //1.获取地址栏参数, 并截取出keyword和suffix
      var d=window.location.search; //d=domain.com
      d=d.slice(d.indexOf('=')+1);  //domain.com
      var keyword=d.slice(0,d.indexOf('.'));//获取到前缀keyword
      this.keyword=keyword;//将domain插入到input输入框
      var suf=d.slice(d.indexOf('.')+1);  //找到suffix(不带.)
      //循环找到suf在数组中的下标
      for(var i=0;i<this.suffixs.length;i++){
        if(this.suffixs[i].d==suf){
          var sufIndex=i;
        }
      } //找到suffix在后缀数组中的位置
      
      var key=this.suffixs.splice(sufIndex,1);//将该后缀从数组中删除
      this.suffixs.unshift(key[0]);//将该后缀插入到数组的最前面
      if(this.keyword != ''){ //输入值不为空     
        for(let item of this.suffixs){  //ajax遍历suffixs,请求每一个后缀是否注册
          $.ajax({
            //async:false,
            url:'/api?d='+this.keyword+'.'+item.d,
            method:'get',
            success:(res)=>{
              var avail=res.Avail;
              if(avail==1){
                avail=true
              }else{
                avail=false
              }
              var obj={};
              obj.keyword=this.keyword;
              obj.suffixs=item.d;
              obj.avail=avail;
              obj.price=item.p;
              this.resulte.push(obj);
            }
          });
        }
      }
      //1.4 请求成功后移出loading
      $("#loading").remove();

      //3.轮播图.ban
      setInterval(()=>{
        this.ban++;
        var wrapper=$(".ban ul.wrapper")[0];
        if(this.ban==4){
          $(wrapper).css("transition","none");
          $(wrapper).css("marginLeft",0);
          this.ban=1;
          setTimeout(function(){
            $(wrapper).css("transition","all .6s linear");
            $(wrapper).css("marginLeft",-283);
          })
        }else{
          $(wrapper).css("marginLeft",this.ban * -283);
        }
      },3000);   
      
      //4.1页面一加载,将localStorage值为domain的名称添加到local数组
      for(var i=0;i<localStorage.length;i++){
        var name=localStorage.key(i); //找到localStorage中所有的domainname
        var value=localStorage.getItem(name);
        if(value != '' && value != ' ' && !isNaN(value)){  //value中带'/每年的'的放到数组
          this.local.push(name); 
        }
      }   
       //3.请求推荐域名
      var add=this.add;
      for(let i=0;i<add.length;i++){
        let recommentDomain;
        if(i<3){  
           recommentDomain =keyword+add[i];  //往后拼接
        }else{
           recommentDomain =add[i]+keyword; //往前拼接
        }
        let obj2={};
        obj2.keyword=recommentDomain;
        recommentDomain+=".com";
        $.ajax({
          url:'/api?d='+recommentDomain,
          method:'get',
          success:(res)=>{
            let avail=res.Avail;
            if(avail==1){
              avail=true
            }else{
              avail=false
            } 
            obj2.suffix='com';
            obj2.domain=recommentDomain;
            obj2.avail=avail;
            this.recomment.push(obj2);
          }         
        });
      }
      //0
    },
    methods:{
      //1.1 input btn点击刷新页面,并传递input内keyword和suffix(页面加载调getSearch)
      toUrl(){
        if(this.keyword.indexOf('.') != -1){this.suffix=''}
        location.href="/domain.html?d="+this.keyword+this.suffix
      },
      addCart(e){ //4.添加购物车按钮绑定事件
        e.preventDefault();
        headerVm.now='domainVm';
        var domainname=$(e.target).attr("data-keyword")+"."+$(e.target).attr("data-suffix");
        var nowPrice=$(e.target).attr("data-regPrice");
        if($(e.target).html()=="加入购物车"){   //4.1 点击加入购物车, 按钮变为移出清单, 不同功能
          $(e.target).html("移出清单");
          $(e.target).css({"background":"#fff","color":"#00c1de","border":"1px solid #00c1de"});
          localStorage.setItem(domainname,nowPrice);
          this.local.unshift(domainname);
          headerVm.cart.push({domainname,nowPrice});
        }else{
          $(e.target).html("加入购物车");       //4.2 点击移出清单, 按钮变为移出清单, 不同功能
          $(e.target).css({"background":"#00c1de","color":"#fff","border":"none"});
          localStorage.removeItem(domainname);
          this.local.splice(this.local.indexOf(domainname),1);
          headerVm.cart.splice(headerVm.cart.indexOf({domainname,nowPrice}),1);
        }
      },
      clearCart(e){ //5.购物车--清空按钮
        e.preventDefault();
        localStorage.clear();
        this.local=[];
        headerVm.cart=[];
        var addBtns=$(".addCart");
        for(var addBtn of addBtns){
          $(addBtn).html("加入购物车");
          $(addBtn).css({"background":"#00c1de","color":"#fff","border":"none"});          
        }
      },  
      delCart(e,domain){ //6.购物车--移除按钮
        e.preventDefault();
        var cartDomain=$(e.target).attr("data-cartDomain"); //当前域名
        if(domain){cartDomain=domain;}//如果header购物车传入要删除的值
        this.local.splice(this.local.indexOf(cartDomain),1);//从local[]数组中移除
        localStorage.removeItem(cartDomain);                //从localStorage中移除
        if(!domain){
          headerVm.cart.splice(headerVm.cart.indexOf(cartDomain),1);//从header.js购物车数组移除
        }
        var addBtns=$(".addCart");                          //将左侧resulte中对应的改回加入购物车
        for(var addBtn of addBtns){
          if($(addBtn).attr("data-keyword")+"."+$(addBtn).attr("data-suffix") == cartDomain){
            $(addBtn).html("加入购物车");
            $(addBtn).css({"background":"#00c1de","color":"#fff","border":"none"});
          }
        }
      },
      pay(){  //立即结算按钮
        if(!sessionStorage.getItem('uname')){
          alert('请登录账户');
          location.href="/login.html?page=1";
        }else{
          location.href='/order.html';
        }
      }
    }
  });
  //↑ VM监视结束

  //2.轮播图.ban
  setInterval(()=>{
    this.ban++;
    var wrapper=$(".ban ul.wrapper")[0];
    if(this.ban==4){
      $(wrapper).css("transition","none");
      $(wrapper).css("marginLeft",0);
      this.ban=1;
      setTimeout(function(){
        $(wrapper).css("transition","all .6s linear");
        $(wrapper).css("marginLeft",-283);
      })
    }else{
      $(wrapper).css("marginLeft",this.ban * -283);
    }
  },3000)
  //3.找到input,为其绑定回车触发事件
  $("#keyword").keyup(function(event){
    if (event.keyCode == 13) { 
      domainVm.toUrl();
    }
  }); 
  //4.2页面一加载,将localStorage值为domain==result中的按钮, 则按钮为"移出清单";
  setTimeout(function(){
  var abtns=$(".addCart");
  for(var loc of domainVm.local){
    for(var abtn of abtns){
      var keysuf = $(abtn).attr("data-keyword")+"."+$(abtn).attr("data-suffix");
      if(loc==keysuf){
        $(abtn).html("移出清单");
        $(abtn).css({"background":"#fff","color":"#00c1de","border":"1px solid #00c1de"});
      }
    }
  }
},1000);

});
 
