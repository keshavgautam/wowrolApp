/*
* 
*/
; (function(W){
   "use strict";
   var screen=0, screenData=[];
function LoadData(){



}



function scrren0submit(){
 


      var frombody=function(x){
      var ch='';  var URL =W.U.URL;

        
  ch+='<div class="block _Bdy "><div class="block ul bs-1 "><div class="block li bg_7 _bdy fw-b fs14 b_gbl">help_86</div><div class="block li bg_0 _bdy"><div class="block bg_0 fg_5 ff_3 fs13">help_87</div></div><div class="block li bg_0 _bdy "> <div class="block"> <div class="block form-piece"> <label>text_130</label> <div class="input-group"> <input type="text" name="accountstr" autocomplete="off" class="form-mold" placeholder="Search " value="'+x.accountstr+'"> <span class="input-group-btn"> <button class="btn " type="submit" type="button">text_131</button> </span> </div></div> </div></div><div class="block li bg_0  " data-help="forgetpasswordform0"></div></div></div>';

 return ch;


   }

  

var formLogic =function() {
      var rv =   [ 'accountstr'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=1, alert_mes = [];
     
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
 
      var AlertError = W.T.AlertError({message:alert_mes});
       
    f_value.recaptcha=W.U.recaptcha.respone;

var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
 

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
    screenData=this.data;
  if(screenData.length>0){
      screen=2;
  }else
  {
      screen=1;   
  }
  init();
     }
var  onerror=function(){ W.U.madianLoading('hide');
      W.U.console(this);
var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 

        W.U.recaptcha.CheckRecapchaErrorMsg(this.data.message);
 }

    var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:{accountstr:''},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };




return Ragisterdata;

}
function SendConfirmationCode(){

    var formData = {
                form: 'forgetpasswordform1',
                f_value:{aid:screenData[0].aid}
            };


           W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
             
             W.U.madianLoading('show'); 
                     
                    },
                    success: function (data) {
                W.U.madianLoading('hide');
                

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
            
    W.F.Toast({msg:'Action Not Completed ',theme:'error'});
                        }
                        if (ret.state == 200) {
             
                screenData[0].accesskey= ret.response;
   screen=3;
   init();
                        }
                        
                    }

                }); 


    

}
function confirmationsubmit(){
 


      var frombody=function(x){
      var ch='';  var URL =W.U.URL;

        
  ch+='<div class="block _Bdy "><div class="block"><div class="block form-piece"> <label>text_132</label> <div class="input-group"> <input type="text" autocomplete="off" name="code" class="form-mold" placeholder="------ " value="'+x.code+'"> <span class="input-group-btn"> <button class="btn "  type="submit" >text_133</button> </span> </div></div><div class="block  bg_0  " data-help="forgetpasswordconfirmation"></div></div></div>';

 return ch;;


   }

  

var formLogic =function() {
      var rv =   [ 'code'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=1, alert_mes = [];
     
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
 
      var AlertError = W.T.AlertError({message:alert_mes});
       
    f_value.aid=screenData[0].aid;
     f_value.accesskey=screenData[0].accesskey;
var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
 

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
    screenData[0].token=this.data;
 screen=4;  
  init();
     }
var  onerror=function(){ W.U.madianLoading('hide');
      W.U.console(this);
var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

    var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:{code:''},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };




return Ragisterdata;

}

function setNewPassword(){
 


      var frombody=function(x){
      var ch='';  var URL =W.U.URL;

      
  ch+='<div class="block _Bdy"><div class="block form-piece"> <div class="input-group"> <label class="control-label">text_134</label> <input type="password" name="password" class="form-mold" placeholder="Password " value="'+x.password+'" data-required="true"> <span class="input-group-btn"> <button class="btn " type="button" data-btn="showpassword">text_115</button> </span> </div><div data-help="password"> </div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">text_120</label> <input type="password" name="confirm_password" class="form-mold" placeholder="Confirm Password" data-required="true" value="'+x.password+'"> <div data-help="confirm_password"></div><span class="input-group-btn"> <button class="btn " type="button" data-btn="showpassword" >text_115</button> </span> </div><div data-help="login_password"> </div></div> <div class="form-piece"> <button class="btn btn-block " type="submit" >text_135</button> </div><div class="block"> <div data-help="forgetpasswordform4"></div></div></div>';

 return ch;


   }

  

var formLogic =function() {
      var rv =   [ 'password','confirm_password'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=2, alert_mes = [];
     
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
 if( f_value.password!=f_value.confirm_password){
     alert_mes.push('Password are Not Matching.');error++;
 }



      var AlertError = W.T.AlertError({message:alert_mes});
       
    f_value.aid=screenData[0].aid;
    f_value.token=screenData[0].token;
var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
 

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
    screenData[0].password=this.data;
 screen=5;  
  init();
     }
var  onerror=function(){ W.U.madianLoading('hide');
    
var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }
 var     onbeforeinsert=function(){    

  W.U.attrclick('[data-btn="showpassword"]',this.formhtml[0],W.F.TogglePassword);  
  
    }
    var Ragisterdata={
            option:{sendwith:'ajax',onbeforeinsert:onbeforeinsert},
            formData:{password:''},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };




return Ragisterdata;

}


//--
function reinit(){
    screen=0;
   init();  
}






//---
function GetScreen(){

   
   
   return screen; 
}
   function init(){
 var walkway=  W.U.id('walkway');
 

 switch(GetScreen()){
 case 1://Not found account
  var mainBlock=W.U.Rander(W.T.forget_password.Screen1(screenData)); 

   W.U.attrclick('[data-btn="reinit"]',mainBlock[0],reinit); 
 break;
 case 2://choose accout
   var mainBlock=W.U.Rander(W.T.forget_password.Screen2(screenData));  
    

   W.U.attrclick('[data-btn="reinit"]',mainBlock[0],reinit); 
  W.U.attrclick('[data-btn="next"]',mainBlock[0],SendConfirmationCode); 

 break;
 case 3://confirmation
  var mainBlock=W.U.Rander(W.T.forget_password.confirmation(screenData[0]));  
 break;
 case 4://set new pass word
  var mainBlock=W.U.Rander(W.T.forget_password.setPassword(screenData[0]));  
 break;
case 5:// login Now
  var mainBlock=W.U.Rander(W.T.forget_password.Screen5(screenData[0]));  
 break;

   default :
   var mainBlock=W.U.Rander(W.T.forget_password.Screen0({}));  

 }


    
   W.U.Setview(walkway,mainBlock,'html');
 
   }

   W.U.forget_password={init:init,
   scrren0submit:scrren0submit,
   confirmationsubmit:confirmationsubmit,
   setNewPassword:setNewPassword};

})(wowrol);