saleVm = new Vue({
    el:'#content',
    data:{
        type:/[\s\S]*/,
        has:/[\s\S]*/,
        notHave:/^$/,
        suffix:/[\s\S]*/,
        price:/[\s\S]*/,    //废弃 改用↓ pLeast pMost
        length:/[\s\S]*/,   //废弃 改用↓ lenLeast lenMost
        registar:/[\s\S]*/,
        sell:/[\s\S]*/,
        pLeast:0,
        pMost:99999,
        lenLeast:1,
        lenMost:63,
        startPrice:/[\s\S]*/,    //起始价, 一元起拍时等于1  /^[1]$]\
        endTime:'2020-01-01T00:00',
        data:[],    //所有域名
        result:[],  //每次查询结果
        number:20,  //总个数---符合查询条件的
        pageSize:20,//每页个数
        pageCount:1,  //页数
        pageNum:1     //当前页码
    },
    async created(){
        //1.查参数,跳转该分类
        await $.ajax({
            url:'http://127.0.0.1:7000/domain/sale',
            method:'get',
            success:(res)=>{
                this.data=res;
                this.result=res;
            }
        });
        //0
        if(location.search){
            switch(location.search){
                case '?type=ykj':
                    this.page('ykj');
                    break;
                case '?type=jj':
                    this.page('jj');
                    break;
                case '?type=xj':
                    this.page('xj');
                    break;
                case '?type=pm':
                    this.page('jj');
                    break;
                default:
                    break;
            }
        }
        //分页计算           
        this.number=this.result.length; //总数据个数
        this.pageCount=Math.ceil(this.number/this.pageSize); //总页数
        //this.pageSize=20; 默认 每页个数
        //this.pageNum=1; 默认 当前页   
    },
    filters:{   //过滤器--过滤交易类型 ykj==>一口价
        saleType(value){  
            if(value=='ykj'){
                return '一口价';
            }else if(value=='jj'){
                return '竞价';
            }else if(value=='xj'){
                return '询价';
            }else{
                return null;
            }
        }
    },
    methods:{
        page(type){ //根据传入参数判断当前分类
            $('#'+type+'page').parent().parent().find('.active').removeClass('active');
            $('#'+type+'page').parent().addClass('active');
            $('#sell td.active').removeClass('active');
            $('#'+type).addClass('active');
            this.submit();
        },
        href(sellType,e){  //顶部标签跳转--更改交易类型   
            $(e.target).parent().parent().find('.active').removeClass('active');
            $(e.target).parent().addClass('active');
            $('#sell td.active').removeClass('active');
            $('#'+sellType).addClass('active');
            this.submit();
        },
        submit(){   //判断按钮.active并计算全部参数-->根据参数查询
            //1.判断type按钮
            var type=$("#type").find('td.active').text();//找到td.active,并找到该文本内容
            switch(type){
                case '不限':
                    this.type=/[\s\S]*/; //\s是空白符 \S是非空白符 所有都能匹配
                    break;
                case '纯数字':
                    this.type=/^[0-9]*$/;
                    break;
                case '3数':
                    this.type=/^[0-9]{3}$/;
                    break;
                case '4数':
                    this.type=/^[0-9]{4}$/;
                    break;
                case '5数':
                    this.type=/^[0-9]{5}$/;
                    break;
                case '纯字母':
                    this.type=/^[a-zA-Z]*$/;
                    break;
                case '3字母':
                    this.type=/^[a-zA-Z]{3}$/;
                    break;
                case '4字母':
                    this.type=/^[a-zA-Z]{4}$/;
                    break;
                case '3声':
                    this.type=/^[bcdfghjklmnpqrstwxyzBCDFGHJKLMNPQRST]{3}$/;
                    break;
                case '4声':
                    this.type=/^[bcdfghjklmnpqrstwxyzBCDFGHJKLMNPQRST]{4}$/;
                    break;
                case '双拼':
                    this.type=/^(a[io]?|ou?|e[inr]?|ang?|ng|[bmp](a[io]?|[aei]ng?|ei|ie?|ia[no]|o|u)|pou|me|m[io]u|[fw](a|[ae]ng?|ei|o|u)|fou|wai|[dt](a[io]?|an|e|[aeio]ng|ie?|ia[no]|ou|u[ino]?|uan)|dei|diu|[nl](a[io]?|ei?|[eio]ng|i[eu]?|i?ang?|iao|in|ou|u[eo]?|ve?|uan)|nen|lia|lun|[ghk](a[io]?|[ae]ng?|e|ong|ou|u[aino]?|uai|uang?)|[gh]ei|[jqx](i(ao?|ang?|e|ng?|ong|u)?|u[en]?|uan)|([csz]h?|r)([ae]ng?|ao|e|i|ou|u[ino]?|uan)|[csz](ai?|ong)|[csz]h(ai?|uai|uang)|zei|[sz]hua|([cz]h|r)ong|y(ao?|[ai]ng?|e|i|ong|ou|u[en]?|uan)){2}$/;
                    break;
                case '三拼':
                    this.type=/^(a[io]?|ou?|e[inr]?|ang?|ng|[bmp](a[io]?|[aei]ng?|ei|ie?|ia[no]|o|u)|pou|me|m[io]u|[fw](a|[ae]ng?|ei|o|u)|fou|wai|[dt](a[io]?|an|e|[aeio]ng|ie?|ia[no]|ou|u[ino]?|uan)|dei|diu|[nl](a[io]?|ei?|[eio]ng|i[eu]?|i?ang?|iao|in|ou|u[eo]?|ve?|uan)|nen|lia|lun|[ghk](a[io]?|[ae]ng?|e|ong|ou|u[aino]?|uai|uang?)|[gh]ei|[jqx](i(ao?|ang?|e|ng?|ong|u)?|u[en]?|uan)|([csz]h?|r)([ae]ng?|ao|e|i|ou|u[ino]?|uan)|[csz](ai?|ong)|[csz]h(ai?|uai|uang)|zei|[sz]hua|([cz]h|r)ong|y(ao?|[ai]ng?|e|i|ong|ou|u[en]?|uan)){3}$/;
                    break;
                case '3杂':
                    this.type=/^[a-zA-Z][0-9][a-zA-Z0-9]$/; //bug三杂顺序固定了
                    break;
                case '4杂':
                    this.type=/^[a-zA-Z][0-9][a-zA-Z0-9][a-zA-Z0-9]$/; //bug四杂顺序固定了
                    break;
            }
            //2.判断has按钮,只有input有值才做修改
            var hasVal=$('#hasVal').val();
            var notHaveVal=$('#notHaveVal').val();
            var hasClass=$("#has").find('td.hasbtn.active').text(); //第二行tr所有的 has开始或结束 全部btn 的 文本
            var notClass=$("#has").find('td.notbtn.active').text(); //第二行tr所有 nohave开始或结束 全部btn 的 文本
            //2.1 如果包含框--有值, 并且 hasClass按钮点击
            if(hasVal && hasClass){ 
                switch(hasClass){
                    case '开头':
                        this.has=new RegExp("^" + hasVal , "gim");  //开头含有
                        break;
                    case '结尾':
                        this.has=new RegExp([hasVal]+"$" , "gim");    //末尾含有
                        break;
                    case '全部':
                        this.has=new RegExp(hasVal, "gim");    //只要含有就可以
                        break;
                    default:
                        this.has=/[\s\S]*/; //可以是任意字符
                        break;
                    }
            }
            //2.2 如果包含框--有值, 但 hasClass按钮没有点击
            if(hasVal && !hasClass){ 
                this.has=new RegExp(hasVal, "gim");    //包含
            }
            //2.3 如果排除框--有值, 并且 notClass按钮点击
            if(notHaveVal && notClass){
                switch(notClass){
                    case '开头':
                        this.notHave=new RegExp("^" + notHaveVal, "im");  //开头含有  v-if取反 !!!不能全局global
                        break;
                    case '结尾':
                        this.notHave=new RegExp(notHaveVal+'$',"im");   //结尾含有  v-if取反 !!!不能全局global
                        break;
                    case '全部':
                        this.notHave=new RegExp(notHaveVal,"im");   //只要含有就为true  v-if取反 !!!不能全局global
                        break;
                    default:
                        this.notHave=/^$/; //当只为''空时才为true  //v-if取反--相当于不做任何限制 
                        break;
                    }
            }
            //2.4 如果排除框--有值, 并且 notClass按钮没有点击
            if(notHaveVal && !notClass){ 
                this.notHave=new RegExp(notHaveVal, "im");    //包含 v-if取反--就是排除
            }
            //3.判断suffix按钮,可以多选
            if($('#suffix').find('td.active').text() != '不限'){    //不等于不限时操作, 等于不限时,是默认
                var suffixs=$('#suffix').find('td.active').text().split('.'); 
                suffixs.shift();//删除首个空元素
                suffixs=suffixs.join('|');//元素间以|拼接
                //1: [td.active,td.active,td.active]
                //2: .com.cn.com.cn.net.org //bug .com.cn
                //3: ['','com','cn','com','cn','net','org']
                //4: ['com','cn','com','cn','net','org']
                //5: com|cn|com|cn|net|org
                this.suffix=new RegExp("^("+suffixs+")$","gim");  //6: /^(cn|com|cn|net|tv|vip)$/
            }else{
                this.suffix=/[\s\S]*/;
            }
            //
            if(!hasVal){
                this.has=/[\s\S]*/; //如果包含输入框--没有值,则限制条件恢复为不限
                $('#hasVal').parent().next().removeClass('active');
                $('#hasVal').parent().next().next().removeClass('active');
                $('#hasVal').parent().next().next().next().removeClass('active');
            };
            if(!notHaveVal){
                this.notHave=/^$/;  //如果包含输入框--没有值,则限制条件恢复为不限
                $('#notHaveVal').parent().next().removeClass('active');
                $('#notHaveVal').parent().next().next().removeClass('active');
                $('#notHaveVal').parent().next().next().next().removeClass('active');
            }

            //4.判断价格
            var priceText=$('#price').find('td.active').text();
            switch(priceText){
                case '0-50':
                    //this.price=/^[0-4][0-9]?$/;
                    this.pLeast=0;
                    this.pMost=50;
                    break;
                case '50-100':
                    //this.price=/^[5-9][0-9]$/;
                    this.pLeast=50;
                    this.pMost=100;
                    break;
                case '100-500':
                    //this.price=/^[1-4][0-9][0-9]$/;
                    this.pLeast=100;
                    this.pMost=500;
                    break;
                case '500-1k':
                    //this.price=/^[5-9][0-9][0-9]$/;
                    this.pLeast=500;
                    this.pMost=1000;
                    break;
                case '1k-3k':
                    //this.price=/^[1-2][0-9][0-9][0-9]$/;
                    this.pLeast=1000;
                    this.pMost=3000;
                    break;
                case '3k-5k':
                    //this.price=/^[3-4][0-9][0-9][0-9]$/;
                    this.pLeast=3000;
                    this.pMost=5000;
                    break;
                case '5k-1w':
                    //this.price=/^[5-9][0-9][0-9][0-9]$/;
                    this.pLeast=5000;
                    this.pMost=10000;
                    break;
                case '1w以上':
                    //this.price=/^[1-9][0-9][0-9][0-9][0-9]+$/;
                    this.pLeast=10000;
                    this.pMost=99999;
                    break;
                default:
                    //this.price=/^/;
                    this.pLeast=0;
                    this.pMost=99999;
                    break;
            }
            //5.判断长度
            var dLengthText=$('#length').find('td.active').text();
            switch(dLengthText){
                case '1个':
                    //this.price=/^[0-4][0-9]?$/;
                    this.lenLeast=1;
                    this.lenMost=1;
                    break;
                case '2个':
                    //this.price=/^[5-9][0-9]$/;
                    this.lenLeast=2;
                    this.lenMost=2;
                    break;
                case '3个':
                    //this.price=/^[1-4][0-9][0-9]$/;
                    this.lenLeast=3;
                    this.lenMost=3;
                    break;
                case '4个':
                    //this.price=/^[5-9][0-9][0-9]$/;
                    this.lenLeast=4;
                    this.lenMost=4;
                    break;
                case '5个':
                    //this.price=/^[1-2][0-9][0-9][0-9]$/;
                    this.lenLeast=5;
                    this.lenMost=5;
                    break;
                case '6个':
                    //this.price=/^[3-4][0-9][0-9][0-9]$/;
                    this.lenLeast=6;
                    this.lenMost=6;
                    break;
                case '7个':
                    //this.price=/^[5-9][0-9][0-9][0-9]$/;
                    this.lenLeast=7;
                    this.lenMost=7;
                    break;
                case '7个以上':
                    //this.price=/^[1-9][0-9][0-9][0-9][0-9]+$/;
                    this.lenLeast=8;
                    this.lenMost=63;
                    break;
                case '不限': //如果不限,替换掉value值
                    this.lenLeast=1;
                    this.lenMost=63;
                    break;
                default:    //如果value有值,则取value值;其他情况也取默认值
                    //this.price=/^/;
                    //this.lenLeast=0;  
                    //this.lenMost=99999;
                    break;
            }
            if(!this.lenLeast) this.lenLeast=1;
            if(!this.lenMost) this.lenMost=63;
            //6.判断注册商--无注册商,不过滤
            //7.限制交易方式
            var sellText=$('#sell').find('td.active').text();
            switch(sellText){
                case '一口价':
                    this.sell=/^ykj$/;
                    this.startPrice=/[\s\S]*/;
                    break;
                case '竞价':
                    this.sell=/^jj$/;
                    this.startPrice=/[\s\S]*/;
                    break;
                case '询价':
                    this.sell=/^xj$/;
                    this.startPrice=/[\s\S]*/;
                    break;
                case '拍卖':
                    this.sell=/^jj$/;
                    this.startPrice=/[\s\S]*/;
                    break;
                case '一元起拍':
                    this.sell=/^jj$/;
                    this.startPrice=/^[1]$/;    //一元起拍过滤
                    break;
                case '域名预定':
                    location.href='/book.html';
                    break;
                case '域名竞价':
                    location.href='/bid.html';
                    break;
                default:
                    this.sell=/[\s\S]*/;
                    this.startPrice=/[\s\S]*/;
                    break;
            } 
            //8.限制结束时间
                //v-model 限制
            //9.限制过期时间
                //发送whois请求,找到过期时间,比较,略...
            
            /*******************计算完成执行****************************/
            console.log("以下是查询的条件")
            console.log("品相type: "+this.type);
            console.log("包含has: "+this.has);
            console.log("排除notHave: "+this.notHave);
            console.log("后缀suffix: "+this.suffix);
            console.log("最低价格pLeast: "+this.pLeast);
            console.log("最高价格pMost: "+this.pMost);
            console.log("最小长度lenLeast: "+this.lenLeast);
            console.log("最大长度lenMost: "+this.lenMost);
            console.log("交易类型sell: "+this.sell);
            console.log("起始价格startPrice: "+this.startPrice);
            console.log("结束时间endTime: "+this.endTime);
            /*****************判断data:[]内符合条件的域名对象, 插入新数组, 页面遍历新数组, 解决未渲染完成不能操作DOM, 直接渲染有用的数据*******/
            //重新获得查询后的数组
            this.result=[];
            for(var item of this.data){
                //↓ 条件判断
                if(
                    this.type.test( item.domainname.slice(0,item.domainname.indexOf('.')) ) && 
                    this.has.test( item.domainname.slice(0,item.domainname.indexOf('.')) ) && 
                    !this.notHave.test( item.domainname.slice(0,item.domainname.indexOf('.')) ) && 
                    this.suffix.test( item.domainname.slice(item.domainname.indexOf('.')+1) ) && 
                    item.domainname.slice(0,item.domainname.indexOf('.')).length >=  this.lenLeast &&
                    item.domainname.slice(0,item.domainname.indexOf('.')).length <=  this.lenMost &&
                    item.nowPrice >=  this.pLeast &&  item.nowPrice <=  this.pMost &&
                    this.sell.test(item.saleType) &&  this.startPrice.test(item.startPrice) &&
                    item.endTime <  this.endTime   
                ){
                   this.result.push(item); 
                }//↑ 插入新数组
            }
            /*************************************************************************************/         
            //根据新数组--分页准备
            this.number=this.result.length;                 //重新赋值总个数
            this.pageCount=Math.ceil(this.number/this.pageSize); //重新赋值总页数
            this.pageSize=20;                               //重新赋值页大小为20
            this.pageNum=1;  
            console.log('以下是本次分页信息');                               //重新赋值当前页为1         
            console.log('总数number: '+this.number);
            console.log('每页个数pageSize: '+this.pageSize);
            console.log('总页数pageCount: '+this.pageCount);
            console.log('当前页码pageNum: '+this.pageNum)
        },
        option(e){  //选择每页显示多少条
            this.pageSize=$(e.target).val();
            this.pageCount=Math.floor(this.number/this.pageSize);
            this.pageNum=1;
        },
        toPage(page){ //点击按钮到该页
            this.pageNum=page;
        },
        frontendPage(page){ //到第一页 最后一页
            this.pageNum=page;
        },
        jump(e){ //跳转到某页
            var jump=parseInt($(e.target).prev().val());  //获取输入框值
            if(jump <= this.pageCount && jump > 1){
                this.pageNum=jump;
            }
            $(e.target).prev().val(''); //清空输入框值
        },
        prev(){ //上一页
            if(this.pageNum>1){
                this.pageNum--;
            }
        },
        next(){ //下一页
            if(this.pageNum<this.pageCount){
                this.pageNum++;
            }
        },
        addCart(domainname,nowPrice,e){ 
            headerVm.now='saleVm';
            if($(e.target).html()=="加入购物车"){   //4.1 点击加入购物车, 按钮变为移出清单, 不同功能
            $(e.target).html("移出清单");
            $(e.target).css({"background":"#fff","color":"#00c1de","border":"1px solid #00c1de"});
            localStorage.setItem(domainname,nowPrice);
            headerVm.cart.unshift({domainname,nowPrice});
            }else{
            $(e.target).html("加入购物车");       //4.2 点击移出清单, 按钮变为移出清单, 不同功能
            $(e.target).css({"background":"#00c1de","color":"#fff","border":"none"});
            localStorage.removeItem(domainname);
            headerVm.cart.splice(headerVm.cart.indexOf(domainname),1);
            }
        },
        buy(domainname,nowPrice){   //每一个立即购买键---只买当前域名
            location.href="/order.html?d="+domainname+"&p="+nowPrice;
        },
        async order(id,e){
            if($(e.target).hasClass('order')){
                $(e.target).removeClass('order');//翻转图片为向上
                await $.ajax({
                    url:'http://127.0.0.1:7000/domain/sale?control='+id, //默认正序查询
                    method:'get',
                    success:(res)=>{
                        this.data=res;
                    }
                })
            }else{
                $(e.target).addClass('order');//翻转图片为向下
                await $.ajax({
                    url:'http://127.0.0.1:7000/domain/sale?control='+id,
                    method:'get',
                    success:(res)=>{
                        this.data=res.reverse();    //翻转数组-->变成倒序
                    }
                })
            }
            this.submit();  //调用查询条件-->然后将同样?筛选后的结果放入result数组-->前端遍历
        }
    }
});

