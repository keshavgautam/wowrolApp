/*
* 
*/
; (function(W){
   "use strict";
var PagingData={
     TranseData:{}, 
   resultFlow:'bottom',
    onsucess:function(_this){
    

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result,
tab=_this.Data.TranseData.ifo.tab;
var mainBlock=Rander(result,bypass,tab);  ;
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
    if(bypass==0){
  $(walkWay).addClass('G2');
} 

  }   


};

function Rander(result,bypass,tab){

     switch(tab){
  case "Store":
         case "store":
 var mainBlock=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.store(result)+'</div></div>');  
         break;
   case "feedback":
 var mainBlock=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.feedback(result)+'</div></div>');  
         break;
   case "info0":
 var mainBlock=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.info(result)+'</div></div>');  
         break;
  case "info1":
 var mainBlock=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.info(result)+'</div></div>');  
         break;
case 'all_categories':
 var mainBlock=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.c0(result)+'</div></div>');
break;
case 'all_products':

var mainBlock=W.U.Rander(W.T.ProfieTabViewer.p0(result));  

break;

  default:
  //--

     switch(bypass){
        case 1://html
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.t0(result)+'</div></div>')[0];
        break;
   default:
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.t00(result)+'</div></div>')[0];
   
    }
var mainBlock=RanderInDiv.childNodes;// do not disturb it

  //--
     }
   





  

 return mainBlock;  
}




function init(){
    var walkway=this.Node;
    var tab=this.tab;
   

    if(!W.U.Pager.IspagerAdded('profileTabPlatform')){
  var mainBlock=W.U.Rander( W.T.ProfieTabViewer.Layout());
W.U.Setview(walkway,mainBlock,'html'); 
   }

 


  var TranseData = W.U.paging.GetTranseData('ProfieTab:'+tab);
  if( W.U.ObjectLength(TranseData)>0){

     W.U.Pager.togglePage('profileTabPlatform',tab+'TabPage');   
   
      }else{


  switch(tab){
        case'spreads':

 
W.U.Pager.addblockdata({name:tab+'TabPage',htmlStr: W.T.ProfieTabViewer.spreadsTabPage,objectdata:{tab:'store'}});
        break;
     
       default:


W.U.Pager.addblockdata({name:tab+'TabPage',htmlStr: W.T.ProfieTabViewer.TabPage,objectdata:{tab:tab}});
         
      } 
  
W.U.ccbk.Add('viewloaded',function(){W.U.paging.DeleteTranseData('ProfieTab:'+tab); W.U.Pager.DeleteBlock(tab+'TabPage');      } );



         W.U.Pager.DirectInitPage('profileTabPlatform',tab+'TabPage');   
      var  TranseData = W.U.paging.GetTranseData('ProfieTab:'+tab);   
           W.U.paging.load('ProfieTab:'+tab,TranseData);        
      }

 W.U.ccbk.Add('viewloaded',function(){
     W.U.Pager.DeletePager('profileTabPlatform');
    });

}


 W.U.ProfieTabViewer={init:init,
PagingData:PagingData
 };

})(wowrol);