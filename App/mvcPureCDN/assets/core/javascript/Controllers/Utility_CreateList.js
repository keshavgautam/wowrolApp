/*
* page set up 2
*/
; (function(W){
   "use strict";
function DefaultOptions(){ 
var data={subheader:''};
return W.U.clone(data); }
//--

function DefaultItem(){ 
var data={ItemType:'',//link|tile|html,
ItemData:{},
haschildren:false,
hasaction:false,
primaryaction:{},
secondaryaction:{}
};
return W.U.clone(data); }
//--------------
function DefaultLink(){ 
var data={
text:'',
icon:'',
iconSize:24,
href:'javascript:void(0);',
attrStr:'',
badge:'',
help:''
};
return W.U.clone(data); }

//--------------
function DefaultTile(){ 
var data={
text:'',
name:'',
avatar:'',
avatarSize:'x56',
href:'javascript:void(0);',
attrStr:'',
help:''
};
return W.U.clone(data); }
//--------------
function DefaultHTML(){ 
var data={
bodyhtml:''
};
return W.U.clone(data); }
//--------------
function DefaultButton(){
var data={
type:'',//Checkbox|Switch|radio
text:'',
icon:'',
iconsize:16,
value:'',
checked:'',
attrStr:'',
cssclass:'btn btn-link no-t-deco btn-xs',
};
return W.U.clone(data);  
}
//--------------
function DefaultCssClass(){
   var data={
ul:'block ul hover bg_0 ',
li:'li bs-1 _Bdy',
a:'block no-t-deco',
x_ul:'block ul hover bg_0 ',
x_li:'li bs-1 _Bdy',
x_a:'block',
text:'vl-sp fw-b tt-c fs14  ',
help:'vl-sp fw-b tt-c fs14  ',
textdiv:'di-td vl-m  _bdy w212 ',
icon:''


};
return W.U.clone(data); 
}
//--------------
function Getbutton(buttonObj){
    var ch='';

    for(var q in buttonObj){
        var buttonstr='';
var button=W.U.extend(DefaultButton(),buttonObj[q]);;
switch (button.type){
    case 'checkbox':
buttonstr='<label class="checkbox" data-toggle="checkbox" ><input type="checkbox" name="'+button.name+'" value="'+button.value+'" '+button.checked+' '+button.attrStr+'  ><span class="checkbox__label">'+button.text+'</span></label> ';
    break;
    case 'radio':
buttonstr='<label class="radio" data-toggle="radio" ><input type="radio" name="'+button.name+'" value="'+button.value+'" '+button.checked+' '+button.attrStr+'  ><span class="checkbox__label">'+button.text+'</span></label> ';
    break;
    case 'Switch':
buttonstr='';
    break;
    case 'icon':
buttonstr='<button  class="'+button.cssclass+'"    '+button.attrStr+'  >'+W.T.SVG(button.icon,button.iconsize,'#f1f5fc')+'</button>';
    break;
    default:
buttonstr='';
}

     ch+='<div class="di-td vl-t" >'
       + buttonstr   
      +'</div>';   
    }

    return ch;
}
//--------------
function GetStrip(Item,cssClassAll,depth){
    var ch='';var URL=W.U.URL;
    var cssClass={};
   
  switch( depth){

   default:
    cssClass={ul:cssClassAll.ul,
li:cssClassAll.li,
a:cssClassAll.a,
icon:cssClassAll.icon,
text:cssClassAll.text,
textdiv:cssClassAll.textdiv,
};
}
//--
var PrimaryButton=Getbutton(Item.primaryaction);
var secondaryButton=Getbutton(Item.secondaryaction);
var itemData=Item.ItemData;


switch (Item.ItemType){
    case 'link':
var badge=(itemData.badge=='')?'':'<div class="di-td vl-t _bdy">'+itemData.badge+'</div>';
var link='<a class="'+ cssClass.a+'" href="'+URL(itemData.href)+'"   '+itemData.attrStr+' ><div class="di-td _bdy">'+W.T.SVG(itemData.icon,itemData.iconSize,'#1274c0')+'</div><div class="'+ cssClass.textdiv+'"><div class="block '+ cssClass.text+'">'+itemData.text+'</div><div class="'+ cssClass.help+'">'+itemData.help+'</div></div>'+badge+'</a>';

if(PrimaryButton!=''||secondaryButton!=''){
     ch+='<div class="'+ cssClass.li+'">'
  +PrimaryButton


  +'<div class="di-td w212 vl-t">'+link+'</div>'

   +secondaryButton
  +'</div>';
}else{
         ch+='<div class="'+ cssClass.li+'">'
 +link
  +'</div>';
}

      break;
   case 'tile':
  ch+='<div class="'+ cssClass.li+'">'
  +PrimaryButton
  +'<div class="di-td w212"><a class="'+ cssClass.a+'" href="'+URL(itemData.href)+'"   '+itemData.attrStr+'  ><div class="block ">'
  +'<div class="di-td vl-t"><img class="'+itemData.avatarsize+' " alt="image" src="'+itemData.avatar+'" ></div><div class="di-td vl-t   w212 "><div class=" _pnl ma-l-5"><div class="'+ cssClass.text+'">'+itemData.text+'</div><div class="'+ cssClass.help+'" >'+itemData.help+'</div></div></div>'
 


  +'</div></a></div>'
   +secondaryButton
  +'</div>';

    break;

    case 'html':
    var ClassTD=(PrimaryButton!=''&&secondaryButton!='')?'di-td':'';
  ch+='<div class="'+ cssClass.li+'">'

   +PrimaryButton
  +'<div class="'+ClassTD+' w212" >'
  +itemData.bodyhtml
   
  +'</div>'
  +secondaryButton
  +'</div>';
    break;
    case 'info':
  ch+='<div class="'+ cssClass.li+'">'

   +PrimaryButton
 +itemData.bodyhtml
  +secondaryButton
  +'</div>';
    break;

}


    return ch;
     
}

//--------------
    //--
 function CreateList(Items,Options,depth){
   
Options=W.U.extend(DefaultOptions(),Options);
  depth=W.U.isOK(depth)?depth:0;
var cssClass=W.U.extend(DefaultCssClass(), Options.cssClass); 
for(var q in Items){
  Items[q]=W.U.extend(DefaultItem(),Items[q]);
  switch( Items[q].ItemType){
   case 'link':
   Items[q].ItemData=W.U.extend(DefaultLink(),   Items[q].ItemData);
   break;  
   case 'badgeLink':
   Items[q].ItemData=W.U.extend(DefaultbadgeLink(),   Items[q].ItemData);
   break; 
   case 'tile':
   Items[q].ItemData=W.U.extend(DefaultTile(),   Items[q].ItemData);
   
   break; 
   case 'html':
   Items[q].ItemData=W.U.extend(DefaultHTML(),   Items[q].ItemData);
Items[q].ItemData.bodyhtml=(W.U.isFunction(Items[q].ItemData.bodyhtml))?Items[q].ItemData.bodyhtml():Items[q].ItemData.bodyhtml;


   break; 

  }
}






//---------







     var Nav='';
   switch( depth){
 case 0:
   Nav='<div class="'+ cssClass.ul+'">';
    for(var i=0;i<Items.length;i++){
 Nav+=GetStrip(Items[i],cssClass,depth);
 
  }
  Nav+='</div >';
  //----------------------
   break;
   
}


//---------



return Nav;
        
 }











  W.U.CreateList= CreateList;

   })(wowrol);