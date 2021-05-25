 ;(function (W) {
     "use strict";
var menuRol='';
function ToggleMenu(){
    var ul =$(this).parentsUntil('.li','.strip').next();
// W.U.console(ul);
    ul.toggleClass('in');
    if(ul.hasClass('in')){
        $(this).html(W.T.SVG('uparrow', 18, '#f1f5fc'));
    }else{
           $(this).html(W.T.SVG('nextarrow', 18, '#f1f5fc')); 
    }
    


}
function HasMenu(Haschild){
   var ch='';
   if(Haschild>0){
       var Uid=W.U.uId();
     ch='<span class="vl-sp right " ><button class="btn btn-xs btn-link" type="button" data-junction="menuItem_'+Uid+'">' + W.T.SVG('nextarrow', 18, '#f1f5fc') + '</button></span>';  
  W.U.JunctionAdd(W.A.page.AppId,'menuItem_'+Uid,function(){
   
this.Node.onclick=ToggleMenu;


  },{}); 



   }
   
   return ch; 
}

function menuStrip(Item,Haschild){
 var URl =W.U.URL('');
 if(Haschild>0){
   var ch='<div class="block strip td-n"><div class="w10 ov-hi"><a  href="'+URl+Item.slug+'" class="block _bdy" role="'+menuRol+'"  >'+Item.label+'</a></div><div class="w2 block _bdy">'+HasMenu(Haschild)+'</div></div>' ;  
 }else{
     var ch='<div class="block strip td-n"><div class="w12"><a  href="'+URl+Item.slug+'" class="block _bdy" role="'+menuRol+'" >'+Item.label+'</a></div></div>' ;  
 }
  
 
    return ch;
    
}
function ParseMenu(Menu,d){
   
    var ch=''; 
   var child=[];
 var Haschild=0;
 if(W.U.isOK(Menu)){
     
 
switch(d){
   case 0 :
   
ch+='<div class="block ul main_menu"  >';
     for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<div     class="li "   > '; 
child=Menu[q].children;
 Haschild=child.length;


 ch+=menuStrip(Item,Haschild);
      ch+=ParseMenu(child,1);
    ch+='</div >';
   
    
   
}
ch+='</div>';
   break;
   case 1:
   if(Menu.length > 0){
      ch+='<div class="block ul    fade collapse"  >';
      for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<div    class="li  "   > '; 
 child=Menu[q].children;
 Haschild=child.length;

 ch+=menuStrip(Item,Haschild);
      ch+=ParseMenu( child,1);
    ch+='</div >';
  
    
   
}
      
     ch+='</div>';     
   }
   break;
   case 2:
   if(Menu.length > 0){
      ch+='<div class="block ul  fade collapse"  >';
      for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<div    class="li  "   > '; 
  child=Menu[q].children;
  Haschild=child.length;

 ch+=menuStrip(Item,Haschild);
      ch+=ParseMenu( child,1);
    ch+='</div >';
  
    
   
}
      
     ch+='</div>';     
   }
   break;
}
}


  return ch;
 }
  



var t={
    t0:function(x){

  var Menu=W.U.CreateTree(x,null);

  
    var ch= '<div class="block bg_0">'+ParseMenu(Menu,0)+'</div>';
    
        return ch;

    },
    t1:function(x){
        menuRol='checkinmenu';
      return t.t0(x);
    }
};


function StoreMenuPage(block){
    var storemenu=block.objectdata; 



var Header =W.T.ActivityHeader({back:'<a href="javascript:void(0);" data-pagerbtn="mainpage:blockFront"  class="block header-link-btn" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
  
 Title: '<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >StoreMenu</h2> </a>',


  RightLink:'<div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn" ></a></div>',
    dropdown:Array()
    });

var ch=W.T.C.StoreMenu(storemenu);
    return W.T.wrap(Header, ch);
}
    



W.T.C.StoreMenu=t.t0;
W.T.C.StoreCheckInMenu=t.t1;

W.T.C.StoreMenuPage=StoreMenuPage;
 })(wowrol);