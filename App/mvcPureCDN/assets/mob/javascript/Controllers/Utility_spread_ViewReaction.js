/*
* 
*/
; (function(W){
   "use strict";

 var spreadViewReactionbank=[]; 
function AddInViewReactionBank(SpreadID,result,Tdata){
   
     var TranseData=spreadViewReactionbank[SpreadID];
   
      spreadViewReactionbank[SpreadID]=Tdata;
     var i=result.length;   
    for(var q in result){
       
  spreadViewReactionbank[SpreadID].result[i]=result[q];
  i++;
    }
      console.log(spreadViewReactionbank); 
   
}
function GetViewReactionTranseData(SpreadID){
   var defaultTranseData={
                ifo: { },  //info
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                pgd: 1   //paged
            };
  if(typeof spreadViewReactionbank[SpreadID] != 'undefined'){
      defaultTranseData=spreadViewReactionbank[SpreadID];
  }

  return defaultTranseData;
}
//--
function LoadData(SpreadID,Tdata){
    var walkwayNode=getwalkwayNode();
   var walkway=walkwayNode.main;
   var walkwayLoading=walkwayNode.Loading;
     Tdata.ifo.sid=SpreadID;
   if((Tdata.bypass==5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'spreadViewReaction', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

            var formData = {
                form: form,
                f_value: f_value
            };
          
                W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                Tdata.fr = 1;
                        // console.log(T)
                $(walkwayLoading).html( W.T.blockLoading());
                     
                    },
                    success: function (data) {
                 $(walkwayLoading).html('');
      Tdata.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
   var Hret = ret.mistake;
                   //     console.log(Hret);

                        }
                        if (ret.state == 200) {
                var Hret = ret.response;
            

                   Tdata.ps = Hret.pagesize;
                  Tdata.tp = Hret.totalpage;
                  Tdata.pgd = Hret.paged;
                 
              AddInViewReactionBank(SpreadID,Hret.result,Tdata);
                   Insert(Hret.result,Tdata.bypass);
                   SetPaging(SpreadID,Tdata);
                  Tdata.bypass = 0; 
                        }
                        
                    }

                }); 

   }   
}
function renderComment(result){
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.spread_ViewReaction.t0(result)+'</div></div>')[0];



 var mainBlock=RanderInDiv.childNodes;// do not disturb it



  

 return mainBlock;
}
function getwalkwayNode(){
    var Node=W.U.id("spreadViewReactionWrap").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            submitLoading:Node[0],
            paging:Node[3]};
}
function Insert(result,bypass){
  var walkwayNode=getwalkwayNode();
   var walkWay=walkwayNode.main;

     var mainBlock=renderComment(result);
    switch(bypass){
        case 1://html
 W.U.Setview(walkWay,mainBlock,'html');
        break;
        case 0://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
        case 5://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
        case 2://prepend
 W.U.Setview(walkWay,mainBlock,'prepend');
        break;
       case 3://replace
  
  var sp1=W.U('[data-commentcard="'+result[0].cid+'"]')[0];
  var parentDiv = sp1.parentNode;
parentDiv.replaceChild(mainBlock[0], sp1);
        break;
    }
}
function SetPaging(SpreadID,Tdata){
 var walkwayNode=getwalkwayNode();
 walkwayNode.paging
 if((Tdata.pgd <= Tdata.tp)&&Tdata.pgd!=0){

  var mainBlock=W.U.Rander(W.T.SpreadComment.S.paging(SpreadID));

    W.U.attrclick('[data-commentpaging]',mainBlock[0],function(){
        var sid=this['data-commentpaging'],
        TranseData = GetCommentTranseData(sid);
       TranseData.bypass = 5; 
        LoadComment(sid,TranseData);
    });
    W.U.Setview(walkwayNode.paging,mainBlock,'html');
 }else{
     W.U.Setview(walkwayNode.paging,'','html');
 }
  
} 

