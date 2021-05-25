/*
* 
*/
; (function(W){
   "use strict";

//--
function CreateConversationEvent(cid){
  //--sending event

        var conversation = W.U.intentdata.get('convarstionlist.'+cid);   
        if(W.U.isOK(conversation)){
   var selfED= conversation.Ed[conversation.Edindex] ;
  W.U.IU.AddEventInUpdater(conversation.iuc,{cid:conversation.id,event:{type:'sentmessage',eid:selfED.eid}});
    }    
}
 /*
 @call W.U.Browsing.cartIconUpdate();
 */     
 function cartIconUpdate(task){
     switch(task){
        case 'getId':
    var Uid=  W.U.Updater.GetUpdateId('cartalert');
      return   ' data-point="'+Uid+'" '
        break; 

        case 'update':
   var checkPids=W.U.Browsing.CheckPbankCartVids();
   if(checkPids.length==0){
   W.U.Browsing.cartIconUpdate('do');
     }else{
     var _this=this;
 W.U.Browsing.LoadInPbank(checkPids,0,null,function(){
         W.U.Browsing.cartIconUpdate('do');
         });
     }    
        break;
    case 'do':
           var SBData=W.U.Browsing.hi_SBdata(),  cvD=SBData.cvD,cvPD=SBData.cvPD,count=0;
for(var q in cvD){
     var info=W.U.Browsing.GetPbankData('',cvD[q]); 
     if(W.U.isOK(info)){
   count+=W.U.intval(cvPD[cvD[q]][0]);
   }
 }  
     
         W.U.ccbk.Run( W.U.Page,
 "updateView_cartalert",
 {data:{id:0,count:count},template:function(data){

     return (data.count!=0)?data.count:'';
 }});
    W.U.ccbk.Run('oncartupdated');
        break;
   
     }
 }
   //--
function CheckPbankPids(ids){
    var Notexits=[];var i=0;
    for(var  q in ids){
    var info=W.U.Browsing.GetPbankData(ids[q],'');  
    if(info==null){
     Notexits[i]=ids[q];  i++; 
    }

    }
  
  
    return Notexits;
} 
//--
function CheckPbankCartVids(){
     var SBData=W.U.StoreBrowsing.hi_SBdata(), cvD=SBData.cvD, cvPD=SBData.cvPD;
  
   var pid=[],i=0;
   for(var q in cvPD ){
      pid[i]= cvPD[q][1];
      i++;
   }


   return CheckPbankPids(pid);

}

//--
function LoadInPbank(Ids,Idtype,Node,callback){
       var SBData=W.U.StoreBrowsing.hi_SBdata();
       W.U.console(SBData);
     var formData = {
                   form: 'LoadInPbank',
                   f_value: {ids:Ids,Idtype:Idtype,eid:SBData.Ed[0].eid}
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
     $(Node).html( W.T.blockLoading());

                    },
                    success: function (data) {
 
    $(Node).html('');

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
   
                        }
                        if (ret.state == 200) {

    
      for(var q in ret.response ){
          SBData.Pbank.push(ret.response[q]); 
          
      }
   callback();
                                }
                    }

                });

}
//--
function LoadEntityCard(Ids,Node,callback){
     var  f_value={ids:Ids};
  
        var loadingId= W.F.Load('LoadEntityCard',f_value);
     W.U.ccbk.Add('progress'+loadingId ,function(){   $(Node).html( W.T.blockLoading());       });
     W.U.ccbk.Add('complete'+loadingId ,function(){    $(Node).html( '');      });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){   
     
     for(var q in data){
        W.U.intentdata.add('entitycarddata.'+data[q].ESd.eid,data[q]);   
     }   
   
       callback();
       });
     W.U.ccbk.Run('load'+loadingId );  
}

