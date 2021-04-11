
 /**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   
   var Landing=function(x){
     return '<div class="block po-re top_fix">'+W.T.Header.wellcome({})+'</div><div id="median" data-appMedian="page" class="block bg_13"> <div class="content"> <div class="block bs-2dp bg_0 _bdy m_b10"><div class="block " style="padding-top:100px; "><span class="block al-c" style=""></span> <div class="text ff_0 fs12"> <h2 class="al-c">404 error! page not found.</h2><div class=" al-c"> <div class="block"> <h3 class="m_b5"> Sorry ! The page you want to view, not found.</h3> </div> </div></div></div></div></div>'+/*wowrol.Modules.Main.Footer()+*/' </div>';
   }
   
    

   


     W.M.Error=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

 } )(wowrol);