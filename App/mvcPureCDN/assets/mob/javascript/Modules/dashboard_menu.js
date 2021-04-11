/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
 




 var AddMenuItem=function(x){
var _this=this;


 var ch='<div class="block ul hover bg_0  ">';
 ch+='<div class="block li _B-gray _bdy bg_7 fw-b">Categories</div>';
  var suggestion = {
                        name: 'category',
                        fireAfter: 4,
                        type: 4,
                        token: 'chips',
                        placeholder: 'Search category',
                        onselect: onselect
                    }; 
 ch+='<div class="block li _B-gray _bdy bg_0 "><div class="form-piece"><div class="form-token block" data-junction="suggestion0"> <div class="block bd"><div class="block ul ul-menu"><div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="'+suggestion.placeholder+'"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div></div>';

                                                   
     W.U.JunctionAdd(W.A.page.AppId,'suggestion0',function(){
    W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion);  

 

  ch+='<div class="block li _B-gray _bdy bg_7 fw-b">Products</div>';


  var suggestion = {
                        name: 'productsuggestion',
                        fireAfter: 4,
                        type: 4,
                        token: 'chips',
                        placeholder: 'Search Product',
                        onselect: onselect
                        
                    }; 
 ch+='<div class="block li _B-gray _bdy bg_0 "><div class="form-piece"><div class="form-token block" data-junction="suggestion1"> <div class="block bd"><div class="block ul ul-menu"><div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="'+suggestion.placeholder+'"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div></div>';

                                                   
     W.U.JunctionAdd(W.A.page.AppId,'suggestion1',function(){
    W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion);  


 ch+='<div class="block li _B-gray _bdy bg_0 "><p class="t">Selected Item will be added to Arrange menu. To see them go back(Menu structure dashboard) and click on arrange menu.</p></div>';

  ch+='</div>';


  function onselect(){
      var type=this.suggestion.wrapdata.name;
      var slug=this.data.li_data.slug;
      var id=this.data.li_data.id;
      var name=this.data.name;
      switch(type){
          case 'productsuggestion':
          type='product';
          break;

      }



        var item = {
                                id: W.U.uId(),
                                item_sid: id,
                                slug: slug,
                                term: name,
                                label: name,
                                type: type,
                                parent: null,
                                parent_sid: ''


                            };

      _this.Menu.push(item);
   
     // // console.log(this);
     //  // console.log(_this);
       _this.init.bind(_this)();
           _this.UnsavedNoti();
  }


     return ch;
 }
 /*
      var item = {
                                id: W.U.uId(),
                                item_sid: id,
                                term: name,
                                label: name,
                                type: type,
                                parent: '',
                                parent_sid: ''


                            };
 */
var ArrangeItem=function(){
   
    var _this=this; 
   
    var Menu=CreateTree(_this.Menu,null);
      // console.log(Menu); // console.log(_this.Menu);
    var menusortof=W.U.id('menusortof');
    var MenuSubmit=W.U.id('menustructuresubmit');
   
    
   var ch='<ol  class="block ul menusortof"  >'+ParseMenu(Menu,0)+'</ol>';
   W.U.AddDom(menusortof,  ch, 'html');
   
 MenuSubmit.onclick=_this.submitMenu.bind(this);
  _this.ApplyNestable(menusortof);

  function createOnliStrip(Menu){
      var ch='';
var menuItem='menuItem_'+Menu.id;
  

var block='<div class="block"> <div class="block m_b5"> <div class="form-peice "> <label class="control-label" >Navigation Label</label> <input type="text" class="form-mold p_5 fm_sm" name="menu_name" autocomplete="off" value="' + Menu.label + '"  > </div></div><div class="block m_b5"> <span class="fw-b fg_1 tt-c">' +Menu.type + '</span> <span class="fw-b fg_4 tt-c">' + Menu.term + '</span> </div><div class="block m_b5 ul ul-menu "> <div class="li"><a href="javascript:void(0);"  class="btn-link p_5 fs12" data-liRemove="'+Menu.id+'" >Remove</a></div></div></div>';

   ch+='<div class="block" data-collapse="menu'+Menu.id+'" ><div class="block  cp_menu_strip"><span class=" block w10 _bdy" data-lilable="'+Menu.id+'">'+Menu.label+'</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="menu'+Menu.id+'"  ></a></span></div></div><div class="block _bdy bg_0" data-collapseblock="menu'+Menu.id+'"  >'+block+'</div></div>';



  

    

   
 
    return ch;
  }
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
 // console.log(NewValue);
 }


  function LiJunction(){
      var MenuLi=this.MenuLi;
      var Node=this.Node;
   this.RemoveBtn=W.U('[data-liRemove="'+MenuLi.id+'"]',this.Node)[0];
   this.input=W.U('[type="text"]',this.Node)[0];

  this.RemoveBtn.onclick=onliremove.bind({_this:this});
  this.input.oninput=onlichange.bind({_this:this});
  }


 function ParseMenu(Menu,d){
    var ch=''; 
  
switch(d){
   case 0 :
     for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<li   id="menuItem_'+Item.id+'" data-sid="'+Item.item_sid+'" class="li _B-gray " data-junction="menuItem_'+Item.id+'"  > '; 
    ch+=createOnliStrip(Item);
      ch+=ParseMenu(Menu[q].children,1);
    ch+='</li>';
     W.U.JunctionAdd(W.A.page.AppId,'menuItem_'+Item.id,function(){
   
LiJunction.bind({Node:this.Node,_this:_this,MenuLi:this.data})();


  },Item); 
    
   
}
   break;
   case 1:
   if(Menu.length > 0){
      ch+='<ol>';
      for(var q in Menu){
         var Item=Menu[q].id;
       
 ch+='<li   id="menuItem_'+Item.id+'" data-sid="'+Item.item_sid+'" class="li _B-gray " data-junction="menuItem_'+Item.id+'"  > '; 
    ch+=createOnliStrip(Item);
      ch+=ParseMenu(Menu[q].children,1);
    ch+='</li>';
     W.U.JunctionAdd(W.A.page.AppId,'menuItem_'+Item.id,function(){
   
LiJunction.bind({Node:this.Node,_this:_this,MenuLi:this.data})();


  },Item); 
    
   
}
      
     ch+='</ol>';     
   }
   break;
}



  return ch;
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

  //   // console.log(family); // console.log(d);
     return family;
 }


 }


