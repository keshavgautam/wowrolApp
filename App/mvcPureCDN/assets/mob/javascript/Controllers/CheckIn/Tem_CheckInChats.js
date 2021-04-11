/*
* 
*/
; (function(W){
   "use strict";
   var tem=(function(){
       var messageIndex=0;
  var t={
      t0:function(x){
          var ch = ''; messageIndex=0;
        for (var q in x) {
            if (x[q].type == 0) {


               ch += t.t1(Makeinsertable(x[q]));

            }
            if (x[q].type == 1) {
               ch += t.t2(Makeinsertable(x[q]));

            }
            if (x[q].type == 3) {
               ch += t.t3(x[q]);

            }
        }


        return ch;
          
      },
      t1:function(x){//ChatMessageBodySent
       var ch='';
       var attmt='';

      if(x.attmt.has==1){
      attmt=t.attmt(x.attmt);
          }

     var moredata=[];

      moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');

        var ch='<div class="block _msr  _t se" data-facet="' + x.facet + '"> <div class="c1 "> <div class="msg_con"> <div class="arrow"></div><div class="block _bdy">  '+W.T.C.C2_EntityStrip(x.Ed,{moredata:moredata,imageClass:'sr-img-35 '})+'<div class="t-h rc t m_t5"> <p>'+x.msg+'</p></div></div>'+attmt+'</div></div></div>';
     messageIndex++;
    return ch;   
      },
       t2:function(x){//ChatMessageBodyReceve
            var ch='';
var attmt='';

      if(x.attmt.has==1){
      

   attmt=t.attmt(x.attmt);
 }

 var moredata=[];

      moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');

  ch='<div class="block _msr  _t re" data-facet="' + x.facet + '"> <div class="c1 "> <div class="msg_con"> <div class="arrow"></div><div class="block _bdy"> '+W.T.C.C2_EntityStrip(x.Ed,{moredata:moredata,imageClass:'sr-img-35'})+'<div class="t-h rc t m_t5"> <p>'+x.msg+'</p></div></div>'+attmt+'</div></div></div>';
   messageIndex++;

    return ch;  
      },
     t3: function (x) {
  $('[data-date="' + x.date + '"]').remove();
var ch = '<div class="_msr _r al-c" data-facet="' + x.facet + '" data-date="' + x.date + '" ><div class="span fs13"><p>' + x.message + '</p></div></div>';


        return ch;
    },
      attmt:function(x){
          var ch='';
          if(x.type==0||x.type==1||x.type==2||x.type==3){

  if(x.info!=null){
  ch+='<div class="block " >'+t.attmtHeading(x.type)+'<div class="block  bg_0" >'+W.T.C.C2_Prductcard(x.info,{})+'</div></div>'; 
        }else{
      //manually loading of attachment
 ch+='<div class="block " >'+t.attmtHeading(x.type)+'<div class="block  bg_0" data-junction="attmt:'+x.type+':'+x.id+'"></div></div>';     
    
     
    W.U.JunctionAdd(W.A.page.AppId,'attmt:'+x.type+':'+x.id+'',function(){
 W.U.Chats.ManualyLoadAttachment.bind({Node:this.Node,data:this.data})();
  },x);    
            
           }


          }
 
          return ch;
      },
      attmtHeading:function(x){
     var ch='';
     switch(parseInt(x)){
       case 0 :
       ch+='<div class="block _bdy fw-b" > Added in cart</div>';
       break; 
       case 1 :
     ch+='<div class="block _bdy fw-b" > Shortlisted </div>';
       break;
       case 2 :
      ch+='<div class="block _bdy fw-b" > Suggested </div>';
       break;
       case 3 :
      ch+='<div class="block _bdy fw-b" > inquiry  </div>';
       break;
     }
  
     return ch;
     }




  }



function Makeinsertable(x){
  var SBData= W.U.StoreCheckIn.SBData;
 
     if(x.attmt.has==1){
        
      if(x.attmt.type=='0'){
     x.attmt.info=   W.U.StoreBrowsing.GetPbankData('',x.attmt.id);   
      }
       if(x.attmt.type=='1'||x.attmt.type=='2'||x.attmt.type=='3'){
            
     x.attmt.info=   W.U.StoreBrowsing.GetPbankData(x.attmt.id,'') ;  
      }

 }


    var Data={
       mid: x.mid,
        attmt: x.attmt,
        msg:x.msg,
        Ed:SBData.Ed[x.sidr],
        facet: x.facet,
        date: x.date,
        livestamp: x.date
    }; 
/*
 if(x.attmt.info==null){// error hanndling of null ITem info value
    x.attmt.has=0; 
  Data.msg="Selected item has deselected now. so it is not avaiable<br>x.attmt.id="+x.attmt.id;
 }
 */
 
    return Data;
}

function ChatInputBottom(){
    var ch='';
    if(W.U.browser.mobile){
       ch+='<div class="block form-piece b_gtl"><form name="checkinchattext" onsubmit="return false;">  <div class="input-group"> <textarea name="message" class="form-mold textarea" placeholder="Write a message" rows="1" data-junction="chatinputtextarea" style="max-height: 100px;" ></textarea> <span class="input-group-btn"> <button class="btn " data-junction="chatinputsubmit" type="button">'+W.T.SVG('sent',14,'#1274c0')+'</button> </span> </div></form></div>';   
    }else{
        ch+='<div class="block b_gtl"><form name="checkinchattext" onsubmit="return false;"> <div class="block"><textarea name="message" class="form-mold textarea" placeholder="Write a message" rows="1" data-junction="chatinputtextarea" style="max-height:200px;" ></textarea></div><div class="block _bdy "> <div class="span right"><div class="span"> <div class="checkbox m0"> <label> <input type="checkbox" name="useenter" id="ue" value="1"><span></span> Use Enter </label> </div></div><div class="span po-re"> <button type="button" class="btn hitbtn " data-junction="chatinputsubmit"  >Send</button></div></div></div></form></div>';

 

    }
 W.U.JunctionAdd(W.A.page.AppId,'chatinputtextarea',function(){
    
    $(this.Node).on('autosize:resized',function(){
           var event = jQuery.Event('resizeouter');
         
           $(W.U.id('bottomfixwrap.contentchat')).triggerHandler(event);   
    });
   

  },{});  
   W.U.JunctionAdd(W.A.page.AppId,'chatinputsubmit',function(){
    
 this.Node.onclick=W.U.Chats.SendTextMessage;
   

  },{}); 

  
    return ch;
}


//---------



 




function ContentChat(SBData){
  var URL=W.U.URL;
 var mid =  '<div class="block   ov-hi b_gtl ">';
     mid +='<div class="block _Bdy"></div>';
     mid +='<div class="_ms block po-re _bdy" data-block="messcon" data-junction="messconupdate" ></div>';
     mid +='<div class="block _Bdy"><span class="mklabel" >Typing..</span></div>';

     mid +='</div>';



       W.U.JunctionAdd(W.A.page.AppId,'messconupdate',function(){
 W.U.Updater.bind({Node:this.Node,Value:this.data})();
        },{Module:t,
          View:{},
          data:{name:"checkinchat",init:{checin_id:SBData.checkIn_id}},
          callback:W.U.Chats.messconUpdate,
          setting:{isLive:true,
                  essential:true
                }}); 


     var foot = ChatInputBottom();
    var header= W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="checkin" >'+W.T.SVG('checkIn',24,'#f1f5fc')+'</a>',
    Title:'<a href="/" class="left"><span class="title" >checkin chat</span><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    });
 

  return W.T.BottomFixWrap(header,mid,foot,'contentchat');
 }



 
  
  
    
return {
ContentChat:ContentChat,
t:t
};
})();



W.T.Chats=tem;





})(wowrol);