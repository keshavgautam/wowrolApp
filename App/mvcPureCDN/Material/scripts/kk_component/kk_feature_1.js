

   /*
* page set up 2
*/
; (function(W){
   "use strict";
 

  


 var ch = '<div class="block _bdy"  >';


 /////////////////Direct bind

 W.U.KKJunction('kkpager',{
       controller:function(){     
    
       }


 });




ch+='<div class="block _bdy" data-kkcomponent="kkpager"  ><div class="block bg_0 _B-gray  br-2 _bdy m_b10"><div class="left "><div class="block _bdy"><span class="fw-b fs14"> What\'s new with you?</span></div></div> <div class="right "><a href="javascript:void(0);" class="btn _fbtn " kk-pager="mainpage:spreadedit:spread:0" ><span>Spread</span></a></div></div></div>';






 //---------




 ch+='</div>';
   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);