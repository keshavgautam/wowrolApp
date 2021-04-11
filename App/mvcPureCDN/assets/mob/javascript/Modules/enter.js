/*
* 
*/
; (function(W){
   "use strict";
   var signup=function(x){
        var ch='';
         
           ch+='<div class="block bs-0 bg_0 _bdy m_b10"><div class="block " style="max-width: 400px; margin: 0px auto;"> <div class="block m_b10 al-c"><span class=" fw-b tt-c">New to Wowrol? Sign up below for a free account</small></span> </div><div class="block-body"> <form name="Signup" data-junction="Signup" onsubmit="return false"> </form> </div></div></div>';


var frombody=function(x){      var ch='';
            var URL=W.U.URL;
           ch+='<div class="block"><div class="form-piece"> <label class="control-label">Email address</label> <input type="text" name="email_or_phone" class="form-mold" placeholder="Email address" autocomplete="off" data-required="true" value="'+x.email_or_phone+'"> <div data-help="email_or_phone"></div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">Password</label> <input type="password" name="password" class="form-mold" placeholder="Password " value="'+x.password+'" data-required="true"> <span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >Show</button> </span> </div><div data-help="password"> </div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">Confirm Password</label> <input type="password" name="confirm_password" class="form-mold" placeholder="Confirm Password" data-required="true" value="'+x.password+'"> <div data-help="confirm_password"></div><span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >Show</button> </span> </div><div data-help="login_password"> </div></div><div class="form-piece"> <div data-help="terms"> <div class="sigcbt"><span>By clicking sign up, you agree to our terms and that you have read our Privacy Policy.</span> <span><a href="javascript:void(0);" data-learnmore="terms">Terms </a></span> <span><a href="javascript:void(0);" data-learnmore="privacy" >Privacy Policy</a> </span>  </div></div></div><div class="block"> <div data-help="Signup"></div></div><div class="form-piece clearfix"> <button type="submit"    class="block btn _dbtn right">Signup</button> </div></div>';
           
           return ch;
            };
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
    var AppView= W.U('[data-appView="' + W.A.page.AppId + '"]')[0];
 
       W.U.AddDom(AppView,successBlock({}),'html');

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

        var sigupdata={
            option:{sendwith:'ajax4'},
            formData:{email_or_phone:'mvcpure100@gmail.com',password:'123456789'},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };
         
   W.U.JunctionAdd(W.A.page.AppId,'Signup',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },sigupdata);     


  W.U.JunctionAdd(W.A.page.AppId,'TogglePassword',function(){
      this.Node.onclick=W.F.TogglePassword;
  },{});


            return ch;

        }



  var Madian= function(x){
       var ch ='';
   ch+=signup(x)+W.T.Login(x);

var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
      
     return  W.T.wrap(header,ch,footer);
   }

  var Landing=function(x){
       var ch ='';
      

 var  blockFront=Madian(x);
//--blockFront
 //--learn more
var learnMore=  W.U.LearnMorewrap;

//--search
var blockList=[blockFront,learnMore];
var blockName=["blockFront","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
  
     return  W.T.ToggleBlock(blockList, blockName,setting);
   }
   
    
  var doSignup=function(){
      var rv = ['email_or_phone', 'password', 'confirm_password'],
      form='signup_form',
      f_value = W.F.walk_way_all(rv, form),
      error=5, alert_mes = [], btn = $(this);
        
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


      if(error==0){
        
             var  formData = {
              form:form,
             f_value: f_value
            };
        console.log(formData);
       W.U.ajax({
           
                url:  W.U.URL('') + 'ajax/f0/p0',
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

       
                   
                    }
                }

       });
           
         /*  */

      }else{

        

      }

   
    

};
   
  var successBlock=function(x){
            var ch='<div class="block bs-0 bg_0 _bdy m_b10"><div class="block " style="max-width: 400px; margin: 0px auto;"> <span class="fw-b " style="font-size: 150%;">You have successfully registered. Now login to your account to activate it .</span></div></div>';




      var header= W.T.Header.wellcome({});;

      var Madian=ch+W.T.Login(x);

      var footer=W.T.Footer({});

  
    
     return  W.T.wrap(header,Madian,footer);

        }



     W.M.enter=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }
     };



})(wowrol);