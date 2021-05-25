/*
* 
*/
; (function(W){
   "use strict";
var TypingTimeout=0, Active_conversation_id=0, waitTime=0,NotifyTypingInterval=0;
 /*
  */
var ChatPagingData={
   initent:'message' ,
   TranseData:{}, 
   resultFlow:'top',
   onsucess:function(_this){
     

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=W.U.Rander(W.T.Chat.S.t0(result,bypass,0));
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

 
     //
     

  }  ,
   onupdatesucess: function(_this){
      


    

var walkWay=_this.TemplateNode.main,
bypass=8,
result=_this.Data.TranseData.updateresult;
var mainBlock=W.U.Rander(W.T.Chat.S.t0(result,bypass,1));;

 if(result.length>0){
      _this.DomInsert(walkWay,mainBlock,bypass,result);

     
}


    },
   onUpdateResultParse:function(x){
     
  if(W.U.isOK(x[2]. checkIn_id)){
      W.U.Browsing.UpdateSBDataFromChat(x[2]); 
   }


  var Conversation= W.U.intentdata.get('convarstionlist.'+x[1].id);
     if(W.U.isOK(Conversation)){
       Conversation.ucount=x[1].ucount;
   W.U.Browsing.updateChatStrip(Conversation,x[0]);
  

 
   }
 

  


      if(W.U.isOK(x[1])){
        
        // W.U.Updater.UpdateView( updater_id,this.data);  
var updateName='updateView_lastseenconversation.'+x[1].id;
//W.U.console(updateName);
  W.U.ccbk.Run( W.U.Page,updateName,{data:x[1],template:function(x){
      var ch='';
      var LAstSeenData = W.U.intentdata.get('lastseenconversation.'+x.id);
    
    for(var q in x.LChT){
        //   W.U.console(q +' !='+ x.Edindex);   
          if(q != x.Edindex){
       //  W.U.console(x.LChT[q]);   W.U.console(W.U.timeConverter(x.LChT[q]));
  ch='<span class="span  ff_2 fs10" > Last Seen at ' + W.U.DateDay(W.U.timeConverter(x.LChT[q])) + '</span> ';   
          }
 
      }    



        setTimeout(function(){ //seveing updated view
UpdateDoubleTick(x);},100);

 

      return ch;
  }});  

   
  }


        return W.U.isOK(x[0])?x[0]:[];
    }
};



function SubmitChatFormData(id){
   var conversation = W.U.intentdata.get('convarstionlist.'+id);   
      var formData={
           id:id,
conversation:conversation
                };
function formbody(data){
    var id=data.id;

      var ch='<div class="block">';
     ch+='<div class="block b_gtl _Bdy"><div class="block" style="max-height:200px;" data-junction="messagetextarea'+id+'" ></div></div>';
 ch +='<span class="input-group-btn hide"><button class="btn" type="submit" >Submit</button></span>';
   ch += '<div class="hide" data-help="chatform:'+id+'"></div></div>';
 ch+='</div>';
 W.U.Junction('messagetextarea'+id,function(){
        var _this=this;
    //   W.U.ccbk.Add(this.Node,'autosizeresized', onautosize);
 W.U.contentEditable.bind({Node: this.Node,data:{text:'',
                                                 name:'messagetext',
                                                 placeholder:"Write a message",
                                                 onautosize:onautosize, 
                                                 layout:'layout2',
                                                 onsubmit:function(){ 
                                         W.U.ccbk.Run(W.U.GetFORM('chatform:'+id+''),'submit'); 
                                                  },
                                                 ontyping:function(){ 
                             

                               if(TypingTimeout==0){
                           var selfED= conversation.Ed[conversation.Edindex] ;
                   W.U.IU.AddEventInUpdater(conversation.iuc,{cid:conversation.id,event:{type:'typing',eid:selfED.eid}});  
                   TypingTimeout=1;
                   setTimeout(function(){   TypingTimeout=0; },10000);

                               }


                                                  },
                                                 minheight:(20)
                                                 }
                                                 })();
   function onautosize(){
      W.U.ccbk.Run(W.U.id('bottomfixwrap.coversation'+id),'resizeouter'); 
     
    }

  },{});   
    return ch;

}
function formLogic() {
var connversation= this.formData.conversation;
    var f_value ={},
      error=1, alert_mes = [];

   f_value = W.F.walk_way_all(['messagetext'],this.formname);     

 
  var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;




f_value.cid=connversation.id;

 if( W.U.trim(f_value.messagetext)==''&&(f_value.cid==0||f_value.cid=='')){
    error++; 
 }








      
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes}); 
  //W.U.console(this);




       
var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
 // W.U.console(ret);

    if(error==0){
       var MessageData =MessagePreviewData(f_value.messagetext,f_value.cid);

      
ret.updater_id =MessageData.id;
   W.U.paging.AddRow('message:'+id,[ MessageData ],8);

  // W.U.ccbk.Run(this.form,'reset');
  var ZingData={zingData:{messagetext:''}};
      W.U.ccbk.Run(this.form,'zingreset',ZingData); 
   
   }

      return ret;
}    
function  onprogress(){  
 


     }
function onsuccess(){
  
 var response=this.data,
 formData=this.form.formData,
  buypass=0,
  updater_id=  this.form.formLogicdata.updater_id,
  conversation_id=  this.form.formLogicdata.f_value.cid;

 
// W.U.Updater.UpdateView( updater_id,this.data);  
var updateName='updateView_custom_message:'+conversation_id+'.'+updater_id;
//W.U.console(updateName);

 W.U.ccbk.Run( W.U.Page,updateName,{data:this.data[1],callback:UpdateMessageBody});
 
 
 //--sending event
   var selfED= conversation.Ed[conversation.Edindex] ;
  W.U.IU.AddEventInUpdater(conversation.iuc,{cid:conversation.id,event:{type:'sentmessage',eid:selfED.eid}});


     }
function  onerror(){ 


 }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:formbody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };
 //       
         
     return    Ragisterdata;  


  }





