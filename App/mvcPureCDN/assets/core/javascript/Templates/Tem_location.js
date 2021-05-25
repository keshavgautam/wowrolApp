;(function(W){
   "use strict";
//-------
var addLocationformbody={
    city:function(x){
var Data=x.Data,block=x.block;
       var URL =W.U.URL;
 var triggerdata=block.triggerdata;
      
  
     var ch='<div class="block ">';
  ch+='<div class="block fw-b al-c">text_185</div>';
  ch+='<div class="block "><div data-help="addlocation"></div></div>';
 ch+='<div class="form-piece"> <label class="control-label">text_183<i >*</i></label> <input type="text" name="city" class="form-mold" autocomplete="off" placeholder="City" value="" ><div data-help="city">text_186</div></div>';
 ch+='<div class="form-piece"> <label class="control-label">text_188 <i >*</i></label> <input type="text" name="postalCode" class="form-mold" autocomplete="off" placeholder="postalCode" value="" ><div data-help="city">text_187</div></div>';
    var datalocation={Task:3,
    Data:{
     city: Data.city,
     state: Data.state,
     country: Data.country,
     pager:triggerdata[4],
     backblock:'addLocation'


    }
    };
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,datalocation);


ch+='<div class="block" data-location="'+dataKey+'" ></div>';
ch+='<div class="block"  ><input type="hidden" name="locationtype" value="0" ></div>';
  ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> </div><div class=" li ma-l-8"> <button type="submit" class="btn btn-primary btn-xs">Save</button> </div></div></div></div>';
      ch+='</div>';
       
        return ch;
            },
    town:function(x){
    var Data=x.Data,block=x.block;
       var URL =W.U.URL;
 var triggerdata=block.triggerdata;
   
      
     var ch='<div class="block ">';
  ch+='<div class="block fw-b al-c">Add your Town to wowrol</div>';
  ch+='<div class="block "><div data-help="addlocation"></div></div>';
 ch+='<div class="form-piece"> <label class="control-label">Town <i >*</i></label> <input type="text" name="town" class="form-mold" autocomplete="off" placeholder="Town" value="" ><div data-help="town">Write your town name</div></div>';
  ch+='<div class="form-piece"> <label class="control-label">PostalCode <i >*</i></label> <input type="text" name="postalCode" class="form-mold" autocomplete="off" placeholder="postalCode" value="" ><div data-help="city">Write your town postal code. For example, 94043.</div></div>';
    var datalocation={Task:4,
    Data:{
    city: Data.city,
     state: Data.state,
     country: Data.country,
     pager:triggerdata[4],
     backblock:'addLocation' 
    }
    };
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,datalocation);


ch+='<div class="block" data-location="'+dataKey+'" ></div>';
ch+='<div class="block"  ><input type="hidden" name="locationtype" value="1" ></div>';
  ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> </div><div class=" li ma-l-8"> <button type="submit" class="btn btn-primary btn-xs">Save</button> </div></div></div></div>';
      ch+='</div>';
       
        return ch;
            }
}
function addLocationformData(x,type,block){
   
 var frombody=addLocationformbody.town; 
 if(type==0){
  frombody=addLocationformbody.city;    
 }
var formLogic =function() {
         var data = W.F.walk_way_all( ['locationtype'], this.formname);
         data.locationtype= W.U.intval( data.locationtype);
     
if(data.locationtype==0){
        var f_value = W.F.walk_way_all( ['city','postalCode','state','country'], this.formname),
      error=4, alert_mes = [];

}
if(data.locationtype==1){
        var f_value = W.F.walk_way_all( ['town','postalCode','citybystate','state','country'], this.formname),
      error=5, alert_mes = [];
 if(f_value.citybystate!=''){
   var li_data= W.U.intentdata.get(f_value.citybystate);
      f_value.city=li_data.id;
 }
delete(f_value['citybystate']);
}
 if(f_value.state!=''){
   var li_data= W.U.intentdata.get(f_value.state);
   f_value.state=li_data.id;
 }
 if(f_value.country!=''){
   var li_data= W.U.intentdata.get(f_value.country);
  f_value.country=li_data.id;
 }

      
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
    alert_mes=glueErrors.message;
   
    f_value.locationtype=data.locationtype;
     W.U.console( glueErrors); 
      var AlertError = W.T.AlertError({message:alert_mes});
 

      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    ;
var onprogress=function(){ W.F.ButtonState(this.form.formbtnMain,{LoadingText:'Saving',state:'loading'});
}
var onsuccess=function(){
    var triggerdata=this.form.formData.block.triggerdata;
    W.F.ButtonState(this.form.formbtnMain,{text:'Save',state:'loadingoff'});

    W.F.Toast({msg:'Location successfully added',theme:'',duration:2000});
    W.U.Pager.togglePage(triggerdata[4],triggerdata[5]);


     }
var  onerror=function(){
    W.F.ButtonState(this.form.formbtnMain,{text:'Save',state:'loadingoff'});
    var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 

 }


    return {
            option:{sendwith:'ajax'},
            formData:{Data:x,block:block},
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         }
}




   //////--------
 var addLocation={
name:'addLocation',
htmlStr:function(block){
    var objectdata=block.objectdata;
    var triggerdata=block.triggerdata;
 
    var header =  W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="'+triggerdata[4]+':'+triggerdata[5]+'"   >'+W.T.SVG('left',24,'#f1f5fc')+' </a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><span class="truncate title" >text_182</span> </a>',
    RightLink:'<div class="di-td vl-t"><a href="javascript:void(0);" class="block header-link-btn active" data-btn="City"  >text_183 </a></div><div class="di-td vl-t"><a href="javascript:void(0);"  class="block header-link-btn" data-btn="Town" >text_184 </a></div>'
    });
   
     var ch='';
    ch += '<div class="block _Bdy bg_0 bs-1"><form name="addlocation"  data-block="LocationFormConetnet" onsubmit="return false"><form></div>';



     //W.U.form.bind({Node:W.U.id('selectlocationcontent'),Value:addLocationTown({})})();    


     addLocation.onRander.push(addLocation.onbeforeinsert);

            return (W.I.wf=="mob")?W.T.wrap(header, ch):W.T.wrapForModal(header, ch);

},
onbeforeinsert:function(){
    var mainBlock=this.mainblock;
    var block=this.block;

     var LocationFormConetnet =W.U.getbyblockattr('[data-block="LocationFormConetnet"]',mainBlock[0]);
     var data= W.U.intentdata.get('location.0');
     W.U.console(data) ;W.U.console(LocationFormConetnet);
  W.U.attrclick('[data-btn]',mainBlock[0], function(){
      var tab=this['data-btn'];
      switch(tab){
          case 'City':
  data= W.U.intentdata.get('location.0');
          W.U.form.bind({Node: LocationFormConetnet,Value:addLocationformData(data,0,block)})();  
          break;
          case 'Town':
   data= W.U.intentdata.get('location.0');
          W.U.form.bind({Node: LocationFormConetnet,Value:addLocationformData(data,1,block)})();  
          break;
      }
  });
    W.U.form.bind({Node: LocationFormConetnet,Value:addLocationformData(data,0,block)})();  
},
onRander:[]
 };


   //-----------------------
   function TemplateTask0(Node,x){
            var ch='<div class="block ">';
         ch+='<div  data-block="mainaddress" ></div>';
         ch+='<div  data-block="phone" ></div>';
     ch+='<div  data-block="town" ></div>';
 ch+='<div  class="block " ><div class="w6 col6" data-block="city" ></div><div class="w6 col6"  data-block="state" ></div></div>';
    ch+='<div  data-block="addlocationbutton" ></div>';
       ch+='<div  data-block="country" ></div>';

          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
     mainaddress:W.U.getbyblockattr('[data-block="mainaddress"]',mainBlock[0]),
   town:W.U.getbyblockattr('[data-block="town"]',mainBlock[0]),
     city:W.U.getbyblockattr('[data-block="city"]',mainBlock[0]),
     addlocationbutton:W.U.getbyblockattr('[data-block="addlocationbutton"]',mainBlock[0]),
     state:W.U.getbyblockattr('[data-block="state"]',mainBlock[0]),
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0]),
     phone:W.U.getbyblockattr('[data-block="phone"]',mainBlock[0])           
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }
   function TemplateTask1(Node,x){
            var ch='<div class="block ">';
         ch+='<div  data-block="mainaddress" ></div>';
       ch+='<div  data-block="otheraddress" ></div>';
      ch+='<div  data-block="phone" ></div>';
  ch+='<div  data-block="town" ></div>';
 ch+='<div  class="block " ><div class="w6 col6" data-block="city" ></div><div class="w6 col6"  data-block="state" ></div></div>';
  ch+='<div  data-block="addlocationbutton" ></div>';
       ch+='<div  data-block="country" ></div>';

          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
     mainaddress:W.U.getbyblockattr('[data-block="mainaddress"]',mainBlock[0]),
     otheraddress:W.U.getbyblockattr('[data-block="otheraddress"]',mainBlock[0]),
      town:W.U.getbyblockattr('[data-block="town"]',mainBlock[0]),
     city:W.U.getbyblockattr('[data-block="city"]',mainBlock[0]),
     state:W.U.getbyblockattr('[data-block="state"]',mainBlock[0]),
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0]),
     addlocationbutton:W.U.getbyblockattr('[data-block="addlocationbutton"]',mainBlock[0]),
     phone:W.U.getbyblockattr('[data-block="phone"]',mainBlock[0])           
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }

   function TemplateTask3(Node,x){
            var ch='<div class="block ">';
     
 ch+='<div   data-block="state" ></div>';
 ch+='<div  data-block="country" ></div>';
  
          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
     state:W.U.getbyblockattr('[data-block="state"]',mainBlock[0]),
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0])       
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }
   function TemplateTask4(Node,x){
            var ch='<div class="block ">';
     
 ch+='<div  class="block " ><div class="w6 col6" data-block="city" ></div><div class="w6 col6"  data-block="state" ></div></div>';
 ch+='<div  data-block="country" ></div>';
  
          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
  city:W.U.getbyblockattr('[data-block="city"]',mainBlock[0]),
     state:W.U.getbyblockattr('[data-block="state"]',mainBlock[0]),
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0])       
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }

   function TemplateTask5(Node,x){
            var ch='<div  class="block " ><div  class="block "data-block="statelocationbycountry"  ></div></div>';
     


   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
   statelocationbycountry:W.U.getbyblockattr('[data-block="statelocationbycountry"]',mainBlock[0])   
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }
   function TemplateTask6(Node,x){
            var ch='<div class="block ">';
         ch+='<div  data-block="town" ></div>'; 
 ch+='<div  class="block " data-block="locallocationbycountry" ></div>';
     ch+='<div  data-block="addlocationbutton" ></div>';
  
          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={

    locallocationbycountry:W.U.getbyblockattr('[data-block="locallocationbycountry"]',mainBlock[0]),
     addlocationbutton:W.U.getbyblockattr('[data-block="addlocationbutton"]',mainBlock[0])  
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }
   function TemplateTask7(Node,x){
             var ch='<div class="block ">';
     ch+='<div  data-block="town" ></div>';
 ch+='<div  class="block " ><div class="w6 col6" data-block="city" ></div><div class="w6 col6"  data-block="state" ></div></div>';
    ch+='<div  data-block="addlocationbutton" ></div>';
       ch+='<div  data-block="country" ></div>';

          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
   town:W.U.getbyblockattr('[data-block="town"]',mainBlock[0]),
     city:W.U.getbyblockattr('[data-block="city"]',mainBlock[0]),
     addlocationbutton:W.U.getbyblockattr('[data-block="addlocationbutton"]',mainBlock[0]),
     state:W.U.getbyblockattr('[data-block="state"]',mainBlock[0]),
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0])       
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }

   function TemplateTask8(Node,x){
             var ch='<div class="block "><div  data-block="postalCodebycountry" ></div><div  data-block="country" ></div></div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
postalCodebycountry:W.U.getbyblockattr('[data-block="postalCodebycountry"]',mainBlock[0]),      
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0])       
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }
   function TemplateTask9(Node,x){
             var ch='<div class="block "><div  data-block="multypostalCodebycountry" ></div><div  data-block="country" ></div></div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
multypostalCodebycountry:W.U.getbyblockattr('[data-block="multypostalCodebycountry"]',mainBlock[0]),      
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0])   
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }

   function TemplateTask10(Node,x){
             var ch='<div class="block ">';
 ch+='<div  data-block="town" ></div>';
 ch+='<div class="block" data-block="city" ></div><div class="block"  data-block="state" ></div>';
    ch+='<div  data-block="addlocationbutton" ></div>';
    ch+='<div  data-block="country" ></div>';

          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
   town:W.U.getbyblockattr('[data-block="town"]',mainBlock[0]),
     city:W.U.getbyblockattr('[data-block="city"]',mainBlock[0]),
     addlocationbutton:W.U.getbyblockattr('[data-block="addlocationbutton"]',mainBlock[0]),
     state:W.U.getbyblockattr('[data-block="state"]',mainBlock[0]),
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0])       
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;
   }
   //-------------------
   var fields={
mainaddress:function(x){
 
    var ch='<div><div class="form-piece"> <label class="control-label">address <i >*</i></label> <textarea name="address" class="form-mold  m_b5 textarea nochange" placeholder="Address "  autocomplete="off"rows="3"  data-masker="AlphaNum:250:Y:Y"  >'+x.main.address+'</textarea> <div data-help="address"></div></div>';
    ch+='<div class="form-piece"> <label class="control-label">landmark <i >*</i></label> <input type="text" name="landmark" class="form-mold" autocomplete="off" placeholder="landmark" value="'+x.main.landmark+'" data-masker="AlphaNum:100:Y:Y"  ><div data-help="landmark"></div></div></div>';
    return ch;

}     , 
otheraddress:function(x){
    var ch='<div class="block bg_6 _bdy "><div class="form-piece"> <label class="control-label"><span>other_address</span><i >&nbsp;&nbsp;</i>  <i >  optional</i></label> <textarea name="otheraddress" class="form-mold  m_b5 textarea nochange" placeholder="Address "  autocomplete="off"rows="3"  >'+x.other.address+'</textarea> <div data-help="address"></div></div>';
    ch+='<div class="form-piece"> <label class="control-label"> <span>other_address_landmark</span><i >&nbsp;&nbsp;</i> <i >  optional</i></label> <input type="text" name="otherlandmark" class="form-mold" autocomplete="off" placeholder="landmark" value="'+x.other.landmark+'" ><div data-help="landmark"></div></div></div>';
    return ch;

}     ,
town:function(x){
   

  var ch='';      
           var selected={};    selected[x.Data.town.id]=x.Data.town;  
          var ifo={id:x.Data.city.id};      
  var dataselectbox={
                                                 name:'townbycity',
                                                           fireAfter:2,
                                                           pager:x.Data.pager,
                                                           backblock:x.Data.backblock,
                                                          TranseData:{ifo:ifo},
                                                          selected:selected,
                                                          initSearchText:'',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                             onselectCallback:function(){
                                                         
                                               var id=this.data.id;      var name=this.data.name;
                                                                x.ontownSelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                               x.ontownSelect(0,'');
                                                      }
                                                                   };
if(x.Data.city.id!=0){

   
ch+='<div class="block form-piece bs-1"> <label class="control-label _bdy block">text_395 <i >optional</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';
}
   
return ch;
},
 
city:function(x){


  var ch='';      
           var selected={};    selected[x.Data.city.id]=x.Data.city;  
          var ifo={id:x.Data.state.id};      
  var dataselectbox={
                                                name:'citybystate',
                                                           fireAfter:2,
                                                         pager:x.Data.pager,
                                                           backblock:x.Data.backblock,
                                                          TranseData:{ifo:ifo},
                                                          selected:selected,
                                                          initSearchText:'',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                             onselectCallback:function(){
                                                            
                                               var id=this.data.id;      var name=this.data.name;
                                                                x.oncitySelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                               x.oncitySelect(0,'');
                                                      }
                                                                   };


if(x.Data.state.id!=0){

ch+='<div class="block form-piece bs-1"> <label class="control-label _bdy block">city  <i >*</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';
}
   
return ch;
},

state:function(x){
  var ch='';      
           var selected={};    selected[x.Data.state.id]=x.Data.state;  
          var ifo={id:x.Data.country.id};      
  var dataselectbox={
                                                 name:'state',
                                                           fireAfter:2,
                                                            pager:x.Data.pager,
                                                           backblock:x.Data.backblock,
                                                          TranseData:{ifo:ifo},
                                                          selected:selected,
                                                          initSearchText:'000',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                             onselectCallback:function(){
                                                        
                                               var id=this.data.id;      var name=this.data.name;
                                                               x.onSateSelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                              x.onSateSelect(0,'');
                                                      }
                                                                   };



if(x.Data.country.id!=0){
   
ch+='<div class="block form-piece bs-1"> <label class="control-label _bdy block">state  <i >*</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';
}
 



return ch;
},
country:function(x){
    var ch='';       var  token='',junctionname=x.name+'country';
         var selected={};    selected[x.Data.country.id]=x.Data.country;   
     
  var dataselectbox={
                                                           name:'country',
                                                           fireAfter:2,
                                                          pager:x.Data.pager,
                                                           backblock:x.Data.backblock,
                                                          selected:selected,
                                                          initSearchText:'india',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                           onselectCallback:function(){
                                                         
                                                       var id=this.data.id;      var name=this.data.name;
                                                               x.onCountrySelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                             x.onCountrySelect(0,'');
                                                      }
                                                                   };




ch+='<div class="block form-piece bs-1"> <label class="control-label _bdy block">country <i >*</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';

return ch;
},
phone:function(x){
     var ch=''; 
  ch+='<div class="form-piece"> <label class="control-label">phone <i>*</i></label> <input type="text" name="phone" class="form-mold " autocomplete="off" placeholder="Phone"  data-junction="checkPhone" value="'+x.Data.main.phone+'" > <div data-help="phone"></div></div>';
 W.U.JunctionAdd(W.A.page.AppId,'checkPhone',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'phone',option:{}} })();
        },{}); 

