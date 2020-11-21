//采购和客户的触发
var cg=document.querySelector('#top .cg')
var fw=document.querySelector('#top .fw')
var cg1=document.querySelector('#top .cg1')
var fw1=document.querySelector('#top .fw1')
 cg.onmouseenter=function(){
    cg1.style.display='block'
    cg.onmouseleave=function(){
        cg1.style.display='none'
    }
 }
 fw.onmouseenter=function(){
    fw1.style.display='block'
    fw.onmouseleave=function(){
        fw1.style.display='none'
    }
 }
//搜索和导航