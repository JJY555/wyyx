"use strict";

//采购和客户的触发
var cg = document.querySelector('#top .cg');
var fw = document.querySelector('#top .fw');
var cg1 = document.querySelector('#top .cg1');
var fw1 = document.querySelector('#top .fw1');

cg.onmouseenter = function () {
  cg1.style.display = 'block';

  cg.onmouseleave = function () {
    cg1.style.display = 'none';
  };
};

fw.onmouseenter = function () {
  fw1.style.display = 'block';

  fw.onmouseleave = function () {
    fw1.style.display = 'none';
  };
}; //搜索和导航


var x = 1903 - $('.jjsh1').width();
$('.jjsh1').css("marginLeft", x / 2);
$('.top').hover(function () {
  $('.jjsh1').css('display', 'none');
});
$('.jjsh').next().hover(function () {
  $('.jjsh1').css('display', 'none');
});
$('.jjsh').prev().hover(function () {
  $('.jjsh1').css('display', 'none');
});
$('.jjsh2').next().hover(function () {
  $('.jjsh1').css('display', 'none');
});
$('.jjsh2').prev().hover(function () {
  $('.jjsh1').css('display', 'none');
});
$('.jjsh').hover(function () {
  $('.jjsh1').css('display', 'inline-block');
  $('.jjsh1').mouseleave(function () {
    $('.jjsh1').css('display', 'none');
  });
});
$();
$('.jjsh2').hover(function () {
  $('.jjsh1').css('position', 'fixed');
  $('.jjsh1').css('top', '50px');
  $('.jjsh1').css('display', 'inline-block');
  $('.jjsh1').mouseleave(function () {
    $('.jjsh1').css('display', 'none');
    $('.jjsh1').css('position', 'relative');
    $('.jjsh1').css('top', '0px');
  });
}); //滚动改变顶部
//滚动固定

window.onscroll = function () {
  var oDiv = document.getElementById("fix-flag"),
      oDiv1 = document.querySelector('nav'),
      H = 0,
      H1 = 0,
      Y = oDiv,
      Y1 = oDiv1;
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

  window.onscroll = function () {
    var s = document.body.scrollTop || document.documentElement.scrollTop;

    if (s > H) {
      // 两侧固定
      $('.hot').css('position', 'fixed');
      $('.hot').css('top', '75px');
      $('.erweima').css('position', 'fixed');
      $('.erweima').css('top', '75px');
    } else {
      $('.hot').css('position', 'absolute');
      $('.erweima').css('position', 'absolute');
      $('.erweima').css('top', '25px');
      $('.hot').css('top', '25px');
    }

    if (s >= H1) {
      //顶部改变
      $('.yanxuan nav').css('height', '0');
      $('#header2').css('height', '50px');
      $('#header2 a').css('display', 'inline-block');
    } else {
      //顶部
      $('.yanxuan nav').css('height', '24');
      $('#header2').css('height', '0px');
      $('#header2 a').css('display', 'none');
    }
  };
};

$('.login-div span').click(function () {
  $('.login-div').css('display', 'none');
  $('.login-divmask').css('display', 'none');
});
$('#login').click(function () {
  $('.login-div').css('display', 'block');
  $('.login-divmask').css('display', 'block');

  if (getCookie('username')) {
    user.value = getCookie('username');
    pass.value = getCookie('password');
    auto.checked = true;
  }
});