//--
function EditCheckInFriend(feid,af,action,LoadingNode,callback){
      var    SBData=W.U.StoreBrowsing.hi_SBdata();

    var formData = {
                    form: 'checkinmemberedit',
                    f_value: {feid:feid,af:af,action:action,checkin:SBData.checkIn_id}
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
W.F.Toast({msg:'action_not_completed ',theme:'error'});
  
                        }
                        if (ret.state == 200) {
 
SBData=ret.response;
   //saving
    W.U.StoreBrowsing.hi_SBdata(SBData);


  var Toastmeg=  (action==1)?'successfully_added':'successfully_removed';
    W.F.Toast({msg:Toastmeg});
        
                                }
           callback(SBData);
   CreateConversationEvent(SBData.cid);
                    }

                });
}



//--

function AddInCart(ProductId,varientId,Quentity,LoadingNode,onDone,error_text,sucess_text,makeDisable){
    error_text=(!W.U.isOK(error_text))?'Add To cart':error_text;
    sucess_text=(!W.U.isOK(sucess_text))?'Added To cart':sucess_text;
    debugger;
  
 var   state=(!W.U.isOK(makeDisable))?'disable':(makeDisable)?'disable':'loadingoff';

   var SBData=hi_SBdata();

    var formData = {
                    form: 'checkincartedit',
                    f_value: {pid:ProductId,vid:varientId,q:Quentity,checkin:SBData.checkIn_id}
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
              W.F.ButtonState( LoadingNode,{state:'loading',svg:true});
            
                    },
                    success: function (data) {
           var ret = JSON.parse(data);
          
                        if (ret.state == 500) {

    W.F.ButtonState( LoadingNode,{state:'loadingoff',text:error_text}); 
                        }
                        if (ret.state == 200) {
    W.F.ButtonState( LoadingNode,{state:'loadingoff',text:sucess_text}); 
    if(Quentity!=0){
  
    SBData.Pbank.push(ret.response); 
   
   
  SBData.cvD=    W.U.UniquePushArray(SBData.cvD,varientId) ;   
     SBData.cvPD[varientId]=[Quentity,ProductId];   
//saveing new SBData
     hi_SBdata(SBData);
    

    }
      if(Quentity==0){
            SBData.cvD=    W.U.removeInArray(SBData.cvD,varientId) ;   
               hi_SBdata(SBData);
      }
    onDone(SBData);
       W.U.Browsing.cartIconUpdate('update');
    
   CreateConversationEvent(SBData.cid);
        
                                }
                    }

                });


}

function AddInShortList(ProductId,Quentity,LoadingNode,onDone){
   

     var SBData=hi_SBdata();
    var formData = {
                    form: 'checkinshortListedit',
                   f_value: {pid:ProductId,q:Quentity,checkin:SBData.checkIn_id}
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
    W.F.ButtonState(LoadingNode,{state:'loading',svg:true});

                    },
                    success: function (data) {
 


                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
    W.F.ButtonState(LoadingNode,{state:'loadingoff',text:'ShortList'}); 
                        }
                        if (ret.state == 200) {
  
     onDone(SBData);
    if(Quentity!=0){
   W.F.ButtonState(LoadingNode,{state:'disable',text:'ShortListed'}); 
    SBData.Pbank.push(ret.response); 
      SBData.slPD=    W.U.UniquePushArray(SBData.slPD,ProductId) ;     
}else{
     SBData.slPD= W.U.removeInArray(SBData.slPD,ProductId);
}
         //saving
    W.U.StoreBrowsing.hi_SBdata(SBData);
       CreateConversationEvent(SBData.cid);
                                }
                    }

                });



}
function AddInSuggestion(ProductId,Quentity,LoadingNode,onDone){

   var SBData=hi_SBdata();
   

    
 var formData = {
                    form: 'checkinsuggestedit',
                    f_value: {pid:ProductId,q:Quentity,checkin:SBData.checkIn_id}
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
              W.F.ButtonState( LoadingNode,{state:'loading',svg:true});
            
                    },
                   success: function (data) {
 


                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
    W.F.ButtonState(LoadingNode,{state:'loadingoff',text:'Suggest'}); 
                        }
                        if (ret.state == 200) {
if(Quentity!=0){
    W.F.ButtonState(LoadingNode,{state:'disable',text:'Suggested'}); 
    SBData.Pbank.push(ret.response); 
      SBData.suPD=    W.U.UniquePushArray(SBData.suPD,ProductId) ;    
}else{
     SBData.suPD= W.U.removeInArray(SBData.suPD,ProductId);
}
      //saving
    W.U.StoreBrowsing.hi_SBdata(SBData);
      onDone(SBData);
    CreateConversationEvent(SBData.cid);       
                                }
                    }

                });

}
//--
function IsVrientInCart(vid){
   var SBData=W.U.StoreBrowsing.hi_SBdata(),has=false;
   if(W.U.isOK(SBData)){
        var cvD=SBData.cvD; 

    for(var q  in cvD){
        if(cvD[q]==vid){
            has=true;
            break;
        }
    } 
   }
 

return has;
}
//--
function IsProductShortListed(pid){
     var SBData=W.U.StoreBrowsing.hi_SBdata(),has=false;
     if(W.U.isOK(SBData)){
     var  slPD=SBData.slPD; 

    for(var q  in slPD){
        if(slPD[q]==pid){
            has=true;
            break;
        }
    }
    
    }
return has;   
}
//--

