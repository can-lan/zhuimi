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

//2--box控制
  new Vue({
    el:"#box",
    data:{
      datas:[],
      endTime:[]
    },
    methods:{
      //方法一:关闭所有盒子代开自己盒子,修改自己图片途径
      active(){
        var controls=document.querySelectorAll("[data-toggle='tab']");
        for(var control of controls){
          control.onclick=function(){
            for(var con of controls){
                con.className="";
            }
            this.className="visible";
            var id=this.getAttribute("data-target");
            var box=document.querySelector(id);
            console.log(box)
            var boxs=box.parentNode.parentNode.children;
            if(box.className=="") {
              box.className = "hidden";
              this.className="";
            }else{
              for(var b of boxs){
                  if(b.tagName=="DIV"){
                      var c=b.children;
                      for(var d of c){
                          d.className="hidden";
                      }
                  }
              }
              box.className="";
            }
          }
        }
      },
      getDomain(control){
        //进行查询
        $.ajax({
          url:`http://localhost:7000/domain/sale?control=${control}`,
          type:"get",
          success:(res)=>{
            this.datas=res;
            console.log(this.datas)
          }
        });
      },
      getSaleTime(){
        for(var item of this.datas){
          this.endTime.push(item.endTime);
        }
        setInterval(()=>{
          for(var i in this.endTime){
              var end=new Date(this.endTime[i]);
              var now = new Date();
              var seconds =(end.getTime()-now.getTime())/1000;
              seconds=Math.floor(seconds);
              console.log(seconds)
              var days = seconds/(24*60*60);
              days = Math.floor(days);
              var hours = seconds%(24*60*60)/(60*60);
              hours = Math.floor(hours);
              var minutes = seconds%(60*60)/60;
              minutes = Math.floor(minutes);
              var seconds = seconds%60;
              seconds = Math.floor(seconds);
              this.datas[i].endTime=('剩余时间'+days+'天'+hours+'小时'+minutes+'分钟'+seconds+'秒');
          }
        },1000)
        
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
/*
 *废弃--->第一版jquery--->请求替换导航栏
 *第二版Vue请求导航栏---在header.js
(async function(){
    var res=await ajax({
        url:"http://localhost:7000/index/",
        type:"get",
        dataType:"json"
    });
    var {firstlist,secondlist}=res;
    var html1="";
    for(var fls of firstlist){
        var {fname,fid}=fls;
        var fid1=fid;
        var html2="";

        for(var sls of secondlist){
            var {sname,fid}=sls;
            var fid2=fid;
            if(fid1==fid2){
                html2+=`<li><a href="#">${sname}</a></li>`
            }
        }

        html1 +=`<div class="col-1 position-relative">
                    <a href="#">${fname}</a>
                    <ul class="list-unstyled position-absolute bg-white pt-2 pb-2">
                    ${html2}
                    <div class="arrow"></div>
                    </ul>
                </div>`;
    }
    html1 =`<div class="col-1"><a href="#" class="text-color">首页</a></div>${html1}<div class="col-4"></div>
        <div class="col-1 register"><a href="#" class="text-white">免费注册</a></div>`;
    //将html插入导航栏.nav2
    document.querySelector(".nav2").innerHTML=html1;
})()
*/
