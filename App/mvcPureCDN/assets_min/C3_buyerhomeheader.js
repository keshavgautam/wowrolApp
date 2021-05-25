;(function (W) {
     "use strict";
     
     
     /**
 * header_HomePageStore.js
 */
 function C3_buyerhomeheader(x) {
      var URL=W.U.URL;



    var header ={Title: '<a href="'+URL('')+'" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Home</h2> </a>'};
    
 

    return C3_subPageheader(header);
     }
/**
 * C3_subPageheader(x)
 */
 function C3_subPageheader(x) {
   //'<a href="" class="left"><h2 class="truncate title" >'+x.entityName+'</h2><i class="badge _gbtn"></i> </a>'
     var URL=W.U.URL;

     
     var header =  W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="mainpage:drawer"  data-openbtn="mainpage" data-btnid="drawer" >'+W.T.SVG('menu',24,'#f1f5fc')+' </a>',
   Title:x.Title,
    RightLink:'<div class="di-td"><a href="javascript:void(0);" class="block header-link-btn" data-junction="refresh"  >'+W.T.SVG('refresh',24,'#f1f5fc')+' </a></div><div class="di-td"><a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="mainpage:hederAlert"   >'+W.T.SVG('alert',24,'#f1f5fc')+' <i class="badge _gbtn" data-fixedupdateragister="ActionBarAlert" ></i> </a></div><div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn" data-pagerbtn="mainpage:search" > '+W.T.SVG('search',24,'#f1f5fc')+' <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });

 

    return header;
     }

W.T.C.C3_buyerhomeheader=C3_buyerhomeheader;
W.T.C.C3_subPageheader=C3_subPageheader;
      } )(wowrol);