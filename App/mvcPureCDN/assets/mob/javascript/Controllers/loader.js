

/*
* Basic //Controllers loader
*/
; (function(W){
   "use strict";
  var m={};
 //---
 var Interval = 0; //reference to inter val
 var tries = 0; //reference to inter val
  var backinit=false;
  var resurl='';
  var App={};

  //---------------------------------
        function allowStorage(){
             var ret=false;
            try {
        var _ = localStorage,
            x = '____test__';
        _.setItem(x, x);
        _.removeItem(x);
 // ret= true;
    } catch (e) {
       ret= false;
    }
    var bro=W.U.browser;
   if(bro.msie6||bro.msie7||bro.msie8||bro.msie9||bro.opera_mini||bro.iphone4||bro.ipod4){
        ret= false;
   }


     return ret;
         }
        function setItem(x,y){
         localStorage.setItem(String(x), String(y));
        }
        function getItem(x){
        return localStorage.getItem(String(x));
        }
      
    
       

        function smartSetup(){
          console.log('smartSetup started');  
 //check res to be load
 function ResCheck(){
      var newres=[];var n=0;  var _ = localStorage;
      var Savedres=[]; var SavedresName=[];var SavedresHash=[];
      var resList=this;var resListName=[];var resListHash=[];
       for(var i=0;i<resList.length;i++ ){
       resListName[i] =resList[i].name.split('.')[0];
      resListHash[i] =resList[i].name.split('.')[1];
            } 

      if(_.length>0){
            for(var j=0;j<_.length;j++ ){
                Savedres[j]=_.key(j); 
                SavedresName[j]=_.key(j).split('.')[0];
                SavedresHash[j] =_.key(j).split('.')[1];
            } 


// compare between res name
for (var i in resListName) {
    var resOneMatch=0;
    for (var j in SavedresName) {
      
        if (resListName[i] == SavedresName[j]) {
            resOneMatch++;
            //alert('found ' + resListName[i] + ' in both lists');
            // now  check for hash
          
            if(resListHash[i] != SavedresHash[j]){
                newres[n]=resList[i];n++;
                // removeing storge of this key
               _.removeItem(Savedres[j]);

            }
        }
    }
    if(resOneMatch==0){
           newres[n]=resList[i];n++;
    }
}



      }else{
       newres=resList;   
      }
     return newres;
 }

       //Load the res and add it in storage 
      function  ResLoader (res){
           this.res=res;
          var url =resurl;
          switch(this.res.type){
                   case 'script':
                   
                   url+='/javascript/'+ this.res.name+'.js';
                   break;
                   case 'style':
                    url+='/css/'+ this.res.name+'.css';
                   break;
               }

           

              var  xhr=new XMLHttpRequest();
              xhr.open("GET",url, true);   
              W.U.fn.lister("load",xhr,this.oncomplate.bind({that:this,xhr:xhr}));
      
              xhr.responseType = "text";
              xhr.send();
      }
      ResLoader.prototype.oncomplate=function(){
          
  // making copy to storage
 setItem(this.that.res.name,this.xhr.responseText);

 ResAddALL();
      };
  
     //add the res from storage to dom

     function ResAdder(){
         var resList=this;
     
       for (var q in resList) {
      var insertres=insert.bind(resList[q]);

       switch(resList[q].resId){
      case 'maincss':
      insertres();
      break;
      case 'vendorjs':
     checkondepend(['maincss'],insertres);
      break;
      case 'bootstrapjs':
   checkondepend(['vendorjs'],insertres);
      break;
      case 'mainjs':
    checkondepend(['vendorjs','bootstrapjs'],insertres);
      break;
       case 'appjs':
    checkondepend(['vendorjs','bootstrapjs','mainjs'],insertres);
      break;
      default:
      insertres();
  }
           
        }

     }
     function checkondepend(x,callback){
     var checkint=0;
    function check(x){
        var ondepend=x.length;
    var ret=true;
    for(var q in x){
      var e = document.getElementById(x[q]);
     
      if(e==null){
         ret=false;
          break;
      }
    }
    return ret;

    }

    function run(){
        if(check(this.x)){
           clearInterval(checkint ); 
          this.callback();
        }

    }

     checkint = setInterval(run.bind({x:x,callback:callback}), 200);
}

      function insert(){
    var res_data=getItem(this.name);
    if(res_data!=null){
  
   
    if(this.type=="script"){
     var __ = document.createElement("script");
        __.type = "text/javascript";
        __.innerHTML = res_data;
        __.id = this.resId;
        __.setAttribute('data-res', this.res);

    }
    if(this.type=="style"){
      var __ = document.createElement("style");

        __.type = "text/css";
        __.innerHTML = res_data;
        __.id = this.resId;
        __.setAttribute('data-res', this.res);
    }
       var ert=__;
    var e = document.getElementById(this.resId);
    if (e == null) {
   
   

   document.querySelector("head").appendChild(ert);
    } else {
        e.setAttribute('data-res',this.res);
        if (this.replace == 1) {
            e.parentNode.removeChild(e);
           document.querySelector("head").appendChild(ert);
        }

    }
    }
};
 var ResAddALL=ResAdder.bind(this.res);


///////////////////////////////////////


var resList =ResCheck.bind(this.res)();

   
        if(resList.length>0){
             for (var q in resList) {
            new ResLoader(resList[q]);
           
            }

        }else{
           ResAddALL();  
        }
        



        }
       
  //---------------------------------
  
        function loadscript(url, id, res, callback) {
            var __ = document.createElement("script");
            __.type = "text/javascript";
            __.async = false;
            __.id = id;
            __.setAttribute('data-res', res);
            if (__.readyState) { //IE
                __.onreadystatechange = function () {
                    if (__.readyState == "loaded" ||
      __.readyState == "complete") {
                        __.onreadystatechange = null;
                callback();
                    }
                };
            } else { //Others
                __.onload = function () {
                callback();
                };
            }

            __.src = url;

            document.getElementsByTagName("head")[0].appendChild(__);
        }

        function loadstyle(url, id, res, callback) { //style loader
            var __ = document.createElement("link");
            __.rel = "stylesheet";
            __.type = "text/css";
            __.id = id;
            __.setAttribute('data-res', res);
             __.setAttribute('media', 'all');
          
            if (__.readyState) { //IE
                __.onreadystatechange = function () {
                    if (__.readyState == "loaded" ||
      __.readyState == "complete") {
                        __.onreadystatechange = null;
                        W.U.queue.Add(callback);
                    }
                };
            } else { //Others
                __.onload = function () {
                   W.U.queue.Add(callback);
                };
            }

            __.href = url;
            document.getElementsByTagName("head")[0].appendChild(__);
        }

       

        function normalSetup(){
     
  console.log('normalSetup started');  
      function normalLoad(res){
                     this.res=res;
               var url =resurl;
               switch(this.res.type){
                   case 'script':
                   
                   url+='/javascript/'+ this.res.name+'.js';
   
                   if(this.res.res=="vendor"){//loading older jquery
 url=resurl+'/javascript/vendorold.12345.js';  
                   }
   if(this.res.res=="recaptchaapi"){//loading recaptchaapi
 url=this.res.url;  
                   }
                   break;
                   case 'style':
                    url+='/css/'+ this.res.name+'.css';
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




          var res=this.res;
            for (var q in this.res) {
            new  normalLoad(res[q]);
           
            }
        }
      
        
  //---------------------------------
        function checkloading(){   
      
            if(tries<100){
            if(W.C.loader.backinit&&(typeof   W.U.SetAppView!='undefined')){
             clearInterval(Interval); //clear if any previous
           
          
      setTimeout(W.U.queue.Run,500);
       
            console.log(' page loaded');  
            }else{
                console.log(' page loading checking');  
            }
           
            }else{
                   console.log('unable to load page');   
                    clearInterval(Interval); //clear if any previous
            }

            tries++;
        }

//------------------------
  function pagestylesetup() {
          
  if( W.U.browser.opera_mini||W.U.browser.opera_mobile){
    
     }else{
        
  document.getElementById('page').setAttribute('style', 'height:' + window.innerHeight + 'px ;overflow: hidden;');  
     }
        }

//------------------------
        function init() { 
   // console.log(wowrol);

    W.C.loader.backinit=false;
      App=this;
      
        resurl= this.resurl;
 

          if(allowStorage()&&this.AppId!="Material"){
              smartSetup.bind(this)(); 
          }else{
              normalSetup.bind(this)();
          }


 
      //---
pagestylesetup();
//--
 
 W.U.queue.Add(function(){
 

//
//var newEvent = document.createEvent("UIEvents");
//console.log(newEvent);
if(typeof  W.U.ThemeSetter!='undefined'){
    W.U.ThemeSetter(); 

  
}
 
    
 W.U.SetAppView(App); 




 });
    
  


  
    Interval = setInterval(checkloading, 1000); 
 
        }





 W.C.loader={
            init: function(data){
                  resurl= data.resurl;
 W.U.Page=document.getElementById('page');;
   var bro=W.U.browser;
   if(bro.msie6||bro.msie7||bro.msie8||bro.msie9||bro.safari_mobile){
     
loadscript( resurl+'/javascript/polyfill.6a033088d25b39389b914930a16b6151.js','shim', 'shim',function(){
    
         W.M.Loading.on();
     init.bind( wowrol.A.page)();
    });
     
 }else{
  W.M.Loading.on();
 init.bind( wowrol.A.page)();
 }



            },
            backinit:backinit,
            loadscript:loadscript
        };
})(wowrol);
 //for msie

window.onerror = function (msg, url, lineNo, columnNo, error) {
  //   alert(msg);
  //  document.write('msg = '+msg+', url '+url+', lineNo '+lineNo+', columnNo '+columnNo+', error ='+error+'');
  
    return false;
}
 //
