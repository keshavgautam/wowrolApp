/*
* 
*/
; (function(W){
   "use strict";

   W.U.StoreBrowsing=(function(W){
//--
function CheckPbankPids(ids){
    var Notexits=[];var i=0;
    for(var  q in ids){
    var info=W.U.StoreBrowsing.GetPbankData(ids[q],'');  
    if(info==null){
     Notexits[i]=ids[q];  i++; 
    }

    }
  
  
    return Notexits;
} 

function CheckPbankCartVids(){
   var SBData=GetSBData(), cvD=SBData.cvD, cvPD=SBData.cvPD;
  
   var pid=[],i=0;
   for(var q in cvPD ){
      pid[i]= cvPD[q][1];
      i++;
   }


   return CheckPbankPids(pid);

}

//--
function LoadInPbank(Ids,Idtype,Node,callback){
      var SBData=GetSBData();

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
function GetBrowsedObjectInfo(){
     var View=W.A.page.AppView;
    var ObjectInfo={}; ObjectInfo['type']='StoreFrontPage';
    console.log('GetBrowsedObjectInfo');
      console.log(View);
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
function GetSBData(){
   return W.A.page.AppView.SBData;
}
//--
function EditCheckInFriend(feid,af,action,LoadingNode,callback){
      var SBData=GetSBData();

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

  
                        }
                        if (ret.state == 200) {
 
  W.U.StoreCheckIn.SBData=SBData=ret.response;
   
    
        
                                }
           callback(SBData);
                    }

                });
}

function AddInCart(ProductId,varientId,Quentity,LoadingNode,onDone){


   var SBData=GetSBData();

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

    W.F.ButtonState( LoadingNode,{state:'loadingoff',text:'Add To cart'}); 
                        }
                        if (ret.state == 200) {
 
    if(Quentity!=0){
     W.F.ButtonState( LoadingNode,{state:'disable',text:'Added To cart'}); 
    SBData.Pbank.push(ret.response); 
   
  SBData.cvD=    W.U.UniquePushArray(SBData.cvD,varientId) ;   
     SBData.cvPD[varientId]=[Quentity,ProductId];   
    }
    onDone(SBData);
    
        
                                }
                    }

                });


}

function AddInShortList(ProductId,Quentity,LoadingNode,onDone){
   

      var SBData=GetSBData();
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
        
                                }
                    }

                });



}
function AddInSuggestion(ProductId,Quentity,LoadingNode,onDone){

   var SBData=GetSBData();
   

    
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
  
      onDone(SBData);
        
                                }
                    }

                });

}


//--
function IsVrientInCart(vid){
    var SBData=GetSBData(), cvD=SBData.cvD,has=false; 

    for(var q  in cvD){
        if(cvD[q]==vid){
            has=true;
            break;
        }
    }
return has;
}

function IsProductShortListed(pid){
     var SBData=GetSBData(), slPD=SBData.slPD,has=false; 

    for(var q  in slPD){
        if(slPD[q]==pid){
            has=true;
            break;
        }
    }
return has;   
}
function IsProductSuggested(pid){
     var SBData=GetSBData(), suPD=SBData.suPD,has=false; 

    for(var q  in suPD){
        if(suPD[q]==pid){
            has=true;
            break;
        }
    }
return has;   
}

//-- get Pbank data

function GetPbankData(pid,vid){
       var SBData=GetSBData(),Pbank=SBData.Pbank;
   
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
    var SBData= W.U.StoreCheckIn.SBData;


var d_ch=W.F.JSONparse(SBData.d_ch,[0,10,0]);
var d_sch=parseFloat(SBData.d_sch),
 d_type=SBData.d_type,
 da=SBData.da,
 cvD=SBData.cvD,
 cvPD=SBData.cvPD,
 currency=SBData.currency;

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

  var amount = (parseFloat(varientData.sP) * parseInt(quentity)).toFixed(2);   
  var weight = (parseFloat(varientData.W) * parseInt(quentity)).toFixed(2);

      if (varientData.Wu == 'g') {
  var weight = ((parseFloat(varientData.W) / 1000) * parseInt(quentity)).toFixed(2);

            }

 total_weight = (parseFloat(total_weight) + parseFloat(weight));
   sub_total = (parseFloat(sub_total) + parseFloat(amount));



  


          
   }  
 }

  if(da==1){
       var limit=0;
       for(var q in d_ch){   
         if(d_type==="0"){
                    //weight based
         
                    if (total_weight < parseFloat(d_ch[q][0]) && total_weight > limit) {

                        if (q != 0) {
                            limit = parseFloat(d_ch[q][0]);
                            shipping_charge = parseFloat(d_ch[q][1]);
                        } else {
                            shipping_charge = parseFloat(d_ch[q][1]);
                        }
                         

                    }
                    var l = (d_ch.length - 1);

                    if (total_weight > parseFloat(d_ch[l][0])) {

                        shipping_charge = parseFloat(d_ch[l][1]);
                       
                    }



                }
        if(d_type==="1"){
                    //price based


                    if (sub_total < parseFloat(d_ch[q][0]) && sub_total >= limit) {

                        if (q != 0) {
                            limit = parseFloat(d_ch[q][0]);
                            shipping_charge = parseFloat(d_ch[q][1]);
                        } else {
                            shipping_charge = parseFloat(d_ch[q][1]);
                        }
                    }


                    var l = (d_ch.length - 1);

                    if (sub_total > parseFloat(d_ch[l][0])) {

                        shipping_charge = parseFloat(d_ch[l][1]);

                    }

                } 
     
       }

            shipping_charge = (parseFloat(shipping_charge) + parseFloat(sur_charge)).toFixed(2);
            total = (parseFloat(sub_total) + parseFloat(shipping_charge)).toFixed(2);
            sub_total = parseFloat(sub_total).toFixed(2); ;
   }else{
          shipping_charge = (parseFloat(shipping_charge) + parseFloat(sur_charge)).toFixed(2);
            total = (parseFloat(sub_total) + parseFloat(shipping_charge)).toFixed(2);    
   } 

   return { 
   total: total,
   shipping_charge:shipping_charge,
   sur_charge:sur_charge,
   sub_total:sub_total,
   total_weight:total_weight,
   currency:currency
   }

}

//public
function init(){
   var 
        SBData=GetSBData(),
        BOinfo=GetBrowsedObjectInfo();

  //  console.log(SBData);
   // console.log(  BOinfo);

    if(SBData.mode==0||SBData.mode==2||SBData.mode==3||SBData.mode==4){ 
      switch(BOinfo.type){
        case 'category':
      W.U.CategoryListing.init(BOinfo,W.U.id('categorywalkway')); 
        
        break;
       case 'product':
      W.U.ProductListing.init(BOinfo,W.U.id('walkway')); 
        
        break;   

      }  
   }
     if(SBData.mode==1){ 
    W.U.StoreCheckIn.init(SBData); 
     }
  
}

       return {
      init:init,
      AddInCart:AddInCart,
      AddInShortList:AddInShortList,
      AddInSuggestion:AddInSuggestion,   
      IsVrientInCart:IsVrientInCart,
     IsProductShortListed:IsProductShortListed,
     IsProductSuggested:IsProductSuggested,
     GetPbankData:GetPbankData,
     GetVarientData:GetVarientData,
     CalculateCart:CalculateCart,
     EditCheckInFriend:EditCheckInFriend,
     CheckPbankPids:CheckPbankPids,
     CheckPbankCartVids:CheckPbankCartVids,   
     LoadInPbank:LoadInPbank
        
       };
   })(W);


   
    

   





})(wowrol);