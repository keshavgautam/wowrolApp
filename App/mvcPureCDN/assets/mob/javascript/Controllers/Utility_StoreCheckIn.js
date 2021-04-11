/*
* 
*/
; (function(W){
   "use strict";

   var Listing=(function(){

var  SBData={};




// activate all the block
 var checkInaugurateInterval=  setInterval(Inaugurate, 200);
var tries=0;
function Inaugurate(){
    if(W.U.id('block.ContentChat')!=null){
 clearInterval(checkInaugurateInterval); 
 W.U.fn.lister("tbCshown",W.U.id('block.ContentChat'),function(){
      
             W.U.Chats.FirstResponseLoad();
           
    });
 W.U.fn.lister("tbCshown",W.U.id('block.ContentStore'),function(){
      
         W.U.CheckInStoreBrowser.FirstResponseLoad();
    }); 
 W.U.fn.lister("tbCshown",W.U.id('block.ContentShortList'),function(){
      
        W.U.CheckInShortList.FirstResponseLoad();
    }); 
       
 W.U.fn.lister("tbCshown",W.U.id('block.ContentSuggestion'),function(){
      
     W.U.CheckInSuggestion.FirstResponseLoad();
    });      
 W.U.fn.lister("tbCshown",W.U.id('block.ContentCart'),function(){
      
   W.U.CheckInCart.FirstResponseLoad();
    });  
    
 W.U.fn.lister("tbCshown",W.U.id('block.ContentCheckout'),function(e){
     var target=e.target;
     if(target===W.U.id('block.ContentCheckout')){// prevent recursion
        W.U.CheckInCheckout.FirstResponseLoad(); 
     }
     
    });                 W.U.fn.lister("tbCshown",W.U.id('block.ContentMembers'),function(){
      
   W.U.CheckInMembers.FirstResponseLoad();
    });      
  }
     tries++;  
      if(tries>100){
             clearInterval(checkInaugurateInterval); 

      }
}











function CheckinTabPager(SBData){
var tem = W.T.StoreCheckIn;     var URL=W.U.URL;
      console.log(SBData);

 
 



//=================
   // main nav
var ListData=[];

ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentStore"  > <span class="vl-sp fw-b">'+SBData.Ed[0].entityName+'</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'Browse store.',formid:'browseStore'});

ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentChat"   > <span class="vl-sp fw-b">Chats</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'Have chat to '+SBData.Ed[0].entityName+' with your friends.',formid:'checkinchat'});
ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentShortList"   > <span class="vl-sp fw-b">ShortList</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'View the Shorlisted items at '+SBData.Ed[0].entityName+'.',formid:'checkinchat'});
ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentSuggestion"   > <span class="vl-sp fw-b">Suggestion</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'View the Suggestion items from '+SBData.Ed[0].entityName+'.',formid:'checkinchat'});
ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentCart"   > <span class="vl-sp fw-b">Cart</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'View the Cart items at '+SBData.Ed[0].entityName+'.',formid:'checkinchat'});
ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentOrder"   > <span class="vl-sp fw-b">Order</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'View the Orders at '+SBData.Ed[0].entityName+' .',formid:'checkinchat'});
ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentMembers"   > <span class="vl-sp fw-b">Members</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'View the active Members in this chackin.',formid:'checkinchat'});
ListData.push({Link:'<a class="block " href="javascript:void(0);"  data-openbtn="checkin" data-btnid="ContentCheckout"   > <span class="vl-sp fw-b">Checkout</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a>',help:'Checkout',formid:'checkinchat'});

 var checkinNav='<div class="block "><nav class="block ul hover bg_0 bs-2dp "><div class="li b_gll b_grl _Bdy"><span class="fw-b ">Checkin of <a class="span " href="'+SBData.Ed[1].entityUrl+'"    >'+SBData.Ed[1].entityName+'<a> at <a class="span " href="'+SBData.Ed[0].entityUrl+'"    >'+SBData.Ed[0].entityName+'<a> :</span></div>';
  for(var i=0;i<ListData.length;i++){
    checkinNav+='<div class="li _B-gray _bdy">'+ListData[i].Link+'<span class="di-in  fg_4 fs-italic fs11">'+ListData[i].help+'</span></div>'; 

  


  }
   
  checkinNav+='</nav></div>';







    var header= '<div class="block po-re top_fix">'+W.T.ActivityHeader({LeftButton:'<a href="'+URL('')+'"  >'+W.T.SVG('home',24,'#f1f5fc')+'</a>',
    Title:'<a href="/" class="left"><h2 class="truncate title" >checkin</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    })+'</div>';
   var footer='<div class="block"><div class="block"><ul class="ul  ul-menu tt-c li_bdy_0-5"> <li  ><a href="javascript:void(0);"  href="javascript:void(0);" data-learnmore="understandcheckin" >check in rule</a></li></ul></div><div class="block">  '+W.T.Footer({})+'</div></div>';;


var checkinFront=W.T.wrap(header,checkinNav,footer);

var ContentChat = tem.ContentChat(SBData);
var ContentStore = tem.ContentStore(SBData); 
var ContentShortList = tem.ContentShortList(SBData);
var ContentSuggestion = tem.ContentSuggestion(SBData);  
var ContentCart = tem.ContentCart(SBData);
var ContentOrder = tem.ContentOrder(SBData); 
var ContentMembers = tem.ContentMembers(SBData); 
var ContentCheckout = tem.ContentCheckout(SBData); 

var blockList=[checkinFront,ContentStore,ContentChat,ContentShortList,ContentSuggestion,ContentCart,ContentOrder,ContentMembers,ContentCheckout];
var blockName=['checkinFront','ContentStore','ContentChat','ContentShortList','ContentSuggestion','ContentCart','ContentOrder','ContentMembers','ContentCheckout'];
var setting ={
    name:'checkin',
    target:'checkinFront',
    page:true,
    minheight:'auto'
};
    return W.T.ToggleBlock(blockList, blockName,setting);
 } 
       


function init(SBData){
var walkway= W.U.id('checkinwalkway');
 console.log('init started');
 console.log(SBData);
W.U.StoreCheckIn.SBData=SBData;
  var mainBlock=W.U.Rander(CheckinTabPager(SBData));


 W.U.Setview(walkway ,mainBlock,'html');
}

return {init:init,SBData:SBData};

   })();

W.U.StoreCheckIn=Listing;





})(wowrol);