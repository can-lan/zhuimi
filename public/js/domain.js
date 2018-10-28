$(function(){
  //1.监视整页#content
  var domainVm=new Vue({
    el:"#content",
    data:{
      keyword:'', //双向绑定keyword输入框
      suffix:'.com',
      suffixs:["com","cn","com.cn","net","org","cc","tv","app","top","vip","love","club","xyz","中国","公司"],  //所有后缀
      resulte:[],  //后缀和对应结果
      ban:0 //轮播图判断值
    },
    methods:{
      //1.1 input btn点击刷新页面,并传递input内keyword和suffix(页面加载调getSearch)
      toUrl(){
        location.href="/domain.html?d="+this.keyword+this.suffix
      },
      getSearch(){  //1.2 页面加载调用 
        if(this.keyword != ''){ //输入值不为空     
          for(let item of this.suffixs){  //ajax遍历suffixs,请求每一个后缀是否注册
            $.ajax({
              async:false,
              url:'/api?d='+this.keyword+'.'+item,
              method:'get',
              success:(res)=>{
                var avail=res.Avail;
                console.log(res)
                if(avail==1){
                  avail=true
                }else{
                  avail=false
                }
                var obj={};
                obj.keyword=this.keyword;
                obj.suffixs=item;
                obj.avail=avail;
                this.resulte.push(obj);
              }
            });
            console.log(this.resulte); 
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
    }
  });
  //↑ VM监视结束

  //3.找到input,为其绑定回车触发事件
  $("#keyword").keyup(function(event){
    if (event.keyCode == 13) { 
      var trueVal=$(this).val().
      $(this).val()
      domainVm.toUrl() 
    }
  })
  
})