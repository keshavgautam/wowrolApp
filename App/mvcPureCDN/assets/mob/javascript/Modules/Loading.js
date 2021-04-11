/*
* loading
*/
; (function(W){
   "use strict";
   W.T.Header={};
   W.T.Header.wellcome=function(x){
            if(typeof(W.U.URL)!='undefined'){
              var URL= W.U.URL;  
              var siteUrl=URL('');
        }else{
              var siteUrl='/';
        }

    return '<div class="block bg_1 bs-0"> <div class="w2"> </div><div class="w8"> <span class=" block header-link-btn"><i class="_ri4 "><a class="vl-m" href="'+siteUrl+'" title="Wowrol" style="background-image:url('+siteUrl+'assets/imgs/pic/logo_2_147x30.png)"></a></i></span> </div><div class="w2"> <div class="right"> </div></div></div>';
   };
   W.T.Pane=function(x){
                var ch='';
                ch+='<div class="main_pane "  ><div class="main_pane-fuild">';
                ch+=x;
                ch+='</div></div>';
                return ch;
            }
 
  var on =function(){


    var ch='<div class="block">'+W.T.Header.wellcome({})+'<div  class="block" data-block="LoadingScreen" style="margin: 0px;padding: 0px; position: relative; display: none; background-color: rgba(0, 0, 0, .1);"  > <div class="block"  data-block="loadingimgCon"> <div style="text-align: center; position: absolute;" data-block="loadingimg" ><div class="block"> <img src="/assets/imgs/pic/ring-alt.svg" style="width:50px;height:50px;" alt="loading..." > </div></div></div></div></div>';  
    var pane=W.T.Pane(ch);
    //Seting lodding app
var page=W.U.defaultAppData({AppId:'Loading',AppTitle:'Loading'});

//console.log(W.U);
   var LoadingTemp= W.U.fn.ParseHTML(pane);
 var   LoadingScreen=W.U('[data-block="LoadingScreen"]',LoadingTemp)[0];
 //console.log(LoadingScreen);
       LoadingScreen.setAttribute('style', 'margin: 0px;padding:  0px; position: relative; display: block;background-color: #f7f7f7;');
  var loadingimgCon = W.U('[data-block="loadingimgCon"]',LoadingScreen)[0];

           var pa_width = window.innerWidth;
            var pa_height = window.innerHeight;
     var loadingimg = W.U('[data-block="loadingimg"]',LoadingScreen)[0];
      
            loadingimgCon.setAttribute('style', "width: 100%; height: " + pa_height + "px; text-align: center; position: relative;");
            pa_width = pa_width - 50;
            var con_width = (pa_width) / 2;
            var con_height = (pa_height) / 4;
            loadingimg.setAttribute('style', "width: " + con_width + "px; top: " + con_height + "px; text-align: center; position: relative; margin: auto auto;");

 document.title= page.AppTitle;   
  W.U('#page').html(LoadingTemp);

  }
  var off =function(){
      
        return '';

  }


 

 W.M.Loading={
         on:on,
         off:off

     };

})(wowrol);