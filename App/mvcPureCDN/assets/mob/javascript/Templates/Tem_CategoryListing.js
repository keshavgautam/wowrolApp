; (function(W){
   "use strict";
var tem=(function(){
    var  kit={};
     var View=W.A.page.AppView,
     SBData=View.SBData;
var Productcard=function(x){
     var ch = '';

  for(var q in x ){
if(x[q].pvL[0]!=undefined){
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

 return ch; 
}

   //--CustomSorting block inner side
    var cf0 = function (x) {//CustomSorting

        var ch = '';

        for (var q in x) {


            ch += '<div class="block "> <div class="block"><div class="block _bdy bg_7 tt-c fw-b "> ' + x[q][0].name + ' </div> <div class="block ov-au bg_0" style="max-height: 250px; "><div class="block ul cl_f-l"> ' + cf00(x[q]) + '</div> </div></div> </div>';
        }


        return ch;


    };

    var cf00 = function (x) {
        var t1 = '';
        for (var q in x) {
          
            t1 += '<div class="li"> <span class="checkbox"><label><input type="checkbox" name="filterli" data-filterli=\'' + JSON.stringify(x[q]) + '\'  value="' + x[q].value + '"><span>' + x[q].value + '</span></label><i class="badge ">' + x[q].productcount + '</i></span> </div>';

        }


        return t1;


    };
    //--CustomSorting
     //--active Filter
     var af=function(){
         
     }

       //--price filter
    var pf = function (x) {

         var ch = '<div class="block "> <div class="block"><div class="block _bdy bg_7 tt-c fw-b "> Price </div> <div class="block ov-au bg_0" style="max-height: 250px; "><div class="block " ><div class="block "> <div class="block "><div class="block _bdy"> <input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;"><input type="hidden"  id="price" name="price" value="" ></div><div class="block _Bdy"><div  id="slider-range" class="block"></div></div></div></div></div></div></div> </div>';

                 return ch;


    }


    //--price filter
function filterStrip(x){
var ch='';//console.log(x);
ch+='<div class="block   td-n b_gbl"><div class="block ul ul-menu cl_tagsort">';
for(var q in x){
 
   ch+='<div class="li "><span class="label "><span class="span fg_1">'+q+'</span>';
for(var p in x[q]){
 var removefilter = JSON.stringify(Array(q, x[q][p]));
    if(q =='price'){
      ch+=' <span class="span fg_7">₹ ' + x[q][p].min + ' to   ₹ ' + x[q][p].max + '<i class="sclose"  data-removefilter=\'' + removefilter + '\' ></i></span>';    
    }else{
 ch+=' <span class=" span fg_7">'+x[q][p]+'<i class="sclose"  data-removefilter=\'' + removefilter + '\' ></i></span>';    
    }
 
   }
   ch+='</span> </div>'; 
}
ch+='</div ></div>';
return ch;
}



var filterblock=function(x){
     var ch  ='<div class="block ">'; //console.log(x);

      ch += '<div class="block bg_0"> <div class="left"> <div class="block _bdy fw-b">Refine Your Results</div></div><div class="right"><a href="javascript:void(0);" class="block _bdy fw-b" data-listingBtn="clear" ><span>Clear All Filters</span></a></div></div>';
  // active filter block
     ch += '<div class="block" data-nodeid="activefilterBlock">'+filterStrip(x.ifo.Afiatr)+'</div>';       
  //filter block
     ch += '<div class="block"><div class="w10">'+pf(x.ifo.Mfiatr.price)+cf0(x.ifo.Cfiatr)+'</div></div>';         
 //filter  block
     ch += '</div>';      
     return ch;
}

function initPage(x){
       
        var ch='';
      ch+='<div class=" block m_b10 "> <div class=" block _bdy al-c tt-u "><h2> '+x.cN+' </h2></div><div class=" block" data-nodeid="categorywalkway" style="margin-bottom: 100px;"><div class="block " ></div><div class="block " ></div><div class="block " ></div></div><div class="hide"><a href="javascript:void(0);" data-btnid="filter"   data-openbtn="CategoryListing" ></a></div></div>';

var filter = W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="CategoryListing" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><p class="fw-b al-c"><i class="material-icons"> </i><span class="vl-sp" >Filter</span></p></span>',
                done: '<div class="li b_gll"><a href="javascript:void(0);"  data-nodeid="CategoryFiltersubmit"      ><span>Apply</span><i class="badge _gbtn"></i> </a></div>'
            }),'<div class="block "  data-nodeid="CategoryFilterblock" >Form not found</div>');
 
          //--search
var blockList=[ch,filter];
var blockName=["listing","filter"];
var setting ={
    name:'CategoryListing',
    target:"listing",
    page:true,
    minheight:'auto'
};
    return W.T.ToggleBlock(blockList, blockName,setting);
    }
function setPage(x){
     //    console.log(x);
        var ch='<div class="block ">';
ch+='<div class=" block _bdy b_gbl  al-c Fw-b"><p>Showing About '+x.TData.tr+' Product(s)</p></div>';
      ch+='<div class="block td-n b_gbl fw-b m_b10 al-c" role="group" aria-label="..."> <a href="javascript:void(0);" class="w5 block _bdy bg_0" role="button" data-junction="categorySortBtn">Sort</a> <a href="javascript:void(0);" class="w5 block _bdy bg_0" data-junction="categoryFilterBtn"  role="button">Filter</a> <a href="javascript:void(0);" class="w2 block _bdy bg_0 tt-c"  data-junction="switchGrid" role="button">List</a > </div>';

ch+='<div class="block " style="display:none;"><div class="block ul ul-menu cl_sort td-n"><div class="li "> <a href="javascript:void(0);" data-sort_id="0" class="active">Fresh Arrivals</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="1">High Price</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="2">Low Price</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="3">Popularity</a></div><div class="li "> <a href="javascript:void(0);" data-sort_id="4">Bestsellers</a></div></div></div>';


 ch+='<div class="block G2  m_b10 bg_0" data-nodeid="categoryGrid" >'+Productcard(x.NewResult)+'</div>';
    W.U.JunctionAdd(W.A.page.AppId,'switchGrid',function(){
    this.Node.onclick=function(){
  var Node=this;
   var categoryGrid=W.U.id('categoryGrid');
   if($(categoryGrid).hasClass( "G2" )){
       $(categoryGrid).removeClass("G2").addClass("G1");
    W.U.SetText(Node,'Grid','text');  
   }else{
     $(categoryGrid).removeClass("G1").addClass("G2");
     W.U.SetText(Node,'List','text');  
   }

  

    }
  },{});  
   W.U.JunctionAdd(W.A.page.AppId,'categoryFilterBtn',function(){
    this.Node.onclick= W.U.CategoryListing.ShowFilterBlock.bind(x);
  },{});  
   W.U.JunctionAdd(W.A.page.AppId,'categorySortBtn',function(){
    this.Node.onclick=function(){
  
        $('.cl_sort').parent().toggle();

  

    }
  },{});  

         ch+='</div>';
return ch;
    }
function appendPage(x){
    var ch='';

      if(x.pvL[0]!=undefined){
    var setting={};
    if(W.A.page.AppId=="checkins"){
var hasShortListed= W.U.StoreBrowsing.IsProductShortListed(x.pvL[0].pid);
       if( SBData.role==0){


         setting={addButtonstore:true,hasShortListed:hasShortListed};   
       }else{
         setting={addButtonbuyer:true,hasShortListed:hasShortListed};         
       }
    
    }
 ch+='<div class="block grid_gap bg_0" >'+W.T.C.C2_Prductcard(x,setting)+'</div>'; 
  }

        return ch;  


    }
function paging(){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="paging"  >Load More</button></div>';
        return ch;

    }
kit.initPage= initPage;
kit.setPage=setPage; 
kit.appendPage=appendPage ;
kit.filterblock=filterblock;
kit.filterStrip=filterStrip;
kit.paging=paging;
    return kit;
})();
 W.T.CategoryListing=tem;

   })(wowrol);