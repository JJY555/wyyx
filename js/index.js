var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })  
  //获取限时购里的时间
 var date=new Date();

 var h=date.getHours()
 console.log(h);
 $('.hours').text(h+'点场')

 var intDiff = parseInt(6260); //倒计时总秒数量
function timer(intDiff) {
  window.setInterval(function () {
    var day = 0,
      hour = 0,
      minute = 0,
      second = 0; //时间默认值
    if (intDiff > 0) {
      day = Math.floor(intDiff / (60 * 60 * 24));
      hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
      minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $('.t1').html(hour)
    $('.t2').html(minute)
    $('.t3').html(second)
   

    intDiff--;
  }, 1000);
}
$(function () {
  timer(intDiff);
});

//下面的轮播
var mySwiper1 = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    
  })
  
  $(".swiper-pagination-bullet").hover(function() {
    $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
})
//滚动固定


