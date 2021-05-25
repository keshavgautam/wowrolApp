; (function(W){
   "use strict";
/*
*/

function defaultitem (){
           var item = {
                              
id:W.U.uId(),
item_sid:W.U.uId(),
label:"label",
parent:null,
parent_sid:"",
slug:"",
term:"term",
type:""

                            };
return  W.U.clone(item);
}
  
 function CreateTree(Menu,d){
     var family=[];
    
     for(var q in Menu){
        
        if(Menu[q].parent==d){
         var parent=  Menu[q].id; 
         var item=Menu[q];
       Menu.slice(q,1);
       

         family.push({id:item,children:CreateTree(Menu,parent)});

        } 

     }

  //   // W.U.console(family); // W.U.console(d);
     return family;
 }
//---------
function AddMenuItem(x){}

/*
*/
function ArrangeItem(){}
/*

*/
  function ArrangeMenu(InputCol,ArrangeCol,Data) {
   

      function Handler(InputCol,ArrangeCol,Data){
    this.ArrangeCol=ArrangeCol;
    this.InputCol=InputCol;
    this.SavedMenu=Data.menu;
    this.Unsaved=0;
    this.Menu=Data.menu;
    this.edit_history=Data.eh;
     this.TemplateNode=this.initTemplate();

  

    this.init();
}
Handler.prototype.init=function(){
   this.setcomponent('inputsuggestion');
   this.setcomponent('sortingmenu');
     this.ApplyNestable();

    // W.U.console(  this);   
}
Handler.prototype.setcomponent=function(name){
    var _this=this;
    switch (name){
       case 'inputsuggestion':

   W.U.AttachDom(  this.TemplateNode.inputsuggestioncategory, W.T.dashboardmenu.i(), 'html',function(){
        
       W.U.attrclick('[data-btn="suggestioncategory"]',this.mainBlock[0],_this.AddCategoryToMenu.bind(_this));
   });
  W.U.AttachDom(  this.TemplateNode.inputsuggestionproduct, W.T.dashboardmenu.p(), 'html',function(){
     
       W.U.attrclick('[data-btn="productsuggestion"]',this.mainBlock[0],_this.AddProductToMenu.bind(_this));
   });
       break; 
  case 'sortingmenu':
  //  W.U.console(this.Menu);
  W.U.AddDom(this.TemplateNode.sortingmenu, W.T.dashboardmenu.sortingmenu(ParseMenu(CreateTree(this.Menu,null),0)), 'html');

  break;
    case 'addNewSortingRow':
  // W.U.console(this.addNewSortingRow);
    //this.Menu=   this.Menu.concat(this.addNewSortingRow);
     W.U.console(this.Menu);
    this.Menu=   this.addNewSortingRow.concat(this.Menu);
        W.U.console(this.Menu);
  this.setcomponent('sortingmenu');
  this.ApplyNestable();
W.F.Toast({msg: W.U.GetText('Items have been added to  menu'),theme:'',duration:2000});
  this.UnsavedNoti();
  break;

    }

   
//--
  function onliremove(){
  var _thisLi=this._this;

var Node=_thisLi.Node;
     $(Node).remove();
    _this.SaveMenu();
       _this.UnsavedNoti();

 }
  function onlichange(){
var _thisLi=this._this;

var NewValue=W.U.SafeText(_thisLi.input.value);
var MenuLi=_thisLi.MenuLi;

if(NewValue!=''){
 MenuLi.label=NewValue;
 var  Lilabel=W.U('[data-lilable="'+MenuLi.id+'"]',this.Node)[0];
 Lilabel.innerHTML=MenuLi.label;
   _this.UnsavedNoti();

 }
 // W.U.console(NewValue);
 }


  function LiJunction(){
      var MenuLi=this.MenuLi;
      var Node=this.Node;
   this.RemoveBtn=W.U('[data-liRemove="'+MenuLi.id+'"]',this.Node)[0];
   this.input=W.U('[type="text"]',this.Node)[0];

  this.RemoveBtn.onclick=onliremove.bind({_this:this});
  this.input.oninput=onlichange.bind({_this:this});
  }
//---
function ParseMenu(Menu,d){
    var ch=''; 
 //W.U.console(Menu);
switch(d){
   case 0 :
     for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<li   id="menuItem_'+Item.id+'" data-sid="'+Item.item_sid+'" class="li bs-1 " data-junction="menuItem_'+Item.id+'"  > '; 
    ch+=W.T.dashboardmenu.liStrip(Item);
    ch+=ParseMenu(Menu[q].children,1);
    ch+='</li>';

     W.U.Junction('menuItem_'+Item.id,function(){
  // W.U.console(this);
LiJunction.bind({Node:this.Node,_this:_this,MenuLi:this.data})();


  },Item); 
    
   
}
   break;
   case 1:
   if(Menu.length > 0){
      ch+='<ol>';
      for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<li   id="menuItem_'+Item.id+'" data-sid="'+Item.item_sid+'" class="li bs-1  " data-junction="menuItem_'+Item.id+'"  > '; 
   ch+=W.T.dashboardmenu.liStrip(Item);
      ch+=ParseMenu(Menu[q].children,1);
    ch+='</li>';
     W.U.Junction('menuItem_'+Item.id,function(){
   
LiJunction.bind({Node:this.Node,_this:_this,MenuLi:this.data})();


  },Item); 
    
   
}
      
     ch+='</ol>';     
   }
   break;
}



  return ch;
 }  

  

}


Handler.prototype.initTemplate=function(){
     
     var  ArrangemainBlock=W.U.Rander( W.T.dashboardmenu.Arrange());
    var   InputMarkupmainBlock=W.U.Rander(W.T.dashboardmenu.Input());

    var TemplateNode={
        sortingmenu:W.U('#sortingmenu',ArrangemainBlock[0])[0],
       inputsuggestioncategory:W.U('#inputsuggestioncategory',InputMarkupmainBlock[0])[0],
      inputsuggestionproduct:W.U('#inputsuggestionproduct',InputMarkupmainBlock[0])[0],
        UnsavedNotifition:W.U('#UnsavedNotifition',ArrangemainBlock[0])[0],
          } ;
 
   
     W.U.attrclick('[ data-btn="savemenuorder" ]',ArrangemainBlock[0],this.SaveMenuOrder.bind(this));

   W.U.Setview( this.ArrangeCol,ArrangemainBlock, 'html');
  W.U.Setview( this.InputCol, InputMarkupmainBlock, 'html');
       return TemplateNode;

}

Handler.prototype.AddProductToMenu=function(){
  var f_value=[],all_value = W.F.walk_way_all('*', "inputsuggestionproduct"),
      error=3, alert_mes = [];
      W.U.console(all_value);
     for(var  q in all_value){
          
          if(all_value[q].name=='productsuggestion'){
        var TermData= W.U.intentdata.get(all_value[q].value);
            
              if(W.U.isOK(TermData)){
               
              var item= TermData;
            item.type="product";
       item.label=item.name;
            item.parent=null;
            item.parent_sid='';
            item.item_sid=TermData.id;
             item.id=W.U.uId();
          f_value.push(item );   
              }

          }
      }

       this.addNewSortingRow=f_value; 

      this.setcomponent('addNewSortingRow');
    this.setcomponent('inputsuggestion');

}
Handler.prototype.AddCategoryToMenu=function(){
   
       var  f_value=[],all_value = W.F.walk_way_all('*', "inputsuggestioncategory"),
      error=3, alert_mes = [];
      for(var  q in all_value){
          
          if(all_value[q].name=='category'){
    W.U.console(all_value[q].value);
              var TermData= W.U.intentdata.get(all_value[q].value);
               W.U.console(TermData);
              if(W.U.isOK(TermData)){
               
              var item= TermData;
            item.type="category";
            item.label=item.name;
            item.parent=null;
            item.parent_sid='';
            item.item_sid=TermData.id;
             item.id=W.U.uId();
          f_value.push(item );   
              }
             
          }
      }

      this.addNewSortingRow=f_value;
    
      this.setcomponent('addNewSortingRow');
       this.setcomponent('inputsuggestion');

}

Handler.prototype.ApplyNestable=function(x){
     var _this=this;
      $('ol.menusortof').nestedSortable({
            forcePlaceholderSize: true,
            handle: 'div',
            helper: 'clone',
            items: 'li',
            opacity: .6,
            placeholder: 'placeholder',
            revert: 250,
            tabSize: 25,
            tolerance: 'pointer',
            toleranceElement: '> div',
            maxLevels: 3,
            isTree: true,
            expandOnHover: 700,
            startCollapsed: false,
            change: function(){
         setTimeout(_this.SaveMenu.bind(_this), 1000);
               
            }
        });
 }
Handler.prototype.SaveMenu=function(){
   
      var menusort = $('ol.menusortof').nestedSortable('toArray');
    this.UnsavedNoti();
      // W.U.console(JSON.stringify(this.Menu));

  var GetMenuFromItemId=MenuFromItemId.bind(this.Menu);
      var q = 0;
      var Extend=[];
      var  menu=[];
        for (var i = 1; i < menusort.length; i++) {
            var menuRow={};
            menuRow.id =menusort[i].item_id;// W.F.json_scan('item_id', menusort[i]);
            menuRow.parent=menusort[i].parent_id;// W.F.json_scan('parent_id', menusort[i]);

            menuRow.label = $('#menuItem_' +   menuRow.id).find("input[type='text'][name='menu_name']").val();
            menuRow.item_sid = $('#menuItem_' +  menuRow.id).attr('data-sid');
       
            if (menuRow.parent != null) {
                menuRow.parent_sid = $('#menuItem_' + menuRow.parent).attr('data-sid');
            } else {
                menuRow.parent_sid = '';
            }
             
            menu.push(menuRow);
            q++;

        }
      
//var Extend=W.U.extend(this.Menu,menu);
 //W.U.console('toArray');
 //W.U.console( menusort); 
// W.U.console('menu');
 //W.U.console( menu);
var Extend=[];
   for(var p=0,q=0;p<menu.length;p++){
     var W_menu=GetMenuFromItemId(menu[p].id);

     if(W_menu!=null){
         menu[p].slug=W_menu.slug;
 menu[p].term=W_menu.term;
  menu[p].type=W_menu.type;
         Extend[q]= menu[p];
         q++;
     }
      
   }
   
   
 this.Menu=Extend;


    function MenuFromItemId(ItemId){
       var menu=this;var LiMenu=null;
        //W.U.console( menu);
         for(var p=0;p<menu.length;p++){
       if(menu[p].id==ItemId){
           LiMenu=menu[p];
           break;
       }
      
   }

        return LiMenu;
   } 
 }
 Handler.prototype.UnsavedNoti=function(){
          var ch='<div class="block m_b10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">help_69</div></div>'; 
      
      W.U.AddDom( this.TemplateNode.UnsavedNotifition, ch, 'html');
          

          
      }

Handler.prototype.SaveMenuOrder=function(){
  var _this= this;
  this.SaveMenu();
   var _thisMennu=this.Menu;W.U.console(_this.Menu);
     var form = 'AddStoreMenu',help=W.U('[data-help="' + form + '"]')[0];
     var  f_value = { menu: JSON.stringify( this.Menu) }
 var formData = {
                    form: form,
                    f_value: f_value
                };

   W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                        W.U.madianLoading("show");

                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                            W.U.madianLoading("hide");
        var AlertError =  W.T.AlertError({message:ret.mistake.message});
             W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 
   W.F.Toast({msg:AlertError,theme:'error',duration:2000});
                        }
                        if (ret.state == 200) {
W.U.console(_thisMennu);
                        _this.Menu=_thisMennu;//prevent bug being empty
W.U.console(_this.Menu);
                            W.U.madianLoading("hide");

   //    _this.init.bind(_this)();                      
   

                        }

   W.U.AddDom( _this.TemplateNode.UnsavedNotifition, '', 'html');
  W.F.Toast({msg: W.U.GetText('Menu Structure saved'),theme:'',duration:2000});                  }

                });

  
  
  

}

new Handler(InputCol,ArrangeCol,Data);
  }



   function init(InputCol,ArrangeCol,x){


       ArrangeMenu(InputCol,ArrangeCol,x);
   }


   W.U.dashboardmenu={
      init:init
   };


   })(wowrol);