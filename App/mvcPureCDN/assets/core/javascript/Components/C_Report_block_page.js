;(function (W) {
    /*
    */
function UnblockSubmit(eid,af){
       var   formname='block_user',alert_mes=[],error=0, f_value= {};

   f_value.action = '0';
   f_value.feid =eid;
   f_value.af =af;


     W.F.Submit({ formname:formname,
       f_value:f_value,
       create_alert_mes:true,
       madianLoading:true,
       complete:function(data){
         if( W.I.AppId=='setting_buyer'){
        var Nodes= W.U.paging.GetNode('getblockuserlist'); 
             $(Nodes.main).empty();
     var TranseData = W.U.paging.GetTranseData('getblockuserlist');
            TranseData.pgd=1;
       W.U.paging.load('getblockuserlist',TranseData); 
            
         }
 if( W.I.AppId=='ProfilePageBuyer'|| W.I.AppId=='ProfilePageStore'){
    W.U.GotoHref(W.U.URL(W.A.page.AppView.EntityStripdata.slug));
            
         }
  

       },
       complete200:function(data){
  
  

W.F.Toast({msg:'ajax_37',theme:'',duration:2000});
       },
       complete500:function(data){
  
W.F.Toast({msg:'ajax_35',theme:'',duration:2000});


       }
       });



};
/**/
function blockSubmit(){

   var   formname='block_user',alert_mes=[],error=2, f_value= W.F.walk_way_all(['feid','af'],  formname);

   f_value.action =1;

     W.F.Submit({ formname:formname,
       f_value:f_value,
       create_alert_mes:true,
       madianLoading:false, 
       button:W.U('[data-btn="block_user_submit"]')[0],
       buttonstateargs:{text:'block',LoadingText:'blocking'},
       complete:function(data){
  
  W.U.Pager.togglePage('mainpage','blockFront'); 
    if( W.I.AppId=='ProfilePageBuyer'|| W.I.AppId=='ProfilePageStore'){
    W.U.GotoHref(W.U.URL(W.A.page.AppView.EntityStripdata.slug));
            
         }

       },
       complete200:function(data){
  
  

W.F.Toast({msg:'ajax_36',theme:'',duration:2000});
       },
       complete500:function(data){
  
W.F.Toast({msg:'ajax_35',theme:'',duration:2000});


       }
       });
}

/**/
function ReportBuyerSubmit(){
  
   
   var   formname='report_buyer',alert_mes=[],error=0, f_value={},allFiled=W.F.walk_way_all(['hate_speech','abusive','feid','af'],  formname);
   
     for(var q in allFiled){
         if(allFiled[q]!=''&&allFiled[q]!='off'){
              f_value[q]=allFiled[q];
         }
  

    }
   
  if(W.U.ObjectLength(f_value)<3){
    alert_mes.push('ajax_38'); error=1;
    }
     W.F.Submit({ formname:formname,
       f_value:f_value,
      create_alert_mes:false,
       alert_mes:alert_mes,
       madianLoading:true, 
       button:W.U('[data-btn="report_user_submit"]')[0],
       buttonstateargs:{text:'block',LoadingText:'reporting'},
       complete:function(data){
  
  W.U.Pager.togglePage('mainpage','blockFront'); 
    if( W.I.AppId=='ProfilePageBuyer'|| W.I.AppId=='ProfilePageStore'){
 
            
         }

       },
       complete200:function(data){
  
  

W.F.Toast({msg:'ajax_39',theme:'',duration:2000});
       },
       complete500:function(data){
  
W.F.Toast({msg:'ajax_40',theme:'',duration:2000});


       }
       });

}
/**/

function ReportStoreSubmit(){
      var   formname='report_store',alert_mes=[],error=0, f_value={},allFiled=W.F.walk_way_all(['hate_speech','abusive','text_6','text_7','feid','af'],  formname);
   
     for(var q in allFiled){
         if(allFiled[q]!=''&&allFiled[q]!='off'){
              f_value[q]=allFiled[q];
         }
  

    }
   
  if(W.U.ObjectLength(f_value)<3){
    alert_mes.push('ajax_38'); error=1;
    }
     W.F.Submit({ formname:formname,
       f_value:f_value,
      create_alert_mes:false,
       alert_mes:alert_mes,
       madianLoading:true, 
       button:W.U('[data-btn="report_store_submit"]')[0],
       buttonstateargs:{text:'report',LoadingText:'reporting'},
       complete:function(data){
  
  W.U.Pager.togglePage('mainpage','blockFront'); 
    if( W.I.AppId=='ProfilePageBuyer'|| W.I.AppId=='ProfilePageStore'){
 
            
         }

       },
       complete200:function(data){
  
  

W.F.Toast({msg:'ajax_39',theme:'',duration:2000});
       },
       complete500:function(data){
  
W.F.Toast({msg:'ajax_40',theme:'',duration:2000});


       }
       }); 
}

/*
*/
function ReportBuyerPage(eid,af){

         var Modeldata={
name:'reportuserAsk',
 Tilte:'text_8',
 msg:'Message',
 body:function(){ var ch='<form name="report_buyer"  onsubmit="return false;"> <div class="block fw-b">Why are you reporting?</div> <div class="ff_0 fs13"> <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="hate_speech" value="1" ><span class="checkbox__label">text_4</span></label>  <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="abusive" value="1" ><span class="checkbox__label">text_5</span></label> </div><input type="hidden" name="feid"  value="'+eid+'" ><input type="hidden" name="af"  value="'+af+'" ><div class="block" data-help="report_buyer" ></div> </form>'; return ch;},
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'text_8',name:'yes',cssClass:'fg_7', attrStr:' data-btn="report_buyer_submit" '}],
YesCallback:ReportBuyerSubmit,
onRander:[]
 };
  


  W.U.Pager.AddModal(Modeldata);

}
/**/

