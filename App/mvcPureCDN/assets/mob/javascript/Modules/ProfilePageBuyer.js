/*
* 
*/
; (function(W){
   "use strict";

 var Madian=function(x){
       var ch='';
     
   var header=W.T.C.C3_buyerprofileheader(x.EntityStripdata);
   var footer=W.T.Footer({});;
   //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 bs-1  m_b10">';
  ch+='<div class="block m_b10">';  
    ch+=W.T.C.C2_EntityStrip(x.EntityStripdata,{}); 
    ch+='</div>';
  ch+='<div class="block ">';  
 ch+= W.U.relation({twr:x.twr,owr:x.owr,mes:x.mes,shg:x.shg},'truncate ',''); 
ch+= W.T.C.ProfileBannerStrip(x); 
 
    ch+='</div>';
      ch+='</div>';
 //-->>   
 //-->>  
ch+='<div class="block ">'+W.U.ProfilePage.setNode()+'</div>';
 //-->>  
      


        return W.T.wrap(header,ch,footer);
   }

  
   
    

   


   W.M[W.A.page.AppId]=  {
       Madian:Madian
     };


})(wowrol);