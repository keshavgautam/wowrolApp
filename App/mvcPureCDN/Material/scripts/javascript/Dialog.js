 (function (W) {
     "use strict";

     var ch = '<div  class="block ul"  >';

    


     ch += '</div>';


     var newView = W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">' + W.T.Pane(ch) + '</div>');




     W.U('#page').html(newView);


 })(wowrol);