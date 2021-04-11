; (function (W) {
    "use strict";
    var AppId = W.A.page.AppId;

  var spreadCommentbank=[]; 
  var spreadCommentNode=[]; 

function AddInCommentBank(SpreadID,result,Tdata){
   
     var TranseData=spreadCommentbank[SpreadID];
   
      spreadCommentbank[SpreadID]=Tdata;
        
     for(var q in result){
       
  spreadCommentbank[SpreadID].result[''+result[q].cid+'']=result[q];

    }
      console.log(spreadCommentbank); 
   
}

function GetCommentTranseData(SpreadID){
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
  if(typeof spreadCommentbank[SpreadID] != 'undefined'){
      defaultTranseData=spreadCommentbank[SpreadID];
  }

  return defaultTranseData;
}
function GetCommentData(SpreadID,ID){
   var CommentData={"ESd":[],"sid":SpreadID,"eid":0,"cid":0,"veid":"","ctt":[{content:'',data:''}],"date":"","date_gmt":"","qati":{"total":0,"self":0,"pyi":0,"type":0},"rf":{"show":0,"value":0}};
     var TranseData=spreadCommentbank[SpreadID];
   console.log(TranseData);
  if(typeof TranseData !='undefined'&&ID!=0){
   for(var q in TranseData.result){
    if(TranseData.result[q].cid===ID){
          CommentData=TranseData.result[q]; 
    }
    
       
   }
  
  }

  return CommentData;
}

function DeleteCommentData(SpreadID,ID){
      var TranseData=spreadCommentbank[SpreadID];
         for(var q in TranseData.result){
    if(TranseData.result[q].cid===ID){
 
 spreadCommentbank[SpreadID].result.splice(q, 1);
    }
    
       
   }
}

 function GetSpreadCommentNode(Selecter){
    if (W.U.SpreadComment.spreadCommentNode.hasOwnProperty(Selecter)) {
      return W.U.SpreadComment.spreadCommentNode[Selecter];

    }else{
        return null; 
    }
}

//--==submit==--


function CommentSubmitData(SpreadData,CommentData){
   


var formData={
              SpreadData:SpreadData,   
              CommentData:CommentData,
              reset:true,
              buttonupdate:true,
              insertmode:2
                };


var formLogic =function() {
var spreadData= this.formData.SpreadData;
    var f_value ={},
      error=2, alert_mes = [];

   f_value = W.F.walk_way_all(['commenttext','cid'],this.formname);     

 if(spreadData.prpo=="11"){
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
    console.log(this);

       
var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  console.log(ret);
      return ret;
}    
var onprogress=function(){  
var walkwayNode=getwalkwayNode();
 W.U.AddDom(walkwayNode.submitLoading, W.T.SpreadComment.S.Loading,'html');
     }
var onsuccess=function(){
var walkwayNode=getwalkwayNode();
 W.U.AddDom(walkwayNode.submitLoading,'','html');
 console.log(this);
 var response=this.data;
 var formData=this.form.formData;
 var spreadID= formData.SpreadData.sid;
  AddInCommentBank(spreadID,response,GetCommentTranseData(spreadID));
  
if(formData.buttonupdate){
var SraNode=W.U('[data-sra="'+spreadID+'"]');

for(var i=0;i<SraNode.length;i++){
formData.SpreadData.cmti.total++;
W.U.fn.event("update",SraNode[i],{});
}
 }
 
//--
    
 InsertComment(response,formData.insertmode);     

 //updateing

   if(formData.SpreadData.prpo=="11"){
     formData.SpreadData.rfinfo=response[0];
 }   


        var event = jQuery.Event("reset");
                        event.formData=formData;
    $(this.form.form).triggerHandler(event);  

     }
var onerror=function(){ 
var walkwayNode=getwalkwayNode();
 W.U.AddDom(walkwayNode.submitLoading,'','html');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

     if( W.U.browser.opera_mini){
      alert(this.data);  
     }
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
//--- renderComment function inside used  funtion
function onclickcommentedit(){
 var Datastr=(this['data-commentedit']).split(":"); 
  var cid=Datastr[1], sid=Datastr[0];  
  var  comment_data=GetCommentData(sid,cid);
 
 console.log(comment_data); console.log(Datastr);
   var mainBlock=W.U.Rander(W.T.SpreadComment.S.editcomment(comment_data));
   //cansal button
     W.U.attrclick('[data-reinitcommentmid]',mainBlock[0],onclickreinitcommentmid);
       W.U.attrclick('[data-commenteditsave]',mainBlock[0],onclickcommenteditsave);


   W.U.Setview(GetSpreadCommentNode('mid:'+cid),mainBlock,'html');
 
 }

function onclickreinitcommentmid(){
          var Datastr=(this['data-reinitcommentmid']).split(":"); 
          var cid=Datastr[1], sid=Datastr[0];  
          var  comment_data=GetCommentData(sid,cid);
          var mainBlock=W.U.Rander(W.T.SpreadComment.S.mid(comment_data));
           W.U.attrclick('[data-commentedit]',mainBlock[0],onclickcommentedit);
          W.U.attrclick('[data-commentdeleteask]',mainBlock[0],onclickcommentdeleteask);
          W.U.Setview(GetSpreadCommentNode('mid:'+cid),mainBlock,'html'); 
      
     }
function onclickcommenteditsave(){
 var Datastr=(this['data-commenteditsave']).split(":"); 
 var cid=Datastr[1], sid=Datastr[0];  
 var formname='commenteditform:'+cid;
 var f_value = W.F.walk_way_all(['commenttext'], formname);
     f_value.cid=cid;
     f_value.sid=sid;
var CommentData=GetCommentData(sid,cid);
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
            W.U.AddDom(GetSpreadCommentNode('mid:'+cid), W.T.SpreadComment.S.Loading,'html');   
            
                    },
                    success: function (data) {
                    
                   var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
             InsertComment(CommentData,3);
          //   W.U.
 
                        }
                        if (ret.state == 200) {
       var Tdata = GetCommentTranseData(sid);
      AddInCommentBank(sid,ret.response,Tdata);
      InsertComment(ret.response,3);
          
                     
                              }
 
                    }

                });


         
     }



}

