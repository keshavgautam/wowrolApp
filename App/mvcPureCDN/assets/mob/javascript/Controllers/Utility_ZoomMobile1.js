/*
* 
*/
; (function(W){
   "use strict";


   function ZoomMobile(node,data){
       
       


       function Handler(Node,Data){
           this.Node=Node;  
           this.Data = W.U.extend(Handler.Defaults,Data); 
           
           this.CreateStage();
           this.init();
       }
        Handler.Defaults={
        smallimages:[] , 
        bigimages:[],         
        id:'ZoomMobile'+W.U.uId()
        }

         Handler.prototype.init = function () {
           this.WalkWay=this.getwalkwayNode();
           this.setWhirligig();
           console.log(this);  


         }

         Handler.prototype.CreateStage = function () {
             var backheader= W.T.ActivityHeader({
     back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="'+this.Data.id+'" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'',
    RightLink:'',
    dropdown:Array()
    });;

             var F='<div class="block"></div><div class="block"></div><div class="block"><div class="block _bdy"><button type="button" class="btn btn-default btn-xs " data-openbtn="'+this.Data.id+'" data-btnid="B'+this.Data.id+'" >zoom</button></div></div>';
          
           var B=    W.T.wrap(backheader,'<div class="block" data-block="B'+this.Data.id+'"><div class="block"></div><div class="block"></div><div class="block"></div></div>');
var blockList=[F,B];
var blockName=['F'+this.Data.id,'B'+this.Data.id];
var setting ={
    name:this.Data.id,
    target:'F'+this.Data.id,
    page:true,
    minheight:'auto'
};
   
          var mainBlock=W.U.Rander(W.T.ToggleBlock(blockList, blockName,setting));

       

         W.U.Setview(this.Node,mainBlock,'html');

                }

// All Node point form block Node  after crateing state
       Handler.prototype.getwalkwayNode = function () {
                var FNode=W.U.id('block.F'+this.Data.id).childNodes;
                var BNode=W.U('[data-block="B'+this.Data.id+'"]',W.U.id('block.B'+this.Data.id))[0].childNodes;
                console.log(BNode);
              return {smallWhillgig:FNode[0],
              smallicon:FNode[1],
           bigWhillgig:BNode[1]};

                }

       Handler.prototype.setWhirligig=function(){
           var URL=W.U.URL;
           var limit=this.Data.smallimages.length;
           var smallImages=[]; var bigImages=[];
  for (var q = 0; q < limit; q++) {
  
  smallImages[q] = '<div class="block"  ><img class="img-responsive m0_auto" style="max-height:300px;"   style="  background:'+W.U.RandomBGColor() +';"  src="' + URL('')+ '/assets/imgs/pic/placeholder_loading.png" data-src="'+this.Data.smallimages[q]+'"  alt="image"></div>';

  bigImages[q] = '<div class="block"  ><img class="img-responsive m0_auto" style="  background:'+W.U.RandomBGColor() +';"  src="' + URL('')+ '/assets/imgs/pic/placeholder_loading.png"  data-src="'+ this.Data. bigimages[q]+'" alt="image"></div>';


     }


             var smallWhillgigSetting={
     items:smallImages,
     name:'Whirlgig_0',
      type:'Carousel',
      singleItem : true,
      pagination : true,
      control : true,
      cssClass:{0:'carousel-inner po-re bg_7 fg_4',1:'',2:''}
      
  };
          W.U.Whirlgig.bind({Node:this.WalkWay.smallWhillgig,Value:smallWhillgigSetting})();
        
              var bigImagesSetting={
     items: bigImages,
     name:'Whirlgig_1',
      type:'Carousel',
      singleItem : true,
      pagination : true,
      control : true,
      cssClass:{0:'carousel-inner po-re bg_7 fg_4',1:'',2:''}
      
  };
          W.U.Whirlgig.bind({Node:this.WalkWay.bigWhillgig,Value:bigImagesSetting})();      
           
       }



       new Handler(node,data);
   }



   W.U.ZoomMobile=ZoomMobile;


})(wowrol);