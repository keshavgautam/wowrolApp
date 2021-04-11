/*
* 
*/
; (function(W){
   "use strict";
     

W.T.CheckinOrder=(function(){


 
 function ContentOrder(SBData){

 var URL=W.U.URL;
  var mid =  '<div class="block   ov-hi ">';
   mid +='<div class="block "></div>';
   mid +='<div class="block _bdy"></div>';
   mid +='</div>';

     var foot = '';
    var header= W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="checkin" >'+W.T.SVG('checkIn',24,'#f1f5fc')+'</a>',
    Title:'<a href="/" class="left"><span class="title" >checkin Order</span><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    });
 

  return  W.T.wrap(header,mid,foot);
 }  
  
    
return {
ContentOrder:ContentOrder
};
})();

 


})(wowrol);