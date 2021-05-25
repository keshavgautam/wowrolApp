/*
* 
*/
; (function(W){
   "use strict";
var Is_init=false;
function StoreMenuPage(block){
    var storemenu=block.objectdata; 

  

var Header =W.T.ActivityHeader({back:'<a href="javascript:void(0);" data-pagerbtn="'+W.I.checkinPager+':checkinPlatformStorebrowsing"  class="block header-link-btn" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
  
 Title: '<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >StoreMenu</h2> </a>',


  RightLink:'<div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn" ></a></div>',
    dropdown:Array()
    });

var ch=W.T.C.StoreCheckInMenu(storemenu);

    return W.T.DashbordFormWrap(Header, ch);
}


function SelfExploreMenu(SBData,x){
      var walkWay=W.U.id('StoreBrowserMenu'+SBData.checkIn_id); 
  var URL=W.U.URL;    var ch='';
  W.U.intentdata.add('storemenu.0',x.store_menu);

 W.U.Pager.addblockdata({ name:'StoreMenu', htmlStr: StoreMenuPage});
 //W.U.Pager.addblockdata({ name:'StoreMenu', htmlStr: StoreMenuPage,objectdata:x.store_menu});
   //-------------------

   ch+='<div class="block _bdy  m_b10 bg_0 bs-1"> <div class="left"> </div><div class="right"> <button type="button" class="btn btn-primary btn-xs"  data-pagerbtn="'+W.I.checkinPager+':StoreMenu:storemenu:0" ><span>Explore</span><span></span></button></div></div>';

   ch+='<div class="block m_b10" >'+W.T.C.StoreSlider(x.slider)+'</div>';
        var mainBlock=W.U.Rander( ch);
    W.U.Setview(walkWay,mainBlock,'html');
}

function ProgessPage(SBData,AppData){
  var walkWay=W.U.id('StoreBrowserWalkway'+SBData.checkIn_id); 
  var BOinfo=W.U.Browsing.BOinfo(AppData.AppView);   

    SelfExploreMenu(SBData,AppData.AppView);

      switch(AppData.AppId){
    case 'ProfilePageStore':
    
  var mainBlock=W.U.Rander('<div class="block ">'+W.U.ProfilePage.setNode()+'</div>');
     W.U.Setview(walkWay,mainBlock,'html');
      W.U.Pager.togglePage(W.I.checkinPager,'checkinPlatformStorebrowsing');
  
      break;    
  case 'categoryPageStore':
    W.U.CategoryListing.init(BOinfo,walkWay); 
   W.U.Pager.togglePage(W.I.checkinPager,'checkinPlatformStorebrowsing');
 
      break;    
  case 'productPageStore':
     W.U.ProductListing.init(BOinfo,walkWay); 
     W.U.Pager.togglePage(W.I.checkinPager,'checkinPlatformStorebrowsing');
 
    
      break;   

    }

}

function LoadPage(SBData,url){
         var site_url_reg = W.U.URL('SITEURLreg');
      var gohref =  url;
      if (site_url_reg.test(url)) {
        gohref = url + '?g=0';
    } else { 
      gohref = url + '&g=0';
    }


  W.U.iFePost({

                    url: gohref,
                    data: {},
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
           W.U.madianLoading('show');
                     
                    },
                    success: function (data) {
          W.U.madianLoading('hide');
 var ret = JSON.parse(data);
            if (ret.state == 200) {
                    var page = ret.response;
        
             ProgessPage(SBData,page);
                }       
                    }

                }); 
                
                 
}

//------------------------------------
function OnCheckInMenuClick(e){
      e.preventDefault();
     var href =  this.getAttribute('href');
var SBData=W.U.StoreBrowsing.hi_SBdata(); 
 Is_init=false;
   W.U.CheckInStoreBrowser.init(SBData,href); 
}

//----------

function init(SBData,url){
var pager=  (W.I.wf=="mob")?'mainpage':'checkinPlatform';  

W.U.Pager.addblockdata({    name:'checkinPlatformStorebrowsing', htmlStr:W.T.CheckInStoreBrowser.Layout,objectdata:SBData});   

W.U.Pager.DirectTogglePage(pager,'checkinPlatformStorebrowsing');  

if( !Is_init){
    url=W.U.isOK(url)?url:SBData.Ed[0].entityUrl;

 LoadPage(SBData,url); 
 Is_init=true;
}



}


   W.U.CheckInStoreBrowser={
   init:init    ,
OnCheckInMenuClick:OnCheckInMenuClick
   };

})(wowrol);