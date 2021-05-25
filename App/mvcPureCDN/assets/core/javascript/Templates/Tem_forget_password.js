/*
* 
*/
; (function(W){
   "use strict";

   function ChooseAccount(x){
       var ch='';
   
       switch(x.type){
      case 'account':
      var tep='<div class="block li _bdy bg_0  "> <div class="block bg_0 fg_5 ff_3 fs14"> <span class="fw-b">'+x.identity+'</span></div></div>';
    

      ch+=tep;;



      break;
      case 'entity':


      var tep='<div class="block li _bdy bg_0  ">'+W.T.C.C2_EntityStrip(x.ESd)+'</div>';
    

      ch+=tep;;



      break;     



       }

     return ch;
   }



   var S={
  Screen0:function(x){
      var ch='';

ch+='<form name="forgetpasswordform0" onsubmit=" return false" data-junction="forgetpasswordform0" ></form>';

 W.U.Junction('forgetpasswordform0',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.forget_password.scrren0submit());   
return ch;
  },      
  Screen1:function(x){
      var ch='<div class="block ul "><div class="block li _bdy bg_0 _B-gray "> <div class="block _bdy al-c" style="margin-top: 40px; "> <h3>No account found.</h3> </div></div><div class="block li _bdy bg_0 _B-gray "> <div class="left"> <a data-btn="reinit" class="btn ">Back</a> </div></div></div>';


return ch;
  },
  Screen2:function(x){
      var ch='<div class="block _Bdy"><div class="block ul  bs-1 "><div class="block li bg_7 _bdy fw-b fs14 b_gbl">Password retrieval - Choose your account</div>';
    
for(var  q in x){
ch+=ChooseAccount(x[q]);
}
  ch+='<div class="block li _bdy bg_0 b_gtl"> <div class="left"> <a href="javascript:void(0);"  class="btn" data-btn="reinit" >This is not my account</a> </div><div class="right"> <button class="btn btn-primary" data-btn="next" >Next</button></div></div>';

ch+='</div></div>';
   
return ch;
  },
  confirmation:function(x){
      x.identityname=(x.identitytype =='email')?'an email':'a sms';


      var ch='<div class="block _Bdy"><div class="block ul bs-1"><div class="block li bg_7 _bdy fw-b fs14 b_gbl">Password retrieval - confirmation</div><div class="block li bg_0 _bdy"><div class="block bg_0 fg_5 ff_3 fs13">Check your email inbox /sms inbox - we sent you  '+x.identityname+' with a six-digit confirmation code to '+x.identity+'. Enter it below to continue to reset your password.</div><div class="block li bg_0 "> <div class="block"><form name="forgetpasswordconfirmation" onsubmit=" return false" data-junction="forgetpasswordconfirmation" ></form> </div></div></div></div></div>';

       W.U.JunctionAdd(W.A.page.AppId,'forgetpasswordconfirmation',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.forget_password.confirmationsubmit());   

      return ch;
  },
  setPassword:function(x){
  


      var ch='<div class="block ul _B-gray"><div class="block li bg_7 _bdy fw-b fs14 b_gbl">Password retrieval - Reset Your Password</div><div class="block li bg_0 _bdy fs14 "> <div class="block " style="margin-top: 30px;"> <form name="forgetpasswordform4" onsubmit="return false" data-junction="forgetpasswordform4" ></form> </div></div></div>';

       W.U.JunctionAdd(W.A.page.AppId,'forgetpasswordform4',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.forget_password.setNewPassword());   

      return ch;
  },
  Screen5:function(x){



      var ch='<div class="block ul _B-gray"><div class="block li bg_7 _bdy fw-b fs14 b_gbl">Password retrieval -Password changed</div><div class="block li bg_0 "> <div class="block " >'+W.T.Login({login_email_or_phone:x.identity,login_password:x.password})+'  </div></div></div>';

       

      return ch;
  }
   };



   W.T.forget_password=S;

})(wowrol);