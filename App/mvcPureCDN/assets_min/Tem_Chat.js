/*
* 
*/
; (function(W){
   "use strict";
//==chat
  var messageIndex=0;
var S={
      t0:function(x,bypass,source){
    
          var ch = ''; messageIndex=0; 
          for(var q in x){


         
       if (x[q].type == 0) {
          ch += S.t1(x[q]);

            } 
           

            if (x[q].type == 1) {
               ch += S.t2(x[q]);

            }
            if (x[q].type == 3) {
               ch += S.t3(x[q],bypass);

            }  



          }
            


        return ch;
          
      },
      t1:function(x){//ChatMessageBodySent
      x=S.Makeinsertable(x);
       var ch='';

 x.sender="se";
  x.type=0;
    
 // $(['data-point="'+x.updater_id+'"']).remove();
        var ch='<div  class="block _msr  _t se  cm-'+x.Ed.eid+'"  data-point="'+x.updater_id+'"    > <div class="c1 ">'+S.msgcon(x)+' </div></div>';
     messageIndex++;
    return ch;   
      },
      t10:function(x){//ChatMessageBodySent
      x=S.Makeinsertable(x);
       var ch='';

 x.sender="se";

    

        var ch='<div class="c1 ">'+S.msgcon(x)+' </div>';
     messageIndex++;
    return ch;   
      },
      t2:function(x){//ChatMessageBodyReceve
      x=S.Makeinsertable(x);
            var ch='';
x.sender="re";
  x.type=1;
 var moredata=[];

   
 //$(['data-point="'+x.updater_id+'"']).remove();
  ch='<div  class="block _msr  _t re cm-'+x.Ed.eid+'" data-point="'+x.updater_id+'"  > <div class="c1 "> '+S.msgcon(x)+'</div></div>';
   messageIndex++;

    return ch;  
      },
      t3: function (x,bypass) {
  //
   var ch ='';
   var add=false;
  if(bypass==6){
  $('[data-date="' + x.date + '"]').remove();
  add=true;
  }else{
    if($('[data-date="' + x.date + '"]').length==0){
 
          add=true;
  }   
  }

 
  if(add){
      ch += '<div class="block _msr ti al-c "  data-date="' + x.date + '" ><div class="block _bdy "><span class="di-ib _bdy bg_5 fg_4 ff_1">' + x.message + '</span></div></div>';   
  }
 

        return ch;
    },
      attmt:function(x,c){
          var ch=''; 
          if(x.type==0||x.type==1||x.type==2||x.type==3){

  if(x.info!=null&&(W.U.isOK(x.info.pid))&&x.info.pid!=''){
  ch+='<div class="block " >'+S.attmtHeading(x.type)+'<div class="block  bg_0" >'+W.T.C.C2_Prductcard(x.info,{})+'</div></div>'; 
        }else{
      //manually loading of attachment
 ch+='<div class="block " >'+S.attmtHeading(x.type)+'<div class="block  bg_0" data-junction="attmt:'+x.type+':'+x.id+'"></div></div>';     
    
     
    W.U.JunctionAdd(W.A.page.AppId,'attmt:'+x.type+':'+x.id+'',function(){
 W.U.Chat.ManualyLoadAttachment.bind({Node:this.Node,data:this.data})();
  },x);    
            
           }


          }

                if(x.type==16||x.type==17||x.type==18){

 ch+='<div class="block " >'+S.attmtHeading(x.type)+'<div class="block  bg_0" data-junction="attmt:'+x.type+':'+x.id+'"></div></div>';     
    
     
    W.U.JunctionAdd(W.A.page.AppId,'attmt:'+x.type+':'+x.id+'',function(){
 W.U.Chat.ManualyLoadAttachment.bind({Node:this.Node,data:this.data})();
  },x);


          }

  if(x.type==4||x.type==5||x.type==6){
       var info=  W.U.intentdata.get('entitycarddata.'+x.id);  
  if(W.U.isOK(info)){
 
  ch+='<div class="block " >'+S.attmtHeading(x.type)+'<div class="block  bg_0" >'+ W.T.C.C2_EntityCard(info,{})+'</div></div>';  
        }else{
      //manually loading of attachment
 ch+='<div class="block " >'+S.attmtHeading(x.type)+'<div class="block  bg_0" data-junction="attmt:'+x.type+':'+x.id+'"></div></div>';     
    
     
    W.U.JunctionAdd(W.A.page.AppId,'attmt:'+x.type+':'+x.id+'',function(){
 W.U.Chat.ManualyLoadAttachment.bind({Node:this.Node,data:this.data})();
  },x);    
            
           }


     
  }
 
          return ch;
      },
      attmtHeading:function(x){
     var text='';
     switch(parseInt(x)){
       case 0 :
       text='text_294';
       break; 
       case 1 :
     text='text_295';
       break;
       case 2 :
       text='text_296';
       break;
       case 3 :
       text='text_297';
       break;
       case 4 :
     text='text_298';
       break;
       case 5 :
     text='text_299';
       break;
      case 6 :
     text='text_300';
       break;
      case 7 :
      text='text_301';
       break;
      case 8 :
     text='text_302';
       break;
      case 9 :
     text='text_303';
       break;
      case 10 :
      text='text_304';
       break;
      case 11 :
     text='text_305';
       break;
      case 12 :
     text='text_306';
       break;
      case 13 :
     text='text_307';
       break;
      case 14 :
     text='text_308';
       break;
      case 15 :
     text='text_309';
       break;
      case 16 :
      text='text_310';
       break;
      case 17 :
      text='text_311';
       break;
      case 18 :
     text='text_312';
       break;
     }
  
     return '<div class="block _bdy fw-b" >'+text+'</div>';
     },

     msgcon:function(x){
     
var attmt='';
var status='';
      if(x.attmt.has==1){
      

   attmt=S.attmt(x.attmt,x);
 }

    var moredata=[];
    if(x.sender=='se'){
status='<span  title="sent"  data-point="doubletick_'+x.cid+'" data-time="'+ x.livestamp+'" >'+W.T.SVG('tick',12,'#1274c0')+'</span>';
     if(x.facet==0){
         status='<span data-point="watch" >'+W.T.SVG('watch',12,'#1274c0')+'</span>';
     }



}
         var ch='<div class="msg_con"> <div class="arrow"></div><div class="block _bdy" >  '+W.T.C.C2_EntityStrip(x.Ed,{moredata:moredata,imageClass:'sr-img-35 '})+'<div class="t-h rc t m_t5"> <p class="m0 noreadmore">'+x.msg+'</p> <p class="m0">message id '+x.mid+'</p>   <span class="fs11 fg_9  sec-ti right m0"> <span>' + x.dateday + '</span> <span>'+status+'</span></span></div></div>'+attmt+'</div>';






         return ch;
     },
     Makeinsertable:function(x){

var conversation = W.U.intentdata.get('convarstionlist.'+x.cid);
     if(x.attmt.has==1){
        
      if(x.attmt.type=='0'){
   //  x.attmt.info=   W.U.StoreBrowsing.GetPbankData('',x.attmt.id);   
      }
       if(x.attmt.type=='1'||x.attmt.type=='2'||x.attmt.type=='3'){
            
  //   x.attmt.info=   W.U.StoreBrowsing.GetPbankData(x.attmt.id,'') ;  
      }

 }
 
          var Data={
        mid: x.mid,
        updater_id: x.updater_id,
        attmt: x.attmt,
        cid: x.cid,
        msg:W.U.ParseText(x.msg),
        Ed:conversation.Ed[x.sidi],
        facet: x.facet,
        date: x.date,
        dateday: x.dateday,
        livestamp: x.tn
    }; 
   
     

  

         return Data;
     },
     typing:function(x){
         var str='';

         switch(x.length){
             case 1:
str= W.U.strformat("{0} is typing",x[0]) ;
             break;
             case 2:
str= W.U.strformat("{0}, {1} are typing",x[0],x[1]) ;
             break;
            case 3:
str= W.U.strformat("{0}, {1}, {2} are typing",x[0],x[1],x[2]) ;
             break;
                 case 4:
str= W.U.strformat("{0}, {1}, {2}, {3} are typing",x[0],x[1],x[2],x[3]) ;
             break;
             case 5:
str= W.U.strformat("{0}, {1}, {2}, {3}, {4} are typing",x[0],x[1],x[2],x[3],x[4]) ;
             break;
      
         }





         var ch='<div class="block fs10 _Bdy">'+str+'</div>';


         return ch;
     },
     doubletick:function(id,time){
         var conversation = W.U.intentdata.get('convarstionlist.'+id);
         var ch='<span  title="read"  data-time="'+ time+'" >'+W.T.SVG('dbltick',12,'#1274c0')+'</span>';


         return ch
     }
  };

 //------CL
 var CL={
  t0:function(x){
     var ch='';
    if(x.length>0){
     ch='<div class="block ul hover bg_0 bs-1" >';

      for(var q in x){
         ch+=CL.t1(x[q]); 
      }

      ch+='</div>';

      }else{
        
 ch+=W.T.RNF_banner({}); 
    }
      return ch;
  } ,
  t1:function(x){
    
        var y=W.U.Browsing.ParseEntityData(x.Ed),msg,message_timeNode;
     W.U.Browsing.DepositeCoverstionIdForListUpdate(x.id);



   var ch='<div class="li"><a class="block " href="javascript:void(0);" data-OpenCoversationPlatform="'+x.id+'"  data-point="'+x.updater_id+'" data-id="'+x.id+'" > <div class="di-td _bdy vl-t"><img class=" x48" alt="64x64" src="'+W.I.IMAGE_PLACEHOLDER+'"  data-src="'+y.avatar+'"  ></div><div class="di-td vl-t bs-1-bottom _bdy w212"> <div class="block fw-b tt-c">'+y.entityName+'</div><div class="block "> <div class=" wball truncate max-w-1 infomessage ad-8 "  ></div></div></div><div class="di-td bs-1-bottom _bdy po-re"> <div class="block"> <div class="block  _bdy"><div class="block  po-ab ad-11  "><span class="block fg_12 fs11 time al-r"></span></div></div><div class="block m_t10"><span class="badge-0 right br-10 br-10px bg_10 "></span></div></div></div></a></div>';
  return ch;   
  }



 };

//-------->>
//--header
function coversationheader(id){
    var ch='';
    var space='<div class="di-td "><span class="hidden">sd</span></div >';
    var buttonClass=(W.I.wf=='mob')?'header-link-btn':'header-cell';
  var dropdown='';
var backbutton='<div class="di-td  vl-t "><a href="javascript:void(0);" class="block '+buttonClass+'" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a></div >';
var optionmenu=[];

optionmenu.push({href:'javascript:void(0);',text:'text_102',icon:'',attrStr:' data-clearhistory="'+id+'" '});

optionmenu.push({href:'javascript:void(0);',text:'text_104',icon:'',attrStr:' data-pagerbtn="'+W.I.dp_c+':ViewConversationMamberPage:convarstionlist:'+id+':togglePage" '});
//optionmenu.push({href:'javascript:void(0);',text:'text_103',icon:'',attrStr:''});



 dropdown+='<div class="di-td  vl-t po-re"><a href="javascript:void(0);" class="block '+buttonClass+' dropdown-toggle" data-toggle="dropdown" >'+W.T.SVG('menuHori',24,'#f1f5fc')+' </a> <div class="hide po-ab" data-block="menu">';
  dropdown+=W.U.CreateMENU(optionmenu,['block ul hover bg_0 fg_4 ff_3 fs13 bs-0','li bs-1','block _Bdy','vl-sp tt-c  fs14','']);

  dropdown+='</div > </div >';


    if(id==0){

var title='<div class="di-td  al-c w212 "><a href="javascript:void(0);" class="block header-cell"  ><span class="fw-b " > Start new conversation </span></a></div >';

   if(W.I.wf=='mob'){
     ch+='<div class="block bg_1 fg_6">'  ;
    ch+=backbutton;
    ch+=title;

     ch+='</div >' ;
   }
   if(W.I.wf=='web'){
     ch+='<div class="block bs-1 bg_0">'  ;
   
   ch+=title;
  ch+=space;

     ch+='</div >' ; 
   }
   
    }else{
var conversation = W.U.intentdata.get('convarstionlist.'+id);
var y=W.U.Browsing.ParseEntityData(conversation.Ed);
//--last seen
var LastSeenStr='';
var LAstSeenData=W.U.clone(conversation);
LAstSeenData.updater_id=   W.U.Updater.GetUpdateId('lastseenconversation.'+id);

 W.U.intentdata.add('lastseenconversation.'+id,LAstSeenData);
 if(conversation.Ed.length==2){
   LastSeenStr='<span class="span  ff_2 fs10" data-point="'+LAstSeenData.updater_id+'"></span>';  
 }else{
     LastSeenStr='<span class="span  ff_2 fs10" >'+conversation.Ed.length+' members</span>';  
 }

//--last seen
   var title='<div class="di-td vl-t  _bdy w212 p1"><div class=" _pnl ma-l-5"><span class="pnl0 truncate ">'+y.entityName+'</span><span class="pnl1 "></span><span class="pnl2  right tt-l"></span></div><div ckass="block">'+ LastSeenStr+'</div></div >';

   var avatar='<div class="di-td _bdy">  <a href="javascript:void(0);"> <img class=" round x35" alt="64x64" src="'+y.avatar+'"  > </a></div>';

   switch(W.I.initType){
       case 2:
   ch+='<div class="block bg_0 bs-1-bottom ">'+avatar+title+ dropdown+'</div >'  ;
       break;
       case 3:
   ch+='<div class="block bg_0  bs-1-bottom">'+backbutton+avatar+title+ dropdown+'</div >'  ;
       break;
       default:
          ch+='<div class="block bg_1 ">'+backbutton+avatar+title+ dropdown+'</div >'  ;
  

            }

        
        
        
        }

return ch;
}

//-->>

function ChatForm(id){
      var ch='<form name="chatform:'+id+'"  data-junction="chatform:'+id+'" onsubmit="return false;"></form>';
     W.U.Junction('chatform:'+id+'',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.Chat.SubmitChatFormData(id));
  return ch;  

}

//--------
function newconversation(){
   var ch=''
   +'<div class="block">'
    +'<div class="block bg_0 bs-1   _bdy m_b10"><div class="left "><span class="fw-b fs14"> Start new conversation </span></div> <div class="right "><button class="btn _fbtn " data-OpenCoversationPlatform="0"   ><span>New</span></button></div></div>'
   +'</div >';
   return ch; 
}
function newConversationInputForm(){
      var ch='';   var token = ''; var suggestion = {
                    name: 'conversationmember',
                    fireAfter: 4,
                    type: '1',
                    token: 'chips',
                    dropdownModule:'cardentity',
                    placeholder: 'Search Name',
                    hover: false
                };

    ch += '<form name="createconvarsation"  onsubmit="return false"><div class="block  bg_0" ><div class="block"> <div class="form-token block" data-junction="conversationmember" > <div class="block bd"><div class="block ul ul-menu">' + token + '<div class="li w212"><input type="text" name="suggestion" class="form-mold _Bdyimp" placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div></div></form>'; 
    
  W.U.Junction('conversationmember',function(){
      W.U.suggestion.bind({Node:this.Node,Value:this.data})();  
  },suggestion); 
      ch +='<div class="block bg_0 bs-1   _bdy m_b10"> <div class="right "><button class="btn _fbtn " data-junction="createconvarsation"   ><span>Create </span></button></div></div>'; 

  W.U.Junction('createconvarsation',function(){
  this.Node.onclick=W.U.Chat.CreateConvarsation;
  },{}); 
    return ch;



}

function CoversationPlatformLayout(block){
    var header='',mid='',foot='';
  
    var x=block.objectdata,margintop=0;
 
    header= coversationheader(x.id);       
    if(x.id==0){
   //header
 
    mid=newConversationInputForm();    
    }else{
   //header
  
     mid='<div class="block  _bdy "  data-junction="messagewrap:'+x.id+'"  ></div>';   


       W.U.Junction('messagewrap:'+x.id,function(){


var  PagingData=W.U.Chat.ChatPagingData;
  PagingData.TranseData={ifo:{cid:this.data.id},pgd:1};
  PagingData.Node=  this.Node;
 
   PagingData.initent= W.U.paging.getintentname(PagingData.initent) +':'+this.data.id;
  W.U.paging.init(PagingData);


  },x); 
    }



    //footer
    if(x.id!=0){
     foot=ChatForm(x.id);
    }

       if(W.I.initType==2){margintop=58; }


      return  '<div class="block  bs-1 bg_11"   >'+W.T.BottomFixWrap(header,mid,foot,'coversation'+x.id,margintop)+'</div>'; 
}

function Layout(){
    var ch='<div class="block">';   
    if(W.I.AppId=='messages'){


      if(W.I.wf=='mob'){
   ch+='<div class="block">'
     +newconversation()
     +'<div class="block" data-junction="convarstionlist" ></div>'
     +'</div >';
       }

     if(W.I.wf=='web'){
var one='',two='';
 one+=newconversation();
one+='<div class="block" data-junction="convarstionlist" ></div>';

  var BlockList=[];
BlockList.push({name:"Coversation0",htmlStr: CoversationPlatformLayout,objectdata:{id:0}});
var setting ={
    name:'CoversationPlatform',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};


two= W.T.Pager(setting);

 ch+=W.T.ColumnWrapXXX([one,two],['w-x-6','w-x-12 ma-l-5']); 
       }

  W.U.Junction('convarstionlist',function(){
   var PagingData=  W.U.Chat.convarstionlistPagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);

             },{}); 


       }
//for message page

  if(W.I.AppId=='checkins'){
var SBData=W.U.StoreBrowsing.hi_SBdata(); 
var conversation={id: SBData.cid,
                  Ed:SBData.Ed,
                  LChT:SBData.LChT
                  };

  W.U.intentdata.add('convarstionlist.'+conversation.id,conversation);

W.U.Chat.CoversationPlatformInit(SBData.cid);

  }

 

      ch+='</div>';

    return ch;
   }



function ConversationMamberPage(x){

       var Header  =W.T.DashbordFormHeader({titleText:'text_105',backblock:'Coversation'+x.id,pager:W.I.dp_c,submitbutton:false});
       var member=[];
       for(var q in x.Ed){
          member.push('<div class="block li  _bdy  bs-1"  >'+W.T.C.C2_EntityStrip(x.Ed[q],{moredata:[],imageClass:'sr-img-35 '})+'</div>'); 
       }
     



       var ch='<div class="block  " data-kkcomponent="ConversationMamberPage'+x.cid+'" >'
    
       +'<div class="block  ul bs-1 bg_0">'
       +member.join('')
       +'</div></div>';
       


    

     return   W.T.DashbordFormWrap(Header, ch);
}


 


function ProfileSendMessagePage(block){














      var Header  =W.T.DashbordFormHeader({titleText:'text_220',submitbutton:false,backblock:  W.I.dpbf ,pager:'mainpage'});
  var ch='<div class="block bg_0" data-kkcomponent="ProfileSendMessagePage" ><div class="block"><div class="block bs-0 bg_0  al-c"  kk-show="{show :this.loading==0}" >'+W.U.loading_svg(40,40,10)+'</div><div class="block bs-0 bg_0 " kk-show="{show :this.loading==1}" ><div class="block _Bdy ul ul-menu " kk-show="{show :this.loading==0}"> <div class="token li m0"> <img class="x30 round di-ib" src="http://materializecss.com/images/yuna.jpg" alt="Contact Person"> <span> @rohit </span> <span class="sclose ad-10" ></span> </div></div><div class="block _Bdy ul ul-menu bs-1"> <textarea name="" class="form-mold no-border nochange" rows="3" placeholder="Write Your message" kk-model="this.message" ></textarea> </div><div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <button type="button" class="flatbtn fg_8" data-pagerbtn="mainpage:blockfront"  >text_63</button> </div><div class=" li"><button type="button" class="flatbtn fg_7" kk-click="this.send" kk-getnode="this.sendButton" >text_221</button></div> </div></div></div></div></div></div>';


    return   W.T.DashbordFormWrap(Header, ch);
}


W.T.Chat={
ConversationMamberPage:ConversationMamberPage,
Layout:Layout ,        
CoversationPlatformLayout:CoversationPlatformLayout,
ProfileSendMessagePage:ProfileSendMessagePage,
CL:CL,
S:S
      };

})(wowrol);