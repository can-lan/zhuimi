
var loginVm=new Vue({
  el:'#content',
  data:{
      uname:'',
      upwd:'',
      cpwd:'',
      phone:'',
      unameFocus:0,
      upwdFocus:0,
      cpwdFocus:0,
      phoneFocus:0,
      lnameFocus:0,
      lpwdFocus:0,
      haveUname:false,//是否存在此用户名
      allow:false,    //是否所有条件合法
      isCheck:false,  //是否勾选协议
      page:1,   //1登录页 2注册页
      lname:'',       //登录用户名
      lpwd:'',        //登录密码
      lpwdCheck:true,  //登录密码是否正确
      test:false
  },
  created(){
      var page=window.location.search.slice(location.search.indexOf('=')+1);
      if(page==1){
          this.page=1;
      }else{
          this.page=2;
      }
  },
  methods:{
      checkUname(){
          this.unameFocus=1;
      },
      checkUpwd(){
          this.upwdFocus=1;
      },
      checkCpwd(){
          this.cpwdFocus=1;
      },
      checkPhone(){
          this.phoneFocus=1;
      },
      register(){
          this.allow=this.uname.length>=5 && this.uname.length<=25 && !this.haveUname && this.upwd.length>=6 && this.upwd.length<=20 && this.upwd==this.cpwd && this.cpwd!='' && this.phone.length==11 && this.test;
          if( this.allow && this.isCheck){
              console.log("全部通过");
              axios.post(  //提交用户注册信息
                  'http://127.0.0.1:7000/users/register',
                  Qs.stringify({
                      uname:this.uname,
                      upwd:this.upwd,
                      phone:this.phone
                  })
              ).then(res=>{
                  if(res.data.code==1){
                      this.page=1;
                      alert('注册成功, 请登录 !');
                  }else{
                      alert('注册失败, 请核对注册信息 !')
                  }
              }).catch(err=>{
                  console.log(err)
              });
          }
      },
      checkLname(){
          this.lnameFocus=1;
      },
      checkLpwd(){
          this.lpwdFocus=1;
      },
      login(){  //验证登录密码是否正确
          axios.get('http://127.0.0.1:7000/users/check',{
              params:{
                  lname:this.lname,
                  lpwd:this.lpwd
              }
          }).then(res=>{
              if(res.data.code==1){
                  this.checkLpwd=true;
                  location.href="/";
                  sessionStorage.setItem('uname',this.lname);
                  sessionStorage.setItem('upwd',this.lpwd);
              }else{
                  this.checkLpwd=false;
              }
          }).catch(err=>{
              console.log(err);
          });
      },
      changePage(){ //点击右上角icon,跳转页面
          if(this.page==1){
              //this.page=2;
              location.href='/login.html?page=2';
          }else{
              //this.page=1;
              location.href='/login.html?page=1';
          }
      }
  },
  watch:{
      uname(){  //验证用户名是否存在
          axios.get('http://127.0.0.1:7000/users/has',{
              params:{
                  uname:this.uname
              }
          },).then(res=>{
              this.haveUname=res.data.length;
          }).catch();
      }
  }
});

//绑定拖动滑块验证码事件
var downX,successW,moveW;
var success=false;
var test=document.body.querySelector('.test');
var bg=document.querySelector('.bg');
var text=document.querySelector('.text');
var btn=document.querySelector('.btn');
//鼠标点击事件
btn.onmousedown=function(e){
    btn.style.transition='';//取消后面设置的渐变
    bg.style.transition='';
    downX=e.clientX;    //刚点击时 鼠标距离客户端左侧距离
    successW=test.offsetWidth-btn.offsetWidth; //成功距离= test宽度 - btn宽度
    //页面!!移动事件
    document.onmousemove=function(e){
        if(moveW>successW){ //限制滑块移动范围
            moveW=successW;
        }else if(moveW<0){
            moveW=0;
        }
        btn.style.left=moveW+'px';//滑块修改定位left--移动
        bg.style.width=moveW+'px';//设置滑过距离bg颜色
        moveW=e.clientX-downX;  //滑块移动的距离
        if(moveW>=successW){    //当移动距离达到成功距离
            success=true;    
            btn.onmousedown=null;//成功 取消点击事件
            btn.onmousemove=null;//成功 取消拖动事件
            loginVm.test=true;
            text.innerHTML = "验证通过"; //提示文字
            text.style.color='#fff';//提示文字颜色
            btn.innerHTML="<img src='/img/pub/right.png'>";  //对勾
            //btn.style.color='#green';//green对勾
            bg.style.background='lightgreen';//成功背景色
        }
    };
    //页面!!抬起事件
    document.onmouseup=function(e){
        document.onmousemove=null;//抬起 取消拖动事件
        if(success){
            return;
        }else{  //如果没有移动成功, btn渐变移回原位
            btn.style.left=0;
            btn.style.transition='left .8s ease'; 
            bg.style.width=0;
            bg.style.transition='width .8s ease';
            moveW=0;
        }
    };
}