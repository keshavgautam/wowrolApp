/*
* 
*/
; (function(W){
   "use strict";

  var Madian=function(x){
        var URL =W.U.URL;
    var ch='<div class="block bs-0 bg_0 _bdy m_b10">';
       ch+='<div class="block al-c "> <p class="fs12">Open a Wowrol Store to reach and engage with millions of online consumers.</p></div>';


   ch+='<div class="block m30_0"><div data-help="Ragister_Store"></div>';
   
   ch+='<div class="form-piece"> <label class="control-label">Store Name <i >*</i></label> <input type="text" name="store_name" class="form-mold" autocomplete="off" placeholder="Store Name" value="Test mob Store" > <div data-help="store_name"></div></div>';
   
   ch+='<div class="form-piece"> <label class="control-label">Store URL Address <i >*</i></label> <div class="form-inline"> <div class="input-group "> <div class="input-group-addon">http://wowrol.com/</div><input type="text" name="store_url_address" class="form-mold" placeholder="URL Address" autocomplete="off" data-junction="checkURL"  value="Test-mob-Store" > </div></div><div data-help="store_url_address"><span class="block _bdy fg_4 fs-italic fs11">You can choose a store url adress that is easier to memorize and looks better on business cards.</span></div></div>';
   W.U.JunctionAdd(W.A.page.AppId,'checkURL',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'URL',option:{}} })();
        },{}); 
                                   var suggestion={
                                                            name:'storecategory',
                                                            fireAfter:4,
                                                            type:'1',
                                                            token:'chips',
                                                            placeholder:'storecategory'
                                                                   };
   ch+='<div class="form-piece"> <label class="control-label">What Will You Sell?</label> <div class="form-token block" data-junction="suggestion0"> <div class="block bd"><div class="block ul ul-menu"><div class="li"><div class="token"> <span>Kota Doria Sari</span> <span class="sclose s_tclose" > ></span> <input class="tokenh_input" type="hidden" name="storecategory" value="{&quot;id&quot;:&quot;Kota Doria Sari&quot;}"> </div></div><div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="Sell Tag"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div>';
      W.U.JunctionAdd(W.A.page.AppId,'suggestion0',function(){
    W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion);  



   ch+='<div class="form-piece"> <label class="control-label">Address <i >*</i></label> <textarea name="address" class="form-mold  m_b5 textarea" placeholder="Address "  autocomplete="off"rows="3"  >Test-mob-Store Address</textarea> <div data-help="address"></div></div>';
         var suggestion={
                                                            name:'pincode',
                                                            fireAfter:6,
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'pincode'
                                                                   };
   ch+='<div class="form-piece"> <label class="control-label">Pincode <i >*</i></label> <div class="form-token block " data-junction="suggestion1" ><div class="block bd">  <div class="block ul ul-menu"><div class="li"><div class="token"> <span>325214-Jaloda Khatian Kota RAJASTHAN</span> <span class="sclose s_tclose"></span> <input class="tokenh_input" type="hidden" name="pincode" value="{&quot;id&quot;:&quot;105005&quot;}"> </div></div> <div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in "> </div></div></div><div data-help="pincode"></div></div>';
   
  W.U.JunctionAdd(W.A.page.AppId,'suggestion1',function(){
   W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion); 


   ch+='<div class="form-piece"> <label class="control-label">Phone <i>*</i></label> <input type="text" name="phone" class="form-mold " autocomplete="off" placeholder="Phone"  data-junction="checkPhone" value="7891945988" > <div data-help="phone"></div></div><div class="form-piece"> <div data-help="terms"> <div class="fs11">By clicking get start, you agree to our <a href="'+URL('terms')+'" class="fs11" target="_blank" tabindex="">Terms </a> . </div></div></div>';
 W.U.JunctionAdd(W.A.page.AppId,'checkPhone',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'phone',option:{}} })();
        },{}); 
   ch+=' </div>';

ch+='</div>';
       return ch;
   }

   var frombody=function(x){
       var URL =W.U.URL;
           
     var ch='';
      var header= W.T.FormHeader({close:'<div class="li"><a  href="'+URL('ragister')+'"  ><span>Cancel</span><i class="badge _gbtn"></i> </a></div>',
           title:'<span class=" block header-link-btn"><span class="fw-b al-c">'+W.T.SVG('store',24,'#f1f5fc')+'<span class="vl-sp">Open a Store</span></span ></span>',
           done:'<div class="li"><a href="javascript:void(0);" type="submit" ><span>Get Start</span><i class="badge _gbtn"></i> </a></div>'});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,Madian(x),footer);
        return ch;
            };

var formLogic =function() {
     var rv =   ['store_name', 'store_url_address', 'address', 'pincode','phone'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=5, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
 
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
          // collecting sell tag
        var storecategory = Array('');
        $(':hidden.tokenh_input').each(function (i) {
            if ($(this).attr('name') == 'storecategory') {
              storecategory[i]=W.F.JSONparse($(this).val(),{id:''})['id'];
                 
            }


        });
        
        f_value['pincode']=W.F.JSONparse(f_value['pincode'],{id:''})['id'];
         f_value['storecategory']=storecategory;

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
       var ch ='<form name="Ragister_Store"  data-junction="Ragister_Store" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'Ragister_Store',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       

     return  ch;
   }
   
    

   


     W.M.ragisterstore=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };


})(wowrol);