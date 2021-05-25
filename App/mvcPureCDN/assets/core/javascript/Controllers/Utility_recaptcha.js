/*
* 
*/
; (function(W){
   "use strict";
var recaptcharesponse='';
var securitycheckApplied=false;//securitycheckApplied
var SecuritycheckSolved=true;//ecuritycheckSolved
//--
 var widgetId1;var MainApp=W.A.page.AppId;
 function onloadRecaptchaCallback() {
      widgetId1=   grecaptcha.render(getwalkwayNode().main, {
          'sitekey' : '6LfgvyQTAAAAAML_Cay5eJL8Sm7fGG6nCo40tcci',
          'callback' : verifyCallback

        });
      W.U.recaptcha.scS=false;W.U.recaptcha.scA=false;
      };
 function verifyCallback(response){
   W.U.recaptcha.respone=response;
   W.U.recaptcha.scS=true;
    
   setTimeout(function(){// with out using set time we get bug here
   W.U.console('MainApp= '+MainApp);
       W.A.page= W.A[MainApp]  ;
      W.U.recaptcha.scA=false;
    
       W.C.loader.init(W.A.page);   
     },500); 
 }
//--
function SetPage(walkway){
 var mainBlock=W.U.Rander( W.T.recaptcha.Layout());


  W.U.Setview(walkway,mainBlock,'html');   

  var res={name:"recaptchaapi."+W.U.uId()+"",replace:"0",res:"recaptchaapi",resId:"recaptchaapijs",type:"script",url:'https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit&hl='+W.A.page.AcessData.visit_data.wg+''};

  W.C.loader.loadscript(res.url, res.resId, res.res, function(){
      W.U.console('callback for place holder');
      getwalkwayNode().Loading.innerHTML='';
  });
}
//--- walkway
function getwalkwayNode(){
    var Node=W.U.id("recaptchaelement").childNodes;
  
    return {main:Node[1],
            Loading:Node[0]};
}
function init(){
 

if(!W.A.page.AcessData.LoginStatus&&W.A.page.AppId!="securitycheck"){
  W.U.console('W.U.recaptcha.respone');
    W.U.console(W.U.recaptcha.respone);
      W.U.console((W.U.recaptcha.respone=='er'));// error due to reference varieble
if(W.U.recaptcha.respone=='er'){ W.U.console('recaptcha init');

var po=W.A[MainApp].res;

 var maps=W.A[MainApp];
 var res= W.U.clone(maps.res);
  W.U.console(maps.res);  W.U.console(po);
 res[5]=   W.U.extend(res[5],{name:"securitycheck."+W.U.uId(),res:'securitycheck'});
   W.U.console(res); 
 //  res.push({name:"recaptchaapi."+W.U.uId()+"",replace:"0",res:"recaptchaapi",resId:"recaptchaapijs",type:"script",url:'https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit'});

MainApp=W.A.page.AppId;

  
       var   page=  W.U.defaultAppData({AppId:'securitycheck',AppTitle:'Security Check',res:res,resurl:W.A.page.resurl,AcessData:W.A.page.AcessData});
   W.A.page=page;
   W.A[page.AppId] = W.A.page ;

    W.U.recaptcha.scA=true;
    W.U.recaptcha.scS=false;
  
     setTimeout(function(){// with out using set time we get bug here
         W.C.loader.init(W.A.page);  
     },500); 

} 
}

}

//--
function CheckRecapchaErrorMsg(msg){
    var Isfailed=false;

    for(var q in msg){
        if(msg[q]=="RecaptchaError"){
            Isfailed=true;
        }

    }


    if(Isfailed){
        W.F.Toast({msg:'reCAPTCHA Varification failed',theme:'error',duration:5000});
       setTimeout(function(){
            W.U.recaptcha.respone='';
       W.U.recaptcha.init(); 

       },5000);
    }
}



W.U.recaptcha={
    init:init,
SetPage:SetPage,
respone:recaptcharesponse,
scA:securitycheckApplied,//securitycheckApplied
scS:SecuritycheckSolved,
RecaptchaCallback:onloadRecaptchaCallback,
CheckRecapchaErrorMsg:CheckRecapchaErrorMsg
};


})(wowrol);
var onloadRecaptchaCallback=wowrol.U.recaptcha.RecaptchaCallback;