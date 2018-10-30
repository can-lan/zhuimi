$(function(){
  //1.监视整页#content
  var domainVm=new Vue({
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
      ban:0, //轮播图判断值
    },
    methods:{
      //1.1 input btn点击刷新页面,并传递input内keyword和suffix(页面加载调getSearch)
      toUrl(){
        if(this.keyword.indexOf('.') != -1){this.suffix=''}
        location.href="/domain.html?d="+this.keyword+this.suffix
      },
      getSearch(){ 
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
        //2.
        if(this.keyword != ''){ //输入值不为空     
          for(let item of this.suffixs){  //ajax遍历suffixs,请求每一个后缀是否注册
            $.ajax({
              async:false,
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
            console.log(this.resulte)
          }
        }
        //3.请求推荐域名
       /*var add=this.add;
        for(var i=0;i<add.length;i++){
          if(i<3){  
            var recommentDomain =keyword+add[i];  //往后拼接
          }else{
            var recommentDomain =add[i]+keyword; //往前拼接
          }
          recommentDomain+=".com";
          $.ajax({
            async:false,
            url:'/api?d='+recommentDomain,
            method:'get',
            success:(res)=>{
              let avail=res.Avail;
              console.log(res)
              if(avail==1){
                avail=true
              }else{
                avail=false
              }
              var obj2={};
              obj2.domain=recommentDomain;
              obj2.avail=avail;
              this.recomment.push(obj2);
            }
          });
          console.log(this.recomment)
        }*/
      },
      clearCart(e){  //4.2清空购物车
        e.preventDefault();
        localStorage.clear();
        this.local=[];
        var addBtns=$(".addCart");
        for(var addBtn of addBtns){
            $(addBtn).html("加入购物车");
            $(addBtn).css({"background":"#00c1de","color":"#fff","border":"none"});          
        }
      },  //4.3移除购物车单个域名
      delCart(e){
        e.preventDefault();
        e.stopPropagation();
        var cartDomain=$(e.target).attr("data-cartDomain");
        this.local.splice(this.local.indexOf(cartDomain),1);
        localStorage.removeItem(cartDomain);
        var cartSuffix=cartDomain.slice(cartDomain.indexOf('.')+1); //将左侧resulte中对应的改回加入购物车
        var addBtns=$(".addCart");
        for(var addBtn of addBtns){
          if($(addBtn).attr("data-suffix")==cartSuffix){
            $(addBtn).html("加入购物车");
            $(addBtn).css({"background":"#00c1de","color":"#fff","border":"none"});
          }
        }
      }
    },
    created(){
      //1.3 获取地址栏参数d
      var d=window.location.search;
      d=d.slice(d.indexOf('=')+1)
      this.keyword=d.slice(0,d.indexOf('.'));//将域名前缀插入到输入框
      this.getSearch();   //调用1.2 查询
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
      },3000)
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
  })
  //4.添加购物车按钮绑定事件
  var addCarts=$('.addCart');
  for(let addCart of addCarts){
    $(addCart).on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      var domain=$(e.target).attr("data-keyword")+"."+$(e.target).attr("data-suffix");
      if($(this).html()=="加入购物车"){ //点击加入购物车, 按钮变为移出清单, 不同功能
        $(addCart).html("移出清单");
        $(addCart).css({"background":"#fff","color":"#00c1de","border":"1px solid #00c1de"});
        localStorage.setItem(domain,"domain");
        domainVm.local.unshift(domain);
      }else{
        $(addCart).html("加入购物车");  //点击移出清单, 按钮变为移出清单, 不同功能
        $(addCart).css({"background":"#00c1de","color":"#fff","border":"none"});
        localStorage.removeItem(domain);
        domainVm.local.splice(domainVm.local.indexOf(domain),1);
      }
    })
  }
  //4.1页面一加载,将localStorage值为domain的名称添加到local数组
  for(var i=0;i<localStorage.length;i++){
    var name=localStorage.key(i); //找到localStorage中所有的name
    var value=localStorage.getItem(name);
    if(value == 'domain'){  //value为'domain'的
      domainVm.local.push(name); 
    }
  }
  //4.2页面一加载,将localStorage值为domain==result中的按钮, 则按钮为"移出清单";
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
})