function IsProductSuggested(pid){
     var SBData=W.U.StoreBrowsing.hi_SBdata(), suPD=SBData.suPD,has=false; 

    for(var q  in suPD){
        if(suPD[q]==pid){
            has=true;
            break;
        }
    }
return has;   
}



//--
function GetPbankData(pid,vid){
       var SBData=W.U.StoreBrowsing.hi_SBdata(),Pbank=SBData.Pbank;
 
  var match_pid=null;
    if(vid !=''){
 for(var q in Pbank){
     var pvL=Pbank[q].pvL; 
     for(var p in pvL){

    if(parseInt(vid)==parseInt(pvL[p].vid)){
     
         pid= Pbank[q].pid; 
         }
     }
   
 }

        

    }
       
    for(var q in Pbank){
    var pvL=Pbank[q];
    
    if(parseInt(pid)==parseInt(pvL.pid)){
     match_pid=pvL;
     break;
         }
   
 }

 return  match_pid;
}
//--
function GetVarientData(x,vid){
var Data=x.pvL[0];
    for(var q  in x.pvL){
     if(vid==x.pvL[q].vid){
 //var prices=[x.pvL[q].sP,x.pvL[q].cP];
 Data=x.pvL[q];        

     }   
    }

    return Data;
}

// calculate cart

