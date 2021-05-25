/*
* 
*/
; (function(W){
   "use strict";

 

   var Madian=function(x){
       var ch='';
      
     ch+=W.T.C_web_header(x);
    // ch+= W.T.ColumnWrap540left(one,two,three);
    ch+='<div class="block ">'+W.U.ProfilePage.setNode()+'</div>';
     return  ch;
   }

  
   
    

   


   W.M[W.A.page.AppId]=  {
       Madian:Madian
     };


})(wowrol);