/**
 * C4_hederAlert.js
 */

 ;(function (W) {
     "use strict";

 W.T.C.C4_hederAlertStore =function(x) { 
     var ch = ''; var URL=W.U.URL;
      ch += '<div class="block ov-au" data-appmedian="page">';
 ch += '<div class="block m_b10"><nav class="block ul hover bg_0 "> <div class="li _B-gray "><a class="block _Bdy" href="'+URL('notifications')+'"> '+W.T.SVG('alert',24,'#1274c0')+'<span class="vl-sp fw-b">Notification</span><i class="badge _gbtn" data-updateragister="notialert" ></i></a></div><div class="li _B-gray "> <a class="block _Bdy" href="'+URL('dashboard_checkins')+'"> '+W.T.SVG('checkIn',24,'#1274c0')+'<span class="vl-sp fw-b tt-c">CheckIns</span><i class="badge _gbtn" data-updateragister="checkinmsgalert" ></i></a></div><div class="li _B-gray hide"> <a class="block _Bdy" href="'+URL('requests')+'">'+W.T.SVG('staff',24,'#1274c0')+'<span class="vl-sp fw-b tt-c">Frined Request</span><i class="badge _gbtn"   ></i></a></div></nav></div>';

   ch += '</div>';
    return ch;
}


} )(wowrol);