/*
* 
*/
; (function(W){
   "use strict";
    function signupfrombody(x){      var ch='';
            var URL=W.U.URL;
           ch+='<div class="block"><div class="form-piece"> <label class="control-label">text_114</label> <input type="text" name="email_or_phone" class="form-mold" placeholder="Email address" autocomplete="off" data-required="true" value="'+x.email_or_phone+'"> <div data-help="email_or_phone"></div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">text_119</label> <input type="password" name="password" class="form-mold" placeholder="Password " value="'+x.password+'" data-required="true"> <span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >text_115</button> </span> </div><div data-help="password"> </div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">text_120</label> <input type="password" name="confirm_password" class="form-mold" placeholder="Confirm Password" data-required="true" value="'+x.password+'"> <div data-help="confirm_password"></div><span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >text_115</button> </span> </div><div data-help="login_password"> </div></div><div class="form-piece"> <div data-help="terms"> <div class="sigcbt"><span>help_82</span> <span><a href="javascript:void(0);" data-learnmore="terms">text_117 </a></span> <span><a href="javascript:void(0);" data-learnmore="privacy" >text_118</a> </span>  </div></div></div><div class="block"> <div data-help="Signup"></div></div><div class="form-piece clearfix"> <button type="submit"    class="block btn _dbtn right">text_116</button> </div></div>';
           
           return ch;
            };  



   var signup=function(x){
        var ch='';
         
         



         
  






  ch+='<div class="block  bg_0 ">';
    ch+='<div class="block fw-b"> <div class="block _bdy"><h2>text_121</h2></div><div class="block _bdy t"><span>help_83</span></div></div>';
      ch+='<div class="block bs-1 ">';
    ch+='<div class=" bs-1 _bdy m0_auto" style="max-width: 400px; "> <form name="Signup" data-junction="Signup" onsubmit="return false"> </form> </div>';
       // ch+='<div class="di-td w21   _bdy al-c fw-b fs14"  > OR </div>';
     //   ch+='<div class="di-td w24  bs-1 _bdy"  > <div data-junction="gogglesign" id="my-signin2" ></div><div class="m30_0" ></div></div>';
      ch+='</div>';
    ch+='</div>';

    //<a class="btn" href="javascript:void(0);" onclick="signOutGoogle">Sign out</a> 

            return ch;
          

        }



  var Madian= function(x){
 
    return  '<div class="block _Bdy"><div class="di-td bs-1 w29   bg_0">'+signup(x)+'</div><div class="di-td bs-1  w23 bg_0  bg_0">'+W.T.Login()+'</div></div>';

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
   
    
 
   
  var successBlock=function(x){
            var ch='<div class="block bs-0 bg_0 _bdy m_b10"><div class="block " style="max-width: 400px; margin: 0px auto;"> <span class="fw-b " style="font-size: 150%;">help_84</span></div></div>';




      var header= W.T.Header.wellcome({});;

      var Madian=ch+W.T.Login(x);

      var footer=W.T.Footer({});

  
    
     return  W.T.wrap(header,Madian,footer);

        }



 
     W.M[W.A.page.AppId]=  {
       Madian:Madian,
       signupfrombody:signupfrombody,
       successBlock:successBlock

     };



})(wowrol);