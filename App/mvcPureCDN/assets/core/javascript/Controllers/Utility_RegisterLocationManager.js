 ; (function(W){
   "use strict";
   
   
   
   var frombody=function(x){
       var URL =W.U.URL;
           
     var ch='';

     if(W.I.wf=="web"){
        ch+= '<div class="block _Bdy"><div class=" bs-1   _bdy bg_0">'+W.T.RegisterLM.formbody(x)+'</div></div>';  
     }else{
            var header= W.T.FormHeader({close:'<div class="li"><a  href="'+URL('ragister')+'"  ><span>text_63</span><i class="badge _gbtn"></i> </a></div>',
           title:'<span class=" block header-link-btn"><span class="fw-b al-c"><span class="vl-sp">text_319</span></span></span>',
           done:'<div class="li"><a href="javascript:void(0);" type="submit" ><span>text_181</span><i class="badge _gbtn"></i> </a></div>'});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header, W.T.RegisterLM.formbody(x),footer); 
     }

     
        return   ch;
            };

var formLogic =function() {
     var f_value={country:0,postalCode:0,entity_id:0},All = W.F.walk_way_all('*', this.formname),
      error=3, alert_mes = [];
        
 for(var q  in All){
     switch(All[q].name){
      case 'country':
      var li_data= W.U.intentdata.get(All[q].value);
      f_value.country=li_data.id;
      break;
      case 'postalCodebycountry':
      var li_data= W.U.intentdata.get(All[q].value);
      f_value.postalCode=li_data.id;
      break;
      case 'UserName':
      var li_data= W.U.intentdata.get(All[q].value);
      f_value.entity_id=li_data.id;
      break;        
     }
 }

       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
    alert_mes=glueErrors.message;
  
  

  
      var AlertError = W.T.AlertError({message:alert_mes});


      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(data){
    var _this=this;
   
  W.F.Toast({msg:W.U.GetText('Action Successfull')});

       W.U.SwitchUser({entity_id: _this.data.entity_id,URL:W.U.URL(''),goto:true}); 
//location.assign(W.U.URL(''));


     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:{ },
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };
   
   
   
   
   W.U.RegisterLM ={
      Ragisterdata:Ragisterdata 

   };
   
   })(wowrol);