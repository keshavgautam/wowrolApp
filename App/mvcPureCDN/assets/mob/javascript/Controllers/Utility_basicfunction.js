/*
* page set up 2
*/
; (function(W){
   "use strict";

function isFunction(obj) {return Object.prototype.toString.call(obj) === '[object Function]'; }
function isArray(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; }
function isPlainObject(obj) { return Object.prototype.toString.call(obj) === '[object Object]' && !(browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); }
function isObject(obj) { return Object.prototype.toString.call(obj) === '[object Object]' && !(browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); }
function isEmpty(o) { if(Object.prototype.toString.call(o) !== '[object Object]') {return false;} for(var i in o){ if(o.hasOwnProperty(i)){return false;} } return true; }
function wNow() { return +new Date; }
function trim(text) { return (text || '').replace(/^\s+|\s+$/g, ''); }
function stripHTML(text) { return text ? text.replace(/<(?:.|\s)*?>/g, '') : ''; }
function intval(value) {
  if (value === true) return 1;
  return parseInt(value) || 0;
}
function floatval(value) {
  if (value === true) return 1;
  return parseFloat(value) || 0;
}
function positive(value) {
  value = intval(value);
  return value < 0 ? 0 : value;
}
/*
var ary = ['three', 'seven', 'eleven'];
removeInArray(ary, 'seven');
*/
function removeInArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function UniquePushArray(arr,value){
   var match=0;
    for(var q in arr){
        if(arr[q]==value){
             match=1;
        }
    }

    if(match==0){
        arr.push(value);
    }
    return arr;

}


//----------
function uniqueId(){
  var Id='';
  Id+= Math.round(Date.now() / 1000);

return Id;
}
function loading_svg (x, y) {
         var svg = '<span class="_bdy fs14">loading...</span>';
             if(typeof(W.U.URL)!='undefined'){
              var URL= W.U.URL;  
              var SITEURL=URL('');
        }else{
              var SITEURL='/';
        }

        switch (x) {

            case 20:
                svg = '<img  width="' + x + 'px" height="' + y + 'px" src="' + SITEURL + '/assets/imgs/pic/triangle32.gif">';
                break;
            case 100:
                svg = '<img  width="' + x + 'px" height="' + y + 'px" src="' + SITEURL + '/assets/imgs/pic/triangle100.gif">';
                break;
            case 200:
                svg = '<img  width="' + x + 'px" height="' + y + 'px" src="' + SITEURL + '/assets/imgs/pic/triangle200.gif">';
                break;
        default:
      svg = '<img  width="' + x + 'px" height="' + y + 'px" src="' + SITEURL + '/assets/imgs/pic/triangle200.gif">';
        }

        
        return svg;

    }

function SafeText(text){
   text=trim(stripHTML(text));
    return text;
}
 //find

 W.U.find=function(Selecter,context){
   var context=( typeof (context)== "undefined")?document:context;

   if(typeof (Selecter)== "string"){
       



   if(/id-([a-z.]+)/ig.test(Selecter)){
Selecter=Selecter.replace(/id-/g, '');
   
   if (W.U.dom.hasOwnProperty(Selecter)) {
      return W.U.dom[Selecter];

    }else{
        return null; 
       
    }
   
  
   }
   if(/class-([a-z]+)/ig.test(Selecter)){
Selecter=Selecter.replace(/class-/g, '');
        if (W.U.domall.hasOwnProperty(Selecter)) {
      return W.U.domall[Selecter];

    }else{
        return null; 
    }
   }


     
  return jQuery.find(Selecter,context);
   
  }else{ //if  it is node
   var arr=[];
 
  if(typeof Selecter =='object'){
     arr[0]= Selecter;  
    arr['length']= 1;
  }
 
 
      return arr;
  } 
  
  
}


 W.U.fn.find= W.U.prototype.find=W.U.find;
 W.U.fn.isFunction= W.U.prototype.isFunction=isFunction;
 W.U.fn.isArray= W.U.prototype.isArray=isArray;
 W.U.fn.isPlainObject= W.U.prototype.isPlainObject=isPlainObject;



 W.U.isPlainObject= isEmpty;
 W.U.Now= wNow;
 W.U.trim= trim;
 W.U.stripHTML= stripHTML;
 W.U.intval= intval;
 W.U.floatval= floatval; 
 W.U.positive= positive;
 W.U.uId= uniqueId;
 W.U.SafeText= SafeText;

 W.U.loading_svg= loading_svg;

 W.U.removeInArray= removeInArray;
 W.U.UniquePushArray=UniquePushArray;
 /**
* @description  Create event
*/
function madianLoading(state){
    var AppNode=$('[data-loading="median"]');
    



    switch(state){
      case 'show':

      var  LoadingScreen =W.U.Rander('<div  class="block"  style="margin: 0px;padding: 0px; position: relative; display: none; background-color: rgba(0, 0, 0, .1);"  > <div class="block"  data-block="loadingimgCon"> <div style="text-align: center; position: absolute;" data-block="loadingimg" ><div class="block"> <img src="/assets/imgs/pic/ring-alt.svg" style="width:50px;height:50px;" alt="loading..." > </div></div></div></div>')[0];

       var pa_width = window.innerWidth;
       var pa_height = window.innerHeight-56;
   
        LoadingScreen.setAttribute('style', 'margin: 0px;padding:  0px; position: relative; display: block;background-color: #f7f7f7;');
        $(AppNode).css({
            'width':'100%',
            'height':pa_height,
            'z-index':1000
        });
          var loadingimgCon = LoadingScreen.querySelector('[data-block="loadingimgCon"]');

    
     
            var loadingimg = LoadingScreen.querySelector('[data-block="loadingimg"]');
            loadingimgCon.setAttribute('style', "width: 100%; height: " + pa_height + "px; text-align: center; position: relative;");
            pa_width = pa_width - 50;
            var con_width = (pa_width) / 2;
            var con_height = (pa_height) / 4;
            loadingimg.setAttribute('style', "width: " + con_width + "px; top: " + con_height + "px; text-align: center; position: relative; margin: auto auto;");

  
   $(AppNode).html(LoadingScreen);
$(AppNode).show();
      break;
      case 'hide':
     $(AppNode).hide();
      break; 

    }
}
 W.U.madianLoading= madianLoading;
 /**
* @description  highlight
*/
function highlight(field,value)
{
     var text = $.trim(value);
     var field$ = field.toLowerCase();
    var index = field$.indexOf(text);
    if ( index >= 0 )
    { 
        field = field.substring(0,index) + "<span class='fw-b'>" + field.substring(index,index+text.length) + "</span>" + field.substring(index + text.length);
        
    }
   
    return field;
}
W.U.highlight= highlight;
  W.U.dom={};   W.U.domall={}; 
/**
* @description  give dom node form dom id
*/
W.U.id= function(Selecter){
    if (W.U.dom.hasOwnProperty(Selecter)) {
      return W.U.dom[Selecter];

    }else{
        return null; 
    }
}


/**
* @description  check the modal container is  avaible in dom or not 

* if not it create and replce the code in side it
*/
W.U.Modal= function(content){
var AppPot=document.querySelector('[data-appView="'+W.A.page.AppId+'"]');
var AppModal=W.U.id('appModal');
    if(AppModal !=null){
          var newcontent=W.U.Rander(content);
     
  W.U.Setview( AppModal,newcontent,'html');  
         $(AppModal).modal('toggle');

    }else{
     var newView=W.U.Rander('<div class="modal fade" data-nodeid="appModal" ></div>');

          W.U.Setview( AppPot,newView,'append');  
         W.U.Modal(content);
    }


}
/**
* @description  get the form Node for name attribute for fn_11_forms plugin 

*/
W.U.GetFORM= function(name){
      var forms = document.forms;
      var Match='';
         for (var i = 0; i < forms.length; i++) {

     if (forms[i].id == name||forms[i].name == name) {
       Match=forms[i];
         break;


     }
     
     }

       return Match;
 }


W.U.loadImage= function (x) {
    /*
    var img_url = { file: message_url,
        width: width,
        height: height,
        type: 'resize'
    };
    */
         
 
    var photo = W.C.Setting.ProcessCDN + W.U.Encription.base64encode(JSON.stringify(x)) + '.jpg';
    return photo;
}

/**
* @description Insert the LocalizationText  
*/

W.U.SetText=function(Apppot,text,type){
     var LangArr=W.L.str;
       var langArr={};
       text=text.toLowerCase();
  for(var q in LangArr){
    var p=q.toLowerCase();
  langArr[p]=LangArr[q];
  }
   if (typeof( langArr[text])!='undefined') {
         text=langArr[text].toLowerCase();
            
         }

    switch(type){
      case'html':
   Apppot.innerHTML=text;

      break;
      case'text':
   Apppot.innerText=text;
      break;   

    }
}

W.U.SetIdText=function(id,text,type){
     W.U.SetText(W.U.id(id),text,type);
   
}

W.U.IselementInViewport= function (el) {
        var rect = el.getBoundingClientRect()

        return (
       rect.top >= 0
    && rect.left >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )

    }
 


})(wowrol);
// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

