/*
* 
*/
; (function(W){

var donefriendPagingData={
   initent:'donefriend' , 
   resultFlow:'bottom',
    onsucess:function(_this){
  

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=W.U.Rander(W.T.FreindRequest.t.d0(result));
   _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }  
}
//--------------------------


var suggestfriendPagingData={
   initent:'suggestfriend' , 
   resultFlow:'bottom',
    onsucess:function(_this){
  

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=(function(result,bypass){
    
    return W.U.Rander(W.T.FreindRequest.t.s0(result));

})(result,bypass);
   _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }  
}





//----------------------
     /*
  */
var PagingData={
   initent:'friendrequest' ,
   TranseData:{}, 
   resultFlow:'bottom',
    onsucess:function(_this){

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=W.U.Rander(W.T.FreindRequest.t.t0(result));
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }  
};



/*

*/
function init(walkway){
    
var mainBlock=W.U.Rander( W.T.FreindRequest.Layout());
  W.U.Setview(walkway,mainBlock,'html');


   var TranseData = W.U.paging.GetTranseData('friendrequest');
 
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
W.U.paging.load('friendrequest',TranseData);
 //---------
    var TranseData = W.U.paging.GetTranseData('suggestfriend');
  
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
 W.U.paging.load('suggestfriend',TranseData);
  //---------
    var TranseData = W.U.paging.GetTranseData('donefriend');
  
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
W.U.paging.load('donefriend',TranseData);

}





 W.U.FreindRequest={
 init:init,
PagingData:PagingData,
donefriendPagingData:donefriendPagingData,
suggestfriendPagingData:suggestfriendPagingData


   };



})(wowrol);