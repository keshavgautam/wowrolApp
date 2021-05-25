; (function (W) {
    "use strict";
    var AppId = W.A.page.AppId;
  var spreadCommentNode=[]; 
//--==submit==--


function CommentSubmitData(SpreadData,CommentData){
    


var formData={
              SpreadData:SpreadData,   
              CommentData:CommentData,
              reset:true,
              buttonupdate:true,
              insertmode:2
                };
var  spreadID= formData.SpreadData.sid;

var formLogic =function() {
var spreadData= this.formData.SpreadData;
    var f_value ={},
      error=2, alert_mes = [];

   f_value = W.F.walk_way_all(['commenttext','cid'],this.formname);     

 if(spreadData.prpo=="11"||spreadData.prpo=="12"){
     error=3;
 f_value = W.F.walk_way_all(['commenttext','cid','ratingpoint'],this.formname); 
 if(spreadData.rfinfo.cid!=0){
     this.formData.buttonupdate=false;
 }
  this.formDatareset=false;
 }
  var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;




 f_value.sid=spreadData.sid;
 f_value.prpo=spreadData.prpo;
 if(f_value.cid!=0){
 this.formData.insertmode=3;
 }

 if( W.U.trim(f_value.commenttext)==''&&(f_value.sid==0||f_value.sid=='')){
    error++; 
 }








      
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes}); 
    W.U.console(this);

       
var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };

      return ret;
}    
var onprogress=function(){  
 

    W.U.paging.Loading('spreadcomment:'+spreadID,'submitshow');
     }
var onsuccess=function(){

 var response=this.data,
 formData=this.form.formData,
  buypass=0,
   spreadID= formData.SpreadData.sid;
   W.U.paging.Loading('spreadcomment:'+spreadID,'hide');
 if(this.form.formData.CommentData.cid!=0){buypass=3; }
     



 if(formData.buttonupdate){
  formData.SpreadData.cmti.total++;   
   W.U.ccbk.Run('SpreadReactionUpdate'+spreadID);
 }

  if(formData.SpreadData.prpo=="11"||formData.SpreadData.prpo=="12"){
     formData.SpreadData.rfinfo=response[0];
     buypass=3
 }  


   W.U.paging.AddRow('spreadcomment:'+spreadID,response,buypass);
      W.U.ccbk.Run(this.form.form,'reset',formData); 
      if( W.I.AppId!='spread'&& W.I.wf=='mob'){
         W.U.ccbk.Run(W.U.id('bottomfixwrap.spreadComment'+spreadID),'resizeouter');    
      }
 

     }
var onerror=function(){ 


 }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:W.T.SpreadComment.commentFromBody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };
 //       
         
     return    Ragisterdata;  
}

//--==submit==--

//--==Paging==--

  var PagingData={
   onsucess:function(_this){
    

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=render(result);
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

    if(bypass==4){
          W.U.Pager.togglePage('mainpage','spreadCommentView'+_this.Data.TranseData.ifo.sid);   
    }
     //
     

  },
  TranseData:{},
  initent:'spreadcomment',
  resultFlow:'top'
 

  };

  function render(result){
    var mainBlock=W.U.Rander('<div class="block ">'+W.T.SpreadComment.S.t0(result)+'</div>');


  W.U.attrclick('[data-commentedit]',mainBlock[0],onclickcommenteditask);
  W.U.attrclick('[data-commentdeleteask]',mainBlock[0],onclickcommentdeleteask);

 return mainBlock;
}







//--==Paging==--
//--==edit==--

