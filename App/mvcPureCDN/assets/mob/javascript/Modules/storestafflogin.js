/*
* 
*/
; (function(W){
   "use strict";

var staffloginform=function(c){
                var URL=W.U.URL;
              var ch='<div class="block bs-0 bg_0 _bdy m_b10"> <div class="block " style="z-index:2;"> <div class="block m_b10 al-c"><span class=" fw-b">Login <small> to your Wowrol Store Staff Account</small></span> </div><div class="block"  style="max-width: 400px; margin: 0px auto;"> <form name="storestafflogin" data-junction="storestafflogin" onsubmit="return false"> </form> </div></div></div>';  




var frombody=function(x){      var ch='<div class="block ">';
            var URL=W.U.URL;
        ch+='<div class="block form-piece"> <label class="control-label">Store URL Address <i >*</i></label> <div class="form-inline"> <div class="input-group "> <div class="input-group-addon">'+URL('')+'/</div><input type="text" name="store_url_address" class="form-mold" placeholder="URL Address" autocomplete="off"   value="'+x.store_url_address+'" data-junction="checkURL" data-required="true" > </div></div><div data-help="store_url_address"></div></div>';
   W.U.JunctionAdd(W.A.page.AppId,'checkURL',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'URL',option:{}} })();
        },{}); 
      ch+=' <div class="block form-piece "> <label class="control-label">Store Staff Hash<i >*</i></label> <input type="text" class="form-mold" name="storestaffhash" autocomplete="off"  value="'+x.storestaffhash+'" placeholder="Store Staff Hash" data-required="true" > <div data-help="storestaffhash"> </div></div>';

         ch+=' <div class="block form-piece "> <label class="control-label">UserName<i >*</i></label> <input type="text" class="form-mold" name="username" autocomplete="off"  value="'+x.username+'" placeholder="UserName" data-junction="checkusername" data-required="true" > <div data-help="username"> </div></div>';
          W.U.JunctionAdd(W.A.page.AppId,'checkusername',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'AlphaNum',option:{}} })();
        },{}); 
         ch+='<div class="block form-piece"> <div class="input-group"> <label class="control-label">Password<i >*</i></label> <input type="password" class="form-mold" name="password" value="'+x.password+'" placeholder="Password"   data-required="true" > <span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >Show</button> </span> </div><div data-help="login_password"> </div></div>';
         ch+='<div class="block form-piece"> <label class="checkbox-inline _bdy "> <input type="checkbox" name="remember_me" value="1"><span>Remember me</span> </label> <input type="hidden" name="redirect_to" value="'+URL('')+'"> </div><div  data-help="storestafflogin"></div>';
      ch+='<div class="form-piece clearfix"> <button type="submit"  class="block btn _dbtn right">Login</button> </div>'; 
         ch+='</div>';
           return ch;
            };
var formLogic =function() {
   var rv = ['store_url_address', 'storestaffhash', 'username', 'password', 'remember_me', 'redirect_to'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=6, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
  
   
  
      var AlertError = W.T.AlertError({message:glueErrors.message});


      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
   /*set the login cookies and load the apropiate cookie .*/
  

        var f_value=this.form.formLogicdata.f_value;          
                   var Isremember=0;;
                        if (f_value['remember_me'] == 1) {
                         
                            Isremember=1;
                        }
                   
              //---
   var visit_data=W.A.page.AcessData.visit_data;
   visit_data.wa=this.data.wa;
   visit_data.wb=this.data.wb;
   visit_data.wc=this.data.wc;
   visit_data.wd=this.data.wd;
   visit_data.wj=this.data.wj;
   visit_data.we=Isremember;
    W.A.page.AcessData.visit_data=visit_data;
    var cookie=W.U.Cookie;
     cookie.setPagedata();

    

    location.assign(f_value['redirect_to']);

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

        var sigupdata={
            option:{sendwith:'ajax4'},
            formData:{store_url_address:'test-mob-store',
            storestaffhash:'%db2*$%goic4)0faye14',
            username:'Mohan',
            password:'123456'

                  },
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };
         
   W.U.JunctionAdd(W.A.page.AppId,'storestafflogin',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },sigupdata);     


    W.U.JunctionAdd(W.A.page.AppId,'TogglePassword',function(){
      this.Node.onclick=W.F.TogglePassword;
  },{});


return ch;
}
function Logout(){// log out from all other account
    for(var i=0;i<=9;i++){
   W.U.Cookie.remove(W.C.Setting.UserPath[i]);  
    }
     

 

}
 var Landing=function(x){
       var ch ='';
      var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;
//lopout memnber
  Logout();
        ch+= W.T.wrap(header,staffloginform(x),footer);
     return  ch;
   }
   
    

   


     W.M[W.A.page.AppId]=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };


})(wowrol);