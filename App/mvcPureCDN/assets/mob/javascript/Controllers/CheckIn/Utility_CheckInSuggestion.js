/*
* 
*/
; (function(W){
   "use strict";

W.U.CheckInSuggestion=(function(){

      function init(walkWay){
     function Handler(walkWay){
        this.walkWay=walkWay;   
       
 var SBData= W.U.StoreCheckIn.SBData; 
 var suPD=SBData.suPD;
    var checkPids=W.U.StoreBrowsing.CheckPbankPids(suPD);
    console.log(checkPids);
     if(checkPids.length==0){
        this.init(); 
     }else{
     var _this=this;
         W.U.StoreBrowsing.LoadInPbank(checkPids,0,this.walkWay,function(){
            _this.init();
         });
     }    




   }
//--

Handler.prototype.init=function(){
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.CheckinSuggestion.t.t0()+'</div></div>')[0];
var _this=this;
var mainBlock=RanderInDiv.childNodes;// do not disturb it
 W.U.attrclick('[data-onremove]',mainBlock[0],innerConnecter1);
W.U.attrclick('[role="checkinmenu"]',mainBlock[0],W.U.CheckInStoreBrowser.OnOuterLinkLoad);
 W.U.Setview(this.walkWay,mainBlock,'html'); 

 
    function innerConnecter1(){
        _this.onRemove(this); 
   }
}



Handler.prototype.onRemove=function(Node){
   var SBData= W.U.StoreCheckIn.SBData,

 data=(Node['data-onremove']).split('-'),
  id=data[0],type=data[1] ,
  suPD=SBData.suPD,
  suPD= W.U.removeInArray(suPD,id);
 W.U.StoreBrowsing.AddInSuggestion(id,0,Node,this.init.bind(this));   


}
 

   new Handler(walkWay);
}



  // chat First loading
function FirstResponseLoad(){

        
  var  walkWay=W.U.id('checkinsuggestioncon');

 init(walkWay); 
    
}  


return {FirstResponseLoad:FirstResponseLoad};
})();



})(wowrol);