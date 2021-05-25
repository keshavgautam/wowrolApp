/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

     var forms={
setting_0:function(){
         var ch='';
    if (W.U.id('FWsubmit') != null) {
          $(W.U.id('FWtitle')).html(this.name+' setting');
          $(W.U.id('FWsubmit')).text('Update').show();

   var frombody=function(x){
      var ch='';  var URL =W.U.URL;
 //     console.log(x);
        
    var ch='<div class="block bs-0 bg_0 _bdy m_b10">';
     


   ch+='<div class="block m30_0"><div data-help="store_setting_0"></div>';
   
   ch+='<div class="form-piece"> <label class="control-label">Store Name <i >*</i></label> <input type="text" name="store_name" class="form-mold" autocomplete="off" placeholder="Store Name" value="'+x.store_name+'" > <div data-help="store_name"></div></div>';
   

     ch+='<div class="form-piece"> <label class="control-label">Store URL Address <i >*</i></label> <div class="form-inline"> <div class="input-group "> <div class="input-group-addon">http://wowrol.com/'+x.slug+'</div><p></p> </div></div><div data-help="store_url_address"><span class="block _bdy fg_4 fs-italic fs11">Store URL Address not editble</span></div></div>';
              var token='';
              var suggestion={
                                                            name:'storecategory',
                                                            fireAfter:4,
                                                            type:'1',
                                                            token:'chips',
                                                            placeholder:'storecategory'
                                                                   };
 for(var q in x.StoreCategory){
        token += '<div class="li"><div class="token"> <span>' + x.StoreCategory[q] + '</span> <span class="sclose s_tclose"></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.StoreCategory[q]}) + '\' > </div></div>';
  }

   ch+='<div class="form-piece"> <label class="control-label">What Will You Sell?</label> <div class="form-token block" data-junction="suggestion0"> <div class="block bd"><div class="block ul ul-menu">'+token+'<div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="Sell Tag"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div>';
      W.U.JunctionAdd(W.A.page.AppId,'suggestion0',function(){
    W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion);  



   ch+='<div class="form-piece"> <label class="control-label">Address <i >*</i></label> <textarea name="address" class="form-mold  m_b5 textarea" placeholder="Address "  autocomplete="off"rows="3"  >'+x.address+'</textarea> <div data-help="address"></div></div>';
       var token='';     var suggestion={   name:'pincode',
                                            fireAfter:6,
                                            type:2,
                                            token:'chips',
                                            placeholder:'pincode'
                                       }; 
if(x.location_id!=''){  token += '<div class="li"><div class="token"> <span>' + x.location_name + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.location_id})  + '\' > </div></div>';
token += '<div class="li hidden"><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>';
}else{
   token += '<div class="li "><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>'; 
}  


   ch+='<div class="form-piece"> <label class="control-label">Pincode <i >*</i></label> <div class="form-token block " data-junction="suggestion1" ><div class="block bd">  <div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in "> </div></div></div><div data-help="pincode"></div></div>';
   
  W.U.JunctionAdd(W.A.page.AppId,'suggestion1',function(){
   W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion); 


   ch+='<div class="form-piece"> <label class="control-label">Phone <i>*</i></label> <input type="text" name="phone" class="form-mold " autocomplete="off" placeholder="Phone"  data-junction="checkPhone" value="'+x.phone+'" > <div data-help="phone"></div></div><div class="form-piece"> <div data-help="terms"> <div class="fs11">By clicking get start, you agree to our <a href="'+URL('terms')+'" class="fs11" target="_blank" tabindex="">Terms </a> . </div></div></div>';
 W.U.JunctionAdd(W.A.page.AppId,'checkPhone',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'phone',option:{}} })();
        },{}); 
   ch+=' </div>';

ch+='</div>';
       return ch;
   

   }

  

var formLogic =function() {
     var rv =   ['store_name', 'address', 'pincode','phone'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=4, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
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


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
 

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
      console.log(this);
     var AlertSuccess = W.T.AlertSuccess({heading:'',message:'Saved.'});
  W.U.AddDom(this.form.formhelp,AlertSuccess,'html');
          W.F.alert(); 
    
      W.A.page.AppView.setting.setting_0=this.data.setting_0;
     //--hide event&& reset event
    hideEditForm('FW',this.data.setting_0,this.form.formname);
     }
var  onerror=function(){ W.U.madianLoading('hide');
      console.log(this);
var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

    var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:W.A.page.AppView.setting.setting_0,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:W.U.id('FWsubmit')
         };












    //---
     var ch ='<form name="store_setting_0"  data-junction="store_setting_0" onsubmit="return false"> </form>';
   
 W.U.JunctionAdd(W.A.page.AppId,'store_setting_0',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       
  }
     return  ch;

} ,


