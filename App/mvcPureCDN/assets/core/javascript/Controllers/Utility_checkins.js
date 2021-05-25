/*
* 
*/
; (function(W){
   "use strict";
 

//checkin listing layout

 /*
  */
   var checkInPagingData={
    initent:'checkInlist' ,
     TranseData:{},    
   onsucess:function(_this){
    //  W.U.console(_this);

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=checkInlistRender(result,bypass);
 
_this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
   
    for(var q in result){
var conversation=W.U.Chat.CreateConversationFromSBdata(result[q]);
   W.U.Chat.ConversationRailSetter(conversation);   
  W.U.Browsing.updateChatStrip(conversation,conversation.lmi);
       
    }  

  }  
   };

 /*
  *
  */
function checkInlistRender(result){
    var mainBlock=W.U.Rander('<div class="block ">'+W.T.checkins.CH_L.t0(result)+'</div>');
W.U.attrclick('[data-OpencheckinPlatform]',mainBlock[0],OpencheckinPlatform);



 return mainBlock;
}


function OpencheckinPlatform(){
        var Id=this['data-OpencheckinPlatform'];
      $(this).parent().children().removeClass('active');   $(this).addClass('active');
 
     var SBData=W.U.intentdata.get('checkInlist.'+Id);
     if(W.U.isOK(SBData)){
     


        SBData.mode=1;
   W.A.page.AppView.SBData=SBData;
     W.U.Browsing.init();  
     }else{
         debugger;
         W.F.Toast('unknown error occured.');
     }
    

}
/*
@des  Update the chekcin explore links
@call W.U.checkins.checkinexplorelinksUpdate
*/
function checkinexplorelinksUpdate(which,data){
    switch(which){
     case 'Chats':
      var update_id= data.updater_id;
      var Node=  $('[data-checkinlinks="Chats_'+update_id+'"]');
      if(W.U.isOK(Node)){
           Node.find('.infomessage').html(data.mesStr);
  
       Node.find('.badge-0').html(data.badgeStr);
      Node.addClass(data.AddCss).removeClass(data.removeCss);

      }
      // var mesStr=data.,badgeStr='',timeStr='',isRead;


     break;
     case 'All':
     var update_id= data.updater_id;
     var SuggestionNode= $('[data-checkinlinks="Suggestion_'+update_id+'"]');
     var ShortListNode= $('[data-checkinlinks="ShortList_'+update_id+'"]');
     var CartNode= $('[data-checkinlinks="Cart_'+update_id+'"]');
     var MembersNode= $('[data-checkinlinks="Members_'+update_id+'"]');
     var suggestion_str=(data.suPD.length>0)?data.suPD.length:'';
     var ShortList_str=(data.slPD.length>0)?data.slPD.length:'';
     var Cart_str=(data.cvD.length>0)?data.cvD.length:'';
     var Members_str=(data.Ed.length>0)?data.Ed.length:'';

       SuggestionNode.find('.badge-0').html(suggestion_str);
       ShortListNode.find('.badge-0').html(ShortList_str);
       CartNode.find('.badge-0').html(Cart_str);
       MembersNode.find('.badge-0').html(Members_str);
     break;
   
    }

}


  /*
  */
  function initcheckInList(){
      
   var TranseData = W.U.paging.GetTranseData('checkInlist');
    //W.U.console(TranseData);
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
 W.U.paging.load('checkInlist',TranseData);

  }
/*
*/
function List_init(walkway){

   var mainBlock=W.U.Rander(W.T.checkins.CH_L.Layout());

//W.U.attrclick('[data-OpenCoversationPlatform]',mainBlock[0],OpenCoversationPlatform);

  W.U.Setview(walkway,mainBlock,'html');

 initcheckInList();
  W.U.resize();
}
//-----------------------------------------------------------------
function checkinPlatform(){
  var Id=this['data-checkinPlatform'];
      $(this).parent().parent().children().removeClass('active');   $(this).parent().addClass('active');
   
    
     switch(Id){
     case 'Storebrowing':
   //  W.U.Pager.addblockdata({    name:'checkinPlatformStorebrowsing', htmlStr:W.T.checkins.P.Storebrowing}); 
var SBData=W.U.StoreBrowsing.hi_SBdata(); 
  W.U.CheckInStoreBrowser.init(SBData); 
       
     break; 
     case 'Chats':
     //W.U.Pager.addblockdata({  name:'checkinPlatformChats', htmlStr:W.T.checkins.P.Chats});   
var SBData=W.U.StoreBrowsing.hi_SBdata(); 
var conversation=W.U.Chat.CreateConversationFromSBdata(SBData);

   W.U.Chat.CoversationPlatformInit(SBData.cid);
  W.U.resize();
 


     break;
     case 'Suggestion':
     W.U.CheckinSuggestion.init();           
     break;
     case 'ShortList':
   
     W.U.CheckInShortList.init();         
     break;          
     case 'Cart':
     W.U.CheckInCart.init();     
     break;
     case 'Members':
W.U.CheckInMembers.init();              
     break; 
     case 'Checkout':
 
    W.U.CheckInCheckout.init();                
     break;                          
     }
 

}
/*
*/
function init(BOinfo,walkway){
      W.U.console(' check in  init '); 




var  SBData=W.U.Browsing.hi_SBdata();

     var conversation=W.U.Chat.CreateConversationFromSBdata(SBData);
   W.U.Chat.ConversationRailSetter(conversation);  





   var mainBlock=W.U.Rander(W.T.checkins.CH.Layout(SBData));
 W.U.attrclick('[data-checkinPlatform]',mainBlock[0],checkinPlatform);
    W.U.Setview(walkway,mainBlock,'html');  

 W.U.resize();

       W.U.checkins.checkinexplorelinksUpdate('All',SBData);

}






  W.U.checkins={
init:init,
List:List_init,      
checkInPagingData:checkInPagingData,
OpencheckinPlatform:OpencheckinPlatform,
checkinPlatform:checkinPlatform,
checkinexplorelinksUpdate:checkinexplorelinksUpdate
  };


})(wowrol);