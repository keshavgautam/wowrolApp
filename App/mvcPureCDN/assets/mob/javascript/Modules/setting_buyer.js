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
     


   ch+='<div class="block m30_0"><div data-help="buyersetting_0"></div>';
   
   ch+=' <div class="form-piece"> <label class="control-label">Full Name</label> <input type="text" name="full_name" class="form-mold" autocomplete="off" placeholder="Full Name" value="'+x.name+'"> <div data-help="full_name"></div></div>';
    var sex='<option value="">Sex</option> <option value="0" selected="selected">Male</option> <option value="1">Female</option>';
    if(x.sex=='1'){sex='<option value="">Sex</option> <option value="0" >Male</option> <option value="1" selected="selected" >Female</option>';}
        ch+='<div class="form-piece"> <label class="control-label">Sex</label><div class="block"> <select class="form-mold w6" name="sex" >'+sex+' </select> </div><div data-help="sex"></div></div>'; 

      ch+='<div class="form-piece"> <label class="control-label">Birthday</label><div class="block"> <div class="block"  data-junction="Birthday" ></div></div><div data-help="birthday"><span class="fs11 fg_5 ">Verify you are 13 year old.</span></div></div>';

      W.U.JunctionAdd(W.A.page.AppId,'Birthday',function(){
  
     $(this.Node).date_fill(this.data);
        },{selected:x.birthday,class:"form-mold  w4 ",name:"birthday_"});  

   ch+=' </div>';

ch+='</div>';
       return ch;
   

   }

  

var formLogic =function() {
     var rv = ['full_name', 'sex', 'birthday_Day', 'birthday_Month','birthday_Year'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=5, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  console.log(ret);

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
     var ch ='<form name="buyersetting_0"  data-junction="buyersetting_0" onsubmit="return false"> </form>';
   
 W.U.JunctionAdd(W.A.page.AppId,'buyersetting_0',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       
  }
     return  ch;

} ,
setting_1:function(){        var ch='';
    if (W.U.id('FWsubmit') != null) {
          $(W.U.id('FWtitle')).html(this.name+' setting');
          $(W.U.id('FWsubmit')).text('Update').show();

   var frombody=function(x){
      var ch='';  var URL =W.U.URL;
    console.log(x);
        
    var ch='<div class="block bs-0 bg_0 _bdy m_b10">';
     


   ch+='<div class="block m30_0"><div data-help="buyersetting_1"></div>';
   
 ch+='<div class="form-piece"> <label class="control-label">Address <i>*</i></label> <textarea name="address" class="form-mold  m_b5 textarea" placeholder="Address " autocomplete="off" rows="3">'+x.address+'</textarea> <div data-help="address"></div></div>';
       var token='';     var suggestion={   name:'pincode',
                                            fireAfter:6,
                                            type:2,
                                            token:'chips',
                                            placeholder:'pincode'
                                       }; 
   if(x.loaction_id!=''){  token += '<div class="li"><div class="token"> <span>' + x.loaction_name + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.loaction_id})  + '\' > </div></div>';
token += '<div class="li hidden"><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>';
}else{
   token += '<div class="li "><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>'; 
}  


   ch+='<div class="form-piece"> <label class="control-label">Pincode <i >*</i></label> <div class="form-token block " data-junction="suggestion1" ><div class="block bd">  <div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in "> </div></div></div><div data-help="pincode"></div></div>';
   
  W.U.JunctionAdd(W.A.page.AppId,'suggestion1',function(){
   W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion); 

   ch+='<div class="form-piece"> <label class="control-label">Phone <i>*</i></label> <input type="text" name="phone" class="form-mold " autocomplete="off" placeholder="Phone"  data-junction="checkPhone" value="'+x.phone+'" > <div data-help="phone"></div></div>';
 W.U.JunctionAdd(W.A.page.AppId,'checkPhone',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'phone',option:{}} })();
        },{}); 


ch+=' </div>';
ch+='</div>';
       return ch;
   

   }

  

var formLogic =function() {
     var rv =   [ 'address', 'pincode','phone'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=3, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
    f_value['pincode']=W.F.JSONparse(f_value['pincode'],{id:''})['id'];
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  console.log(ret);

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
      console.log(this);
     var AlertSuccess = W.T.AlertSuccess({heading:'',message:'Saved.'});
  W.U.AddDom(this.form.formhelp,AlertSuccess,'html');
          W.F.alert(); 
    
      W.A.page.AppView.setting.setting_1=this.data.setting_1;
     //--hide event&& reset event
    hideEditForm('FW',this.data.setting_1,this.form.formname);
     }
var  onerror=function(){ W.U.madianLoading('hide');
      console.log(this);
var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

    var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:W.A.page.AppView.setting.setting_1,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:W.U.id('FWsubmit')
         };












    //---
     var ch ='<form name="buyersetting_1"  data-junction="buyersetting_1" onsubmit="return false"> </form>';
   
 W.U.JunctionAdd(W.A.page.AppId,'buyersetting_1',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       
  }
     return  ch;
     },
