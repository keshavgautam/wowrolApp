 ;(function (W) {
     "use strict";

/**
 * C3_storeprofileheader(x).js
 */
 function C3_storeprofileheader(x) {
      var URL=W.U.URL;
 var header =W.T.ActivityHeader({LeftButton:'<a href="'+URL('')+'"  >'+W.T.SVG('home',24,'#f1f5fc')+'</a>',
    Title:'<a href="'+x.entityUrl+'" class="left"><h2 class="truncate title" >'+x.entityName+'</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'<div class="li "><a href="javascript:void(0);">'+W.T.SVG('cart',24,'#f1f5fc')+' </a></div><div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="search" >'+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });
     
    // crating Cart toggle box





    return header;
     }
function C3_buyerprofileheader(x) {
      var URL=W.U.URL;
 var header =W.T.ActivityHeader({LeftButton:'<a href="'+URL('')+'"  >'+W.T.SVG('home',24,'#f1f5fc')+'</a>',
    Title:'<a href="'+x.entityUrl+'" class="left"><h2 class="truncate title" >'+x.entityName+'</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'<div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="search" >'+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });
     
    // crating Cart toggle box





    return header;
     }


W.T.C.C3_storeprofileheader=C3_storeprofileheader;
W.T.C.C3_buyerprofileheader=C3_buyerprofileheader;

      } )(wowrol);
