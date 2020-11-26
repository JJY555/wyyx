"use strict";

//页面开始时获取数据
$(function () {
  $.ajax({
    url: '../data/goods.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var goodsArr = JSON.parse(localStorage.getItem('code'));
      var leftStr = '';
      var rightStr = '';
      $.each(json, function (index, obj) {
        if (goodsArr[0].code === obj.code) {
          leftStr += "\n              <div class=\"minBox\">\n                <img src=\"".concat(obj.tu1, "\" alt=\"\">\n                <div class=\"mask\"></div>\n              </div>\n              <div class=\"maxBox\">\n                <img src=\"").concat(obj.tu1, "\" alt=\"\">\n              </div>\n              <div class=\"goodsimg\">\n                <img src=\"").concat(obj.tu1, "\" alt=\"\"><img src=\"").concat(obj.tu2, "\" alt=\"\"><img src=\"").concat(obj.tu3, "\" alt=\"\"><img src=\"").concat(obj.tu4, "\" alt=\"\"><img src=\"").concat(obj.tu5, "\" alt=\"\">\n              </div>\n            \n            ");
          rightStr += "\n          <div class=\"right\">\n            <h3>\u65B0\u54C1</h3>\n            <h4>".concat(obj.title, "</h4>\n            <h4>100%</h4>\n            <h5>\u4E34\u5B89\u7279\u4EA7\uFF0C\u9165\u8106\u9187\u9999</h5>\n            <h5>\u597D\u8BC4\u7387></h5>\n            <div class=\"neibujia\">\n              <span>\u597D\u8D27\u5185\u90E8\u4EF7</span>\n              <span class=\"yh-time\">\u8DDD\u4F18\u60E0\u7ED3\u675F 01:44:09</span>\n              <div class=\"mai\">\n                <h6>\u6D3B\u52A8\u4EF7</h6><h4>").concat(obj.price, "</h4>\n                <img src=\"./img/ttmy.png\" alt=\"\">\n                <h6>\u4FC3\u9500</h6> <h5>\u4F4E\u8D283\u6298\u8D85\u503C\u6362\u8D2D</h5>\n                <h6>\u4FC3\u9500</h6> <h5>\u4F4E\u8D283\u6298\u8D85\u503C\u6362\u8D2D</h5>\n                <h6>\u4FC3\u9500</h6> <h5>\u4F4E\u8D283\u6298\u8D85\u503C\u6362\u8D2D</h5>\n                <h6>\u4FC3\u9500</h6> <h5>\u4F4E\u8D283\u6298\u8D85\u503C\u6362\u8D2D</h5>\n                <h6>\u4FC3\u9500</h6> <h5>\u4F4E\u8D283\u6298\u8D85\u503C\u6362\u8D2D</h5>\n                <h6>\u670D\u52A1</h6> <h5 class=\"last\">\xB7\u7F51\u6613\u81EA\u8425\u54C1\u724C\xB7\u4E0D\u652F\u6301\u65E0\u5FE7\u9000\u6362\xB7\u4E0D\u53EF\u7528\u5238\xB7\u56FD\u5185\u90E8\u5206\u5730\u533A\u4E0D\u53EF\u914D\u9001</h5>\n                \n              </div> \n              <div id=\"goods1-num\">\n                <h6> \u6570\u91CF</h6><span class=\"jian\">\u4E00</span><span class=\"num\">1</span><span class=\"jia\">+</span>\n                <h6>\u89C4\u683C</h6> <span>150\u514B</span>\n              </div>\n              <a href=\"./shopping-car.html\" class=\"goumai\" >\u7ACB\u5373\u8D2D\u4E70</a> <a href=\"#  \" class=\"jiarugwc\" code=\"").concat(obj.code, "\"><span class=\"iconfont icon-gouwuche\"></span> \u52A0\u5165\u8D2D\u7269\u8F66 </a>\n              </div>\n            </div>\n            ");
          $('#fdj-box>.left').html(leftStr);
          $('#fdj-box>.right').html(rightStr);
          return false;
        }
      });
      fn2();
    }
  });
});

function fn2() {
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
  }); //点击下面轮播里的小购物车
  // $('.cnxh .icon-gouwuche').click(function(){
  //   console.log(1);
  //   var num1=parseInt($('.gwc-num').html()) 
  //   $('.gwc-num').html(1+num1)
  // })
  //猜你喜欢的轮播

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
  }); // 点击加入购物车

  $('.jiarugwc').click(function (e) {
    var code = $(this).attr('code'); //判断是否有数据在里面,有的话取出来

    console.log("触发一次");
    e.stopPropagation(); //阻止冒泡

    if (localStorage.getItem('goods')) {
      var goodsArr = JSON.parse(localStorage.getItem('goods'));
      var flag = false; //判断当前商品是否在其中，在的话加一

      $.each(goodsArr, function (index, item) {
        if (item.code === code) {
          var num = parseInt($('#goods1-num .num').html());
          item.num += num;
          flag = true;
          console.log('zhixing1');
          return false;
        }
      }); //有数据 但该code还没有

      if (!flag) {
        console.log(code);
        var num = parseInt($('#goods1-num .num').html());
        goodsArr.push({
          code: code,
          num: num
        });
      }
    } else {
      console.log('zhixing3');
      var goodsArr = [];
      var num = parseInt($('#goods1-num .num').html());
      goodsArr.push({
        code: code,
        num: num
      });
      console.log(1111);
    } //更改cookie


    localStorage.setItem('goods', JSON.stringify(goodsArr));
  });
}