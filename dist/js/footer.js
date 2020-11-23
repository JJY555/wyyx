"use strict";

$('.wx').hover(function () {
  $('.div2>img').css('display', 'block');
  $('.wx').mouseleave(function () {
    $('.div2>img').css('display', 'none');
  });
});