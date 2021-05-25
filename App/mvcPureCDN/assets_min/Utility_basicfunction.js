/*
* page set up 2
*/
; (function(W){
   "use strict";

function isFunction(obj) {return Object.prototype.toString.call(obj) === '[object Function]'; };
function isArray(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; };
function isPlainObject(obj) { return Object.prototype.toString.call(obj) === '[object Object]' && !(  W.U.browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); }
function isObject(obj) { return Object.prototype.toString.call(obj) === '[object Object]' && !(  W.U.browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); }
function isEmpty(o) { if(Object.prototype.toString.call(o) !== '[object Object]') {return false;} for(var i in o){ if(o.hasOwnProperty(i)){return false;} } return true; }
function isString(x){return (typeof x === 'string' || x instanceof String);}
function wNow() { return new Date; }
function wtime() {    return  Math.round(Date.now() / 1000);}
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
 function isInteger(x) {
        return x % 1 === 0;
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
//uniquly push a vaue in array
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
//clone object
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];

        if(isObject[copy[attr]]){
            copy[attr]=clone( copy[attr]);
        }
    }
    return copy;
}




function iskeyInArray(key,arr){
  var ret=false;
  if( isArray(arr)){
    var index=  arr.indexOf(key);
    if(index>=0){
        ret=true;
    }

  }

  return ret;
}
function isvalueInArray(value,arr){
  var ret=false;
  if( isArray(arr)){

    for(var q in arr){
      if(arr[q]==value){
        ret=true;
        break;
    }
    }

  }

  return ret;
}
//----------
function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
W.I.UIdcount=0;
function uniqueId(){
  var Id='';
 Id+= Math.round(Date.now() / 1000);
 Id+= makeid();
 W.I.UIdcount++;
      Id+= W.I.UIdcount;
return Id;
}


function SafeText(text){
   text=trim(stripHTML(text));
    return text;
}
 //find

