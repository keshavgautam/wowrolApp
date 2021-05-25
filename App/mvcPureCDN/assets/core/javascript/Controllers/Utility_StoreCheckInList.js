 ;(function (W) {
     "use strict";
  

var paging={
 
     TranseData:{}, 
   resultFlow:'top',
    onsucess:function(_this){
  

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=W.U.Rander('<div class="block ">'+W.T.StoreCheckInList.t.t0(result)+'</div>');
 
_this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }      

};


var buyercheckinpaging={
       TranseData:{}, 
   resultFlow:'top',  
    onsucess:function(_this){
  
      
var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result,
buyer_id=_this.Data.TranseData.ifo.buyer_id;

var mainBlock=W.U.Rander('<div class="block ">'+W.T.StoreCheckInList.t.s0(result,buyer_id)+'</div>');
 
_this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }      
};






 W.U.ccbk.Add('pageloaded',function(){
  
 
  W.U.Pager.addblockdata({name:'goonshopping', htmlStr:W.T.StoreCheckInList.GoOnShoppingPage,presention:((W.I.wf!='mob')?'model':'page')});
    });



//-----------------------
  

W.U.StoreCheckInList={paging:paging,
buyercheckinpaging:buyercheckinpaging
};




 })(wowrol);