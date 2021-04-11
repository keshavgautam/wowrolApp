/*
* 
*/
; (function(W){
   "use strict";
var tem= W.T.CategoryListing;
var TranseData={
          
                ifo: { Afiatr: {}, Cfiatr: {}, Mfiatr: {},Sort:'',cid: 0},  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 3,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };
var info={};
var walkway=null;
//--
  
    var View=W.A.page.AppView,
     SBData=View.SBData;
function render(result,bypass){
      var Args={NewResult:result,Info:info,TData:TranseData};
         if (bypass == 1) {
 
 var mainBlock=W.U.Rander(tem.setPage(Args));




                   } else {
 
 var mainBlock=W.U.Rander(tem.appendPage(result));

                        }

W.U.attrclick('[data-sort_id]',mainBlock[0],ApplySort);
//add button

W.U.attrclick('[data-addsortlist]',mainBlock[0],addsortlist);
W.U.attrclick('[data-addsuggest]',mainBlock[0],addsuggest);

 if(W.A.page.AppId=="checkins"){
  W.U.attrclick('[role="checkinmenu"]',mainBlock[0],W.U.CheckInStoreBrowser.OnCheckInMenuClick);
 }

 return mainBlock;
}
function InsertInPage(result,bypass){
  
    var Args={NewResult:result,Info:info,TData:TranseData};

             if (bypass == 1) {
 
     var mainBlock=render(result,bypass);

 W.U.Setview( W.U.CategoryListing.walkway,mainBlock,'html');

                   } else {
                      
             for(var q in result){
   var mainBlock=render(result[q],bypass);
      W.U.Setview(W.U.id('categoryGrid'),mainBlock, 'append');            
              }

      
     
                        }

} 

function addsortlist(){
var Productid=this['data-addsortlist'];

 W.U.StoreBrowsing.AddInShortList(Productid,1,this,function(){});   
}
function addsuggest(){
var Productid=this['data-addsuggest'];
 W.U.StoreBrowsing.AddInSuggestion(Productid,1,this,function(){});
}


function LoadData(){
        var Tdata=TranseData;    
        Tdata.ifo.Afiatr=TranseData.ifo.Afiatr;
      console.log('category  LoadData start');
       var LoadingBlock=(Tdata.bypass==1)?W.U.CategoryListing.walkway:W.U.CategoryListing.walkwayLoading;
     console.log((Tdata.bypass == 5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp));
   if((Tdata.bypass == 5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
      
      var form = 'paging',
     f_value = { name: 'categoryListing', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
                 TranseData.fr = 1;
                        // console.log(T)
                $(LoadingBlock).html( W.T.blockLoading());
                     
                    },
                    success: function (data) {
                 $(LoadingBlock).html('');
        TranseData.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
   var Hret = ret.mistake;
                   //     console.log(Hret);

                        }
                        if (ret.state == 200) {
                var Hret = ret.response;
           
            console.log('category LoadData');
               Tdata.ifo.Cfiatr=Hret.customFilter;
              Tdata.ifo.Mfiatr=Hret.mainFilter;
               Tdata.ifo.Sort=Hret.Sort;
             
                if(typeof(Hret.ActiveFilter.length)=='undefined'){
                  Tdata.ifo.Afiatr=Hret.ActiveFilter;
                }
             
                //Afiatr: Hret.ActiveFilter
        Tdata.slcid= Hret.selectedid,  //selected id
              Tdata.sstr= Hret.searchstr,  //search str
               Tdata. ps=  Hret.pagesize,  //pagesize
           Tdata.tp= Hret.totalpage,  //total page
              Tdata.tr= Hret.totalresult,  //total page
           Tdata.pgd=  Hret.paged   //paged
          
var Product= Tdata.result;

Product=  Product.concat(Hret.result);

 Tdata.result=Product;

 InsertInPage(Hret.result,Tdata.bypass);
         SetPaging();              
                        }
                        
                    }

                });
         
}
        }
  //init jquery in price slider after  insert 
 function slider(x) {
        $("#slider-range").slider({
            range: true,
            min: x.min,
            max: x.max,
            values: [x.min, x.max],
            slide: function (event, ui) {
                var rng = {};
                rng.min = ui.values[0]; rng.max = ui.values[1];
                $("#price").val(JSON.stringify(rng));
                $("#amount").val(" ₹ " + ui.values[0] + " -  ₹ " + ui.values[1]);

            },
            change: function( event, ui ) {
        TranseData.ifo.Mfiatr.price={min:ui.values[0],max:ui.values[1]};
      onPriceChange();
            }
        });
        $("#amount").val(" ₹ " + $("#slider-range").slider("values", 0) +
      " - ₹ " + $("#slider-range").slider("values", 1));

    }
    //-->>
function ShowFilterBlock(){
  var x=this;


var filterBlock=W.U.Rander(tem.filterblock(x.TData));

W.U.attrclick('[data-listingBtn="clear"]',filterBlock[0],clearFilter);

W.U.attrclick('[data-filterli]',filterBlock[0],onfilterliclick);
  W.U.attrclick('[data-removefilter]',filterBlock[0],onRemoveActivefilter);
W.U.id('CategoryFiltersubmit').onclick=ApplyFilter;
 W.U.Setview(W.U.id('CategoryFilterblock'),filterBlock,'html');


       slider(x.TData.ifo.Mfiatr.price);//init  price slider


 var event = jQuery.Event("show");
                event.id = 'filter';
     $(W.U.id('block.filter')).parent().triggerHandler(event);

    }

