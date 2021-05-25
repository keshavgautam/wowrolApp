/*
* Full  Utility
*/
; (function(W){
   "use strict";
     var U=W.U;
     var jQuery=U;
     // getting browser information
  var _ua = navigator.userAgent.toLowerCase();
//_ua = 'Opera Mobi/46154; MeeGo) Presto/2.11.355 Version/12.10';
//_ua = 'UCWEB/2.0 (MIDP-2.0; U; Adr 4.4.2; en-US; Micromax_A106) U2/1.0.0 UCBrowser/10.7.9.856 U2/1.0.0 Mobile';//ucmini
//_ua = 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-US; Micromax A106 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/11.2.0.915 U3/0.8.0 Mobile Safari/534.30';//UCBrowser
//_ua= 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7 electricmobilesimulator';
   W.U.browser = {
  version: (_ua.match( /.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
  opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
  msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident/i.test(_ua)) || /edge/i.test(_ua),
  msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
  msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
  msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
  msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
  mozilla: /firefox/i.test(_ua),
  chrome: /chrome/i.test(_ua) && !/edge/i.test(_ua),
  safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
  iphone: /iphone/i.test(_ua),
  ipod: /ipod/i.test(_ua),
  iphone4: /iphone.*OS 4/i.test(_ua),
  ipod4: /ipod.*OS 4/i.test(_ua),
  ipad: /ipad/i.test(_ua),
  android: /android/i.test(_ua),
  bada: /bada/i.test(_ua),
  mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
  msie_mobile: /iemobile/i.test(_ua),
  safari_mobile: /iphone|ipod|ipad/i.test(_ua),
  opera_mobile: /opera mini|opera mobi/i.test(_ua),
  opera_mini: /opera mini/i.test(_ua),
  UC: /UCBrowser/i.test(_ua),
  UC_mini: (/UCWEB/i.test(_ua)&&(/UCBrowser/i.test(_ua))),
  mac: /mac/i.test(_ua),
  androidApp: /android/i.test(_ua),
  search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
 
};

   W.U.browser.height_free=(W.U.browser.opera_mobile||W.U.browser.opera_mini||W.U.browser.iphone4)?true:false;
   W.U.browser.iframeFriend=(W.U.browser.UC||W.U.browser.UC_mini)?true:false;
    W.U.dp=window.devicePixelRatio;
   W.U.ua=_ua;

  //  W.U.browser.height_free=true;

 W.U.feature = {
   // Test if querySelectorAll is supported
    querySelectorAll :(typeof document.querySelectorAll=='function')?true:false 
 };

 


})(wowrol);
/*
check support for
   if (window.FormData === undefined) {
            this.settings.onFallbackMode.call(this.element, 'Browser doesn\'t support Form API');

            return false;
        }



*/