"use strict";

//放大镜
var minBox = document.querySelector('.minBox');
var mask = document.querySelector('.mask');
var maxBox = document.querySelector('.maxBox');
var maxImg = document.querySelector('.maxBox img'); // 鼠标移动，mask跟随移动

minBox.onmousemove = function (ev) {
  var e = ev || event; // 计算msk的定位坐标

  var maskLeft = e.pageX - $('.minBox').offset().left - mask.clientWidth / 2;
  var maskTop = e.pageY - $('.minBox').offset().top - mask.clientHeight / 2; // 限制mask移动范围

  if (maskLeft < 0) {
    maskLeft = 0;
  }

  if (maskLeft >= minBox.clientWidth - mask.clientWidth) {
    maskLeft = minBox.clientWidth - mask.clientWidth;
  }

  if (maskTop < 0) {
    maskTop = 0;
  }

  if (maskTop >= minBox.clientHeight - mask.clientHeight) {
    maskTop = minBox.clientHeight - mask.clientHeight;
  }

  mask.style.left = maskLeft + 'px';
  mask.style.top = maskTop + 'px';
  var scaleX = maskLeft / (minBox.clientWidth - mask.clientWidth);
  var scaleY = maskTop / (minBox.clientHeight - mask.clientHeight); // 大图也跟随移动

  maxImg.style.left = -scaleX * (maxImg.clientWidth - maxBox.clientWidth) + 'px';
  maxImg.style.top = -scaleY * (maxImg.clientHeight - maxBox.clientHeight) + 'px';
};

minBox.onmouseenter = function () {
  mask.style.display = 'block';
  maxBox.style.display = 'block';
};

minBox.onmouseleave = function () {
  mask.style.display = 'none';
  maxBox.style.display = 'none';
}; // 放大镜底部图片


var path = $('.goodsimg img')[2].src;
$.each($('.goodsimg img'), function (item) {
  $('.goodsimg img')[item].onmousemove = function () {
    path = this.src;
    $('.minBox img').attr('src', path);
    $('.maxBox img').attr('src', path);
  };
}); //优惠倒计时

var intDiff = parseInt(6260); //倒计时总秒数量

function timer(intDiff) {
  window.setInterval(function () {
    var day = 0,
        hour = 0,
        minute = 0,
        second = 0; //时间默认值

    if (intDiff > 0) {
      day = Math.floor(intDiff / (60 * 60 * 24));
      hour = Math.floor(intDiff / (60 * 60)) - day * 24;
      minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
      second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
    }

    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $('.yh-time').html('距优惠结束 ' + hour + ":" + minute + ":" + second);
    intDiff--;
  }, 1000);
}

$(function () {
  timer(intDiff);
}); //获取购物车数字

$('#goods1-num .jian').click(function () {
  var num = parseInt($('#goods1-num .num').html());
  console.log(num);

  if (num > 0) {
    num--;
    $('#goods1-num .num').html(num);
  }
});
$('#goods1-num .jia').click(function () {
  var num = parseInt($('#goods1-num .num').html());
  console.log(num);
  num++;
  $('#goods1-num .num').html(num);
}); //点击加入购物车

var gouwu_num = 0;
$('.jiarugwc').click(function () {
  gouwu_num = parseInt($('#goods1-num .num').html());
  var num1 = parseInt($('.gwc-num').html());
  $('.gwc-num').html(gouwu_num + num1);
  $('#goods1-num .num').html('0');
}); //点击下面轮播里的小购物车

$('.cnxh .icon-gouwuche').click(function () {
  console.log(1);
  var num1 = parseInt($('.gwc-num').html());
  $('.gwc-num').html(1 + num1);
}); //猜你喜欢的轮播

var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination'
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});