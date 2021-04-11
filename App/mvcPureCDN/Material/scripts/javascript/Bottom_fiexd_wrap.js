 (function (W) {
     "use strict";

     var top = '<div class="block _Bdy bg_3" >top</div>';
     var mid =  '<div class="block _Bdy bg_6" >mid</div>';
     var foot = '<div class="block _Bdy bg_7" >foot </div>';



     var BottomFixWrap = W.T.BottomFixWrap(top,mid,foot);

     var newView = W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">' + W.T.Pane(BottomFixWrap) + '</div>');




     W.U('#page').html(newView);


 })(wowrol);