function ApplySort(){
    var Id=this['data-sort_id'];
      TranseData.ifo.sort=Id;
   TranseData.bypass = 1;
   TranseData.pgd = 0;
      LoadData();
}
function ApplyFilter(){
  

    TranseData.bypass = 1;
   TranseData.pgd = 0;
    var event = jQuery.Event("hide");
                event.id = 'filter';
     $(W.U.id('block.filter')).parent().triggerHandler(event); 

        LoadData();
}
function clearFilter(){
   
    TranseData.ifo.Afiatr={};
  TranseData.bypass = 1;
   TranseData.pgd = 0;
       var event = jQuery.Event("hide");
                event.id = 'filter';
     $(W.U.id('block.filter')).parent().triggerHandler(event); 
      LoadData();
}
function onfilterliclick(){
   var attrValue=JSON.parse(this['data-filterli']);
   var checkbox=this;
 var obn=attrValue.name;
   var obv=attrValue.value;  // console.log(TranseData.ifo);
   if(typeof (obn)!='undefined'&&typeof (obv)!='undefined'&&this.checked == true){
      if(!TranseData.ifo.Afiatr.hasOwnProperty(obn)){
     var newValue={};
        newValue[obn]=[obv];
        W.U.extend(TranseData.ifo.Afiatr,newValue);
   }else{
      
      innerUpdate();
   }  
   }else{
        innerUpdate();
   }
  
 onfilterUpdate();

 function innerUpdate(){
      var has=0,Value=  TranseData.ifo.Afiatr[obn],index=0;
    
       for(var q in Value){
           if(Value[q]==obv){
            has=1;index=q;
            break;   
           }
    
       }
       if(has==0){
       Value.push(obv);    
       }else{
           Value.splice(index,1); 
       }


       if(Value.length==0){
          delete(TranseData.ifo.Afiatr[obn]);
       }
 }
}  
function onPriceChange(){
    var obn='price';
   var obv=TranseData.ifo.Mfiatr.price;  
    TranseData.ifo.Afiatr[obn]=[obv];


                    
onfilterUpdate();
}

function onfilterUpdate(){

    var activefilterBlock=W.U.id('activefilterBlock');
  var filterStrip=W.U.Rander(tem.filterStrip(TranseData.ifo.Afiatr));

  W.U.attrclick('[data-removefilter]',filterStrip[0],onRemoveActivefilter);
   W.U.Setview(activefilterBlock,filterStrip,'html');
}

function onRemoveActivefilter(){
      var attrValue=JSON.parse(this['data-removefilter']);
      var Af=TranseData.ifo.Afiatr;
      var index_q=0,index_p=0,match=0;
      for(var q in Af){
       for(var p in Af[q]){
           if(attrValue[0]!='price'){
          if((q==attrValue[0])&&(Af[q][p]==attrValue[1])){
            
             index_q=q; index_p=p;match++;
          }

          }else{
             delete(TranseData.ifo.Afiatr[attrValue[0]]);  
          }
      }   
      }
    //  console.log(attrValue);
    //  console.log( Af[index_q]);    console.log( Af);
   //   console.log( index_q); console.log(index_p);
   //   console.log(TranseData.ifo.Afiatr[index_q]);

      if(match>0){
  TranseData.ifo.Afiatr[index_q].splice(index_p,1); 
          if( Af[index_q].length==0){
           delete(TranseData.ifo.Afiatr[index_q]);
          }
      }
      TranseData.bypass = 1;
   TranseData.pgd = 0;
    var event = jQuery.Event("hide");
                event.id = 'filter';
     $(W.U.id('block.filter')).parent().triggerHandler(event); 

        LoadData();

}

//---
function init(x,walkway){
     console.log('category init');
     var Node=getwalkwayNode(walkway);
 W.U.CategoryListing.walkway=Node.main;
 W.U.CategoryListing.walkwaypaging=Node.paging;
 W.U.CategoryListing.walkwayLoading=Node.Loading;
 info =x;
  TranseData.pgd=1;
    TranseData.tp=1;
     TranseData.ifo.Afiatr = {};
  TranseData.ifo.cid = x.cid;
   TranseData.bypass = 1;
        LoadData();

  
}
function getwalkwayNode(walkway){
    var Node=walkway.childNodes;
  
    return {main:Node[0],
            Loading:Node[1],
            paging:Node[2]};
}
function SetPaging(){
    var Node= W.U.CategoryListing.walkwaypaging;

 if((TranseData.pgd <= TranseData.tp)&&TranseData.pgd!=0){

  var mainBlock=W.U.Rander(W.T.CategoryListing.paging());

    W.U.attrclick('[data-paging]',mainBlock[0],function(){
      
      
       TranseData.bypass = 5; 
         LoadData();
    });
    W.U.Setview( Node,mainBlock,'html');
 }else{
     W.U.Setview( Node,'','html');
 }
  
}




 W.U.CategoryListing={
walkway:walkway,
 TranseData:TranseData,
 init:init,
 ShowFilterBlock:ShowFilterBlock,
 ApplyFilter:ApplyFilter

   };


})(wowrol);