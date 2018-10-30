//1--轮播图1
  var timer=setInterval(function(){ 
    hvm.count++ 
    if(hvms.count==5) hvm.count=0
  },6000);
  var hvm=new Vue({
    el:"#carrousel",
    data:{
      imgs:[
        ["img/index/banner4-lg.jpg","img/index/banner4-sm.png"],//←无效,被视频替代
        ["img/index/banner1-lg.jpg","img/index/banner1-sm.png"],
        ["img/index/banner2-lg.jpg","img/index/banner2-sm.png"],
        ["img/index/banner3-lg.jpg","img/index/banner3-sm.png"],
        ["img/index/banner4-lg.jpg","img/index/banner4-sm.png"]
        ],
      count:0
    },
    methods:{
      carrousel(i){ 
        hvm.count=i
        clearInterval(timer);
        timer=setInterval(function(){ 
          hvm.count++ 
          if(hvm.count==5) hvm.count=0
        },6000);
       }
    }
  });
//2.1--console控制1:
  new Vue({
    el:"#box",
    data:{
      datas:[]
    },
    methods:{
      getDomain(control){
        $.ajax({  //进行查询
          url:`/domain/sale?control=${control}`,
          type:"get",
          success:(res)=>{
            this.datas=res;
            console.log(this.datas)
            //每秒计算一次endTime-nowTime
            setInterval(()=>{
              for(var i in this.datas){
                var end=new Date(this.datas[i].endTime);
                var now = new Date();
                var seconds =(end.getTime()-now.getTime())/1000;
                seconds=Math.floor(seconds);
                var days = seconds/(24*60*60);
                days = Math.floor(days);
                var hours = seconds%(24*60*60)/(60*60);
                hours = Math.floor(hours);
                var minutes = seconds%(60*60)/60;
                minutes = Math.floor(minutes);
                var seconds = seconds%60;
                seconds = Math.floor(seconds);
                this.datas[i].saleTime=`${days}天${hours}小时${minutes}分钟${seconds}秒`;
              }
            },1000) 
          }
        });
      }        
    }
  });
//2.2--console控制1:点击当前元素,①替换所有及当前元素图片src,②将所有box关闭,展开自己对应box,③为当前元素添加三角形下标志,取消其他下标志
var controls=$("[data-toggle='tab']");
var boxs=$(".box>ul")
for(var control of controls){
  control.onclick=function(e){
    e.preventDefault();
    e.stopPropagation();
    var id=this.getAttribute("data-target");
    if(!$(id).hasClass("hidden")){  //如果当前box没有hidden,是显示的
      $(this).children("img").attr("src","/img/index/"+id.slice(1)+".png");//当前control下的img换原图片
      $(id).addClass("hidden");     //让当前boxhidden
      this.className="";            //让当前control取消三角形下标志
    }else{                              
      for(var box of boxs){           
        box.className="hidden";     //否则所有box隐藏
      } 
      $(id).removeClass("hidden");  //当前box显示
      for(var control2 of controls){
        control2.className="";  //所有control移出三角形下标志
        var id2=control2.getAttribute("data-target");
        $(control2).children("img").attr("src","/img/index/"+id2.slice(1)+".png");//所有control下的img换原图片
      }
      this.className="visible"; //为当前control添加三角形下标志
      $(this).children("img").attr("src","/img/index/"+id.slice(1)+"-bg.png");//当前control下的img换背景图片
    }
  }
}
//3--轮播图2
  function banBefore(){
    document.getElementsByClassName("before")[0].parentElement.children[0].style.marginLeft="0%";
  }
  function banNext(){
    document.getElementsByClassName("next")[0].parentElement.children[0].style.marginLeft="-100%";
  }