function MessagePreviewData(message,conversation_id){
    var conversation = W.U.intentdata.get('convarstionlist.'+conversation_id);
    var Data={
        id: W.U.uId(),
        mid: 0,
        cid: conversation_id,
        sidi:conversation.Edindex,
        type:0,
        attmt: { has: 0, type: 0, info: Array() },
        msg:W.F.escapeHTML(message),
        facet:0,
        date: W.U.NowDateTime() ,
        dateday:'',
        livestamp:W.U.NowDateTime()
    };



  
    return Data
}





//Manually load attachment
function ManualyLoadAttachment(){

    function Handler(Node,data){
     this.Node=Node; 
     this.data=data; 
      this.load(); 
    }

   Handler.prototype.load=function(){
      var _this=this;
    
 if(this.data.type=='0'){
      W.U.Browsing.LoadInPbank([this.data.id],1,this.Node,function(){
            _this.init();
         });       
   
      } 

     if(this.data.type=='1'||this.data.type=='2'||this.data.type=='3'){
    W.U.Browsing.LoadInPbank([this.data.id],0,this.Node,function(){
            _this.init();
         });       
   
      }     

   if(this.data.type=='16'||this.data.type=='17'||this.data.type=='18'){
   
    W.U.Browsing.LoadInPbank([this.data.id],0,this.Node,function(){ 
            _this.init();
         });       
   
      }     
  
  if(this.data.type=='4'||this.data.type=='5'||this.data.type=='6'){
   W.U.Browsing.LoadEntityCard([this.data.id],this.Node,function(){
  
           _this.init();
         });       
   
      }     

    }



    Handler.prototype.init=function(){

 W.U.Setview(this.Node,this.rander(),'html'); 
        
    }
    Handler.prototype.rander=function(){
var mainBlock='<div class="block"></div>';
if(this.data.type=='0'){
 var info=    W.U.Browsing.GetPbankData('',this.data.id);   
 if(info!=null){
    mainBlock=W.T.C.C2_Prductcard(info,{});   
 }

}
 if(this.data.type=='1'||this.data.type=='2'||this.data.type=='3'){
   var info=  W.U.Browsing.GetPbankData(this.data.id,'') ;  
   if(info!=null){
    mainBlock=W.T.C.C2_Prductcard(info,{});   
 }
      }   

 if(this.data.type=='16'||this.data.type=='17'||this.data.type=='18'){
   var info=  W.U.Browsing.GetPbankData(this.data.id,'') ;  
   if(info!=null){
    mainBlock=W.T.C.C2_Prductcard(info,{});   
 }
      }  

  if(this.data.type=='4'||this.data.type=='5'||this.data.type=='6'){
   var info=  W.U.intentdata.get('entitycarddata.'+this.data.id);  
   if(info!=null){
    mainBlock= W.T.C.C2_EntityCard(info,{});   
 }
      }         

 
   
   return  W.U.Rander(mainBlock);
        
    }

    new Handler(this.Node,this.data);
   
}




