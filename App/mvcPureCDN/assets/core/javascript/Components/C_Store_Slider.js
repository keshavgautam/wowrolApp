;(function (W) {
     "use strict";
function FindSliderImage(data){
    var img='';
       if(W.U.isOK(data.mainimages)){
      if(W.U.isOK(data.mainimages[0])){
        img=data.mainimages[0].url;
    }
    }
      if(W.U.isOK(data.webimages)){
    if(W.U.isOK(data.webimages[0])){
        img=data.webimages[0].url;
    }
    }
    if(img!=''){
           var imageData={ file: img,
                width: 800,
                height: 280,
                type: 'slider'
            };
           img = W.U.loadImage(imageData);
    }else{
          img = W.I.PRODUCT_PLACEHOLDER;
    }
    return img;
}


function StoreSlider(x){
     var ch='';
     
     if(W.U.isOK(x)){
         
    

var width=function(){ 
    var w=$('#page').find('.main_pane ').width();
       if(W.I.initType==0||W.I.initType==1){
   w=w-40;
       }
      if(W.I.initType==3){
          if(w<1000){
               w=800; 
          }else{
               w=800; 
          }
       
          
      }
        if(W.I.initType==2){
         w=500; 
       
          
      }
     return   w;
      
      
       }

var items = [];  
  for (var q = 0; q < x.length; q++) {
    var img= FindSliderImage(x[q]);

     
    items[q] = '<div class="block"  > <div class="block"  ><a href="'+W.U.URL(x[q].linkto.slug)+'"  ><img class="img-responsive m0_auto" src="' +  W.I.PRODUCT_PLACEHOLDER+ '" data-src="'+img+'"alt="slide image"></a></div></div>';
     }
  
  var setting={
     items:items,
     name:'SliderWhirlgig',
      type:'Carousel',
      singleItem : true,
      pagination : true,
    ContainerSize:[width(),300],
      control : true,
      cssClass:{0:'carousel-inner po-re ',1:'',2:''}
      
  };



var Jid=W.U.J(function(){
    
     W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();

},setting);

if(items.length>0){
 ch='<div class="block m0_auto slider-img"  style="width:'+width()+'px;" data-junction="'+Jid+'" ></div>';  
}
 }

return ch;
}









W.T.C.StoreSlider=StoreSlider;

 })(wowrol);