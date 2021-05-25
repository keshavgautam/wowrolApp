
/*
* page set up 2
*/
; (function(W){
   "use strict";
   var Modaladded=0;

  function ProcessData(x){
      var default_data={avatar:'http://localhost:3325/assets/imgs/pic/image_placeholder.png',eid:0,href:'javascript:void(0);',alt:'Profile Pic',placeholder:'http://localhost:3325/assets/imgs/pic/image_placeholder.png'};
      var data =W.U.extend(default_data,x);

   data.avatar = W.U.loadImage ({ file:   data.avatar,
        width: 400,
        height: 400,
        type: 'resize'
    });

      return data;
  }  
     

/**


*/
function init(data){
  data=ProcessData(data);

    

 var pagerName='mainpage',presention='page';
     switch(W.I.initType){
      case 2://checkin web
     case 3://checkin web
        presention='model';   

     break;    
    }
       


    if(Modaladded==0){
      Modaladded=1; 
     W.U.KKJunction('PictureZoom',{
name:'PictureZoom',
data:data,
render:W.T.PictureZoom.t0


 });  
   W.U.Pager.addblockdata({ name:'PictureZoom', htmlStr:'<div class="block" data-kkcomponentwithrender="PictureZoom" ></div>',presention:presention});      
    }


 

     W.U.Pager.DirectTogglePage(pagerName,'PictureZoom');   
       if(Modaladded==1){
       
            W.U.ccbk.Run(W.U.Page,'KK_update_data_PictureZoom', data);  



       }
   setTimeout(function(){  W.U.lazy_load(); },1000);
}


 W.U.PictureZoom={
   init:init

 };

})(wowrol);
