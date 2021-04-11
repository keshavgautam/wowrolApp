/*
* 
*/
; (function(W){
   "use strict";

  W.U.Chats=(function(){
var onscrollticking = false; 
var chatTranseData = {
          
                ifo: {checkIn_id:0 },  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 10,  //pagesize
                tp: 0,  //total page
                tr: 0,  //total result
                pgd: 0   //paged
            };

function renderMessage(result){
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.Chats.t.t0(result)+'</div></div>')[0];

 var mainBlock=RanderInDiv.childNodes;// do not disturb it
 return mainBlock;
}


function InsertInWalkWay(result,bypass){
  
var blockmid=W.U('[data-block="mid"]', W.U.id('bottomfixwrap.contentchat'))[0];
var  walkWay=W.U('[data-block="messcon"]', blockmid)[0];

 var mainBlock=renderMessage(result);
 W.U.attrclick('[role="checkinmenu"]',mainBlock[0],W.U.CheckInStoreBrowser.OnOuterLinkLoad);
 console.log(mainBlock);
             if (bypass == 1) {

 

 W.U.Setview(walkWay,mainBlock,'html');
   walkWay.scrollIntoView(false);
                   } else {
   W.U.Setview(walkWay,mainBlock, 'prepend');
 
     blockmid.scrollTop=(blockmid.offsetHeight/2);     
      
                        }
 NormaliseDateFacet();
}  
  
function MessagePreviewData(message){
   var SBData= W.U.StoreCheckIn.SBData;
    var Data={
        id: 0,
        attmt: { has: 0, type: 0, info: Array() },
        msg:W.F.escapeHTML(message),
        Ed:SBData.Ed[SBData.role],
        facet: 0,
        date: W.U.NowDateTime() ,
        livestamp:W.U.NowDateTime()
    };

  
    return Data
}

function SendTextMessage(){
var blockmid=W.U('[data-block="mid"]', W.U.id('bottomfixwrap.contentchat'))[0];
var  walkWay=W.U('[data-block="messcon"]', blockmid)[0];
    var form="checkinchattext";
    var rv = ['message'],
      f_value = W.F.walk_way_all(rv,form);
    f_value.message =W.U.trim(f_value.message) ;
    var PreviewData=MessagePreviewData(f_value.message);
    console.log(f_value);
    console.log(PreviewData);

     

    if(f_value.message!=''){

 var mainBlock=W.U.Rander(W.T.Chats.t.t1(PreviewData));
     W.U.Setview(walkWay,mainBlock,'append');
   walkWay.scrollIntoView(false);
  W.U.GetFORM('checkinchattext').reset();


 ///-- sending it to server
    var SBData= W.U.StoreCheckIn.SBData;
    f_value.checkin=SBData.checkIn_id;
  var  formData = {
             form:form,
             f_value: f_value
            };

   W.U.ajax({
                url: W.U.URL('') + 'ajax/f0/p0',
                data: formData,
                context: this,
                type: 'POST',  
                beforeSend:function () {

                    },
                success: function(data){
               var  ret = JSON.parse(data);
                      if (ret.state == 200) {
       ret.response
                      }
                if (ret.state == 500) {
           ret.mistake
                      }


         
                }
                
                
                
                


       });





    }
}

function messconUpdate(){
   
  var walkWay=this.Node;
  if(this.result.response.result.length>0){
 var mainBlock=renderMessage(this.result.response.result);

     W.U.Setview(walkWay,mainBlock,'append');
 
   $('[data-facet="0"]').each(function () {
                    $(this).remove();

                });
       NormaliseDateFacet();   
  }
 
}

//-->>
//--Normalise datefacet date in check in block
function NormaliseDateFacet(){
var blockmid=W.U('[data-block="mid"]', W.U.id('bottomfixwrap.contentchat'))[0];
var  walkWay=W.U('[data-block="messcon"]', blockmid)[0];
var DateDate=W.U('[data-date]',walkWay);
var  reomveNode=[],p=0;
for(var q=0 ;q<DateDate.length;q++ ){
    var previousSibling=DateDate[q].previousSibling;
    if(previousSibling==DateDate[q-1]){
        reomveNode[p]=q;p++;
    }
   
    
}

for(var  q in  reomveNode){
 //$( DateDate[q]).remove();
}
}

// chat  loading
function LoadChat(){
      var Tdata=W.U.Chats.TranseData; 
var blockmid=W.U('[data-block="mid"]', W.U.id('bottomfixwrap.contentchat'))[0];
 var  walkWay=W.U('[data-block="messcon"]', blockmid)[0];
     
      var walkwayLoading=walkWay.previousSibling;
       var yOffset = blockmid.scrollTop;
        var divHeight = blockmid.scrollHeight;

  // console.log('walkWay.scrollTop ='+yOffset);
 //  console.log('walkWay.scrollHeight ='+divHeight);
  //   console.log('yOffset < divHeight ='+yOffset+' < '+ divHeight);

       if(((yOffset < 5)||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
         var form = 'paging',
     f_value = { name: 'checkInChat', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
           
        
             Tdata.slcid= Hret.selectedid,  //selected id
              Tdata.sstr= Hret.searchstr,  //search str
           Tdata. ps=  Hret.pagesize,  //pagesize
           Tdata.tp= Hret.totalpage,  //total page
            Tdata.tr= Hret.totalresult,  //total page
           Tdata.pgd=  Hret.paged   //paged

          var messages= Tdata.result;
              messages=  messages.concat(Hret.result);  

              
       InsertInWalkWay(Hret.result,Tdata.bypass);     
                     
                        }
                        
                    }

                });   


     }  
   onscrollticking = false;      
}

// chat First loading
function FirstResponseLoad(){
  var walkWay=W.U('[data-block="mid"]', W.U.id('bottomfixwrap.contentchat'))[0];
 var event = jQuery.Event('resizeouter');
         
           $(W.U.id('bottomfixwrap.contentchat')).triggerHandler(event);  

    //--
   var SBData= W.U.StoreCheckIn.SBData;
    W.U.Chats.TranseData.ifo.checkIn_id = SBData.checkIn_id;
  W.U.Chats.TranseData.bypass = 1;

  if(W.U.Chats.TranseData.pgd==0){
    LoadChat();
//onscroll


walkWay.onscroll = function(){
       if (!onscrollticking ) {  onscrollticking  = true;
   W.U.Chats.TranseData.bypass = 0;
      LoadChat();
      }
  }; 
  }
        
   
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
      W.U.StoreBrowsing.LoadInPbank([this.data.id],1,this.Node,function(){
            _this.init();
         });       
   
      } 

     if(this.data.type=='1'||this.data.type=='2'||this.data.type=='3'){
      W.U.StoreBrowsing.LoadInPbank([this.data.id],0,this.Node,function(){
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
 var info=   W.U.StoreBrowsing.GetPbankData('',this.data.id);   
 mainBlock=W.T.C.C2_Prductcard(info,{}); 
}
 if(this.data.type=='1'||this.data.type=='2'||this.data.type=='3'){
   var info= W.U.StoreBrowsing.GetPbankData(this.data.id,'') ;  
    mainBlock=W.T.C.C2_Prductcard(info,{}); 
      }   
       


   
   return  W.U.Rander(mainBlock);
        
    }

    new Handler(this.Node,this.data);
   
}

  
  
    
return {
    SendTextMessage:SendTextMessage,
FirstResponseLoad:FirstResponseLoad,
messconUpdate:messconUpdate,
    TranseData:chatTranseData,
    ManualyLoadAttachment:ManualyLoadAttachment
};
})();








})(wowrol);