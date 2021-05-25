/*
* 
*/
; (function(W){
   "use strict";
var PagingData={
   initent:'myshops' ,
   TranseData:{}, 
   resultFlow:'bottom',
    onsucess:function(_this){
   

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=Render(result,bypass);
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }  
};
function Render(result){
    var mainBlock=W.U.Rander('<div class="block ">'+W.T.myshops.t.t0(result)+'</div>');




 return mainBlock;
}
/*
*/
function init(walkway){
     
var mainBlock=W.U.Rander(W.T.myshops.Layout());
  W.U.Setview(walkway,mainBlock,'html');


   var TranseData = W.U.paging.GetTranseData('myshops');

   TranseData.bypass = 1; 
   TranseData.pgd = 1;    

 W.U.paging.load('myshops',TranseData);
}


   W.U.myshops={init:init,PagingData:PagingData};




 })(wowrol);