//---------------------------------------------
function CreateConvarsation(){
        var  f_value=[],all_value = W.F.walk_way_all('*','createconvarsation'),
      error=3, alert_mes = [],i=0;
       W.U.console(all_value);
      for(var q in all_value ){
          if(all_value[q].name=='conversationmember'){
             f_value[i]=W.F.JSONparse(all_value[q].value,{id:'',af:''}).id;    
             i++;
          }
       
      }


     



    var loadingId= W.F.Load('createconversation',JSON.stringify(f_value));
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
     
        W.U.paging.AddRow('convarstionlist',[data],7);

        if(W.I.wf=='mob'){
              W.U.Pager.togglePage('mainpage','blockFront');   
        }
       if(W.I.wf=='web'){
          W.U.Pager.DirectTogglePage('CoversationPlatform','Coversation'+data.id); 
        }
       });
     W.U.ccbk.Run('load'+loadingId );  

}
  /*
  */
   var convarstionlistPagingData={
    initent:'convarstionlist' ,
    updaterail:'convarstionlist',
     TranseData:{},
    onbeforeInit:function(){

 //--
             



    W.U.Updater.CreteRail({ name:'convarstionlist',isautomatic:false});   
      W.U.ccbk.Add('viewloaded',function(){  W.U.Updater.DeleteRail('convarstionlist') ;   });

     


    },     
   onsucess:function(_this){
    //  W.U.console(_this);
    
var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=ConvarstionListRender(result,bypass);
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
   
    
     //---------
          
 
    //--instant conversation list updater
   
    for(var q in result){
      ConversationRailSetter(result[q]);   
   W.U.Browsing.updateChatStrip(result[q],result[q].lmi);
       
    }


  }  
   };
   
