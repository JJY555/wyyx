//页面加载时己算每个的小计,总计，头部购物车的显示   
$.each($('.goods-prices'),function(item){
    var num = parseFloat($('.goods-am .am')[item].innerHTML)
    var p=parseFloat($('.goods-price')[item].innerHTML.substring(1))
    num=(num * p).toFixed(2);
    $('.goods-prices')[item].innerHTML=('￥'+num)
})

//己算总价钱的函数
function zongji(){
    $('.zongji').html('￥0')
    for(var i=0;i<$('.goods-prices').length;i++){
        var num = parseFloat($('.goods-prices')[i].innerHTML.substring(1))
        var num1=parseFloat($('.zongji').html().substring(1)) 
        num1=(num+num1).toFixed(2)
        num1='￥'+num1
        $('.zongji').html(num1)
        $('.heji i').html(num1)
    }
}
zongji()
//头部购物车显示
function gwc_header(){
    $('.gwc-num').html(0)
    for(var i=0;i<$('.goods-div').length;i++){
        var num = parseInt($('.am')[i].innerHTML)
        var num1=parseInt($('.gwc-num').html()) 
        num1=num+num1
        $('.gwc-num').html(num1)
    }
}
gwc_header()

//点击单行的删除 事件委托
var all=document.querySelector('.all')
var ones=document.querySelectorAll('.one')
$('.car-box').click(function(even){
    var target = even.target;
    // 点击的是单行的删除时
    if(target.className === 'goods-delete'){
        if($('.goods-div').length >1){
            target.parentNode.parentNode.removeChild(target.parentNode);
        }else{
            target.parentNode.parentNode.removeChild(target.parentNode);
            $('.null-box').css('display','block')
            $('.div2').css('display','none')
            $('.yixuan').css('display','none')
        }
        var index=0;
        var ones=document.querySelectorAll('.one')
        for(var j=0;j<ones.length;j++){
            if(ones[j].checked){
                index++;
            }else{
                index--;
            }
        }
                   if(index==ones.length){
                    all.checked=true;
                   }else{
                    all.checked=false;
                   }
    }
    //复选框
    all.onchange=function(){
        var ones=document.querySelectorAll('.one')
        var flag=all.checked;  
            if(flag){
                for(var i=0;i<ones.length;i++){
                    ones[i].checked=true;
                }
            }else{
                for(var i=0;i<ones.length;i++){
                    ones[i].checked=false;
                }
            }
        }
        //one
        var ones=document.querySelectorAll('.one')
        var index;
            for(var i=0;i<ones.length;i++){
               ones[i].onchange=function(){
                   index=0;
                   for(var j=0;j<ones.length;j++){
                       if(ones[j].checked){
                        index++;
                       }else{
                           index--;
                       }
                   }
                   if(index==ones.length){
                    all.checked=true;
                   }else{
                    all.checked=false;
                   }
               }
           }
})


//点击计算加减后该商品的总价钱

$.each($('.goods-am .jian'),function(item){
    $('.goods-am .jian')[item].onclick=function(){
        var num = parseFloat($('.goods-am .am')[item].innerHTML)
        if(num>0){
            num--
            $('.goods-am .am')[item].innerHTML=num
            var p=parseFloat($('.goods-price')[item].innerHTML.substring(1))
            num=(num * p).toFixed(2);
            $('.goods-prices')[item].innerHTML=('￥'+num)
        }
        zongji()
        gwc_header()
    }
})


$.each($('.goods-am .jia'),function(item){
    $('.goods-am .jia')[item].onclick=function(){
        var num = parseFloat($('.goods-am .am')[item].innerHTML)
            num++
            $('.goods-am .am')[item].innerHTML=num
            var p=parseFloat($('.goods-price')[item].innerHTML.substring(1))
            num=(num * p).toFixed(2);
            $('.goods-prices')[item].innerHTML=('￥'+num)
            zongji()
            gwc_header()
    }
})

//猜你喜欢的轮播
var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  
  })    
//点击下面轮播里的小购物车
$('.cnxh .icon-gouwuche').click(function(){
    console.log(1);
    var num1=parseInt($('.gwc-num').html()) 
    $('.gwc-num').html(1+num1)
  })