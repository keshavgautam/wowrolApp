/*
* 
*/
; (function(W){
   "use strict";
   
var frombody=  function (x){return  W.M.enter.signupfrombody.bind(this)(x);};
var formLogic =function() {
     var rv = ['email_or_phone', 'password', 'confirm_password'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=5, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
      alert_mes= alert_mes.concat(glueErrors.message);
         if (f_value['password'] != f_value['confirm_password']) {
            alert_mes.push('<li> Passwords are  not matching.</li>');
        } else { error--; }
            
          if (W.F.check_password(f_value['password']) != true) {
           alert_mes.push('<li> <span>Your password is not strong and  secure.</span><br><span>The password should be at least <kbd class="bg_5"> 8 characters </kbd>   long.</span></li>');

        } else { error--; }
   
  
      var AlertError = W.T.AlertError({message:alert_mes});


      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
  
 
       W.U.AddDom(W.U.Page,W.M.enter.successBlock({}),'html');

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

        var sigupdata={
            option:{sendwith:'ajax4'},
            formData:{email_or_phone:'',password:''},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };

setTimeout(function(){ //prevent bug in opera mini
 W.U.Junction('Signup',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },sigupdata); 

W.U.Junction('TogglePassword',function(){
      this.Node.onclick=W.F.TogglePassword;
  },{});
  },100);
/**/


  W.G[W.A.page.AppId]={
    sigupdata:sigupdata  
  }
})(wowrol);