//4--搜索框
  var vm=new Vue({
      el:"#search",
      data:{
        keyword:"",
        suffix:".com"
      },
      methods:{
        getSearch(){
          var suffix=this.suffix;
          if(this.keyword.indexOf(".") != -1){
            suffix=""
          };//0. 如果用户输入了 .  则取消options选择的后缀, 去查询
          $.ajax({
            url:"/api?d="+this.keyword+suffix,  
            method:'get',
            success:(res)=>{
              console.log(res)
              if(res.Avail==1){ //1.如果返回可注册,=>直接跳转
                location.href="/domain.html?d="+this.keyword+suffix
              }else if(res.Reason=='Illegal domain'){ //2.如果返回非法域名
                var keyword=this.keyword;
                if(keyword.indexOf(".") != -1){  //如果是输入了不可查询的后缀
                  var keyword=keyword.slice(0,keyword.indexOf('.'));//则截取.前面
                  suffix='.com';                                        //默认查询.com
                  location.href="/domain.html?d="+keyword+suffix //=>跳转
                }
              }else if(res.Reason==undefined){  //3.如果Reason不存在, 就是已注册
                location.href="/domain.html?d="+this.keyword+suffix
              }else{  //4.Invalid Domain Name无效域名 跳转页面,domain.html页面显示 =>没有查询到附合条件的域名，或正在查询...
                location.href="/domain.html?d=''"
              }
            }
          });
        }
      }
  });
    //4.1输入框回车触发查询事件
    $("#keyword").keydown(function(event){
      if (event.keyCode == 13) { vm.getSearch() }
    })
  //5--#list动画
  var lists=$(".list0");
  for(var list of lists){
    var y=0;
    $(list).mouseenter(function(){
      var positionY=parseInt($(this).css("backgroundPosition"));
      var timer=setInterval(()=>{
        $(this).css("backgroundPosition",`0 ${positionY}px`);
        positionY-=75
        if(positionY < -4425){
          y=positionY ;
          clearInterval(timer);
        }
      },10);
    })
    $(list).mouseleave(function(){
    
      var positionY =y ;
      var timer=setInterval(()=>{
        positionY += 75
        $(this).css("backgroundPosition",`0 ${positionY}px`);
        if(positionY >= 0){
          clearInterval(timer);
        }
      },10);
    });
  }
  //6.页面滚动到.bool,执行抢注次数++
  $(window).scroll(function(){
    var scrollTop=$(this).scrollTop();
    var $span=$(".book p span");
    var number=3564278;
    function setNumber(){ //1.创建更改页面函数
      var timer=setInterval(()=>{
        number+=8
        $span.html(number);
      },250)  //定时器每100ms+98
      setTimeout(function(){
        clearInterval(timer);
      },2500) //2500ms后停止定时器
    }
    if(scrollTop > 2000 && scrollTop < 2100){
      setNumber();  //2.屏幕滚动到显示时 调用一次
      setInterval(()=>{ 
        setNumber();
      },15000)  //3.然后每隔15秒调用一次
    }
  });
  //7.页面滚动到.list, 执行margin改变
  $(window).scroll(function(){
    var scrollTop=$(this).scrollTop();
    var $spans=$(".list li span");
    var $ps=$(".list li p");
    if(scrollTop > 1700 && scrollTop < 2500){
      for(var span of $spans){
        $(span).slideUp(1200);
      }
      for(var p of $ps){
        $(p).fadeIn(1200);
      }
    }
  });
  //8.抢注节点node
  var n1s=$(".n1");
  for(let n1 of n1s){
    var w1=10;
    var opa1=1;
    setInterval(()=>{
      w1+=0.02;
      if(w1>75){opa1-=0.0003}
      if(opa1<0){
        w1=10;
        opa1=1;
      }
      $(n1).css({
        "width":w1,
        "height":w1,
        "left":(40-w1/2)+"px",
        "top":(40-w1/2)+"px",
        "border":`1px solid rgba(106,215,233,${opa1})`
      });
    },10);
  }
  var n2s=$(".n2");
  setTimeout(function(){
    var w1=10;
    var opa1=1;
    for(let n2 of n2s){
      setInterval(()=>{
        w1+=0.02;
        if(w1>75){opa1-=0.0003}
        if(opa1<0){
          w1=10;
          opa1=1;
        }
        $(n2).css({
          "width":w1,
          "height":w1,
          "left":(40-w1/2)+"px",
          "top":(40-w1/2)+"px",
          "border":`1px solid rgba(106,215,233,${opa1})`
        });
      },10);
    }
  },1200)
  var n3s=$(".n3");
  setTimeout(function(){
    var w1=10;
    var opa1=1;
    for(let n3 of n3s){
      setInterval(()=>{
        w1+=0.02;
        if(w1>75){opa1-=0.0003}
        if(opa1<0){
          w1=10;
          opa1=1;
        }
        $(n3).css({
          "width":w1,
          "height":w1,
          "left":(40-w1/2)+"px",
          "top":(40-w1/2)+"px",
          "border":`1px solid rgba(106,215,233,${opa1})`
        });
      },10);
    }
  },2000)
 