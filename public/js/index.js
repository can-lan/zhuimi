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