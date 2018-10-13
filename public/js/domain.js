$(function(){
  (async function(){
    var res=await $ajax({
      url:`https://cnz.co/domain-registration/domain.php?action=caajax&domain_name=${domain}`,
      type:'get'
    })
    console.log(res);
  })
})