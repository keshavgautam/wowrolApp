  function normalLoad(res){
                  
               var url =resurl;
               switch(res.type){
                   case 'script':
                   
                   url+= res.path+res.name+'.js';
   
                   if(res.res=="vendor"){//loading older jquery
 url=resurl+'core/javascript/vendorold.12345.js';  
                   }
   if(res.res=="recaptchaapi"){//loading recaptchaapi
 url=res.url;  
                   }
                   break;
                   case 'style':
                    url+= res.path+res.name+'.css';
                   break;
               } 

                 if (res.type == 'script') {
                    var e = document.getElementById(res.resId);
                    if (e == null) {
                        loadscript(url, res.resId, res.res, function () { });

                    } else {
                        if (res.replace == 1) {


                            document.getElementsByTagName("head")[0].removeChild(e);
                            loadscript(url, res.resId,res.res, function () { });
                        }

                    }

                }
                if (res.type == 'style') {

                    var e = document.getElementById(res.resId);
                    if (e == null) {
                        loadstyle(url, res.resId,res.res, function () { });

                    } else {
                        if (res.replace == 1) {

                            document.getElementsByTagName("head")[0].removeChild(e);
                            loadstyle(url, res.resId, res.res, function () { });
                        }

                    }
                }

         }