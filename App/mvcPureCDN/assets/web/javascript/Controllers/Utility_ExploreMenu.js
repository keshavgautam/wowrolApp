/*
* 
*/
; (function(W){
   "use strict";
 var URL=W.U.URL;var menuRol='';
 


function menuStrip(Item,Haschild){
 var URl =W.U.URL('');console.log(Item);
    var ch='<div class="block strip td-n"><div class="w12"><a  href="'+URl+Item.slug+'" class="block _bdy" role="'+menuRol+'" >'+Item.label+'</a></div></div>' ; 
  
 
    return ch;
    
}
 function GetTab(Menu){
     var Tab=[];

 for(var q in Menu){
   Tab[q]=Menu[q].id;
   
    
   
        }

return  Tab;

 }

 function GetContent(Menu,d){
   console.log(Menu); 
    var ch=''; 
   var child=[];
 var Haschild=0;
  if(W.U.isOK(Menu)){
switch(d){

   case 1:
   if(Menu.length > 0){
      ch+='<div class="block ul  ul-menu   "  >';
      for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<div    class="li  w3 ov-hi"   > '; 
child=W.U.isOK(Menu[q].children)?Menu[q].children:[];
 Haschild=child.length;

 ch+='<div class="block "><div class="w12 "><a  href="'+W.U.URL(Item.slug)+'" class="block _bdy tt-u fw-b ff_1 td-n truncate" role="'+menuRol+'" >'+Item.label+'</a></div></div>' ;
      ch+=GetContent(child,2);
    ch+='</div >';
  
    
   
}
      
     ch+='</div>';     
   }
   break;
   case 2:
   if(Menu.length > 0){
      ch+='<div class="block ul  "  >';
      for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<div    class="li  "   > '; 
child=W.U.isOK(Menu[q].children)?Menu[q].children:[];
  Haschild=child.length;

 ch+='<a  href="'+W.U.URL(Item.slug)+'" class="block _bdy bg_0 fg_4 ff_5 truncate" role="'+menuRol+'" >'+Item.label+'</a>';
      ch+=GetContent( child,2);
    ch+='</div >';
  
    
   
}
      
     ch+='</div>';     
   }
   break;
}

}

  return ch;
 }



  



//--
 function ExploreMenu(btn,dropdown,storemenu){
     function Handler(btn,dropdown,storemenu){
         this.btn=btn;
         this.dropdown=dropdown;
         this.storemenu=storemenu;

    W.U.DropDown(this.btn,{type:'webExploreMenu',   trigger: 'hover', Dropdown:this.dropdown});
    console.log(this);
     this.TemplateNode=this.initTemplate();

         this.init();  
     }
 Handler.prototype.init=function(){
   this.MenuTree=  W.U.CreateTree(this.storemenu,null);
   this.Tab=GetTab(this.MenuTree);
    this.ActiveTabIndex=0;
   this.setcomponent('Tab');
   this.setcomponent('Content');
    // console.log(this);

 }




  Handler.prototype.setcomponent=function(name){
   var ch='<div></div>'; var URl =W.U.URL('');var _this=this;
      switch(name){
          case 'Tab':
           ch = '<div class="block" data-junction="Whirlgig_ExploreMenu_Tab" ></div>';
   var items = [];
  for (var q = 0; q <  this.Tab.length; q++) {
         items[q] = '<a href="'+W.U.URL(this.Tab[q].slug)+'"    role="tab" ><span class="vl-sp">'+this.Tab[q].label+'</span></a>';

     }
  
  var setting={
     items:items,
       name:'Whirlgig_ExploreMenu_Tab',
      type:'tablist',
      cssClass:{0:' header-link bg_0 fg_4',1:'',2:''},
       itemWidth :100,
       isItemhover:true,
       onItemhover:function(){
        var index= this.state.activeIndex;
       _this.ActiveTabIndex=index;
       _this.setcomponent('Content');
         }
  };

   W.U.Junction( 'Whirlgig_ExploreMenu_Tab', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, setting);
      W.U.AddDom(this.TemplateNode.Tab, ch, 'html');

          break;
    case 'Content':
    var contentMenu=W.U.isOK(this.MenuTree[this.ActiveTabIndex])?this.MenuTree[this.ActiveTabIndex]:[];

    console.log(contentMenu);
     W.U.AddDom(this.TemplateNode. Content,GetContent(contentMenu.children,1), 'html');
     break;





      }


 }
  
 Handler.prototype.initTemplate=function(){
          var  mainBlock=W.U.Rander('<div class="block"><div class="block" data-block="ExploreMenuTab" ></div><div class="block"  data-block="ExploreMenuContent" ></div></div>');

        var TemplateNode={
        Tab:W.U('[data-block="ExploreMenuTab"]',mainBlock[0])[0],
       Content:W.U('[data-block="ExploreMenuContent"]',mainBlock[0])[0]
  
          } ;

  W.U.Setview(  this.dropdown, mainBlock, 'html');
       return TemplateNode;
 }

     new Handler(btn,dropdown,storemenu)
 }


 W.U.ExploreMenu=ExploreMenu;
})(wowrol);