function CalculateCart(){
    var ch='',address_id,buyerAddess,storeAddess,address;

    var SBData=W.U.StoreBrowsing.hi_SBdata();
 address_id=SBData.addr_id;
 if( W.U.ObjectLength(SBData.addr)>0){
   buyerAddess=SBData.addr[1][ address_id];
 storeAddess=SBData.addr[0];
 address=(W.U.isOK(buyerAddess))?buyerAddess: storeAddess;   
 }else{
     address=W.I.DefaultAddress; 
 }

 
var d_ch=W.F.JSONparse( address.d_ch,[0,10,0]),
 d_sch=W.U.floatval( address.d_sch),
 d_type= address.d_type,
 da= address.da,
 cvD=SBData.cvD,
 cvPD=SBData.cvPD,
 discount=W.U.floatval(SBData.dData.total),
 currency=SBData.currency,
  currencysymbol=SBData.currencydata.symbol;
  var sub_total = 0,
  total_weight = 0.00,
 total = 0.00,
 shipping_charge = 0.00,
 sur_charge =d_sch;;




 for(var q in cvD){
     var info=W.U.StoreBrowsing.GetPbankData('',cvD[q]); 
    
     var quentity=  cvPD[cvD[q]][0]; 
   
 if(info!=null){
  
var varientData=W.U.StoreBrowsing.GetVarientData(info,cvD[q]);  
var prices=[varientData.sP,varientData.cP];

  var amount = ( W.U.floatval(varientData.sP) *  W.U.floatval(quentity)).toFixed(2);   
  var weight = ( W.U.floatval(varientData.W) *  W.U.floatval(quentity)).toFixed(2);

      if (varientData.Wu == 'g') {
  var weight = (( W.U.floatval(varientData.W) / 1000) * parseInt(quentity)).toFixed(2);

            }

 total_weight = ( W.U.floatval(total_weight) +  W.U.floatval(weight));
   sub_total = ( W.U.floatval(sub_total) +  W.U.floatval(amount));



  


          
   }  
 }

  if(da==1){
       var limit=0;
       for(var q in d_ch){   
         if(d_type==="0"){
                    //weight based
         
                    if (total_weight <  W.U.floatval(d_ch[q][0]) && total_weight > limit) {

                        if (q != 0) {
                            limit =  W.U.floatval(d_ch[q][0]);
                            shipping_charge =  W.U.floatval(d_ch[q][1]);
                        } else {
                            shipping_charge =  W.U.floatval(d_ch[q][1]);
                        }
                         

                    }
                    var l = (d_ch.length - 1);

                    if (total_weight >  W.U.floatval(d_ch[l][0])) {

                        shipping_charge =  W.U.floatval(d_ch[l][1]);
                       
                    }



                }
        if(d_type==="1"){
                    //price based


                    if (sub_total < W.U.floatval(d_ch[q][0]) && sub_total >= limit) {

                        if (q != 0) {
                            limit = W.U.floatval(d_ch[q][0]);
                            shipping_charge = W.U.floatval(d_ch[q][1]);
                        } else {
                            shipping_charge = W.U.floatval(d_ch[q][1]);
                        }
                    }


                    var l = (d_ch.length - 1);

                    if (sub_total > W.U.floatval(d_ch[l][0])) {

                        shipping_charge = W.U.floatval(d_ch[l][1]);

                    }

                } 
     
       }

            shipping_charge = W.U.floatval(shipping_charge) + W.U.floatval(sur_charge);
          total = W.U.floatval(sub_total) +  W.U.floatval(shipping_charge); 
            sub_total = W.U.floatval(sub_total); ;
           
   }else{
           shipping_charge = W.U.floatval(shipping_charge) + W.U.floatval(sur_charge);
            total = W.U.floatval(sub_total) +  W.U.floatval(shipping_charge);    
   } 
 //debugger;
   //-- apply discount iffect
if(SBData.dData.ifs==1){
    total = W.U.floatval(sub_total);   
    shipping_charge=0.00; 
}
//-- apply main discount 

 total =W.U.floatval( total)-W.U.floatval(discount); 

     total = ( W.U.floatval( total)).toFixed(2);   
    sub_total = W.U.floatval(sub_total).toFixed(2); 
  shipping_charge = W.U.floatval(shipping_charge).toFixed(2); 
  sub_total = W.U.floatval(sub_total).toFixed(2); 




   return { 
   total: total,
   shipping_charge:shipping_charge,
   sur_charge:sur_charge,
   discount: discount,
   sub_total:sub_total,
   total_weight:total_weight,
   currency:currency,
   currencysymbol:  currencysymbol
   }

}

//--     
function GetBrowsedObjectInfo(View){
    
    var ObjectInfo=View; ObjectInfo['type']='StoreFrontPage';


    //W.U.console('GetBrowsedObjectInfo');
     //W.U.console(View);
    if(View['CategoryInfo']!=undefined){
        ObjectInfo=View.CategoryInfo;
         ObjectInfo['type']='category';
    }
  if(View['ProductInfo']!=undefined){
        ObjectInfo=View.ProductInfo;
         ObjectInfo['type']='product';
    }


    return ObjectInfo;
}
/*
@des update and get sbdata
*   W.U.StoreBrowsing.hi_SBdata()
*/
function hi_SBdata(SBData){
    if(!W.U.isOK(SBData)){
        SBData= W.U.intentdata.get('SBdata');
    }else{
          //W.U.console(IntentName);
  var IntentName='checkInlist.'+SBData.id;

SBData.updater_id=   W.U.Updater.GetUpdateId(IntentName);

   W.U.intentdata.add('SBdata',SBData);
    W.U.intentdata.add(IntentName,SBData);
      if(SBData.mode==1){
     W.I.checkinstoreId=SBData.Ed[0].eid;
 
    }else  if(SBData.mode==2){
        W.I.checkinstoreId=W.A.page.AppView.EntityStripdata.eid; 
    }else if(SBData.mode==3){
           W.I.checkinstoreId=W.A.page.AppView.EntityStripdata.eid; 
    }else{
        //  W.I.checkinstoreId=SBData.Ed[0].eid;
     W.I.checkinstoreId=   W.A.page.AppView.EntityStripdata.eid; 
    }

       W.U.checkins.checkinexplorelinksUpdate('All',SBData);
    }
    
      return SBData;
}