function  onclickcommentdeleteask(){
 var Datastr=(this['data-commentdeleteask']).split(":"); 
  var cid=Datastr[1], sid=Datastr[0],action=Datastr[2];  
  var  comment_data=GetCommentData(sid,cid);
 if(action=="d"){


    var mainBlock=W.U.Rander(W.T.SpreadComment.S.deletecomment(comment_data));
  
 }
   if(action=="r"){
    var mainBlock=W.U.Rander(W.T.SpreadComment.S.removecomment(comment_data));
  
 }
  //cansal button
   W.U.attrclick('[data-reinitcommentmid]',mainBlock[0],onclickreinitcommentmid);
   W.U.attrclick('[data-commentdelete]',mainBlock[0],onclickcommentdelete);
   W.U.Setview(GetSpreadCommentNode('mid:'+cid),mainBlock,'html'); 
  

}

function onclickcommentdelete(){
    var Datastr=(this['data-commentdelete']).split(":"); 
    var cid=Datastr[1], sid=Datastr[0],action=Datastr[2];  
   var f_value ={};
     f_value.action=action;
     f_value.cid=cid;
     f_value.sid=sid;
var CommentData=GetCommentData(sid,cid);
if(f_value.cid!=''&&(f_value.sid!=0||f_value.sid!='')){

    
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
            W.U.AddDom(GetSpreadCommentNode('mid:'+cid), W.T.SpreadComment.S.Loading,'html');   
            
                    },
                    success: function (data) {
                    
                   var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
                
                  InsertComment([CommentData],3);
            W.F.Toast('Unable to delete comment');

                        }
                        if (ret.state == 200) {
                DeleteCommentData(CommentData.sid,CommentData.cid)
               $('[data-commentcard="'+CommentData.cid+'"]').remove();
          
                     
                              }
 
                    }

                });


         
     }
   
}

//---renderComment function inside used  funtion
//---comment front walkway
function getwalkwayNode(){
    var Node=W.U.id("spreadcommentonefront").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            submitLoading:Node[0],
            paging:Node[3]};
}
function LoadComment(SpreadID,Tdata){
    var walkwayNode=getwalkwayNode();
   var walkway=walkwayNode.main;
   var walkwayLoading=walkwayNode.Loading;
     Tdata.ifo.sid=SpreadID;
 
   if((Tdata.bypass==5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'spreadcomment', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
                 
               AddInCommentBank(SpreadID,Hret.result,Tdata);
                   InsertComment(Hret.result,Tdata.bypass);
                   SetPaging(SpreadID,Tdata);
                  Tdata.bypass = 0; 
                        }
                        
                    }

                }); 

   }   
}
function renderComment(result){
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.SpreadComment.S.t0(result)+'</div></div>')[0];



 var mainBlock=RanderInDiv.childNodes;// do not disturb it


  W.U.attrclick('[data-commenteditlinkbtn]',mainBlock[0],function(){
  var Id=this['data-commenteditlinkbtn'];   
  $('[data-commenteditlink ="'+Id+'" ]').toggle();
 
 });

  W.U.attrclick('[data-commentedit]',mainBlock[0],onclickcommentedit);
  W.U.attrclick('[data-commentdeleteask]',mainBlock[0],onclickcommentdeleteask);
  

 return mainBlock;
}

function InsertComment(result,bypass){
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

//---comment front walkway
//--==init=--
function initcommentfront(spreadData){

 var TranseData = GetCommentTranseData(spreadData.sid);
 console.log(TranseData);console.log(TranseData.bypass);
 if(TranseData.pgd==1){
    TranseData.bypass = 1; 
    LoadComment(spreadData.sid,TranseData);
 }else{
     var reverse=TranseData.result;
       InsertComment(reverse,1); 
      SetPaging(spreadData.sid,TranseData);
 }



 
}  
function init(){
    var walkway=this.Node;
    var spreadData=this.spreadData;
 
    


var mainBlock=W.U.Rander( W.T.SpreadComment.Layout(spreadData));

//W.U.attrclick('[data-commentsubmit]',mainBlock[0],CommentSubmit);

  W.U.Setview(walkway,mainBlock,'html');
 initcommentfront(spreadData);
}

 W.U.SpreadComment={
     init:init,
 spreadCommentNode:spreadCommentNode,
 GetCommentData: GetCommentData,
 CommentSubmitData:CommentSubmitData
 };  


 

})(wowrol);