/*
* 
*/
; (function(W){
   "use strict";
 
//--
function SpreadReactionInit(Node,ID){
    var taxonomy=[];
    taxonomy[0]=["Wow",'Unwow',' Wow','wowOn','wowOff'];
    taxonomy[1]=["Like",'Unlike','Liked','likeOn','likeOff'];
    taxonomy[2]=["Agree",'Disagree','Agree','agreeOn','agreeOff'];
    taxonomy[3]=["Feel Sad",'Unfeel Sad','Sad','feelsadOn','feelsadOff'];

function Handler(Node,ID){
    this.Node=Node;
    this.ID=ID;  
    if(typeof W.U.Spread !='undefined'){
        this.SpreadData=W.U.intentdata.get('spread.'+ID); 
    }else{
     this.SpreadData=null;
    }
 
    this.initid=this.ID+':'+W.U.uId();
  
 
    var _this=this;

    /* we set reference to the Node and run 'SpreadReactionUpdate+ID' ccbk callback to update
    * W.U.ccbk.Run(_this.Node,'SpreadReactionUpdate'+ID);
    */
   W.U.ccbk.Add('SpreadReactionUpdate'+ID,function(){
         W.U.ccbk.Run(_this.Node,'update'); 

   });

      W.U.ccbk.Add(this.Node,'update',function(){_this.reactionUpdatedom()});//for updateing reaction count
   
    if(this.SpreadData !=null){
       this.init(); 
    }else{
        this.LoadSpread();
    }

    if(W.A.page.AppId=='productPageStore'||W.A.page.AppId=='checkins'){
     this.appClass="productPageStore";   
    }else{
           this.appClass="spread";    
    }



  
    }

Handler.prototype.backbinds=function(x){
    switch(this.appClass){
 case 'productPageStore':
 //   W.U.ProductListing.backbinds(x);
//   var event = jQuery.Event("show");
 //   event.id = 'productListingback';
// $(W.U.id('block.productListingback')).parent().triggerHandler(event); 
    break; 
   default :
  //  W.U.Spread.backbinds(x);
   //   var event = jQuery.Event("show");
    //  event.id = 'spreadoneback';
 // $(W.U.id('block.spreadoneback')).parent().triggerHandler(event); 
    }


}

 Handler.prototype.init=function(){
      var _this=this;
   this.createMarkup(); 
     var tableMarkup = '<div class="block   " >'+this.reactionStrip+'</div>';
 var mainBlock=W.U.Rander(tableMarkup);
  W.U.attrclick('[data-spreadreaction]',mainBlock[0],function(){
      _this.onSpreadReaction(this); 
  });
   W.U.attrclick('[data-spreadcomment]',mainBlock[0],function(){
       if(W.A.page.AppId!="spread"){
       _this.openComment(this);     
       }
      
  });
    W.U.attrclick('[data-viewreactionactor]',mainBlock[0],function(){
      _this.openViewReactionActor(this); 
  });
 W.U.Setview(this.Node,mainBlock,'html');
      }
 Handler.prototype.createMarkup=function(){

    this.reactionStrip=CreatereactionStrip.bind(this)();
 


    function CreatereactionStrip(){
     var qcstate=(this.SpreadData.qati.self==0)?0:2;
    var commentName=(this.SpreadData.prpo=="11")?'Reviews':'Comments';
     var   cmtiTotal=  numeral( this.SpreadData.cmti.total).format('0 a');
     cmtiTotal=( cmtiTotal==0)?'':cmtiTotal;
     
    var ch='';
          if(W.A.page.AcessData.LoginStatus){
         ch=' <div class="block _bdy "> <div class=" right"><div class="btn-group" role="group" ><a href="javascript:void(0);" class="btn btn-xs"  data-spreadreaction="'+this.ID+':'+qcstate+'" data-spreadnodeid="reaction:'+this.initid+'"  >'+this.getqcbtnhtml()+'</a> <a href="javascript:void(0);" class="btn btn-xs "  data-spreadcomment ="'+this.ID+'" ><span class="vl-sp ">'+commentName+'</span><i class="ad-1"> ' + W.T.SVG('comment', 14, '#1274c0') + '</i> <i class="vl-sp " data-spreadnodeid="commentcount:'+this.initid+'">'+cmtiTotal+'</i> </a></div></div></div><div class="block "  data-spreadnodeid="reactionsummary:'+this.initid+'" >'+this.getsummeryhtml()+'</div></div>'; 
          }else{
               ch=' <div class="block _bdy "> <div class=" right"><div class="btn-group" role="group" ><a href="javascript:void(0);" class="btn btn-xs"  data-pagertogglepage="mainpage:ForceLogin"   >'+this.getqcbtnhtml()+'</a> <a href="javascript:void(0);" class="btn btn-xs " data-pagertogglepage="mainpage:ForceLogin"   ><span class="vl-sp ">'+commentName+'</span><i class="ad-1"> ' + W.T.SVG('comment', 14, '#1274c0') + '</i> <i class="vl-sp " >'+cmtiTotal+'</i> </a></div></div></div><div class="block "  >'+this.getsummeryhtml()+'</div></div>';     
          }
        return ch;
    }

      }
 Handler.prototype.onSpreadReaction=function(Node){
 var Datastr=( Node["data-spreadreaction"]).split(":"), 
 ID=Datastr[0],
 State=parseInt(Datastr[1]);


 if(State==0||State==2){
     Node["data-spreadreaction"]=ID+":1";

if(State==0&&this.SpreadData.qati.self==0){
    this.SpreadData.qati.total++;
    this.SpreadData.qati.self=1;

      this.submitreaction(1);

  
   Node["data-spreadreaction"]=this.ID+":2";
}
if(State==2&&this.SpreadData.qati.self==1){
this.SpreadData.qati.total--
if(this.SpreadData.qati.total<0){
    this.SpreadData.qati.total==0;
}
   this.SpreadData.qati.self=0;
 
   this.submitreaction(0);
 
  Node["data-spreadreaction"]=this.ID+":0";
}
W.U.console(State);
W.U.console(this.SpreadData.qati);


W.U.ccbk.Run('SpreadReactionUpdate'+this.ID);


}



 
}

 Handler.prototype.getqcbtnhtml=function(){
     
   
   var qcTotal= this.SpreadData.qati.total;
   var qat=W.U.positive(this.SpreadData.qat);
   var reName=taxonomy[qat]
    qcTotal=(qcTotal<=0)?'':qcTotal;
    var ch='';
 
   var  sortqcTotal=  numeral( qcTotal).format('0 a');
    if(this.SpreadData.qati.self==0){
        ch+='<span class="vl-sp ">'+reName[0]+'</span> <i class="ad-1">' + W.T.SVG(reName[4], 16, '#1274c0') + '</i> <i class="vl-sp "  >'+sortqcTotal+'</i>';
       
    }else{
          ch+='<span class="vl-sp ">'+reName[2]+'</span> <i class="ad-1">' + W.T.SVG(reName[3], 16, '#1274c0') + '</i><i class="vl-sp "  >'+sortqcTotal+'</i>';
    }



    return ch;

   }

 Handler.prototype.getsummeryhtml=function(){
    var qcTotal= this.SpreadData.qati.total;
    var qat=W.U.positive(this.SpreadData.qat);
   var reName=taxonomy[qat]
    var ch='';
    if(qcTotal>0){
        ch+='<div class="block _bdy b_gtl" ><div class="left " >';
      if(this.SpreadData.qati.self==1&&qcTotal==1){
 ch+='<p>You  wowed on this. </p>';
       
    }

    if(this.SpreadData.qati.self==1&&qcTotal>1){

 ch+='<p>You and  <a href="javascript:void(0);" data-viewreactionactor="'+this.SpreadData.sid+'"  >'+(qcTotal-1)+' people</a> '+reName[2]+' on this. </p>';
       
    }
     if(this.SpreadData.qati.self==0&&qcTotal>0){
          
 ch+='<p> <a href="javascript:void(0);" data-viewreactionactor="'+this.SpreadData.sid+'" >'+qcTotal+' people</a> '+reName[2]+' on this. </p>';
    }   
        ch+='</div>';
    }
   return ch;
    }

 Handler.prototype.openComment=function(Node){
 var wf=  W.A.page.AcessData.visit_data.wf;
    var defaultComment={"ESd":[],"sid":this.SpreadData.sid,"eid":0,"cid":0,"veid":"","ctt":'',"date":"","date_gmt":"","qati":{"total":0,"self":0,"pyi":0,"type":0},"rf":{"show":0,"value":0}};
  W.U.intentdata.add('spreadcomment.0',defaultComment);

 var CommentData=W.U.intentdata.get('spreadcomment.0'); 

 if(wf=='mob'){
    switch(this.appClass){
  case 'productPageStore':



    break; 
   default :
   // for normal spread page

 
    } 
     W.U.Pager.addblockdata({    name:'spreadCommentView'+this.SpreadData.sid, htmlStr:W.T.SpreadComment.mobLayout,objectdata:{SpreadData:this.SpreadData,CommentData:CommentData}});

  W.U.Pager.DirectTogglePage('mainpage','spreadCommentView'+this.SpreadData.sid);  
 }
  if(wf=='web'){
     switch(this.appClass){
  case 'productPageStore':
      W.U.Pager.addblockdata({    name:'spreadCommentView'+this.SpreadData.sid, htmlStr:W.T.SpreadComment.mobLayout,objectdata:{SpreadData:this.SpreadData,CommentData:CommentData},presention:'model'});

  W.U.Pager.DirectTogglePage('mainpage','spreadCommentView'+this.SpreadData.sid);  


    break; 
   default :
   // for normal spread page
  W.U.ccbk.Run('webspreadcommentshow'+this.SpreadData.sid);   

    } 
 }
      





 }
 Handler.prototype.openViewReactionActor=function(Node){
 var wf=  W.A.page.AcessData.visit_data.wf;
       var ID=( Node["data-viewreactionactor"]);



     if(wf=='mob'){
    switch(this.appClass){
  case 'productPageStore':



    break; 
   default :

    
    } 

       // for normal spread page

 W.U.Pager.addblockdata({    name:'spreadViewReactionActor'+ID, htmlStr: W.T.spread_ViewReaction.mobLayout,objectdata:{SpreadData:this.SpreadData}});

  W.U.Pager.DirectTogglePage('mainpage','spreadViewReactionActor'+ID); 
 }
  if(wf=='web'){
     W.U.console('openViewReactionActor');   W.U.console(ID);
      W.U.Pager.addblockdata({    name:'spreadViewReactionActor'+ID, htmlStr: W.T.spread_ViewReaction.mobLayout,objectdata:{SpreadData:this.SpreadData},presention:'model'});

  W.U.Pager.DirectTogglePage('mainpage','spreadViewReactionActor'+ID); 
 }











 }
 Handler.prototype.reactionUpdatedom=function(){
 var _this=this,
 GetNode=W.U.Spread.GetSpreadNode,
 commentcountNode=GetNode('commentcount:'+this.initid),
 reactionNode=GetNode('reaction:'+this.initid),
 reactionsummary=GetNode('reactionsummary:'+this.initid)
 ;
  if(W.U.isOK(commentcountNode)){
      W.U.AddDom(commentcountNode,this.SpreadData.cmti.total,'html');  
  }
   if(W.U.isOK(reactionNode)){
    W.U.AddDom(reactionNode,this.getqcbtnhtml(),'html');
  } 

 
  var mainBlock=W.U.Rander(this.getsummeryhtml());
   W.U.attrclick('[data-viewreactionactor]',mainBlock[0],function(){
      _this.openViewReactionActor(this); 
  });
     if(W.U.isOK(reactionsummary)){
 W.U.Setview(reactionsummary,mainBlock,'html');  
  } 

 }

 Handler.prototype.submitreaction=function(x){
     var spreadID=this.ID;
       var formData = {
                    form: 'spreadreaction',
                    f_value:{self:x,sid:spreadID}
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
       
            
                    },
                    success: function (data) {
                      
                   var ret = JSON.parse(data);
          
                        if (ret.state == 500) {

 
                        }
                        if (ret.state == 200) {
                            //--
 var SraNode=W.U('[data-sra="'+spreadID+'"]');

for(var i=0;i<SraNode.length;i++){

W.U.fn.event("update",SraNode[i],{});
}
//--
     
          
                     
                              }
 
                    }

                });

 },
 Handler.prototype.LoadSpread=function(){
     var _this=this;
     var formData = {
                    form: 'spreadloadbyID',
                    f_value:{sid:_this.ID}
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
       
            
                    },
                    success: function (data) {
                      
                   var ret = JSON.parse(data);
          
                        if (ret.state == 500) {

 
                        }
                        if (ret.state == 200) {
 
     _this.SpreadData=ret.response[0];
      _this.init(); 
                     
                              }
 
                    }

                });
 }


 new Handler(Node,ID);
}


//--
//--==Paging==--

  var PagingData={
   onsucess:function(_this){
 

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=render(result);
 
    switch(bypass){
        case 1://html
 W.U.Setview(walkWay,mainBlock,'html');
        break;
        case 0://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
        case 5://prepend 
 W.U.Setview(walkWay,mainBlock,'prepend');
        break;
        case 2://prepend
 W.U.Setview(walkWay,mainBlock,'prepend');
        break;
      
    }
      
 
     //
     

  },
  TranseData:{},
  initent:'spreadViewReaction'
 

  };

  function render(result){
    var mainBlock=W.U.Rander('<div class="block ">'+W.T.spread_ViewReaction.t0(result)+'</div>');


 

 return mainBlock;
}







//--==Paging==--

function init(){
    var TranseData = W.U.paging.GetTranseData('spreadViewReaction');
    W.U.console(TranseData);
     if(TranseData.pgd==1){
    TranseData.bypass = 1; 
 
 W.U.paging.load('spreadViewReaction',TranseData);   

} 

}

 W.U.spread_ViewReaction={
     init:init,
     SpreadReactionInit:SpreadReactionInit,
     PagingData:PagingData
 };

})(wowrol);