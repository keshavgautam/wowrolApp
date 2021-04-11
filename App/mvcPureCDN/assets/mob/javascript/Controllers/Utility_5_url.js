/*
* Utility_5_url
*/
; (function(U,W){
   "use strict";
var SITEURL = W.C.Setting.SITEURL;
  var SITEURLreg=(W.C.Setting.SERVER_MODE=="PRODUCTION")?/http:\/\/www\.wowrol\.com\/$/:/http:\/\/localhost:3323\/$/;
  var PageURL = {
   'SITEURLreg':SITEURLreg,
   'staticHTML':W.C.Setting.staticHTML, 
   'docHELP':W.C.Setting.docHELP,
   'enter': SITEURL + 'enter',
   'ragister': SITEURL + 'ragister',
   'ragisterbuyer': SITEURL + 'ragisterbuyer',
   'ragisterstore': SITEURL + 'ragisterstore',
   'forget_password': SITEURL + 'forget_password',
   'store_settings':SITEURL +'store_settings',
   'dashboard_categories': SITEURL + 'dashboard_categories',
   'dashboard_products': SITEURL + 'dashboard_products',
   'dashboard_frontpage': SITEURL + 'dashboard_frontpage',
   'dashboard_menu': SITEURL + 'dashboard_menu',
   'dashboard_orders': SITEURL + 'dashboard_orders',
   'dashboard_shipping': SITEURL + 'dashboard_shipping',
   'storestaff': SITEURL + 'storestaff',
   'viewcarts': SITEURL + 'viewcarts',
   'vieworders': SITEURL + 'vieworders',
   'notifications': SITEURL + 'notifications',
   'message': SITEURL + 'message',
   'requests': SITEURL + 'requests',
   'setting_buyer':SITEURL +'setting_buyer',
    'checkins':SITEURL +'checkins',
   'mycheckins':SITEURL +'mycheckins'
  };
/**
* @description  Parse location href 
*/
U.URL=function(AppId){
     var ch = SITEURL;
    if (PageURL.hasOwnProperty(AppId)) {

     ch = PageURL[AppId];

    } else {
     ch = SITEURL + AppId;
    }
    return ch;
}


/**
* @description  Parse location href 
*/
U.ParseHref=function(str){
      var ret = {
            href: '',
            search: '',
            pathname: '',
            pathurl: '',
            vars: {},
            tb: []
        };
        var href = str;
        var tb = {};
        if (/#/.test(href)) {
            console.log(href);
            var $href = href.split('#');
            href = $href[0];
            if ($href.length < 2) {
                $href[1] = '';
            }
            //--   
            // console.log($href);
            var $$href = $href[1].split('-'); var dotsplit = []; var loop = 0;
            for (var p in $$href) {
               
                // console.log($$href[p]);
                if (/./.test($$href[p])) {
                    dotsplit = $$href[p].split('.');
                    if (dotsplit.length == 3) {//must have length==3
                       tb[dotsplit[1]] = dotsplit[2];
                    loop++;
                    }
                  

                }
            }





            //--
        }


        var vars = {};
        //str =window.location.href
        href.replace(location.hash, '').replace(
                /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
                function (m, key, value) { // callback
                    vars[key] = value !== undefined ? value : '';
                }
            );

//getting path name
  if (/\?/.test(href)) {
            var $href = href.split('?');
         ret.pathurl = $href[0];
          ret.search= $href[1];
          }else{
              if (/&/.test(href)) {
            var $href = href.split('&');
         ret.pathurl = $href[0];
         
          } 
          }



        ret.href = href;
        ret.vars = vars;
        ret.tb = tb;
return ret;
}

//console.log(U.ParseHref(location.href));
//console.log(location.href);



})(wowrol.U,wowrol);