function ConvarstionListRender(result){
    var mainBlock=W.U.Rander('<div class="block ">'+W.T.Chat.CL.t0(result)+'</div>');
W.U.attrclick('[data-OpenCoversationPlatform]',mainBlock[0],OpenCoversationPlatform);



 return mainBlock;
}

  /*
  */
  function OpenCoversationPlatform(){
      var Id=this['data-OpenCoversationPlatform'];
      $(this).parent().parent().children().removeClass('active');   $(this).parent().addClass('active');
    
  CoversationPlatformInit(Id);

  }
  function ClearHistory(){
      var id=this['data-clearhistory'];
        var  f_value={cid:id};
          var loadingId= W.F.Load('clearhistory',JSON.stringify(f_value));
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
  

      W.U.paging.empty('message:'+id, W.T.RNF_banner({msg:'History cleared.'}));
   
       });
     W.U.ccbk.Run('load'+loadingId ); 

  }
    function onRanderCoversationPlatform(){
       var mainBlock=this.mainblock; 
       W.U.attrclick('[data-clearhistory]',mainBlock[0], ClearHistory); 
}
  function CoversationPlatformInit(Id){
              
   if(Active_conversation_id!=Id){
       W.U.ccbk.Add('onHidePage_Coversation'+Id,function(){  ChatFocusLossInformToMainServer(Id)  ;    Active_conversation_id=0;    } ); 
   }

      Active_conversation_id=W.U.intval(Id);//for informing the update server
      // for attaching the event for the removing `active_conversation_id` on rhne chat id no longer in focus   

 
  var pagerName='mainpage',presention='page';
    switch(W.I.initType){
 
     case 2://checkin web
  var pagerName='CoversationPlatform';
 if(W.I.AppId=='checkins'){  pagerName='checkinPlatform' ;   }

     break;    
     case 3://checkin web
        presention='model';   

     break;    
    }
   W.I.dp_c =pagerName;// use in view converstion member
 W.U.Pager.addblockdata({name:'Coversation'+Id, htmlStr:W.T.Chat.CoversationPlatformLayout,objectdata:{id:Id},presention:presention,onRander:[onRanderCoversationPlatform]});

   W.U.Pager.addblockdata({ name:'ViewConversationMamberPage', htmlStr:ViewConversationMamberPage});

  W.U.Pager.DirectTogglePage(pagerName,'Coversation'+Id);   

   var TranseData = W.U.paging.GetTranseData('message:'+Id);

    if(TranseData.pgd==1||TranseData.pgd==0){
    W.U.paging.load('message:'+Id,TranseData); 
    var conversation=W.U.intentdata.get('convarstionlist.'+Id);
    if(W.I.AppId=='checkins'){
       ConversationRailSetter(conversation);  
    }

  
W.U.Chat.CreateChatCSS(Id);


 }
 USNoti.show(Id);
  }
  /*
  */
  function initConvarstionList(){
   W.I.dp_c =(W.I.wf=="web")?'CoversationPlatform':'mainpage';//dashboardpage=>dp
   var TranseData = W.U.paging.GetTranseData('convarstionlist');
    //W.U.console(TranseData);
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
 W.U.paging.load('convarstionlist',TranseData);

 //----
 





  }

 function init(walkway){
     
var mainBlock=W.U.Rander(W.T.Chat.Layout());

W.U.attrclick('[data-OpenCoversationPlatform]',mainBlock[0],OpenCoversationPlatform);

  W.U.Setview(walkway,mainBlock,'html');
  if(W.I.AppId=='messages'){
    initConvarstionList();  


    setTimeout(function(){
          W.U.ccbk.Run(W.U.id('bottomfixwrap.coversation0'),'resizeouter'); 
    },100);

  }

 W.U.resize();
 }


 /*
 @description-> rough use
 */
 function NotifyTyping(cid,result){
var conversation,chatPaging,typingNode,typingMembers,allED,selfED ;
conversation = W.U.intentdata.get('convarstionlist.'+cid);
chatPaging= W.U.intentdata.get('paging.message:'+cid);
var typingMembers=[],
 timeN=(W.U.time()-120); 
 

if(W.U.isOK(conversation)){
allED=conversation.Ed;
selfED= conversation.Ed[conversation.Edindex] ;

 for(var q in allED){
     for(var p in result){
var Timecheck=(result[p].time>timeN);
        if(allED[q].eid==result[p].eid&&(selfED.eid!=allED[q].eid)&&Timecheck){
  typingMembers.push(allED[q].entityName );       
     }   
     }
   
 }
 


}
if(W.U.isOK(chatPaging)){
 if(NotifyTypingInterval==0){
     typingNode=  chatPaging.TemplateNode.pagingBottom;
 
W.U.AttachDom(typingNode,W.T.Chat.S.typing(typingMembers),'html',W.U.noop);
NotifyTypingInterval= setTimeout(function(){ W.U.AddDom(typingNode,'','html'); NotifyTypingInterval=0; },10000); 
 }   

}
       
 }


 /*
 @description-> instant updater conversation list on sucess
 */
 function iu_conversationlist_onSucess(responseData,sendedData,Node){
 
     var init,typigResult,cid;
     sendedData.init.tn=responseData.timeNode;
  sendedData.init.wait=60;
       init =sendedData.init;
       typigResult=responseData.typing;
       cid=init.cid;

      NotifyTyping(cid,  typigResult);
    //empting enent object
    init.event=[];
     // messageing
    var chatPaging= W.U.intentdata.get('paging.message:'+cid);
    if(W.U.isOK(chatPaging)){
     
     chatPaging.Data.TranseData.updateresult=responseData.messages;
   chatPaging.updateInsert(chatPaging.Data.TranseData.updateresult);
    }else{ // when chat paltform Not init , but we have to update the chat list

  var ret=responseData.messages;
   var Conversation= W.U.intentdata.get('convarstionlist.'+ret[1].id);
   if(W.U.isOK(Conversation)){
          Conversation.ucount=ret[1].ucount; 
    
  W.U.Browsing.updateChatStrip( Conversation,ret[0]);
  
   }

    }
    
   
 }
  /*
 @description-> instant updater conversation list onError
 */
 function   iu_conversationlist_onError(responseData,sendedData,Node){
        var init,typigResult,cid;
  sendedData.init.wait=60;


 }
 //-- chatPage

function chatPage(){
 var SBData=W.U.StoreBrowsing.hi_SBdata(); 
var conversation={id: SBData.cid,
                  Ed:SBData.Ed,
                  LChT:SBData.LChT,
                  Edindex:SBData.Edindex
                  };

  W.U.intentdata.add('convarstionlist.'+conversation.id,conversation);
     
       W.U.Chat.CoversationPlatformInit(conversation.id); 
}










