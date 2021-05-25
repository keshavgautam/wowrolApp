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
 var ch='<div class="block  _bdy ">';
  ch += '<div class="block  _bdy bg_0 bs-1"><div data-help="addcompanycategories"></div>';

                    ch += '<div class="form-piece"> <label class="control-label" >Name<i >*</i></label> <input type="text" name="category_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.cN + '"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">The name is how it appears on your Store Menu.</p></div></div>';
                    var token='';
                    var suggestion = {
                        name: 'companycategory',
                        fireAfter: 4,
                        type: 2,
                        token: 'chips',
                        placeholder: 'Parent'
                    }; 
                    if(x.pa.cid!=''){
              token='<div class="li"><div class="token"> <span>' + x.pa.cN + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.pa.cid})  + '\' > </div></div>';
  token += '<div class="li hidden"><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>';
                    }else{
                  token='<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';    
                    }
                 

   ch += '<div class="form-piece"> <label class="control-label">Parent</label> <div class="form-token block" data-junction="categorysuggestion0"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div></div>';
                    W.U.JunctionAdd(W.A.page.AppId, 'categorysuggestion0', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  

                    ch += '<div class="form-piece"> <label class="control-label" >Description</label> <textarea name="description" class="form-mold" rows="3"  placeholder="Description"  >' + x.description + '</textarea> <input type="hidden" name="cid" value="' + x.cid + '"><input type="hidden" name="sid" value="' + x.sid + '"> <div data-help="description"></div></div>';

                        ch += '</div>';

      ch += '</div>';

         return   W.T.DashbordFormWrap(Header, ch);

     }

  
function Layout(){

    var ch='<div class="block">';
     var AddNewBtn={name:'text_324',attrStr:' data-pagerbtn="'+ W.I.dp+':categoriesedit:dcc:0" '};

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
name:'dashboard_companycategories',
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

W.T.dashboardcompanycategories={
    pagecategorieseditbody:pagecategorieseditbody,
    Layout:Layout
    };
 } )(wowrol);