function ReportProductSubmit(){
      var   formname='report_product',alert_mes=[],error=0, f_value={},allFiled=W.F.walk_way_all(['text_6','text_7','pid'],  formname);
   
     for(var q in allFiled){
         if(allFiled[q]!=''&&allFiled[q]!='off'){
              f_value[q]=allFiled[q];
         }
  

    }
   
  if(W.U.ObjectLength(f_value)<2){
    alert_mes.push('ajax_38'); error=1;
    }
     W.F.Submit({ formname:formname,
       f_value:f_value,
      create_alert_mes:false,
       alert_mes:alert_mes,
       madianLoading:true, 
       button:W.U('[data-btn="report_product_submit"]')[0],
       buttonstateargs:{text:'report',LoadingText:'reporting'},
       complete:function(data){
  
  W.U.Pager.togglePage('mainpage','blockFront'); 
    if( W.I.AppId=='ProfilePageBuyer'|| W.I.AppId=='ProfilePageStore'){
 
            
         }

       },
       complete200:function(data){
  
  

W.F.Toast({msg:'ajax_39',theme:'',duration:2000});
       },
       complete500:function(data){
  
W.F.Toast({msg:'ajax_40',theme:'',duration:2000});


       }
       }); 
}
/*
*/
function BlockPage(eid,af){


         var Modeldata={
name:'blockuserAsk',
 Tilte:'Block ',
 msg:'help_41',
 body:function(){var ch='<form name="block_user" onsubmit="return false;"> <div class="block ">help_41</div><input type="hidden" name="feid"  value="'+eid+'" ><input type="hidden" name="af"  value="'+af+'" ><div class="block" data-help="report_form" ></div> </form>';        return ch;  },
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'Yes ',name:'yes',cssClass:'fg_7', attrStr:' data-btn="block_user_submit" '}],
YesCallback: blockSubmit,
onRander:[]
 };
  


  W.U.Pager.AddModal(Modeldata);

}

/*
*/
function ReportStorePage(eid,af){

         var Modeldata={
name:'reportuserAsk',
 Tilte:'text_8',
 msg:'Message',
 body:function(){ var ch='<form name="report_store"  onsubmit="return false;"> <div class="block fw-b">Why are you reporting?</div> <div class="ff_0 fs13">'
 +' <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="hate_speech" value="1" ><span class="checkbox__label">text_4</span></label>'
 +'  <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="abusive" value="1" ><span class="checkbox__label">text_5</span></label>'
  +'  <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="text_6" value="1" ><span class="checkbox__label">text_6</span></label>'
 +'  <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="text_7" value="1" ><span class="checkbox__label">text_7</span></label>'
 +' </div><input type="hidden" name="feid"  value="'+eid+'" ><input type="hidden" name="af"  value="'+af+'" ><div class="block" data-help="report_store" ></div> </form>'; return ch;},
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'text_8',name:'yes',cssClass:'fg_7', attrStr:' data-btn="report_store_submit" '}],
YesCallback:ReportStoreSubmit,
onRander:[]
 };
  


  W.U.Pager.AddModal(Modeldata);

}
/*
*/
function ReportProdcutPage(pid){

         var Modeldata={
name:'reportuserAsk',
 Tilte:'text_8',
 msg:'Message',
 body:function(){ var ch='<form name="report_product"  onsubmit="return false;"> <div class="block fw-b">Why are you reporting?</div> <div class="ff_0 fs13">'

  +'  <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="text_6" value="1" ><span class="checkbox__label">text_6</span></label>'
 +'  <label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="text_7" value="1" ><span class="checkbox__label">text_7</span></label>'
 +' </div><input type="hidden" name="pid"  value="'+pid+'" ><div class="block" data-help="report_product" ></div> </form>'; return ch;},
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'text_8',name:'yes',cssClass:'fg_7', attrStr:' data-btn="report_product_submit" '}],
YesCallback:ReportProductSubmit,
onRander:[]
 };
  


  W.U.Pager.AddModal(Modeldata);

}


//BlockPage();
//ReportPage();
setTimeout(function(){ //prevent bug in opera mini
      W.U.ccbk.Add('pageloaded',function(){
//-------adding juction to catch click

W.U.Junction('blockuser',function(){ var _this=this;   this.Node.onclick=function(){  

BlockPage(_this.Node.dataset.eid,_this.Node.dataset.af);
W.U.Pager.DirectInitPage('mainpage','blockuserAsk');   }  },{});
W.U.Junction('reportuser',function(){  var _this=this;  this.Node.onclick=function(){   

ReportBuyerPage(_this.Node.dataset.eid,_this.Node.dataset.af);
W.U.Pager.DirectInitPage('mainpage','reportuserAsk');   }  },{});

W.U.Junction('reportstore',function(){  var _this=this;  this.Node.onclick=function(){   

ReportStorePage(_this.Node.dataset.eid,_this.Node.dataset.af);
W.U.Pager.DirectInitPage('mainpage','reportuserAsk');   }  },{});
W.U.Junction('reportproduct',function(){  var _this=this;  this.Node.onclick=function(){   

 ReportProdcutPage(_this.Node.dataset.pid);
W.U.Pager.DirectInitPage('mainpage','reportuserAsk');   }  },{});

W.U.Junction('unblockuser',function(){     this.Node.onclick=function(){  
     var eid= this.dataset.eid,af= this.dataset.af;
  
     if(W.U.isOK(eid)&&W.U.isOK(af)){
         UnblockSubmit(eid,af);
     }


  }  },{});
   });
},100);
 

     })(wowrol);