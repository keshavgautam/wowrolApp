/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   var Madian=function(x){
  var ch ='';
 ch+='<div  class="block " >asdas</div>';

 return  ch;

   }


   var Landing=function(x){
       var ch ='';
      var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,Madian(x),footer);
     return  ch;
   }
   
    

   


     W.M.ordertracking=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

 } )(wowrol);