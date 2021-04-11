/**
 * C4_hederAlert.js
 */

 ;(function (W) {
     "use strict";

 W.T.C.C4_hederAlertStore =function(x) { 
     var ch = ''; var URL=W.U.URL;
      ch += '<div class="block ov-au" data-appmedian="page">';
 ch += '<div class="block m_b10"><nav class="block ul hover bg_0 "> <div class="li _B-gray "><a class="block _Bdy" href="'+URL('notifications')+'"> <i class="material-icons">&#xE894;</i><span class="vl-sp fw-b">Notification</span><i class="badge _gbtn">1</i></a></div><div class="li _B-gray "> <a class="block _Bdy" href="'+URL('message')+'"> <i class="material-icons">&#xE159;</i><span class="vl-sp fw-b tt-c">Message</span><i class="badge _gbtn">1</i></a></div></nav></div>';

   ch += '</div>';
    return ch;
}


} )(wowrol);