return ch;
},
addlocationbutton:function(x){
       
 W.U.intentdata.add('location.0',{
    city:x.Data.city,
    state:x.Data.state,
    country:x.Data.country 

                });
    return '<div class="block" ><div class="right "> <div class="form-piece "> <a href="javascript:void(0);" class="btn btn-xs btn-link "  data-pagerbtn="'+x.Data.pager+':addLocation:location:0:'+x.Data.pager+':'+x.Data.backblock+'" >add</a> <span>help_7</span></div></div></div>';
},
locallocationbycountry:function(x){

    
//-

  var ch='';      
           var selected={},hiddenselected={};   
           
  for( var q in  x.Selected.locallocation ){  
selected[x.Selected.locallocation[q].id]=x.Selected.locallocation[q];  

} 

  for( var q in  x.HiddenSelected.locallocation ){  
hiddenselected[x.HiddenSelected.locallocation[q].id]=x.HiddenSelected.locallocation[q];  

} 

          var ifo={id:x.Data.country.id};      
  var dataselectbox={
                                                 name:'locallocationbycountry',
                                                           fireAfter:2,
                                                           pager:x.Data.pager,

                                                          backblock:x.Data.backblock,
                                                          TranseData:{ifo:ifo},
                                                          selected:selected,
                                                          hiddenselected: hiddenselected,
                                                          initSearchText:'mostused',
                                                            type:1,
                                                            token:'chips',
                                                            placeholder:' search...',
                                                             onselectCallback:function(){
                                                        
                                               var id=this.data.id;      var name=this.data.name;
                                                           
 x.onlocallocationbycountrySelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                            
 x.onlocallocationbycountrySelect(0,'');
                                                      }
                                                                   };



if(x.Data.country.id!=0){
   
ch+='<div class="block form-piece bs-1"> <label class="control-label">location </label> '+W.U.selectbox.set(dataselectbox)+'</div>';
}
 



return ch;
},
statelocationbycountry:function(x){
  var ch='';      
         var selected={},hiddenselected={};  


 for( var q in  x.HiddenSelected.statelocationbycountry ){  
hiddenselected[x.HiddenSelected.statelocationbycountry[q].id]=x.HiddenSelected.statelocationbycountry[q];  

} 



          var ifo={id:x.Data.country.id};      
  var dataselectbox={
                                                 name:'state',
                                                           fireAfter:2,
                                                            pager:x.Data.pager,
                                                           backblock:x.Data.backblock,
                                                          TranseData:{ifo:ifo},
                                                          selected:selected,
                                                          hiddenselected:hiddenselected,
                                                          initSearchText:'000',
                                                            type:1,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                             onselectCallback:function(){
                                                        
                                               var id=this.data.id;      var name=this.data.name;
                                                               x.onSateSelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                              x.onSateSelect(0,'');
                                                      }
                                                                   };



if(x.Data.country.id!=0){
   
ch+='<div class="block form-piece bs-1"> <label class="control-label">state  <i >*</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';
}
 



return ch;
},
postalCodebycountry:function(x){
      var ch='';      
           var selected={};    selected[x.Data.postalCodebycountry.id]=x.Data.postalCodebycountry;  
          var ifo={id:x.Data.country.id};      
  var dataselectbox={
                                                 name:'postalCodebycountry',
                                                           fireAfter:2,
                                                            pager:x.Data.pager,
                                                           backblock:x.Data.backblock,
                                                          TranseData:{ifo:ifo},
                                                          selected:selected,
                                                          initSearchText:'',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                             onselectCallback:function(){
                                                        
                                               var id=this.data.id;      var name=this.data.name;
                                                               x.onpostalCodebycountrySelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                              x.onpostalCodebycountrySelect(0,'');
                                                      }
                                                                   };



if(x.Data.country.id!=0){
   
ch+='<div class="block form-piece bs-1"> <label class="control-label">Postal Code  <i >*</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';
}
 



return ch;



},
multypostalCodebycountry:function(x){
      var ch='';      
         var selected={},hiddenselected={};     
         
      
  for( var q in  x.Selected.multypostalCodebycountry ){  
     selected[x.Selected.multypostalCodebycountry[q].id]=x.Selected.multypostalCodebycountry[q];    

} 

  for( var q in  x.HiddenSelected.multypostalCodebycountry ){  
hiddenselected[x.HiddenSelected.multypostalCodebycountry[q].id]=x.HiddenSelected.multypostalCodebycountry[q];  

} 
          var ifo={id:x.Data.country.id};      
  var dataselectbox={
                                                 name:'postalCodebycountry',
                                                           fireAfter:2,
                                                            pager:x.Data.pager,
                                                           backblock:x.Data.backblock,
                                                          TranseData:{ifo:ifo},
                                                          selected:selected,
                                                          hiddenselected: hiddenselected,
                                                          initSearchText:'',
                                                            type:1,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                             onselectCallback:function(){
                                                        
                                               var id=this.data.id;      var name=this.data.name;
                                                               x.onmultypostalCodebycountrySelect(id,name);
                                                           },
                                                      onselectRemoveCallback:function(){
                                                              x.onmultypostalCodebycountrySelect(0,'');
                                                      }
                                                                   };



if(x.Data.country.id!=0){
   
ch+='<div class="block form-piece bs-1"> <label class="control-label">Postal Code  <i >*</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';
}
 



return ch;



}
   };




     W.T.location={
         fields:fields,
         TemplateTask0:TemplateTask0,
          TemplateTask1: TemplateTask1,
         TemplateTask3:TemplateTask3,
     TemplateTask4:TemplateTask4,
         TemplateTask5:TemplateTask5,
     TemplateTask6:TemplateTask6,
     TemplateTask7:TemplateTask7,
     TemplateTask8:TemplateTask8,
     TemplateTask9:TemplateTask9,
     TemplateTask10:TemplateTask10,
         addLocation:addLocation
         };


})(wowrol);