/*
@des save the css for chat
@call W.U.Chat.CreateChatCSS
*/
function CreateChatCSS(cid){
var conversation = W.U.intentdata.get('convarstionlist.'+cid);
  
    var str=styleStr(conversation.Ed);
    var resId ='chatcss'+cid;


     var __ = document.createElement("style");

        __.type = "text/css";
        __.innerHTML = str;
        __.id = resId;
             var ert=__;
    var e = document.getElementById(resId);
    if (e == null) {
   
  document.querySelector("head").appendChild(ert);
    } 

    function styleStr(x){
          var ch='.se +.re [data-role="entity-card"] , .re +.se [data-role="entity-card"] , .ti +.se [data-role="entity-card"] , .ti +.re [data-role="entity-card"]';
           var ch='';
          for(var i=0;i<x.length;i++ ){
         for(var j=0;j<x.length;j++ ){
             if(x[i].eid!=x[j].eid)
       ch+=' .cm-'+x[i].eid+' +.cm-'+x[j].eid+' [data-role="entity-card"] , ';       
               }
             
      ch+='.ti +.cm-'+x[i].eid+' [data-role="entity-card"] ,';
          }
ch+='._ms > div:nth-child(1) [data-role="entity-card"]{display: block;}';
          return ch;
    }

}

/*

*/
function UpdateDoubleTick(x){

      var conversation = W.U.intentdata.get('convarstionlist.'+x.id);
if(W.U.isOK(conversation)){
    var Nodes=W.U('[data-point="doubletick_'+x.id+'"]');
    var replcingNode =[];
    for(var q =0;q<Nodes.length;q++){
        var time=W.U.intval(Nodes[q].getAttribute('data-time'));
       replcingNode.push({Node:Nodes[q],time:time}); 
    }
    //debugger;
       
       for(var p in replcingNode){
var Oneread=false,IndexRead=[];
            for(var c in x.LChT){
                  if(c != x.Edindex){
var we=x.LChT[c],ve=replcingNode[p].time;
var bop=(we>ve);
                if( bop){
                  Oneread=true;  
                  IndexRead.push(c);
                }
                }
            }
if(Oneread){
    W.U.AddDom(replcingNode[p].Node,W.T.Chat.S.doubletick(x.id, IndexRead),'replaceWith');  
}
 
            }
    
}



}

/*
@des update status icon 
*/
function UpdateMessageBody(updater_id,data){
 
 var watch= $('[data-point="'+updater_id+'"]').find('[data-point="watch"]');
 if(data.facet==1){
if(W.U.isOK(watch[0])){
         W.U.AddDom(watch,'<span  title="sent"  data-point="doubletick_'+data.cid+'" data-time="'+ data.livestamp+'" >'+W.T.SVG('tick',12,'#1274c0')+'</span> ','replaceWith');  
}
 }
 
}
/*

*/
function ViewConversationMamberPage(block){
  
  var data=block.objectdata;




    return W.T.Chat.ConversationMamberPage(data);
}



/*
*/
function ProfileSendMessagePageData(entity_id){
    var data={entity_id:entity_id};
      data.message=''; 
  if(entity_id==0){
       data.loading=1;
 
   data.sendButton='';
   data.send=function(){
       var _this=this;

      
       if(_this.message!=''){
         
         
           W.F.Submit({
       formname:'sendaMessage',
       f_value:{messagetext:_this.message,reid:JSON.stringify(Array(_this.entity_id))},
       madianLoading:false,
       button:_this.sendButton,
       buttonstateargs:{text:'text_221',LoadingText:'text_222'},
        complete200:function(data){
            _this.message='';
            W.F.Toast('text_223');
           W.U.Pager.DirectTogglePage('mainpage','blockFront');
           
      var conversation=data;
       ConversationRailSetter(conversation);
       //--sending event
               
   var selfED= conversation.Ed[conversation.Edindex] ;
  W.U.IU.AddEventInUpdater(conversation.iuc,{cid:conversation.id,event:{type:'sentmessage',eid:selfED.eid}});   


        }

           });
           
       }

     

   }

  }
  


    return data;
}

/*
@des Set conversation in rail for update
*/