/**************为部分元素绑定事件***************************/
//1: 找到#query下所有的td
var tds=$("#query table tr td");
for(var td of tds){
    if($(td).html() != '' && !$(td).parent().hasClass('suffix') && !$(td).hasClass('trname') && !$(td).hasClass('nochange') && !$(td).hasClass('changeb') ){
        $(td).on('mouseenter',function(){
            $(this).css({'backgroundColor':'#e6f9fc','cursor':'pointer'});
        });
        $(td).on('mouseleave',function(){
            $(this).css({'backgroundColor':'#fff','cursor':'pointer'});
        });
        $(td).click(function(){
            //如果有.active,点击移除(取消功能);
            if($(this).hasClass('active')){
                $(this).removeClass('active') 
                if($(this).parent().find('td.active').length==0){  //如果取消当前后,行内没有.active的后缀,则给'不限'加上.active
                    $(this).parent().find('td.bx').addClass('active');
                }          
            }else{
            //如果没有,点击移除父元素的所有子元素的active,给自己添加active
            var btds=$(this).parent().children();
            for(let btd of btds){
                $(btd).removeClass('active');
            }
                $(this).addClass('active'); 
            }
        });
    }else{
        $(td).css('box-shadow','none');
    }
}
//2: 为tr2 has 开始 结尾 全部 绑定事件: 只移出兄弟的active
var htds =$('#has').find('.changeb');
for(var htd of htds){
    //↓ 加悬浮背景功能
    $(htd).on('mouseenter',function(){
        $(this).css({'backgroundColor':'#e6f9fc','cursor':'pointer'});
    });
    $(htd).on('mouseleave',function(){
        $(this).css({'backgroundColor':'#fff','cursor':'pointer'});
    });
    //↓ 加点击变色功能
    $(htd).click(function(){
        //把兄、弟的.active移出, 自己的有则去 无则加
        $(this).prev().removeClass('active');
        $(this).next().removeClass('active');
        $(this).prev().prev().removeClass('active');
        $(this).next().next().removeClass('active');       
        if($(this).hasClass('active')){ //如果有.active,点击移除自己的(取消功能);
            $(this).removeClass('active');
            if($(this).hasClass('hasbtn')){ //当取消当前按钮时, 把限制条件改为不限
                saleVm.has=/[\s\S]*/;       //立即生效
                $(this).parent().find('#hasVal').val(''); //清空输入框值
            }else{                          //立即生效
                saleVm.notHave=/^$/;        //当取消当前按钮时, 把限制条件改为不限
                $(this).parent().find('#notHaveVal').val(''); //清空输入框值
            }
        }else{
            $(this).addClass('active'); //如果没有,给自己添加active
        }
    });
}
//3: 为tr3 suffix绑定事件,加入可多选功能
var stds=$('#suffix').children();
for(let std of stds){
    var stdText=$(std).text();
    $(std).css('box-shadow','0 0 3px #999');
    //1: 为.后缀绑定事件
    if(stdText != '后缀' && stdText != '不限' && stdText != '清空'){
        //↓ 加悬浮背景功能
        $(std).on('mouseenter',function(){
            $(this).css({'backgroundColor':'#e6f9fc','cursor':'pointer'});
        });
        $(std).on('mouseleave',function(){
            $(this).css({'backgroundColor':'#fff','cursor':'pointer'});
        });
        //↓ 加点击变色功能
        $(std).click(function(){
            //首先把'不限'class属性移出
            var bxtd=$('#suffix').find('td.bx');
            bxtd.removeClass('active');//先移除下面会加上
            //如果有.active,点击移除(取消功能);
            if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    if($('#suffix').find('td.active').length==0){  //如果取消当前后,行内没有.active的后缀,则给'不限'加上.active
                        bxtd.addClass('active');
                    }           
            }else{
            //如果没有,点击移除父元素的所有子元素的active,给自己添加active
                $(this).addClass('active'); 
            }
        });
    } 
    //4: 为'不限'绑定事件
    if(stdText == '不限'){
        //↓ 加悬浮背景功能
        $(std).on('mouseenter',function(){
            $(this).css({'backgroundColor':'#e6f9fc','cursor':'pointer'});
        });
        $(std).on('mouseleave',function(){
            $(this).css({'backgroundColor':'#fff','cursor':'pointer'});
        });
        $(std).click(function(){
          //点击移除父元素的所有子元素的active,给自己添加active
            var suftds=$(this).parent().children();
            for(let suftd of suftds){
                $(suftd).removeClass('active');
            }
                $(this).addClass('active'); 
            }
        );
    }
    //5: 为'清空'绑定事件
    if(stdText == '清空'){
        //↓ 加悬浮背景功能
        $(std).on('mouseenter',function(){
            $(this).css({'backgroundColor':'#e6f9fc','cursor':'pointer'});
        });
        $(std).on('mouseleave',function(){
            $(this).css({'backgroundColor':'#fff','cursor':'pointer'});
        });
        $(std).click(function(){
          //点击移除父元素的所有子元素的active,给'不限'添加active,并修改.suffix为不限
            var suftds=$(this).parent().children();
            for(let suftd of suftds){
                $(suftd).removeClass('active');
            }
            $($('#suffix td.bx')[0]).addClass('active');
            saleVm.suffix=/[\s\S]*/;
            }
        );
    }  
}
    //6: 页面加载修改加入购物车按钮为移出
    setTimeout(function(){

        var arr=[];
    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i).indexOf('.') != -1){
            arr.push(localStorage.key(i));
            var a=$("a[data-d='"+localStorage.key(i)+"']");
            $(a).html("移出清单");
            $(a).css({"background":"#fff","color":"#00c1de","border":"1px solid #00c1de"});
        }
    }
    },1000)


