; (function(W){
   "use strict";


 var S={
 Arrange:function (){
        var ch = '<div class="block  bg_0">'
 +'<div class="block   _bdy"><h3 style="margin-top: 3px;">Menu Structure</h3><div class="block "><p class="block _bdy fg_4 fs-italic fs11">help_91</p></div></div>'
 +'<div class="block">'
  +'<div class=" block " id="UnsavedNotifition"></div>'
 +'<div class="block _bdy"><div class="right"><button type="submit" class="rbtn gobtn btn-xs" data-btn="savemenuorder" >text_143</button></div></div>'
 +'<div class="block w210 _bdy" id="sortingmenu"></div>'
 +'<div class="block _bdy"><div class="right"><button type="submit" class="rbtn gobtn btn-xs" data-btn="savemenuorder" >text_143</button></div></div>'
 +'</div>'
  +'</div>';
  return ch;
   } ,
 Input:function(){
      var ch = '<div class="block  m_b10 ">'
 +'<div class="block " id="inputsuggestioncategory"></div>'
 +'<div class="block " id="inputsuggestionproduct"></div>'
 +'</div>';  
 return ch;
 } , 
 i:function(){

 var dataselectbox={
                                                 name: 'category',
                                                           fireAfter:2,
                                                           pager:W.I.dp,
                                                           backblock:"blockFront",
                                                          TranseData:{},
                                                          initSearchText:'',
                                                            type:1,
                                                            token:'chips',
                                                            placeholder:'Search category',
                                                             onselectCallback:function(){ },
                                                      onselectRemoveCallback:function(){}
                                                                   }; 
    var ch=''


+ '<div class="li  "   data-collapse="demo" >'
  + '<div class="block _bdy bg_7 "><span class=" block w10 fw-b fs13 _bdy"">text_144</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="demo"  ></a></span></div></div>'
 + '<div class="block _bdy bg_0" data-collapseblock="demo"  >'
+'<form  name="inputsuggestioncategory" onsubmit="return false">'
 +'<div class="block li _bdy bg_0 "><div class="form-piece">'+W.U.selectbox.set(dataselectbox)+'</div></div>'
 +'<div class="block _bdy "><div class="right"><button type="submit" class="btn "  data-btn="suggestioncategory" >text_148</button></div></div>'
 +'</form >'
+'</div>';



    return ch; 
 } ,  
 p:function(){

 var dataselectbox={
                                                 name: 'productsuggestion',
                                                           fireAfter:2,
                                                           pager:W.I.dp,
                                                           backblock:"blockFront",
                                                          TranseData:{},
                                                          initSearchText:'',
                                                            type:1,
                                                            token:'chips',
                                                            placeholder:'Search Product',
                                                             onselectCallback:function(){ },
                                                      onselectRemoveCallback:function(){}
                                                                   };  

    var ch=''


+ '<div class="li  "   data-collapse="demo" >'
  + '<div class="block _bdy bg_7 "><span class=" block w10 fw-b fs13 _bdy">text_145</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="demo"  ></a></span></div></div>'
 + '<div class="block _bdy bg_0" data-collapseblock="demo"  >'
+'<form  name="inputsuggestionproduct" onsubmit="return false">'
 +'<div class="block li  _bdy bg_0 "><div class="form-piece">'+W.U.selectbox.set(dataselectbox)+'</div></div>'
 +'<div class="block _bdy "><div class="right"><button type="submit" class="btn " data-btn="productsuggestion" >text_148</button></div></div>'
  +'</form >'
+'</div>';



    return ch;   
 } ,
 sortingmenu:function(x){
     var ch='<ol  class="block ul menusortof"  >'+x+'</ol>';

    

     return ch;
 },
 liStrip:function(Menu){
      var ch='';
var menuItem='menuItem_'+Menu.id;
  

var block='<div class="block"> <div class="block m_b5"> <div class="form-peice "> <label class="control-label" >text_147</label> <input type="text" class="form-mold p_5 fm_sm" name="menu_name" autocomplete="off" value="' + Menu.label + '"  > </div></div><div class="block m_b5 truncate wbk"> <span class="fw-b fg_1 tt-c  ">' +Menu.type + '</span> <span class="fw-b fg_4 tt-c ">' + Menu.term + '</span> </div><div class="block m_b5 ul ul-menu "> <div class="li"><a href="javascript:void(0);"  class="btn-link p_5 fs12" data-liRemove="'+Menu.id+'" >text_146</a></div></div></div>';

   ch+='<div class="block" data-collapse="menu'+Menu.id+'" ><div class="block  cp_menu_strip bs-4 "><span class=" block w10 _bdy truncate " data-lilable="'+Menu.id+'">'+Menu.label+'</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="menu'+Menu.id+'"  ></a></span></div></div><div class="block _bdy bg_0" data-collapseblock="menu'+Menu.id+'"  >'+block+'</div></div>';



  

    

   
 
    return ch;
  }
 };






   W.T.dashboardmenu=S;


   })(wowrol);