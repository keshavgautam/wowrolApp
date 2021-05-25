/*
* 
*/
; (function(W){
   "use strict";

/*
*
*
*/
function buyerbasicinfoPage(block){
        
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.setting_buyer.buyerbasicinfoPage;

var formLogic =function() {
  var rv = ['first_name','last_name', 'sex:0', 'birthday_Day', 'birthday_Month','birthday_Year','country'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=7, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

          W.F.Toast({msg:'text_287'});                      
                         
      W.U.intentdata.add('setting.0',this.data.setting_0);
             //--
     W.U.formReset(this.form.formname,this.data.setting_0);                  
        W.U.Pager.togglePage(W.I.dp, W.I.dpbf);          

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }



var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };

  var ch ='<form name="buyersetting_0"  data-junction="buyersetting_0" onsubmit="return false"> </form>';
   
 W.U.Junction('buyersetting_0',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   


             return ch;  

}
/*
*
*
*/



function buyeraddressPage(block){

var x=block.objectdata;



//debugger;


var Jid=W.U.J(function(){   W.U.DeliveryAddres.init(this.Node,this.data,{ pager:W.I.dp,
       backblock:'buyeraddressPage'});    },x);
  var header=W.T.DashbordFormHeader({titleText:'text_404',sublitText:'save',submitbutton:false,backblock:W.I.dpbf});

  var ch='<div class="block" data-junction="'+Jid+'"></div>';   
   var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 


      ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret; 
}
/*
*
*
*/
function ProfilePicturePage(block){


   var formData=block.objectdata;
  
 
 
var frombody=W.T.setting_buyer.ProfilePicturePage;

var formLogic =function() {
  var 
      f_value = {},
       error=0, alert_mes = [];
     
    var images = [], webimages = [],featureimage,copyImage,s=0;
   
 var   SavedFilesInintent=W.U.intentdata.get('profilepicdata'); 
 if(W.U.isOK(SavedFilesInintent)){
    if(W.U.isOK(SavedFilesInintent['web'])){
     copyImage=SavedFilesInintent['web'];
     for(var q in  copyImage){
       if(W.U.isOK(copyImage[q].url)){
           webimages.push(copyImage[q]) ; 
       }  
     }
     
 } 
    if(W.U.isOK(SavedFilesInintent['main'])){
    copyImage=SavedFilesInintent['main'];
     for(var q in  copyImage){
       if(W.U.isOK(copyImage[q].url)){
         images.push(copyImage[q]) ; 
       }  
     }
 } 
  
 }

 if ((images.length+webimages.length) < 1) {  alert_mes = alert_mes.concat(['Images are required.']);error++; }


  f_value.mainimages = images;
  f_value.webimages =webimages;
  //--
 var   SavedFeatureImage=W.U.intentdata.get('varientimages'+f_value.vid+'FeatureImage'); 
  if(!W.U.isOK(SavedFeatureImage)){
    
        if(webimages.length>0){
         featureimage=webimages[0];   
      }
        if(images.length>0){
         featureimage=images[0];   
      }
  }else{
      featureimage=SavedFeatureImage;
  }

  f_value.featureimage =featureimage;   



   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
      
                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

          W.F.Toast({msg:'text_287'});                      
                         
      W.U.intentdata.add('setting.setting_profilepic',this.data);
             //--
     W.U.formReset(this.form.formname,this.data);                  
       // W.U.Pager.togglePage(W.I.dp, W.I.dpbf);          

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }



var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };

  var ch ='<form name="setting_profilepic"  data-junction="setting_profilepic" onsubmit="return false"> </form>';
   
 W.U.Junction('setting_profilepic',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   


             return ch;  

}
/*
*
*
*/
function ProfileBannerPage(block){


   var formData=block.objectdata;
  
 
 
var frombody=W.T.setting_buyer.ProfileBannerPage;

var formLogic =function() {
  var 
      f_value = {},
       error=0, alert_mes = [];
     
    var images = [], webimages = [],featureimage,copyImage,s=0;
   
 var   SavedFilesInintent=W.U.intentdata.get('bannerdata'); 
 if(W.U.isOK(SavedFilesInintent)){
    if(W.U.isOK(SavedFilesInintent['web'])){
     copyImage=SavedFilesInintent['web'];
     for(var q in  copyImage){
       if(W.U.isOK(copyImage[q].url)){
           webimages.push(copyImage[q]) ; 
       }  
     }
     
 } 
    if(W.U.isOK(SavedFilesInintent['main'])){
    copyImage=SavedFilesInintent['main'];
     for(var q in  copyImage){
       if(W.U.isOK(copyImage[q].url)){
         images.push(copyImage[q]) ; 
       }  
     }
 } 
  
 }

 if ((images.length+webimages.length) < 1) {  alert_mes = alert_mes.concat(['Images are required.']);error++; }


  f_value.mainimages = images;
  f_value.webimages =webimages;
  //--
 var   SavedFeatureImage=W.U.intentdata.get('varientimages'+f_value.vid+'FeatureImage'); 
  if(!W.U.isOK(SavedFeatureImage)){
    
        if(webimages.length>0){
         featureimage=webimages[0];   
      }
        if(images.length>0){
         featureimage=images[0];   
      }
  }else{
      featureimage=SavedFeatureImage;
  }

  f_value.featureimage =featureimage;   



   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
      
                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

          W.F.Toast({msg:'text_287'});                      
                         
      W.U.intentdata.add('setting.setting_banner',this.data);
             //--
     W.U.formReset(this.form.formname,this.data);                  
       // W.U.Pager.togglePage(W.I.dp, W.I.dpbf);          

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }



var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };

  var ch ='<form name="setting_banner"  data-junction="setting_banner" onsubmit="return false"> </form>';
   
 W.U.Junction('setting_banner',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   


             return ch;  

}
/*
*
*
*/
function  NotificationPage(block){
  var x=block.objectdata;


   
     
  return W.T.setting_buyer.NotificationPage(x);
}

function NotificationChanged(){
        var   formname='buyersetting_3',alert_mes=[],error=0, f_value= W.F.walk_way_all(['nss0','nss1','nss2','nss3',"ns0", "ns1", "ns2"],  formname);
     
 
  

    
   



    W.F.Submit({ formname:formname,
       f_value:f_value,
       create_alert_mes:false,
       alert_mes:alert_mes,
       madianLoading:false,
       complete200:function(data){
    W.U.intentdata.add('setting.3',data.setting_3);
  
  W.F.Toast({msg:'text_287',theme:'',duration:2000});

       }
       });
}
/*
*
*
*/
function PrivacyPage(block){
  var x=block.objectdata;



   
     
  return W.T.setting_buyer.PrivacyPage(x);
}

function PrivacyChanged(){
           var   formname='buyersetting_5',alert_mes=[],error=0, f_value= W.F.walk_way_all(['ip0','ip5','ip8','ip9','ip10','cp0','cp1','cp5','cp6'],  formname);
     
 
  

    
   



    W.F.Submit({ formname:formname,
       f_value:f_value,
       create_alert_mes:false,
       alert_mes:alert_mes,
       madianLoading:false,
       complete200:function(data){
    W.U.intentdata.add('setting.5',data.setting_5);
  
  W.F.Toast('text_287');

       }
       });
}
/*
*
*
*/
function BlockingPage(block){
  var x=block.objectdata;



   
     
  return W.T.setting_buyer.BlockingPage();
}



//---------------------
   var Madian=function(x){
   var ch='',page='';
   var SettingLink=[],General=[];

General.push({href:'javascript:void(0);',text:'text_192',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':buyerbasicinfoPage:setting:0" ',help:'help_3'});
General.push({href:'javascript:void(0);',text:'text_243',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':buyeraddressPage:setting:568" ',help:'help_4'});
General.push({href:'javascript:void(0);',text:'text_254',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':ProfilePicturePage:setting:8" ',help:'help_38'});
General.push({href:'javascript:void(0);',text:'text_255',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':ProfileBannerPage:setting:9" ',help:'help_39'});
General.push({href:'javascript:void(0);',text:'text_258',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':DeactivatePage:setting:4"  ',help:'help_9'});


  SettingLink.push({href:'javascript:void(0);',text:'general',icon:'',attrStr:'',haschildren:true,childrenMenu:General});
  SettingLink.push({href:'javascript:void(0);',text:'text_76',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':NotificationPage:setting:3"  '});
  SettingLink.push({href:'javascript:void(0);',text:'text_128',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':PrivacyPage:setting:5" '});
 SettingLink.push({href:'javascript:void(0);',text:'text_260',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':BlockingPage:setting:7" '});


//-------------------------


//-----------------------
    
  W.U.intentdata.add('setting.0',W.A.page.AppView.setting.setting_0);
  W.U.intentdata.add('setting.568',W.A.page.AppView.setting.setting_568);
  W.U.intentdata.add('setting.2',W.A.page.AppView.setting.setting_2);
  W.U.intentdata.add('setting.3',W.A.page.AppView.setting.setting_3);
  W.U.intentdata.add('setting.4',W.A.page.AppView.setting.setting_4);
  W.U.intentdata.add('setting.5',W.A.page.AppView.setting.setting_5);
  W.U.intentdata.add('setting.9',W.A.page.AppView.setting.setting_banner);
  W.U.intentdata.add('setting.8',W.A.page.AppView.setting.setting_profilepic);
  W.U.intentdata.add('setting.7',{});

       //--EntityStrip datab
  W.U.Pager.addblockdata({ name:'buyerbasicinfoPage', htmlStr:buyerbasicinfoPage});
  W.U.Pager.addblockdata({ name:'buyeraddressPage', htmlStr:buyeraddressPage});
  W.U.Pager.addblockdata({ name:'ProfilePicturePage', htmlStr:ProfilePicturePage});
  W.U.Pager.addblockdata({ name:'ProfileBannerPage', htmlStr:ProfileBannerPage});
  W.U.Pager.addblockdata({ name:'NotificationPage', htmlStr:NotificationPage});  
  W.U.Pager.addblockdata({ name:'DeactivatePage', htmlStr:W.U.blockedUserManageing.DeactivatePage});   
  W.U.Pager.addblockdata({ name:'PrivacyPage', htmlStr:PrivacyPage});  
  W.U.Pager.addblockdata({ name:'BlockingPage', htmlStr:BlockingPage});  

     ch+='<div class="block bs-1">';
     ch+='<div class="block _Bdy bg_6 bs-1-bottom "><h3>Set up </h3></div >';
     ch+=W.U.CreateMENU(SettingLink);
       ch+='</div >';

 if(W.I.wf=="mob"){

   var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('setting_buyer')+'" class="block header-cell fg_6 al-l"><h2 class="" >setting</h2><i class="badge _gbtn"></i> </a>'});
    
      var footer=W.T.Footer({});; 
     page+=W.T.wrap(header,ch,footer);  
 }

 if(W.I.wf=="web"){
var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:'<div class="block _bdy">'+ch+'</div>'}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);
   
 }

    return page;
   }

  W.M[W.A.page.AppId]=  {
       Madian:Madian,
       NotificationChanged:NotificationChanged,
       PrivacyChanged:PrivacyChanged
     };

 })(wowrol);