function find(Selecter,context){
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



    // return Sizzle(Selecter,context);
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

// conneting   to jquery
//W.U.fn.init=jQuery.fn.init;

 /**
* @description  Create event
*/
function madianLoading(state){
    var AppNode=$('[data-loading="median"]');


    if(!W.U.browser.height_free){

    switch(state){
      case 'show':

      var  LoadingScreen =W.U.Rander('<div  class="block"  style="margin: 0px;padding: 0px; position: relative; display: none; background-color: rgba(0, 0, 0, .1);"  > <div class="block"  data-block="loadingimgCon"> <div style="text-align: center; position: absolute;" data-block="loadingimg" ><div class="block"> '+W.U.loading_svg(80,10,600)+' </div></div></div></div>')[0];

       var pa_width = window.innerWidth;
       var pa_height = window.innerHeight-48;

        LoadingScreen.setAttribute('style', 'margin: 0px;padding:  0px; position: relative; display: block;background-color: #f7f7f7;');
        $(AppNode).css({
            'width':'100%',
            'height':pa_height,
            'z-index':1000
        });
          var loadingimgCon = LoadingScreen.querySelector('[data-block="loadingimgCon"]');



            var loadingimg = LoadingScreen.querySelector('[data-block="loadingimg"]');
            loadingimgCon.setAttribute('style', "width: 100%; height: " + pa_height + "px; text-align: center; position: relative;");

            var con_width = 80;
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

}

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

  W.U.dom={};   W.U.domall={};
/**
* @description  give dom node form dom id
*/
 function id(Selecter){
    if (W.U.dom.hasOwnProperty(Selecter)) {
      return W.U.dom[Selecter];

    }else{
        return null;
    }
}



/**
* @description  get the form Node for name attribute for fn_11_forms plugin

*/
 function GetFORM(name){
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


 function loadImage (x) {

     var url=x.file;
     if(/(img.wowrol.com)/igm.test(url)){
         var photo =url;
     }else{

               x.file=W.F.makeHTML( url);
  //  var photo = W.C.Setting.ProcessCDN + W.U.Encription.base64encode(JSON.stringify(x)) + '.jpg';
        var photo    =url;

     }


  /*  var img_url = { file: x.file,
        width: width,
        height: height,
        type: 'resize'
    };*/




    return photo;
}

/**
* @description Insert the LocalizationText
*/
function GetText(text){
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
     return  text;
}
function SetText(Apppot,text,type){

text=W.U.GetText(text);
    switch(type){
      case'html':
   Apppot.innerHTML=text;

      break;
      case'text':
   Apppot.innerText=text;
      break;

    }
}

function SetIdText(id,text,type){
     W.U.SetText(W.U.id(id),text,type);

}

function IselementInViewport(el) {
     var IsIn=false;
        if(el!=null){
            var rect = el.getBoundingClientRect() ;

          IsIn= (
      rect.left >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.width > 0
    ) ;

        }

        return IsIn;
    }

/*
* @ call  W.U.DateDay();
*/

function DateDay(MMDD) {
                MMDD = new Date(MMDD);

                var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var strDate = "";
                var now = MMDD.getTime();
                var today = new Date();
                today.setHours(0, 0, 0, 0);

                var yesterday = new Date();
                yesterday.setHours(0, 0, 0, 0);
                yesterday.setDate(yesterday.getDate() - 1);

                var tomorrow = new Date();
                tomorrow.setHours(0, 0, 0, 0);
                tomorrow.setDate(tomorrow.getDate() + 1);

                var inWeek = new Date();
                inWeek.setHours(0, 0, 0, 0);
                inWeek.setDate(inWeek.getDate() - 6);




                if (MMDD.getTime() >= today.getTime()) {
                    strDate =   dateFormat(new Date(MMDD), " HH:MM TT");//"Today "
                } else if ((MMDD.getTime() <= today.getTime()) && (MMDD.getTime() >= yesterday.getTime())) {
                    strDate = "Yesterday " + dateFormat(MMDD.getTime(), " HH:MM TT");
                } else if (MMDD.getTime() >= inWeek.getTime()) {
                    strDate = dateFormat(MMDD.getTime(), "dddd, h:MM TT");
                } else {
                    strDate = dateFormat(MMDD.getTime(), "d-mmmm-yyyy");
                }

                return strDate;
            }
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
 function hideKeyboard () {
    var element = document.createElement('input');
element.setAttribute('type', 'text');



  element.setAttribute('readonly', 'readonly'); // Force keyboard to hide on input field.
element.setAttribute('disabled', 'true'); // Force keyboard to hide on textarea field.

document.getElementById('newdom').appendChild(element);

    setTimeout(function() {
        element.blur();  //actually close the keyboard
        // Remove readonly attribute after keyboard is hidden.
    document.getElementById('newdom').innerHTML='';
    }, 100);
}
function RandomBGColor(){
    var bg = [
    '#88d3ff', // 04
    '#59afe1', // 05
    '#2774a0', // 06
    '#1a8cff', // 07
    '#b2e020', // 10
    '#8eb021', // 11
    '#2f7a0e', // 12
    '#0bbe30', // 13
    '#14892c', // 14
    '#005812', // 15
    '#fe5e50', // 16
    '#d04437', // 17
    '#88170c', // 18
    '#f6c342', // 19
    '#f79232', // 20
    '#b05600', // 21
    '#d39c3f', // 22
    '#815b3a', // 23
    '#594300', // 24
    '#a659f5', // 25
    '#654982', // 26
    '#3d1368', // 27
    '#f691b2', // 28
    '#f15c75', // 29
    '#be1733', // 30
    '#ff4f92', // 104
    '#ff0d6e', // 105
    '#b3003e', // 106
    '#ffe400', // 108
    '#ffae00', // 109
    '#00d2ff', // 111
    '#0096ff', // 112
    '#d84dff', // 113
    '#b400ff', // 114
    '#7e00ff', // 115
    '#ffd200', // 116
    '#ff7f00', // 117
    '#ff2f00'  // 118
  ];


var bg_color = bg[Math.floor(Math.random()*bg.length)];
return bg_color;
}

function compare2Objects(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }

function isChildNode(parent,nNode){
            var ret=false;
            if(typeof parent !="undefined"){
       for(var q=0 ; q< parent.length;q++){

     var parent_q= parent[q];


              if(
             ( compare2Objects(parent_q, nNode) )||
             (parent_q.isEqualNode(nNode)) ||
                (parent_q===nNode)





              ){

                 ret=true;
                 break;
              }
            if(ret==false){
                  if(parent_q.childNodes.length>0){
                ret=W.U.isChildNode(parent_q.childNodes,nNode);
              }
            }


          }

}
            return ret;
        }


 function getPosition (el) {

    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : el.scrollTop,
      width:  isBody ? $(window).width()  :el.offsetWidth,
      height: isBody ? $(window).height() : el.offsetHeight,
      offsetLeft: el.offsetLeft,
     offsetTop: el.offsetTop
    });
  }

//---
 //--
 function CreateMENU(MENU,cssClass,depth){  var URL=W.U.URL;
     var DefaultLink={href:'',text:'',icon:'',iconSize:24,attrStr:'',haschildren:false},
         DefaultcssClass=['block ul hover bg_0  ','li bs-1 _Bdy','block ','vl-sp fw-b tt-c fs14','',' block '],
         help='';
   cssClass=W.U.extend(DefaultcssClass, cssClass);
   depth=W.U.isOK(depth)?depth:0;
     var Nav='';
   switch( depth){
 case 0:
   Nav='<div class="block "><div class="'+ cssClass[0]+'">';
  for(var i=0;i<MENU.length;i++){

     MENU[i]=W.U.extend( W.U.clone(DefaultLink), MENU[i]);

     if(W.U.isOK(MENU[i].help)){
       help='<span class="'+ cssClass[5]+'">'+MENU[i].help+'</span>'
     }


     var strip='<a class="'+ cssClass[2]+'" href="'+URL(MENU[i].href)+'"   '+MENU[i].attrStr+'  > <span class="'+ cssClass[4]+' ">'+W.T.SVG(MENU[i].icon,MENU[i].iconSize,'#1274c0')+'</span><span class="'+ cssClass[3]+'">'+MENU[i].text+'</span>'+help+' </a>';




  if(MENU[i].haschildren){


      Nav+='<div class="'+ cssClass[0]+' bs-1"  data-collapse="demo" ><div class="block '+ cssClass[1]+'" ><div class="w9">'+strip+'</div><div class="w3 block _bdy"><a class="right" href="javascript:void(0);" data-collapsebtn="demo"  ></a></div></div>' ;

    Nav+=CreateMENU(MENU[i].childrenMenu,cssClass,1);

    Nav+='</div>' ;


     }else{
         Nav+='<div class="'+ cssClass[1]+'"   >'+strip+'</div>';
     }








  }

  Nav+='</div></div>';

  //----------------------
   break;
 case 1:
 var childulClass=cssClass[0].replace(/bg_0/, "bg_6");
    Nav='<div class="block " data-collapseblock="demo" ><div class="bg_6 '+ childulClass+'"   >';
  for(var i=0;i<MENU.length;i++){

     MENU[i]=W.U.extend( W.U.clone(DefaultLink), MENU[i]);

     if(W.U.isOK(MENU[i].help)){
       help='<span class="'+ cssClass[5]+'">'+MENU[i].help+'</span>'
     }


     var strip='<div class="'+ cssClass[1]+'"><a class="'+ cssClass[2]+'" href="'+URL(MENU[i].href)+'"   '+MENU[i].attrStr+'  > <span class="'+ cssClass[4]+' ">'+W.T.SVG(MENU[i].icon,MENU[i].iconSize,'#1274c0')+'</span><span class="'+ cssClass[3]+'">'+MENU[i].text+'</span>'+help+' </a></div>';




   Nav+=strip;








  }

  Nav+='</div></div>';
 break;
}
  return Nav;
 }


 function medianStyleSetup(Node){
      var AppPot=document.getElementById('page');  var AppId = W.A.page.AppId;
  var topFix= W.U('.top_fix',Node)[0];
  var Flaver=W.A.page.AcessData.visit_data.wf;

  var topFixHeight=(W.U.isOK(topFix))?topFix.clientHeight:48;
  if(topFixHeight==0||topFix==null){
      topFixHeight=48;
  }else{
     if(AppId!='Material'&&AppId!='Loading'){
      console.log('top_fix not found for '+AppId);
        }
  }

var setHeight=(AppPot.clientHeight-topFixHeight) ;

var median =W.U('[data-appmedian]',Node)[0];

if( typeof( median)!= 'undefined')
{
       if(Flaver=="mob"){
       var setHeight=(AppPot.clientHeight-topFixHeight) ;
     }
     if(Flaver=="web"){
       var setHeight=AppPot.clientHeight-topFixHeight ;
     }

  if( W.U.browser.height_free){
      //  median[q].setAttribute('style', 'height:' + setHeight + 'px ;overflow-x: -o-paged-x-controls;overflow-y: -o-paged-y;');
      // median[q].setAttribute('style', 'height:' + setHeight + 'px ;');
     }else{
       median.setAttribute('style', 'height:' + setHeight + 'px ;overflow-x: hidden;overflow-y: auto;');


     }


median.onscroll=function(){
     lazy_load();
var HEADER_DATA=[];

var scrollTop=this.scrollTop;
var Node=topFix.childNodes;
for(var i=0;i<Node.length;i++ ){

   var isFixed=Node[i].getAttribute('data-isfixed');
   if(isFixed=='true'){
    HEADER_DATA.push({Isfixed:true});
   }
}


//W.U.console('  scrollTop'+ scrollTop);
//W.U.console( HEADER_DATA);
//W.U.console(this.clientWidth);W.U.console(window.innerWidth);

    //((Node.length)*43)
    if(scrollTop>1){
        var q=0;

    for(var i=0;i<Node.length;i++ ){

   var isFixed=Node[i].getAttribute('data-isfixed');
   if(isFixed=='true'){
       if(!$(Node[i]).hasClass('po-fi')){
           W.U.console('adding po-fi');
    $(Node[i]).addClass('po-fi').css({'top':(43*q),'right': (window.innerWidth-this.clientWidth)});
       }

            q++;
   }else{
     //  $(Node[i]).hide();
   }
}

    q=0;
    }else{
        if(scrollTop==0){
var Node=topFix.childNodes;

for(var i=0;i<Node.length;i++ ){

    var isFixed=Node[i].getAttribute('data-isfixed');
   if(isFixed=='true'){
           if($(Node[i]).hasClass('po-fi')){
$( Node[i]).show().removeClass('po-fi').css({'top':(43*i),'right': (window.innerWidth-this.clientWidth)});
}
}

}

        }


    }

}
}

       }

function lazy_load(){
        var all_images = W.U('[data-src]');
        var isonline=W.U.IsOnline();
       if(isonline){

        for (var i = 0; i < all_images.length; i++) {

            if (W.U.IselementInViewport(all_images[i])) {
                       var url = all_images[i].getAttribute('data-src');
                if (W.U.isOK(url)) {

                if (W.U.isOK(url)&&url!='') {
                    all_images[i].setAttribute('src', url);
                    all_images[i].removeAttribute('data-src');
                }
                }


            }



        }

        }


OnImageLoad();
}
/*
@des private function
@call W.U.OnImageLoad

*/
function OnImageLoad(){
   var all_images = W.U('img');
     for (var i = 0; i < all_images.length; i++) {

       all_images[i].onerror=function(e){
         this.src= W.I.IMAGE_ERROR_PLACEHOLDER;

     };
           }

}

function isOK(x){
    var ret=true;
    if(typeof(x)=='undefined'||x==null){
        ret=false;
    }
    return ret;
}


function ReverseObject(Obj){
    var TempArr = [];
    var NewObj = {};
    for (var Key in Obj){
        TempArr.push(Key);
    }
    for (var i = TempArr.length-1; i >= 0; i--){
        NewObj[TempArr[i]] = Obj[TempArr[i]];
    }
    return NewObj;
}
function IMObject(Obj){
    var TempArr = [];
    var NewObj = {};
    for (var Key in Obj){
        TempArr.push(Key);
    }
    for (var i = 0;i <TempArr.length; i++){
        NewObj[TempArr[i]] = Obj[TempArr[i]];
    }
    return NewObj;
}

function ObjectLength(Obj){
    var TempArr = [];

    for (var Key in Obj){
        TempArr.push(Key);
    }

    return TempArr.length;
}


function CreateTree(Menu,d){
     var family=[];

     for(var q in Menu){

        if(Menu[q].parent==d){
         var parent=  Menu[q].id;
         var item=Menu[q];
       Menu.slice(q,1);


         family.push({id:item,children:CreateTree(Menu,parent)});

        }

     }

 //W.U.console(family);  W.U.console(d);
     return family;
 }









  /**
   * Switch user
   * @para W.U.SwitchUser{entity_id:0}
   */
   function SwitchUser(args){

   var defaultdata={entity_id:0,URL:W.U.URL(''),goto:true};
   var data=W.U.extend(defaultdata,args);
  var visit_data=W.A.page.AcessData.visit_data;
    visit_data.wa=data.entity_id;
      W.U.Cookie.setPagedata();
      if(data.goto){
          W.U.GotoHref(data.URL);
       }
   }




//-------
/*
@call W.U.ParseText(text);
*/
function ParseText(text){


  var html = text;
    html = html.replace(/\&colon\;/g, ':');
  html = html.replace(/\&lowbar\;/g, '_');

  html = html.replace(/\n/g, '<br/>')
  html = html.replace(/:([A-Za-z0-9\-\+\*_]+?):/gi, (function (all, shortcut) {

    var code = W.I.EmojiHelper.shortcuts[shortcut]
    if (code !== undefined) {
      return getEmojiHtml(code)
    }
    return all
  }).bind(this));



  html = html.replace(/  /g, ' \u00A0').replace(/^ | $/g, '\u00A0');
  html = html.replace(/[\u0000-\uFFFF]/gi, (function (all) {

  var code = W.I.EmojiHelper.unicodeshortcuts[all]
    if (code !== undefined) {

     return getEmojiHtml(code)
    }
    return all
  }).bind(this));


  var urlReg_0 = new RegExp(/((https?&colon;&sol;&sol;)|(https?:&sol;&sol;))?[\w-]+((\&period;[\w-]+)|(\&sol;[\w-]+))+\.?(:\d+)?(\/\S*)?/igm);


  /*http&colon;&sol;&sol;php&period;net&sol;manual&sol;en&sol;function&period;mysql-set-charset&period;php<br>http&colon;&sol;&sol;www&period;ddffdrtyr
<br>http&colon;&sol;&sol;www&period;cool&period;com&period;au*/

//var regex = new RegExp(urlReg_0,'gi');
var regex = urlReg_0;
 var   matches =  html.match(urlReg_0);
 if(W.U.isOK(matches)){
   // debugger;
 }

  html = html.replace(urlReg_0, function (url) {
      var ret=url;
 // var urlReg = new RegExp('^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|jpeg|gif|png|svg|mp3)$','igm');
  var urlReg = new RegExp(/((^https?&colon;&sol;&sol;)|(^https?:&sol;&sol;))?[\w-]+((\&period;[\w-]+)|(\&sol;[\w-]+))+\&period\;(?:jpg|jpeg|gif|png|svg|mp3)$/igm);
 var urlReg_1 = new RegExp(/(^https)|(^http)/igm);
 var urlReg_2 = new RegExp(/^www/igm);
var TureImage = urlReg.test(url);//true;
var   matches = url.match(urlReg);
var   test_1 =  urlReg_1.test(url);
var   test_2 =  urlReg_2.test(url);
var link='<a href="'+url+'" target="blank" role="button" >'+url+'</a>';

if(!test_1){
   var link='<a href="http://'+url+'" target="blank" role="button">'+url+'</a>';
}

   if(W.U.isOK(matches)){

 }
 //debugger;
 if(!TureImage&&(test_1|| test_2)){

var Jid=W.U.J(function(){     W.U.snoopy.load(this.Node,this.data.url);   },{url:url});

 ret='<div class="block  fs14 bs-1 bg_6 " >'
 +'<div class="block"   data-junction="'+Jid+'"></div>'
 +'<div class="block _bdy  bs-1" >'+link+'</div>'
 +'</div >' ;


   }
    return  ret;
  }.bind(this));
  /*
if (t.length>0) {
       var urlReg = new RegExp('^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|jpeg|gif|png|svg|mp3)$');
   var TureImage = urlReg.test(url);//true;
 if(!TureImage){

   }


}


*/
  return html







}
function getEmojiHtml(code) {
  var emoji = W.I.EmojiHelper.emojis[code];
  //return '<i class="twa twa-lg " style="background-image: url('+CDN + code + '.svg);" ></i>'
    return '<img src="/assets/imgs/pic/blank.gif" alt=":'+emoji[1]+':" class="twa twa-lg " data-code="'+code+'" style="background-image: url('+W.I.CDN + code + '.svg);" />'
}
//-------

/*
@call W.U.ProductImage(text);
*/

function ProductImage(Data,task,selected){
    var ret,image;




     switch(task){
         case'varientsmallimage':
var varientdata= (Data.indexOf(selected)>0)?Data[selected]:Data[0];
var all=varientdata.webimages.concat(varientdata.mainimages);

 ret=[];
 for(var q in all){
   if(W.U.isOK(all[q].url)){
   image = W.U.loadImage({ file: W.U.isOK(all[q].url)?all[q].url:'',
                    width: 250,
                    height: 250,
                    type: 'slider'
                });

   ret.push(image);
   }
 }
         break;
          case 'varientbigimages':
var varientdata= (Data.indexOf(selected)>0)?Data[selected]:Data[0];
var all=varientdata.webimages.concat(varientdata.mainimages);
 ret=[];
 for(var q in all){
      if(W.U.isOK(all[q].url)){
     image = W.U.loadImage({ file: W.U.isOK(all[q].url)?all[q].url:'',
                    width: 550,
                    height: 500,
                    type: 'slider'
                });

   ret.push(image);
    }
 }
         break;
         case 'featureimage':

var varientdata= (Data.indexOf(selected)>0)?Data[selected]:Data[0];
 var TheImage=(W.U.isOK(varientdata.featureimage.url))?varientdata.featureimage.url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(varientdata.mainimages[0]))?varientdata.mainimages[0].url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(varientdata.webimages[0]))?varientdata.webimages[0].url: W.I.PRODUCT_PLACEHOLDER;

 }


 }
  if(!W.U.isOK(TheImage)){
     TheImage=W.I.PRODUCT_PLACEHOLDER;

 }
  ret= TheImage;
         break;




            }
