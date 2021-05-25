/*
* 
*/
; (function(W){
   "use strict";

/*
*
*
*/
function BasicInfoPage(block){
           W.U.console(block);
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.store_settings.BasicInfoPage;

var formLogic =function() {
  var  f_value = W.F.walk_way_all(['store_name'], this.formname),
       error=1, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       
W.U.extend(f_value,W.F.walk_way_all(['website'], this.formname));

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

  var ch ='<form name="store_setting_0"  data-junction="store_setting_0" onsubmit="return false"> </form>';
   
 W.U.Junction('store_setting_0',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   


             return ch;  

}
/*
*
*
*/

function StoreaddressPage(block){
           //W.U.console(block);
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.store_settings.StoreaddressPage;

var formLogic =function() {
     var   f_value = W.F.walk_way_all(['address','phone','country','state','citybystate','address_id'], this.formname),
       error=6, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
 W.U.extend(f_value,W.F.walk_way_all(['landmark','townbycity'], this.formname));
  



 
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
                         
      W.U.intentdata.add('setting.1',this.data.setting_1);
             //--
 //    W.U.formReset(this.form.formname,this.data.setting_1);                  
      //  W.U.Pager.togglePage(W.I.dp, W.I.dpbf);          

                             

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

     var ch ='<form name="store_setting_1"  data-junction="store_setting_1" onsubmit="return false"> </form>';
   
 W.U.JunctionAdd(W.A.page.AppId,'store_setting_1',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   


             return ch;  



    
}

/*
*
*
*/
function ProfilePicturePage(block){


   var formData=block.objectdata;
  
 
 
var frombody=W.T.store_settings.ProfilePicturePage;

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
function CollectionPage(block){
         W.U.console(block);
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.store_settings.CollectionPage;

var formLogic =function() {
    var  f_value =[],alert_mes=[],error=0,allFiled= W.F.walk_way_all('*', this.formname);

    for(var q in allFiled){
         var li_data= W.U.intentdata.get(allFiled[q].value); 

  if(W.U.isOK(li_data)){
     f_value.push(li_data.id); 
  }

    }
    if( f_value.length<=0){
    alert_mes.push('ajax_29'); error=1;
    }

        
  
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
 // W.U.console(ret);

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

          W.F.Toast({msg:'text_287'});                      
                         
      W.U.intentdata.add('setting.store_collection',this.data.store_collection);
             //--
     W.U.formReset(this.form.formname,this.data.store_collection);                  
         

                             

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

  var ch ='<form name="setting_store_collection"  data-junction="setting_store_collection" onsubmit="return false"> </form>';
   
 W.U.Junction('setting_store_collection',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   


             return ch;  
}

/*
*
*
*/
function AboutStorePage(block){
      
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.store_settings.AboutStorePage;

var formLogic =function() {
  var rv = ['about_store'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=1, alert_mes = [];
        
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
                         
      W.U.intentdata.add('setting.457',this.data.setting_457);
             //--
     W.U.formReset(this.form.formname,this.data.setting_457);                  
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

  var ch ='<form name="store_setting_457"  data-junction="store_setting_457" onsubmit="return false"> </form>';
   
 W.U.Junction('store_setting_457',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   


             return ch;  
}
/*
*
*
*/
function  PolicyStorePage(block){
       
    
 var formData=block.objectdata;
 
 
 
var frombody=W.T.store_settings.PolicyStorePage;

var formLogic =function() {
  var rv = ['store_policy','return_policy:0'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=2, alert_mes = [];
        
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
                         
      W.U.intentdata.add('setting.456',this.data.setting_456);
             //--
     W.U.formReset(this.form.formname,this.data.setting_456);                  
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

  var ch ='<form name="store_setting_456"  data-junction="store_setting_456" onsubmit="return false"> </form>';
   
 W.U.Junction('store_setting_456',function(){
     
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


   
     
  return W.T.store_settings.NotificationPage(x);
}

function NotificationChanged(){
        var   formname='store_setting_3',alert_mes=[],error=0, f_value= W.F.walk_way_all(['nss0','nss1','nss2','nss3',"ns0", "ns1", "ns2"],  formname);
     
 
  

    
   



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



   
     
  return W.T.store_settings.PrivacyPage();
}
/*
*
*
*/
function BlockingPage(block){
  var x=block.objectdata;



   
     
  return W.T.store_settings.BlockingPage(x);
}
/*
*
*
*/
function ThemePage(block){
    
  var x=block.objectdata;

  
  
   
 W.U.JunctionAdd(W.A.page.AppId,'store_theme',function(){
     var _this=this;
setTimeout(function(){
    W.U.console(W.U.id('storethemsubmit'));
     W.U.ThemeEditer.bind({Node:_this.Node,Value:{ChosenColor:x,submitbtn:W.U.id('storethemsubmit')}})();
},100);
  },{});
   
     
  return W.T.store_settings.ThemePage();



}




//---------------------
   var Madian=function(x){
   var ch='',page='';
   var SettingLink=[],General=[];
   javascript:void(0);
General.push({href:'javascript:void(0);',text:'text_192',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':BasicInfoPage:setting:0" ',help:'help_3'});
General.push({href:'javascript:void(0);',text:'text_254',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':ProfilePicturePage:setting:8" ',help:'help_38'});
General.push({href:'javascript:void(0);',text:'text_243',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':StoreaddressPage:setting:1" ',help:'help_14'});

General.push({href:'javascript:void(0);',text:'collection',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':CollectionPage:setting:store_collection" ',help:'help_11'});


General.push({href:'javascript:void(0);',text:'text_256',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':AboutStorePage:setting:457" ',help:'help_12'});

General.push({href:'javascript:void(0);',text:'text_257',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':PolicyStorePage:setting:456" ',help:'help_13'});


General.push({href:'javascript:void(0);',text:'text_258',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':DeactivatePage:setting:4" ',help:'help_10'});


  SettingLink.push({href:'javascript:void(0);',text:'general',icon:'',attrStr:'',haschildren:true,childrenMenu:General});
  SettingLink.push({href:'javascript:void(0);',text:'text_76',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':NotificationPage:setting:3"  '});

  SettingLink.push({href:'javascript:void(0);',text:'text_259',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':ThemePage:setting:theme" '});

 SettingLink.push({href:'javascript:void(0);',text:'text_260',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':BlockingPage:setting:7" '});


//-------------------------


//-----------------------
   
  W.U.intentdata.add('setting.0',W.A.page.AppView.setting.setting_0);
  W.U.intentdata.add('setting.1',W.A.page.AppView.setting.setting_1);
  W.U.intentdata.add('setting.2',W.A.page.AppView.setting.setting_2);
  W.U.intentdata.add('setting.3',W.A.page.AppView.setting.setting_3);
  W.U.intentdata.add('setting.4',W.A.page.AppView.setting.setting_4);
  W.U.intentdata.add('setting.store_collection',W.A.page.AppView.setting.store_collection);
  W.U.intentdata.add('setting.456',W.A.page.AppView.setting.setting_456);
  W.U.intentdata.add('setting.457',W.A.page.AppView.setting.setting_457);
  W.U.intentdata.add('setting.theme',W.A.page.AppView.setting.theme);
  W.U.intentdata.add('setting.8',W.A.page.AppView.setting.setting_profilepic);
  W.U.intentdata.add('setting.7',{});

       //--EntityStrip datab
  W.U.Pager.addblockdata({ name:'BasicInfoPage', htmlStr:BasicInfoPage});
 W.U.Pager.addblockdata({ name:'ProfilePicturePage', htmlStr:ProfilePicturePage});
  W.U.Pager.addblockdata({ name:'StoreaddressPage', htmlStr:StoreaddressPage});
  W.U.Pager.addblockdata({ name:'CollectionPage', htmlStr:CollectionPage});  
  W.U.Pager.addblockdata({ name:'AboutStorePage', htmlStr:AboutStorePage});
  W.U.Pager.addblockdata({ name:'PolicyStorePage', htmlStr:PolicyStorePage}); 
  W.U.Pager.addblockdata({ name:'DeactivatePage', htmlStr:W.U.blockedUserManageing.DeactivatePage});  

  W.U.Pager.addblockdata({ name:'ThemePage', htmlStr:ThemePage});
  W.U.Pager.addblockdata({ name:'NotificationPage', htmlStr:NotificationPage});  
 
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
       NotificationChanged:NotificationChanged
     };

 })(wowrol);