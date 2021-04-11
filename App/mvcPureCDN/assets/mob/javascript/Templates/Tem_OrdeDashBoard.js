/*
* 
*/
; (function(W){
   "use strict";
     //--CustomSorting block inner side
 var Status= ['Processing', 'Pending', 'Cancelled', 'Completed', 'Failed', 'Dispatched', 'Ready to Collect'];
  var Type= ['home delivery', 'self collect', 'inquiry', 'booking'];

function mainf (x){
    var ch='';


 
   return mf0(x[1])+ mf1(x[0]);
}

    var mf0 = function (x) {//CustomSorting

        var ch = '';
         ch += '<div class="block "> <div class="block"><div class="block _bdy bg_7 tt-c fw-b "> Status </div> <div class="block ov-au bg_0" style="max-height: 250px; "><div class="block ul cl_f-l"> '  ;
    for (var q in x) {
          
            ch += '<div class="li"> <span class="checkbox"><label><input type="checkbox" name="filterli" data-filterli=\'' + JSON.stringify(x[q]) + '\'  value="' + x[q].value + '"><span>' +  Status[x[q].value] + '</span></label><i class="badge ">' + x[q].count + '</i></span> </div>';

        }
 ch +='</div> </div></div> </div>';
        return ch;


    };
    var mf1 = function (x) {//CustomSorting
     var ch = '';
         ch += '<div class="block "> <div class="block"><div class="block _bdy bg_7 tt-c fw-b "> Type </div> <div class="block ov-au bg_0" style="max-height: 250px; "><div class="block ul cl_f-l"> '  ;
    for (var q in x) {
          
      ch += '<div class="li"> <span class="checkbox"><label><input type="checkbox" name="filterli" data-filterli=\'' + JSON.stringify(x[q]) + '\'  value="' + x[q].value + '"><span>' +  Type[x[q].value] + '</span></label><i class="badge ">' + x[q].count + '</i></span> </div>';

        }
 ch +='</div> </div></div> </div>';
        return ch;


    };
    var mf2 = function (from,to) {//CustomSorting//mf2(x.ifo.Mfiatr.fromDate,x.ifo.Mfiatr.toDate)+'
     var ch = '';
         ch += '<div class="block "> <div class="block"><div class="block _bdy bg_7 tt-c fw-b ">Date </div> <div class="block ov-au bg_0" style="max-height: 250px; "><div class="block ul cl_f-l"> '  ;
ch+='<div class="form-piece block _bdy"> <label class="control-label">From</label> <div class="block " data-junction="fromdate" ></div></div>';

ch+='<div class="form-piece block _bdy"> <label class="control-label">To</label> <div class="block " data-junction="todate" ></div></div>';

 ch +='</div> </div></div> </div>';


  W.U.JunctionAdd(W.A.page.AppId,'fromdate',function(){
            $(this.Node).date_fill(this.data);
        },{selected:from[1]+","+from[0]+","+from[2],class:"form-mold  w4 ",name:"fromdate_"}); 
         
  W.U.JunctionAdd(W.A.page.AppId,'todate',function(){
            $(this.Node).date_fill(this.data);
  },{selected:to[1]+","+to[0]+","+to[2],class:"form-mold  w4 ",name:"todate_"});  

        return ch;


    };

  


       //--price filter
function filterStrip(x){
var ch='';//console.log(x);
ch+='<div class="block   td-n b_gbl"><div class="block ul ul-menu cl_tagsort">';
for(var q in x){
 
   ch+='<div class="li "><span class="label "><span class="span fg_1">'+q+'</span>';
for(var p in x[q]){
 var removefilter = JSON.stringify(Array(q, x[q][p]));
  
 
    switch(q){
     case 'status':
      ch+=' <span class=" span fg_7">'+Status[x[q][p]]+'<i class="sclose"  data-removefilter=\'' + removefilter + '\' ></i></span>';   
     break; 
   case 'type':
      ch+=' <span class=" span fg_7">'+Type[x[q][p]]+'<i class="sclose"  data-removefilter=\'' + removefilter + '\' ></i></span>';   
     break;    
    }


   }
   ch+='</span> </div>'; 
}
ch+='</div ></div>';
return ch;
}



 function Layout(){
   var header='<div class="block b_gtl b_grl b_gll _bdy "> <div class="block "> <div class="left"> <h3 style="margin-top: 3px;">Orders</h3> </div><div class="right"><a href="javascript:void(0);" class="btn btn-xs btn-primary" data-filterbtn="orders"  >Filter orders</a></div></div><div class="block "> <p class="block _bdy fg_4 fs-italic fs11">Orders on your store</p></div></div>';
    
 var front='<div class="block"><div class="hide"><a class="hide" data-openbtn="OrdeDashBoard" data-btnid="back"  ></a></div>'+header+'<div class="block" data-nodeid="OrdeDashBoardfront" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>';

 var back=W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="OrdeDashBoard" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><span class="fw-b al-c tt-c"><span class="vl-sp" data-jqid="OrdeDashBoardbackTitle" >View Spread</span></<span></span>',
                done: '<div class="li b_gll tt-c" ><a href="javascript:void(0);"  data-jqid="OrdeDashBoardbacksubmit" style="display:none;"  ><span>Spread</span><i class="badge _gbtn"></i> </a></div>'
            }),'<div class="block "  data-nodeid="OrdeDashBoardback" ></div>');
   
