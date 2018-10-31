new Vue({
    el:'#content',
    data:{
        type:'',
        has:'',
        notHave:'',
        suffix:'',
        price:'',
        length:'',
        registar:'',
        sell:''
    },
    created(){
        
    },
    methods:{
        submit(){
     
            console.log("我是submit")
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
                    this.type=/^[a-zA-Z]{5}$/;
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
        }
    }
});
//找到#query下所有的td
var tds=$("#query table tr td");
for(var td of tds){
    if($(td).html() != ''){
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