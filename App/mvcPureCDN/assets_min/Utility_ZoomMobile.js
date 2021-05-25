/*
* 
*/
; (function(W){
   "use strict";

   var productsilderZoom={
 name:'productsilderZoom',       

htmlStr:  function(block){
     var formData=block.objectdata;
  var header= W.T.ActivityHeader({ 
    back:'<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="mainpage:blockFront"   >'+W.T.SVG('left',24,'#f1f5fc')+' </a>',
            Title: '<span class="block header-cell fg_6 al-l" ><span class="fw-b al-c tt-c"><span class="vl-sp"  ></span></<span></span>',
   
         RightLink:'<div class="di-td"></div>'
            });

     var ch='<div class="block" data-junction="productsilderZoom" ></div>';
        W.U.Junction('productsilderZoom',function(){
            console.log(this);
         var URL=W.U.URL;
           var limit=this.data.smallimages.length;
           var smallImages=[]; var bigImages=[];      
  for (var q = 0; q < limit; q++) {


  bigImages[q] = '<div class="block"  ><img class="img-responsive m0_auto" style="  background:'+W.U.RandomBGColor() +';"  src="'+ this.data. bigimages[q]+'" alt="image"></div>';


     }

    var bigImagesSetting={
     items: bigImages,
     name:'Whirlgig_1',
      type:'Carousel',
      singleItem : true,
      pagination : true,
      control : true,
      cssClass:{0:'carousel-inner po-re bg_7 fg_4',1:'',2:''}
      
  };

          W.U.Whirlgig.bind({Node:this.Node,Value:bigImagesSetting})();   
           W.U.lazy_load();
        },formData);
      
         return W.T.wrap(header, ch);
   }

   };
   
   
 
   function ZoomMobile(node,data){
       
       


       function Handler(Node,Data){
           this.Node=Node;  
           this.Data = W.U.extend(Handler.Defaults,Data); 
           
      this.smallWhillgigNode=this.initTemplate();
           this.initsmallWhillgig();
       }
        Handler.Defaults={
        smallimages:[] , 
        bigimages:[],         
        id:'ZoomMobile'+W.U.uId()
        }

         Handler.prototype.initsmallWhillgig = function () {
        var URL=W.U.URL;
           var limit=this.Data.smallimages.length;
           var Whirlgig_0_width=function(){
               var w=$('#page').find('.main_pane ').width();

if(W.I.wf=="web"){
             w=(W.I.AppId=='checkins')? '100%':w;
           }

if(W.I.wf=="mob"){
       w=w-20;
}
           return w;
           }
           

           var smallImages=[]; var bigImages=[];
 for (var q = 0; q < limit; q++) {
  
  smallImages[q] = '<div class="block"  ><img class="img-responsive m0_auto" style="max-height:300px;"   style="  background:'+W.U.RandomBGColor() +';"  src="' + URL('')+ '/assets/imgs/pic/placeholder_loading.png" data-src="'+this.Data.smallimages[q]+'"  alt="image"></div>';



     }


       var smallWhillgigSetting={
     items:smallImages,
     name:'Whirlgig_0',
      type:'Carousel',
   ContainerSize : [Whirlgig_0_width,300],
      singleItem : true,
      pagination : true,
      control : true,
      cssClass:{0:'carousel-inner po-re bg_7 fg_4',1:'',2:''}
      
  };
          W.U.Whirlgig.bind({Node:this.smallWhillgigNode,Value:smallWhillgigSetting})();
          console.log(this);
         }


       Handler.prototype.initTemplate = function () {

 W.U.intentdata.add('productsilderZoom.0',this.Data);
   W.U.Pager.addblockdata(productsilderZoom);

       var ch='<div class="block "><div class="block" data-block="smallWhillgig" ></div><div class="block"  ><div class="block _bdy"><button type="button" class="btn btn-default btn-xs " data-pagerbtn="mainpage:productsilderZoom:productsilderZoom:0"  >zoom</button></div></div>  </div>';

               var  mainBlock=W.U.Rander(ch);
               var ret= W.U('[data-block="smallWhillgig"]',mainBlock[0])[0];
 W.U.Setview(this.Node,mainBlock,'html');
              return ret;

                }

       new Handler(node,data);
   }



   W.U.ZoomMobile=ZoomMobile;


})(wowrol);