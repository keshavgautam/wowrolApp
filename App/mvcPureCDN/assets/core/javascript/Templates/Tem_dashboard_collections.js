/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   function pagecategorieseditbody(x){
         var ch='';




       var titleText='Add New Collection'; var sublitText='Add';
    if(x.cid!=0){
        titleText='Edit Category';  sublitText='Update';
    }


   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});
 var ch='<div class="block  _bdy ">';
           ch += '<div class="block  _bdy bg_0 bs-1"><div data-help="addstorecollection"></div>';

                    ch += '<div class="form-piece"> <label class="control-label" >Name<i >*</i></label> <input type="text" name="collection_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.cN + '"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">The name is how it appears on your Store Menu.</p></div></div>';
                    var selected={};
                  
                    if(x.pa.cid!=''){
        
  selected[x.pa.cid]={id:x.pa.cid,name:x.pa.cN};
                    }
                 

      var dataselectbox={ 
                                                            name:'allcollection',
                                                            fireAfter:2,
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'Search Parent ...',
                                                            selected:selected,
                                                            pagerblock:'collectionedit'
                                                                   };
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,dataselectbox);

ch+='<div class="form-piece"> <label class="control-label">Parent</label> <div data-selectbox="'+dataKey+'"> </div></div>';



                    ch += '<div class="form-piece"> <label class="control-label" >IconSvg<i >*</i></label> <input type="text" name="svg_icon" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.is + '"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">The Svg Icon </p></div></div>';   
                    
                    

    var datalocation={Task:0,
    Data:{
    main:{address:'',
    landmark:'',
    phone:''},
   other:{address:'',
    landmark:'',
    phone:''},
    town:{id:0,name:''},
    city:{id:0,name:''},
    state:{id:0,name:''},
    country:{id:0,name:''}    
    }
    };
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,datalocation);


//ch+='<div class="block" data-location="'+dataKey+'" ></div>';                    
                    
                    
                   
                 ch += '<div class="form-piece"> <label class="control-label" >Description</label> <textarea name="description" class="form-mold" rows="3"  placeholder="Description"  >' + x.des + '</textarea> <input type="hidden" name="cid" value="' + x.cid + '"><div data-help="description"></div></div>';

                        ch += '</div>';

      ch += '</div>';

         return   W.T.DashbordFormWrap(Header, ch);

     }

  
function Layout(){

    var ch='<div class="block">';
     var AddNewBtn={name:'text_324',attrStr:' data-pagerbtn="'+ W.I.dp+':collectionedit:collection:0" '};

 function bodybuilder(Data){
   
return {
                            id: Data.cid,
                            name: Data.cN,
                            parent: '',
                            country: '',
                            icon: Data.is,
                            Data:Data
                        };
 }


 var Options={
title:'Collections',
name:'dashboard_collections',
description:'collection are arrangement for the products.',
headerbutton:[AddNewBtn],
Tablecolumn:['name','parent','country','icon'],
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

W.T.dashboardcollections={
    pagecategorieseditbody:pagecategorieseditbody,
    Layout:Layout
    };
 } )(wowrol);