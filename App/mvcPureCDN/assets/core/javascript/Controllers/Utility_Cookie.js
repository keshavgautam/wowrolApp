/*
* 
*/
; (function(W){
   "use strict";
 
        var C=W.C;
  var CookieDomain=(C.Setting.SERVER_MODE=="DEVELOPMENT")?'':'.wowrol.com';

     function setPagedata(){
            var visit_data=W.A.page.AcessData.visit_data;
           
         var expire = '';
                   
                        if (visit_data.we == 1||visit_data.we == '1') {
                            expire = 30;
                            
                        }
                         
    var cke= setCookie;
      cke(C.Setting.UserPath[0],  visit_data.wa , expire);
     cke(C.Setting.UserPath[1],  visit_data.wb  , expire);

 cke(C.Setting.UserPath[2],   visit_data.wc  , expire);

 cke(C.Setting.UserPath[3], visit_data.wd  , expire);
  cke(C.Setting.UserPath[4],    visit_data.we  , expire);
   cke(C.Setting.UserPath[5],   visit_data.wf  ,expire);
  cke(C.Setting.UserPath[6],    visit_data.wg , expire);
  cke(C.Setting.UserPath[7],   visit_data.wh  , expire);
   cke(C.Setting.UserPath[8],   visit_data.wi  ,expire);
   cke(C.Setting.UserPath[9],   visit_data.wj  , expire);
      cke(C.Setting.UserPath[10],   visit_data.wk  , expire);
     }
    

 function  setCookie (path, value,expire){
        var options={ expires: expire, path: '/', secure: false };
        if(C.Setting.SERVER_MODE=="PRODUCTION"){
         var options={ expires: expire, path: '/', secure: true };   
        }
     set(path,value,options);
    }
function remove (a) {
        var b = '', expires = 'Thu, 01 Jan 1970 00:00:00 GMT';

    
    delCookie(a,'/',CookieDomain) ;



    }
    function get (a) {
        var name = a + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function set (key, value, options) {
        /* (key, value , { expires: 7, path: '/',domain:'', secure: true  }) */
        if (options.expires != '') {
            var d = new Date();
            d.setTime(d.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            var expire = d.toGMTString(); 
        } else {
            var expire = '';
        }
   
  options.domain = CookieDomain;
     var cookiestr=[
				encodeURIComponent(key), '=', encodeURIComponent(value),
                 options.expires ? '; expires=' + expire : '' ,
                  options.domain ? '; domain=' + options.domain : '',
				 options.path ? '; path=' + options.path : '',
                 (options.secure&&location.protocol == 'https:') ? '; secure' : ''
               
                
			].join('');

       
        document.cookie = cookiestr;
            

    }

function delCookie(name,path,domain) {
   if (get(name)) document.cookie = name + "=" +
      ((path)   ? ";path="   + path   : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}



W.U.Cookie = {
    set: set ,
    get: get ,
    remove: remove ,
    setCookie: setCookie ,
    setPagedata:setPagedata
};
























})(wowrol);
/*
function setCookie(name, value, days, secure) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = '; expires='+date.toGMTString();
  }
  var domain = locDomain;
  document.cookie = name + '='+escape(value) + expires + '; path=/' + (domain ? '; domain=.' + domain : '') + ((secure && locProtocol == 'https:') ? '; secure' : '');
}
*/