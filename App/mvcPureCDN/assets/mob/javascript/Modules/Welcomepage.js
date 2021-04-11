/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   var Madian=function(x){
  var ch ='';
         ch+='<div  class="block bg_13" > <div class="block"> <div class="block bs-0 bg_0 m_b10"><div class="block al-c _bdy"><h3 class=" fw-b">-: Welcome to Wowrol :-</h3> </div><div class="block _bdy "><div class="block"> <label>Find stores near your location</label> '+' </div></div></div><div class="block bs-0 bg_0 _bdy m_b10"><div class="block "> <div class="t ff_0 fs12"> <p class="fw-b al-c"> Wowrol is an online shopping directory</p><p>Wowrol is an online shopping directory that connect peoples to their shopping destination through Wowrol network.</p><p>Wowrol empower every Retailers, Brands and Entrepreneurs to start a Wowrol store and receive orders for products.</p></div></div></div>'+W.T.Login()+'<div class="block bs-0 bg_0 _bdy m_b10"><div class="block "> <div class="t ff_0 fs12"> <p class="fw-b al-c"> Wowrol features</p><p>Online selling</p><p>Online shopping in local market</p><p>Social shopping.</p><p>Instant messaging about shopping in local market.</p></div></div></div><div class="block bs-0 bg_0 _bdy m_b10"><div class="block "> <div class="t ff_0 fs12"> <p class="fw-b al-c"> You can use Wowrol :</p><p>To show your letast shopping to friends and family members.</p><p>To find out letast collection &amp; catalogs of your faverte Wowrol-stores from your local market.</p></div></div></div><div class="block bs-0 bg_0 _bdy m_b10"><div class="block "> <div class="t ff_0 fs12"> <p class="fw-b al-c"> Wowrol Stores</p><p>Wowrol-Stores easliy transform your store to web-store.</p><p>Wowrol-Stores will own the customer. You can engage with them with future promotions and engagement activities.</p></div></div></div>'+W.T.localization_block()+'</div></div>';

 return  ch;

   }


   var Landing=function(x){
       var ch ='';
      var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,Madian(x),footer);
     return  ch;
   }
   
    

   


     W.M.Welcomepage=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

 } )(wowrol);