;(function (W) {
     "use strict";
     
     
     /**
 * header_HomePageStore.js
 */
 function C3_buyerhomeheader(x) {
      var URL=W.U.URL;



   var header =W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);"  data-openbtn="mainpage" data-btnid="drawer" >'+W.T.SVG('menu',24,'#f1f5fc')+' </a>',
    Title:'<a href="'+URL('')+'" class="left"><h2 class="truncate title" >Home</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'<div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="hederAlert"  >'+W.T.SVG('alert',24,'#f1f5fc')+'<i class="badge _gbtn">1</i> </a></div><div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="search"> '+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });
     
    // crating notification toggle box



    return header;
     }
/**
 * C3_subPageheader(x).js
 */
 function C3_subPageheader(x) {
   //'<a href="" class="left"><h2 class="truncate title" >'+x.entityName+'</h2><i class="badge _gbtn"></i> </a>'
     var URL=W.U.URL;

     
      var header =  W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);"  data-openbtn="mainpage" data-btnid="drawer" >'+W.T.SVG('menu',24,'#f1f5fc')+' </a>',
   Title:x.Title,
    RightLink:'<div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="hederAlert"  >'+W.T.SVG('alert',24,'#f1f5fc')+' <i class="badge _gbtn">1</i> </a></div><div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="search"> '+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });

 

    return header;
     }

W.T.C.C3_buyerhomeheader=C3_buyerhomeheader;
W.T.C.C3_subPageheader=C3_subPageheader;
      } )(wowrol);