 (function (W) {
     "use strict";

     var ch = '<div  class="block ul"  >';

       ch += '<div class="li _B-gray " id="menuItem_5586"  data-collapse="demo" >';
        ch += '<div class="block _bdy bg_7"><span class=" block w10">demo span</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javscript:void(0);" data-collapsebtn="demo"  ></a></span></div></div>'; 
        ch += '<div class="block _bdy bg_0" data-collapseblock="demo"  >sdfsdfsdfsdfasd</div>'; 
       ch += '</div>';


     ch += '</div>';


     var newView = W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">' + W.T.Pane(ch) + '</div>');




     W.U('#page').html(newView);


 })(wowrol);