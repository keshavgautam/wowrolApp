/*
* 
*/
; (function(W){
   "use strict";
//checkin listing layout
var CH_L={
  Layout:function(){
    var ch='<div class="block">';   
 
         if(W.I.wf=='mob'){
   ch+='<div class="block" data-junction="checkinLinklist" ></div>';

       }

      if(W.I.wf=='web'){
var one='',two='';

one+='<div class="block" data-junction="checkinLinklist" ></div>';




two= '<div class="block" data-dynamicspotmanager="help:welcome:wowrol_index" ></div>';

 ch+=W.T.ColumnWrapXXX([one,two],['w-x-6','w-x-12 ma-l-5']); 
       }


    ch+='</div>';

     W.U.Junction('checkinLinklist',function(){
   var PagingData= W.U.checkins.checkInPagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);

             },{}); 

      return ch;
  } , 
  t0:function(x){
     var ch=''; 
    if(x.length>0){
     ch='<div class="block ul hover bg_0 bs-1" >';
     
      for(var q in x){
         ch+=CH_L.t1(x[q]); 
      }

      ch+='</div>';

      }else{
        
 ch+=W.T.RNF_banner({}); 
    }
      return ch;
  } ,
  t1:function(x){
    var URL =W.U.URL;
        var y=W.U.Browsing.ParseEntityData(x.Ed);
        var desData=W.U.Browsing.CheckInDescrition(x);
 
      
   var ch='<div class="li"><a class="block fg_11 no-t-deco"  href="'+URL('checkins')+'&id='+x.id+'"   data-point="'+x.updater_id+'" data-id="'+x.id+'" > <div class="di-td _bdy"><img class=" x48" alt="64x64" src="'+W.I.IMAGE_PLACEHOLDER+'"  data-src="'+y.avatar+'"  ></div><div class="di-td vl-t bs-1-bottom _bdy w212"> <div class="block fw-b">'+desData.name+'</div><div class="block "> <div class=" wball  "  >'+desData.line1+'</div></div></div><div class="di-td bs-1-bottom _bdy po-re"> <div class="block"> <div class="block  _bdy"><div class="block  po-ab ad-11  "><span class="block fg_12 fs11 time al-r"></span></div></div><div class="block m_t10"><span class="badge-0 right br-10 br-10px bg_10 "></span></div></div></div></a></div>';
  return ch;   
  }
};



//-----------------------------------------


var CH={
 Layout:function(x){
     var ch='<div class="block _bdy">';
  //data-junction="checkinsLayout"

    if(W.I.wf=='mob'){
   ch+='<div class="block">'
     +'<div class="block bg_0">'+CH.info(x)+'</div>'
     +'<div class="block bg_0">'+CH_L.t1(x)+'</div>'
   
     +'<div class="block"  >'+CH.Links(x)+'</div>'
     +'</div >';
       }
 if(W.I.wf=='web'){
var one='',two='';
one+='<div class="block bg_0">'+CH.info(x)+'</div>'
one+='<div class="block bg_0">'+CH_L.t1(x)+'</div>';
one+='<div class="block"  >'+CH.Links(x)+'</div>';

  var BlockList=[];
BlockList.push({name:"checkinPlatforminfo",htmlStr: '<div class="block" data-dynamicspotmanager="help:welcome:wowrol_index" ></div>'});
var setting ={
    name:'checkinPlatform',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};


two= W.T.Pager(setting);

 ch+=W.T.ColumnWrapXXX([one,two],['w-x-6','w-x-12 ma-l-5']); 
       }

     ch+='</div>';
     return ch;
 }  , 
 Links:function(x){//checkinexplorelinks
     var ch='';
var links=[];
var badge='<div class="block m_t5"><span class="badge-0 right br-10 br-10px bg_10 "></span></div>';
 links.push({ItemType:'tile',ItemData:{text:x.Ed[0].entityName,avatar:x.Ed[0].avatar,avatarsize:'x35',attrStr:' data-checkinPlatform="Storebrowing" ',help:'text_225'} });  

  links.push({ItemType:'link',ItemData:{text:'text_227',icon:'chats',attrStr:' data-checkinPlatform="Chats"  data-checkinlinks="Chats_'+x.updater_id+'" ',badge:badge,help:W.U.strformat( W.U.GetText('text_226'),x.Ed[0].entityName)} });  
  links.push({ItemType:'link',ItemData:{text:'text_228',icon:'suggestion',attrStr:' data-checkinPlatform="Suggestion" data-checkinlinks="Suggestion_'+x.updater_id+'"   ',badge:badge,help:W.U.strformat( W.U.GetText('text_233'),x.Ed[0].entityName)} });  
  links.push({ItemType:'link',ItemData:{text:'text_229',icon:'shortlist',attrStr:' data-checkinPlatform="ShortList" data-checkinlinks="ShortList_'+x.updater_id+'"   ',badge:badge,help:W.U.strformat( W.U.GetText('text_234'),x.Ed[0].entityName)} });
  links.push({ItemType:'link',ItemData:{text:'text_230',icon:'cart',attrStr:' data-checkinPlatform="Cart"  data-checkinlinks="Cart_'+x.updater_id+'"  ',badge:badge,help:W.U.strformat( W.U.GetText('text_235'),x.Ed[0].entityName)} });
  links.push({ItemType:'link',ItemData:{text:'text_231',icon:'staff',attrStr:' data-checkinPlatform="Members"   data-checkinlinks="Members_'+x.updater_id+'" ',badge:badge,help:W.U.strformat( W.U.GetText('text_236'),x.Ed[0].entityName)} });
  links.push({ItemType:'link',ItemData:{text:'text_232',icon:'checkout',attrStr:' data-checkinPlatform="Checkout" data-checkinlinks="Checkout_'+x.updater_id+'"   ',badge:badge,help:W.U.strformat( W.U.GetText('text_237'),x.Ed[0].entityName)} });

 ch+=W.U.CreateList(links,{cssClass:{li:'li bs-1 ',a:'block no-t-deco _Bdy'}});
     return ch;
 },
 checkinPlatformLayout:function(block){
      var x=block.objectdata;
      
      
         

 },
 info:function (x){
      
     var ch='<div class="block">'
     +'<div class="block _Bdy" ><a href="'+x.Ed[0].entityUrl+'" >'+W.U.strformat( W.U.GetText('text_106'),x.Ed[0].entityName)+'<a></div>'


     +'</div>';
     return ch;
 }

};


//------------------------------------------

var P={
 Storebrowing:function(){
   var SBData=W.U.StoreBrowsing.hi_SBdata();




 } ,  
 Chats:function(){
    var ch='<div class="block" data-junction="checkinsPlatformchatinit" ></div>';

    W.U.Junction('checkinsPlatformchatinit',function(){     W.U.Chat.init(this.Node);  },{}); 
    return ch;

 } ,  
 Suggestion:function(){
      var SBData=W.U.StoreBrowsing.hi_SBdata(); 

 } , 
 ShortList:function(){
      var SBData=W.U.StoreBrowsing.hi_SBdata(); 
 } , 
 Cart:function(){
      var SBData=W.U.StoreBrowsing.hi_SBdata(); 

 } , 
 Members:function(){
  var SBData=W.U.StoreBrowsing.hi_SBdata(); 

 } , 
Checkout:function(){
      var SBData=W.U.StoreBrowsing.hi_SBdata();     

} 
};

   W.T.checkins={CH_L:CH_L,CH:CH,P:P};

})(wowrol);