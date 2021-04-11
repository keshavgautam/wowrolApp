/*
* 
*/
; (function(W){
   "use strict";

W.U.CheckInStoreBrowser=(function(){
var ProfilePageAdded=false;
var OuterLinkLoad=false;
var URL=W.U.URL;

function GetBrowsedObjectInfo(View){

    var ObjectInfo={}; ObjectInfo['type']='StoreFrontPage';

    if(View['CategoryInfo']!=undefined){
        ObjectInfo=View.CategoryInfo;
         ObjectInfo['type']='category';
    }
  if(View['ProductInfo']!=undefined){
        ObjectInfo=View.ProductInfo;
         ObjectInfo['type']='product';
    }


    return ObjectInfo;
}
function StoreLayout(x){
    var URL=W.U.URL;
    var ch='<div class="block _bdy  m_b10 bg_0 _B-gray"> <div class="left"><p>Explore the store </p> </div><div class="right"> <button type="button" class="btn btn-primary btn-xs"  data-openbtn="profilepageStore" data-btnid="StoreBrowserStoreMenu"  ><span>Explore</span><span></span></button></div></div>';

var StoreMenu= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="profilepageStore" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><span class="truncate title" >Store Menu</span><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.StoreCheckInMenu(x.store_menu));




    //--search
var blockList=[ch,StoreMenu];
var blockName=["StoreBrowserblockFront","StoreBrowserStoreMenu"];

var setting ={
    name:'profilepageStore',
    parent:"checkin",
    target:"StoreBrowserblockFront",
    page:true,
    minheight:'auto'
};


    return  W.T.ToggleBlock(blockList, blockName,setting);;
}

function OnCheckInMenuClick(e){
      e.preventDefault();
     var href =  this.getAttribute('href');

 LoadPage(href);
}
function OnOuterLinkLoad(e){
       e.preventDefault();
     var href =  this.getAttribute('href');
     OuterLinkLoad=true;
       LoadPage(href);
}
//hide menu
function HideMenu(){
  
      var Node=W.U.id('block.StoreBrowserStoreMenu');
 if(Node!=null){
 var event = jQuery.Event('hide');
 $(Node.parentNode).triggerHandler(event);     
      }   
    

}
//Process Loaded data
function ProcessLoadedData(AppData){
   var walkWay=W.U.id('CheckInStoreBrowserWalkway');
        var walkwaystoremenu=walkWay.previousSibling;
    switch(AppData.AppId){
    case 'ProfilePageStore':
   
 //inserting
   if(ProfilePageAdded==false){
    
 
 var mainBlock=W.U.Rander(StoreLayout(AppData.AppView));
    W.U.attrclick('[role="checkinmenu"]',mainBlock[0],OnCheckInMenuClick);

 W.U.Setview(walkwaystoremenu,mainBlock,'html');
 ProfilePageAdded=true;
  } 
    break;    
  case 'categoryPageStore':
    var BOinfo=GetBrowsedObjectInfo(AppData.AppView);
 
     W.U.AddDom(walkWay,W.T.CategoryListing.initPage(BOinfo),'html');
       HideMenu();
         setTimeout(function(){
          W.U.CategoryListing.init(BOinfo,W.U.id('categorywalkway'));      
         }, 100);
  
     
     
   break; 

  case 'productPageStore':
     var BOinfo=GetBrowsedObjectInfo(AppData.AppView);
   W.U.ProductListing.init(BOinfo,walkWay); 
   HideMenu();
   break; 
    }
   
    if(OuterLinkLoad){
    
    var Node=W.U.id('block.ContentStore');
     var event = jQuery.Event('hide');
      event.id = 'ContentStore';
 $(Node.parentNode).triggerHandler(event); 
      var event = jQuery.Event('show');
      event.id = 'ContentStore';
 $(Node.parentNode).triggerHandler(event); 
 OuterLinkLoad=false;       
    }
}


//function loadpage in walkway

function LoadPage(url){
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
        
              ProcessLoadedData(page)
                }       
                    }

                }); 
}


  // chat First loading
function FirstResponseLoad(){  
var SBData= W.U.StoreCheckIn.SBData;
    console.log('CheckInStoreBrowser FirstResponseLoad'); 
  if(ProfilePageAdded==false&&OuterLinkLoad==false){
      LoadPage(SBData.Ed[0].entityUrl);
  } 
}  


return {FirstResponseLoad:FirstResponseLoad,
OnCheckInMenuClick:OnCheckInMenuClick,
OnOuterLinkLoad:OnOuterLinkLoad
};
})();



})(wowrol);