/*
* 
*/
; (function(W){
   "use strict";
     
//--header
function storeheader(SBData){
    var ch='';
    var space='<div class="di-td "><span class="hidden">sd</span></div >';
    var buttonClass=(W.I.wf=='mob')?'header-link-btn':'header-cell';

var backbutton='<div class="di-td  vl-t "><a href="javascript:void(0);" class="block '+buttonClass+'" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a></div >';



var y=W.U.Browsing.ParseEntityData(SBData.Ed);

   var title='<div class="di-td vl-t  _bdy w212 p1"><div class=" _pnl ma-l-5"><span class="pnl0 truncate ">'+y.entityName+'</span><span class="pnl1 "></span><span class="pnl2  right tt-l"></span></div></div >';
   var avatar='<div class="di-td _bdy">  <a href="javascript:void(0);"> <img class=" round x35" alt="64x64" src="'+y.avatar+'"  > </a></div>';
   if(W.I.wf=='mob'){
     ch+='<div class="block bg_1 fg_6">'  ;
    ch+=backbutton;
   ch+=avatar;
    ch+=title;
     ch+='</div >' ;
   }
   if(W.I.wf=='web'){
     ch+='<div class="block bs-1 bg_0">'  ;
      ch+=avatar;
   ch+=title;
  ch+=space;
     ch+='</div >' ; 
   }

return ch;
}


function Layout(block){
    var header='',mid='',foot='';
    var SBData=block.objectdata,margintop=0;

   header=storeheader(SBData);

 mid+='<div class="block"  data-nodeid="StoreBrowserMenu'+SBData.checkIn_id+'"></div>';
 mid+='<div class="block"  data-nodeid="StoreBrowserWalkway'+SBData.checkIn_id+'"></div>';


if(W.I.wf=='web'){margintop=58; }
   return  '<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'Storebrowing'+SBData.checkIn_id,margintop)+'</div>'; 

}




   W.T.CheckInStoreBrowser={
    Layout:Layout   

   };


})(wowrol);