//debugger;

  return ret;
}
//-------
/*
@des beepplay
@call W.U.bleepPlay();
if(){}
*/
if(isOK(window.Audio)){
  /* var bleep = new Audio();
bleep.src = "/assets/beep-09b.mp3";  */
}

function bleepPlay(){


  // Play button sound now
  //bleep.play();

}

//-----------
/*
@des
@use W.U.strformat("{0} is dead, but {1} is alive! {0} {2}","ASP", "ASP.NET")
*/
function strformat(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  }

//-------------
/*
@des
@call W.U.IsOnline();
*/
function IsOnline(){
    var online =window.navigator.onLine;
    return online;
}
//-------------
/*
@des
@call W.U.GetCurrencyData();
*/
function GetCurrencyData(x){
    var currency= W.I.Currency[x];
    return currency;
}

/*
@des
@call W.U.PutCurrencyStr();
*/
function PutCurrencyStr(Currency,Price){

    var currency= W.I.Currency[Currency];
    Price = ( W.U.floatval( Price)).toFixed(currency.decimal_digits);
      var str =currency.symbol+' '+Price;

    return str;
}

//---------------------



 W.U.find=W.U.fn.find= W.U.prototype.find=find;
 W.U.isFunction=W.U.fn.isFunction=  W.U.prototype.isFunction=isFunction;
 W.U.isArray= W.U.fn.isArray= W.U.prototype.isArray=isArray;
 W.U.isPlainObject=W.U.fn.isPlainObject= W.U.prototype.isPlainObject=isPlainObject;
 W.U.isObject=isObject;
 W.U.isString=isString;
 W.U.noop= function(){};
 W.U.isEmpty= isEmpty;
 W.U.Now= wNow;
 W.U.time      =wtime;
 W.U.trim= trim;
 W.U.stripHTML= stripHTML;
 W.U.intval= intval;
 W.U.floatval= floatval;
 W.U.positive= positive;
 W.U.isInteger=isInteger;
 W.U.uId= uniqueId;
 W.U.SafeText= SafeText;

 W.U.removeInArray= removeInArray;
 W.U.UniquePushArray=UniquePushArray;
 W.U.clone=clone;

 W.U.iskeyInArray=iskeyInArray;
 W.U.isvalueInArray=isvalueInArray;
 W.U.getPosition=getPosition;
 W.U.isChildNode=isChildNode;
 W.U.RandomBGColor=RandomBGColor;
 W.U.hideKeyboard=hideKeyboard;
 W.U.DateDay=DateDay;
 W.U.timeConverter=timeConverter;

 W.U.IselementInViewport =IselementInViewport;
 W.U.SetIdText=SetIdText;
 W.U.SetText=SetText;
 W.U.GetText=GetText;
 W.U.loadImage= loadImage;
 W.U.GetFORM= GetFORM;

 W.U.id= id;
 W.U.highlight= highlight;
 W.U.madianLoading= madianLoading;
 W.U.CreateMENU= CreateMENU;

 W.U.medianStyleSetup= medianStyleSetup;
 W.U.lazy_load= lazy_load;
 W.U.isOK= isOK;
 W.U.ReverseObject=ReverseObject;
 W.U.IMObject=IMObject;
 W.U.ObjectLength=ObjectLength;
 W.U.count=ObjectLength;
W.U.CreateTree=CreateTree;
W.U.SwitchUser=SwitchUser;
W.U.ParseText=ParseText;

W.U.ProductImage=ProductImage;
W.U.bleep=bleepPlay;
W.U.strformat=strformat;
W.U.IsOnline=IsOnline;

W.U.GetCurrencyData=GetCurrencyData;
W.U.OnImageLoad=OnImageLoad;
W.U.PutCurrencyStr=PutCurrencyStr;

})(wowrol);
