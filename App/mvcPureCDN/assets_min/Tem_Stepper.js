/*
* 
*/
;(function(W){
   "use strict";


   var S={
   stepheader:function(x,isactive,currentIndex){
       var titleClass='',titleIcon=x.titleicon,titleText=x.title;
    
       var Iscomplited=(x.index<currentIndex)?true:false;
          var activeClass=(isactive)?'bg_3 fg_10':' bg_4 fg_11';
       titleIcon=(Iscomplited)?W.T.SVG('checkmark',18,'#fff'):(W.U.intval(x.index)+1);
       var ch='<div>'
       +'<a href="javascript:void(0);" class="block _Bdy bg_0  no-t-deco hov bs-1" data-ontabclick="'+x.index+'" >'
       +'<div class="di-td ">'
       +'<i  class=" block x30 al-c jc-c  round   fw-b  _bdy    ma-r-10 '+activeClass+'">'+  titleIcon+' </i>'
       +'</div>'
       +'<div class="di-td  w212  vl-t">'
       +'<div class="ad-0 fw-b fg_11 fs14 tt-c" >'+titleText+'</div>'
       +'<div class="  fs10 fg_11">'+x.substitle+'</div>'
       +'</div>'
       +'</a>'
       +'</div>'
       ;
       return ch;

   } ,   
actionbutton:function(x,isactive,currentIndex){
    var ch=''
    +'<div class=" block _Bdy bs-1 ad-5">'
    +'<div class=" left">'
    +((x.isSkipbutton)?'<button type="button" class=" flatbtn "  data-onskip="'+x.index+'">skip</button>':'') 
    + '</div>'
    
    +'<div class=" right">'
     +((x.isbackbutton)?'<button type="button" class=" flatbtn fg_2 " data-onback="'+x.index+'" >back</button>':'') 
   +((x.iscontinuebutton)?'<button type="button" class=" flatbtn fg_7 "  data-oncontinue="'+x.index+'" >'+x.Textcontinuebutton+'</button>':'') 
 
    + '</div>'
   
    + '</div>'
    ;
    return ch;
}

   };


   
W.T.Stepper=S;


   })(wowrol);