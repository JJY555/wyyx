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


var x = $("#yanxuan").width() - $('.jjsh1').width();
$('.jjsh1').css("marginLeft", x / 2);
$('.jjsh').hover(function () {
  $('.jjsh1').css('display', 'inline-block');
  $('.jjsh1').mouseleave(function () {
    $('.jjsh1').css('display', 'none');
  });
}); //滚动改变顶部