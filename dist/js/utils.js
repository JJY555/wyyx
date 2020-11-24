"use strict";

// 获取元素样式
function getStyle(dom, attr) {
  if (dom.currentStyle) {
    return dom.currentStyle[attr];
  } else {
    return getComputedStyle(dom)[attr];
  }
}

function animate(dom, options, callback) {
  // 遍历对象属性
  for (var attr in options) {
    // 获取元素当前的attr值
    if (attr === 'opacity') {
      // 获取当前元素的透明度*100
      var current = parseInt(getComputedStyle(dom)[attr] * 100);
      var target = options[attr] * 100;
    } else if (attr.indexOf('scroll') !== -1) {
      var current = dom[attr];
      var target = options[attr];
    } else {
      var current = parseInt(getComputedStyle(dom)[attr]);
      var target = options[attr];
    }

    options[attr] = {
      'current': current,
      'target': target
    }; // 目标数据结构:
    // options = {
    //   'width': {
    //     'current': 100,
    //     'target': 300
    //   },
    //   'height': {
    //     'current': 100,
    //     'target': 300
    //   },
    //   ...
    // }
  }

  clearInterval(dom.timer);
  dom.timer = setInterval(function () {
    // 遍历对象，取出数据
    for (var attr in options) {
      var current = options[attr].current;
      var target = options[attr].target; // 持续变化的速度

      var speed = (target - current) / 10; // 浮点数计算会造成结果有偏差，可能造成数据丢失：取整
      // 判断运动方向取整

      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); // 临界值判断：剩余运动量<=每次的运动量

      if (Math.abs(target - current) <= Math.abs(speed)) {
        // 到达终点
        if (attr === 'opacity') {
          dom.style[attr] = target / 100; // 立即到达终点
        } else if (attr.indexOf('scroll') !== -1) {
          dom[attr] = target;
        } else {
          dom.style[attr] = target + 'px';
        } // 删除已运动完成的属性


        delete options[attr];

        for (var attr in options) {
          // 还有其他属性没运动完成，提前结束当前程序，不清除计时器
          return false;
        } //如果有回调函数，则执行回调函数


        typeof callback === 'function' ? callback() : '';
        clearInterval(dom.timer); // 清除计时器
      } else {
        // 未到达终点
        options[attr].current += speed;

        if (attr === 'opacity') {
          dom.style[attr] = options[attr].current / 100;
        } else if (attr.indexOf('scroll') !== -1) {
          dom[attr] = options[attr].current;
        } else {
          dom.style[attr] = options[attr].current + 'px';
        }
      }
    }
  }, 20);
} // 获取元素到最外层定位父级的距离


function offset(dom, bool) {
  var t = 0,
      l = 0;
  var bdl = dom.clientLeft; // 保存当前元素的左边框

  var bdt = dom.clientTop; // 保存当前元素的上边框

  while (dom) {
    l += dom.offsetLeft + dom.clientLeft;
    t += dom.offsetTop + dom.clientTop; // 每次循环完让当前dom元素等于他的定位父级

    dom = dom.offsetParent;
  }

  if (bool) {
    // 包含自身边框
    return {
      left: l,
      top: t
    };
  } else {
    // 不包含自身边框
    return {
      left: l - bdl,
      top: t - bdt
    };
  }
}