/*
@des 
*/
function initPage(){
   
       var 
        SBData=hi_SBdata(),
        BOinfo=GetBrowsedObjectInfo(W.A.page.AppView),UpdateSBdata=false;

       

    // 0=> Normal || 1 => through checkin Page || 2 => self store visiting || 3 => Logout
      if(SBData.mode==0||SBData.mode==2||SBData.mode==3||SBData.mode==4){ 
    
      switch(BOinfo.type){
        case 'category':
      W.U.CategoryListing.init(BOinfo,W.U.id('browseingwalkway')); 
        UpdateSBdata=true;
        break;
       case 'product':
      W.U.ProductListing.init(BOinfo,W.U.id('browseingwalkway')); 
        UpdateSBdata=true;
        break;   
        case 'StoreFrontPage':
    

      W.U.ProfilePage.StoreFrontPage(BOinfo,W.U.id('browseingwalkway'));
        UpdateSBdata=true;
        break;  
      }  
        W.U.Browsing.cartIconUpdate('update');
   }


   if(SBData.mode==1){ 
   W.U.checkins.init(BOinfo,W.U.id('browseingwalkway')); 
     }

// sb data updater
 W.U.Updater.AddInRail("main",{data:{name:"SBdata",init:{cid:SBData.cid}},Node:null,onsucess:function(data){
    
    hi_SBdata(data);
 },essential:true});


}
//public
function init(){
  // check for SB data present or not


    if(!W.U.isOK(W.A.page.AppView.SBData)){
var URL_info=W.U.ParseHref(location.href);     
    var getvarinfo= URL_info.vars;  
     
    var action =(W.U.isOK(getvarinfo['action']))?getvarinfo['action'].replace(/\'/igm,""):null,
    checkin_id=(W.U.isOK(getvarinfo['id']))?getvarinfo['id']:null,
    store_id=(W.U.isOK(getvarinfo['store_id']))?getvarinfo['store_id']:null,
    newMember_id=(W.U.isOK(getvarinfo['member_id']))?getvarinfo['member_id']:null;

    var PerformAction=0;//'listshow';
     if(checkin_id!=null){
       PerformAction=1;//'checkinload'; 
    }
     if(action=="create"&&store_id!=null){
       PerformAction=2;//'newcheckin_init'; 
    }
   if(action=="add"&&store_id!=null&&newMember_id!=null){
       PerformAction=3;//'newcheckin_initwith_new_member'; 
    }

  
    switch(PerformAction){
      case 1:
       var loadingId= W.F.Load('loadSBdata',{checkin_id:checkin_id});
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){ W.U.StoreBrowsing.hi_SBdata(data);   initPage()  });
     W.U.ccbk.Add('complete500'+loadingId ,function(data){ ErrorNotFound();});
     W.U.ccbk.Run('load'+loadingId );  
      
     break;
      case 2:
        //http://localhost:3325/checkins?action=="add"&store_id=``
          var loadingId= W.F.Load('createcheckinbystore_id',{store_id:store_id});
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){   W.U.StoreBrowsing.hi_SBdata(data);  initPage()    });
     W.U.ccbk.Run('load'+loadingId );  
      break;
      
      case 3:
      //http://localhost:3325/checkins?action=="add"&store_id=``&member_id=``
     var loadingId= W.F.Load('checkin_initwith_new_member',{store_id:store_id,entity_id:newMember_id});
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){    W.U.StoreBrowsing.hi_SBdata(data);    initPage();   W.F.Toast('text_291');    });
     W.U.ccbk.Add('complete500'+loadingId ,function(data){  W.F.Toast({msg:'text_281',callback:function(){ W.F.Toast('text_280'); W.U.GotoHref('checkins');  }});       });
     W.U.ccbk.Run('load'+loadingId );  


      break;
      default:
          W.U.checkins.List(W.U.id('browseingwalkway')); 
        
    }



 



      // W.U.console(action);  W.U.console(checkin_id);
    }else{
          W.U.console(W.A.page.AppView.SBData);
        var  SBData=hi_SBdata(W.A.page.AppView.SBData);
           initPage();     
    }

  

}


