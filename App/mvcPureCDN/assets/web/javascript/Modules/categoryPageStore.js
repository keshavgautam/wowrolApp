/*
* 
*/
; (function(W){
   "use strict";





var page=function(x){



    var ch='<div class="block" data-nodeid="browseingwalkway"></div>';


 
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
     W.U.StoreBrowsing.init();
    });





 return ch;


}


var Madian=function(x){
       var ch='';
  //   console.log(x);
 

   //--EntityStrip datab

 //-->>  
   ch+=page(x);
     


        return  ch;
   }

 
   
    

   


   W.M[W.A.page.AppId]=  {
       Madian:Madian
     };


})(wowrol);