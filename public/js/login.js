new Vue({
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
      lpwdCheck:true  //登录密码是否正确
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
          this.allow=this.uname.length>=5 && this.uname.length<=25 && !this.haveUname && this.upwd.length>=6 && this.upwd.length<=20 && this.upwd==this.cpwd && this.cpwd!='' && this.phone.length==11;
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
              this.page=2;
          }else{
              this.page=1;
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