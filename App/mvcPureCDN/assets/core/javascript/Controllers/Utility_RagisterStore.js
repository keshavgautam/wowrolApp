/*
* 
*/
;(function(W){
   "use strict";
     var URL =W.U.URL;

      var footer=W.T.Footer({});;

/*
*/
function onBasicInformationSubmit(x){
      var formname='Ragister_Store_Step_1',
       help=W.U('[data-help="Ragister_Store_Step_1"]')[0],
       error=2,
        f_value = W.F.walk_way_all(['store_name', 'store_url_address'],formname),
         alert_mes=[];
        
 
         var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   alert_mes = alert_mes.concat(glueErrors.message);
  

    
   

       

       W.F.Submit({ formname:'Ragister_Store_Step_1',
       f_value:f_value,
       alert_mes:alert_mes,
       create_alert_mes:true,
       complete200:function(data){

     W.U.SwitchUser({entity_id:data.entity_id,URL:W.U.URL('ragisterstore'),goto:false}); 
 
     W.U.Stepper.goto('ragisterstore',1,data.store_collection);

       },
       
       complete500:function(data){

          
var AlertError =  W.T.AlertError({message:data.message});
   W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 

       }
       });

}

/*
*/
function onChoseCollectionSubmit(){
       var   formname='setting_store_collection',
      f_value =[],alert_mes=[],error=0,allFiled= W.F.walk_way_all('*',  formname);
        
 
    for(var q in allFiled){
         var li_data= W.U.intentdata.get(allFiled[q].value); 

  if(W.U.isOK(li_data)){
     f_value.push(li_data.id); 
  }

    }
    if( f_value.length<=0){
    alert_mes.push('ajax_29'); error=1;
    }

    
   



       W.F.Submit({ formname:formname,
       f_value:f_value,
       create_alert_mes:false,
       alert_mes:alert_mes,
       complete200:function(data){
  
  
     W.U.Stepper.goto('ragisterstore',2,data.setting_1);

       }
       });
}
/*
*/
function onaddressSubmit(){
         var formname='store_setting_1',
        f_value = W.F.walk_way_all(['address','phone','country','state','citybystate'],formname),
       error=5, alert_mes = [];
         var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
         
  W.U.extend(f_value,W.F.walk_way_all(['landmark','townbycity'], formname));
    if(f_value.townbycity!=''){
   var li_data= W.U.intentdata.get(f_value.townbycity);
      f_value.townbycity=li_data.id;
 }

 if(f_value.citybystate!=''){
   var li_data= W.U.intentdata.get(f_value.citybystate);
      f_value.citybystate=li_data.id;
 }
 if(f_value.state!=''){
   var li_data= W.U.intentdata.get(f_value.state);
   f_value.state=li_data.id;
 }
 if(f_value.country!=''){
   var li_data= W.U.intentdata.get(f_value.country);
  f_value.country=li_data.id;
 }


    
   



       W.F.Submit({ formname:formname,
       f_value:f_value,
        create_alert_mes:false,
       alert_mes:alert_mes,
       complete200:function(data){

    

     W.U.Stepper.goto('ragisterstore',3,{});


     setTimeout(function(){
          W.U.GotoHref(W.U.URL(''));
     },5000);
       }
       });


}
/*
*/
function onitsDone(){
   
}



function SetSteps(walkWay,x){
var ch='';
var steps = [];

  //1
     steps.push({ title:'text_192', substitle:'help_26',  
     bodyhtml:W.T.ragisterStore.Step_1(x),
      isbackbutton:false,
      isSkipbutton:false,
   Textcontinuebutton:'text_135',
     onTabclick:function(){return false;},
      oncontinue:onBasicInformationSubmit
  
   });
/// step -2
    steps.push({ title:'text_193', substitle:'help_27',  
     bodyhtml: W.T.ragisterStore.Step_2,
    isSkipbutton:false,
    isbackbutton:false,
   Textcontinuebutton:'text_135',
      onTabclick:function(){return false;},
      oncontinue: onChoseCollectionSubmit
   });
/// step -3
    steps.push({ title:'text_194', substitle:'help_28',  
     bodyhtml: W.T.ragisterStore.Step_3,
   isSkipbutton:false,
    isbackbutton:false,
   Textcontinuebutton:'text_135',
      onTabclick:function(){return false;},
   oncontinue: onaddressSubmit
   });
/// step -4
    steps.push({ title:'text_195', substitle:'',  
     bodyhtml: W.T.ragisterStore.Step_4,
     isSkipbutton:false,
     isbackbutton:false,
     iscontinuebutton:false,
   Textcontinuebutton:'text_196',
     onTabclick:function(){return false;},
   oncontinue: onitsDone
   });



  var options={
     name:'ragisterstore'
  };
 
 var Jid=  W.U.J( function () {
     W.U.Stepper.init(this.Node,this.data.options,this.data.steps);

   
     }, {options:options,steps:steps});


 ch += '<div class="block _Bdy"  >'
 +'<div class="block" ><div class="block fw-b"> <div class="block _bdy"><h2>text_191</h2></div><div class="block _bdy t"><span>des_0</span></div></div></div>'
 +'<div class="block" data-junction="'+Jid+'" ></div>'
 +'</div>';





  var ret= '';
  if(W.I.wf=="web"){
      

      ret=  W.T.wrapForModal('',ch); 
  }

    if(W.I.wf=="mob"){
    var header=W.T.DashbordFormHeader({titleIcon:W.T.SVG('store',24,'#fff'),titleText:'text_197',submitbutton:false,showbackbutton:false,smallwowrolicon:true});


      ret=  W.T.wrap(header,ch,footer); 
  }
     
 W.U.AddDom(walkWay,ret,'html');

}





function init(walkway,x){
    var storedata=W.U.extend({
        'slug':'',
        'entity_id':'',//1
        'name':''

    },x);

 SetSteps(walkway,storedata);




}


   W.U.ragisterStore={
   init:init
   };


   })(wowrol);