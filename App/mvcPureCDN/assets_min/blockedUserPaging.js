/*
* 
*/
; (function(W){
   "use strict";


/*
@call W.U.blockedUserManageing.DeactivatePage
**/
function DeactivatePage(){
    var appView=W.A.page.AppView;
    var type= appView.EntityStripdata.type;
    var text =(type==0)?'help_9':'help_10';





    var Jid=W.U.J(function(){
        this.Node.onclick=function(){
            
    var loadingId= W.F.Load('deactivation',{});
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
  
       });
     W.U.ccbk.Run('load'+loadingId );  
        }


    },{});





        var header=W.T.DashbordFormHeader({titleText:'text_9',submitbutton:false,backblock:W.I.dpbf});

  var ch='<div class="block _Bdy bg_0 bs-1" >'
    +'<div class="block al-l m_b10 _Bdy"><p>'+text+'</p></div>'
    +'<div class="block "><a href="javascript:void(0);" class="btn btn-primary btn-block fs14"  data-junction="'+Jid+'" >text_9</a></div>'


    +'</div>' ;

          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;  
}





/**/




   var t={
 t0:function(x){
         var ch = ''; 
         
        if(x.length>0){
            ch = '<div class="block ul">';
   for(var q in x){
           
ch+='<div class="li _Bdy"><div class="span no-p-l"><span  class="fw-b tt-c">'+x[q].ESd.entityName+'</span> <span class="ma-l-10 "><a href="javascript:void(0);" data-junction="unblockuser"  data-eid="'+ x[q].ESd.eid+'" data-af="'+ x[q].owr.af+'"  >Unblock</a></span> </div></div>';
            }
              ch+='</div>';  
  }else{
         ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">help_42</div>';  
  }   
    
            return ch;
    }       

   };



   var Paging={
 resultFlow:'bottom',
    onsucess:function(_this){
     

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=Render(result,bypass);
 
 _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
   function Render(result,bypass){

    var mainBlock=W.U.Rander(t.t0(result,bypass));
  
    


 return mainBlock;
}  

  }     



};


function init(Node){
        var  PagingData=Paging;
  PagingData.TranseData={ifo:{},pgd:1};
  PagingData.Node=  Node;
 
 PagingData.initent= 'getblockuserlist';
  W.U.paging.init(PagingData);
    var TranseData = W.U.paging.GetTranseData( PagingData.initent);
   
    if(TranseData.pgd==1||TranseData.pgd==0){
    W.U.paging.load(PagingData.initent,TranseData); 
    }
}



   W.U.blockedUserManageing={
       init:init,
       paging:Paging,
       DeactivatePage:DeactivatePage


   };

    })(wowrol);