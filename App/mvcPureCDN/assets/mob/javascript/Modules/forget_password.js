/*
* 
*/
; (function(W){
   "use strict";
   



  var Madian= function(x){
       var ch ='';
   ch+='asds'

var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
      
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