var blockList=[front,back];
var blockName=["OrdeDashBoardfront","OrdeDashBoardback"];
var setting ={
    name:'OrdeDashBoard',
    target:'OrdeDashBoardfront',
    page:true,
    minheight:'auto'
};
   
   return W.T.ToggleBlock(blockList, blockName,setting);
     
 }
 var S={
     information:function(x){
      var d_type = 'Via Home Delivery';
        var p_type = 'via Cash on Delivery';
        if (x.type == 1) { d_type = 'Via Self Collect'; p_type = 'via Cash on Collection'; }
var total=x.currency+' '+(x.total).toFixed(2);
 var moredata=[];
 moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');
 moredata.push('<span class="span fg_0">Ordered</span>');
   moredata.push('<div class="block ma-l-4"><span class="fs13">'+W.T.SVG('cart',14,'#1274c0')+' '+total+'  <small>'+p_type+'</small> </span ></div>');
   moredata.push('<div class="block ma-l-4"> <span class="fs13">'+W.T.SVG('Shippping',14,'#1274c0')+' <small> '+d_type+'</small> </span></div>');
  moredata.push('<div class="block _bdy "> <div class="ul ul-menu"> <div class="li "><a href="http://localhost:1234/dashboard-orders&amp;screen=a0&amp;oid=3&amp;order_type=1">View item details </a></div></div></div>');

var ch='<div class="block">'+W.T.C.C2_EntityStrip(x.bESd,{moredata:moredata})+'</div>';  
      return ch;
         
     },
     status:function(x){
     var choices = [0, 1, 2, 3, 4, 5, 6];
    
     var ch='<span class="fw-b tt-c">'+Status[x.status]+'</span>&nbsp;&nbsp;&nbsp;<span class=""><a href="javascript:void(0);" data-onorderchange="'+x.oid+'"  ><span>Change</span></a></span>';

   

     return ch;

    },
     Layout:Layout,
     filterBlock:function(x){
          var ch  ='<div class="block ">'; 

      ch += '<div class="block bg_0"> <div class="left"> <div class="block _bdy fw-b">Refine Your Results</div></div><div class="right"><a href="javascript:void(0);" class="block _bdy fw-b" data-listingBtn="clear" ><span>Clear All Filters</span></a></div></div>';
  // active filter block
     ch += '<div class="block" data-nodeid="activefilterBlock">'+filterStrip(x.ifo.Afiatr)+'</div>';       
  //filter block
     ch += '<div class="block"><div class="w10">'+mainf(x.ifo.Mfiatr)+'</div></div>';         
 //filter  block
     ch += '</div>';      
     return ch;
     },
     filterStrip:filterStrip
     };





 W.T.OrdeDashBoard=S;

})(wowrol);