


        ;(function (W) {
     "use strict";
/**
 * drawer_C1_drawer_HomePageBuyer.js
 */
 function drawer_HomePageBuyer(x) {
    var ch = '';
    var URL=W.U.URL;

    ch += '<div class="block ov-au" data-appmedian="page">';
    
  
       ch += '<div class="block m_b10"><nav class="block ul hover bg_0 "> <div class="li _B-gray "><a class="block _Bdy" href="'+URL('')+'">'+W.T.SVG('home',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Home</span></a></div> <div class="li _B-gray "><a class="block _Bdy" href="'+URL('mycheckins')+'">'+W.T.SVG('checkIn',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">My CheckIn</span></a></div><div class="li _B-gray "> <a class="block _Bdy" href="'+URL('dashboard_menu')+'">'+W.T.SVG('orders',24,'#1274c0')+'<span class="vl-sp fw-b tt-c tt-c fs14">My Orders</span></a></div></nav></div>';

      ch += '<div class="block m_b10"><nav class="block ul hover bg_0 "> <div class="li _B-gray "><a class="block _Bdy" href="'+URL('setting_buyer')+'"> '+W.T.SVG('setting',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Settings</span></a></div><div class="li b_gll b_grl _Bdy"><span class="fw-b ">Use Wowrol as:</span></div><div class="li _B-gray "> <a class="block _Bdy" href="'+URL('Ragister')+'">'+W.T.SVG('changeEntity',24,'#1274c0')+'<span class="vl-sp fw-b tt-c">Change Entity</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="'+URL('Ragister')+'">'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Register Store</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="javascript:void(0);">'+W.T.SVG('logout',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Logout</span></a></div></nav></div>';

      ch += '</div>';
    return ch;
     }

     W.T.C.drawer_HomePageBuyer=drawer_HomePageBuyer;

      } )(wowrol);