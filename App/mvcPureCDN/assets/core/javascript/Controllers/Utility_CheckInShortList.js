/*
* 
*/
; (function(W){
   "use strict";

   function shortlist(walkWay){
     function Handler(walkWay){
      
        this.walkWay=walkWay;  
  var SBData=W.U.Browsing.hi_SBdata();
     var slPD=SBData.slPD;
     var checkPids=W.U.Browsing.CheckPbankPids(slPD);
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
    

        var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.CheckinShortList.t.t0()+'</div></div>')[0];
var _this=this;
var mainBlock=RanderInDiv.childNodes;// do not disturb it
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
  id=data[0],type=data[1],
  slPD=SBData.slPD,
  slPD= W.U.removeInArray(slPD,id);
 W.U.Browsing.AddInShortList(id,0,Node,this.init.bind(this));   


}
 

   new Handler(walkWay);
}

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


W.U.Pager.addblockdata({name:'checkinPlatformShortList', htmlStr:W.T.CheckinShortList.Layout,objectdata:SBData});   

W.U.Pager.replacePage(pager,'checkinPlatformShortList');  

//----
setTimeout(function(){
      var walkWay=W.U.id('checkinPlatformShortListWalkway'+SBData.checkIn_id); 
 
shortlist(walkWay);
},100);
    
}

W.U.CheckInShortList={
 init:init   


};

})(wowrol);