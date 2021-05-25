/*
* page set up 2
*/


; (function (W) {
    "use strict";

/**
* @description  generate the  header
* @param  
*/
function WebHeader(x){
   /*
    {LeftButton:'',
    Title:'',
    searchText:''
    actiondropdown:{}
    }
   */
var LinkOptionForDropDown={
     cssClass:{ul:'block ul hover bg_0 fg_4 ff_3 fs13 bs-0', li:'li bs-1 ',text:'vl-sp  tt-c fs12  ',textdiv:'di-td vl-t  _Bdy w212 '}

 };

   var DefaultData={
   Login:false,
   Links:{CheckIn:true},
   searchText:'',
   actiondropdown:{}  
   };

var options= W.U.extend(DefaultData, x); 
    var URL=W.U.URL;
    var dropdown='';
  if(options.actiondropdown.length>0){
 dropdown+='<a href="javascript:void(0);" class="block web-header-link-btn dropdown-toggle" data-toggle="dropdown" >'+W.T.SVG('downarrow',24,'#f1f5fc')+' </a> <div class="hide po-ab" data-block="menu">';
 for(var q in options.actiondropdown){
     options.actiondropdown[q].iconSize=20;
 }
 dropdown+=W.U.CreateList(options.actiondropdown,LinkOptionForDropDown);
 dropdown+='</div > ';
  }
  var ch='';
 ch+='<div class="block bg_1 ad-3 "><div class="main_pane container">';

 ch+='<div class="w3"><a href="'+URL('')+'" class="block " ><span class="_ri2"></span></a> </div>';
 //--w9
 ch+='<div class=" w9"> <div class="block">';
  //--w4

 ch+='<div class="w4"> ';
   if(options.Login){
ch+='<div class="di-td "><a href="'+URL('')+'" class="block web-header-link-btn" title="Home" >'+W.T.SVG('home',24,'#f1f5fc')+'<i class="badge _gbtn"></i> </a> </div>';
 ch+='<div class="di-td "><a href="'+URL('notifications')+'" class="block web-header-link-btn" title="Notification" >'+W.T.SVG('alert',24,'#f1f5fc')+'<i class="badge _gbtn" data-fixedupdateragister="notialert" ></i> </a> </div>';

 ch+='<div class="di-td "><a href="'+URL('checkins')+'" class="block web-header-link-btn" title="CheckIns">'+W.T.SVG('checkIn',24,'#f1f5fc')+'<i class="badge _gbtn"  data-fixedupdateragister="checkinalert" ></i> </a> </div>';
 ch+='<div class="di-td "><a href="'+URL('messages')+'" class="block web-header-link-btn" title="Message">'+W.T.SVG('chats',24,'#f1f5fc')+'<i class="badge _gbtn"   data-fixedupdateragister="msgalert" ></i> </a> </div>';
  ch+='<div class="di-td"><a href="javascript:void(0);" class="block web-header-link-btn"  data-junction="refresh" title="Refresh"   >'+W.T.SVG('refresh',24,'#f1f5fc')+' </a></div>';

 }
 ch+='</div > ';
   //--w6
/*ch+='<div class="w6"><div class="search_bar"> <input type="text" class="form-mold" placeholder="Search for..."> <button class="btn " type="button">'+W.T.SVG('search',24,'#f1f5fc')+'</button> </div></div> ';
*/
ch+='<div class="w5"></div> ';

  //--w2
ch+='<div class="w3 "> ';

 ch+='<div class="di-td "><a href="javascript:void(0);" class="block web-header-link-btn" data-pagerbtn="mainpage:search" title="Search">'+W.T.SVG('search',18,'#f1f5fc')+' </a> </div>';
   if(options.Login){
ch+='<div class="di-td po-re"> '+dropdown+'</div>';
}
 ch+='</div>';


 ch+='</div></div>';
 //--w9

 ch+='</div></div>';
  return ch;

}

/**
* @description  
* @param  
*/

/**
* @description  generate the tab header
* @param  
*/
function wrap(header,madian,Footer){
       var classcontent=(typeof Footer == "undefined")?'block':'content';
    Footer=(typeof Footer =="undefined")?'':Footer;
  
    var HEADER_DATA=[];
    var ch='<div class="block"   >';
  ch+=topfixForwrap(header);

    ch+='<div class="block  " data-appMedian="page">';
  ch+='<div class="block po-ab"  data-loading="median" style="display:none;" ></div><div class="container  main_pane">';
     ch+=madian; 
      ch+='</div>';
     ch+=Footer;
     ch+='</div>';


       ch+='</div>';
    return ch;



}
function wrapForModal(header,madian,Footer,isPage){
  var classcontent=(typeof Footer == "undefined")?'block':'content';
    Footer=(typeof Footer =="undefined")?'':Footer;
  
  var appMedianPage= (isPage)?' data-appMedian="page" ':' ';

    var ch='<div class="block"   >';
  ch+=topfixForwrap(header);

    ch+='<div class="block  " '+appMedianPage+' >';
  ch+='<div class="block po-ab"  data-loading="median" style="display:none;" ></div><div class="block">';
     ch+=madian; 
      ch+='</div>';
     ch+=Footer;
     ch+='</div>';


       ch+='</div>';
    return ch;
}

function topfixForwrap(header){
    var ch='';
        ch+='<div class="block po-re top_fix">';
//--
    if(W.U.isArray(header)){
           console.log(header);
        for(var  q in header){
           
        ch+='<div class="block" data-block="headerrow" data-isfixed="'+header[q].Isfixed+'" >'+header[q].html+'</div>';    
          
        }
    }else{
         ch+='<div class="block" data-block="headerrow" >'+header+'</div>';
    }
    
//--

    ch+='</div>';
    return ch;
}


/**
* @description  generate the tab header
* @param  
*/

function ColumnWrap540left(one,two,three){
       var ch='<div class="block ">';
    ch+='<div class="block w300 left po-re ">'+one+'</div>';
    ch+='<div class="block w540 left po-re ">'+two+'</div>';
    ch+='<div class="block w160 left po-re ">'+three+'</div>';
     ch+='</div>';
    return ch;

}
function ColumnWrap540right(one,two,three){
       var ch='<div class="block ">';
    ch+='<div class="block w160 left po-re ">'+one+'</div>';
    ch+='<div class="block w540 left po-re ">'+two+'</div>';
    ch+='<div class="block w300 left po-re ">'+three+'</div>';
     ch+='</div>';
    return ch;

}
function ColumnWrap770(one,two){
    var ch='<div class="block ">';
    ch+='<div class="block w230 left po-re ">'+one+'</div>';
    ch+='<div class="block w770 left po-re ">'+two+'</div>';
     ch+='</div>';
    return ch;

}

function ColumnWrapDashBoard(one,two){
    var ch='<div class="di-t m0_auto w212" style="max-width:1160px; min-width:1000px;">';
    ch+='<div class=" w160 di-td ">'+one+'</div>';
    ch+='<div class=" di-td" style="max-width:1000px; min-width:840px;">'+two+'</div>';//
     ch+='</div>';
    return ch;

}
function ColumnWrapDashBoardMain(one,two){
    var ch='<div class="block ">';
    ch+='<div class="w3">'+one+'</div>';
    ch+='<div class="w9"  >'+two+'</div>';
 
     ch+='</div>';
    return ch;

}
function ColDashboardInfo(x){
        var ch='';
         ch+='<div class="block _bdy "> <div class="block _bdy bg_0 bs-1   m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div></div>'; 

 return ch;


}

function ColumnWrapXXX(htmlstr,colwidthclass){
   
   

    var ch='<div class="block main_pane container" >';
  if(htmlstr.length==colwidthclass.length){
         for(var q in htmlstr){
       ch+='<div class="block po-re left '+colwidthclass[q]+'">'+htmlstr[q]+'</div>';  
         }
 

     }
   
     ch+='</div>';
    return ch;

}


 W.T.WebHeader =  WebHeader;
 W.T.wrap = wrap;
 W.T.wrapForModal= wrapForModal;
 W.T.ColumnWrap540left = ColumnWrap540left;
 W.T.ColumnWrap540right = ColumnWrap540right;
 W.T.ColumnWrap770 = ColumnWrap770;
 W.T.ColumnWrapDashBoard= ColumnWrapDashBoard;
 W.T.ColumnWrapDashBoardMain= ColumnWrapDashBoardMain;
 W.T.ColDashboardInfo= ColDashboardInfo;
  W.T.ColumnWrapXXX= ColumnWrapXXX;
 

})(wowrol);