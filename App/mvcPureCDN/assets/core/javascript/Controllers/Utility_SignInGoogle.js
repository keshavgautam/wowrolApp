/*Utility_SignInGoogle
* 
*/
; (function(W){
   "use strict";

    function onSuccess(googleUser) {
      W.U.console('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    function onFailure(error) {
      W.U.console(error);
    }
   
  function renderButton(){ 
     /*     gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });*/
}

    function Loadsignscript(){
              var res={name:"gogglesignapi."+W.U.uId()+"",replace:"0",res:"gogglesignapi",resId:"recaptchaapijs",type:"script",url:'https://apis.google.com/js/platform.js?onload=renderButton'};

  W.C.loader.loadscript(res.url, res.resId, res.res, function(){
      W.U.console('callback for place holder');
      renderButton();
   
  });

    }

    function init(Node){
      Loadsignscript();
      var w =$(Node).width();
    W.U.AddDom(Node,'<div class="g-signin2 al-c" data-onsuccess="onSignInGoogle" data-width="'+w+'" data-theme="dark" data-height="30" data-longtitle="true"></div>','html');
    }

   
function onSignIn(googleUser) {
 
  var profile = googleUser.getBasicProfile();
  var auth=googleUser.getAuthResponse();

  signUpFromGoogle({
      id:profile.getId(),
      name:profile.getName(),
      ImageUrl:profile.getImageUrl(),
      email:profile.getEmail(),
      first_name:profile.getGivenName(),
      last_name:profile.getFamilyName(),
      access_token:auth.access_token,
      id_token:auth.id_token



  });
    
}
  function signOut() {
 
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      W.U.console('User signed out.');
    });
  }

window['renderButton']=renderButton; //making globle
window['signOutGoogle']=signOut; //making globle
window['onSignInGoogle']=onSignIn; //making globle
 





function signUpFromGoogle(f_value){
          W.F.Toast('Google Sign Up Processing. Please wait a Moment');

        var loadingId= W.F.Load('signUpFromGoogle',f_value);
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){     
    W.F.Toast('Google Sign Up Successfull. Please wait a Moment');
   var visit_data=W.A.page.AcessData.visit_data;
  visit_data.wb=data.wb;
    visit_data.wc=data.wc;
    visit_data.wd=data.wd;
       visit_data.we=1;
     visit_data.wk=1;
  W.A.page.AcessData.visit_data=visit_data;
    var cookie=W.U.Cookie;
   
     cookie.setPagedata();
         window.signOutGoogle();
       W.U.GotoHref(W.U.URL(''));
     
       });
     W.U.ccbk.Add('complete500'+loadingId ,function(data){      
     
     W.F.Toast('Errror occured in login from google.');

       });
     W.U.ccbk.Run('load'+loadingId );  
  }


   W.U.SignInGoogle={
       init:init,
 Loadsignscript: Loadsignscript
   };

W.U.ccbk.Add('beforepageloaded',function(){
    W.U.Junction('gogglesign',function(){

 W.U.SignInGoogle.init(this.Node);

  },{});
     });

})(wowrol);