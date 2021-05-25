 ;(function (W) {
     "use strict";

/**
 * C3_storeprofileheader(x).js
 */
function C3_storeprofileheader(x) {
      var URL=W.U.URL;
 var header =W.T.ActivityHeader({back:'<a href="'+URL('')+'"   class="block header-link-btn" >'+W.T.SVG('home',24,'#f1f5fc')+'</a>',
    
    Title: '<a href="'+URL('')+x.slug+'" class="block header-cell fg_6 al-l " ><h2 class="truncate title" >'+x.entityName+' </h2> </a>',

    RightLink:'<div class="di-td"><a href="javascript:void(0);" class="block header-link-btn"  data-junction ="cartbtninit"  >'+W.T.SVG('cart',24,'#f1f5fc')+'<i class="badge _gbtn vl-sp" '+ W.U.Browsing.cartIconUpdate('getId')+'></i> </a></div><div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn" data-pagerbtn="mainpage:search" data-openbtn="mainpage" data-btnid="search"> '+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });
     
    // crating Cart toggle box





    return header;
     }
function C3_buyerprofileheader(x) {
      var URL=W.U.URL;
 var header =W.T.ActivityHeader({back:'<a href="'+URL('')+'"  class="block header-link-btn" >'+W.T.SVG('home',24,'#f1f5fc')+'</a>',
  
 Title: '<a href="'+URL('')+x.slug+'" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >'+x.entityName+'</h2> </a>',


  RightLink:'<div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn" data-pagerbtn="mainpage:search" data-openbtn="mainpage" data-btnid="search"> '+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });
     
    // crating Cart toggle box





    return header;
     }

function C3_companyprofileheader(x){
         var URL=W.U.URL;
 var header =W.T.ActivityHeader({back:'<a href="'+URL('')+'"  class="block header-link-btn" >'+W.T.SVG('home',24,'#f1f5fc')+'</a>',
  
 Title: '<a href="'+URL('')+x.slug+'" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >'+x.entityName+'</h2> </a>',


  RightLink:'<div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn" data-pagerbtn="mainpage:search" data-openbtn="mainpage" data-btnid="search"> '+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });
     
    // crating Cart toggle box





    return header; 
}


W.T.C.C3_storeprofileheader=C3_storeprofileheader;
W.T.C.C3_buyerprofileheader=C3_buyerprofileheader;
W.T.C.C3_companyprofileheader=C3_companyprofileheader;
      } )(wowrol);
