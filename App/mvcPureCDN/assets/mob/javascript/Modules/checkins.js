/*
* 
*/
; (function(W){
   "use strict";



 var Landing=function(x){
       var ch ='<div class="block" data-nodeid="checkinwalkway" ></div>';
  console.log(x);


    $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
      W.U.StoreBrowsing.init();
    });




  var learnMore=  W.U.LearnMorewrap;
  var blockList=[ch,learnMore];
var blockName=["blockFront","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
   return  W.T.ToggleBlock(blockList, blockName,setting);
   }
   
    

   


 W.M.checkins=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };


})(wowrol);