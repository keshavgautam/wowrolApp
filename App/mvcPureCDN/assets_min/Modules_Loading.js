/*
* loading
*/
; (function(W){
   "use strict";
   W.T.Header={};
   W.T.Header.wellcome=function(x){
  var siteUrl='', logo='', Flaver='mob';
            if(typeof(W.U.URL)!='undefined'){
              var URL= W.U.URL;  
            siteUrl=URL('');
      
        }
              Flaver=W.A.page.AcessData.visit_data.wf;
     var ch;
if( Flaver=='web'){
  logo='style=" background: url('+siteUrl+'/assets/imgs/logo/wowrol_0_120-28.png); display: inline-block;    "'; 
}else{
   logo=' style="background-image:url('+siteUrl+'/assets/imgs/logo/wowrol_0_120-28.png); display: inline-block;     "';  
}

var search='';

if(W.A.page.AppId!="Loading"&&Flaver=='mob'){
   search ='<a href="javascript:void(0);" class="block" data-pagerbtn="mainpage:search"   title="Search"><svg  xmlns="http://www.w3.org/2000/svg" version="1" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 9 2 C 5.1 2 2 5.1 2 9 C 2 12.9 5.1 16 9 16 C 10.722428 16 12.28779 15.386196 13.5 14.375 L 14 14.875 L 14 15.6875 L 20.3125 22 L 22 20.3125 L 15.6875 14 L 14.8125 14 L 14.34375 13.53125 C 15.372135 12.314388 16 10.738606 16 9 C 16 5.1 12.9 2 9 2 z M 9 4 C 11.8 4 14 6.2 14 9 C 14 11.8 11.8 14 9 14 C 6.2 14 4 11.8 4 9 C 4 6.2 6.2 4 9 4 z"></path></svg> </a>';
       ch= '<div class="block bg_1 bs-2dp header-cell"><div class="w10"><span class="w-max400auto "><i class="_ri4 block al-c""><a class="vl-m " href="'+siteUrl+'" title="Wowrol"  '+logo+'></a></i></span></div><div class="w2 " data-css="showafterpageloaded" style="display:none;">'+search+'</div> </div>';
}else{
   ch= '<div class="block bg_1 bs-3dp header-cell"><span class="w-max400auto "><i class="_ri4 block al-c""><a class="vl-m " href="'+siteUrl+'" title="Wowrol"  '+logo+'></a></i></span> </div>';
}

return ch;

   };
   W.T.Pane=function(x){
                var ch='';
                ch+='<div class="main_pane w-mob-page w-web-page"  >';
                ch+=x;
                ch+='</div>';
                return ch;
            }
 
function loading_svg (x, y,s) {
    s=(typeof s =='undefined')? 900:s;
    var svg = '<img  src="/assets/imgs/pic/triangle32.gif" alt="loading...">';    
    
       svg='<svg width="' + x + 'px" height="' + x + 'px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="' + x + 'px" height="' + x + 'px" fill="none" class="bk"></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"/></rect><rect  x="46" y="40" width="8" height="20" rx="5" ry="5" fill="rgba(NaN,NaN,NaN,0)" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"/></rect></svg>';
      
        return svg;

    }
     W.U.loading_svg= loading_svg;


  var on =function(){


    var ch='<div class="block">'+W.T.Header.wellcome({})+'<div  class="block" data-block="LoadingScreen" style="margin: 0px;padding: 0px; position: relative; display: none; background-color: rgba(0, 0, 0, .1);"  > <div class="block"  data-block="loadingimgCon"> <div style="text-align: center; position: absolute;" data-block="loadingimg" ><div class="block"> '+ loading_svg (80,10)+' </div></div></div></div></div>';  
    var pane=W.T.Pane(ch);
  W.U('#page').html(pane);
    //Seting lodding app
var page=W.U.defaultAppData({AppId:'Loading',AppTitle:'Loading'});

 
 var   LoadingScreen=W.U('[data-block="LoadingScreen"]')[0];


       LoadingScreen.setAttribute('style', 'margin: 0px;padding:  0px; position: relative; display: block;background-color: #f7f7f7;');
  var loadingimgCon = W.U('[data-block="loadingimgCon"]')[0];

           var pa_width = window.innerWidth;
            var pa_height = window.innerHeight;
     var loadingimg = W.U('[data-block="loadingimg"]',LoadingScreen)[0];
      
            loadingimgCon.setAttribute('style', "width: 100%; height: " + pa_height + "px; text-align: center; position: relative;");
            pa_width = pa_width ;
            var con_width = 80;
            var con_height = (pa_height) / 4;
            loadingimg.setAttribute('style', "width: " + con_width + "px; top: " + con_height + "px; text-align: center; position: relative; margin: auto auto;");

 document.title= page.AppTitle;   


  }
  var off =function(){
      
        return '';

  }

  

   //////////
 

 W.M.Loading={
         on:on,
         off:off

     };

})(wowrol);