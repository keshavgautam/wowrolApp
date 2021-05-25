/*Utility_SignInGoogle
* 
*/
; (function(W){
   "use strict";

    function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
  
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      var authResponse=response.authResponse;
   FB.api('/me',{access_token: response.authResponse.accessToken,fields: 'id,name,middle_name,first_name,last_name,gender,email,hometown,location,cover,friends',Edges:'friendlists'}, function(response) {
    
     response.authResponse=authResponse;
  signUpFromFacebook(response);

   
     });
    } else {
  
    }
  }




  function signUpFromFacebook(f_value){
      

        var loadingId= W.F.Load('signUpFromFacebook',f_value);
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
     


        if(W.I.wf=='mob'){
           
        }
       if(W.I.wf=='web'){
    
        }
       });
     W.U.ccbk.Add('complete500'+loadingId ,function(data){      
     


       });
     W.U.ccbk.Run('load'+loadingId );  
  }










     function renderButton(){ 
     window.fbAsyncInit = function() {
         // debugger; 
    FB.init({
      appId      : '162594680925829',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();

      FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  
  };

   window.fbcheckLoginState = function(){         
   
     FB.getLoginStatus(function(response) {
     
      statusChangeCallback(response);
    });
   }




}
      function Loadsignscript(){
              var res={name:"facebook-jssdk."+W.U.uId()+"",replace:"0",res:"facebook-jssdk",resId:"facebook-jssdk",type:"script",url:'//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8'};

  W.C.loader.loadscript(res.url, res.resId, res.res, function(){
            
      W.U.console('callback for place holder');
      renderButton();
   
  });

    }


   function init(Node){
  
      W.U.AddDom(Node,'<div class="fb-login-button" data-max-rows="2" data-size="medium" data-show-faces="true" data-auto-logout-link="true" data-scope="public_profile,user_friends,email,user_birthday,user_education_history,user_location" onlogin="fbcheckLoginState();" ></div>','html'); 
         
     if(W.U.isOK(window.FB)){
      renderButton();
    }else{
          Loadsignscript(); 
    }
    W.U.ccbk.Add('viewloaded',function(){ //debugger; 
    if(W.U.isOK(FB)){
      // FB=null;
    } // $('#facebook-jssdk').remove(); 
    } ); 
   
 
   }

   W.U.facebooksign={
       init:init


   };

W.U.ccbk.Add('beforepageloaded',function(){
      W.U.Junction('facebooksign',function(){

// W.U.facebooksign.init(this.Node);



  },{});
 
     });

   })(wowrol);