/* W.U.Browsing.updateChatStrip(Conversation,data);
@
*/
function updateChatStrip(Conversation,data){
    var update_id= Conversation.updater_id;
      var mesStr='',badgeStr='',timeStr='', message_timeNode,AddCss,removeCss,badgecount=0,isRead=true;
   
 badgecount=Conversation.ucount;

var lastCheckTime=Conversation.LChT[Conversation.Edindex];

      for(var q in data){
          if(data[q].type==1){
            mesStr=W.U.ParseText(data[q].msg); 
            message_timeNode=W.U.intval(data[q].tn);
            timeStr=data[q].dateday; 
          }
            if(data[q].type==0){
            mesStr='You :'+W.U.ParseText(data[q].msg); 
            timeStr=data[q].dateday; 
          }
      }
      

 badgeStr=(badgecount==0)?'':badgecount; 
if(badgecount>0){
    AddCss='bg_1 fg_10';removeCss=' fg_11';  isRead=true;   

   W.U.Chat.USNoti.add(Conversation.id,Conversation.ucount);

}else{   AddCss=' fg_11';removeCss='bg_1 fg_10'; }

    if(W.U.isOK(update_id)){
       
        if(mesStr!=''){
            $('[data-point="'+update_id+'"]').find('.infomessage').html(mesStr);
              $('[data-point="'+update_id+'"]').find('.time').html(timeStr);
        }
         $('[data-point="'+update_id+'"]').find('.badge-0').html(badgeStr);
        $('[data-point="'+update_id+'"]').addClass(AddCss).removeClass(removeCss);



    }

    // if we are at checkin page than 
if(W.U.isOK( W.U.checkins)){
    W.U.checkins.checkinexplorelinksUpdate('Chats',{updater_id:update_id,badgeStr:badgeStr,mesStr:mesStr,isRead:isRead,AddCss:AddCss,removeCss:removeCss});
}
    
}
/* W.U.Browsing.updateChatStrip(updater_id,data);
@
*/
function DepositeCoverstionIdForListUpdate(id){

  var AllId=  W.U.intentdata.get('CoverstionIdForListUpdate');
   if(W.U.isOK(AllId)){
       AllId.push(id);
     W.U.intentdata.add('CoverstionIdForListUpdate',AllId);  
   }else{
       W.U.intentdata.add('CoverstionIdForListUpdate',[id]);   
   }






}
/*
@
*/
function ErrorNotFound(){
         var ch='<div class="block bs-2dp bg_0 _bdy m_b10"><div class="block " style="padding-top:100px; "><span class="block al-c" style=""></span> <div class="text ff_0 fs12"> <h2 class="al-c">404 error! page not found.</h2><div class=" al-c"> <div class="block"> <h3 class="m_b5"> Sorry ! The page you want to view, not found.</h3> </div> </div></div></div></div>';
    W.U.AddDom(W.U.id('browseingwalkway'),ch,'html');
}

/*
@call W.U.Browsing.ParseEntityData();
*/

function ParseEntityData(x){
      var y={
          entityName:'',
          avatar:''
          };
var z=[],p=0;
for(var q in x){
    if(x[q].eid!=W.A.page.AppView.EntityStripdata.eid){
      z[p]=  x[q];p++;
    }
}
//W.U.console(z);
var names=[];
      for(var q in z ){
         
      
        names.push(z[q].entityName);
          y.avatar= z[q].avatar;
      }
  
      if(names.length>1){
        y.avatar= W.C.Setting.staticHTML+'/assets/imgs/pic/GroupAvatar1@2x.png'   
      }
        y.entityName+= names.join(',&nbsp;') ;



      return y
  }