function ConversationRailSetter(conversation){
         var sendedArgs={Node:null,
                             data:{name:'convarstionlist' ,
                                   init:{iu_hash:conversation.iu_hash,cid:conversation.id,eid:W.I.entity_id,event:[],wait:0}
                                                  },
                             onsucess:W.U.Chat.iu_conversationlist_onSucess,
                             onerror:iu_conversationlist_onError,
                             essential:true
                             };
         W.U.IU.AddObjectIninstantUpdaterRail(conversation.iuc,sendedArgs);  
         var sendedeventArgs={Node:null,
                             data:{name:'convarstionlist' ,
                                   init:{iu_hash:conversation.iu_hash,cid:conversation.id,eid:W.I.entity_id,event:[],wait:0}
                                                  },
                             onsucess:iu_conversationlist_onSucess,
                             onerror:iu_conversationlist_onError,
                             essential:true
                             };
          W.U.IU.AddObjectIninstantUpdaterEventRail(conversation.iuc,sendedeventArgs);


            //Addin conversation as active before  gl rail fire

   W.U.ccbk.Add('beforeload_IU'+conversation.iuc,function(){   
      if(Active_conversation_id==conversation.id){
           var selfED= conversation.Ed[conversation.Edindex] ; 
  W.U.IU.AddEventInUpdater('IU'+conversation.iuc,{cid:conversation.id,event:{type:'isactive',eid:selfED.eid}});   
      }
    
   

      } );


}
/**
@des Create Conversation data from SB data 
@call  W.U.Chat.CreateConversationFromSBdata
*/
function CreateConversationFromSBdata( SBData){
  var ED=[],Edindex=0;
  var member=[];
  for(var q in SBData.Ed){
     
      member.push(SBData.Ed[q].eid);
      
  }
  member.sort(function(a, b){return a - b});
 
  for(var i=0;i<member.length;i++){
        for(var j=0;j<SBData.Ed.length;j++){
      if(member[i]==SBData.Ed[j].eid){
       ED[i]=SBData.Ed[j];
           }

          if(member[i]==W.I.entity_id){
               Edindex=i;
           }
       }
  }



    var conversation={id: SBData.cid,
                  Ed:ED,
                  LChT:SBData.LChT,
                  Edindex:Edindex,
                  ucount:SBData.ucount,
                  lmi:SBData.lmi,
                  iuc:SBData.iuc,
                  iu_hash:SBData.iu_hash,
                  updater_id:SBData.updater_id
                  };
  W.U.intentdata.add('convarstionlist.'+conversation.id,conversation);
                  return conversation;
}


/*
@des update the last check time to main server of chat being close
*/
function ChatFocusLossInformToMainServer(Id){
           var  f_value={cid:Id};
     var loadingId= W.F.Load('FORM_0001',JSON.stringify(f_value));
     W.U.ccbk.Add('progress'+loadingId ,function(){             });
     W.U.ccbk.Add('complete'+loadingId ,function(){         });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){    });
     W.U.ccbk.Run('load'+loadingId );
}


//UnreadShortNotification
var USNoti={
    bank:{},
    add:function(cid,count){  

    if(count!=0){
         USNoti.bank[cid]=  count;
    }
     
    },
    remove:function(cid){
       if(W.U.isOK( USNoti.bank[cid])){
           delete(USNoti.bank[cid]);
       }
    },
    show:function(cid){
    
        var ucount= USNoti.bank[cid];
        if(W.U.isOK(ucount)){
        var  msg=W.U.strformat(W.U.GetText('text_292'),ucount);
        W.F.Toast(msg);
        USNoti.remove(cid);
        }
    }
    
}



  W.U.Chat={ 
  init:init ,   
  convarstionlistPagingData:convarstionlistPagingData,
  CreateConvarsation: CreateConvarsation,
  SubmitChatFormData:SubmitChatFormData,
  ChatPagingData:ChatPagingData,
  CoversationPlatformInit:CoversationPlatformInit,
  ManualyLoadAttachment:ManualyLoadAttachment,
  chatPage:chatPage,
  iu_conversationlist_onSucess:iu_conversationlist_onSucess,
  CreateChatCSS:CreateChatCSS,
  ConversationRailSetter:ConversationRailSetter,
  CreateConversationFromSBdata:CreateConversationFromSBdata,
  USNoti:USNoti
  };




W.U.ccbk.Add('pageloaded',function(){
  
 
  W.U.Pager.addblockdata({name:'ProfileSendMessage', htmlStr:W.T.Chat.ProfileSendMessagePage,presention:((W.I.wf!='mob')?'model':'page')});


      W.U.ccbk.Add('onTogglePage_ProfileSendMessage',function(block){   
      
      W.U.ccbk.Run(W.U.Page,'KK_update_data_ProfileSendMessagePage',ProfileSendMessagePageData(block.triggerdata[2])); 
      } );

            W.U.KKJunction('ProfileSendMessagePage',{
      name:'ProfileSendMessagePage',
      data:ProfileSendMessagePageData(0)


 });





    });




})(wowrol);