var menu =function(x){
 


 
function Handler(wrap,Data){
    this.wrap=wrap;
    this.SavedMenu=Data.menu;
    this.Unsaved=0;
    this.Menu=Data.menu;
    this.edit_history=Data.eh;
    // console.log(  this.Menu);

    this.init();
}


Handler.prototype.init=function(){
    this.createMarkup();
 var tableMarkup = '<div class="block  bg_0">'+ this.header +this.AddMenuItem+this.ArrangeItem+'</div>';
       
 

        W.U.AddDom(this.wrap, tableMarkup, 'html');
        ArrangeItem.bind(this)();
}

Handler.prototype.createMarkup=function(){

   this.header=CreateHeader.bind(this)();
   this.AddMenuItem=CreateAddMenuItem.bind(this)();
   this.ArrangeItem=CreateArrangeItem.bind(this)();
   

   function CreateHeader(){
       var ch='<div class="block li _B-gray _bdy"><h3 style="margin-top: 3px;">Menu Structure</h3><div class="block "><p class="block _bdy fg_4 fs-italic fs11">menu Structure offer your favorite category,product link.</p></div></div>';



       return ch;
       
   }
   function CreateAddMenuItem(){
   var blockFront='<div class="li _B-gray _bdy"><a class="block " href="javascript:void(0);" data-openbtn="menustructureAddMenuItem" data-btnid="AddMenuItem"  > <span class="vl-sp fw-b">Add Item in menu</span> <span class="vl-sp right">' + W.T.SVG('nextarrow', 18, '#f1f5fc') + '</span></a><span class="di-in  fg_4 fs-italic fs11">Add an item into menu from category,product.</span></div>';

 var AddMenuItemWrap= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="menustructureAddMenuItem" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >AddMenuItem</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), AddMenuItem.bind(this)());
      
var blockList=[blockFront,AddMenuItemWrap];
var blockName=["blockFront","AddMenuItem"];
var setting ={
    name:'menustructureAddMenuItem',
    target:0,
    page:true,
    minheight:'auto'
};

  return W.T.ToggleBlock(blockList,blockName,setting);
   }
  
   function CreateArrangeItem(){
  var blockFront='<div class="li _B-gray _bdy"><a class="block " href="javascript:void(0);"   data-openbtn="menustructureArrangeItem" data-btnid="ArrangeItem"  > <span class="vl-sp fw-b">Arrange menu</span> <span class="vl-sp right">' + W.T.SVG('nextarrow', 18, '#f1f5fc') + '</span></a><span class="di-in  fg_4 fs-italic fs11">Drag each item into the order you prefer. Click the arrow on the right of the item to reveal additional configuration options.</span></div>';
  var menusortof='<div  class="block " ><div class="block" data-nodeall="UnsavedNoti" ></div><div  class="block " data-help="AddStoreMenu" ></div><div  class="block " data-nodeid="menusortof" ></div></div>';
 var ArrangeItemWrap= W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="menustructureArrangeItem" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><p class="fw-b al-c"><i class="material-icons"> </i><span class="vl-sp" >Arrange Menu</span></p></span>',
                done: '<div class="li b_gll"><a href="javascript:void(0);"  data-nodeid="menustructuresubmit"    ><span>Save</span><i class="badge _gbtn"></i> </a></div>'
            }), menusortof);
      
