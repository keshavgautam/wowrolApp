/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   function pagecategorieseditbody(x){
         var ch='';




       var titleText='text_340'; var sublitText='text_171';
    if(x.cid!=0){
        titleText='text_341';  sublitText='text_241';
    }


   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});
 var ch='<div class="block ">';
  ch += '<div class="block  _bdy bg_0 bs-1"><div data-help="addstorecategory"></div>';

                    ch += '<div class="form-piece"> <label class="control-label" >Name<i >*</i></label> <input type="text" name="category_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.cN + '"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">The name is how it appears on your Store Menu.</p></div></div>';
        





    var selected={};    
 selected[x.pa.cid]={id:x.pa.cid,name: x.pa.cN}; 
            
  var dataselectbox={id:'selectcategory_0',
                                                 name:'category',
                                                           fireAfter:1,
                                                           pager:W.I.dp,
                                                           backblock:"categoriesedit",
                                                          TranseData:{},
                                                          selected: selected,
                                                          initSearchText:'most used',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'Select',
                                                             onselectCallback:function(){
                                                           },
                                                      onselectRemoveCallback:function(){
                                                      }
                                                                   };                

                 
 
    ch += '<div class="block m_b10 _bdy bs-1"><div class="form-piece"> <label  class="control-label"  >text_142</label> '+W.U.selectbox.set(dataselectbox)+' <div data-help="parent"></div></div></div>';

 ch+='<div class="form-piece"> <label class="checkbox" data-toggle="checkbox"> <input type="checkbox" name="is_default" value="0"><span class="checkbox__label">text_403</span> </label>  </div><div  data-help="login_form"></div>';

                    ch += '<div class="form-piece"> <label class="control-label" >Description</label> <textarea name="description" class="form-mold" rows="3"  placeholder="Description"  >' + x.description + '</textarea> <input type="hidden" name="cid" value="' + x.cid + '"><input type="hidden" name="sid" value="' + x.sid + '"> <div data-help="description"></div></div>';

                        ch += '</div>';

      ch += '</div>';

         return   W.T.DashbordFormWrap(Header, ch);

     }

  
function Layout(){

    var ch='<div class="block">';
     var AddNewBtn={name:'text_324',attrStr:' data-pagerbtn="'+ W.I.dp+':categoriesedit:dc:0" '};

 function bodybuilder(Data){
  
    var PA='';

    if( Data.pa.cid!=''){
        PA='<span><a href="'+W.U.URL(Data.pa.slug)+'">'+Data.pa.cN+'</a></span>';
    }


return {
                            id: Data.cid,
                            name: Data.cN,
                            text_142: PA,
                            Data:Data
                        };
 }


 var Options={
title:'text_244',
name:'dashboard_categories',
description:'help_90',
headerbutton:[AddNewBtn],
Tablecolumn:['name','text_142'],
bodybuilder:bodybuilder 

 }
 var DashboardTable='<div class="block" data-junction="DashboardTablemob" ></div>';
 if(W.I.wf=="mob"){
ch+=DashboardTable;

   
 }

  if(W.I.wf=="web"){
var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:DashboardTable}],
    target:0,
    page:true,
    minheight:'auto'
};
 ch+=  W.T.Pager(setting);
   
 }

      ch+='</div>';

 W.U.Junction('DashboardTablemob',function(){

      W.U.DashboardTable.init(this.Node,Options);
             },{}); 

   return ch;
}

W.T.dashboardcategories={
    pagecategorieseditbody:pagecategorieseditbody,
    Layout:Layout
    };
 } )(wowrol);