/*
@call W.U.Browsing.CheckInDescrition();
*/
function CheckInDescrition(x){
    var ret={
        date:'',
        name:'',
        line1:''
    };
    var storeEd=x.Ed[0],buyerEd=x.Ed[1],selfEd=x.Ed[x.role],friends=[];
    switch(x.role){
        case 0:
ret.line1=W.U.strformat("shopping of {0} ",buyerEd.entityName); 
ret.name=buyerEd.entityName; 
        break;
        case 1:
ret.line1=W.U.strformat("shopping at {0} ",storeEd.entityName); 
ret.name=storeEd.entityName; 
        break;
        default:
ret.line1=W.U.strformat("shopping of {0} ",buyerEd.entityName); 
ret.name=buyerEd.entityName; 
    }

    if(x.Ed.length>2){
 ret.line1+=' with ';

        for(var p=2;p<x.Ed.length;p++){
      
         friends.push(x.Ed[p].entityName);
         if(p>5){p=x.Ed.length;}     
        }
           ret.line1+= friends.join(','); 
          if(x.Ed.length>5){
               ret.line1+=' and other friends.';
              }     
    }

    return  ret;
}
/*
@des Over the time we need to update current SBdata
@call W.U.Browsing.UpdateSBData;
*/
function UpdateSBData(callback){
    var SBdata = W.U.StoreBrowsing.hi_SBdata();
    if(W.U.isOK(SBdata)){
        var loadingId= W.F.Load('loadSBdata',{checkin_id:SBdata.checkIn_id});
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){ 
     W.U.StoreBrowsing.hi_SBdata(data);  callback();
      W.U.checkins.checkinexplorelinksUpdate('All',data);
     
        });
     W.U.ccbk.Add('complete500'+loadingId ,function(data){  W.F.Toast('text_110');  });
     W.U.ccbk.Run('load'+loadingId );   
    }
       
}

/*
@des whwn we are in chat we need to update
@call W.U.Browsing.UpdateSBDataFromChat();
*/
  
function UpdateSBDataFromChat(newSBdata){
    var SBDATA= W.U.StoreBrowsing.hi_SBdata();


    SBDATA['cvD']=newSBdata['cvD'];
    SBDATA['cvPD']=newSBdata['cvPD'];
    SBDATA['slPD']=newSBdata['slPD'];
    SBDATA['suPD']=newSBdata['suPD'];  
    SBDATA['dData']=newSBdata['dData'];  
        
     W.U.StoreBrowsing.hi_SBdata(SBDATA);
        W.U.checkins.checkinexplorelinksUpdate('All',SBDATA);
}


W.U.StoreBrowsing=W.U.Browsing= {
      init:init,
      CheckPbankCartVids:CheckPbankCartVids,
      CheckPbankPids:CheckPbankPids,
      LoadInPbank:LoadInPbank,
      EditCheckInFriend:EditCheckInFriend,
      AddInCart:AddInCart,
      AddInShortList:AddInShortList,
      AddInSuggestion:AddInSuggestion,   
      hi_SBdata:hi_SBdata,
      IsVrientInCart:IsVrientInCart,
      IsProductShortListed:IsProductShortListed,
      IsProductSuggested:IsProductSuggested,
      BOinfo:GetBrowsedObjectInfo,
      CalculateCart:CalculateCart,
       GetPbankData:GetPbankData ,
       GetVarientData:GetVarientData,
       ParseEntityData:ParseEntityData,
       LoadEntityCard:LoadEntityCard,
       cartIconUpdate:cartIconUpdate,
       updateChatStrip:updateChatStrip,
       DepositeCoverstionIdForListUpdate:DepositeCoverstionIdForListUpdate,
       UpdateSBData:UpdateSBData,
      CheckInDescrition:CheckInDescrition,
      UpdateSBDataFromChat:UpdateSBDataFromChat
       };
   
    
function AddCartinit(){
    
W.U.Junction('cartbtninit',function(){
    this.Node.onclick=W.U.CheckInCart.CartPage;
},{});
W.U.Junction('checkoutbtninit',function(){
    this.Node.onclick=W.U.CheckInCheckout.CheckOutPage;
},{});
}
   
 W.U.ccbk.Add('pageloaded',AddCartinit);
 W.U.ccbk.Add('beforepageloaded',AddCartinit);

})(wowrol);