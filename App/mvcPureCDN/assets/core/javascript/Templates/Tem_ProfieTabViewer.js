/*
* 
*/
; (function(W){
   "use strict";
   //--Info panal
 var IFO_Panal={
   basicbuyer:function(x){
       var data=x.data;var panalID=x.panalID;
     
      function frontcallback (){
      var data=this.options.formData; 
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';

  ch+='<div class="block m_b5"> <span class="span "><strong class="fw-b tt-c">Living Place :</strong></span> <span class="span    t pt"><p>'+data.livingPlace+'</p></span> </div>';

  ch+='<div class="block m_b5"> <span class="span "><strong class="fw-b tt-c">Sex :</strong></span> <span class="span ">'+((data.sex==0)?'Male':'Female')+'</span> </div>';

   ch+='<div class="block m_b5"> <span class="span "><strong class="fw-b tt-c">memberSince :</strong></span> <span class="span ">'+data.memberSince+'</span> </div>';
    ch+='<div class="block m_b5"> <span class="span "><strong class="fw-b tt-c">website :</strong></span> <span class="span    t pt"><p>'+data.website+'</p></span> </div>';

  ch+='</div>';

if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
      
               var ch='<div class="block _bdy bg_0"> ';

   ch+='<div class="block m_b5 "> <div class="form-piece fs11"> <label class="control-label">Living Place :</label> <input type="text" name="livingPlace" class="form-mold fm_sm" autocomplete="off" value="'+data.livingPlace+'" data-masker="AlphaNum:50:Y:Y" ><div data-help="livingPlace"></div> </div> </div>';
   ch+='<div class="block m_b5 "> <div class="form-piece fs11"> <label class="control-label">Sex :</label> <div class="block" data-junction="sex"> </div><div data-help="sex"></div> </div> </div>';
  ch+='<div class="block m_b5 "> <div class="form-piece fs11"> <label class="control-label">website :</label> <input type="text" name="website" class="form-mold fm_sm" autocomplete="off" value="'+data.website+'" data-masker="AlphaNum:50:Y:Y" ><div data-help="livingPlace"></div> </div> </div>';
      W.U.JunctionAdd(W.A.page.AppId,'sex',function(){
               W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
        },{name:"sex",values:[0,1],valuesname:["Male","Female"],Selected:data.sex,Class:''});

          ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="basicbuyer">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

function formLogic () {
  var rv = ['livingPlace','sex:0', 'website','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=4, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      


   
       return {heading:'Basic Information',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic,
       panalClass:"bs-1  ",
       panalID:panalID
       }
   },
   basicstore:function(x){
          var data=x.data;var panalID=this.panalID;
      
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';




   ch+='<div class="block m_b5"> <span class="span "><strong class="fw-b tt-c">Joined :</strong></span> <span class="span ">'+data.memberSince+'</span> </div>';
    ch+='<div class="block m_b5"> <span class="span "><strong class="fw-b tt-c">website :</strong></span> <span class="span ">'+data.website+'</span> </div>';

  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
        
               var ch='<div class="block _bdy bg_0"> ';



  ch+='<div class="block m_b5 "> <div class="form-piece fs11"> <label class="control-label">website :</label> <input type="text" name="website" class="form-mold fm_sm" autocomplete="off" value="'+data.website+'" data-masker="AlphaNum:50:Y:Y" ><div data-help="website"></div> </div> </div>';
  

   ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="basicstore">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

var formLogic =function() {
  var rv = ['website','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=2, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      


   
       return {heading:'Basic Information',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic
       }  
   },
   storeaddress:function(x){
                    var data=x.data;var panalID=x.panalID;
      
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';

  ch+='<div class="block"  >'
  +W.T.Address(data)
  
'</div>';


 

  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
        
               var ch='<div class="block _bdy bg_0"> ';


    var datalocation={Task:0,
    Data:{

    pager:'mainpage',
    backblock:'StoreaddressPage',
    main:{address:data.address,
    landmark:data.landmark,
    phone:data.phone},
    other:{address:'asdsadas',
    landmark:'',
    phone:''},
    town:data.town,
    city:data.city,
    state:data.state,
    country:data.country
    }
    };

ch+=W.U.location.set(datalocation);
  
  

   ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="'+panalID+'"><input type="hidden" name ="address_id" value="'+data.address_id+'">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

var formLogic =function() {
     var   f_value = W.F.walk_way_all(['address_id','address','phone','country','state','citybystate','infoID'], this.formname),
       error=7, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
 W.U.extend(f_value,W.F.walk_way_all(['landmark','townbycity'], this.formname));
  



 
 if(f_value.townbycity!=''){
   var li_data= W.U.intentdata.get(f_value.townbycity);
      f_value.townbycity=li_data.id;
 }

 if(f_value.citybystate!=''){
   var li_data= W.U.intentdata.get(f_value.citybystate);
      f_value.citybystate=li_data.id;
 }
 if(f_value.state!=''){
   var li_data= W.U.intentdata.get(f_value.state);
   f_value.state=li_data.id;
 }
 if(f_value.country!=''){
   var li_data= W.U.intentdata.get(f_value.country);
  f_value.country=li_data.id;
 }



      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  

      return ret;
}     


   
       return {heading:'Store Address',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic
       }  
   },
   aboutstore:function(x){
                        var data=x.data;var panalID=x.panalID;
      
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';

     ch+='<div class="block  m_b5 t pt"> <p>'+data.about_store+'</p> </div>';


 

  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
        
               var ch='<div class="block _bdy bg_0"> ';

           

  ch+='<div class="form-piece"> <label class="control-label">about_store <i >*</i></label> <textarea name="about_store" class="form-mold nochange" autocomplete="off" placeholder="About Store" data-masker="AlphaNum:250:Y:Y"  >'+data.about_store+'</textarea> <div data-help="about_store"></div></div>';
  

   ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="'+panalID+'">';

  
  

 
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

var formLogic =function() {
  var rv = ['about_store','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=2, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      


   
       return {heading:'About Store',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic
       }  
   }   ,
   aboutbuyer:function(x){
         var data=x.data;var panalID=x.panalID;
   
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';


    ch+='<div class="block  m_b5 t pt"> <p>'+data.about+'</p> </div>';

 

  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
        
               var ch='<div class="block _bdy bg_0"> ';


    ch+='<div class="block m_b5 "> <div class="form-piece fs11"> <label class="control-label">About :</label> <textarea type="text" name="about" class="form-mold fm_sm nochange" autocomplete="off"  data-masker="AlphaNum:250:Y:Y" >'+data.about+'</textarea><div data-help="about"></div> </div> </div>';
  
  

   ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="'+panalID+'">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

function formLogic() {  
  var rv = ['about','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=2, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      



       return {heading:'About ',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic,
       panalClass:"bs-1  ",
       panalID:panalID
       }  
   }   ,
 
   Storepolicy:function(x){
                        var data=x.data;var panalID=x.panalID;
      
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';

    ch+='<div class="block  m_b5 t pt"> <p>'+data.store_policy+'</p></span> </div>';

  ch+='<div class="block m_b5"> <span class="span "><strong class="fw-b tt-c"><span>text_402</span> :</strong></span> <span class="span ">'+((data.return_policy==0)?'return  accepted':'return not accepted')+'</span> </div>';


 

  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
        
               var ch='<div class="block _bdy bg_0"> ';
   ch+='<div class="form-piece"> <label class="control-label">policy_store <i >*</i></label> <textarea name="store_policy" class="form-mold" autocomplete="off" placeholder="Store Policy" data-masker="AlphaNum:250:Y:Y" >'+data.store_policy+'</textarea> <div data-help="about_store">help_16</div></div>';

       var Jid=     W.U.J(function(){
               W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
        },{name:"return_policy",values:[0,1],valuesname:["Yes","No"],Selected:data.return_policy,Class:''});


 ch+='<div class="form-piece"> <label class="control-label">return policy</label><div class="block" ><div class="block _bdy" >help_15</div><div class="block" data-junction="'+Jid+'">  </div> </div><div data-help="return_policy"></div></div>';


 


  
  

    ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="'+panalID+'">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

var formLogic =function() {
  var rv = ['store_policy','return_policy:0','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=3, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      


   
       return {heading:'Store Policy',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic
       }  
   }   ,
   price_range:function(x){
       
                   var data=x.data;var panalID=x.panalID;
      
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';

  ch+='<div class="block m_b5"> <span class="block _bdy" style="border:0; color:#f6931f; font-weight:bold;">₹ '+data.min+' - ₹ '+data.max+'</span> </div>';




 

  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
        
               var ch='<div class="block _bdy bg_0"> ';



  ch+='<div class="block form-piece"><div class="input-group"><span class="input-group-addon" >text_399</span> <span class="input-group-addon" >Rs.</span> <input type="number" name="minimum_price" class="form-mold" placeholder="" value="'+data.min+'" ></div></div>';

  ch+='<div class="block form-piece"><div class="input-group"><span class="input-group-addon" >text_400</span> <span class="input-group-addon" >Rs.</span> <input type="number" name="maximum_price" class="form-mold" placeholder="" value="'+data.max+'" ></div></div>';
 


  
  

    ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="'+panalID+'">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

var formLogic =function() {
  var rv = ['minimum_price','maximum_price','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=3, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      


   
       return {heading:'text_398',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic
       }  


   },

   minimum_order:function(x){
                      var data=x.data;var panalID=x.panalID;
      
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';

  ch+='<div class="block m_b5"> <span class="block _bdy" style="border:0; color:#f6931f; font-weight:bold;">₹ '+data.minimum_order+' </span> </div>';




 

  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">text_153</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
        
               var ch='<div class="block _bdy bg_0"> ';



  ch+='<div class="block form-piece"><div class="input-group"><span class="input-group-addon" >Rs.</span> <input type="number" name="minimum_order" class="form-mold" placeholder="" value="'+data.minimum_order+'" ></div></div>';


 


  
  

    ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="'+panalID+'">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <a href="javascript:void(0);" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" class="btn btn-default btn-xs">text_63</a> </div><div class=" li ma-l-8"> <a href="javascript:void(0);"  type="submit" class="btn btn-primary btn-xs">text_135</a> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

var formLogic =function() {
  var rv = ['minimum_order','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=2, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      


   
       return {heading:'text_412',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic
       }    
   }

   };


function spreadsTabPage(block){

      var Jid=W.U.J(function(){
  W.U.Spread.init(this.Node);  
   },block);

     return  '<div data-junction="'+Jid+'"></div>';   
}

function TabPage(block){
  
 
   var Jid=W.U.J(function(){
        var objectdata=this.data.objectdata;  var AppId=W.A.page.AppId;
 var ifo={tab:objectdata.tab};

 ifo.eid= W.A[AppId].AppView.EntityStripdata.eid; 
       if(W.I.AppId=='checkins'){
       ifo.eid=W.I.checkinstoreId;     
       }

    
     var  PagingData=W.U.ProfieTabViewer.PagingData;
      PagingData.TranseData={ifo:ifo,pgd:1};
     
if(objectdata.tab=='all_categories'||objectdata.tab=='all_products'){
    PagingData.showsearch=true;
}else{
    PagingData.showsearch=false;
}


    PagingData.initent='ProfieTab:'+objectdata.tab ;
       PagingData.Node=  this.Node;
        W.U.paging.init(PagingData);
   },block);
   
    return  '<div data-junction="'+Jid+'"></div>';  
}




function Layout(){


  var BlockList=[];
  BlockList.push({name:"demo",htmlStr: ''});
  /*
BlockList.push({name:"spreadsTabPage",htmlStr: spreadsTabPage,objectdata:{tab:'spreads'}});
BlockList.push({name:"favoritersTabPage",htmlStr: TabPage,objectdata:{tab:'favoriters'}});
BlockList.push({name:"friendsTabPage",htmlStr: TabPage,objectdata:{tab:'friends'}});
BlockList.push({name:"followersTabPage",htmlStr: TabPage,objectdata:{tab:'followers'}});
BlockList.push({name:"followingsTabPage",htmlStr: TabPage,objectdata:{tab:'followings'}});
BlockList.push({name:"favoritestoresTabPage",htmlStr: TabPage,objectdata:{tab:'favoritestores'}});
BlockList.push({name:"info0TabPage",htmlStr: TabPage,objectdata:{tab:'info0'}});
BlockList.push({name:"info1TabPage",htmlStr: TabPage,objectdata:{tab:'info1'}});
BlockList.push({name:"storeTabPage",htmlStr: TabPage,objectdata:{tab:'store'}});

*/

var setting ={
    name:'profileTabPlatform',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};

    var ch='<div class="block">';   
 switch(W.I.initType){
    case 0:
    case 1:
  case 2:
 ch+=W.T.Pager(setting);
    break;
  
    case 3:
var one='',two='';





two= W.T.Pager(setting);

 ch+=W.T.ColumnWrapXXX([one,two],['w-x-6','w-x-12 ma-l-5']); 
    break;
     

 }
   




  

 

      ch+='</div>';

    return ch;
   }

   //--------


    var S={
    Layout:Layout,
    t0:function(x){
         var ch = ''; 
            for(var q in x){
               ch += S.t1(x[q]);   
            }
         
    
            return ch;
    },
    t00: function (x) {
     var ch = ''; 
            for(var q in x){
               ch += S.t1(x[q]);   
            }
         
    
            return ch;

        },
    t1: function (x) {
        
       
    
            return W.T.C.C2_EntityCard(x)

        },
    store:function(x){
       var ch='';



  if(W.U.count( x)>0){
     for(var q in x){
      ch+=S.storeCard(x[q]);   
       }
    }else{
        ch= W.T.RNF_banner('text_293');
    }       
       return ch; 
    },
    storeCard:function(cdata){
         var URL=W.U.URL;

 var TranseData={
          
                ifo: { Afiatr: {}, Cfiatr: {}, Mfiatr: {},Sort:'',cid: cdata.cid},
                 name:'categoryListing'
            };

var Template= function(x){
     var ch = '';
      ch+='<div class="block  bg_0 bs-1" style="height: 350px;" >'+W.T.C.C2_Prductcard(x)+'</div>'; 
 return ch; 
}
   var autoUpdatelistData={
          
               name:'categoryListing',
               Template:Template,
               Pagingblock:function(){ return '<div class="block _bdy m_b5 m_t10"><div class="block " style="height: 250px;" ></div><a href="javascript:void(0);" class="btn   btn-block" data-paging="paging"  >Load More</a></div>';}
            };
  var setting={
      autoUpdatelistData:autoUpdatelistData,
      TranseData:TranseData,
      type:'autoupdate_list',
       name:'Whirlgig_category_'+cdata.cid,
       itemWidth:100,
       itemResponsive : false,
       control : true,
       pagination : false,
 controlTemplatebtn : ['<a class="left slider-control-btn " href="javascript:void(0);" role="button" > <span  class="icon-prev" aria-hidden="true">'+W.T.SVG('backarrow',16,'#fff')+'</span>  </a>', '<a class="right slider-control-btn" href="javascript:void(0);" role="button" > <span class="icon-next"  aria-hidden="true">'+W.T.SVG('nextarrow',16,'#fff')+'</span>  </a>'],
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };



var Jid=W.U.J(function(){    W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();  },setting);


       var ch='<div class="block  m_b10 "><div class="block bs-1"><div class="block _bdy bg_7"><a class="block " href="'+URL('')+cdata.slug+'"> <span class="fw-b">'+cdata.cN+'</span> </a></div><div class="block bg_0"><div data-junction="'+Jid+'"></div></div></div></div>';
       return ch;  
    },
    productCard:function(x){
         var URL=W.U.URL;
         var t=0;
         var sliderId='sliderId'+t++;
         var Sliderwidth=function(){
       var w=$('#page').find('.main_pane ').width();

if(W.I.wf=="web"){
             w=(W.I.AppId=='checkins')? 583:w;
           }
              return w;
           }
       var ch='';
   

       var items = [];

     var setting = {
         ulClass: '',
         tabLiClass: '',
         data: {
             name: sliderId,
             itemType: 'strip',
             activeIndex: 0
         }
     };
    
    for(var q in x){
        items[q] = '<div class="block " style="height: 300px;" >' +W.T.C.C2_Prductcard(x[q],{imagelink:false}) + '</div>';
     }


    ch+='<div class="block  " data-junction="productSlider_'+sliderId+'" ></div >';  


      var setting={
     items:items,
       name:'productSlider_'+sliderId,
      type:'list',
      itemWidth:150,
       itemResponsive : false,
 ContainerSize : [Sliderwidth,300],
       control : true,
       pagination : true,
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };

   W.U.JunctionAdd(W.A.page.AppId,'productSlider_'+sliderId, function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, setting);
       return ch;  
    },
    info:function(x){
        var ch='';
        if(x.length>0){
        for(var  q in x){

        switch(x[q].panalID){
          case 'basicbuyer':

       ch+=W.U.DataPanal(IFO_Panal.basicbuyer(x[q]));
          break;  
    case 'minimum_order':
        ch+=W.U.DataPanal(IFO_Panal.minimum_order(x[q]));
          break; 
          case 'basicstore':
        ch+=W.U.DataPanal(IFO_Panal.basicstore(x[q]));
          break; 
   case 'storeaddress':
        ch+=W.U.DataPanal(IFO_Panal.storeaddress(x[q]));
          break; 
   case 'aboutstore':
        ch+=W.U.DataPanal(IFO_Panal.aboutstore(x[q]));
          break; 
   case 'aboutbuyer':   
        ch+=W.U.DataPanal(IFO_Panal.aboutbuyer(x[q]));
          break; 
      case 'price_range':   
        ch+=W.U.DataPanal(IFO_Panal.price_range(x[q]));
          break; 
   case 'Storepolicy':
        ch+=W.U.DataPanal(IFO_Panal.Storepolicy(x[q]));
          break; 
        }    


        }
        }
        return ch;
    },
    TabPage:TabPage,
    spreadsTabPage:spreadsTabPage,
    feedback:function(x){
      var spreadData=x[0].data;
var  Jid=W.U.J(function(){  W.U.Spread.FeedBackSpreadInit(this.Node,this.data);  },x[0].data);


       
          

        return '<div class="block "  ><div class="block bs-1"  ><div class="block _Bdy fw-b bg_7 "  >help_44</div><div class="block  m_b10"  >'+S.rattingcard(spreadData.spread[0].aoj.rf)+'</div><div class="block" data-junction="'+Jid+'" ></div></div></div>';

    },
    rattingcard:function(x){
     var ch='';
 ch='<div class="block  _bdy"><div class="block  bg_0 bs-0 _bdy ">';
 var r=x.Total;
        var Total_rating = r['5star'] + r['4star'] + r['3star'] + r['2star'] + r['1star'];
        var Total_rating_wet = (r['5star'] * 5) + (r['4star'] * 4) + (r['3star'] * 3) + (r['2star'] * 2) + (r['1star'] * 1);
        var Avg_rating = W.U.positive((Total_rating_wet / Total_rating).toFixed(1));

     ch += '<div class="block m0_auto" style="max-width: 320px;" >';
        ch += '<div class=" w4 col4"> <div class="block rating-pot m_b10"> <div class="bigstar m0_auto al-c" style="padding: 20px 0;">' + Avg_rating + '</div></div><div class="block "> <div class="fs11 al-c">' + Total_rating + ' total</div></div></div>';

        ch += ' <div class="w8 col8"> <div class="block _bdy"> <div class="ul block ">';

        for (var key in r) {
            if (r.hasOwnProperty(key)) {

                var percent = ((r[key] / Total_rating) * 100).toFixed(0);
                ch += '<div class="block li m_b5"> <div class="block w3 rating-pot"> <span class="di-ib po-re bstar-xs-one vl-m"> </span><span class="span vl-m">' + key + '</span> </div><div class="block w7 rating-bar"> <div class="progress"> <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + percent + '%;"> </div></div></div><div class="block w2 "> <div class="span vl_m">' + r[key] + '</div></div></div>';
            }
        }





        ch += '  </div></div></div>';
        ch += ' </div>';

        ch+='</div></div>';
     return ch;
 },
    c0:function(x){
           var ch = ''; 
           if(W.U.count(x)>0){
              for(var q in x){
              ch+=S.storeCard(x[q]);   
            }   
           }else{
                ch= W.T.RNF_banner();
           }
          
         
    
            return ch; 
        
         },

    p0:function(x){
         var ch = ''; 
   if(W.U.count(x)>0){
            for(var q in x){
              ch+='<div class="block  bg_0 bs-1 grid_gap" style="height: 350px;" >'+W.T.C.C2_Prductcard(x[q])+'</div>';   
            }
          }else{
                ch= W.T.RNF_banner();
           }  
    
            return ch;  
        
         }

    };



 W.T.ProfieTabViewer=S;
})(wowrol);