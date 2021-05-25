


 ;(function (W) {
     "use strict";
var ch=' <div class="block _bdy">';
    ch+='<div class="block _bdy"><h2>web logout header</h2></div>';
    var DrawerMEnu=  W.I.BUYER_MENU.concat(  W.I.SETTING_MENU);
    ch+= W.T.WebHeader({ Login:true, actiondropdown:DrawerMEnu  });

   ch+='<div class="block _bdy"><h2>web logout header</h2></div>';

     ch+= W.T.WebHeader({  actiondropdown:DrawerMEnu  });
    ch+='</div>';










     var newView = W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">' + W.T.Pane(ch) + '</div>');




     W.U('#page').html(newView);


 })(wowrol);