setting_5:function(){
             var ch='';
    if (W.U.id('FWsubmit') != null) {
         W.U.SetIdText('FWtitle',this.name+' setting','html');
          $(W.U.id('FWsubmit')).hide();

   var frombody=function(x){
      var ch='';  var URL =W.U.URL;
 //     console.log(x);
        
        var ch='<div class="block bs-0 bg_0 _bdy m_b10">';
  ch+='<div class="block al-c "> <p class="fs12">Change Store Staff Hash. To  logout all  store staff members </p></div>';

  ch+='<div data-help="store_setting_5"></div>';
  
  ch+='<div class="block _bdy"><span class="fs12 fw-b">Current Hash </span><span>-</span><span class="fs14 fw-b fg_7"> '+x+'</span></div>';


      ch+='<div class="block _bdy"><button type="submit" class="btn btn-primary btn-lg btn-block"  >Change</button></div>';
     

    ch+='</div >';
     return ch;
     }

  

var formLogic =function() {
     var rv = ['storestaffhash'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=0, alert_mes = [];
        
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
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
      console.log(this);
     var AlertSuccess = W.T.AlertSuccess({heading:'',message:'Saved.'});
  W.U.AddDom(this.form.formhelp,AlertSuccess,'html');
          W.F.alert(); 
       W.A.page.AppView.setting.setting_5=this.data;
     //--hide event&& reset event
    hideEditForm('FW',this.data,this.form.formname);
     }
var  onerror=function(){ W.U.madianLoading('hide');
      console.log(this);
var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:W.A.page.AppView.setting.setting_5,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };












    //---
 var ch ='<form name="store_setting_5"  data-junction="store_setting_5" onsubmit="return false"> </form>';
   
 W.U.JunctionAdd(W.A.page.AppId,'store_setting_5',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       
  }
     return  ch;


} ,       
theme:function(){
    var ch='';
        W.U.SetIdText('FWtitle',this.name+' setting','html');
          $(W.U.id('FWsubmit')).show();
 var ch ='<div class="block" data-junction="store_theme"></div>';
   
 W.U.JunctionAdd(W.A.page.AppId,'store_theme',function(){
     
 W.U.ThemeEditer.bind({Node:this.Node,Value:this.data})();
  },{ChosenColor:W.A.page.AppView.setting.theme,submitbtn:W.U.id('FWsubmit')});
    return ch;

}
     };


     //hide edit form for all form submition
    function hideEditForm(name,saveddata,formname){
                              
 setTimeout(function(){

     

      var event = jQuery.Event("hide");
   $(W.U.id('block.' + name)).parent().triggerHandler(event);    

       //--
         console.log(saveddata);
   
                        var event = jQuery.Event("reset");
                        event.formData=saveddata;
             $(W.U.GetFORM(formname)).triggerHandler(event);  



 }, 2000);
                              
    }

  /**
        * Load this function create the table form different App id
        */
        function FromWrap() {
            var ch = '';

            ch += '<div class="block "  data-nodeid="FWblock" >Form not found</div>';

            var Wrap =W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="storesetting" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><p class="fw-b al-c"><i class="material-icons"> </i><span class="vl-sp" data-nodeid="FWtitle">Form Title</span></p></span>',
                done: '<div class="li b_gll"><a href="javascript:void(0);"  data-nodeid="FWsubmit"    ><span>Form Submit</span><i class="badge _gbtn"></i> </a></div>'
            }), ch);

            return Wrap;
        }


       /**
        * Load this function CreateForm default empty form
        */
        function CreateForm() {
          
            


            var mainform = 'Form not found <= CreateForm';
       if(forms.hasOwnProperty(this.formid)){
           mainform = forms[this.formid].bind(this)();
       }
            return mainform;


        }

   
   var Madian=function(x){
     

   

     // main nav
var ListData=[];
ListData.push({name:'Name & address',help:'Address of your store.',formid:'setting_0'});
ListData.push({name:'Store Staff Hash ',help:'Change store staff hash.',formid:'setting_5'});
ListData.push({name:'Currency & Weight unit',help:'Currency & Weight Unit are used to calculate such things as product price, shipping weight.',formid:'setting_1'});

ListData.push({name:'Theme',help:'Themes let you apply a consistent Look to Store.',formid:'theme'});


  var settingList='<div class="block"><nav class="block ul hover bg_0 bs-2dp "><div class="li b_gll b_grl _Bdy"><span class="fw-b">Settings:</span></div><span class="hide" data-openbtn="storesetting" data-btnid="FW">sdf</span>';
  for(var i=0;i<ListData.length;i++){
       settingList+='<div class="li _B-gray _bdy"><a class="block " href="javascript:void(0);"    data-junction="editsettingbtn'+ListData[i].formid+'"> <span class="vl-sp fw-b">'+ListData[i].name+'</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a><span class="di-in  fg_4 fs-italic fs11">'+ListData[i].help+'</span></div>'; 

    W.U.JunctionAdd(W.A.page.AppId, 'editsettingbtn'+ListData[i].formid, function () {
               var _thisdata=this.data;
                    this.Node.onclick = function () {
var newform=CreateForm.bind({ formid: _thisdata.formid,name:_thisdata.name })();
 W.U.AddDom(W.U.id('FWblock'),newform,'html');

   var event = jQuery.Event("show");
                event.id = 'FW';
       $(W.U.id('block.' + 'FW')).parent().triggerHandler(event);

                    }

                }, ListData[i]);


  }


  settingList+='</nav></div>';
 //-->>  


    return settingList;

   }
  
     
   
    

   
  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   


  

 } )(wowrol);