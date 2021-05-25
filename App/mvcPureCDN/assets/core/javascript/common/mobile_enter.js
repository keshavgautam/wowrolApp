/*
* 
*/
; (function(W){
   "use strict";

     var successBlock=function(x){
            var ch='<div class="block bs-0 bg_0 _bdy m_b10"><div class="block " style="max-width: 400px; margin: 0px auto;"> <span class="fw-b " style="font-size: 150%;">help_84</span></div></div>';




      var header= W.T.Header.wellcome({});;

      var Madian=ch+W.T.Login(x);

      var footer=W.T.Footer({});

  
    
     return  W.T.wrap(header,Madian,footer);

        }


   var frombody=  function (x){
       
       var ch='';
                 var URL=W.U.URL;
                 ch+='<div class="block"><div class="form-piece"><label class="control-label">text_381</label><div class="input-group"><span class="input-group-addon">+91</span><input type="number" class="form-mold" name="mobile_number"  data-required="true" ></div><div data-help="mobile_number"></div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">text_119</label> <input type="password" name="password" class="form-mold" placeholder="Password " value="'+x.password+'" data-required="true"> <span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >text_115</button> </span> </div><div data-help="password"> </div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">text_120</label> <input type="password" name="confirm_password" class="form-mold" placeholder="Confirm Password" data-required="true" value="'+x.password+'"> <div data-help="confirm_password"></div><span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >text_115</button> </span> </div><div data-help="login_password"> </div></div><div class="form-piece"> <div data-help="terms"> <div class="sigcbt"><span>help_82</span> <span><a href="javascript:void(0);" data-learnmore="terms">text_117 </a></span> <span><a href="javascript:void(0);" data-learnmore="privacy" >text_118</a> </span>  </div></div></div><div class="block"> <div data-help="Signup"></div></div><div class="form-piece clearfix"> <button type="submit"    class="block btn _dbtn right">text_116</button> </div></div>';
           
           return ch;






   };
var formLogic =function() {
     var rv = ['mobile_number', 'password', 'confirm_password'],
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

     f_value.email_or_phone=  f_value.mobile_number;

      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    var data= this.form.formLogicdata;

 
       W.U.AddDom(W.U.Page,successBlock({login_email_or_phone:data.f_value.email_or_phone,login_password:data.f_value.password}),'html');



     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

        var sigupdata={
            option:{sendwith:'ajax'},
            formData:{email_or_phone:'',password:''},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };










   function signup(x){
               var ch='';
         


//juntion data supllyed form  core /javascript/common


         
    

 W.U.Junction('Signup',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },sigupdata); 

  



    ch+='<div class="block  bg_0 _bdy m_b10">';
    ch+='<div class="block fw-b"> <div class="block _bdy"><h2>text_121</h2></div><div class="block _bdy t"><span>help_83</span></div></div>';

    ch+=' <div class="block" style="max-width: 400px; margin: 0px auto;"><div class="block" ><form name="Signup" data-junction="Signup" onsubmit="return false"> </form> </div><div class="block _bdy al-c fw-b "> OR </div> <div class="block  al-c  "> <a href="'+W.U.URL('enter')+'" class="btn btn-link left">text_396</a></div></div>';
    ch+='</div>';

            return ch;
   }



//---------------------
   var Madian=function(x){
   var ch='',page='';

 


//-----------------------
    


    

 if(W.I.wf=="mob"){

       page= '<div class="block _bdy">'+signup(x)+'<div class="block bs-0  m_b10">'+W.T.Login()+'</div>'+'<div>';
 }

 if(W.I.wf=="web"){

  ch= '<div class="block _Bdy"><div class="di-td bs-1 w29   bg_0">'+signup(x)+'</div><div class="di-td bs-1  w23 bg_0  bg_0">'+W.T.Login()+'</div></div>';

var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:'<div class="block _bdy">'+ch+'</div>'}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);
   
 }


 W.U.ccbk.Add('pageloaded',function(){
      
    });

    return page;
   }




  W.M[W.A.page.AppId]=  {
       Madian:Madian

     };

 })(wowrol);