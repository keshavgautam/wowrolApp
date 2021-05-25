/*
* 
*/
; (function(W){
   "use strict";

      /**
    * @description  Toggle password of login form
    */
 function TogglePassword() {
    var Button = $(this)
    var FormPiece = Button.parents('.form-piece');
    var Input = FormPiece.find('.form-mold');
    var Type = Input.attr('type');
    if (Type == "password") {
     Input.attr('type', 'text');
     Button.text('Hide').addClass('btn-warning');
    } else {
     Input.attr('type', 'password');
     Button.text('Show').removeClass('btn-warning');
    }




   }

/**
    * @description  capitalize the given string
    */
function capitalize(s) {
    return s.replace(/(?:^|\s)\S/g, function(a) {
     return a.toUpperCase();
    });
   }

   /**
    * @description  get the readable name from input name string
    */
function  real_name(s) {
    var clean = s.replace(/[_]/g, ' ');
    return capitalize(clean);
   }

   /**
    * @description  Toggle error alert message
    */
function alertinForm() {
    // Jquery animation
   
    $(".alert").slideDown("slow").delay(6000).slideUp("slow", function() {
     $(".alert").remove()
    });
   

   }
 /**
    * @description  Toggle error alert message
    */
 function check_password(words) {
    var check = /[`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (words.length < 8) {

     return false;


    }
    if (check.test(words)) {

     return true;


    } else {
     return true;
    }

    return false;
   }
 /**
 * @description  
*/  
function glueErrors(x){
        var alert_mes=[];
        for(var q in x.f_value){
          if (x.f_value[q] == '') {
       alert_mes.push( this.real_name(q) + ' is required.');

            } else {
              x.error--;
            }     

        }
        return {message: alert_mes,error:x.error};
    }
 /**
 * @description  
*/ 
function walk_way_all(a, fid) {
    var walk_way = {};
    var forms = document.forms;
    var getAll=false,all=[];
    if( W.U.isArray(a)){
        for (var t = 0; t < a.length; t++) {

     walk_way[a[t]] = '';


    } 
    }else{
        getAll=true;
    }
   
    for (var i = 0; i < forms.length; i++) {

     if (forms[i].id == fid||forms[i].name == fid) {

      for (var j = 0; j < forms[i].elements.length; j++) {

       for (var t = 0; t < a.length; t++) {

        if (forms[i].elements[j].name == a[t]) {
         var is_allow = $(forms[i].elements[j]).attr('data-required');
         // collecting value
         if (forms[i].elements[j].value != '') {
          walk_way[a[t]] = $.trim(forms[i].elements[j].value);

         }




         // if this data is required
         if (is_allow === "true") {

          if (forms[i].elements[j].value != '') {
           $(forms[i].elements[j]).parents('.form-piece').removeClass('has-error');


          } else {
           $(forms[i].elements[j]).parents('.form-piece').addClass('has-error');
          }

         } //(is_allow === "true")


             //for type checked and radio
if (forms[i].elements[j].type == "checkbox" ||forms[i].elements[j].type == "radio") {
  
                                // collecting value
                                if (forms[i].elements[j].checked == true) {
                                    walk_way[a[t]] = 1;

                                } else {
                                   walk_way[a[t]] = 'off';
                                }


                            }


        }



       }
       //feeling in all
       all.push({name:forms[i].elements[j].name,value:forms[i].elements[j].value});
        
      }
     }
    }
    if(getAll){
      
       walk_way =all;
    }
    return walk_way;
   }

  /**
    * @description W.F.JSONparse
    */
function JSONparse(str,parse){
         str =str.replace(/u0026/g,'&');  
           if (str != 'undefined'&&str != '') {
                  var jvalue = JSON.parse(str);
                  if (W.U.isOK(jvalue)) {
                    parse = W.U.extend(parse,JSON.parse(str));
                  }

                   }
                   return parse;
    }



function json_scan(element, list) {
        var res;
        if (W.U.isOK(list)) {
            if ( W.U.isArray(list)||W.U.isObject(list)) {
                for (var key in list) {
                  res = (key == element) ? list[key] : json_scan(element, list[key]);
                 
                }
            }
        }
        
        return res;


    }
function ScrollLoadAllow (target) {

    var yOffset = window.pageYOffset;
    var y = yOffset + window.innerHeight;
    var page_height = window.pageYOffset,
           contentHeight = $(target).height();

    return (y >= contentHeight);
}

function  escapeHTML(text) {

        var HTML_ESCAPES = {
            "\n": '</p><br><p>',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;',
            '.': '&period;',
            ';': '&semi;',
            ':': '&colon;',
            '(': '&lpar;',
            ')': '&rpar;',
            '{': '&lcub;',
            '}': '&rcub;',
            '#': '&num;',
            '%': '&percnt;',
            '^': '&Hat;',
            '=': '&equals;',
            '$': '&dollar;',
            '?': '&quest;',
            ',': '&comma;',
            '|': '&verbar;',
            '`': '&grave;',
            '!': '&excl;',
            '/': '&#x2F;'
        }, HTML_ESCAPE_CHARS = /[&<>"'\/]/g;

        return text.replace(/[&<>"'.;:(){}#%^=$?,|!`\/\n\r]/g, function (match) {
            return HTML_ESCAPES[match];
        });
    }
function makeHTML (text) {
//  text = text.replace(/u0026/g,'&');
 
      var HTML_ESCAPES ={
        "&amp;":'&',
        "&lt;":'<',
        "&gt;":'>',
        "&quot;":'"',
        "&quest;":"'",
    '&grave;':'`',
    "&excl;":'!',
    "&commat;":'@',
    "&num;":'#',
    "&percnt;":'%',
    "&Hat;":'^',
    "&ast;":'*',
    "&lpar;":'(',
    "&rpar;":')',
    "&lowbar;":'_',
    "&plus;":'+',
    "&lcub;":'{',
    "&rcub;":'}',
    "&verbar;":'|',
    '&colon;':':',
    "&sol;":'/',
    "&equals;":'=',
    "&lsqb;":'[',
    "&rsqb;":']',
    "&bsol;":'\\',
    "&apos;":"'",
    "&comma;":',',
    "&period;":'.',
    "&acute;":'´',
    "&times;":'×',
    "&nbsp;":' ',
    "<br>":'\n'}

        for(var  q in HTML_ESCAPES){
               var re = new RegExp(q, 'igm');
         text = text.replace(re, function (match) { return HTML_ESCAPES[match]; });
       
        }
      return text;
    }
/**W.F.ButtonState();
* @description Control button states 
* @parma {'state':'loading',text:'',LoadingText:'Loading',svg:false} 
*/

function ButtonState(Node,args){
 var ButtonStateDefalut={state:'loading',text:'',LoadingText:'Loading',svg:false,svgSize:10} ;
args = W.U.extend(ButtonStateDefalut, args);  
 
 switch(args.state){
 case 'loading':

 if(args.svg){
  $(Node).html(W.U.loading_svg(args.svgSize,args.svgSize));   

 }else{
 $(Node).html( W.U.GetText(args.LoadingText));  
  
 }
  $(Node).attr('disabled','disabled');
     break;
 case 'loadingoff':
     
 $(Node).html(W.U.GetText(args.text));
   $(Node).removeAttr('disabled');
     break;
     case 'disable':
 $(Node).attr('disabled','disabled').html(W.U.GetText(args.text));
     break;    
 }
 
   
}
/*
W.F.Toast({msg:'',theme:'',duration:2000});
W.F.Toast({msg: W.U.GetText(''),theme:'',duration:2000});
*/
function Toast(args){
    //success warning error
    function handler(){
      
         if( W.U.isString(args)){
      this.options ={msg: W.U.GetText(args),theme:'',duration:2000,callback:W.U.noop};   
    }else{
       this.options = W.U.extend({msg:'',theme:'',duration:2000,callback:W.U.noop},args);
    }
  
   this.id= W.U.uId();

 
        

 this.AppModal=W.U.id('appToast');
    if( this.AppModal !=null){
        this.init();
     
 

    }  

    }
   handler.prototype ={
       init:function(){
   var newcontent=W.U.Rander(this.template());
     var _this=this;
  W.U.Setview(  this.AppModal,newcontent,'html');  

      setTimeout(function () {
var ToastSelecter=$('[data-toast="'+_this.id+'"]'),
windowWidth = window.innerWidth,

 toastWidth =  ToastSelecter.innerWidth();

var left = (windowWidth -toastWidth) / 2.0;
var leftInPercentage = left * 100 / windowWidth;


ToastSelecter.css({'left':leftInPercentage+'%','top':'10%'});

    


 
     //closing
     setTimeout(function () {
     ToastSelecter.fadeOut(600,function(){  _this.options.callback();});
     
        }, _this.options.duration); 


        }, 10);  

       },
       template:function(){
           return  '<div class="block" ><div data-toast="'+ this.id+'" class="toast-popup '+ this.options.theme+'" style=" display: block;">'+ this.options.msg+'</div></div>';
       }

   }

    

      var AppModal=W.U.id('appToast');
    if(AppModal ==null){
        var AppPot=W.U.Page;    var newView=W.U.Rander('<div  data-nodeid="appToast" ></div>');

          W.U.Setview( AppPot,newView,'append');   
    }

    new handler(args);
}

/*
loadInfo
*/
function Load(form,f_value,url){
    var uId=W.U.uId();

    url=W.U.isOK(url)?url:(W.U.URL('') + 'ajax/f0/p0');
       var formData = {
                   form: form,
                   f_value: f_value
                };
    W.U.ccbk.Add('load'+uId,function(){
          W.U.ajax({

                    url: url,
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
    W.U.ccbk.Run('progress'+uId );

                    },
                    success: function (data) {

    W.U.ccbk.Run('complete'+uId );

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
    W.U.ccbk.Run(W.U.Page,'complete500'+uId ,ret.mistake );
                        }
                        if (ret.state == 200) {
    W.U.ccbk.Run(W.U.Page,'complete200'+uId,ret.response );

 
                                }
 
                    }

                });
    } );
  
                return uId;
}
/*
@defaultFormsubmitdata
*/
function defaultFormsubmitdata(){
    var data={
       formname:'',
       f_value:{},
      progress:W.U.noop,
       complete:W.U.noop,
       complete500:null,
       complete200:W.U.noop,
       create_alert_mes:false,
       madianLoading:true,
       button:null,
       buttonstateargs:{},
       alert_mes:[],
       error:0
       };
       return W.U.clone(data);
}
/*
@submit
@call W.F.Submit()
*/

function  Submit(data){
data=W.U.extend(defaultFormsubmitdata(),data);
   var  help=W.U('[data-help="'+data.formname+'"]');
var AlertError = W.T.AlertError({message:data.alert_mes});
var Alert=function(){
    W.U.AddDom(help,AlertError,'html');
        W.F.alert();      
}
var progress=function(){
     data.progress();
     if(W.U.isOK(data.button)&&W.U.isOK(data.buttonstateargs)){
   ButtonState(data.button,W.U.extend(data.buttonstateargs,{state:'loading'}));
     }

     if(data.madianLoading){
  W.U.madianLoading('show');
   
     }
}
var complete=function(){
     data.complete();
   if(data.madianLoading){
 W.U.madianLoading('hide'); 
   
     }

    if(W.U.isOK(data.button)&&W.U.isOK(data.buttonstateargs)){
   ButtonState(data.button,W.U.extend(data.buttonstateargs,{state:'loadingoff'}));
     }

}
     //default 500
     if(!W.U.isOK(data.complete500)){
      data.complete500=Alert;
     }
     //--
   if(data.create_alert_mes){
       var  glueErrors=W.F.glueErrors({f_value:data.f_value,error:data.error});
     
   data.error=glueErrors.error;
  data.alert_mes=glueErrors.message;
     }
//--

       
  if( data.alert_mes.length==0){

        var loadingId= W.F.Load(data.formname,data.f_value);
     W.U.ccbk.Add('progress'+loadingId ,progress);
     W.U.ccbk.Add('complete'+loadingId ,complete);
     W.U.ccbk.Add('complete200'+loadingId ,data.complete200);
     W.U.ccbk.Add('complete500'+loadingId ,data.complete500);
     W.U.ccbk.Run('load'+loadingId );  
  }else{
        Alert();  
  }
}


W.F.Toast=Toast;
W.F.TogglePassword=TogglePassword;
W.F.capitalize=capitalize;
W.F.real_name=real_name;
W.F.alert=alertinForm;
W.F.check_password=check_password;
W.F.glueErrors=glueErrors;
W.F.walk_way_all=walk_way_all;
W.F.JSONparse=JSONparse;
W.F.json_scan=json_scan;
W.F.ScrollLoadAllow=ScrollLoadAllow;
W.F.escapeHTML=escapeHTML;
W.F.makeHTML=makeHTML;
W.F.ButtonState=ButtonState;
W.F.Load=Load;
W.F.Submit=Submit;
W.F.Forms={};// carry all form  in appjs and suplly to dashboard



})(wowrol);