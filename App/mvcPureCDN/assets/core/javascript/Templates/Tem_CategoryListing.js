; (function(W){
   "use strict";

   var Productcard=function(x){
     var ch = '';
     var SBData=W.U.StoreBrowsing.hi_SBdata();
     if(x.length>0){
  for(var q in x ){
if(W.U.isOK(x[q].pvL[0])){
    var setting={};
    if(W.A.page.AppId=="checkins"){
var hasShortListed= W.U.StoreBrowsing.IsProductShortListed(x[q].pvL[0].pid);
       if( SBData.role==0){


         setting={addButtonstore:true,hasShortListed:hasShortListed};   
       }else{
         setting={addButtonbuyer:true,hasShortListed:hasShortListed};         
       }
    
    }
 ch+='<div class="block grid_gap bg_0" >'+W.T.C.C2_Prductcard(x[q],setting)+'</div>'; 
 }
    }
    }else{
        
 ch+=W.T.RNF_banner({}); 
    }
 return ch; 
}




   var S={
   t0:function(x){



       return Productcard(x);

   },
   t1:function(x){//category button block
       var ch='';
     
         ch+='<div class=" block ">';
       ch+='<div class=" block _bdy   al-c Fw-b"><p>Showing About '+x.tr+' Product(s)</p></div>';

    if(W.I.wf=='mob'|| W.I.initType==2){
           ch+='<div class="block td-n  fw-b m_b10 al-c" role="group" aria-label="...">  <a href="javascript:void(0);" class="w5 block _bdy bg_0"  role="button" data-pagerbtn="'+W.I.checkinPager+':categoryfilter:categoryfilter:tdata" >text_162</a> <a href="javascript:void(0);" class="w2 block _bdy bg_0 tt-c" data-btngrid="0"  data-nodeid="btngrid" role="button">List</a > </div>';
    }
  if(W.I.wf=='web'){
          ch+='<div class="block td-n  fw-b m_b10 al-c" role="group" aria-label="..."> <a href="javascript:void(0);" class="w2 block _bdy bg_0 tt-c" data-btngrid="0" data-nodeid="btngrid" role="button">List</a > </div>';
    }

          ch+='<div class="block " ><div class="block ul ul-menu cl_sort td-n"><div class="li "> <a href="javascript:void(0);" data-sort_id="0" class="active">Fresh Arrivals</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="1">High Price</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="2">Low Price</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="3">Popularity</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="4">Bestsellers</a></div></div></div>';  
 ch+='</div>'; 
       return ch;

   },      
   t2:function (x){//category filrer block
       var ch='<div class="block m_t10" data-junction="categoryfilter"></div>';
       return ch;
   },
   t3:function(x){//mobFilterPage
    var ch='<div class="block" data-junction="categoryfilter"></div>';
    return ch;
   }

   };
  
 
function Layout(x){
    var ch='',colone,coltwo;
var wf=(W.I.AppId!='checkins')?W.I.wf:'mob';


    if(wf=='mob'){
   ch+='<div class="block  " >';
ch+='<div class="block   m_b10" >'+ W.T.BreadCrumb(x)+'</div>';
       ch+='<div class=" block m_b10 "> <div class=" block _bdy al-c tt-u "><h2> '+x.cN+' </h2></div><div class=" block" data-nodeid="categorybuttonblock" ></div><div class=" block" data-junction="categorypaging" ></div></div>';

     ch+='</div >';
    }
    if(wf=='web'){
      colone='<div class="block" data-nodeid="categoryTree" ></div><div class="block" data-nodeid="filterblock" ></div>'; 
      coltwo= '<div class=" block m_b10"> <div class=" block _bdy al-c tt-u"><h2> '+x.cN+'  </h2></div><div class=" block" data-nodeid="categorybuttonblock" ></div><div  data-nodeid="categoryactivefilter" ></div><div class="block   m_b10 bg_" data-junction="categorypaging" ></div></div>';

ch+='<div class="block    m_b10" >'+ W.T.BreadCrumb(x)+'</div>';
     ch+=W.T.ColumnWrapXXX([colone,coltwo],['w-x-6','w-x-18']);
    }


    W.U.Junction('categorypaging',function(){
   var PagingData=  W.U.CategoryListing.PagingData;
   PagingData. TranseData.ifo.cid=x.cid;
   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);



  },x); 


    return ch;
}



 W.T.CategoryListing={
  Layout:Layout,
  S:S
 };

   })(wowrol);