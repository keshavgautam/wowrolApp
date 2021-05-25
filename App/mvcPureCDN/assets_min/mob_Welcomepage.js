/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   var Madian=function(x){
  var ch ='';
     
   ch+='<div class="block ">';
  var defination='<div class="block _Bdy" > <div class="t ff_0 fs12"> <p class="fw-b al-c"> help_88 </p><p class="noreadmore">des_1</p></div></div>';

  var feature='<div class="block _bdy"> <div class="t ff_0 fs12"> <p class="fw-b al-c"> Wowrol Features</p><p>Online selling</p><p>Online shopping in local market</p><p>Social shopping.</p><p>Instant messaging about shopping in local market.</p></div></div>';
  var usage='<div class="block _bdy"> <div class="t ff_0 fs12"> <p class="fw-b al-c"> You can use Wowrol :</p><p>To show your latest shopping to friends and family members.</p><p>To find out latest collection &amp; catalogs of your favorite Wowrol-stores from your local market.</p></div></div>';

  var stores='<div class="block _bdy"> <div class="t ff_0 fs12"> <p class="fw-b al-c"> Wowrol Stores</p><p>Wowrol-Stores easily transform your store to web-store.</p><p>Wowrol-Stores will own the customer. You can engage with them with future promotions and engagement activities.</p></div></div>';

    ch+='<div class="block bs-1 bg_0 al-c _bdy "><h2 class=" fw-b">-: Welcome to Wowrol :-</h2> </div>';
    ch+='<div class=" "> <div class="block bs-1 bg_0 m_b10">'+defination+'</div><div class="block bs-1 bg_0 m_b10">'+W.T.Login()+'</div></div>';
    /*
     ch+='<div class="block bs-1 bg_0 m_b10"> <div class="block _bdy al-c"> <div class="text fs14"><p >'+W.U.strformat(W.U.GetText("help_89"),"0", "0") +'</p></div></div></div>';
    ch+='<div class=""> <div class="block bs-1 bg_0 m_b10" >'+feature+'</div><div class="block bs-1 bg_0 m_b10" >'+usage+'</div><div class="block bs-1 bg_0 m_b10" >'+stores+'</div></div>';*/
      
        ch+='<div class="block" data-dynamicspotmanager="help:welcome:wowrol_index" > </div>';

    ch+='</div>';
 return  ch;
 

   }



    

   


     W.M[W.A.page.AppId]=  {
       Madian:Madian

     };

 } )(wowrol);