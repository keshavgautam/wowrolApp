/*
* 
*/
; (function(W){
   "use strict";

W.U.CheckInMembers=(function(){

function MemberInit(){
    function Handler(){
        
       this.initmain();
       this.initfriends();
    }


    Handler.prototype.initmain=function(){

  var walkwayNode=getwalkwayNode(), SBData= W.U.StoreCheckIn.SBData;   

  var fixMainblock=this.rander(W.T.CheckinMembers.t.fixMember(SBData));
   W.U.Setview(walkwayNode.fixmain,fixMainblock,'html');

    }

    Handler.prototype.initfriends=function(){
   var walkwayNode=getwalkwayNode(), SBData= W.U.StoreCheckIn.SBData;   
   var _this=this;

  var suggestion = {
                    name: 'buyerfriend',
                    fireAfter: 4,
                    type: '4',
                    token: 'chips',
                    placeholder: 'Friend Name',
                    dropdownModule:'cardentity',
                    hover: false,
                    onselect:function(){
                       
                        _this.AddFriend(this.data.li_data);
                    }
                };
   if(SBData.role==1){//only main buyer able to add friend
  W.U.JunctionAdd(W.A.page.AppId,'spreadfrombuyerfriend',function(){
      W.U.suggestion.bind({Node:this.Node,Value:this.data})();  
  },suggestion); 

    }

     var fixMainblock=this.rander(W.T.CheckinMembers.t.friendsMember(SBData));
   W.U.Setview(walkwayNode.friends,fixMainblock,'html'); 

    }
    Handler.prototype.AddFriend=function(x){
      var   walkwayNode=getwalkwayNode();
        var _this=this;
     W.U.StoreBrowsing.EditCheckInFriend(x.id,x.af,1,walkwayNode.submitLoading,function(){
        console.log("callback");
    _this.initfriends();
    });
    }

    Handler.prototype.rander=function(x){
       
        var mainBlock=W.U.Rander(x); 

        return mainBlock;

    }



 new Handler();
}


//walkway--
function getwalkwayNode(){
 var Node=W.U.id("checkinmembercon").childNodes;
  
    return {fixmain:Node[0],
            friends:Node[2],
            submitLoading:Node[1],
            paging:Node[3]};
}
function Init(){
  var walkwayNode=getwalkwayNode();
     var SBData= W.U.StoreCheckIn.SBData;   
  W.U.AddDom(walkwayNode.fixmain,W.T.CheckinMembers.t.fixMember(SBData),'html');
}


//walkway--


// chat First loading
function FirstResponseLoad(){
   MemberInit();
}  


return {FirstResponseLoad:FirstResponseLoad};
})();



})(wowrol);