setting_2:function(){        var ch='';
    if (W.U.id('FWsubmit') != null) {
          $(W.U.id('FWtitle')).html(this.name+' setting');
          $(W.U.id('FWsubmit')).text('Update').show();

   var frombody=function(x){
      var ch='';  var URL =W.U.URL;
 //     console.log(x);
        
    var ch='<div class="block bs-0 bg_0 _bdy m_b10">';
     


   ch+='<div class="block m30_0"><div data-help="buyersetting_2"></div>';
   
 ch+='<div class="form-piece"> <label class="control-label">Address <i>*</i></label> <textarea name="address" class="form-mold  m_b5 textarea" placeholder="Address " autocomplete="off" rows="3">'+x.address+'</textarea> <div data-help="address"></div></div>';
       var token='';     var suggestion={   name:'pincode',
                                            fireAfter:6,
                                            type:2,
                                            token:'chips',
                                            placeholder:'pincode'
                                       }; 
   if(x.loaction_id!=''){  token += '<div class="li"><div class="token"> <span>' + x.loaction_name + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.loaction_id})  + '\' > </div></div>';
token += '<div class="li hidden"><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>';
}else{
   token += '<div class="li "><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>'; 
}  


   ch+='<div class="form-piece"> <label class="control-label">Pincode <i >*</i></label> <div class="form-token block " data-junction="suggestion1" ><div class="block bd">  <div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in "> </div></div></div><div data-help="pincode"></div></div>';
   
  W.U.JunctionAdd(W.A.page.AppId,'suggestion1',function(){
   W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion); 

   ch+='<div class="form-piece"> <label class="control-label">Phone <i>*</i></label> <input type="text" name="phone" class="form-mold " autocomplete="off" placeholder="Phone"  data-junction="checkPhone" value="'+x.phone+'" > <div data-help="phone"></div></div>';
 W.U.JunctionAdd(W.A.page.AppId,'checkPhone',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'phone',option:{}} })();
        },{}); 

ch+='</div>';
ch+='</div>';

       return ch;
   

   }

  

var formLogic =function() {
      var rv =   [ 'address', 'pincode','phone'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=3, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
    f_value['pincode']=W.F.JSONparse(f_value['pincode'],{id:''})['id'];
      var AlertError = W.T.AlertError({message:alert_mes});
       


var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  console.log(ret);

      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
      console.log(this);
     var AlertSuccess = W.T.AlertSuccess({heading:'',message:'Saved.'});
  W.U.AddDom(this.form.formhelp,AlertSuccess,'html');
          W.F.alert(); 
    
      W.A.page.AppView.setting.setting_2=this.data.setting_2;
     //--hide event&& reset event
    hideEditForm('FW',this.data.setting_2,this.form.formname);
     }
var  onerror=function(){ W.U.madianLoading('hide');
      console.log(this);
var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

    var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:W.A.page.AppView.setting.setting_2,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:W.U.id('FWsubmit')
         };












    //---
     var ch ='<form name="buyersetting_2"  data-junction="buyersetting_2" onsubmit="return false"> </form>';
   
 W.U.JunctionAdd(W.A.page.AppId,'buyersetting_2',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       
  }
     return  ch;}
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
     
   var header= W.T.C.C3_subPageheader({Title:'<a href="" class="left"><h2 class="truncate title" >Settings</h2><i class="badge _gbtn"></i> </a>'});
   var footer=W.T.Footer({});;
   console.log(x.setting);

     // main nav
var ListData=[];

ListData.push({name:'Basic Info',help:'Update your basic infomation',formid:'setting_0'});

ListData.push({name:'Home Address',help:'Home Address for home delivary.',formid:'setting_1'});

ListData.push({name:'Other Home Address ',help:'Other Home Address for home delivary (optional )',formid:'setting_2'});


//ListData.push({name:'Theme',help:'Themes let you apply a consistent Look to Store.',formid:'theme'});



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

 var settingFront=W.T.wrap(header,settingList,footer);
       


      //  console.log(x);



        //--search
var blockList=[settingFront,FromWrap()];
var blockName=["settingFront","FW"];
var setting ={
    name:'storesetting',
    target:"settingFront",
    page:true,
    minheight:'auto'
};
    return W.T.ToggleBlock(blockList, blockName,setting);

   }
  
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);
//--blockFront

var drawer= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Drawer</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),  W.T.C.drawer_HomePageBuyer(x));
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Alert</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.C4_hederAlertBuyer(x));
//--drawer
var search= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Search </h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.T.C.C5_SearchDrawer(x));

     //--learn more
var learnMore=  W.U.LearnMorewrap;











//--search
var blockList=[blockFront,drawer,hederAlert,search,learnMore];
var blockName=["blockFront","drawer","hederAlert","search","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
    ch+=   W.T.ToggleBlock(blockList, blockName,setting);
       return ch;
  
   }

     W.M[W.A.page.AppId]=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };
   


  

 } )(wowrol);