/*
* 
*/
;(function(W){
   "use strict";
     var URL =W.U.URL;

   function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
var ragisterationform=function(x){
        var URL =W.U.URL;
    var ch='<div class="block bs-0 bg_0 _bdy m_b10 ">';
     if(W.I.wf=="web"){
       ch+='<div class="block fw-b"> <div class="block _bdy"><h2>text_180</h2></div><div class="block _bdy t"><span>help_92</span></div></div>';

       }else{
           ch+='<div class="block al-c "> <span class="fs12">help_92</span></div>';
      ch+='<div class="block m30_0"><div data-help="ragisterbuyer"></div>';  
       }

  ch+=' <div class="block"><div class="w6"><div class="form-piece"> <label class="control-label">text_176</label> <input type="text" name="first_name" class="form-mold" autocomplete="off" placeholder="First Name" value=""> <div data-help="first_name"></div></div></div><div class="w6"><div class="form-piece"> <label class="control-label">text_177</label> <input type="text" name="last_name" class="form-mold" autocomplete="off" placeholder="Last Name" value=""> <div data-help="last_name"></div></div></div></div>';

 
            ch+=' <div class="form-piece"> <label class="control-label">text_178</label> <input type="text" name="user_name" class="form-mold" autocomplete="off" placeholder="User Name" value=""> <div data-help="user_name"></div></div>';

        ch+='<div class="form-piece"> <label class="control-label">text_179</label><div class="block" data-junction="sex"> <select class="form-mold w6" name="sex" ><option value="">Sex</option> <option value="0" selected="selected">Male</option> <option value="1">Female</option> </select> </div><div data-help="store_handle"></div></div>';


          W.U.JunctionAdd(W.A.page.AppId,'sex',function(){
               W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
        },{name:"sex",values:[0,1],valuesname:["Male","Female"],Selected:0,Class:''});

        ch+='<div class="form-piece"> <label class="control-label">text_174</label><div class="block"> <div class="block"  data-junction="Birthday"></div></div><div data-help="birthday"><span class="fs11 fg_5 ">text_173</span></div></div>';

       W.U.JunctionAdd(W.A.page.AppId,'Birthday',function(){
            $(this.Node).date_fill(this.data);
        },{selected:"",class:"form-mold  w4 ",name:"birthday_"});  

   ch+='<div class="form-piece"> <label class="control-label">text_175</label><div class="block"> <div class="block"  data-junction="Country"></div></div><div data-help="birthday"><span class="fs11 fg_5 ">ajax_45</span></div></div>';

       W.U.JunctionAdd(W.A.page.AppId,'Country',function(){
           var List=W.A.page.AppView.countryList;
           var ch='<select class="form-mold  w6 " name="country" title="country">';
           var selected='';
           for(var q in List){
               if(List[q].countryinfo_id==105){
                  selected='selected="selected"'; 
               }else{
                   selected='';
               }
               ch+=' <option value="'+List[q].countryinfo_id+'" '+selected+' >'+List[q].country+'</option>';
           }

           ch+='</select>';
            $(this.Node).html(ch);
        },{});  
        ch+='<div class="form-piece"> <div data-help="terms"> <div class="fs11">text_172 <a href="'+URL('')+'terms" class="fs11" target="_blank" tabindex="">text_117 </a> . </div></div></div>';
      if(W.I.wf=="web"){
   ch+='<div class="block m30_0"><div data-help="ragisterbuyer"></div>';
ch+='<div class="form-piece clearfix"> <button type="submit" class="block btn _dbtn right">text_181</button> </div>';
}
ch+='</div>';
       return ch;
   }

   var frombody=function(x){
       var URL =W.U.URL;
           
     var ch='';

     if(W.I.wf=="web"){
        ch+= '<div class="block _Bdy"><div class=" bs-1   _bdy bg_0">'+ragisterationform(x)+'</div></div>';  
     }else{
            var header= W.T.FormHeader({close:'<div class="li"><a  href="'+URL('ragister')+'"  ><span>text_63</span><i class="badge _gbtn"></i> </a></div>',
           title:'<span class=" block header-link-btn"><span class="fw-b al-c">'+W.T.SVG('user',24,'#f1f5fc')+'<span class="vl-sp">text_180</span></span></span>',
           done:'<div class="li"><a href="javascript:void(0);" type="submit" ><span>text_181</span><i class="badge _gbtn"></i> </a></div>'});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,ragisterationform(x),footer); 
     }

     
        return   ch;
            };

var formLogic =function() {
     var rv = ['first_name','last_name','user_name', 'sex:0', 'birthday_Day', 'birthday_Month','birthday_Year','country'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=8, alert_mes = [];
        
      

       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
    alert_mes=glueErrors.message;
  
    if(getAge(f_value.birthday_Year+'-'+f_value.birthday_Month+'-'+f_value.birthday_Day) < 13){
        error++;
 alert_mes.push(W.U.GetText('you should be 13 year old to use wowrol.com'));
    }

  
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












   W.U.ragisterBuyer={
   Ragisterdata:Ragisterdata
   };


   })(wowrol);