/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   
   var Madian=function(x){
       var ch=''; var URL=W.U.URL;
 var header =W.T.ActivityHeader({LeftButton:'<a href="'+URL('')+'"  >'+W.T.SVG('home',24,'#f1f5fc')+'</a>',
    Title:'<a href="'+URL('notifications')+'" class="left"><h2 class="truncate" >notifications</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    });


      var footer=W.T.Footer({});;
       //--EntityStrip datab

     
 //-->>   
  
ch+='<div  data-nodeid="walkway" class="block " style="margin-bottom: 100px;"> </div>';
   $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
 W.U.Notifications.init(W.U.id('walkway'));
    });


 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';

        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);

    ch+=   blockFront;
       return ch;
  
   }

  W.M.notifications=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };
   


  

 } )(wowrol);