var blockList=[blockFront,ArrangeItemWrap];
var blockName=["blockFront","ArrangeItem"];
var setting ={
    name:'menustructureArrangeItem',
    target:0,
   page:true,
    minheight:'auto'
};

  return W.T.ToggleBlock(blockList,blockName,setting);
   }


}

Handler.prototype.SaveMenu=function(){
      var menusort = $('ol.menusortof').nestedSortable('toArray');
    this.UnsavedNoti();
      // console.log(JSON.stringify(this.Menu));

  var GetMenuFromItemId=MenuFromItemId.bind(this.Menu);
      var q = 0;
      var Extend=[];
      var  menu=[];
        for (var i = 1; i < menusort.length; i++) {
            var menuRow={};
            menuRow.id = W.F.json_scan('item_id', menusort[i]);
            menuRow.parent= W.F.json_scan('parent_id', menusort[i]);

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
 // console.log('toArray');
 // console.log(menu); 
  // console.log('this.Menu');
  // console.log(this.Menu);
 
   
   for(var p=0,q=0;p<menu.length;p++){
     var W_menu=GetMenuFromItemId(menu[p].id);

     if(W_menu!=null){
         Extend[q]=W.U.extend(W_menu,menu[p]);
         q++;
     }
      
   }
 this.Menu=Extend;
  // console.log('Extend');
  // console.log(this.Menu);
   function MenuFromItemId(ItemId){
       var menu=this;var LiMenu=null;
         for(var p=0;p<menu.length;p++){
       if(menu[p].id==ItemId){
           LiMenu=menu[p];
           break;
       }
      
   }

   return LiMenu;
   } 
 }

Handler.prototype.onMenuEdit=function(){
     // console.log('Menu edit');
     // console.log(this);
     this.SaveMenu();
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
Handler.prototype.submitMenu=function(){
  var _this= this;
      var Extend=this.SavedMenu;
     var form = 'AddStoreMenu',help=W.U('[data-help="' + form + '"]')[0];
     var  f_value = { menu: JSON.stringify(Extend) }
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

                        }
                        if (ret.state == 200) {

                            $(W.U.id('appModal')).modal('hide');

                            W.U.madianLoading("hide");

       _this.init.bind(_this)();                      


                        }
                    }

                });

  
  
  

}

Handler.prototype.UnsavedNoti=function(){
          var ch='<div class="block m_b10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">To save permanently this edit ,click save.</div></div>'; 
          var Ids=W.U('class-UnsavedNoti');
       console.log(Ids);
          for(var q=0 ;q<Ids.length;q++){
              
   W.U.AddDom(Ids[q], ch, 'html');
          }
   
        

          
      }

   new Handler(W.U.id('MenuStructure'),x);

}

   
var Madian=function(x){
       var ch='',blockFront='';
   var header= W.T.C.C3_storehomeheader(x);
   var footer=W.T.Footer({});;
   //--EntityStrip datab

     ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   
 
ch+= '<div class="block m_b10" data-nodeid="MenuStructure" ></div>';






   $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
        menu(x.store_menu);
    });



ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';
 //--search



        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);
//--blockFront

var drawer= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Drawer</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.T.C.C1_drawer_HomePageStore(x));
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Alert</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.C4_hederAlertStore(x));
//-search
var search= W.T.C.C5_SearchDrawer();


     //--learn more
var learnMore=  W.U.LearnMorewrap;







//--search
var blockList=[blockFront,drawer,hederAlert,search,learnMore];
var blockName=["blockFront","drawer","hederAlert","search","learnMore"];

var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};

 ch+=   W.T.ToggleBlock(blockList, blockName,setting);
       return ch;
  
   }

     W.M[W.A.page.AppId]=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };
   


  

 } )(wowrol);