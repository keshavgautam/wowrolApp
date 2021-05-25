/*
* 
*/
; (function(W){
   "use strict";
  
      //--
   var v={
     a3: function (x) {
        var ch = '<ul id="wow_zoom" >';
        console.log(x);
        for (var q in x.smallimages) {
   var img350= W.U.loadImage({ file: v.a30(x.smallimages[q]),
                    width: 350,
                    height: 350,
                    type: 'slider'
                });
   var img600=W.U.loadImage({ file: v.a30(x.bigimages[q]),
                    width: 600,
                    height:650 ,
                    type: 'slider'
                });
         ch += '<li><img class="wow_zoom_thumb_image" src="' + img350 + '"  /><img class="wow_zoom_source_image" src="' + img600 + '"  /></li>';
        }
        ch += '</ul>';
        return ch;
    },
 
 
    a30: function (x) {
            var URL=W.U.URL;
        var images = URL('') + '/assets/imgs/pic/placeholder_loading.png';
        if (W.U.isOK(x)) {
            images = x;

        }
      
        return images;
    }
           }

   function ZoomWeb(node,data){
       
       


       function Handler(Node,Data){
           this.Node=Node;  
           this.Data = W.U.extend(Handler.Defaults,Data); 
           
        $( this.Node).css({width:350,height:350});
           this.init();
       }
        Handler.Defaults={
        smallimages:[] , 
        bigimages:[],         
        id:'ZoomMobile'+W.U.uId()
        }

         Handler.prototype.init = function () {
             var _this=this;

  var mainBlock=W.U.Rander(v.a3(this.Data));       
    W.U.Setview(this.Node,mainBlock,'html');
       setTimeout(function(){
            $(_this.Node).find('#wow_zoom').wow_zoom();
       },200)
         }

  



       new Handler(node,data);
   }

   //
    

   W.U.ZoomWeb=ZoomWeb;


})(wowrol);