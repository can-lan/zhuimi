//1--轮播图1
  var timer=setInterval(function(){ 
    vm.count++ 
    if(vm.count==5) vm.count=0
  },6000);
  var vm=new Vue({
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
        vm.count=i
        clearInterval(timer);
        timer=setInterval(function(){ 
          vm.count++ 
          if(vm.count==5) vm.count=0
        },6000);
       }
    }
  });
//2--console控制1:点击当前元素,①替换所有及当前元素图片src,②将所有box关闭,展开自己对应box,③为当前元素添加三角形下标志,取消其他下标志
  
//2--console控制2:
  new Vue({
    el:"#box",
    data:{
      datas:[]
    },
    methods:{
      getDomain(control){
        $.ajax({  //进行查询
          url:`http://localhost:7000/domain/sale?control=${control}`,
          type:"get",
          success:(res)=>{
            this.datas=res;
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

//3--轮播图2
  function banBefore(){
    document.getElementsByClassName("before")[0].parentElement.children[0].style.marginLeft="0%";
  }
  function banNext(){
    document.getElementsByClassName("next")[0].parentElement.children[0].style.marginLeft="-100%";
  }
//4--搜索框
  new Vue({
      el:"#search",
      data:{
        keyword:"",
        suffix:".com"
      },
      methods:{
        getSearch(){
          location.href="/api?d="+this.keyword+this.suffix 
        }
      }
  });

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