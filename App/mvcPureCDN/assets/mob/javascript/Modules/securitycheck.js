/*
* loading
*/
; (function(W){
   "use strict";
  
  

 


    var Madian=function(x){
     var ch ='';
    ch+='<div  data-nodeid="securitycheckwalkway" class="block " style="margin-bottom: 100px;"><div id="html_element"></div> </div>';
   $(W.U.Page).on('pageloaded',function(){
        // Always call inside from function 
       
   W.U.recaptcha.SetPage(W.U.id('securitycheckwalkway'));
    });
   
 

      return ch;
  
   }
 


      W.M[W.A.page.AppId]=  {
       Madian:Madian
     };

})(wowrol);