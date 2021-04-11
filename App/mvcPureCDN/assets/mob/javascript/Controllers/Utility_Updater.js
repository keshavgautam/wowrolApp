/*
 @  Node
 @  module function
 @  View
 @  setting  {
                'isLive' => [true:false],
                'interval'=>'0',
                'timeout'==>'0',
                'viewid'==>''
                'viewid'==>''
             }
*/
; (function(W){
   "use strict";
 var gl=[]; var time=10000;
function Updater(){
   

    function Handler(Node,Value) {
        this.Node = Node;
        this.setting = W.U.extend(Handler.Default, Value.setting);
        this.Module = Value.Module;
        this.data =Value.data;
        this.callback=Value.callback;
        this.init();
    }
       Handler.Default = {
           isLive:true,
           essential:false,
           interval:10000,
           timeout:0,
           actionid:"Updater"+W.U.uId()

         };
Handler.prototype.init = function () {
     console.log('--Updater--');
     console.log(this);
  
       var appViewS = '[data-appview="' + W.A.page.AppId + '"]';
        $(appViewS).off('beforepageupdate afterpageupdate');
     

        $(appViewS).on('beforepageupdate', this.onbeforepageupdate.bind(this));





    }

Handler.prototype.onbeforepageupdate = function () {
   


    if((W.U.IselementInViewport(this.Node)&&this.setting.isLive)||this.setting.essential){
       gl.push({ Node: this.Node, data: this.data, callback: this.callback }); 
    }
       


    };

 new Handler(this.Node,this.Value);
}




function rail(){
      var appViewS = '[data-appview="' + W.A.page.AppId + '"]';
   $(appViewS).triggerHandler('beforepageupdate');
     var payload = [], list_id = [];
for (var i = 0; i < gl.length; i++) {
    
    payload[i]=gl[i].data
}
if(payload.length>0){


   var formData = {
                    form: 'glRail',
                    f_value:JSON.stringify( payload)
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                   clearInterval(InterVal_id);
            
                    },
                    success: function (data) {
           var ret = JSON.parse(data);
          
                        if (ret.state == 500) {

 
                        }
                        if (ret.state == 200) {

                   glhandler(gl,ret.response);
        
                                }
   InterVal_id= setInterval(rail,time);  gl=[];
                    }

                });
}

 }  
 
 
function glhandler(gl,response){
 

  for (var i = 0; i < gl.length; i++) {
 var bulidfun=gl[i].callback.bind({Node:gl[i].Node,result:response[i]});   
   bulidfun();
}


} 
    

var InterVal_id= setInterval(rail,time);  

W.U.Updater=Updater;
  
 

})(wowrol);

/**
Updater
@ description Update the node on over the time

@Node will be updated with @Module and @view

@setting.viewId == View id of main View





@ Event Name 
wmd-beforepageupdate =>   before  page update event fire to server
wmd-afterpageupdate =>   After page update event from server HAndle in utility function


*/