/*
* page set up 1
*/
; (function(W){
   "use strict";

   //---------------------------------
          function defaultAppData(x) {
              var defaultdata={
            AppId:'',
            AppName:'',
            Junction:{},
            AppTitle:'',
            AppView:{},
            res:{}
            };
              for (var attr in defaultdata) {
        if (x.hasOwnProperty(attr)){
            defaultdata[attr]=x[attr];
        } 
    }

            
            return  defaultdata; 
        }
/**
* @description  
*/
 function createdocument (html) {

      var doc = document.createElement("div");
        doc.innerHTML = html;
        return doc;

       
    }
 
 
   
var rander=function(html){  
 return createdocument(htmlString).childNodes;
     };




 

   W.C.setup={rander:rander,
   defaultAppData:defaultAppData};
})(wowrol);