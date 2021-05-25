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
         var logout='<li  ><a href="javascript:void(0);"  data-junction="Logout" >text_74</a></li>';
         if(!W.A.page.AcessData.LoginStatus){
            logout=''; 
         }
          var ch='<div class="ca0-p5 row gray_top_line" style="margin-top:40px;"><div class="block">';
      /*    
        ch+='<div class="main_pane container"> <div class="block > <div class="block _bdy"> <div class="block m_b10"><ul class="ul  ul-menu tt-c li_bdy"> '+logout+'<li  ><a href="javascript:void(0);" data-learnmore="about" >text_126</a></li><li><a   href="javascript:void(0);" data-learnmore="faq" >text_127</a></li><li><a   href="javascript:void(0);" data-learnmore="terms" >text_117</a></li><li><a href="javascript:void(0);" data-learnmore="privacy" >text_128</a></li><li class="hide"><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="learnMore"  >text_129</a></li></ul></div></div>';
       if(!W.A.page.AcessData.LoginStatus){
         ch+='<div class="main_pane container"><div class="w6 col6 m0_auto"><div class="btn-group btn-group-justified" role="group" > <a href="'+URL('mobile_enter')+'" class="btn btn-default" role="button">text_125</a><a href="'+URL('mobile_enter')+'" class="btn btn-default" role="button">text_121</a></div> </div> </div>';
         }

        ch+='<div class="main_pane container"><div class="row"><div class="block "><span >Wowrol shopping network  invented &amp; created  by Keshav Gautam</span> <a href="http://localhost:1234/">Wowrol </a> © 2016</div></div></div></div></div>'+W.T.localization_block()+'</div>';

       **/
  ch+='  <div class="block  _bdy"><ul class="ul  ul-menu tt-c li_bdy"> '+logout+'<li  ><a href="javascript:void(0);" data-learnmore="about" >text_126</a></li><li><a   href="javascript:void(0);" data-learnmore="faq" >text_127</a></li><li><a   href="javascript:void(0);" data-learnmore="terms" >text_117</a></li><li><a href="javascript:void(0);" data-learnmore="privacy" >text_128</a></li><li class="hide"><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="learnMore"  >text_129</a></li></ul></div>';

     if(!W.A.page.AcessData.LoginStatus){
         ch+='<div class="block _bdy m0_auto"><div class="w6 col6 m0_auto"><div class="btn-group btn-group-justified" role="group" > <a href="'+URL('mobile_enter')+'" class="btn btn-default" role="button">text_125</a><a href="'+URL('mobile_enter')+'" class="btn btn-default" role="button">text_121</a></div> </div></div>';
         }

    ch+='<div class="block  _bdy"><div class="block "><span >Wowrol shopping network  invented &amp; created  by Keshav Gautam</span> <a href="http://localhost:1234/">Wowrol </a> © 2016</div></div>'+W.T.localization_block()+'';

       ch+='</div></div>';
    

      


           if(W.C.Setting.SERVER_MODE!="PRODUCTION"){
 /*   for(var i=0;i<=9;i++){
   W.U.Cookie.remove(W.C.Setting.UserPath[i]);  
    }

   var cookie=W.U.Cookie;
   
     cookie.setPagedata();
    
     var c=document.cookie;
        ch+=JSON.stringify(c);  
         */  
           

           }
     

       W.U.JunctionAdd(W.A.page.AppId,'Logout',function(){
    this.Node.onclick=function(){
           var visit_data=W.A.page.AcessData.visit_data;
       
switch (visit_data.wk){
     case '1':
    case 1:
    if(W.U.isOK(    window.signOutGoogle)){
   ///     window.signOutGoogle();
    }

   break;
}

        for(var i=0;i<=10;i++){
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
                var ch='<div class="block  _bdy m_b10"><div class="block "> <div class="block"> <p class="al-c"> help_75</p><div class="block" data-junction="localizationlang"></div><div class="block" data-junction="localizationflaver" ></div></div></div></div>';

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
W.U.console(parse);W.U.console(info);
  for(var i=0;i<appData.res.length;i++){
      

      if(appData.res[i].res=='lang'){


          W.A.page.res[i].name='lang.'+parse+'.js';
      }
      
  }
  $('#langjs').remove();

  $('html').attr('lang',lang);

     W.U.ccbk.Run('viewloaded' );
     W.U.ccbk.Clear('pageloaded' );
     W.U.Updater.DeleteRail('main');
     W.U.intentdata.bank ={};

     W.C.loader.init(W.A.page);
     W.U.ccbk.Clear('viewloaded' );
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
  //-- changing app slug name user res list
  Flaver=this.itemvalue;
  var info=JSON.stringify({'hash':W.U.Now()+Math.random() ,
             'wf':Flaver});
var parse =W.U.Encription.base64encode(info);


W.A.page.AcessData.visit_data.wf=this.itemvalue;
   var cookie=W.U.Cookie;
     cookie.setPagedata();
  for(var i=0;i<appData.res.length;i++){
      

      if(appData.res[i].res=='maincss'){


          W.A.page.res[i].name='maincss.'+parse+'';
      }
      if(appData.res[i].resId=='appjs'){


          W.A.page.res[i].path=Flaver+'/javascript/';
      }
        if(appData.res[i].resId=='bootstrapjs'){


          W.A.page.res[i].path=Flaver+'/javascript/';
      }
  }

  $('#maincss').remove();
  $('#appjs').remove();
  $('#bootstrapjs').remove(); 
       W.U.ccbk.Run('viewloaded' );
     W.U.ccbk.Clear('pageloaded' );
     W.U.Updater.DeleteRail('main');
     W.U.intentdata.bank ={};
  W.C.loader.init(W.A.page);
       W.U.ccbk.Clear('viewloaded' );
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
var heading='<div class="block fw-b _bdy "> <div class="block _bdy"><h2>text_125</h2></div><div class="block _bdy t"><span> help_85</span></div></div>';
              var ch='<div class="block  bg_0  " style="max-width: 400px; margin: 0px auto;"> <div class="block " style="z-index:2;"> '+heading+'<div class="block _bdy "  > <form name="login_form" data-junction="Login" onsubmit="return false"> </form> </div></div></div>'; 
               


var frombody=function(x){    
            var URL=W.U.URL;
       var ch='<div class="block"><div class="form-piece "> <label class="control-label">text_122</label> <input type="text" class="form-mold" name="login_email_or_phone" autocomplete="off"   value="'+x.login_email_or_phone+'" placeholder="Email or Phone " data-required="true"> <div data-help="login_email_or_phone"> </div></div><div class="block form-piece"> <div class="input-group"> <label class="control-label">text_119</label> <input type="password" class="form-mold" name="login_password" value="'+x.login_password+'" placeholder="Password"   data-required="true"> <span class="input-group-btn"> <button class="btn " type="button" data-junction="TogglePassword" >text_115</button> </span> </div><div data-help="login_password"> </div></div><div class="form-piece"> <label class="checkbox" data-toggle="checkbox"> <input type="checkbox" name="remember_me" value="1"><span class="checkbox__label">text_124</span> </label> <input type="hidden" name="redirect_to" value="'+URL('')+'"> </div><div  data-help="login_form"></div><div class="form-piece clearfix"> <a href="javascript:void(0);" type="submit"  class="block btn fg_10 fw-b btn-success right" role="button">text_125</a> </div><div class="form-piece clearfix"><a href="'+URL('forget_password')+'" class="btn btn-link left">text_123</a> <a href="'+URL('mobile_enter')+'" class="btn btn-link right">text_121</a></div></div>';
           // return ch;
         return  '<div class="block"> <div class="block"> '+ch+' </div><div class="block _bdy al-c fw-b "> OR </div> <div class="block" ><div class="block" data-junction="gogglesign" ></div><div class="block" data-junction="facebooksign" ></div></div></div> </div>';
            };
var formLogic =function() {
     var rv = ['login_email_or_phone', 'login_password', 'remember_me', 'redirect_to'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=4, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
    alert_mes= alert_mes.concat(glueErrors.message);
   
  
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

    

  //   location.assign(f_value['redirect_to']);
  W.U.GotoHref(f_value['redirect_to']);

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }
 var  formData=W.U.extend({login_email_or_phone:'',login_password:''},x);

   var sigupdata={
            option:{sendwith:'ajax4'},
            formData:formData,
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
* @description  generate the form header
* @param  
*/
function FormHeader(x){
          /*{close:'<div class="li"><a href="javascript:void(0);" ><span>Cancel</span><i class="badge _gbtn"></i> </a></div>',
           title:'<span class=" block header-link-btn">title</span>',
           done:'<div class="li"><a href="javascript:void(0);" ><span>Save</span><i class="badge _gbtn"></i> </a></div>'}
          */
             return '<div class="block bg_1 bs-2dp"> <div class="w2"> <div class="block ul ul-menu thm header-link"> '+x.close+'</div></div><div class="w8"> '+x.title+'</div><div class="w2"> <div class="right"> <div class="block ul ul-menu thm header-link"> '+x.done+' </div></div></div></div>'; 
      }

function ActivityHeader(x){
    var ch='';
   /*
    {back:'',
    Title:'',
    RightLink:[]
    }
   */


   ch+='<div class="block bg_1 bs-2dp">';
  ch+='<div class="di-td vl-t">'+x.back+'</div>';
    ch+='<div class="di-td w-100-010 vl-t">'+x.Title+'</div>';
   
     ch+=x.RightLink;
   ch+='</div>';

     return ch;   

}
/**
* @description  generate the form header
* @param  
*/
function DashbordFormHeader(args){
     var ch='';   var URL=W.U.URL;
var defaultargs={titleIcon:'',titleText:'',sublitText:'',backblock:  W.I.activeBlock ,pager:W.I.activePage,submitbutton:true,showbackbutton:true,submitnodeId:false,NodeId:'',smallwowrolicon:false,submitbuttonAttrstr:'',backblockAttrstr:''};
var x=W.U.extend(defaultargs,args); 
   var buttonClass=(W.I.wf=='mob')?'header-link-btn':'header-cell hov';
   var  titleClass=(W.I.wf=='mob')?'block header-cell':'block header-cell fg_4';
   var backbutton='',smallwowrolicon='';



var titleIcon=(x.titleIcon!='')?x.titleIcon:'';
var title='<div class="di-td vl-t   w212 "><span class=" '+titleClass+' "><i >'+titleIcon+' </i><span class="ad-0" >'+x.titleText+'</span></span></div >';
var submit='',NodeId=(x.submitnodeId)?' data-nodeid="'+x.NodeId+'"':'';
if(x.submitbutton){
 submit='<div class="di-td  vl-t"><a href="javascript:void(0);" type="submit"  class="block '+buttonClass+'"    '+NodeId+'   '+x.submitbuttonAttrstr+'><span>'+x.sublitText+'</span><i class="badge _gbtn"></i> </a></div>'; 
}

if(x.showbackbutton){
   backbutton='<div class="di-td  vl-t "><a href="javascript:void(0);" data-pagerbtn="'+ x.pager+':'+ x.backblock+'" class="block '+buttonClass+'" '+x.backblockAttrstr+' >'+W.T.SVG('left',24,'#f1f5fc')+'</a></div >';  
}
if(x.smallwowrolicon){
   backbutton='<div class="di-td  vl-t "><a href="'+URL('')+'" class="block '+buttonClass+'" ><i class="_ri6 vl-m"></i></a></div >';  
}


       if(W.I.wf=='mob'){
     ch+='<div class="block bg_1 fg_6 bs-1">';
     ch+=backbutton;
      ch+=smallwowrolicon;
     ch+=title;
     ch+=submit;
     ch+='</div >' ;
   }
   if(W.I.wf=='web'){
     ch+='<div class="block bs-1 bg_0 fg_4">'  ;
     ch+=backbutton;
 ch+=smallwowrolicon;

     ch+=title;
     ch+=submit;
     ch+='</div >' ; 
   }
      
   return ch;
}
function DashbordFormWrap(header,madian,Footer){
     var ch='<div class="block bs-1">';
        if(W.I.wf=='mob'){
          ch+=W.T.wrap(header,madian,Footer); 
        }
            if(W.I.wf=='web'){
      ch+=W.T.wrapForModal(header,madian,Footer,false); 
      
        }
        ch+='</div>';
   return ch;
}
function DialogWrap(header,madian,Footer,isPage){
     var ch='<div class="block bs-1">';
        if(W.I.wf=='mob'){
          ch+=W.T.wrap(header,madian,Footer); 
        }
            if(W.I.wf=='web'){
      ch+=W.T.wrapForModal(header,madian,Footer,isPage); 
      
        }
        ch+='</div>';
   return ch;
}


/**
* @description  show the loading  block
* @param  
*/
function blockLoading(){
     var ch = '<div class="block   ">';
                ch += '<div class="block m0_auto" style="width:50px;height:50px;" > '+ W.U.loading_svg(50,5,800)+' </div>';
                ch += '</div>';

                return ch;
}

/**
* @description  result not found banner
* @param  
*/
function RNF_banner(x){
   var defaultargs={
      msg: ' No Result Found',
      class :'fw-b fs14',
      wrapclass :'_bdy   h150 al-c _B-gray'

   };
         if( W.U.isString(x)){
           var  options = W.U.extend(defaultargs,{msg:x}); 
    }else{
           var  options = W.U.extend(defaultargs,x); 
    }
  

      return '<div class="block ' +options.wrapclass+'"> <div class="block ' +options.class+'" style="margin-top: 80px;">' +options.msg+'</div> </div>';
}
/**
* @description  result not found banner
* @param  
*/
function BreadCrumb(x){
    var ch='',
    link=[],
    AppView=W.A.page.AppView;
    
    if(W.U.isOK( W.I.initType)){
        var storeSlug='',storename='';
switch(W.I.initType){
 case 0:
  storename=AppView.EntityStripdata.entityName;
 storeSlug=AppView.EntityStripdata.slug;
 break;
 case 1://checkin init mob

 var  SBData=W.U.Browsing.hi_SBdata();
  storename=SBData.Ed[0].entityName;
 storeSlug=SBData.Ed[0].slug;
 break;   
 case 2://checkin init web
 var  SBData=W.U.Browsing.hi_SBdata();
  storename=SBData.Ed[0].entityName;
 storeSlug=SBData.Ed[0].slug;
 break; 
 case 3:
  storename=AppView.EntityStripdata.entityName;
 storeSlug=AppView.EntityStripdata.slug;
 break; 
     
}

    if(W.U.isOK(x.categoryParentTree)){
     var CInfo= x.categoryParentTree.result,CinfoIndex={};
     var Tree= x.categoryParentTree.Tree.reverse();
  for(var q in CInfo){
     CinfoIndex[CInfo[q].cid]=CInfo[q];
    
     }


   link.push('<div class="li"><a href="'+storeSlug+'" title="">'+storename+'</a></div>');
 
     for(var q in Tree){
var data=CinfoIndex[Tree[q]];
         if(W.U.isOK(data)){
           
    link.push('<div class="li">  '+W.T.SVG('nextarrow',10,'#f1f5fc')+'</div><div class="li"><a href="'+W.U.URL(data.slug)+'" title="'+data.cN+'">'+data.cN+'</a></div>');       
         }
    
     }




       ch+='<div class="block _bdy"><div class="ul ul-menu bcrum tt-c">'
       ch+=link.join('');
      ch+='</div></div>';
    }
    }
    return ch;
    }

/**
* @description  result not found banner
* @param {object} option {usefor:0}.
* @param {object} defaultOption {usefor=> [ 0 local use |1 delivery check ]}.
*/
 function Address(data,option){
function defaultOption(){ return W.U.clone({usefor:0}); };
option=W.U.extend(defaultOption(),option);
var Delivery='';
    var  location=((data.town.name=='')?'':' '+data.town.name)+' '+data.city.name+' '+data.state.name+' '+data.country.name;  
    if(option.usefor==1){
 Delivery='<span class="span info_text error al-l"> <i ></i> help_78</span>';
if(data.da==1){

   Delivery='<span>help_79</span>'; 
}
}
  var ch='<address class=" fg_4 ff_3 fs13" >'
 +((Delivery=='')?'':Delivery+'<br>' )
+data.address+'<br>'
 +((data.landmark=='')?'':data.landmark+'<br>' )
 +data.postalCode.name+'<br>'
 +location+'<br>'
  +'<abbr title="Phone">Ph:</abbr> '+data.phone+' '
  +'</address>';
 
  return ch;

   }

/**
* @description  result not found banner
* @param
* @param 
*/
function ForceLoginPage(block){
var Header='';
    var ch=''
    +'<div class>'
    +Login()
    +'</div>'
    ;
     return  ch;
}


 
  W.T.RNF_banner = RNF_banner;
  W.T.FormHeader = FormHeader;
  W.T.ActivityHeader = ActivityHeader;
  W.T.Footer = Footer;
  W.T.Login = Login;
  W.T.localization_block = localization_block;
  W.T.blockLoading = blockLoading;
  W.T.DashbordFormHeader = DashbordFormHeader;
  W.T.DashbordFormWrap = DashbordFormWrap;
  W.T.BreadCrumb= BreadCrumb;
  W.T.Address= Address;
  W.T.ForceLoginPage=  ForceLoginPage;
  W.T.DialogWrap =  DialogWrap;
})(wowrol);