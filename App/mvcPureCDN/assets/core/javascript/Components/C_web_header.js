;(function (W) {
     "use strict";
  
  function C_web_header(x){
    var AppId=W.A.page.AppId;
var Esd=x.EntityStripdata;

  var Jid_picture=W.U.J(function(){ var _this=this;this.Node.onclick=function(){  W.U.PictureZoom.init(_this.data); }   },{eid:Esd.eid,avatar:Esd.avatar});

Esd.avatar=W.U.loadImage ({file:Esd.avatar, width:250,
        height: 250,
        type: 'resize'});
Esd.banner=W.U.loadImage ({file:Esd.banner, width:1000,
        height: 300,
        type: 'slider'});
      var ch='<div class="_h50 " >';
         if(AppId=="ProfilePageBuyer"){
 ch+='<div class="_a po-re bs-1 bdr-no-t " ><div class="block banner m0_auto " style="background: url('+Esd.banner+') no-repeat 0 0;background-size: cover;width:100%;height: 100%; "></div> </div>';
    }
     if(AppId=="ProfilePageStore"){
 ch+='<div class="_a po-re bs-1 bdr-no-t " > '+ W.T.C.StoreSlider(x.slider)+'</div>';
    }


 ch+='<div class="_b _r " style=" margin-top: 1px; " > <div class="block bs-1">';

 ch+='<div class="left" style="width: 215px;"> <div class="po-re _b-0"> <div class="po-ab _b-0-0 bs-2dp"> <div class=" block " > <a href="javascript:void(0);" data-junction="'+Jid_picture+'"><img class="img-responsive m0_auto " src="'+Esd.avatar+'" alt="keshav gautam" data-src=""> </a> </div></div></div></div>';

 ch+='<div class="w9" > '
 +'<div class="_b1">' 
 +'<div class="block h50"><div class="ul- ul-menu"><div class="li h50 name"> <h2 class="po-ab">'+Esd.entityName+'</h2> </div></div>'
 +'<div class=" right" style="margin-right: 10px; margin-top: 10px;"><div class="j0">'
 +W.U.relation({twr:x.twr,owr:x.owr,mes:x.mes,shg:x.shg},'truncate ','')
  +'</div></div>'
 +'<!--==--><!--==--></div>'

+'<div class="block h50 po-re" >'+ W.T.C.ProfileBannerStrip(x)+'</div>'
 +'</div>'
 +' </div> ';
 //

 ch+='</div></div>';

      ch+='</div>';

      return ch;

  }
  
  function WebHeader2(x){
var Esd=x.EntityStripdata;
    var ch='<div class="block bg_1 fg_6 "><div class="main_pane container">';//data-juntion="webexploremenu"
       ch+='<div class="di-td"><a href="javascript:void(0);" class="block header-link-btn" data-junction="webexploremenu"  >'+W.T.SVG('menu',24,'#f1f5fc')+'<i class="badge _gbtn vl-sp"  ></i> </a></div>';


    ch+='<div class="di-td vl-t   w212 p1 max-w-0 al-l"><div class=" block header-cell  "><span class="fs20 fg_10 tt-u ff_3  ts-0 truncate  max-w-0 ">'+Esd.entityName+'</span></div></div>';
    ch+='<div class="di-td"><a href="javascript:void(0);" class="block header-link-btn"   data-junction ="cartbtninit"  >'+W.T.SVG('cart',24,'#f1f5fc')+'<i class="badge _gbtn vl-sp" '+ W.U.Browsing.cartIconUpdate('getId')+' ></i> </a></div>';


    ch+='</div></div>';

  ch+='<div class="po-re main_pane container " ><div class="po-ab hide bg_0 bs-1-bottom" data-nodeid="exploremenu">erter ertert</div></div>';

 W.U.Junction('webexploremenu',function(){
     var _this=this;
   setTimeout(function(){
        W.U.ExploreMenu(_this.Node,W.U.id('exploremenu'),x.store_menu);
   },100)
             },{}); 

    return ch;
}
     
 W.T.WebHeader2=WebHeader2;    
 W.T.C_web_header=C_web_header; 
})(wowrol);