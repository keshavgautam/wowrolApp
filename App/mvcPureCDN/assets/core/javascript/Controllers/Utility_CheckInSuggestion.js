/*
* 
*/
; (function(W){
   "use strict";

     function Suggestion(walkWay){
     function Handler(walkWay){
        this.walkWay=walkWay;   
       
  var SBData=W.U.Browsing.hi_SBdata();
 W.U.console(SBData);
 var suPD=SBData.suPD;
    var checkPids=W.U.Browsing.CheckPbankPids(suPD);
    W.U.console(checkPids);
     if(checkPids.length==0){
        this.init(); 
     }else{
     var _this=this;
         W.U.Browsing.LoadInPbank(checkPids,0,this.walkWay,function(){
            _this.init();
         });
     }    




   }
//--

Handler.prototype.init=function(){
var mainBlock=W.U.Rander(W.T.CheckinSuggestion.t.t0());
var _this=this;

 W.U.attrclick('[data-onremove]',mainBlock[0],innerConnecter1);
//W.U.attrclick('[role="checkinmenu"]',mainBlock[0],W.U.CheckInStoreBrowser.OnOuterLinkLoad);
 W.U.Setview(this.walkWay,mainBlock,'html'); 

 
    function innerConnecter1(){
        _this.onRemove(this); 
   }
}



Handler.prototype.onRemove=function(Node){
   var SBData=W.U.Browsing.hi_SBdata(),

 data=(Node['data-onremove']).split('-'),
  id=data[0],type=data[1] ,
  suPD=SBData.suPD,
  suPD= W.U.removeInArray(suPD,id);
 W.U.Browsing.AddInSuggestion(id,0,Node,this.init.bind(this));   


}
 

   new Handler(walkWay);
}

//--
function init(){
    var SBData=W.U.Browsing.hi_SBdata();
    var pager= 'mainpage';  

   //----------------
   switch(W.I.initType){
     case 0:
  

     break;  
     case 1:

     break; 
     case 2:
   pager= 'checkinPlatform';      
     break;
     case 3:
     
     break;       
   }


W.U.Pager.addblockdata({name:'checkinPlatformSuggestion', htmlStr:W.T.CheckinSuggestion.Layout,objectdata:SBData});   

W.U.Pager.replacePage(pager,'checkinPlatformSuggestion');  

//----
setTimeout(function(){
      var walkWay=W.U.id('checkinPlatformSuggestionWalkway'+SBData.checkIn_id); 
      W.U.console(walkWay);
Suggestion(walkWay);
},100)
    
}


W.U.CheckinSuggestion={
    init:init
};

})(wowrol);