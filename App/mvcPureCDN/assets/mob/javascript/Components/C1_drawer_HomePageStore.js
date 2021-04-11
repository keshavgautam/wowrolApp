/**
 * drawer_HomePageStore.js
 */

      ;(function (W) {
     "use strict";


W.T.C.C1_drawer_HomePageStore=function(x) {
    var ch = '';
  var URL=W.U.URL;
  
      ch += '<div class="block ov-au" data-appmedian="page">';
     ch += '<div class="block m_b10"><nav class="block ul hover bg_0 "><div class="li _B-gray "><a class="block _Bdy" href="'+URL('')+'">'+W.T.SVG('home',24,'#f1f5fc')+'<span class="vl-sp fw-b tt-c fs14">Home</span></a></div> <div class="li _B-gray "><a class="block _Bdy" href="'+URL('dashboard_categories')+'">'+W.T.SVG('category',24,'#f1f5fc')+'<span class="vl-sp fw-b tt-c fs14">Categories</span></a></div><div class="li _B-gray "> <a class="block _Bdy" href="'+URL('dashboard_menu')+'">'+W.T.SVG('storemenu',24,'#f1f5fc')+'<span class="vl-sp fw-b tt-c fs14">Menu</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="'+URL('dashboard_products')+'">'+W.T.SVG('box',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">products</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="'+URL('dashboard_orders')+'">'+W.T.SVG('orders',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">orders</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="'+URL('dashboard_shipping')+'">'+W.T.SVG('Shippping',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Shipping</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="'+URL('dashboard_frontpage')+'">'+W.T.SVG('frontpage',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Frontpage</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="'+URL('storestaff')+'">'+W.T.SVG('staff',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Store Staff</span></a></div></nav></div>';
  
    
   
    ch += '<nav class="block ul hover bg_0 "> <div class="li _B-gray "><a class="block _Bdy" href="'+URL('store_settings')+'"> '+W.T.SVG('setting',24,'#1274c0')+'<span class="vl-sp fw-b">Settings</span></a></div><div class="li b_gll _Bdy"><span class="fw-b">Use Wowrol as:</span></div><div class="li _B-gray "> <a class="block _Bdy" href="'+URL('Ragister')+'">'+W.T.SVG('changeEntity',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Change Entity</span></a></div><div class="li _B-gray "><a class="block _Bdy" href="'+URL('Ragister')+'">'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Register Store</span></a></div><div class="li _B-gray _Bdy"><span class="fw-b"></span></div><div class="li _B-gray "><a class="block _Bdy" href="javascript:void(0);">'+W.T.SVG('logout',24,'#1274c0')+'<span class="vl-sp fw-b tt-c fs14">Logout</span></a></div></nav>';

      ch += '</div>';
    return ch;
     }





      } )(wowrol);
