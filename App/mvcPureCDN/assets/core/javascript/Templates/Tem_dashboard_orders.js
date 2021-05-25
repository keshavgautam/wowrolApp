/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
  var Status= ['To be shipped', 'Dispatched', 'Pending', 'Ready to Collect','Cancelled by buyer','Cancelled by store','Delivered','Failed','To be return','To be replace','Cancelled return/replacement',' returned',' replaced','Completed with Good shopping experience','Completed with Bad shopping experience'];
  var Type= ['home delivery', 'self collect', 'inquiry', 'booking'];
   

  
function Layout(){

    var ch='<div class="block">';
  var FilterBtn={name:'text_101',attrStr:' data-pagerbtn="'+W.I.dp+':orderfilter:do:TranseData" '};

 function bodybuilder(Data){
    
return {
                            id: Data.oid,
                            information: W.T.dashboardorders.information(Data),
                            text_157: 'order_'+Data.oid,
                            text_158: W.T.dashboardorders.status(Data),
                            text_149: Data.date
                        };
 }


 var TranseData={
          
                ifo: {AppId:W.A.page.AppId, Afiatr: {}, Mfiatr: {},Cfiatr:{} },  //info
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
//--
 var Options={
title:'text_19',
name:'dashboard_orders',
description:'help_58',
headerbutton:[FilterBtn],
Tablecolumn:['information','text_157','text_158','text_149'],
bodybuilder:bodybuilder,
TranseData:TranseData 

 };



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





 var S={
     information:function(x){  var URL=W.U.URL;
      var d_type = 'Via Home Delivery';
        var p_type = 'via Cash on Delivery';
        if (x.type == 1) { d_type = 'Via Self Collect'; p_type = 'via Cash on Collection'; }
var total=x.currency+' '+(x.total).toFixed(2);
 var moredata=[];
 moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');
 moredata.push('<span class="span fg_0">Ordered</span>');
   moredata.push('<div class="block ma-l-4"><span class="fs13">'+W.T.SVG('cart',14,'#1274c0')+' '+total+'  <small>'+p_type+'</small> </span ></div>');
   moredata.push('<div class="block ma-l-4"> <span class="fs13">'+W.T.SVG('Shippping',14,'#1274c0')+' <small> '+d_type+'</small> </span></div>');
  moredata.push('<div class="block _bdy "> <div class="ul ul-menu"> <div class="li "><a href="'+URL('')+'orderdetails?id='+x.oid+'" role="linkbutton" >View item details </a></div></div></div>');

var ch='<div class="block">'+W.T.C.C2_EntityStrip(x.bESd,{moredata:moredata})+'</div>';  
      return ch;
         
     },
     status:function(x){
     var choices = [0, 1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14];

     var ch='<span class="fw-b tt-c">'+Status[x.status]+'</span>&nbsp;&nbsp;&nbsp;<span class=""><a href="javascript:void(0);"  data-pagerbtn="'+W.I.dp+':orderchangestatus:do:'+x.oid+'"  ><span>Change</span></a></span>';

   

     return ch;

    },
      Layout:Layout



     };





  W.T.dashboardorders=S;

 } )(wowrol);