$(function(){
  /*(async function(){
    var res=await $ajax({
      url:``,
      type:'get'
    })
    console.log(res);
  })*/

  new Vue({
    el:"#data",
    data:function(){
      return {
        ban:0
      }
    },
    methods:{

    },
    created(){
      setInterval(()=>{
        var wrapper=$(".ban ul.wrapper")[0];
        this.ban++;
        $(wrapper).css("marginLeft",this.ban * -283);
        if(this.ban==3){
          $(wrapper).css("marginLeft","-283");
          this.ban=1;
        };
      },2000)
    }
  });
  //录播图.ban
  
})