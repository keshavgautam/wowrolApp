/*
* page set up 2
*/
; (function(W){
   "use strict";

   function getiframebody(){
       
   }

      /**
   * @description  iframe post
   */
  function iframePost(x) {
      var path=x.url;
      var RawParams=x.data;
      var method=x.type;
      var context=x.context;
      var iframeName=W.U.uId();;
      var beforeSend=x.beforeSend;
      var success=x.success;

   method = method || "post";
   /*// Set method to post by default if not specified.

      // The rest of this code assumes you are not using a library.
      // It can be made less wordy if you use one.*/
   var form = document.createElement("form");
   form.setAttribute("method", method);
   form.setAttribute("action", path);
   var params={ data: encode(RawParams) };
  

   for (var key in params) {
    if (params.hasOwnProperty(key)) {
     var hiddenField = document.createElement("input");
     hiddenField.setAttribute("type", "hidden");
     hiddenField.setAttribute("name", key);
     if( typeof (params[key]) =="object"){
          hiddenField.setAttribute("value",JSON.stringify( params[key]));    
     }else{
              hiddenField.setAttribute("value", params[key]);
     }


     form.appendChild(hiddenField);
    }
   }


   //--
   var iframe=Createiframe(iframeName);
   document.getElementById('newdom').appendChild(iframe);


       setTimeout(send.bind(this), 200);
       //wait remove bug in IE8,7,5
 function send(){
     if( iframe.contentWindow != null){
   var iframeDocument = iframe.contentWindow.document;
  
      iframeDocument.body.appendChild(form);

   var onSuccess=success.bind(iframe);
   var inneronSuccess=function(){
       var _Window_ = this.contentWindow;
       var data=_Window_.data;
    var decodedata=(W.C.Setting.UseBase64) ? JSON.stringify(data) : JSON.stringify(data);
       onSuccess.call(this,decodedata);
      
   }
 iframe.onload =inneronSuccess.bind(iframe); 
 form.submit();
 beforeSend.bind(context)(); 
  }
 }

  }
 
   /**
   * @description  append a new iframe in id newdom
   */
   function Createiframe(iframeName){

         var d = document.createElement('iframe');
        d.style.width = "0";
        d.style.height = "0";
        d.style.margin = "0";
        d.id = iframeName + 'iFe';
        d.name = iframeName + 'iFe';
        d.src = 'about:blank';
        d.style.display = "none";
        var element=document.getElementById(d.id);
        if(element!=null){
            element.parentNode.removeChild(element);
        }

        
         return d;

   }



      /**
   * @description  base 64
   */
    function encode(x) {

return (W.C.Setting.UseBase64) ? Encription.base64encode(JSON.stringify(x)) : x;


    }
  
 /**
   * @description  base 64
   */
    function decode(x) {

    return (W.C.Setting.UseBase64) ? Encription.base64decode(x)  : x;


    }



 /**
   * @description  ajax
 */
function ajax(x) {

        var req = {};


        req.url = x.url;
        req.data = { data: encode(x.data) };
        req.context = x.context;
        req.type = x.type;
        req.beforeSend = x.beforeSend;
        req.success = function (data) {
            data = decode(data);
          
            x.success(data);
        };
        $.ajax(req);
    }

  var Encription = (function () {
    var prototype = {};
    //--private
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // private method for UTF-8 encoding
  var  _utf8_encode = function (string) {
       
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
      _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = 0; var c1 = 0; var c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        };



    //--public
    // public method for encoding
    prototype.base64encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = _utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
       _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

        }

        return output;
    };
    // public method for decoding
    prototype.base64decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
       
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = _utf8_decode(output);

        return output;

    };
    return prototype;

})();
 

W.U.Encription= Encription;
   W.U.iFePost= iframePost;
   W.U.ajax= ajax;
  

})(wowrol);