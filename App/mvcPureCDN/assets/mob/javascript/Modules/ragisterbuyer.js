/*
* 
*/
; (function(W){
   "use strict";

  var Madian=function(x){
        var URL =W.U.URL;
    var ch='<div class="block bs-0 bg_0 _bdy m_b10">';
       ch+='<div class="block al-c "> <p class="fs12">Open a Wowrol Store to reach and engage with millions of online consumers.</p></div>';


   ch+='<div class="block m30_0"><div data-help="ragisterbuyer"></div>';
   
   ch+=' <div class="form-piece"> <label class="control-label">Full Name</label> <input type="text" name="full_name" class="form-mold" autocomplete="off" placeholder="Full Name" value="keshav"> <div data-help="full_name"></div></div>';
            ch+=' <div class="form-piece"> <label class="control-label">User Name</label> <input type="text" name="user_name" class="form-mold" autocomplete="off" placeholder="User Name" value="keshav"> <div data-help="user_name"></div></div>';
        ch+='<div class="form-piece"> <label class="control-label">Sex</label><div class="block"> <select class="form-mold w6" name="sex" ><option value="">Sex</option> <option value="0" selected="selected">Male</option> <option value="1">Female</option> </select> </div><div data-help="store_handle"></div></div>';
        ch+='<div class="form-piece"> <label class="control-label">Birthday</label><div class="block"> <div class="block"  data-junction="Birthday"></div></div><div data-help="birthday"><span class="fs11 fg_5 ">Verify you are 13 year old.</span></div></div>';

       W.U.JunctionAdd(W.A.page.AppId,'Birthday',function(){
            $(this.Node).date_fill(this.data);
        },{selected:"Jun,19,1989",class:"form-mold  w4 ",name:"birthday_"});  


        ch+='<div class="form-piece"> <div data-help="terms"> <div class="fs11">By clicking get start, you agree to our <a href="'+URL('')+'terms" class="fs11" target="_blank" tabindex="">Terms </a> . </div></div></div>';

ch+='</div>';
       return ch;
   }

   var frombody=function(x){
       var URL =W.U.URL;
           
     var ch='';
      var header= W.T.FormHeader({close:'<div class="li"><a  href="'+URL('ragister')+'"  ><span>Cancel</span><i class="badge _gbtn"></i> </a></div>',
           title:'<span class=" block header-link-btn"><span class="fw-b al-c">'+W.T.SVG('user',24,'#f1f5fc')+'<span class="vl-sp">Ragister as Buyer</span></span></span>',
           done:'<div class="li"><a href="javascript:void(0);" type="submit" ><span>Get Start</span><i class="badge _gbtn"></i> </a></div>'});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,Madian(x),footer);
        return ch;
            };

var formLogic =function() {
     var rv = ['full_name','user_name', 'sex', 'birthday_Day', 'birthday_Month','birthday_Year'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=6, alert_mes = [];
        
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
  
location.assign(W.U.URL(''));

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

var Ragisterdata={
            option:{sendwith:'ajax4'},
            formData:{store_name:'Test-mob-Store',
                      store_url_address:'Test-mob-Store',
                     storecategory:{},
                     address:'',
                     pincode:''

            },
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };





  var Landing=function(x){
       var ch ='<form name="ragisterbuyer"  data-junction="ragisterbuyer" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'ragisterbuyer',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       

     return  ch;
   }
   
    

   


     W.M.ragisterbuyer=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };


})(wowrol);