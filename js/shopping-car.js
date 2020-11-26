//页面开始时获取数据

$(function (){
    if (localStorage.getItem('goods')) {
        var goodsArr= JSON.parse(localStorage.getItem('goods'))
    $.ajax({
      url:'../data/goods.json',
      type:'get',
      dataType:'json',
      success:function(json){
        var domStr = ''
        $.each(goodsArr,function (index,item){
            $.each(json,function (ind,obj){
                if ( item.code === obj.code ) {
                domStr += `
                <div class="goods-div">
                    <input type="checkbox" class="one" > 
                    <img src="${obj.imgurl}" class="goods-img">
                    <span class="goods-name" >${obj.title}</span>
                    <span class="goods-price">${obj.price}</span>
                    <div class="goods-am">
                        <div class="jian">-</div>
                        <div class="am">${item.num}</div>
                        <div class="jia">+</div>
                    </div>
                    <span class="goods-prices"></span>
                    <div class="goods-delete" code="${obj.code}">删除</div>
                </div> `
                return false
                }
            })
        })
        $('#goods-index').html(domStr)
        fn()
      }
    })
}else{         
    console.log("执行力");
    $('.null-box').css('display','block')
    $('.div2').css('display','none')
    $('.yixuan').css('display','none')
    fn()
}
  })

function fn(){


//页面加载时己算每个的小计,总计，头部购物车的显示,已选的个数
$.each($('.goods-prices'),function(item){
    var num = parseFloat($('.goods-am .am')[item].innerHTML)
    var p=parseFloat($('.goods-price')[item].innerHTML.substring(1))
    num=(num * p).toFixed(2);
    $('.goods-prices')[item].innerHTML=('￥'+num) 
})
// 己算选中个数的函数
function xuan(){
    var sum =0
    $.each($('.goods-div'),function(item){
         var num = parseFloat($('.goods-am .am')[item].innerHTML)
         
        if($('.one')[item].checked == true){
            sum=sum+num
        }
    })
    $('.xuan').html('已选 （'+sum+'）')
   
}

//己算总价钱的函数（只算点中的）
function zongji(){
    $('.zongji').html('￥0')
    for(var i=0;i<$('.goods-prices').length;i++){
        if($('.one')[i].checked){
            var num = parseFloat($('.goods-prices')[i].innerHTML.substring(1))
            var num1=parseFloat($('.zongji').html().substring(1)) 
            num1=(num+num1).toFixed(2)
            num1='￥'+num1
            $('.zongji').html(num1)
            $('.heji i').html(num1)
        }    
    }
}

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
var all2=document.querySelector('.all2')
var ones=document.querySelectorAll('.one')
//进入时默认全部选中
all.checked=true
all2.checked=true
for(var i=0;i<ones.length;i++){
    ones[i].checked=true
}
zongji()
xuan()
$('.car-box').click(function(even){
    var target = even.target;
    // 点击的是单行的删除时

    if(target.className === 'goods-delete'){
        var goodsArr= JSON.parse(localStorage.getItem('goods'))
        var code = $(target).attr('code') // 要删除商品的编号
        console.log(code);
        $.each(goodsArr,function (index,item){
            if (item.code === code) {
                goodsArr.splice(index,1)
                console.log(goodsArr);
                localStorage.setItem('goods',JSON.stringify(goodsArr))
                return false
            }
        })
       
        if($('.goods-div').length >1){
            target.parentNode.parentNode.removeChild(target.parentNode);
            
        }else{
            console.log("触发了");
            target.parentNode.parentNode.removeChild(target.parentNode);
            localStorage.removeItem('goods')
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
            all2.checked=true;
        }else{
            all.checked=false;
            all2.checked=false;
        }
        gwc_header()
        console.log(localStorage.getItem('goods').length = 0);
        console.log(111);
    }
    //复选框
    
    all.onchange=function (){
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
            all2.checked =all.checked
            zongji()
    }
    all2.onchange=function (){
        var ones=document.querySelectorAll('.one')
        var flag=all2.checked;  
            if(flag){
                for(var i=0;i<ones.length;i++){
                    ones[i].checked=true;
                }
            }else{
                for(var i=0;i<ones.length;i++){
                    ones[i].checked=false;
                }
            }
            all.checked=all2.checked
            zongji()
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
                all2.checked=true;
            }else{
                all.checked=false;
                all2.checked=false;
                }
        }
    }
           
    //每次结束时，己算总计,已选
    zongji()
    xuan()
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
}