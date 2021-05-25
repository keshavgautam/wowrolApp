/*
* 
*/
; (function(W){
   "use strict";
  //--paginging 
     var PagingData={
 showsearch:true,
   onsucess:function(_this){
    

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=render(result,bypass);
 


      _this.DomInsert(walkWay,mainBlock,bypass,result);

    if(bypass==1){
         
         categorybuttonblock(_this.Data.TranseData);


          W.U.Junction('categoryfilter',function(){
     
 W.U.filter.init(this.Node,this.data);
  },{
    TranseData:_this.Data.TranseData,
    LoadData:function(TranseData){

       W.U.console(TranseData); 
         TranseData.bypass = 1;   TranseData.pgd = 1; 
           if(  TranseData.tp == 0 ){
     TranseData.tp=1;
   }
         W.U.paging.load('categoryListing',TranseData);

     if(W.I.initType!=3){//toggle block
     
  W.U.Pager.togglePage(W.I.checkinPager,W.I.checkinblockFront);   
         }
             
    },
    name:'categorylistingfilter',
    pager:W.I.checkinPager,
    backblock:W.I.checkinblockFront
    
    });    

     if(W.I.initType==3){//see W.U.browsing
         setFilters();
    }
      if( W.I.initType!=3){//see W.U.browsing
 W.U.intentdata.add('categoryfilter.tdata',{ });//dummy data to help init mob filter page
  W.U.Pager.addblockdata(mobFilterPage);
         }
updateSortTab( _this.Data.TranseData.ifo.Sort);
    }
     //
     
    
  },
  TranseData:{ ifo: { Afiatr: {}, Cfiatr: {}, Mfiatr: {},Sort:'',cid: 0}},
  initent:'categoryListing'
 

  };
 /*
  */
 function render(result,bypass){
var mainBlock=W.U.Rander('<div>'+W.T.CategoryListing.S.t0(result)+'</div>');



W.U.attrclick('[data-addsortlist]',mainBlock[0],addsortlist);
W.U.attrclick('[data-addsuggest]',mainBlock[0],addsuggest);

 return mainBlock;
}

function addsortlist(){
var Productid=this['data-addsortlist'];

 W.U.Browsing.AddInShortList(Productid,1,this,function(){});   
}
function addsuggest(){
var Productid=this['data-addsuggest'];
 W.U.Browsing.AddInSuggestion(Productid,1,this,function(){});
}

  /*
  */
 function categorybuttonblock(TranseData){
var mainBlock=W.U.Rander(W.T.CategoryListing.S.t1(TranseData));

  W.U.attrclick('[data-sort_id]',mainBlock[0],ApplySort);
  W.U.attrclick('[data-btngrid]',mainBlock[0],function(){ChangeGrid(true);});
  W.U.Setview( W.U.id('categorybuttonblock'),mainBlock,'html');
  ChangeGrid(false);
}
 /*
  */
function setFilters(){
    var mainBlock=W.U.Rander(W.T.CategoryListing.S.t2());
  
      W.U.Setview(    W.U.id('filterblock'),mainBlock,'html');
}
//--Sort
 function ApplySort(){
        var Id=this['data-sort_id'];  
   var TranseData = W.U.paging.GetTranseData('categoryListing');
    //W.U.console(TranseData);
   
   TranseData.ifo.Sort=Id;
   TranseData.bypass = 1; 
   TranseData.pgd = 0;    
 
 W.U.paging.load('categoryListing',TranseData);

  }
  function updateSortTab(x) {
      
       
         setTimeout(function(){
    var LiNodes=$('.cl_sort').children();
         LiNodes.each(function (i) {
         
         
            if (i == x) {
                $(this).find('a').addClass('active');
            } else {
               $(this).find('a').removeClass('active');
            }


        });   
        
         
         }, 100);

    }
function ChangeGrid(ischange){
var GridData=[{class:'G1',name:'List'},{class:'G2',name:'Grid'}];
if(W.I.wf=="web"){
  GridData=[{class:'G1',name:'List'},{class:'G2',name:'Grid'},{class:'G3',name:'Grid-1'},{class:'G4',name:'Grid-2'}];  
}

    var grid_id=0,length=(GridData.length-1);
grid_id=(!W.U.isOK(W.I.categorygrid_id))?((W.I.wf=="web")?3:1):W.I.categorygrid_id;
   
var olddata=GridData[grid_id];

if(ischange){
   grid_id++;
grid_id=(grid_id>length)?0:grid_id; 
W.I.categorygrid_id=grid_id;
}

var newdata=GridData[grid_id];
debugger;
//debugger;
 var TemplateNode=   W.U.paging.GetNode('categoryListing');
  var categoryGrid= TemplateNode.main;
     $(categoryGrid).removeClass(olddata.class).addClass(newdata.class);
    W.U.SetText(W.U.id('btngrid'),newdata.name,'text');  

}

//--
 //--mob filter page

  var mobFilterPage={   
   name:'categoryfilter',
   htmlStr:W.T.CategoryListing.S.t3
   };

 //--mob filter page
  /*
  */
  function initPage(){
      
   var TranseData = W.U.paging.GetTranseData('categoryListing');
    //W.U.console(TranseData);
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
 W.U.paging.load('categoryListing',TranseData);

  }

  /*
  */
  function init(x,walkway){


 var mainBlock=W.U.Rander(W.T.CategoryListing.Layout(x));
 W.U.Setview(walkway,mainBlock,'html');

 initPage();
  }





 W.U.CategoryListing={
PagingData:PagingData,
init:init
   };


})(wowrol);