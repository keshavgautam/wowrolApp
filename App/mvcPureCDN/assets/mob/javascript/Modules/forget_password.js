/*
* 
*/
; (function(W){
   "use strict";
   



  var Madian= function(x){
       var ch ='';
   

var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  ch+='<div  data-nodeid="walkway" class="block " style="margin-bottom: 100px;"> </div>';
   $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
      W.U.forget_password.init();
    });
      
     return  W.T.wrap(header,ch,footer);
   }

  var Landing=function(x){
       var ch ='';
      

 var  blockFront=Madian(x);
//--blockFront
 //--learn more
var learnMore=  W.U.LearnMorewrap;

//--search
var blockList=[blockFront,learnMore];
var blockName=["blockFront","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
  
     return  W.T.ToggleBlock(blockList, blockName,setting);
   }
   
    
  



     W.M.forget_password=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }
     };



})(wowrol);