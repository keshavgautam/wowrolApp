/*
* page set up 2
*/
; (function (W) {
    "use strict";


/**
* @description  generate the tab header
* @param  
*/
function Footer(){
         var URL=W.U.URL;
          var ch=   '<div class="ca0-p5 row " style="margin-top:40px;"> <div class="sr-container"> <div class="block gray_top_line"> <div class="block _bdy"> <div class="block m_b10"><ul class="ul  ul-menu tt-c li_bdy_0-5"> <li  ><a href="javascript:void(0);"  data-junction="Logout" >Logout</a></li><li  ><a href="javascript:void(0);" data-learnmore="about" >about</a></li><li><a   href="javascript:void(0);" data-learnmore="faq" >faq</a></li><li><a   href="javascript:void(0);" data-learnmore="terms" >terms</a></li><li><a href="javascript:void(0);" data-learnmore="privacy" >privacy</a></li><li class="hide"><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="learnMore"  >Learn More </a></li></ul></div><div class="row"><div class="block "><span >Wowrol shopping network  invented &amp; created  by Keshav Gautam</span> <a href="http://localhost:1234/">Wowrol </a> © 2016</div></div></div></div></div>'+W.T.localization_block()+'</div>';
           if(W.C.Setting.SERVER_MODE!="PRODUCTION"){
             ch+=JSON.stringify(document.cookie);  
           
           

           }
     

       W.U.JunctionAdd(W.A.page.AppId,'Logout',function(){
    this.Node.onclick=function(){
        for(var i=0;i<=9;i++){
   W.U.Cookie.remove(W.C.Setting.UserPath[i]);  
    }
   location.assign(URL(''));

    }
  },{});  
            return ch;   
             }
/**
* @description  generate the tab header
* @param  
*/
function localization_block(x){
               var appData=W.A.page;
               var lang=appData.AcessData.visit_data.wg;
               var Flaver=appData.AcessData.visit_data.wf;
                var ch='<div class="block  _bdy m_b10"><div class="block "> <div class="text ff_0 fs12"> <p class="al-c"> Wowrol offered in:</p><div class="block" data-junction="localizationlang"></div><div class="block" data-junction="localizationflaver" ></div></div></div></div>';

/////////--------------


// Adding List check box

  W.U.JunctionAdd(W.A.page.AppId,'localizationlang',function(){
//call back to biind Listcheckbox
       W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name:"localization",values:["en","hi"],valuesname:["English","Hindi"],Selected:lang,Class:'',Listid:'lang',callback:function(){
this.ListCheckBox.loadingOn();

//out business area

  var lang=this.itemvalue;
  //-- changing app slug name user res list
  var info=JSON.stringify({'hash':W.U.Now()+Math.random() ,
             'wg':lang,
             'wf':Flaver});
var parse =W.U.Encription.base64encode(info);

W.A.page.AcessData.visit_data.wg=lang;
W.U.Cookie.setPagedata();
console.log(parse);console.log(info);
  for(var i=0;i<appData.res.length;i++){
      

      if(appData.res[i].res=='lang'){


          W.A.page.res[i].name='lang.'+parse+'.js';
      }
      
  }
  $('#langjs').remove();

  $('html').attr('lang',lang);
  W.C.loader.init(W.A.page);
  //--

       
       


 



//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }}); 
  // End List check box




  //-----------------
   
  // Adding List check box

 W.U.JunctionAdd(W.A.page.AppId,'localizationflaver',function(){
//call back to biind Listcheckbox
        W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name:"localization",values:["mob","web"],valuesname:["Mobile","Laptop"],Selected:Flaver,Class:'',Listid:'flaver',callback:function(){
this.ListCheckBox.loadingOn();

//out business area
      console.log('hi am in call back');
    //wowrol.Controllers.Action.localization_Flaver
//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }}); 
  // End List check box
  //------
                return ch;
            }
/**
* @description  generate the tab header
* @param  
*/
function Login(x){
               var URL=W.U.URL;
              var ch='<div class="block bs-0 bg_0 _bdy m_b10"> <div class="block " style="z-index:2;"> <div class="block m_b10 al-c"><span class=" fw-b">Login <small> to your Wowrol account</small></span> </div><div class="block"  style="max-width: 400px; margin: 0px auto;"> <form name="login_form" data-junction="Login" onsubmit="return false"> </form> </div></div></div>';  

var frombody=function(x){      var ch='';
            var URL=W.U.URL;
           ch+='<div class="block"><div class="form-piece "> <label class="control-label">Email or Phone</label> <input type="text" class="form-mold" name="login_email_or_phone" autocomplete="off"   value="'+x.login_email_or_phone+'"placeholder="Email or Phone " data-required="true"> <div data-help="login_email_or_phone"> </div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">Password</label> <input type="password" class="form-mold" name="login_password" value="'+x.login_password+'"placeholder="Password"   data-required="true"> <span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >Show</button> </span> </div><div data-help="login_password"> </div></div><div class="form-piece"> <label class="checkbox-inline _bdy "> <input type="checkbox" name="remember_me" value="1"><span>Remember me</span> </label> <input type="hidden" name="redirect_to" value="'+URL('')+'"> </div><div  data-help="login_form"></div><div class="form-piece clearfix"> <button type="submit"  class="block btn _dbtn right">Login</button> </div><div class="form-piece clearfix"><a href="'+URL('forget_password')+'" class="btn btn-link left">Forget Password ?</a> <a href="'+URL('enter')+'" class="btn btn-link right">Signup</a></div></div>';
           
           return ch;
            };
var formLogic =function() {
     var rv = ['login_email_or_phone', 'login_password', 'remember_me', 'redirect_to'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=4, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
  
   
  
      var AlertError = W.T.AlertError({message:alert_mes});


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
  visit_data.wb=this.data.wb;
    visit_data.wc=this.data.wc;
    visit_data.wd=this.data.wd;
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
            formData:{login_email_or_phone:'mvcApp100@gmail.com',login_password:'123456789'},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };
         
   W.U.JunctionAdd(W.A.page.AppId,'Login',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },sigupdata);     


    W.U.JunctionAdd(W.A.page.AppId,'TogglePassword',function(){
      this.Node.onclick=W.F.TogglePassword;
  },{});
  
  
              return ch;
                 
            }

/**
* @description  do login
* @param  
*/
function dologin(){
    


}


/**
* @description  generate the form header
* @param  
*/
function FormHeader(x){
          /*{close:'<div class="li"><a href="javascript:void(0);" ><span>Cancel</span><i class="badge _gbtn"></i> </a></div>',
           title:'<span class=" block header-link-btn">title</span>',
           done:'<div class="li"><a href="javascript:void(0);" ><span>Save</span><i class="badge _gbtn"></i> </a></div>'}
          */
             return '<div class="block bg_1"> <div class="w2"> <div class="block ul ul-menu thm header-link"> '+x.close+'</div></div><div class="w8"> '+x.title+'</div><div class="w2"> <div class="right"> <div class="block ul ul-menu thm header-link"> '+x.done+' </div></div></div></div>'; 
      }
/**
* @description  generate the form header
* @param  
*/
function ActivityHeader(x){
   /*
    {LeftButton:'',
    Title:'',
    RightLink:''
    dropdown:{}
    }
   */
    var dropdown='';
  if(x.dropdown.length>0){
    dropdown+='<div class="li"><a href="#" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">&#xE5D4;</i><span></span><i class="badge _gbtn"></i> </a> <ul class="dropdown-menu  pull-right">';
      for(var q  in x.dropdown ){
        dropdown+='<li>'+x.dropdown[q]+'</li>';    
      }
      dropdown+='</ul> </div>';
  }
  
     return '<div class="block bg_1 bs-0"> <div class="left w7"> <div class="block ul ul-menu thm header-link"> <div class="li b_grl">'+x.LeftButton+'</div><div class="li w8 ">'+x.Title+'</div></div></div><div class=" w5"><div class="right "> <div class="block ul ul-menu thm header-link"> '+x.RightLink+dropdown+'</div></div></div></div>';   
}
/**
* @description  show the loading  block
* @param  
*/
function blockLoading(){
     var ch = '<div class="block li bs-2dp  bg_0  al-c">';
                ch += '<div class="block"> <img src="/assets/imgs/pic/ring-alt.svg" style="width:50px;height:50px;" alt="loading..." > </div>';
                ch += '</div>';

                return ch;
}




  W.T.FormHeader = FormHeader;
  W.T.ActivityHeader = ActivityHeader;
  W.T.Footer = Footer;
  W.T.Login = Login;
  W.T.localization_block = localization_block;
  W.T.blockLoading = blockLoading;


})(wowrol);