//--SpreadReactionInit
function SpreadReactionInit(){
    var taxonomy=[];
    taxonomy[0]=["Wow",'Unwow','Wowed','wowOn','wowOff'];
    taxonomy[1]=["Like",'Unlike','Liked','likeOn','likeOff'];
    taxonomy[2]=["Agree",'Disagree','Agreed','agreeOn','agreeOff'];
    taxonomy[3]=["Feel Sad",'Unfeel Sad','Felt Sad','feelsadOn','feelsadOff'];

function Handler(Node,ID){
    this.Node=Node;
    this.ID=ID;  
    if(typeof W.U.Spread !='undefined'){
        this.SpreadData=W.U.Spread.GetSpreadData(ID);   
    }else{
     this.SpreadData=null;
    }
 
    this.initid=this.ID+':'+W.U.uId();
  
    this.Node.setAttribute("data-sra",this.ID);//data-spreadreaction
    var _this=this;
     W.U.fn.lister("update",this.Node,function(e){
   
      _this.reactionUpdatedom();
    }); 

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
   var event = jQuery.Event("show");
    event.id = 'productListingback';
 $(W.U.id('block.productListingback')).parent().triggerHandler(event); 
    break; 
   default :
    W.U.Spread.backbinds(x);
      var event = jQuery.Event("show");
      event.id = 'spreadoneback';
  $(W.U.id('block.spreadoneback')).parent().triggerHandler(event); 
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
      _this.openComment(this); 
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
        var ch=' <div class="block _bdy "> <div class=" right"><div class="btn-group" role="group" ><a href="javascript:void(0);" class="btn btn-xs"  data-spreadreaction="'+this.ID+':'+qcstate+'" data-spreadnodeid="reaction:'+this.initid+'" >'+this.getqcbtnhtml()+'</a> <a href="javascript:void(0);" class="btn btn-xs"  data-spreadcomment ="'+this.ID+'" ><span class="vl-sp">'+commentName+'</span> ' + W.T.SVG('comment', 14, '#1274c0') + ' <i class="vl-sp" data-spreadnodeid="commentcount:'+this.initid+'">'+this.SpreadData.cmti.total+'</i> </a></div></div></div><div class="block "  data-spreadnodeid="reactionsummary:'+this.initid+'" >'+this.getsummeryhtml()+'</div></div>';

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
console.log(State);
console.log(this.SpreadData.qati);
var SraNode=W.U('[data-sra="'+this.ID+'"]');

for(var i=0;i<SraNode.length;i++){
W.U.fn.event("update",SraNode[i],{Node:Node});
}


}



 
}

 Handler.prototype.getqcbtnhtml=function(){
     
   
   var qcTotal= this.SpreadData.qati.total;
   var qat=W.U.positive(this.SpreadData.qat);
   var reName=taxonomy[qat]
    qcTotal=(qcTotal<=0)?'':qcTotal;
    var ch='';
    if(this.SpreadData.qati.self==0){
        ch+='<span class="vl-sp">'+reName[0]+'</span> <i >' + W.T.SVG(reName[4], 16, '#1274c0') + '</i> <i class="vl-sp">'+qcTotal+'</i>';
       
    }else{
          ch+='<span class="vl-sp">'+reName[2]+'</span> <i >' + W.T.SVG(reName[3], 16, '#1274c0') + '</i> <i class="vl-sp">'+qcTotal+'</i>';
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
    

      switch(this.appClass){
  case 'productPageStore':

var form =  W.T.ProductListing.S.c0(this.SpreadData);
var walkway=W.U.id("productListingbackpage");
var mainBlock=W.U.Rander(form);



 W.U.Setview(walkway,mainBlock,'html');
 this.backbinds({title:'View Comment',submitshow:false});

    break; 
   default :
   // for normal spread page
 var  ID=Node["data-spreadcomment"];

var SpreadData=W.U.Spread.GetSpreadData(ID);


var form =  W.T.Spread.S.c0(SpreadData);
var walkway=W.U.id("spreadoneback");
var mainBlock=W.U.Rander(form);




  W.U.Setview(walkway,mainBlock,'html');

this.backbinds({title:'View Comment',submitshow:false});

    }





 }
  Handler.prototype.openViewReactionActor=function(Node){


     switch(this.appClass){
  case 'productPageStore':
var form =  W.T.ProductListing.S.ViewReactionWrap(this.SpreadData);
var walkway=W.U.id("productListingbackpage");






    break; 
   default :
 var ID=( Node["data-viewreactionactor"]);
var SpreadData=W.U.Spread.GetSpreadData(ID);
var form =  W.T.Spread.S.ViewReactionWrap(SpreadData);
var walkway=W.U.id("spreadoneback");

    }




var mainBlock=W.U.Rander(form);

  W.U.Setview(walkway,mainBlock,'html');

this.backbinds({title:'View Reaction ',submitshow:false});








 }
 Handler.prototype.reactionUpdatedom=function(){
     var  _this=this;var GetNode=W.U.Spread.GetSpreadNode;
 W.U.AddDom(GetNode('commentcount:'+this.initid),this.SpreadData.cmti.total,'html');   
 W.U.AddDom(GetNode('reaction:'+this.initid),this.getqcbtnhtml(),'html');

 var mainBlock=W.U.Rander(this.getsummeryhtml());
   W.U.attrclick('[data-viewreactionactor]',mainBlock[0],function(){
      _this.openViewReactionActor(this); 
  });

W.U.Setview(GetNode('reactionsummary:'+this.initid),mainBlock,'html');  


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


 new Handler(this.Node,this.ID);
}




//--==init=--
function initWrap(spreadData){

 var TranseData = GetViewReactionTranseData(spreadData.sid);
 console.log(TranseData);
 if(TranseData.pgd==1){
    TranseData.bypass = 1; 
   LoadData(spreadData.sid,TranseData);
 }else{
     var reverse=TranseData.result;
       Insert(reverse,1); 
      SetPaging(spreadData.sid,TranseData);
 }



 
} 
function init(){
    var walkway=this.Node;
    var spreadData=this.spreadData;
var mainBlock=W.U.Rander(W.T.spread_ViewReaction.Wrap(spreadData));
W.U.Setview(walkway,mainBlock,'html');
initWrap(spreadData);

  
}   
 W.U.spread_ViewReaction={
     init:init,
     SpreadReactionInit:SpreadReactionInit
 };

})(wowrol);