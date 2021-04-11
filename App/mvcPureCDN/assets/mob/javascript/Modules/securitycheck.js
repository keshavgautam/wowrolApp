/*
* loading
*/
; (function(W){
   "use strict";
  
  

 


    var Landing=function(x){
     var ch ='';
    var header=W.T.Header.wellcome({});
    var footer='';
   
    ch+='<div  data-nodeid="securitycheckwalkway" class="block " style="margin-bottom: 100px;"><div id="html_element"></div> </div>';
   $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
   W.U.recaptcha.SetPage(W.U.id('securitycheckwalkway'));
    });

      return W.T.wrap(header,ch,footer);
  
   }
 

 W.M.securitycheck={
          m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

})(wowrol);