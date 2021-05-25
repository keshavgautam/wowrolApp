/*
* 
*/
; (function(W){
   "use strict";
//--
function MemberInit(){
    function Handler(){
        
       this.initmain();
       this.initfriends();
    }


    Handler.prototype.initmain=function(){

  var walkwayNode=getwalkwayNode(),  SBData=W.U.Browsing.hi_SBdata();

  var fixMainblock=this.rander(W.T.CheckinMembers.t.fixMember(SBData));
  beforeinsert(fixMainblock);
   W.U.Setview(walkwayNode.fixmain,fixMainblock,'html');

    }

    Handler.prototype.initfriends=function(){
   var walkwayNode=getwalkwayNode(), SBData=W.U.Browsing.hi_SBdata();   
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
   W.U.attrclick('[data-btnremovemember]',fixMainblock[0],function(){
        var index=this['data-btnremovemember'];
       _this.removemember(index)
       
       });

   W.U.Setview(walkwayNode.friends,fixMainblock,'html'); 

    }
    Handler.prototype.AddFriend=function(x){
      var   walkwayNode=getwalkwayNode();
        var _this=this;
     W.U.StoreBrowsing.EditCheckInFriend(x.id,x.af,1,walkwayNode.submitLoading,function(){
        W.U.console("callback");
       

    _this.initfriends();
    });
    }

    Handler.prototype.rander=function(x){
       
        var mainBlock=W.U.Rander(x); 

        return mainBlock;

    }
    Handler.prototype.removemember=function(index){
         var  SBData=W.U.Browsing.hi_SBdata();  
         var x= SBData.Ed[index];
       var   walkwayNode=getwalkwayNode();
        var _this=this;
     W.U.StoreBrowsing.EditCheckInFriend(x.eid,'af',0,walkwayNode.submitLoading,function(){
        W.U.console("callback");
    _this.initfriends();
    });

    }


 new Handler();
}


function removemember(){
    var index=this['data-btnremovemember'],
     SBData= W.U.StoreCheckIn.SBData;  
    W.U.console(index);
}

//walkway--
function beforeinsert(mainblock){
   
}
//--
function getwalkwayNode(){
    var SBData=W.U.Browsing.hi_SBdata();
 var Node=W.U.id('checkinPlatformMembersWalkway'+SBData.checkIn_id).childNodes;
  
    return {fixmain:Node[0],
            friends:Node[2],
            submitLoading:Node[1],
            paging:Node[3]};
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


W.U.Pager.addblockdata({name:'checkinPlatformMembers', htmlStr:W.T.CheckinMembers.Layout,objectdata:SBData});   

W.U.Pager.replacePage(pager,'checkinPlatformMembers');  

//----
setTimeout(function(){
MemberInit();
},100);
    
}

//--
W.U.CheckInMembers={
     init:init  

};

})(wowrol);