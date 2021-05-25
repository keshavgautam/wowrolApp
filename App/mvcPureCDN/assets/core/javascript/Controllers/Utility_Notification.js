/*
* 
*/
; (function(W){
   "use strict";

 /*
  */
var PagingData={
   initent:'notification' ,
   TranseData:{}, 
   resultFlow:'bottom',
    onsucess:function(_this){
      W.U.console(_this);

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=Render(result,bypass);
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }  
};

function Render(result){
    var mainBlock=W.U.Rander('<div class="block ">'+W.T.Notifications.t.t0(result)+'</div>');




 return mainBlock;
}

/*

*/
function init(walkway){
    
var mainBlock=W.U.Rander(W.T.Notifications.Layout());
  W.U.Setview(walkway,mainBlock,'html');


   var TranseData = W.U.paging.GetTranseData('notification');
 
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
 W.U.paging.load('notification',TranseData);

}

 W.U.Notifications = {init:init,PagingData:PagingData};

})(wowrol);