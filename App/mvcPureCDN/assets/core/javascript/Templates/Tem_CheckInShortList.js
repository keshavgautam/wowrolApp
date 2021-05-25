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


 var t={
     t0:function(){
        var ch='<div class="block ">';


  var SBData=W.U.Browsing.hi_SBdata();
  var slPD=SBData.slPD;
  var product_card=[];
    if(slPD.length>0){
     for(var q in slPD){
           var info=W.U.StoreBrowsing.GetPbankData(slPD[q],''); 
         if(W.U.isOK(info)){
            var CartCardsetting={quentity:0,closebtn:true,varientid:'',type:'shortlist',role:SBData.role,currencysymbol:SBData.currencydata.symbol};
           
         product_card.push( W.T.C.C2_CartCard(info,CartCardsetting)) ;        
         }      
     }    
    }





 ch+='<div class=" block _bdy h50  al-c tt-u ff-2 "><h3>Shortlist</h3></div>';
  if(product_card.length>0){
  ch+='<div class="block m_b10" ><div class="block  bg_0 " >'+product_card.join('')+'</div></div>'; 

  }else{
     ch+='<div class="block _bdy bg_0 m_b10"> <p class="al-c"> Nothing shorrtlisted yet.</p> </div>'; 
 }
       ch+='</div>';
        return ch;
     }

 }; 

function Layout(block){
 var header='',mid='',foot='',ch='';
 var SBData=block.objectdata,margintop=0;  
   header=storeheader(SBData);

 //mid+='<div class="block"  data-nodeid="checkinPlatformMenu'+SBData.checkIn_id+'"></div>';
 mid+='<div class="block"  data-nodeid="checkinPlatformShortListWalkway'+SBData.checkIn_id+'"></div>';

  switch(W.I.initType){
     case 0:
     
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatforShortList'+SBData.checkIn_id,margintop)+'</div>'; 
     break;  
     case 1:
  ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformShortList'+SBData.checkIn_id,margintop)+'</div>';    
     break; 
     case 2:
  if(W.I.wf=='web'){margintop=58; }
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformShortList'+SBData.checkIn_id,margintop)+'</div>'; 
     break;
     case 3:
     
     break;       
   }


    return  ch; 
}


W.T.CheckinShortList={
  Layout:Layout,  
t:t

};

 


})(wowrol);