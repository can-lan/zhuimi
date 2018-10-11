function ajax({url,data,type,dataType}){
    return new Promise(function(open,err){
        //1.创建xhr对象
        var xhr=new XMLHttpRequest();
        //2.绑定监听事件
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                if(dataType!=undefined&&dataType.toLowerCase()=="json")
                    var res=JSON.parse(xhr.responseText);
                else
                    var res=xhr.responseText;
                open(res);
            }
        }
            //url?date
        if(type.toLowerCase()=="get"&&data!=undefined){
            url+="?"+data;
        }
        //3.打开链接
        xhr.open(type,url,true);
            //增加设置消息请求头
        if(type.toLowerCase()=="post"){
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        //4.发送请求
        if(type.toLowerCase()=="post"&&data!=undefined)
            xhr.send(data);
        else
            xhr.send(null);
    }).catch(e=>{
        console.log(e)
    })
}