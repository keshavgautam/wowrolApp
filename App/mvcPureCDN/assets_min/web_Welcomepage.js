/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   var Madian=function(x){
  var ch ='<div class="block " >';
 
  var defination='<div class="block _Bdy"  > <div class="t ff_0 fs12"> <p class="fw-b al-c"> help_88 </p><p class="noreadmore">des_1</p></div></div>';


    ch+='<div class="block bs-1 bg_0 al-c _bdy m_t10"><h2 >text_136</h2> </div>';
    ch+='<div class="block bs-1 bg_0 m_b10 "> <div class="w9">'+defination+'</div><div class="w3 bs-1">'+W.T.Login()+'</div></div>';  
   // ch+='<div class="block bs-1 bg_0 m_b10"> <div class="block _bdy al-c"> <div class="text fs14"><p >'+W.U.strformat(W.U.GetText("help_89"),"0", "0") +'</p></div></div></div>';
   
        ch+='<div class="block" data-dynamicspotmanager="help:welcome:wowrol_index" > </div>';     
         ch+='</div>';  
 return  ch;

   }



    

   


     W.M[W.A.page.AppId]=  {
       Madian:Madian

     };

 } )(wowrol);