function onclickcommenteditask(){
 var Datastr=(this['data-commentedit']).split(":"); 
  var cid=Datastr[1], sid=Datastr[0];  
  var comment_data=W.U.intentdata.get('spreadcomment:'+sid+'.'+cid); 
 
 W.U.console(Datastr);
 var Modeldata={
 name:'onclickcommenteditask',
 Tilte:'Comment Edit',
 body:W.T.SpreadComment.S.editcomment(comment_data),  
actionbutton:[{text:'Cancel',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:spreadCommentView'+sid+'" '},{text:'Update ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ 
onclickcommenteditsave(cid,sid,this);
}
};

  W.U.Pager.AddModal(Modeldata);
   W.U.Pager.DirectInitPage('mainpage','onclickcommenteditask'); 
 
 }
 function onclickcommenteditsave(cid,sid,btn){
     W.U.console(btn);
 var formname='commenteditform:'+cid;
 var f_value = W.F.walk_way_all(['commenttext'], formname);
     f_value.cid=cid;
     f_value.sid=sid;
var CommentData=W.U.intentdata.get('spreadcomment:'+sid+'.'+cid); 
if( W.U.trim(f_value.commenttext)!=''&&f_value.cid!=''&&(f_value.sid!=0||f_value.sid!='')){

    
   var formData = {
                    form: 'commentform',
                    f_value:f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
        W.F.ButtonState(btn,{'state':'loading','LoadingText':'saving'} );
            
                    },
                    success: function (data) {
           W.F.ButtonState(btn,{'state':'loadingoff','text':'update'} );          
                   var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
             InsertComment(CommentData,3);
          //   W.U.
 
                        }
                        if (ret.state == 200) {
    
          
               W.U.paging.AddRow('spreadcomment:'+sid,ret.response,4);    
               
                  
                              }
 
                    }

                });


         
     }



}

//-- delete 
function  onclickcommentdeleteask(){
 var Datastr=(this['data-commentdeleteask']).split(":"); 
  var cid=Datastr[1], sid=Datastr[0],action=Datastr[2];  


  var DialLogData={};
      if(action=="d"){

DialLogData={
name:'onclickcommenteditask',
 Tilte:'Delete',
 body:'Do you sure to delete this comment?',  
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'Yes ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ onclickspreaddelete(sid,cid,action,this);}
};
  
 }
   if(action=="r"){
DialLogData={
name:'onclickcommenteditask',
 Tilte:'Remove',
 body:'Do you sure to remove this comment?',  
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'Yes ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ onclickspreaddelete(sid,cid,action,this);}
};
  
 }

  
  W.U.Pager.AddModal(DialLogData);
   W.U.Pager.DirectInitPage('mainpage','onclickcommenteditask'); 
}
function onclickspreaddelete(sid,cid,action,btn){
   var f_value ={};
     f_value.action=action;
     f_value.cid=cid;
     f_value.sid=sid;
     var SpreadData= W.U.intentdata.get('spread.'+sid);
   var formData = {
                    form: 'commentdelete',
                    f_value:f_value
                };
  
  W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
            W.F.ButtonState(btn,{'state':'loading','LoadingText':'saving'} );
            
                    },
                    success: function (data) {
            W.F.ButtonState(btn,{'state':'loadingoff','text':'update'} );               
                   var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
               
             
         
   W.F.Toast({msg:'Delete Unsucessfull',theme:'error',duration:2000});  
                        }
                        if (ret.state == 200) {
             
               $('[data-spreadcommentcard="'+cid+'"]').remove();
        
                      W.F.Toast({msg:'Delete Sucessfull',theme:'sucess',duration:2000});  
                   
                              }
  
   W.U.Pager.togglePage('mainpage','spreadCommentView'+sid);   
                    }

                });
}
//--==edit==--

function init(x){
    var TranseData = W.U.paging.GetTranseData('spreadcomment:'+x.sid);
    W.U.console(TranseData);
     if(TranseData.pgd==1){
    TranseData.bypass = 1; 
 if(x.cp.r==1){
    W.U.paging.load('spreadcomment:'+x.sid,TranseData);  
 }

 }else{
    //var reverse=TranseData.result;
      // InsertComment(reverse,1); 
      //SetPaging(spreadData.sid,TranseData);
 }
 
}

//--====--


 W.U.SpreadComment={
 init:init,
 
 spreadCommentNode:spreadCommentNode,
 CommentSubmitData:CommentSubmitData ,
 PagingData:PagingData  


 };  


 

})(wowrol);

/*
//--comment Flow 
1.  Page set UP
 file                                            function
spread_ViewReaction                             W.U.Pager.addblockdata
                                                W.U.Pager.DirectInitPage
                                                W.T.SpreadComment.mobLayout
                                                W.U.SpreadComment.PagingData
                                                W.U.paging.init
                                                W.U.SpreadComment.init
                                                W.U.paging.load('spreadcomment',TranseData);
                                                PagingData.onsucess();




*/