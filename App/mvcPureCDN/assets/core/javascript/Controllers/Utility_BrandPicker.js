; (function(W){
   "use strict";

   function SitaRam(Node){
     function Handler(Node){
     this.Node=Node;  
     this.TemplateNode=this.initTemplate();
     this.brand=null;
     ;
     this.setcomponent('searchinput');
     this.setcomponent('category');
  }

  Handler.prototype={
   initTemplate:function(){
       var ch='<div>'
           +'<div class="block"  data-help="product_brand_copy" ></div>'
           +'<div class="block"  data-block="category" ></div>'
           +'<div class="block"  data-block="searchinput" ></div>'
           +'<div class="block"  data-block="varientchooser" ></div>'
           +'</div>';
            

      var mainBlock=W.U.Rander(ch);  
    var TemplateNode={
 category:W.U.getbyblockattr('[data-block="category"]',mainBlock[0]),
   searchinput:W.U.getbyblockattr('[data-block="searchinput"]',mainBlock[0]),
  varientchooser:W.U.getbyblockattr('[data-block="varientchooser"]',mainBlock[0])
          } ;

        W.U.Setview(this.Node,mainBlock, 'html');  
        
        return TemplateNode;   
      },
  setcomponent:function(name){
       switch(name){
           
     case 'searchinput':
       this.brand=null;
  var  mainBlock=W.U.Rander(W.T.BrandPicker.searchinput(this));
  W.U.Setview(this.TemplateNode.searchinput,mainBlock,'html');
     break;
  case 'varientchooser':
  var  mainBlock=W.U.Rander(W.T.BrandPicker.varientchooser(this));
  W.U.Setview(this.TemplateNode.varientchooser,mainBlock,'html');
     break;
  case 'category':

 var  mainBlock=W.U.Rander(W.T.BrandPicker.category(this));
  W.U.Setview(this.TemplateNode.category,mainBlock,'html');


  break;



       }


  } ,
  onBrandSelected:function(x){
 this.brand=x;

 this.setcomponent('varientchooser');


  },
  onBrandDeRemove:function(x){
       this.brand=null;

 this.setcomponent('varientchooser');
  }
       



  };    

   new Handler(Node);
   }






   function set(){
       var Jid=W.U.J(function(){   SitaRam(this.Node);  },{}); 
       
       
         
return '<div   data-junction="'+Jid+'" ></div>';
   }





   W.U.BrandPicker={
     set:set  

   };


   })(wowrol);