//页面开始时获取数据
$(function (){
  $.ajax({
    url:'../data/goods.json',
    type:'get',
    dataType:'json',
    success:function(json){
      var goodsStr = `<h2>口碑好物</h2>
      <h3>品质爆款</h3>`
      $.each(json,function (index,item) {
        goodsStr +=`
            <a href="./goods.html" class="shangpin" code="${item.code}">
              <div class="imgbox">
                <img src="${item.imgurl2}" alt="" class="img2">
                <img src="${item.imgurl}" alt="">
              </div>
              <div class="miaoshu">
                <p class="ms">${item.title}</p>
                <p class="price">${item.price}</p>
              </div>
              <p class="kuanshi">${item.kuanshi}</p>
            </a>
        `
      })  
      $('.main-center>.down').html(goodsStr)
      
    }
  })

}) 
//用事件委托写localstrange
  $('#main').on('click','.shangpin',function () {
    var code =$(this).attr('code')
    var goodsArr=[];
        goodsArr.push({code:code})
    localStorage.setItem('code',JSON.stringify(goodsArr))
  })
  


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
  effect : 'fade',
})        

 //滚动固定
 window.onscroll=function(){
  var oDiv = document.getElementById("fix-flag"),
      oDiv1= document.querySelector('nav'),
      H = 0,H1=0,
      Y = oDiv,
      Y1=oDiv1;
      console.log(oDiv);        
      console.log(oDiv1);        
  while (Y) {
      H += Y.offsetTop; 
      Y = Y.offsetParent;
  }
  while (Y1) {
      H1 += Y1.offsetTop; 
      Y1 = Y1.offsetParent;
  }
  window.onscroll = function()
  {
      var s = document.body.scrollTop || document.documentElement.scrollTop
      if((s)>H) {
          // 两侧固定
          $('.hot').css('position','fixed')
          $('.hot').css('top','75px')

          $('.erweima').css('position','fixed')
          $('.erweima').css('top','75px')
      } else {
        $('.hot').css('position','absolute')
        $('.erweima').css('position','absolute')
        $('.erweima').css('top','390px')
        $('.hot').css('top','390px')
      }
      if(s>=H1){
         //顶部改变
          $('.yanxuan nav').css('height','0')
          $('#header2').css('height','50px')
          $('#header2 a').css('display','block')
      }else{
          //顶部
        $('.yanxuan nav').css('height','24')
      $('#header2').css('height','0px')
      $('#header2 a').css('display','none')
      }
  }
}